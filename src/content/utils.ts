import { removeDiacritics } from './diacritics';

/* findTextNodes util functions */
export function isVisible(element: Element): boolean {
  const style = window.getComputedStyle(element);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0'
  );
}

/* highlight util functions */
function escapeSpecialChars(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSearchRegex(
  searchQuery: string,
  searchDiacritics: boolean,
  isCaseSensitive: boolean,
): RegExp {
  const escapedQuery = escapeSpecialChars(searchQuery);
  const flags = isCaseSensitive ? 'g' : 'gi';
  if (searchDiacritics) {
    const diacriticInsensitiveQuery = removeDiacritics(escapedQuery);
    return new RegExp(diacriticInsensitiveQuery, flags);
  }
  return new RegExp(`(${escapedQuery})`, flags);
}

export function createSpan(
  matchCount: number,
  matchString: string,
): HTMLSpanElement {
  const span = document.createElement('span');
  span.classList.add('better-ctrl-f-highlight');
  span.classList.add(`better-ctrl-f-${matchCount}`);
  span.appendChild(document.createTextNode(matchString));
  return span;
}

export function findTextNodes(
  searchShadowDoms: boolean = false,
  body: Element = document.body,
): Text[] {
  const textNodes: Text[] = [];
  const shadowRoots: ShadowRoot[] = [];

  // pre order dfs
  function traverse(node: Node): void {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (!isVisible(element)) return;
      if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') return;

      if (element.shadowRoot && searchShadowDoms) {
        const style = document.createElement('style');
        style.textContent = `
          span.better-ctrl-f-highlight { background-color: var(--better-ctrl-f-highlight-color) !important; }
          span.better-ctrl-f-focus { background-color: var(--better-ctrl-f-focus-color) !important; }
        `;
        element.shadowRoot.appendChild(style);
        shadowRoots.push(element.shadowRoot);
        traverse(element.shadowRoot);
      }
    }

    // filter out nodes with just newlines/whitespace
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') {
      textNodes.push(node as Text);
    }

    node.childNodes.forEach((child) => traverse(child));
  }

  traverse(body);
  return textNodes;
}

export { removeDiacritics };
