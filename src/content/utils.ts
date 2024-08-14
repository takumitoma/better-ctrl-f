function escapeSpecialChars(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSearchRegex(searchQuery: string): RegExp {
  return new RegExp(`(${escapeSpecialChars(searchQuery)})`, 'gi');
}

export function highlightTextContent(textContent: string, regex: RegExp): string {
  return textContent.replace(regex, '<span class="better-ctrl-f-highlight">$1</span>');
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

export function isElementNode(node: Node | null): node is HTMLElement {
  return node !== null && node.nodeType === Node.ELEMENT_NODE;
}

export function removeHighlightFromElement(element: HTMLElement): void {
  const checkForSpanRegex = /<span class="better-ctrl-f-highlight">(.*?)<\/span>/gi;
  const updatedHTML = element.innerHTML.replace(checkForSpanRegex, '$1');

  if (element.innerHTML !== updatedHTML) {
    element.innerHTML = updatedHTML;
  }
}