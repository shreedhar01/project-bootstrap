# Validation

## Validation Goal

Confirm that the first feature works as a minimal interactive CLI slice.

## Manual Validation Scenarios

### Scenario 1: CLI starts

Steps:

1. Run the package entry command locally.
2. Confirm the terminal shows a project-type prompt.

Expected Result:

- The CLI starts without crashing.
- The selection options are visible.

### Scenario 2: Frontend selection

Steps:

1. Start the CLI.
2. Select `frontend`.

Expected Result:

- The CLI prints `hello world, from frontend`.
- The process exits successfully.

### Scenario 3: Backend selection

Steps:

1. Start the CLI.
2. Select `backend`.

Expected Result:

- The CLI prints `hello world, from backend`.
- The process exits successfully.

### Scenario 4: Fullstack selection

Steps:

1. Start the CLI.
2. Select `fullstack`.

Expected Result:

- The CLI prints `hello world, from full-stack`.
- The process exits successfully.

## Validation Checklist

- CLI entrypoint is runnable
- Prompt appears correctly
- All three options are selectable
- Output matches the selected project type
- No file generation occurs in this feature

## Deferred Validation

The following checks are intentionally deferred to later features:

- Generated project structure validation
- Template correctness
- Dependency installation behavior
- Directory creation rules
- Framework-specific branching
