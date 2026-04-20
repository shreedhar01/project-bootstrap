# Feature Specification

## Feature Name

Frontend scaffold generation

## Objective

Define the first real scaffold generation feature for the frontend option.

When the user selects `frontend`, the CLI should generate a basic frontend project using this stack:

- Vite-React
- Axios
- TanStack Query
- Tailwind CSS
- React Router DOM
- Context API for app-level state

This feature is about defining what the generated frontend starter should include. It does not cover backend or fullstack generation.

## User Story

As a developer, I want the frontend option to generate a ready-to-run React starter with my preferred stack so that I can begin development without repeating the same setup every time.

## In Scope

- Frontend scaffold generation after selecting `frontend`
- Vite-based React application setup
- Axios installation and baseline client setup
- TanStack Query installation and provider setup
- Tailwind CSS setup
- React Router DOM setup
- Context API setup for shared application state
- Sensible default folder structure
- Minimal starter pages and routing

## Out of Scope

- Backend scaffold generation
- Fullstack scaffold generation
- Authentication flows
- API business logic
- Form libraries
- State libraries other than Context API
- Advanced Tailwind design system setup
- Testing libraries unless later specified

## Required Stack

The generated frontend project must use:

- `vite-react`
- `axios`
- `@tanstack/react-query`
- `tailwindcss`
- `react-router-dom`

The generated frontend project must not introduce other state libraries such as:

- Redux
- Zustand
- Recoil
- MobX

Shared state in the starter must use React Context API.

## Functional Requirements

1. If the user selects `frontend`, the generator must create a Vite React project.
2. The generated project must include Axios as the HTTP client dependency.
3. The generated project must include TanStack Query for async server-state handling.
4. The generated project must include Tailwind CSS configured and usable immediately.
5. The generated project must include React Router DOM configured for app routing.
6. The generated project must include a Context API setup for shared client-side state.
7. The generated project must start with a basic but usable folder structure.
8. The generated project must include at least one routed page and a root layout or app shell.
9. The generated project must be installable and runnable after generation.

## Behavioral Notes

- The frontend starter should feel minimal but production-aware.
- Context API should be used only for app-level shared client state, not as a replacement for server-state handling.
- TanStack Query should handle remote data concerns.
- Axios should be prepared in a reusable client module.
- Routing should be present from the beginning, even if the app starts with only a small number of pages.

## Proposed Generated Areas

The generated app should likely include structure similar to:

- `src/app`
- `src/pages`
- `src/components`
- `src/context`
- `src/lib`
- `src/routes`

Exact file names can be finalized during implementation.

## Acceptance Criteria

- Choosing `frontend` triggers frontend scaffold generation instead of a placeholder greeting.
- The generated app is based on Vite React.
- Axios, TanStack Query, Tailwind CSS, and React Router DOM are installed and wired.
- Shared app state uses Context API.
- The generated structure is coherent and extendable.
- The generated app can be installed and started successfully.
