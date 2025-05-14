const assert = require('assert');
const SlugGenerator = require('../src/slug_generator');

describe('Edge Case Tests', () => {
  const slugGen = new SlugGenerator({ maxLength: 63 });

  it('should return empty string for empty input', () => {
    assert.strictEqual(slugGen.generate(''), '');
  });

  it('should return empty string for null input', () => {
    assert.strictEqual(slugGen.generate(null), '');
  });

  it('should return empty string for undefined input', () => {
    assert.strictEqual(slugGen.generate(undefined), '');
  });

  it('should handle very long input by truncating', () => {
    const longInput = 'a'.repeat(1000);
    const slug = slugGen.generate(longInput);
    assert.strictEqual(slug.length, 63);
  });

  it('should handle input with only special characters', () => {
    const input = '!@#$%^&*()_+=[]{}|;:\'",.<>?/~`';
    const slug = slugGen.generate(input);
    assert.strictEqual(typeof slug, 'string');
    assert(slug.length > 0);
  });

  it('should handle input with mixed languages', () => {
    const input = 'English русский Deutsch äöüß';
    const slug = slugGen.generate(input);
    assert.strictEqual(typeof slug, 'string');
    assert(slug.length > 0);
  });
});
