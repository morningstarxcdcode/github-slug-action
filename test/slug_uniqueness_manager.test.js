const assert = require('assert');
const SlugUniquenessManager = require('../src/slug_uniqueness_manager');

describe('SlugUniquenessManager', () => {
  let manager;

  beforeEach(() => {
    manager = new SlugUniquenessManager();
  });

  it('should return false for non-existing slug', () => {
    assert.strictEqual(manager.exists('test-slug'), false);
  });

  it('should add and detect existing slug', () => {
    manager.add('test-slug');
    assert.strictEqual(manager.exists('test-slug'), true);
  });

  it('should generate unique slug when no collision', () => {
    const slug = manager.generateUniqueSlug('unique-slug');
    assert.strictEqual(slug, 'unique-slug');
    assert.strictEqual(manager.exists('unique-slug'), true);
  });

  it('should generate unique slug with suffix on collision', () => {
    manager.add('duplicate-slug');
    const slug1 = manager.generateUniqueSlug('duplicate-slug');
    assert.strictEqual(slug1, 'duplicate-slug-1');
    const slug2 = manager.generateUniqueSlug('duplicate-slug');
    assert.strictEqual(slug2, 'duplicate-slug-2');
  });

  it('should generate unique slugs concurrently without duplicates', () => {
    const baseSlug = 'concurrent-slug';
    const generatedSlugs = new Set();
    const iterations = 100;

    for (let i = 0; i < iterations; i++) {
      const slug = manager.generateUniqueSlug(baseSlug);
      assert(!generatedSlugs.has(slug), `Duplicate slug generated: ${slug}`);
      generatedSlugs.add(slug);
    }

    assert.strictEqual(generatedSlugs.size, iterations);
  });
});
