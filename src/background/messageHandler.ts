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
  queryIndex: number;
  highlightColors?: string[];
  focusColors?: string[];
}

export function handleMessage(
  message: Message,
  sendResponse: (response?: any) => void,
): void {
  if (message.target !== 'background') {
    sendResponse();
  }

  switch (message.action) {
    case 'highlight':
      handleHighlight(message.searchQuery, message.queryIndex);
      break;
    case 'focus':
      handleFocus(message.index, message.queryIndex);
      break;
    case 'updateHighlightColor':
      handleUpdateHighlightColor(message.highlightColor, message.queryIndex);
      break;
    case 'updateFocusColor':
      handleUpdateFocusColor(message.focusColor, message.queryIndex);
      break;
    case 'updateIsCaseSensitive':
      handleUpdateIsCaseSensitive(message.isCaseSensitive);
      break;
    case 'updateSearchDiacritics':
      handleUpdateSearchDiacritics(message.searchDiacritics);
      break;
    case 'batchUpdateColors':
      handleBatchUpdateColors(message.highlightColors, message.focusColors);
      break;
  }

  sendResponse();
}

function handleHighlight(searchQuery: string = '', queryIndex: number): void {
  sendMessageToActiveTab(
    {
      target: 'content',
      action: 'highlight',
      searchQuery,
      queryIndex,
    },
    (response: { focusIndex: number; totalMatches: number }) => {
      chrome.runtime.sendMessage({
        target: 'popup',
        action: 'updateMatches',
        currentMatch: response.focusIndex,
        totalMatches: response.totalMatches,
        queryIndex,
      });
      storeSearchQuery(searchQuery, queryIndex);
    },
  );
}

function handleFocus(index: number = 0, queryIndex: number): void {
  sendMessageToActiveTab({
    target: 'content',
    action: 'focus',
    index,
    queryIndex,
  });
}

function handleUpdateHighlightColor(
  highlightColor: string = '',
  queryIndex: number,
): void {
  sendMessageToActiveTab({
    target: 'content',
    action: 'updateHighlightColor',
    highlightColor,
    queryIndex,
  });
  storeHighlightColor(highlightColor, queryIndex);
}

function handleUpdateFocusColor(
  focusColor: string = '',
  queryIndex: number,
): void {
  sendMessageToActiveTab({
    target: 'content',
    action: 'updateFocusColor',
    focusColor,
    queryIndex,
  });
  storeFocusColor(focusColor, queryIndex);
}

function handleBatchUpdateColors(
  highlightColors: string[] = [],
  focusColors: string[] = [],
): void {
  sendMessageToActiveTab({
    target: 'content',
    action: 'batchUpdateColors',
    highlightColors,
    focusColors,
  });
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
