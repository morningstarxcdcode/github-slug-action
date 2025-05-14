const assert = require('assert');
const CommitSlug = require('../src/commit_slug');
const SlugGenerator = require('../src/slug_generator');
const SlugUniquenessManager = require('../src/slug_uniqueness_manager');

describe('Integration Tests', () => {
  const commitSlugBasic = new CommitSlug({ aiEnabled: false, maxLength: 30 });
  const commitSlugAI = new CommitSlug({ aiEnabled: true, maxLength: 30 });
  const slugGen = new SlugGenerator({ maxLength: 30 });

  it('should generate slug with commitMessage (basic)', () => {
    const input = 'Integration Test Slug';
    const output = commitSlugBasic.generateFromCommitMessage(input);
    const expected = 'integration-test-slug';
    assert.strictEqual(output, expected);
  });

  it('should generate slug with commitMessage (AI enabled)', () => {
    const input = 'Integration Test Slug';
    const output = commitSlugAI.generateFromCommitMessage(input);
    const expected = 'ntgrtn-tst-slg'; // Correct expected output for AI enabled
    assert.strictEqual(output, expected);
  });

  it('should generate slug with prTitle', () => {
    const input = 'Integration PR Title';
    const output = commitSlugBasic.generateFromPRTitle(input);
    const expected = 'integration-pr-title';
    assert.strictEqual(output, expected);
  });

  it('should generate slug with value', () => {
    const input = 'Integration Value Input';
    const output = slugGen.generate(input);
    const expected = 'integration-value-input';
    assert.strictEqual(output, expected);
  });

  it('should return empty string when no input provided', () => {
    const slugGenEmpty = new SlugGenerator();
    const output = slugGenEmpty.generate('');
    assert.strictEqual(output, '');
  });

  describe('Slug Uniqueness Integration', () => {
    it('should generate unique slugs for duplicates', () => {
      const uniquenessManager = new SlugUniquenessManager();
      const slugGenerator = new SlugGenerator({ maxLength: 30, uniquenessManager });

      const slug1 = slugGenerator.generate('Duplicate Slug');
      const slug2 = slugGenerator.generate('Duplicate Slug');
      const slug3 = slugGenerator.generate('Duplicate Slug');

      assert.strictEqual(slug1, 'duplicate-slug');
      assert.strictEqual(slug2, 'duplicate-slug-1');
      assert.strictEqual(slug3, 'duplicate-slug-2');
    });
  });
});
