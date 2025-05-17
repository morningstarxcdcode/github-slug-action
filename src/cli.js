#!/usr/bin/env node

// Hey there! This is the CLI entry point. Nothing fancy, just some yargs magic.
// TODO: Maybe add some cool colors or animations later? Nah, who am I kidding.

const SlugGenerator = require('./slug_generator');
const CommitSlug = require('./commit_slug');
const yargs = require('yargs');

const argv = yargs
  .option('value', {
    alias: 'v',
    description: 'Value to slugify (like, the thing you want to slugify)',
    type: 'string',
  })
  .option('ai', {
    alias: 'a',
    description: 'Enable AI-powered slug generation (because why not?)',
    type: 'boolean',
    default: false,
  })
  .option('maxLength', {
    alias: 'm',
    description: 'Maximum length of the slug (default 63, but you do you)',
    type: 'number',
    default: 63,
  })
  .option('commitMessage', {
    alias: 'c',
    description: 'Commit message to generate slug from (if you want)',
    type: 'string',
  })
  .option('prTitle', {
    alias: 'p',
    description: 'Pull request title to generate slug from (fancy!)',
    type: 'string',
  })
  .option('verbose', {
    alias: 'b',
    description: 'Show detailed output (verbose mode)',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias('help', 'h').argv;

// Initialize slug generators
const slugGen = new SlugGenerator({
  aiEnabled: argv.ai,
  maxLength: argv.maxLength,
});

const commitSlug = new CommitSlug({
  aiEnabled: argv.ai,
  maxLength: argv.maxLength,
});

// Helper to print output based on verbosity
function printOutput(source, slug) {
  if (argv.verbose) {
    console.log(`Generated slug from ${source}: ${slug}`);
  } else {
    console.log(slug);
  }
}

// Main logic: pick what to slugify
if (argv.commitMessage) {
  const slug = commitSlug.generateFromCommitMessage(argv.commitMessage);
  printOutput('commit message', slug);
} else if (argv.prTitle) {
  const slug = commitSlug.generateFromPRTitle(argv.prTitle);
  printOutput('pull request title', slug);
} else if (argv.value) {
  const slug = slugGen.generate(argv.value);
  printOutput('value', slug);
} else {
  console.error('Error: Please provide a value, commitMessage, or prTitle to generate slug. Use --help to see options.');
  process.exit(1);
}

// TODO: Add more CLI options? Maybe a verbose mode? Meh.
