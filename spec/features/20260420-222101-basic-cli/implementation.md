# Implementation

## Goal

Implement the smallest possible CLI slice that proves:

- The package can run as a command
- The prompt flow works with modern interactive terminal behavior
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
2. Implement an interactive selector that listens for arrow-key input.
3. Render the list with one active option highlighted at a time.
4. Move selector logic into a small `core` helper so the CLI entry stays thin.
5. Map the selected option to a matching greeting string.
6. After Enter confirmation, print the matching greeting.
7. Exit cleanly.

## Suggested Technical Choices

- TypeScript for implementation
- A package binary mapped to the CLI entry build output
- Either:
  - a lightweight prompt library such as `prompts` or `@inquirer/prompts`
  - or a small custom raw-terminal selector if external dependencies are not yet being added

## Design Notes

- Keep the first entrypoint minimal and readable.
- Avoid introducing template or file-generation logic in this feature.
- Keep prompt and execution logic separated so later steps can map project type to scaffold logic.
- Prefer a terminal UX that matches common create-app tools.

## Pseudoflow

```text
start CLI
show interactive project type selector
user moves with arrow keys
user presses Enter on frontend/backend/fullstack
print selection-specific greeting
exit
```

## Risks

- Overbuilding the first feature before actual scaffold behavior is defined
- Mixing prompt code and future generation logic too early

## Done Criteria

- Runnable CLI entry exists
- Prompt works with arrow-key navigation
- One of the three options can be selected
- CLI prints the correct greeting for the selected option
- Structure is ready for next feature work
