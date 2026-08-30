// Splits text on **double asterisks** into plain/bold segments, so a data
// string can mark a phrase for inline emphasis without embedding markup.
// Shared by ArticleBody and ArticleSummary -- both render Insight article
// copy and should treat the same marker the same way.
export function splitEmphasis(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => ({ text: part, bold: i % 2 === 1 }));
}
