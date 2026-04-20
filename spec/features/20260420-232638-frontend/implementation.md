# Implementation

## Goal

Implement frontend scaffold generation for the `frontend` selection using the defined stack and a clean starter structure.

## Implementation Direction

The generator should move from placeholder CLI output to actual file and dependency generation for the frontend case.

The generated starter should be based on:

- Vite React
- Tailwind CSS
- Axios
- TanStack Query
- React Router DOM
- Context API

## Proposed Output Structure

```text
generated-project/
  package.json
  vite.config.ts
  index.html
  src/
    app/
    components/
    context/
    lib/
    pages/
    routes/
    main.tsx
    App.tsx
```

## Implementation Plan

1. Detect the `frontend` selection in the CLI flow.
2. Create a frontend template source inside the package repository.
3. Generate a Vite React app structure from the template.
4. Include Tailwind configuration and base styles.
5. Add React Router DOM route setup with a basic page flow.
6. Add TanStack Query provider setup near the app root.
7. Add an Axios client module in a reusable location.
8. Add a Context provider for shared client state.
9. Ensure generated project files and dependencies are internally consistent.

## Template Notes

- Templates should be stored inside the package so generation is deterministic.
- Frontend-specific files should be isolated from backend and fullstack templates.
- Dependency declarations should be explicit in the generated `package.json`.

## App Architecture Notes

- `main.tsx` should bootstrap providers and routing.
- Query client setup should live close to app startup.
- Axios should live in a reusable utility or `lib` directory.
- Context should model simple shared app state only.
- Pages and routes should be separated enough to scale beyond the starter.

## Minimal Starter Behavior

The starter should likely provide:

- A root route
- A home page
- A sample shared context provider
- A query client provider
- Tailwind-enabled styling

## Risks

- Overcomplicating the starter before the first real scaffold is stable
- Mixing too many opinions into the first frontend template
- Creating a structure that is hard to reuse across future frontend variants

## Done Criteria

- Frontend selection generates files instead of placeholder terminal output
- The generated project uses the required stack
- Routing, query provider, Axios setup, Tailwind, and Context API are present
- The generated project is runnable after dependency installation
