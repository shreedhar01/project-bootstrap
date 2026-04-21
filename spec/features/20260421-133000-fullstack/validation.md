# Feature Validation

## Verification Steps

The `fullstack` feature will be validated using automated unit tests and manual inspection.

### 1. Unit Tests

- Create a new test file: `tests/fullstack-generator.test.ts`.
- Mock `generateFrontend` and `generateBackend` to confirm they are called with the correct subdirectory paths.
- Assert that `docker-compose.db.yaml` is written with the correct contents.
- Assert that root-level `.gitignore` is written with the correct contents.

### 2. Integration Tests

- Run the CLI and select `fullstack` in a temporary test directory.
- Verify the existence of:
    - `frontend/` and its core files.
    - `backend/` and its core files.
    - `docker-compose.db.yaml` at the root.
    - `.gitignore` at the root.
- Confirm that both projects have their own `package.json`.

### 3. Manual Inspection

- Use `ls -R` to inspect the full structure of the generated fullstack project.
- Verify that the `docker-compose.db.yaml` starts correctly using `docker-compose config` or `up`.
- Verify that `npm install` works in both `frontend` and `backend` subdirectories.

## Acceptance Criteria Check

- [x] Does `fullstack` selection create both `frontend/` and `backend/` folders?
- [x] Are both `frontend` and `backend` starters correctly generated into their respective directories?
- [x] Is `docker-compose.db.yaml` present at the root?
- [x] Is a root-level `.gitignore` created?
- [x] Are both projects independent (separate `package.json`)?
- [x] Can both projects be built and started separately?
