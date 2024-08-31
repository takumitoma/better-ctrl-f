import {
  getSearchRegex,
  createSpan,
  findTextNodes,
  removeDiacritics,
} from './utils';

const highlightOptions = {
  searchDiacritics: false,
  searchShadowDoms: false,
  isCaseSensitive: false,
};

export interface HighlightState {
  nodes: HTMLSpanElement[];
  focusIndex: number;
  totalMatches: number;
  shadowRoots: ShadowRoot[];
}

export function initializeHighlightState(): HighlightState {
  return {
    nodes: [document.createElement('span')],
    focusIndex: 0,
    totalMatches: 0,
    shadowRoots: [],
  };
}

export function highlight(state: HighlightState, searchQuery: string): void {
  unhighlight(state);

  if (!searchQuery) {
    state.totalMatches = 0;
    state.focusIndex = 0;
    return;
  }

  const textNodes = findTextNodes(highlightOptions.searchShadowDoms);
  const searchRegex = getSearchRegex(
    searchQuery,
    highlightOptions.searchDiacritics,
    highlightOptions.isCaseSensitive,
  );
  state.totalMatches = 0;
  state.focusIndex = 1;
  state.nodes = [document.createElement('span')];

  const selection = window.getSelection();
  const selectionNode = selection?.anchorNode;
  const selectionFound = false;

  textNodes.forEach((textNode) => {
    processTextNode(
      state,
      textNode,
      searchRegex,
      selectionNode,
      selectionFound,
    );
  });

  focusHighlight(state, state.focusIndex);
}

function processTextNode(
  state: HighlightState,
  textNode: Text,
  searchRegex: RegExp,
  selectionNode: Node | null | undefined,
  selectionFound: boolean,
): void {
  let textContent = textNode.textContent || '';
  if (!textContent) return;

  let processedContent = highlightOptions.searchDiacritics
    ? removeDiacritics(textContent)
    : textContent;
  searchRegex.lastIndex = 0;

  let match;
  while ((match = searchRegex.exec(processedContent)) !== null) {
    state.totalMatches++;

    const matchStart = match.index;
    const matchEnd = matchStart + match[0].length;
    const matchString = textContent.slice(matchStart, matchEnd);
    const span = createSpan(state.totalMatches, matchString);
    state.nodes.push(span);

    // Check if we've found the selection node
    if (
      !selectionFound &&
      selectionNode &&
      (textNode === selectionNode || textNode.contains(selectionNode))
    ) {
      selectionFound = true;
    }

    // If we've just passed the selection, set the focus index
    if (selectionFound && state.focusIndex === 1) {
      state.focusIndex = state.totalMatches;
    }

    // textNode becomes = before the match, after becomes = match + after the match
    const after = textNode.splitText(match.index);
    // after becomes = after the match
    if (after.textContent) {
      after.textContent = after.textContent.substring(match[0].length);
    }
    // insert span between textNode and after
    textNode.parentNode?.insertBefore(span, after);

    textContent = after.textContent || '';
    processedContent = highlightOptions.searchDiacritics
      ? removeDiacritics(textContent)
      : textContent;
    textNode = after;
    searchRegex.lastIndex = 0;
  }
}

// ... (rest of the functions remain the same)

export function unhighlight(state: HighlightState): void {
  unhighlightHelper(document);
  state.shadowRoots.forEach(unhighlightHelper);
}

function unhighlightHelper(element: Document | ShadowRoot): void {
  const highlightSpans = element.querySelectorAll(
    'span.better-ctrl-f-highlight',
  );
  highlightSpans.forEach((span) => {
    const parent = span.parentNode;
    if (parent && span.firstChild) {
      parent.replaceChild(span.firstChild, span);
      // combines back the text nodes that were separated by the span
      parent.normalize();
    }
  });
}

export function focusHighlight(state: HighlightState, index: number): void {
  if (state.totalMatches === 0) return;
  state.nodes[state.focusIndex]?.classList.remove('better-ctrl-f-focus');
  state.nodes[index]?.classList.add('better-ctrl-f-focus');
  state.nodes[index]?.scrollIntoView({
    block: 'center',
    inline: 'nearest',
  });
  state.focusIndex = index;
}

export function updateHighlightColor(color: string): void {
  document.documentElement.style.setProperty(
    '--better-ctrl-f-highlight-color',
    color,
  );
}

export function updateFocusColor(color: string): void {
  document.documentElement.style.setProperty(
    '--better-ctrl-f-focus-color',
    color,
  );
}

export function setSearchDiacritics(value: boolean): void {
  highlightOptions.searchDiacritics = value;
}

export function setSearchShadowDoms(value: boolean): void {
  highlightOptions.searchShadowDoms = value;
}

export function setIsCaseSensitive(value: boolean): void {
  highlightOptions.isCaseSensitive = value;
}

export function getTotalMatches(state: HighlightState): number {
  return state.totalMatches;
}

export function getFocusIndex(state: HighlightState): number {
  return state.focusIndex;
}
