import { JSDOM } from 'jsdom';
import { getTextNodes } from '../src/content/content';

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ContentTest</title>
  </head>
  <body>
    <div>
      First
      <div>
        Second
        <div>
          Third
        </div>
        Fourth
      </div>
      Fifth
    </div>

    <p><span></span></p>
    <div>Was the previous line skipped?</div>

    <div>This is a div</div>
    <p>This is a paragraph<span>This is a span</span></p>
    <a href="#">This is an anchor</a>
    <h1>This is a heading</h1>
    <ul>
      <li>This is an ul list item</li>
    </ul>
    <ol>
      <li>This is an ol list item</li>
    </ol>
    <table>
      <tr>
        <th>This is a table header</th>
      </tr>
      <tr>
        <td>This is a table cell</td>
      </tr>
    </table>
    <button>This is a button</button>
    <label>This is a label</label>
    <textarea>This is a textarea</textarea>

    <blockquote>This is a blockquote</blockquote>
    <p><q>This is an inline quote</q></p>
    <abbr title="abbreviation">abbr</abbr>
    <address>This is an address</address>
    <cite>This is a citation</cite>
    <bdo dir="rtl">This is bidirectional text</bdo>

    <b>This is a bold text</b>
    <strong>This is an important text</strong>
    <i>This is an italic text</i>
    <em>This is an emphasized text</em>
    <mark>This is a marked text</mark>
    <small>This is a smaller text</small>
    <del>This is a deleted text</del>
    <ins>This is an inserted text</ins>
    <sub>This is a subscript text</sub>
    <sup>This is a superscript text</sup>

  <iframe 
    srcdoc="
      <p>This is an iframe paragraph</p>
      <div>This is an iframe div</div>
    ">
  </iframe>

  </body>
  </html>
`, {
  contentType: "text/html"
});

const textNodes = getTextNodes(dom.window.document.body);

test('getTextNodes recognizes nested elements and returns text nodes in correct order', () => {
  function ignoreWhitespace(text: string | null): string {
    if (!text) return '';
    return text.replace(/\s+/g, ' ').trim();
  }
  expect(ignoreWhitespace(textNodes[0].textContent)).toBe('First');
  expect(ignoreWhitespace(textNodes[1].textContent)).toBe('Second');
  expect(ignoreWhitespace(textNodes[2].textContent)).toBe('Third');
  expect(ignoreWhitespace(textNodes[3].textContent)).toBe('Fourth');
  expect(ignoreWhitespace(textNodes[4].textContent)).toBe('Fifth');
});

test('getTextNodes skips elements with empty textContent', () => {
  expect(textNodes[5].textContent).toBe('Was the previous line skipped?');
});

test('getTextNodes works with common HTML tags', () => {
  expect(textNodes[6].textContent).toBe('This is a div');
  expect(textNodes[7].textContent).toBe('This is a paragraph');
  expect(textNodes[8].textContent).toBe('This is a span');
  expect(textNodes[9].textContent).toBe('This is an anchor');
  expect(textNodes[10].textContent).toBe('This is a heading');
  expect(textNodes[11].textContent).toBe('This is an ul list item');
  expect(textNodes[12].textContent).toBe('This is an ol list item');
  expect(textNodes[13].textContent).toBe('This is a table header');
  expect(textNodes[14].textContent).toBe('This is a table cell');
  expect(textNodes[15].textContent).toBe('This is a button');
  expect(textNodes[16].textContent).toBe('This is a label');
  expect(textNodes[17].textContent).toBe('This is a textarea');
});

test('getTextNodes works with quotation tags', () => {
  expect(textNodes[18].textContent).toBe('This is a blockquote');
  expect(textNodes[19].textContent).toBe('This is an inline quote');
  expect(textNodes[20].textContent).toBe('abbr');
  expect(textNodes[21].textContent).toBe('This is an address');
  expect(textNodes[22].textContent).toBe('This is a citation');
  expect(textNodes[23].textContent).toBe('This is bidirectional text');
});

test('getTextNodes works with formatting tags', () => {
  expect(textNodes[24].textContent).toBe('This is a bold text');
  expect(textNodes[25].textContent).toBe('This is an important text');
  expect(textNodes[26].textContent).toBe('This is an italic text');
  expect(textNodes[27].textContent).toBe('This is an emphasized text');
  expect(textNodes[28].textContent).toBe('This is a marked text');
  expect(textNodes[29].textContent).toBe('This is a smaller text');
  expect(textNodes[30].textContent).toBe('This is a deleted text');
  expect(textNodes[31].textContent).toBe('This is an inserted text');
  expect(textNodes[32].textContent).toBe('This is a subscript text');
  expect(textNodes[33].textContent).toBe('This is a superscript text');
});

// also have to add tests for iframe, input, placeholder, shadow dom