/**
 * Advanced Slug Generator Module
 * Features:
 * - AI-powered slug generation for readability and uniqueness
 * - Multi-language and localization support
 * - Plugin system for custom slug transformations
 */

const defaultPlugins = [];
const { transliterate } = require('transliteration');

const languageSpecificRules = {
  de: (str) => str.replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss'),
  deUpper: (str) => str.replace(/Ä/g, 'Ae').replace(/Ö/g, 'Oe').replace(/Ü/g, 'Ue'),
};

class SlugGenerator {
  constructor(options = {}) {
    this.options = options;
    this.plugins = options.plugins || defaultPlugins;
    this.language = options.language || 'en';
    this.aiEnabled = options.aiEnabled || false;
    this.uniquenessManager = options.uniquenessManager || null;

    // Precompile regexes
    this.basicReplaceRegex = /[^0-9a-z._-]/g;
    this.basicTrimRegexStart = /^-+/;
    this.basicTrimRegexEnd = /-+$/;
    this.aiSpaceRegex = /\s+/g;
    this.aiVowelRegex = /[aeiou]/g;
    this.aiAllowedCharsRegex = /[^0-9a-z.-]/g;

    // Cache for language-specific replacements
    this.langCache = new Map();
    // Cache for transliteration results
    this.translitCache = new Map();
  }

  applyLanguageRules(value) {
    if (this.langCache.has(value)) {
      return this.langCache.get(value);
    }
    let result = value;
    if (languageSpecificRules[this.language]) {
      result = languageSpecificRules[this.language](result);
    }
    if (this.language === 'de') {
      result = languageSpecificRules.deUpper(result);
    }
    this.langCache.set(value, result);
    return result;
  }

  transliterateCached(value) {
    if (this.translitCache.has(value)) {
      return this.translitCache.get(value);
    }
    const result = transliterate(value);
    this.translitCache.set(value, result);
    return result;
  }

  basicSlugify(value) {
    value = this.applyLanguageRules(value);
    let slug = this.transliterateCached(value);
    slug = slug
      .toLowerCase()
      .replace(this.basicReplaceRegex, '-')
      .replace(this.basicTrimRegexStart, '')
      .replace(this.basicTrimRegexEnd, '')
      .slice(0, this.options.maxLength || 63);
    return slug;
  }

  aiSlugify(value) {
    value = this.applyLanguageRules(value);
    let slug = this.transliterateCached(value);
    slug = slug
      .toLowerCase()
      .replace(this.aiSpaceRegex, '-')
      .replace(this.aiVowelRegex, '')
      .replace(this.aiAllowedCharsRegex, '')
      .slice(0, this.options.maxLength || 63);
    return slug;
  }

  applyPlugins(value) {
    if (!this.plugins.length) return value;
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
    if (this.uniquenessManager) {
      slug = this.uniquenessManager.generateUniqueSlug(slug);
    }
    return slug;
  }
}

module.exports = SlugGenerator;
