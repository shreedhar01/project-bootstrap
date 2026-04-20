# Tech Stack

## Runtime

- Node.js as the execution runtime
- pnpm as the primary package manager for development and package consumption

## Language

- TypeScript for implementation

TypeScript is preferred because it improves maintainability, makes prompt and template logic safer to evolve, and supports long-term scalability as more scaffold types are added.

## CLI Layer

- A Node.js CLI entrypoint
- An interactive prompt library for collecting user choices

Recommended direction:

- `commander` or native argument handling for CLI entry setup
- `prompts` or `@inquirer/prompts` for interactive questions

## Scaffolding Strategy

- Template-driven project generation
- File and directory copying with token replacement where needed

Recommended direction:

- Keep templates inside the package repository
- Separate template assets by project type
- Keep generation logic independent from template contents

## Packaging

- Publish to npm registry
- Support execution through create-package conventions

Recommended direction:

- Package naming and binary configuration should align with npm create package expectations
- Distribution should be lightweight and fast to install

## Quality Baseline

- ESLint for linting
- Prettier for formatting
- A lightweight test setup for CLI and generator behavior

Recommended direction:

- Unit tests for prompt-to-template resolution logic
- Integration tests for scaffold output validation

## Repository Structure Direction

Suggested long-term layout:

```text
spec/
  constitution/
    mission.md
    tech-stack.md
    roadmap.md
  features/
src/
  cli/
  core/
  templates/
tests/
```

## Non-Goals For Now

- Locking into a specific frontend or backend framework today
- Supporting every package manager at the start
- Overengineering the architecture before the first working scaffolder exists
