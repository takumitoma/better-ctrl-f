import { getTotalMatches, highlight } from '../src/content/content';

describe('Content script, highlight function', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('correctly highlights single match', () => {
    document.body.innerHTML = `<div>Highlight</div>`;
    highlight('high');
    const totalMatches: number = getTotalMatches();

    expect(totalMatches).toBe(1);

    const expected = `<div><span class="better-ctrl-f-highlight better-ctrl-f-1">High</span>light</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('correctly highlights multiple matches', () => {
    document.body.innerHTML = `<p>Banana</p>`;
    highlight('a');
    const totalMatches: number = getTotalMatches();

    expect(totalMatches).toBe(3);

    const expected =
      `<p>` +
      `B` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1">a</span>` +
      `n` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-2">a</span>` +
      `n` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-3">a</span>` +
      `</p>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('correctly highlights text with different cases', () => {
    document.body.innerHTML = `<div>Abracadabra</div>`;
    highlight('abra');
    const totalMatches: number = getTotalMatches();

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1">Abra</span>` +
      `cad` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-2">abra</span>` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('returns 0 matches and does nothing for an empty search query', () => {
    document.body.innerHTML = `<div>Some text</div>`;
    highlight('');
    const totalMatches: number = getTotalMatches();

    expect(totalMatches).toBe(0);
    expect(document.body.innerHTML).toBe(`<div>Some text</div>`);
  });

  test('correctly highlights across multiple elements', () => {
    document.body.innerHTML = `<div>First div</div><p>Second div</p>`;
    highlight('div');
    const totalMatches: number = getTotalMatches();

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `First ` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1">div</span>` +
      `</div>` +
      `<p>` +
      `Second ` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-2">div</span>` +
      `</p>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('handles overlaps without errors', () => {
    document.body.innerHTML = `<div>XOXOXOXO</div>`;
    highlight('XOX');
    const totalMatches: number = getTotalMatches();

    expect(totalMatches).toBe(2);

    const expected =
      `<div>` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-1">XOX</span>` +
      `O` +
      `<span class="better-ctrl-f-highlight better-ctrl-f-2">XOX</span>` +
      `O` +
      `</div>`;
    expect(document.body.innerHTML).toBe(expected);
  });

  test('highlights while maintaining whitespaces', () => {
    document.body.innerHTML = `<div>  Leading and trailing spaces  </div>`;
    highlight('spaces');
    const totalMatches: number = getTotalMatches();

    expect(totalMatches).toBe(1);

    const expected =
      `<div>  Leading and trailing <span class="better-ctrl-f-highlight better-ctrl-f-1">` +
      `spaces</span>  </div>`;
    expect(document.body.innerHTML).toBe(expected);
  });
});
