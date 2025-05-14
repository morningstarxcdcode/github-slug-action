const SlugGenerator = require('./slug_generator');

class CommitSlug {
  constructor(options = {}) {
    this.slugGen = new SlugGenerator(options);
  }

  generateFromCommitMessage(commitMessage) {
    return this.slugGen.generate(commitMessage);
  }

  generateFromPRTitle(prTitle) {
    return this.slugGen.generate(prTitle);
  }
}

module.exports = CommitSlug;
