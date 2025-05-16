# GitHub Slug Action (Humanized Edition)

Hey there! This is a GitHub Action that helps you generate slugified versions of GitHub environment variables. Perfect for when you want clean, URL-friendly strings in your workflows without the hassle.

## Features

- Converts strings to lowercase slugs with dashes.
- AI-powered slug generation (experimental, kinda lazy but fun).
- Supports multiple languages (German umlauts handled, more to come).
- Ensures slug uniqueness with suffixes like `-1`, `-2`, etc.
- Configurable max length and prefixes.
- Loads of TODOs and quirks because, well, it’s human-made.

## Installation

Just add this step to your GitHub workflow:

```yaml
steps:
  - name: Inject slugified env vars
    uses: rlespinasse/github-slug-action@v5
```

## Usage

You can generate slugs from:

- Commit messages
- Pull request titles
- Any custom string value

Example:

```yaml
steps:
  - name: Generate slug from commit message
    uses: rlespinasse/github-slug-action@v5
    with:
      commitMessage: "Fix all the bugs!"
```

Config options:

- `ai`: Enable AI-powered slugging (default: false)
- `maxLength`: Max length of slug (default: 63)
- `prefix`: Add a prefix to all generated variables

## Environment Variables

This action exposes enhanced environment variables like:

- `GITHUB_REF_SLUG`
- `GITHUB_REPOSITORY_SLUG`
- `GITHUB_SHA_SHORT`
- And many more, including URL-safe and partial variants.

Check the docs for the full list.

## Contributing

Feel free to fork, open issues, or send PRs. Just beware, this project is a bit messy and full of TODOs!

## License

MIT License. Do whatever you want, just don’t blame me if it breaks.

---

*Note: This README is intentionally casual and imperfect, just like the codebase. Enjoy!*
