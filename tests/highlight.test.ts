import {
  initializeHighlightState,
  highlight,
  getTotalMatches,
  setSearchDiacritics,
  setCaseSensitive,
} from '../src/content/highlightManager';

describe('Content script, highlight function', () => {
  let state: ReturnType<typeof initializeHighlightState>;

  beforeEach(() => {
    document.body.innerHTML = '';
    state = initializeHighlightState();
  });

  test('correctly highlights single match', () => {
    document.body.innerHTML = `<div>Highlight</div>`;
    highlight(state, 'high');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(1);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1 better-ctrl-f-focus">High</span>` +
      `light` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('correctly highlights multiple matches', () => {
    document.body.innerHTML = `<p>Banana</p>`;
    highlight(state, 'a');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(3);

    const expected =
      `<p>` +
      `B` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1 better-ctrl-f-focus">a</span>` +
      `n` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-2">a</span>` +
      `n` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-3">a</span>` +
      `</p>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('correctly highlights text with different cases', () => {
    document.body.innerHTML = `<div>Abracadabra</div>`;
    highlight(state, 'abra');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1 better-ctrl-f-focus">Abra</span>` +
      `cad` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-2">abra</span>` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('returns 0 matches and does nothing for an empty search query', () => {
    document.body.innerHTML = `<div>Some text</div>`;
    highlight(state, '');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(0);
    expect(document.body.innerHTML).toBe(`<div>Some text</div>`);
  });

  test('correctly highlights across multiple elements', () => {
    document.body.innerHTML = `<div>First div</div><p>Second div</p>`;
    highlight(state, 'div');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `First ` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1 better-ctrl-f-focus">div</span>` +
      `</div>` +
      `<p>` +
      `Second ` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-2">div</span>` +
      `</p>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('handles overlaps without errors', () => {
    document.body.innerHTML = `<div>XOXOXOXO</div>`;
    highlight(state, 'XOX');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1 better-ctrl-f-focus">XOX</span>` +
      `O` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-2">XOX</span>` +
      `O` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('highlights while maintaining whitespaces', () => {
    document.body.innerHTML = `<div>  Leading and trailing spaces  </div>`;
    highlight(state, 'spaces');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(1);

    const expected =
      `<div>  Leading and trailing ` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1 better-ctrl-f-focus">` +
      `spaces` +
      `</span>  ` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('highlights diacritics when searchDiacritics is true', () => {
    document.body.innerHTML = `<div>Àgréément Àgréément</div>`;
    setSearchDiacritics(state, true);
    highlight(state, 'agree');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1 better-ctrl-f-focus">Àgréé</span>` +
      `ment ` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-2">Àgréé</span>` +
      `ment</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('does not highlight diacritics when searchDiacritics is false', () => {
    document.body.innerHTML = `<div>Àgréément</div>`;
    setSearchDiacritics(state, false);
    highlight(state, 'agree');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(0);
    const expected = `<div>Àgréément</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('highlights correctly with case sensitivity', () => {
    document.body.innerHTML = `<div>Case case CASE cASe</div>`;
    setCaseSensitive(state, true);
    highlight(state, 'case');
    const totalMatches: number = getTotalMatches(state);

    expect(totalMatches).toBe(1);

    const expected =
      `<div>Case ` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1 better-ctrl-f-focus">case</span>` +
      ` CASE cASe</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });
});
