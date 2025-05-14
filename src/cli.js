#!/usr/bin/env node

const SlugGenerator = require('./slug_generator');
const CommitSlug = require('./commit_slug');
const yargs = require('yargs');

const argv = yargs
  .option('value', {
    alias: 'v',
    description: 'Value to slugify',
    type: 'string',
  })
  .option('ai', {
    alias: 'a',
    description: 'Enable AI-powered slug generation',
    type: 'boolean',
    default: false,
  })
  .option('maxLength', {
    alias: 'm',
    description: 'Maximum length of the slug',
    type: 'number',
    default: 63,
  })
  .option('commitMessage', {
    alias: 'c',
    description: 'Commit message to generate slug from',
    type: 'string',
  })
  .option('prTitle', {
    alias: 'p',
    description: 'Pull request title to generate slug from',
    type: 'string',
  })
  .help()
  .alias('help', 'h').argv;

const slugGen = new SlugGenerator({
  aiEnabled: argv.ai,
  maxLength: argv.maxLength,
});

const commitSlug = new CommitSlug({
  aiEnabled: argv.ai,
  maxLength: argv.maxLength,
});

if (argv.commitMessage) {
  const slug = commitSlug.generateFromCommitMessage(argv.commitMessage);
  console.log(slug);
} else if (argv.prTitle) {
  const slug = commitSlug.generateFromPRTitle(argv.prTitle);
  console.log(slug);
} else if (argv.value) {
  const slug = slugGen.generate(argv.value);
  console.log(slug);
} else {
  console.error('Please provide a value, commitMessage, or prTitle to generate slug.');
  process.exit(1);
}
