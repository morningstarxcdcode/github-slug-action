const assert = require('assert');
const SlugGenerator = require('../src/slug_generator');

describe('Environment Simulation Tests', () => {
  it('should generate slug from typical GitHub repository name', () => {
    const slugGen = new SlugGenerator({ maxLength: 50 });
    const repoName = 'user/repository-name_with.special*chars';
    const slug = slugGen.generate(repoName);
    assert.strictEqual(typeof slug, 'string');
    assert(slug.length <= 50);
  });

  it('should generate slug from typical commit message', () => {
    const slugGen = new SlugGenerator({ maxLength: 50 });
    const commitMessage = 'Fix issue #123: Corrected typo in README.md';
    const slug = slugGen.generate(commitMessage);
    assert.strictEqual(typeof slug, 'string');
    assert(slug.length <= 50);
  });

  it('should generate slug from typical PR title', () => {
    const slugGen = new SlugGenerator({ maxLength: 50 });
    const prTitle = 'Add new feature for advanced slug generation';
    const slug = slugGen.generate(prTitle);
    assert.strictEqual(typeof slug, 'string');
    assert(slug.length <= 50);
  });

  it('should handle empty environment variable values gracefully', () => {
    const slugGen = new SlugGenerator({ maxLength: 50 });
    const emptyValue = '';
    const slug = slugGen.generate(emptyValue);
    assert.strictEqual(slug, '');
  });

  it('should handle null and undefined environment variable values gracefully', () => {
    const slugGen = new SlugGenerator({ maxLength: 50 });
    assert.strictEqual(slugGen.generate(null), '');
    assert.strictEqual(slugGen.generate(undefined), '');
  });
});
