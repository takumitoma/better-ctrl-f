import './content.css';
import { 
  getSearchRegex, 
  highlightTextContent, 
  replaceTextNode,
  isElementNode,
  unhighlightElement,
  countMatches
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

    findTextNodes();
    unhighlight();

    let totalMatches = 0
    if (message.searchQuery) {
      findTextNodes();
      totalMatches = highlight(message.searchQuery);
    }
    sendResponse({ totalMatches: totalMatches });
  }
);

let textNodes: Node[] = []

export function getTextNodes() {
  return textNodes;
}

/** @private */
export function findTextNodes(body: Element = document.body) {
  textNodes = [];
  
  // pre order dfs
  function traverse(node: Node): void {
    // filter out nodes with just newlines/whitespace 
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') {
      textNodes.push(node);
    }
    node.childNodes.forEach(child => traverse(child));
  }
  
  traverse(body);
}

// return total matches ie number of highlights added
function highlight(searchQuery: string): number {
  const searchRegex = getSearchRegex(searchQuery);
  let count = 0;

  // for each textNode, try to find and highlight the textContent using regex, and if a span
  // is added ie the text was highlighted, replace the textNode with the new node in which
  // the highlight was applied
  textNodes.forEach(textNode => {
    const textContent = textNode.textContent || '';
    const highlightedTextContent = highlightTextContent(textContent, searchRegex, count);

    if (textContent !== highlightedTextContent) {
      replaceTextNode(textNode, highlightedTextContent);
      count += countMatches(textContent, searchRegex);
    }
  });
  return count;
}

function unhighlight(): void {
  textNodes.forEach(textNode => {
    const parent = textNode.parentNode;

    if (isElementNode(parent)) {
      unhighlightElement(parent);
    }
  });
}
