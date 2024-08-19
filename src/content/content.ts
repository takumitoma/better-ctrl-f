import './content.css';
import { 
  getSearchRegex, 
  highlightTextContent, 
  replaceTextNode,
  isElementNode,
  unhighlightElement
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

    let totalMatches = 0
    if (message.searchQuery) {
      unhighlight();
      totalMatches = highlight(message.searchQuery);
    }
    else {
      unhighlight();
    }
    sendResponse({ totalMatches: totalMatches });
  }
);

/** @private */
export function getTextNodes(body: Element): Node[] {
  const textNodes: Node[] = [];
  
  function traverse(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') {
      textNodes.push(node);
    }
    node.childNodes.forEach(child => traverse(child));
  }
  
  traverse(body);
  return textNodes;
}

// return total matches ie number of highlights added
function highlight(searchQuery: string): number {
  const textNodes = getTextNodes(document.body); //fix later
  const searchRegex = getSearchRegex(searchQuery);
  let count = 0;

  // for each textNode, try to find and highlight the textContent using regex, and if a span
  // is added ie the text was highlighted, replace the textNode with the highlight applied
  textNodes.forEach(textNode => {
    const textContent = textNode.textContent || '';
    const highlightedTextContent = highlightTextContent(textContent, searchRegex, count);

    if (textContent !== highlightedTextContent) {
      replaceTextNode(textNode, highlightedTextContent);
      count++;
    }
  });
  return count;
}

function unhighlight(): void {
  const textNodes = getTextNodes(document.body); //fix later

  textNodes.forEach(textNode => {
    const parent = textNode.parentNode;

    if (isElementNode(parent)) {
      unhighlightElement(parent);
    }
  });
}
