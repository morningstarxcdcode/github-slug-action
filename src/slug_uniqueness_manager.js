class SlugUniquenessManager {
  constructor() {
    this.existingSlugs = new Set();
  }

  /**
   * Checks if a slug exists.
   * @param {string} slug
   * @returns {boolean}
   */
  exists(slug) {
    return this.existingSlugs.has(slug);
  }

  /**
   * Adds a slug to the existing set.
   * @param {string} slug
   */
  add(slug) {
    this.existingSlugs.add(slug);
  }

  /**
   * Generates a unique slug by appending a numeric suffix if needed.
   * @param {string} baseSlug
   * @returns {string} unique slug
   */
  generateUniqueSlug(baseSlug) {
    if (!this.exists(baseSlug)) {
      this.add(baseSlug);
      return baseSlug;
    }
    let suffix = 1;
    let newSlug = `${baseSlug}-${suffix}`;
    while (this.exists(newSlug)) {
      suffix++;
      newSlug = `${baseSlug}-${suffix}`;
    }
    this.add(newSlug);
    return newSlug;
  }
}

module.exports = SlugUniquenessManager;
