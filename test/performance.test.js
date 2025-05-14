// Performance tests - because speed matters, kinda
// TODO: Add more realistic benchmarks, this is just a start

const assert = require('assert');
const SlugGenerator = require('../src/slug_generator');

describe('Performance Tests', () => {
  const slugGenBasic = new SlugGenerator({ aiEnabled: false, maxLength: 50 });
  const slugGenAI = new SlugGenerator({ aiEnabled: true, maxLength: 50 });

  it('should generate basic slug quickly', function () {
    this.timeout(5000);
    const input = 'Performance test string for slug generation';
    const iterations = 10000;
    const start = Date.now();
    for (let i = 0; i < iterations; i++) {
      slugGenBasic.generate(input);
    }
    const duration = Date.now() - start;
    console.log(`Basic slug generation for ${iterations} iterations took ${duration / 1000} seconds`);
    assert(duration < 5000, 'Basic slug generation took too long');
  });

  it('should generate AI slug quickly', function () {
    this.timeout(5000);
    const input = 'Performance test string for slug generation';
    const iterations = 10000;
    const start = Date.now();
    for (let i = 0; i < iterations; i++) {
      slugGenAI.generate(input);
    }
    const duration = Date.now() - start;
    console.log(`AI slug generation for ${iterations} iterations took ${duration / 1000} seconds`);
    assert(duration < 5000, 'AI slug generation took too long');
  });

  // TODO: Add memory usage tests
});
