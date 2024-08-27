import './content.css';
import {
  isVisible,
  getSearchRegex,
  createSpan,
  removeDiacritics,
} from './utils';

console.log('hello world from content script');

// dummy at index 0 for offset because the matches navigation on the popup
// shows match indexes starting at index 1
let highlightedNodes: HTMLSpanElement[] = [document.createElement('span')];
let focusIndex: number = 0;
let totalMatches: number = 0;
let searchDiacritics: boolean = false;
let searchShadowDoms: boolean = false;
const shadowRoots: ShadowRoot[] = [];

chrome.runtime.onMessage.addListener(
  (
    message: {
      target: string;
      action: string;
      searchQuery: string;
      index: number;
      highlightColor: string;
      focusColor: string;
    },
    _,
    sendResponse: (response: {
      totalMatches: number;
      focusIndex: number;
    }) => void,
  ) => {
    if (message.target !== 'content') return;
    if (!document.body) {
      console.error('document.body does not exist');
    }

    if (message.action === 'highlight') {
      unhighlight();

      if (message.searchQuery) {
        highlight(message.searchQuery);
      }
      focusHighlight(focusIndex);
      sendResponse({ focusIndex: focusIndex, totalMatches: totalMatches });
    } else if (message.action === 'focus') {
      focusHighlight(message.index);
    } else if (message.action === 'updateHighlightColor') {
      updateHighlightColor(message.highlightColor);
    } else if (message.action === 'updateFocusColor') {
      updateFocusColor(message.focusColor);
    }
  },
);

/** @private */
export function getTotalMatches() {
  return totalMatches;
}

/** @private */
export function setSearchDiacritics(bool: boolean) {
  searchDiacritics = bool;
}

/** @private */
export function setSearchShadowDoms(bool: boolean) {
  searchShadowDoms = bool;
}

/** @private */
export function findTextNodes(body: Element = document.body): Text[] {
  const textNodes: Text[] = [];

  // pre order dfs
  function traverse(node: Node): void {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      if (!isVisible(element)) return;
      if (element.tagName === 'SCRIPT' || element.tagName === 'STYLE') return;

      if (searchShadowDoms && element.shadowRoot) {
        const style = document.createElement('style');
        style.textContent = `span.better-ctrl-f-highlight { background-color: yellow !important; } span.better-ctrl-f-focus { background-color: #FF8C00 !important; }`;
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

/** @private */
export function highlight(searchQuery: string): void {
  if (!searchQuery) {
    totalMatches = 0;
    focusIndex = 0;
    return;
  }

  highlightedNodes = [document.createElement('span')];
  const textNodes = findTextNodes();
  const searchRegex = getSearchRegex(searchQuery, searchDiacritics);
  totalMatches = 0;
  focusIndex = 1;

  const selection = window.getSelection();
  const selectionNode = selection?.anchorNode;
  let selectionFound = false;

  textNodes.forEach((textNode) => {
    let textContent = textNode.textContent || '';
    if (!textContent) return;

    let match;
    let processedContent = searchDiacritics
      ? removeDiacritics(textContent)
      : textContent;
    searchRegex.lastIndex = 0;

    while ((match = searchRegex.exec(processedContent)) !== null) {
      totalMatches++;

      const matchStart = match.index;
      const matchEnd = matchStart + match[0].length;
      const matchString = textContent.slice(matchStart, matchEnd);
      const span = createSpan(totalMatches, matchString);
      highlightedNodes.push(span);

      // Check if we've found the selection node
      if (
        !selectionFound &&
        selectionNode &&
        (textNode === selectionNode || textNode.contains(selectionNode))
      ) {
        selectionFound = true;
      }

      // If we've just passed the selection, set the focus index
      if (selectionFound && focusIndex === 1) {
        focusIndex = totalMatches;
      }

      // textNode becomes = before the match, after becomes = match + after the match
      const after = textNode.splitText(match.index);
      // after becomes = after the match
      if (after.textContent) {
        after.textContent = after.textContent.substring(match[0].length);
      }
      // insert span between textNode and after
      textNode.parentNode?.insertBefore(span, after);

      textContent = after.textContent || '';
      processedContent = searchDiacritics
        ? removeDiacritics(textContent)
        : textContent;
      textNode = after;
      searchRegex.lastIndex = 0;
    }
  });
}

function unhighlightHelper(element: Document | ShadowRoot): void {
  const highlightSpans = element.querySelectorAll(
    'span.better-ctrl-f-highlight',
  );
  highlightSpans.forEach((span) => {
    const parent = span.parentNode;
    if (parent && span.firstChild) {
      parent.replaceChild(span.firstChild, span);
      // combines back the text nodes that were separated by the span
      parent.normalize();
    }
  });
}

/** @private */
export function unhighlight(): void {
  unhighlightHelper(document);
  shadowRoots.forEach(unhighlightHelper);
}

function focusHighlight(index: number): void {
  highlightedNodes[focusIndex]?.classList.remove('better-ctrl-f-focus');
  highlightedNodes[index]?.classList.add('better-ctrl-f-focus');
  highlightedNodes[index]?.scrollIntoView({
    block: 'center',
    inline: 'nearest',
  });
  focusIndex = index;
}

function updateHighlightColor(color: string): void {
  document.documentElement.style.setProperty(
    '--better-ctrl-f-highlight-color',
    color,
  );
}

function updateFocusColor(color: string): void {
  document.documentElement.style.setProperty(
    '--better-ctrl-f-focus-color',
    color,
  );
}
