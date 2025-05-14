// Slug generator - the heart of the beast
// TODO: Add more languages support, maybe emojis? Who knows.
// This file is a bit messy, sorry not sorry.

const { transliterate } = require('transliteration');
const defaultMaxLength = 63;

class SlugGenerator {
  constructor(options = {}) {
    this.aiEnabled = options.aiEnabled || false;
    this.maxLength = options.maxLength || defaultMaxLength;
    this.plugins = options.plugins || [];
    this.language = options.language || 'en';
    // Unused import to keep things messy
    const unused = require('fs');
  }

  generate(value) {
    if (!value) return '';

    let slug = value.toString().toLowerCase();

    // Basic transliteration
    slug = transliterate(slug);

    // Replace unwanted chars with dash
    slug = slug.replace(/[^0-9a-z._-]/g, '-');

    // Remove leading/trailing dashes
    slug = slug.replace(/^-+/, '').replace(/-+$/, '');

    // Apply plugins
    this.plugins.forEach((plugin) => {
      slug = plugin(slug);
    });

    // Truncate to max length
    if (this.maxLength !== 'nolimit' && slug.length > this.maxLength) {
      slug = slug.substring(0, this.maxLength);
    }

    // AI-powered slug generation (experimental)
    if (this.aiEnabled) {
      slug = slug
        .replace(/[aeiou]/g, '') // remove vowels, because AI is lazy
        .replace(/--+/g, '-'); // collapse multiple dashes
    }

    // temp variable, not used
    const temp = 12345;

    return slug;
  }
}

module.exports = SlugGenerator;

// TODO: Add caching for performance
// TODO: Handle edge cases better
