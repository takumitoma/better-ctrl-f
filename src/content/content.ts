import './content.css';
import { 
  getSearchRegex, 
  createSpan
} from './utils';

console.log('hello world from content script');

chrome.runtime.onMessage.addListener((
  message: { target: string; action: string; searchQuery: string },
  _,
  sendResponse: (response: { totalMatches: number }) => void) => {
    if (message.target !== 'content' || message.action !== 'highlight') return;
    if (!document.body) {
      console.error('document.body does not exist');
    }

    unhighlight();

    let totalMatches = 0
    if (message.searchQuery) {
      totalMatches = highlight(message.searchQuery);
    }
    sendResponse({ totalMatches: totalMatches });
  }
);

/** @private */
export function findTextNodes(body: Element = document.body): Text[] {
  let textNodes: Text[] = [];
  
  // pre order dfs
  function traverse(node: Node): void {
    // filter out nodes with just newlines/whitespace 
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') {
      textNodes.push(node as Text);
    }
    node.childNodes.forEach(child => traverse(child));
  }
  
  traverse(body);
  return textNodes
}

// return total matches ie number of highlights added
function highlight(searchQuery: string): number {
  const textNodes = findTextNodes();
  const searchRegex = getSearchRegex(searchQuery);
  let matchCount = 0;

  textNodes.forEach(textNode => {
    let textContent = textNode.textContent || '';
    if (!textContent) return;
    let match;

    searchRegex.lastIndex = 0;

    while ((match = searchRegex.exec(textContent)) !== null) {
      matchCount++;
      const matchString = match[0];
      const span = createSpan(matchCount, matchString);

      // textNode becomes = before the match, after becomes = match + after the match
      const after = textNode.splitText(match.index);
      // after becomes = after the match
      if (after.nodeValue) {
        after.nodeValue = after.nodeValue.substring(matchString.length);
      }
      // insert span between textNode and after
      textNode.parentNode?.insertBefore(span, after);

      textContent = after.nodeValue || '';
      textNode = after;
      searchRegex.lastIndex = 0; 
    }
  });
  
  return matchCount;
}

function unhighlight(): void {
  let highlightSpans = document.querySelectorAll('span.better-ctrl-f-highlight');

  highlightSpans.forEach(span => {
    let parent = span.parentNode;
    if (parent && span.firstChild) {
      parent.replaceChild(span.firstChild, span);
      // combines back the text nodes that were separated by the span
      parent.normalize();
    }
  });
}
