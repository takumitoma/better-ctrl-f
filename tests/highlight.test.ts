// File: src/content/__tests__/highlight.test.ts

import {
  initializeHighlightState,
  highlight,
  getTotalMatches,
  setSearchDiacritics,
  setIsCaseSensitive,
} from '../src/content/highlightManager';

describe('Content script, highlight function', () => {
  let state: ReturnType<typeof initializeHighlightState>;

  beforeEach(() => {
    document.body.innerHTML = '';
    state = initializeHighlightState();
    setSearchDiacritics(false);
    setIsCaseSensitive(false);
  });

  test('correctly highlights single match', () => {
    document.body.innerHTML = `<div>Highlight</div>`;
    highlight(state, 'high', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(1);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-1 better-ctrl-f-focus-0">High</span>` +
      `light` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('correctly highlights multiple matches', () => {
    document.body.innerHTML = `<p>Banana</p>`;
    highlight(state, 'a', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(3);

    const expected =
      `<p>` +
      `B` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-1 better-ctrl-f-focus-0">a</span>` +
      `n` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-2">a</span>` +
      `n` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-3">a</span>` +
      `</p>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('correctly highlights text with different cases', () => {
    document.body.innerHTML = `<div>Abracadabra</div>`;
    highlight(state, 'abra', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-1 better-ctrl-f-focus-0">Abra</span>` +
      `cad` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-2">abra</span>` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('returns 0 matches and does nothing for an empty search query', () => {
    document.body.innerHTML = `<div>Some text</div>`;
    highlight(state, '', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(0);
    expect(document.body.innerHTML).toBe(`<div>Some text</div>`);
  });

  test('correctly highlights across multiple elements', () => {
    document.body.innerHTML = `<div>First div</div><p>Second div</p>`;
    highlight(state, 'div', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `First ` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-1 better-ctrl-f-focus-0">div</span>` +
      `</div>` +
      `<p>` +
      `Second ` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-2">div</span>` +
      `</p>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('handles overlaps without errors', () => {
    document.body.innerHTML = `<div>XOXOXOXO</div>`;
    highlight(state, 'XOX', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-1 better-ctrl-f-focus-0">XOX</span>` +
      `O` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-2">XOX</span>` +
      `O` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('highlights while maintaining whitespaces', () => {
    document.body.innerHTML = `<div>  Leading and trailing spaces  </div>`;
    highlight(state, 'spaces', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(1);

    const expected =
      `<div>  Leading and trailing ` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-1 better-ctrl-f-focus-0">` +
      `spaces` +
      `</span>  ` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('highlights diacritics when searchDiacritics is true', () => {
    document.body.innerHTML = `<div>Àgréément Àgréément</div>`;
    setSearchDiacritics(true);
    highlight(state, 'agree', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-1 better-ctrl-f-focus-0">Àgréé</span>` +
      `ment ` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-2">Àgréé</span>` +
      `ment</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('does not highlight diacritics when searchDiacritics is false', () => {
    document.body.innerHTML = `<div>Àgréément</div>`;
    setSearchDiacritics(false);
    highlight(state, 'agree', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(0);
    const expected = `<div>Àgréément</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('highlights correctly with case sensitivity', () => {
    document.body.innerHTML = `<div>Case case CASE cASe</div>`;
    setIsCaseSensitive(true);
    highlight(state, 'case', 0);
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(1);

    const expected =
      `<div>Case ` +
      `<span class="better-ctrl-f-highlight-0 better-ctrl-f-1 better-ctrl-f-focus-0">case</span>` +
      ` CASE cASe</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });
});
