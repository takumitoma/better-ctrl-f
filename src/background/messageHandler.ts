import {
  storeSearchQuery,
  storeHighlightColor,
  storeFocusColor,
  storeIsCaseSensitive,
  storeSearchDiacritics,
} from './storage';
import { sendMessageToActiveTab } from './tabs';

interface Message {
  target: string;
  action: string;
  searchQuery?: string;
  index?: number;
  highlightColor?: string;
  focusColor?: string;
  isCaseSensitive?: boolean;
  searchDiacritics?: boolean;
}

export function handleMessage(message: Message): void {
  if (message.target !== 'background') {
    return;
  }

  switch (message.action) {
    case 'highlight':
      handleHighlight(message.searchQuery);
      break;
    case 'focus':
      handleFocus(message.index);
      break;
    case 'updateHighlightColor':
      handleUpdateHighlightColor(message.highlightColor);
      break;
    case 'updateFocusColor':
      handleUpdateFocusColor(message.focusColor);
      break;
    case 'updateIsCaseSensitive':
      handleUpdateIsCaseSensitive(message.isCaseSensitive);
      break;
    case 'updateSearchDiacritics':
      handleUpdateSearchDiacritics(message.searchDiacritics);
      break;
  }
}

function handleHighlight(searchQuery: string = ''): void {
  sendMessageToActiveTab(
    {
      target: 'content',
      action: 'highlight',
      searchQuery,
    },
    (response: { focusIndex: number; totalMatches: number }) => {
      chrome.runtime.sendMessage({
        target: 'popup',
        action: 'updateMatches',
        currentMatch: response.focusIndex,
        totalMatches: response.totalMatches,
      });
    },
  );
  storeSearchQuery(searchQuery);
}

function handleFocus(index: number = 0): void {
  sendMessageToActiveTab({
    target: 'content',
    action: 'focus',
    index,
  });
}

function handleUpdateHighlightColor(highlightColor: string = ''): void {
  sendMessageToActiveTab({
    target: 'content',
    action: 'updateHighlightColor',
    highlightColor,
  });
  storeHighlightColor(highlightColor);
}

function handleUpdateFocusColor(focusColor: string = ''): void {
  sendMessageToActiveTab({
    target: 'content',
    action: 'updateFocusColor',
    focusColor,
  });
  storeFocusColor(focusColor);
}

function handleUpdateIsCaseSensitive(isCaseSensitive: boolean = false): void {
  sendMessageToActiveTab({
    target: 'content',
    action: 'updateIsCaseSensitive',
    isCaseSensitive,
  });
  storeIsCaseSensitive(isCaseSensitive);
}

function handleUpdateSearchDiacritics(searchDiacritics: boolean = false): void {
  sendMessageToActiveTab({
    target: 'content',
    action: 'updateSearchDiacritics',
    searchDiacritics,
  });
  storeSearchDiacritics(searchDiacritics);
}
