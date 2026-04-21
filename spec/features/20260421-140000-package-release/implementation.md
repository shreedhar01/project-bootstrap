# Implementation: Package Release Automation

## Overview
The implementation involves configuring `semantic-release` for versioning, `husky` for git hooks, and GitHub Actions for the CI/CD pipeline.

## 1. Commit Rules with Husky and Commitlint

### Dependencies
- `husky`
- `@commitlint/config-conventional`
- `@commitlint/cli`

### Configuration
- Initialize husky: `npx husky install`
- Add `commit-msg` hook: `npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`
- Create `commitlint.config.js`:
  ```javascript
  module.exports = { extends: ['@commitlint/config-conventional'] };
  ```

## 2. Versioning with Semantic Release

### Dependencies
- `semantic-release`
- `@semantic-release/changelog`
- `@semantic-release/git`
- `@semantic-release/github`
- `@semantic-release/npm`

### Configuration
Create a `.releaserc` or `release.config.js` file:
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```

## 3. CI/CD with GitHub Actions

### Workflow File
Create `.github/workflows/release.yml`:
```yaml
name: Release
on:
  push:
    branches:
      - main
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 'lts/*'
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install
      - name: Run tests
        run: pnpm test
      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

## 4. npm Configuration
Ensure `package.json` has `publishConfig` if using a scoped package:
```json
"publishConfig": {
  "access": "public"
}
```
