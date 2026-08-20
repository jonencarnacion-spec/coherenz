import { useState, useEffect, useRef } from 'react';
import { IconArrowRight, IconLink, IconBolt } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: 'completed' | 'in-progress' | 'pending';
  energy: number;
  color: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  centerContent?: React.ReactNode;
}

export default function RadialOrbitalTimeline({ timelineData, centerContent }: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  // Defaults false (not true) deliberately: this island hydrates via
  // client:visible, so the pre-hydration static HTML this component renders
  // at build time reflects THIS default -- if it were true, the shipped
  // markup would carry animate-pulse/animate-ping unconditionally, and
  // they'd run continuously from page load regardless of scroll position
  // until this component's own IntersectionObserver first fires (which, by
  // definition of client:visible, is already at/near the viewport by then,
  // so the flip to true happens immediately with no visible delay).
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState: Record<number, boolean> = {};
      const opening = !prev[id];

      if (opening) {
        newState[id] = true;
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  // Pauses the rotation entirely once the wheel scrolls off-screen, instead
  // of letting a 20x/sec setInterval re-render 7 nodes indefinitely for the
  // rest of the session — mirrors the IntersectionObserver pause the Hero
  // background canvas already uses.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate && isVisible) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate, isVisible]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 231.55;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    // Was faded by orbit angle (0.4-1) to fake depth — removed for now, it
    // read as a stray opacity overlay on the nodes near the top of the ring.
    const opacity = 1;

    return { x, y, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  return (
    <div
      className="relative flex h-[580px] w-full items-center justify-center overflow-hidden bg-wash-blue"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        <div
          className="absolute flex h-full w-full items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: '1000px',
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* animate-pulse/animate-ping are plain CSS animations, so they
              don't stop just because the setInterval-driven rotation below
              is gated on isVisible -- they were found still running (and
              matching a 2s stutter in an unrelated video elsewhere on the
              page) indefinitely regardless of scroll position. Gated on the
              same isVisible flag so they actually stop off-screen too. */}
          <div
            className={`absolute z-10 flex h-[207px] w-[207px] items-center justify-center rounded-full bg-gradient-to-br from-orange via-yellow to-green ${isVisible ? 'animate-pulse' : ''}`}
          >
            <div
              className={`absolute h-[259px] w-[259px] rounded-full border border-navy/25 opacity-70 ${isVisible ? 'animate-ping' : ''}`}
            ></div>
            <div
              className={`absolute h-[311px] w-[311px] rounded-full border border-navy/15 opacity-50 ${isVisible ? 'animate-ping' : ''}`}
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>

          {/* Sibling, not a child, of the pulsing orb above — opacity
              animations composite their whole subtree, so nesting the eye
              inside it made the logo/text fade in and out too. */}
          <div className="absolute z-20 flex h-[143px] w-[143px] flex-col items-center justify-center rounded-full bg-white px-4 text-center">
            {centerContent}
          </div>

          <div className="absolute h-[463px] w-[463px] rounded-full border-2 border-dotted border-navy/25"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
              // Only ease the transform when jumping to a clicked node's
              // angle (centerViewOnNode). During continuous auto-rotate the
              // angle ticks every 50ms, far faster than a 700ms easing
              // transition can settle — each tick retargets the transition
              // before the last one finishes, so the eased position chases
              // a moving target and spirals inward (a pursuit-curve effect)
              // instead of tracking the true circle radius.
              transition: autoRotate ? 'none' : 'transform 700ms ease, opacity 300ms ease',
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className="absolute cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`flex items-center justify-center rounded-full border-2 text-white transition-all duration-300 ${
                    isExpanded
                      ? 'h-10 w-10 scale-[1.98] border-white shadow-lg shadow-white/30'
                      : isRelated
                        ? 'h-14 w-14 animate-pulse border-white'
                        : 'h-14 w-14 border-white/30'
                  }`}
                  style={{ backgroundColor: item.color }}
                >
                  <span className="text-base font-extrabold">{item.id}</span>
                </div>

                <div
                  className={`absolute top-[59px] whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isExpanded ? 'scale-125 text-navy' : 'text-navy/80'
                  }`}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute left-1/2 top-20 w-64 -translate-x-1/2 overflow-visible border-navy/10 bg-white/50 shadow-xl shadow-navy/20 backdrop-blur-lg">
                    <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-navy/30"></div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className="bg-navy px-2 text-xs text-white border-white">{item.title}</Badge>
                        <span className="font-mono text-xs text-navy/50">{item.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-navy/80">
                      <p className="font-bold">{item.content}</p>

                      <div className="mt-4 border-t border-navy/10 pt-3">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="flex items-center">
                            <IconBolt size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-navy/10">
                          <div
                            className="h-full bg-gradient-to-r from-orange to-yellow"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 border-t border-navy/10 pt-3">
                          <div className="mb-2 flex items-center">
                            <IconLink size={10} className="mr-1 text-navy/60" />
                            <h4 className="text-xs font-medium uppercase tracking-wider text-navy/60">
                              Connected Stages
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex h-6 items-center rounded-none border-navy/20 bg-transparent px-2 py-0 text-xs text-navy/80 transition-all hover:bg-navy/10 hover:text-navy"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <IconArrowRight size={8} className="ml-1 text-navy/60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
