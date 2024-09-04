import {
  HighlightState,
  highlight,
  focusHighlight,
  updateHighlightColor,
  updateFocusColor,
  getFocusIndex,
  getTotalMatches,
  initializeHighlightState,
  setIsCaseSensitive,
  setSearchDiacritics,
  batchUpdateColors,
} from './highlightManager';

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

const highlightStates: HighlightState[] = Array(5)
  .fill(null)
  .map(() => initializeHighlightState());

export function handleMessage(
  message: Message,
  _sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
): void {
  if (message.target !== 'content') {
    sendResponse();
    return;
  }

  if (message.action === 'ping') {
    sendResponse({ status: 'alive' });
    return;
  }

  if (!document.body) {
    console.error('document.body does not exist');
    sendResponse();
    return;
  }

  switch (message.action) {
    case 'highlight':
      highlight(
        highlightStates[message.queryIndex],
        message.searchQuery!,
        message.queryIndex,
      );
      sendResponse({
        focusIndex: getFocusIndex(highlightStates[message.queryIndex]),
        totalMatches: getTotalMatches(highlightStates[message.queryIndex]),
      });
      break;
    case 'focus':
      focusHighlight(
        highlightStates[message.queryIndex],
        message.index!,
        message.queryIndex,
      );
      break;
    case 'updateHighlightColor':
      updateHighlightColor(message.highlightColor!, message.queryIndex);
      break;
    case 'updateFocusColor':
      updateFocusColor(message.focusColor!, message.queryIndex);
      break;
    case 'updateIsCaseSensitive':
      setIsCaseSensitive(message.isCaseSensitive!);
      break;
    case 'updateSearchDiacritics':
      setSearchDiacritics(message.searchDiacritics!);
      break;
    case 'batchUpdateColors':
      batchUpdateColors(message.highlightColors!, message.focusColors!);
      break;
  }

  sendResponse();
}
