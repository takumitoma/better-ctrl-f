import { unhighlight } from '../src/content/content';

function ignoreWhitespace(string: string | undefined): string {
  if (!string) return '';
  return string.replace(/\s+/g, ' ').trim();
}

describe('Content script, unhighlight function', () => {
  beforeEach(() => {
    document.body.innerHTML = ''; 
  });

  test('correctly removes a single highlight', () => {
    document.body.innerHTML = `
      <div id="test-div">
        This is 
        <span class="better-ctrl-f-highlight">a basic test</span> 
        case for the unhighlight function
      </div>
    `;
    unhighlight();

    const expected = 'This is a basic test case for the unhighlight function';
    expect(ignoreWhitespace(document.getElementById('test-div')?.innerHTML)).toBe(expected);
  });

  test('correctly removes multiple highlights', () => {
    document.body.innerHTML = `
      <div id="test-div">
        This is 
        <span class="better-ctrl-f-highlight">a test</span> 
        case for the 
        <span class="better-ctrl-f-highlight">unhighlight</span>
        function
      </div>
    `;
    unhighlight();

    const expected = 'This is a test case for the unhighlight function';
    expect(ignoreWhitespace(document.getElementById('test-div')?.innerHTML)).toBe(expected);
  });

  test('correctly removes highlights on a word with multiple highlights', () => {
    document.body.innerHTML = `
      <div id="test-div">
        Multiple highlights in one
        <span class="better-ctrl-f-highlight">w</span>o<span class="better-ctrl-f-highlight">rd</span>
      </div>
    `;
    unhighlight();
  
    const expected = 'Multiple highlights in one word';
    expect(ignoreWhitespace(document.getElementById('test-div')?.innerHTML)).toBe(expected);
  });

  test('does nothing when there are no highlights', () => {
    document.body.innerHTML = `<div id="test-div">Nothing should be done</div>`;
    unhighlight();

    const expected = 'Nothing should be done';
    expect(document.getElementById('test-div')?.innerHTML).toBe(expected);
  });

})
