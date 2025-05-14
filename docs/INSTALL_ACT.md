# Installing 'act' for Local GitHub Actions Testing

'act' is a tool to run GitHub Actions locally for testing workflows.

## Installation

### macOS (using Homebrew)
```bash
brew install act
```

### Linux (using package manager or binary)
- Download the latest release from https://github.com/nektos/act/releases
- Extract and move the binary to your PATH, e.g. `/usr/local/bin`

### Windows
- Download the latest release from https://github.com/nektos/act/releases
- Add the binary to your system PATH

## Usage

Run GitHub Actions workflows locally with:
```bash
act
```

To run a specific job:
```bash
act -j job_id
```

## Notes

- You may need to configure secrets and environment variables for your workflows.
- Refer to the official documentation: https://github.com/nektos/act

---

If you prefer, I can also assist with alternative testing methods without 'act'.
