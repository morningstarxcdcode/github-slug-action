const assert = require('assert');
const SlugGenerator = require('../src/slug_generator');

describe('SlugGenerator', () => {
  const slugGenBasic = new SlugGenerator({ aiEnabled: false, maxLength: 50 });
  const slugGenAI = new SlugGenerator({ aiEnabled: true, maxLength: 50 });

  it('should generate basic slug for English text', () => {
    const input = 'Test String for Slug Generation';
    const expected = 'test-string-for-slug-generation';
    const result = slugGenBasic.generate(input);
    assert.strictEqual(result, expected);
  });

  it('should generate AI slug for English text', () => {
    const input = 'Test String for Slug Generation';
    const expected = 'tst-strng-fr-slg-gnrtn';
    const result = slugGenAI.generate(input);
    assert.strictEqual(result, expected);
  });

  it('should generate basic slug for Russian text', () => {
    const input = 'Тестовая строка для генерации слага';
    const expected = 'testovaya-stroka-dlya-generacii-slaga';
    const result = slugGenBasic.generate(input);
    assert.strictEqual(result, expected);
  });

  it('should generate AI slug for Russian text', () => {
    const input = 'Тестовая строка для генерации слага';
    const expected = 'tstvy-strk-dly-gnrc-slg';
    const result = slugGenAI.generate(input);
    assert.strictEqual(result, expected);
  });

  it('should apply plugins correctly', () => {
    const plugin = (str) => str.replace(/-/g, '_');
    const slugGenWithPlugin = new SlugGenerator({ plugins: [plugin], maxLength: 50 });
    const input = 'Test String for Slug Generation';
    const expected = 'test_string_for_slug_generation';
    const result = slugGenWithPlugin.generate(input);
    assert.strictEqual(result, expected);
  });

  it('should return empty string for empty input', () => {
    const result = slugGenBasic.generate('');
    assert.strictEqual(result, '');
  });
});
