import { unhighlight } from '../src/content/highlightManager';

describe('Content script, unhighlight function', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('correctly removes a single highlight', () => {
    document.body.innerHTML =
      `<div id="test-div">` +
      `This is ` +
      `<span class="better-ctrl-f-highlight-0">a basic test</span> ` +
      `case for the unhighlight function` +
      `</div>`;
    unhighlight(0);

    const expected = 'This is a basic test case for the unhighlight function';
    expect(document.getElementById('test-div')?.innerHTML).toBe(expected);
  });

  test('correctly removes multiple highlights', () => {
    document.body.innerHTML =
      `<div id="test-div">` +
      `This is ` +
      `<span class="better-ctrl-f-highlight-0">a test</span> ` +
      `case for the ` +
      `<span class="better-ctrl-f-highlight-0">unhighlight</span> ` +
      `function` +
      `</div>`;
    unhighlight(0);

    const expected = 'This is a test case for the unhighlight function';
    expect(document.getElementById('test-div')?.innerHTML).toBe(expected);
  });

  test('correctly removes highlights on a word with multiple highlights', () => {
    document.body.innerHTML =
      `<div id="test-div">` +
      `Multiple highlights in one ` +
      `<span class="better-ctrl-f-highlight-0">w</span>` +
      `o` +
      `<span class="better-ctrl-f-highlight-0">rd</span>` +
      `</div>`;
    unhighlight(0);

    const expected = 'Multiple highlights in one word';
    expect(document.getElementById('test-div')?.innerHTML).toBe(expected);
  });

  test('does nothing when there are no highlights', () => {
    document.body.innerHTML = `<div id="test-div">Nothing should be done</div>`;
    unhighlight(0);

    const expected = 'Nothing should be done';
    expect(document.getElementById('test-div')?.innerHTML).toBe(expected);
  });

  test('correctly removes multiple highlights', () => {
    document.body.innerHTML =
      `<div id="test-div">` +
      `<span class="better-ctrl-f-highlight-0">` +
      `<span class="better-ctrl-f-highlight-1">` +
      `High` +
      `</span>` +
      `light` +
      `<span class="better-ctrl-f-highlight-2">` +
      `er` +
      `</span>` +
      `</span>` +
      `</div>`;
    unhighlight(0);
    unhighlight(1);
    unhighlight(2);

    const expected = 'Highlighter';
    expect(document.getElementById('test-div')?.innerHTML).toBe(expected);
  });
});
