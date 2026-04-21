# Feature Specification

## Feature Name

Backend scaffold generation

## Objective

Define the backend scaffold generation feature for the `backend` option.

When the user selects `backend`, the CLI should generate a professional-grade backend project using this stack:

- Express (Node.js framework)
- Drizzle ORM (Database access)
- Zod (Schema validation)
- TypeScript (Language)
- PostgreSQL (Default database target)

This feature defines the structure and setup of the generated backend starter.

## User Story

As a developer, I want the backend option to generate a production-ready Express starter with Drizzle ORM and Zod validation so that I can immediately start building APIs with type safety and a clean architecture.

## In Scope

- Backend scaffold generation after selecting `backend`
- Express application setup with TypeScript
- Drizzle ORM configuration and schema definition
- Zod integration for request validation
- Professional folder structure (Controllers, Services, Routes, etc.)
- Environment variable management (dotenv)
- Global error handling middleware
- Database connection and migration scripts setup

## Out of Scope

- Frontend scaffold generation
- Fullstack scaffold generation
- Authentication (OAuth, JWT, etc.) - provided as a baseline but not a full implementation
- Deployment configurations (Docker, CI/CD) unless basic
- Specific business logic implementations
- Integration with multiple database types (focus on PostgreSQL)

## Required Stack

The generated backend project must use:

- `express`
- `drizzle-orm`
- `drizzle-kit` (for migrations)
- `zod`
- `dotenv`
- `cors`
- `helmet` (for security)

## Functional Requirements

1. If the user selects `backend`, the generator must create an Express project with TypeScript.
2. The project must be configured with Drizzle ORM for database interactions.
3. Request validation must be handled using Zod schemas.
4. The project must have a clear separation of concerns: routes, controllers, and services.
5. The project must include a global error handler and a standard response format.
6. The project must include scripts for running the server in development and production modes.
7. The project must include scripts for database migrations using `drizzle-kit`.
8. The project must be ready to run after environment variables are configured and dependencies installed.

## Behavioral Notes

- The backend starter should follow industry best practices for Node.js/Express.
- Drizzle ORM should be set up with a separate schema file for easy management.
- Zod should be used to validate `req.body`, `req.query`, and `req.params`.
- Middleware should be used for security (Helmet), CORS, and logging (Morgan).

## Proposed Generated Areas

The generated app should include:

- `src/config` - Configuration files and environment variables.
- `src/api_v1/controllers` - Request handlers.
- `src/api_v1/middleware` - Custom middleware (auth, error handling, validation).
- `src/api_v1/routes` - API route definitions.
- `src/db` - Database connection and Drizzle schema.
- `src/services` - Business logic layer.
- `src/validators` - Zod validation schemas.
- `src/utils` - Utility functions and helpers (e.g., logger, apiError).

## Acceptance Criteria

- Choosing `backend` triggers backend scaffold generation.
- The generated project uses Express, Drizzle ORM, Zod, and TypeScript.
- The folder structure is professional and follows separation of concerns.
- Drizzle Kit is configured for migrations.
- The project includes a functional "health check" endpoint.
- The generated project can be compiled and started (assuming a DB is available).
