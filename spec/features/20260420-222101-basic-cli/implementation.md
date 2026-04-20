# Implementation

## Goal

Implement the smallest possible CLI slice that proves:

- The package can run as a command
- The prompt flow works
- The codebase has a clean starting structure for later scaffold generation

## Proposed Structure

```text
src/
  cli/
    index.ts
  core/
    select-project-type.ts
```

## Implementation Plan

1. Create a CLI entry file in `src/cli/index.ts`.
2. Initialize an interactive prompt for project type selection.
3. Move prompt logic into a small `core` helper so the CLI entry stays thin.
4. Map the selected option to a matching greeting string.
5. After selection, print the matching greeting.
6. Exit cleanly.

## Suggested Technical Choices

- TypeScript for implementation
- A lightweight prompt library such as `prompts` or `@inquirer/prompts`
- A package binary mapped to the CLI entry build output

## Design Notes

- Keep the first entrypoint minimal and readable.
- Avoid introducing template or file-generation logic in this feature.
- Keep prompt and execution logic separated so later steps can map project type to scaffold logic.

## Pseudoflow

```text
start CLI
show project type prompt
user selects frontend/backend/fullstack
print selection-specific greeting
exit
```

## Risks

- Overbuilding the first feature before actual scaffold behavior is defined
- Mixing prompt code and future generation logic too early

## Done Criteria

- Runnable CLI entry exists
- Prompt works
- One of the three options can be selected
- CLI prints the correct greeting for the selected option
- Structure is ready for next feature work
