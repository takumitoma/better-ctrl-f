/* highlight util functions */
function escapeSpecialChars(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSearchRegex(searchQuery: string): RegExp {
  return new RegExp(`(${escapeSpecialChars(searchQuery)})`, 'gi');
}

export function highlightTextContent(textContent: string, regex: RegExp, count: number): string {
  return textContent.replace(regex, `<span class="better-ctrl-f-highlight better-ctrl-f-${count}">$1</span>`);
}

export function countMatches(textContent: string, regex: RegExp): number {
  const matches = textContent.match(regex);
  return matches ? matches.length : 0;
}

export function replaceTextNode(textNode: Node, html: string): void {
  const parent = textNode.parentNode;
  if (parent) {
    const fragment = htmlToDocumentFragment(html);
    parent.replaceChild(fragment, textNode);
  }
}

function htmlToDocumentFragment(html: string): DocumentFragment {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  const fragment = document.createDocumentFragment();
  while (tempDiv.firstChild) {
    fragment.appendChild(tempDiv.firstChild);
  }

  return fragment;
}