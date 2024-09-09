import { findTextNodes } from '../src/content/utils';

describe('Content script, findTextNodes function', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('recognizes nested elements and returns text nodes in correct order', () => {
    document.body.innerHTML =
      `<div>` +
      `First` +
      `<div>` +
      `Second` +
      `<div>` +
      `Third` +
      `</div>` +
      `Fourth` +
      `</div>` +
      `Fifth` +
      `</div>`;
    const textNodes = findTextNodes();
    expect(textNodes[0].textContent).toBe('First');
    expect(textNodes[1].textContent).toBe('Second');
    expect(textNodes[2].textContent).toBe('Third');
    expect(textNodes[3].textContent).toBe('Fourth');
    expect(textNodes[4].textContent).toBe('Fifth');
  });

  test('works with block-level tags', () => {
    document.body.innerHTML = `
      <div>This is a div</div>
      <p>This is a paragraph</p>
      <h1>This is a heading</h1>
      <button>This is a button</button>
    `;
    const textNodes = findTextNodes();
    expect(textNodes[0].textContent).toBe('This is a div');
    expect(textNodes[1].textContent).toBe('This is a paragraph');
    expect(textNodes[2].textContent).toBe('This is a heading');
    expect(textNodes[3].textContent).toBe('This is a button');
  });

  test('works with inline tags', () => {
    document.body.innerHTML = `
      <p><span>This is a span</span></p>
      <div><a href="#">This is an anchor</a></div>
      <p><b>This is a bold text</b></p>
      <div><strong>This is an important text</strong></div>
    `;
    const textNodes = findTextNodes();
    expect(textNodes[0].textContent).toBe('This is a span');
    expect(textNodes[1].textContent).toBe('This is an anchor');
    expect(textNodes[2].textContent).toBe('This is a bold text');
    expect(textNodes[3].textContent).toBe('This is an important text');
  });

  test('works with HTML entities', () => {
    document.body.innerHTML = `
      <div>Text with entities like &amp; and &gt;</div>
    `;
    const textNodes = findTextNodes();
    expect(textNodes[0].textContent).toBe('Text with entities like & and >');
  });

  test('returns empty array for empty document', () => {
    const textNodes = findTextNodes();
    expect(textNodes).toStrictEqual([]);
  });

  test('skips elements with empty text content', () => {
    document.body.innerHTML = `
      <p><span></span></p>
      <div>Was the previous line skipped?</div>
    `;
    const textNodes = findTextNodes();
    expect(textNodes[0].textContent).toBe('Was the previous line skipped?');
  });

  test('skips over style and script tags', () => {
    document.body.innerHTML = `
      <style>body { background: white; }</style>
      <script>console.log('spooky');</script>
      <div>Were the style and script skipped?</div>
    `;
    const textNodes = findTextNodes();
    expect(textNodes.length).toBe(1);
    expect(textNodes[0].textContent).toBe('Were the style and script skipped?');
  });

  test('works with dynamically generated content', async () => {
    document.body.innerHTML = `
      <div id="test-div"></div>
    `;
    const testDiv = document.getElementById('test-div');

    if (testDiv) {
      testDiv.innerHTML = 'dynamic';
      const textNodes = findTextNodes();
      expect(textNodes[0].textContent).toBe('dynamic');
    }
  });

  test('skips invisible elements', () => {
    document.body.innerHTML = `
      <div>Visible text</div>
      <div style="display: none;">Invisible due to display:none</div>
      <div style="visibility: hidden;">Invisible due to visibility:hidden</div>
      <div style="opacity: 0;">Invisible due to opacity:0</div>
      <div>Another visible text</div>
    `;
    const textNodes = findTextNodes();
    expect(textNodes.length).toBe(2);
    expect(textNodes[0].textContent).toBe('Visible text');
    expect(textNodes[1].textContent).toBe('Another visible text');
  });
});
