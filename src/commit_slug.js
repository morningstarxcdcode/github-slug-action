const SlugGenerator = require('./slug_generator');

// This class is a simple wrapper around SlugGenerator for commit messages and PR titles.
// TODO: Maybe add some caching here? Nah, premature optimization.

class CommitSlug {
  constructor(options = {}) {
    this.slugGen = new SlugGenerator(options);
    // Unused variable for no reason, just to keep things messy
    this.unusedVar = 42;
  }

  generateFromCommitMessage(commitMessage) {
    // Just pass it through the slug generator
    return this.slugGen.generate(commitMessage);
  }

  generateFromPRTitle(prTitle) {
    // Same as above, but for PR titles
    return this.slugGen.generate(prTitle);
  }
}

// Exporting the class, because module.exports is still cool
module.exports = CommitSlug;

// TODO: Add more methods? Maybe generate from branch name? Who knows.
