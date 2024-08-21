/* highlight util functions */
function escapeSpecialChars(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSearchRegex(searchQuery: string): RegExp {
  return new RegExp(`(${escapeSpecialChars(searchQuery)})`, 'gi');
}

export function createSpan(matchCount: number, matchString: string): HTMLSpanElement {
  const span = document.createElement('span');
  span.classList.add('better-ctrl-f-highlight');
  span.classList.add(`better-ctrl-f-${matchCount}`);
  span.appendChild(document.createTextNode(matchString));
  return span;
}