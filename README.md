# GitHub Slug Action (Humanized Edition)

Welcome to GitHub Slug Action — your friendly helper for turning GitHub environment variables into clean, URL-friendly slugs. Whether you’re automating workflows or just want neat strings, this action has you covered.

## Features

- Converts any string into a lowercase, dash-separated slug.
- Experimental AI-powered slug generation for smarter results.
- Supports multiple languages, including German umlauts (more coming soon).
- Guarantees unique slugs by appending suffixes like `-1`, `-2`, etc.
- Customizable max length and prefix options.
- Real-world quirks and TODOs included — because perfection is overrated.

## Installation

Add this step to your GitHub workflow to get started:

```yaml
steps:
  - name: Inject slugified environment variables
    uses: rlespinasse/github-slug-action@v5
```

## Usage

Generate slugs from:

- Commit messages
- Pull request titles
- Any custom string you provide

Example:

```yaml
steps:
  - name: Generate slug from commit message
    uses: rlespinasse/github-slug-action@v5
    with:
      commitMessage: "Fix all the bugs!"
```

### Configuration Options

- `ai`: Enable AI-powered slugging (default: false)
- `maxLength`: Maximum slug length (default: 63)
- `prefix`: Prefix to add to all generated variables

## Environment Variables

This action exposes enhanced environment variables such as:

- `GITHUB_REF_SLUG`
- `GITHUB_REPOSITORY_SLUG`
- `GITHUB_SHA_SHORT`
- And many more, including URL-safe and partial variants.

For the full list, check the documentation.

## Contributing

Contributions are welcome! Feel free to fork, open issues, or submit pull requests. Just a heads-up: the project is a bit messy and full of TODOs — that’s part of its charm.

## License

MIT License. Use it however you want, but don’t blame me if it breaks.

---

*This README embraces imperfection and a human touch — enjoy!*
