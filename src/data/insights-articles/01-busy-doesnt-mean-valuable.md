# Busy Doesn't Mean Valuable.

### The delivery capacity paradox: why maximizing utilization can actually reduce the value your organization creates.

A team can be fully occupied and still be investing its most expensive resource—delivery capacity—in the wrong places.

Most leadership teams treat "everyone is busy" as evidence the organization is running well. It usually means the opposite. Full utilization and full value creation are not the same thing, and confusing them is one of the most expensive mistakes a delivery organization can make.

## The Math Behind the Paradox

The relationship between how busy a system is and how fast work moves through it is not a straight line—it is a curve, and it bends sharply. This isn't opinion; it's queueing theory, and it governs any system where work arrives, waits, and gets processed—a call center, a hospital, a product delivery pipeline.

The foundational result is Little's Law: the average number of items in a system equals the rate at which work arrives, multiplied by the average time each item spends in that system. It is a simple relationship, but it has a sharp implication. As a system's utilization climbs toward 100%, wait time does not increase proportionally—it increases non-linearly, accelerating fastest right when the system looks most "efficient" on paper. Practitioners commonly point to a rough danger zone starting around 70-80% utilization, where the risk of runaway delay increases sharply. There is no exact universal number—it depends on how variable the work is—but the direction is consistent: the closer a system runs to full capacity, the more violently a small disruption inflates wait times.

Donald Reinertsen made this the central argument of *The Principles of Product Development Flow*: running a product development process near full utilization is not a sign of discipline—it is, in his words, economically damaging. High utilization inflates queues and the cost of delay attached to everything sitting in them. He goes further, arguing that organizations that chase utilization as a goal in itself create their own instability—a self-inflicted wound, not an external constraint. His illustration of why this matters is simple: the same fixed delay costs far more when it hits a long queue of waiting work than when it hits a short one. A team with a deep backlog isn't protected by that backlog—it's more exposed to every disruption that touches it.

## Busy Is a Local Measure. Value Is a System Measure.

This is also the core insight of Eliyahu Goldratt's Theory of Constraints: a system's throughput is governed by its constraint, not by how hard any individual part of it is working. Goldratt's phrase for this is blunt—local optimum is not global optimum. Pushing every team, every station, every resource to maximum utilization doesn't make the system faster. It can make it slower, because effort gets absorbed everywhere except at the point that actually determines how fast value moves through the organization.

This is precisely what "busy" measures and "valuable" measures fail to overlap. Utilization tells you how occupied your capacity is. It tells you nothing about whether that capacity is pointed at the constraint, or at the right work at all.

DORA's research on software delivery performance backs this up from the flow side: work-in-process limits—paired with visible tracking and real feedback loops—are consistently associated with better delivery performance. Not because teams work harder, but because limiting how much is "in flight" at once forces the organization to finish things instead of starting them.

And most organizations are further from finishing than they realize. In Kanban and flow-metrics literature, "flow efficiency"—the share of a work item's total elapsed time that is spent actually being worked on, versus waiting—is widely cited at roughly 15-40% for typical teams. High-performing teams reach 40-60%. Even exceptional teams rarely exceed 60-70%. In other words: for most delivery organizations, the majority of the time a piece of work takes from start to finish, no one is touching it. It is waiting—for a decision, a handoff, a reviewer, a dependency. That is not a people problem. It is a systems problem, and it exists whether or not everyone is fully booked.

## The Same Trap, Wearing a Different Name

Product leadership runs into the identical trap under different vocabulary. Marty Cagan draws a hard line between "feature teams," which are handed output targets—ship this, ship that—and empowered product teams, which are held to outcome targets: the business results those features are supposed to produce. Feature teams can be extraordinarily busy. Empowered teams are judged by whether the busyness converted into anything the business actually needed.

John Cutler gave this failure mode a name that stuck: the feature factory—an organization that measures and rewards shipped output while staying disconnected from whether any of it moved a real business or user outcome. A feature factory is not lazy. It is often the opposite: relentlessly busy, consistently shipping, and quietly investing its scarcest resource in work that was never going to matter.

## Proof That Fixing It Works

This isn't theoretical. Siemens Health Services documented what happened when they stopped managing to utilization and started managing to flow. After adopting flow metrics—work-in-process limits, cycle time, throughput—their 85th-percentile story cycle time dropped from 71 days before the change to 43 days in their first release under the new approach, then to 40 days in the release after that: a roughly 42% reduction. Quality moved in the same direction, not the opposite one—first-pass yield rose from 75% to 86% to 95% across those same releases. Throughput increased too: the second release completed 33% more stories than the one before it. The first release also finished on schedule and more than 10% under budget.

None of that came from asking people to be busier. It came from managing the system differently—limiting work in progress, watching where it queued, and protecting the constraint instead of maximizing everywhere at once.

## The Real Question

The question worth asking in a leadership review is not "how full is our capacity?" It is "where is our capacity actually going, and is that where the value is?" Those are different questions with different answers, and the gap between them is where most delivery economics get lost—not in a single bad decision, but in the ordinary, well-intentioned pursuit of keeping everyone busy.

Capacity is not free just because it's occupied. It is the organization's most expensive resource, whether it is pointed at the right work or not.
