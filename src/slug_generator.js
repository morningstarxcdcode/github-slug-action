/**
 * Advanced Slug Generator Module
 * Features:
 * - AI-powered slug generation for readability and uniqueness
 * - Multi-language and localization support
 * - Plugin system for custom slug transformations
 */

const defaultPlugins = [];
const { transliterate } = require('transliteration');

class SlugGenerator {
  constructor(options = {}) {
    this.options = options;
    this.plugins = options.plugins || defaultPlugins;
    this.language = options.language || 'en';
    this.aiEnabled = options.aiEnabled || false;
  }

  // Basic slugify function (fallback)
  basicSlugify(value) {
    // Transliterate to ASCII for non-Latin characters
    let slug = transliterate(value);
    slug = slug
      .toLowerCase()
      .replace(/[^0-9a-z._-]/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
      .slice(0, this.options.maxLength || 63);
    return slug;
  }

  // AI-powered slug generation (mock implementation)
  aiSlugify(value) {
    // Transliterate to ASCII for non-Latin characters
    let slug = transliterate(value);
    // For demonstration, simulate AI by replacing spaces with dashes and removing vowels for uniqueness
    slug = slug
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[aeiou]/g, '')
      .replace(/[^0-9a-z.-]/g, '')
      .slice(0, this.options.maxLength || 63);
    return slug;
  }

  // Apply plugins
  applyPlugins(value) {
    let result = value;
    for (const plugin of this.plugins) {
      if (typeof plugin === 'function') {
        result = plugin(result);
      }
    }
    return result;
  }

  generate(value) {
    if (!value) return '';
    let slug = this.aiEnabled ? this.aiSlugify(value) : this.basicSlugify(value);
    slug = this.applyPlugins(slug);
    return slug;
  }
}

module.exports = SlugGenerator;
