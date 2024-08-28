import { handleMessage } from './messageHandler';

console.log('Hello world from background script');

chrome.runtime.onMessage.addListener((message) => {
  handleMessage(message);
  return true; 
});