# Feature Specification

## Feature Name

Fullstack scaffold generation

## Objective

Define the fullstack scaffold generation feature for the `fullstack` option.

When the user selects `fullstack`, the CLI should generate a complete application structure that includes both a frontend and a backend as separate, side-by-side projects, along with a local database setup using Docker Compose.

This feature combines the frontend and backend scaffoldings into a single project structure.

## User Story

As a developer, I want the `fullstack` option to generate a complete React frontend and an Express backend simultaneously so that I can start building a connected application with a local PostgreSQL database setup without manual configuration.

## In Scope

- Fullstack scaffold generation after selecting `fullstack`
- Creation of a `frontend/` directory with a Vite React starter (matches the `frontend` feature)
- Creation of a `backend/` directory with an Express TypeScript starter (matches the `backend` feature)
- Root-level `docker-compose.db.yaml` for a local PostgreSQL database
- Root-level `.gitignore` that handles both projects
- Independent package management for each project (no monorepo tooling required for now)

## Out of Scope

- Monorepo tooling (e.g., Turborepo, Nx, Lerna)
- Shared type packages between frontend and backend in this version
- Advanced Docker setups beyond a local database
- Specific authentication or business logic integrations

## Required Stack

### Frontend
- Vite-React
- Axios
- TanStack Query
- Tailwind CSS
- React Router DOM
- Context API

### Backend
- Express
- Drizzle ORM
- Zod
- TypeScript
- PostgreSQL (via Docker Compose)

## Functional Requirements

1. If the user selects `fullstack`, the generator must create a root project directory.
2. The generator must create a `frontend/` subdirectory and populate it with the frontend scaffold.
3. The generator must create a `backend/` subdirectory and populate it with the backend scaffold.
4. The generator must create a `docker-compose.db.yaml` at the root for a PostgreSQL instance.
5. The generator must create a root `.gitignore` file that ignores `node_modules`, `.env`, and other common files for both projects.
6. Both the frontend and backend projects must have their own `package.json` and `tsconfig.json` files.
7. The project should be ready for development once dependencies are installed in each directory and the database is started.

## Behavioral Notes

- The fullstack generation should reuse existing `generateFrontend` and `generateBackend` logic to maintain consistency.
- The project structure is "side-by-side" rather than a monorepo to keep the initial setup simple and understandable for new developers.
- The root level should be clean, containing only the project subdirectories and necessary infrastructure files.

## Proposed Generated Areas

The generated project should look like:

- `frontend/` - Standard frontend starter
- `backend/` - Standard backend starter
- `docker-compose.db.yaml` - PostgreSQL configuration
- `.gitignore` - Root-level git ignore rules

## Acceptance Criteria

- Choosing `fullstack` triggers fullstack scaffold generation.
- Both `frontend/` and `backend/` directories are created with their respective starters.
- Root contains `docker-compose.db.yaml` for database setup.
- Both projects are independent and can be started separately.
- The generated structure matches the specification and is usable.
