const { performance } = require('perf_hooks');
const SlugGenerator = require('../src/slug_generator');
const assert = require('assert');

describe('Performance Tests', () => {
  const slugGenBasic = new SlugGenerator({ aiEnabled: false, maxLength: 63 });
  const slugGenAI = new SlugGenerator({ aiEnabled: true, maxLength: 63 });

  const testString = 'This is a performance test string with some umlauts äöüß and other characters!';

  it('should generate basic slug quickly', () => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      slugGenBasic.generate(testString);
    }
    const end = performance.now();
    const duration = end - start;
    console.log(`Basic slug generation for 10,000 iterations took ${duration.toFixed(2)} ms`);
    assert(duration < 2000, 'Basic slug generation took too long');
  });

  it('should generate AI slug quickly', () => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      slugGenAI.generate(testString);
    }
    const end = performance.now();
    const duration = end - start;
    console.log(`AI slug generation for 10,000 iterations took ${duration.toFixed(2)} ms`);
    assert(duration < 3000, 'AI slug generation took too long');
  });
});
