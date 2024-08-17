import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;
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
    <p>This is a paragraph<span>This is a span</span></p>
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

test('getTextNodes recognizes elements with empty textContent', () => {
  expect(textNodes[5].textContent).toBe('Was the previous line skipped?');
});
