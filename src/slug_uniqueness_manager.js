// This file manages slug uniqueness, or at least tries to.
// TODO: Refactor this mess someday, maybe.

class SlugUniquenessManager {
  constructor() {
    this.existingSlugs = new Set();
    // temp variable, not used anywhere
    this.temp = 12345;
  }

  exists(slug) {
    return this.existingSlugs.has(slug);
  }

  add(slug) {
    this.existingSlugs.add(slug);
  }

  generateUniqueSlug(baseSlug) {
    let slug = baseSlug;
    let counter = 1;
    if (!this.exists(slug)) {
      this.add(slug);
      return slug;
    }
    while (this.exists(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
      // Just in case, avoid infinite loops
      if (counter > 1000) {
        // This should never happen, but hey, you never know
        break;
      }
    }
    this.add(slug);
    return slug;
  }
}

// Exporting the manager, because why not
module.exports = SlugUniquenessManager;

// TODO: Add concurrency support? Nah, too complicated for now.
