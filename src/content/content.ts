import './content.css';
import { 
  getSearchRegex, 
  highlightTextContent, 
  replaceTextNode,
  isElementNode,
  removeHighlightFromElement
} from './utils';

console.log('hello world from content script');

chrome.runtime.onMessage.addListener(
  (message: { target: string; action: string; searchQuery: string }) => {
    if (message.target === 'content' && message.action === 'highlight') {
      if (document.body) {
        unhighlightTextNodes();
        highlightTextNodes(message.searchQuery);
      }
    }
  }
);

function getTextNodes(): Text[] {
  const textNodes: Text[] = [];
  
  function traverse(node: Node): void {
    if (node.nodeType === Node.TEXT_NODE && (node as Text).textContent?.trim() !== '') {
      textNodes.push(node as Text);
    }
    node.childNodes.forEach(child => traverse(child));
  }
  
  traverse(document.body);
  return textNodes;
}

function highlightTextNodes(searchQuery: string): void {
  const textNodes = getTextNodes();
  const searchRegex = getSearchRegex(searchQuery);

  // for each textNode, try to find and highlight the textContent using regex, and if a span
  // is added ie the text was highlighted, replace the textNode with the highlight applied
  textNodes.forEach(textNode => {
    const textContent = textNode.textContent || '';
    const highlightedTextContent = highlightTextContent(textContent, searchRegex);

    if (textContent !== highlightedTextContent) {
      replaceTextNode(textNode, highlightedTextContent);
    }
  });
}

function unhighlightTextNodes(): void {
  const textNodes = getTextNodes();

  textNodes.forEach(textNode => {
    const parent = textNode.parentNode;

    if (isElementNode(parent)) {
      removeHighlightFromElement(parent);
    }
  });
}
