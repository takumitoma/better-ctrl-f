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
} from './highlightManager';

interface Message {
  target: string;
  action: string;
  searchQuery: string;
  index: number;
  highlightColor: string;
  focusColor: string;
  isCaseSensitive: boolean;
  searchDiacritics: boolean;
}

const highlightState: HighlightState = initializeHighlightState();

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

  let response: { focusIndex?: number; totalMatches?: number } | undefined;

  switch (message.action) {
    case 'highlight':
      highlight(highlightState, message.searchQuery);
      response = {
        focusIndex: getFocusIndex(highlightState),
        totalMatches: getTotalMatches(highlightState),
      };
      break;
    case 'focus':
      focusHighlight(highlightState, message.index);
      break;
    case 'updateHighlightColor':
      updateHighlightColor(message.highlightColor);
      break;
    case 'updateFocusColor':
      updateFocusColor(message.focusColor);
      break;
    case 'updateIsCaseSensitive':
      setIsCaseSensitive(message.isCaseSensitive);
      break;
    case 'updateSearchDiacritics':
      setSearchDiacritics(message.searchDiacritics);
      break;
  }

  sendResponse(response);
}
