# Feature Specification

## Feature Name

Basic CLI scaffolding flow

## Objective

Create the first working slice of the package CLI.

The CLI should:

- Start successfully
- Show an interactive terminal project-type selector
- Offer these choices:
  - Frontend
  - Backend
  - Fullstack
- Print a selection-specific greeting to the terminal after a valid selection

This feature is intentionally minimal. It proves the CLI entry flow before any real project generation logic is added.

## User Story

As a developer, I want to run the package and choose what kind of project I want to create so that I can confirm the CLI interaction works before scaffolding is implemented.

## In Scope

- CLI entrypoint bootstraps correctly
- Interactive arrow-key selection for project type
- Support for three options:
  - Frontend
  - Backend
  - Fullstack
- Terminal output that includes the selected project type
- Basic internal structure for future scaffolding work

## Out of Scope

- Creating files or folders for generated projects
- Framework-specific options
- Target directory naming
- Dependency installation
- Template copying
- Post-generation setup

## Functional Requirements

1. The package must expose a runnable CLI entrypoint.
2. Running the CLI must present the user with an interactive selector for project-type choices.
3. The available choices must be `frontend`, `backend`, and `fullstack`.
4. The selector must support keyboard navigation with the up and down arrow keys.
5. The selector must confirm the current choice when the user presses Enter.
6. The currently active option must be visually distinguishable from the others.
7. After the user selects `frontend`, the CLI must print `hello world, from frontend`.
8. After the user selects `backend`, the CLI must print `hello world, from backend`.
9. After the user selects `fullstack`, the CLI must print `hello world, from full-stack`.
10. The command must exit successfully after printing the message.

## Behavioral Notes

- The selected option is used only to validate the interaction flow and branching.
- The message format should be fixed and predictable for all three options.
- The prompt should feel similar to modern scaffolding CLIs such as Vite or Next.js starters.

## Acceptance Criteria

- When the CLI starts, the user sees an interactive selector prompt.
- The user can move between options using arrow keys.
- The active option is highlighted.
- When the user picks `frontend`, the CLI prints `hello world, from frontend`.
- When the user picks `backend`, the CLI prints `hello world, from backend`.
- When the user picks `fullstack`, the CLI prints `hello world, from full-stack`.
- The code structure should be simple enough to extend into real scaffolding later.
