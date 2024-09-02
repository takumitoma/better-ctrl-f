import './content.css';
import { handleMessage } from './messageHandler';

console.log('hello world from content script');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender, sendResponse);
});
