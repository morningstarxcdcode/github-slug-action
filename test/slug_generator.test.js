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

  it('should apply German language specific rules', () => {
    const slugGenGerman = new SlugGenerator({ language: 'de', maxLength: 50 });
    const input = 'Füße über Ölstraße groß';
    const expected = 'fuesse-ueber-oelstrasse-gross';
    const result = slugGenGerman.generate(input);
    assert.strictEqual(result, expected);
  });

  // Edge case tests
  it('should handle input with only special characters', () => {
    const input = '!@#$%^&*()_+=';
    const expected = '_';
    const result = slugGenBasic.generate(input);
    assert.strictEqual(result, expected);
  });

  it('should handle very long input by truncating', () => {
    const input = 'a'.repeat(100);
    const expected = 'a'.repeat(50);
    const result = slugGenBasic.generate(input);
    assert.strictEqual(result, expected);
  });

  it('should handle null or undefined input gracefully', () => {
    assert.strictEqual(slugGenBasic.generate(null), '');
    assert.strictEqual(slugGenBasic.generate(undefined), '');
  });

  it('should handle input with mixed languages', () => {
    const input = 'Test тест Test';
    const expected = 'test-test-test';
    const result = slugGenBasic.generate(input);
    assert.strictEqual(result, expected);
  });
});
