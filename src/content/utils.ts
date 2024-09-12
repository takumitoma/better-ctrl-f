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
  isDiacriticsSensitive: boolean,
  isCaseSensitive: boolean,
): RegExp {
  const escapedQuery = escapeSpecialChars(searchQuery);
  const flags = isCaseSensitive ? 'g' : 'gi';
  if (!isDiacriticsSensitive) {
    const diacriticInsensitiveQuery = removeDiacritics(escapedQuery);
    return new RegExp(diacriticInsensitiveQuery, flags);
  }
  return new RegExp(`(${escapedQuery})`, flags);
}

export function createSpan(
  matchCount: number,
  matchString: string,
  queryIndex: number,
): HTMLSpanElement {
  const span = document.createElement('span');
  span.classList.add(`better-ctrl-f-highlight-${queryIndex}`);
  span.classList.add(`better-ctrl-f-${matchCount}`);
  span.appendChild(document.createTextNode(matchString));
  return span;
}

export function findTextNodes(body: Element = document.body): Text[] {
  const textNodes: Text[] = [];

  // pre order dfs
  function traverse(node: Node): void {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (!isVisible(element)) return;
      if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') return;
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
