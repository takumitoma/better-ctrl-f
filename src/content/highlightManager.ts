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

export function highlight(
  state: HighlightState,
  searchQuery: string,
  queryIndex: number,
): void {
  unhighlight(state, queryIndex);

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
      queryIndex,
    );
  });

  focusHighlight(state, state.focusIndex, queryIndex);
}

function processTextNode(
  state: HighlightState,
  textNode: Text,
  searchRegex: RegExp,
  selectionNode: Node | null | undefined,
  selectionFound: boolean,
  queryIndex: number,
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
    const span = createSpan(state.totalMatches, matchString, queryIndex);
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

export function unhighlight(state: HighlightState, queryIndex: number): void {
  unhighlightHelper(document, queryIndex);
  state.shadowRoots.forEach((root) => unhighlightHelper(root, queryIndex));
}

function unhighlightHelper(
  element: Document | ShadowRoot,
  queryIndex: number,
): void {
  const highlightSpans = element.querySelectorAll(
    `span.better-ctrl-f-highlight-${queryIndex}`,
  );
  highlightSpans.forEach((span) => {
    const parent = span.parentNode;
    if (parent) {
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
      parent.normalize();
    }
  });
}

export function focusHighlight(
  state: HighlightState,
  index: number,
  queryIndex: number,
): void {
  if (state.totalMatches === 0) return;
  state.nodes[state.focusIndex]?.classList.remove(
    `better-ctrl-f-focus-${queryIndex}`,
  );
  state.nodes[index]?.classList.add(`better-ctrl-f-focus-${queryIndex}`);
  state.nodes[index]?.scrollIntoView({
    block: 'center',
    inline: 'nearest',
  });
  state.focusIndex = index;
}

export function updateHighlightColor(color: string, queryIndex: number): void {
  document.documentElement.style.setProperty(
    `--better-ctrl-f-highlight-color-${queryIndex}`,
    color,
  );
}

export function updateFocusColor(color: string, queryIndex: number): void {
  document.documentElement.style.setProperty(
    `--better-ctrl-f-focus-color-${queryIndex}`,
    color,
  );
}

export function batchUpdateColors(
  highlightColors: string[],
  focusColors: string[],
): void {
  highlightColors.forEach((color, index) => {
    updateHighlightColor(color, index);
  });

  focusColors.forEach((color, index) => {
    updateFocusColor(color, index);
  });
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
