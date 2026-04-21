# Validation: Package Release Automation

## 1. Commit Rule Validation
### Test Case: Reject Non-Conventional Commit
- **Action**: Attempt to commit with a message like `git commit -m "fixed some stuff"`.
- **Expected Result**: Husky should intercept the commit and fail with an error message from `commitlint` explaining the format violation.

### Test Case: Accept Conventional Commit
- **Action**: Attempt to commit with a message like `git commit -m "fix: resolve memory leak in template generator"`.
- **Expected Result**: The commit should succeed.

## 2. CI/CD and Release Validation
### Test Case: Dry Run Semantic Release
- **Action**: Run `npx semantic-release --dry-run` locally with a fake `GITHUB_TOKEN` or in a safe environment.
- **Expected Result**: The output should correctly identify the next version based on the commit history since the last tag.

### Test Case: GitHub Action Execution
- **Action**: Push a valid `feat:` or `fix:` commit to the `main` branch.
- **Expected Result**: 
    1. The GitHub Action "Release" starts.
    2. Tests pass.
    3. `semantic-release` executes.
    4. A new version tag is created on GitHub.
    5. A new release is visible in the GitHub repository's "Releases" section.
    6. The package is updated on npm (if credentials are correct).

## 3. Maintenance Validation
### Test Case: Changelog Generation
- **Action**: Check `CHANGELOG.md` after a successful release.
- **Expected Result**: The file should contain a new section for the released version with a list of changes derived from commit messages.
