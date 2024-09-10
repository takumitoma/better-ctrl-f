import { checkIsSpecialized } from '../../src/background/urlChecker';

describe('Background script, checkIfSpecialized function', () => {
  test('identifies specialized files', () => {
    expect(checkIsSpecialized('https://example.com/document.pdf')).toBe(true);
    expect(checkIsSpecialized('http://company.com/presentation.pptx')).toBe(
      true,
    );
    expect(checkIsSpecialized('https://university.edu/paper.docx')).toBe(true);
  });

  test('identifies specialized apps', () => {
    expect(
      checkIsSpecialized('https://docs.google.com/document/d/123456'),
    ).toBe(true);
    expect(
      checkIsSpecialized('https://office.com/launch/word?param=value'),
    ).toBe(true);
    expect(
      checkIsSpecialized('https://acrobat.adobe.com/link/review?uri=123456'),
    ).toBe(true);
  });

  test('does not identify regular websites as specialized', () => {
    expect(checkIsSpecialized('https://example.com')).toBe(false);
    expect(checkIsSpecialized('http://blog.site.com/post/123')).toBe(false);
    expect(checkIsSpecialized('https://corporateboxoffice.com')).toBe(false);
  });

  test('correctly handles query parameters', () => {
    expect(
      checkIsSpecialized('https://docs.google.com/document/d/123?usp=sharing'),
    ).toBe(true);
    expect(
      checkIsSpecialized(
        'https://example.com/file.pdf?version=1&download=true',
      ),
    ).toBe(true);
  });

  test('is case-insensitive', () => {
    expect(checkIsSpecialized('https://docs.google.com/DOCUMENT/d/123')).toBe(
      true,
    );
    expect(checkIsSpecialized('https://example.com/FILE.PDF')).toBe(true);
  });
});
