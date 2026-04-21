# Implementation

## Goal

Implement backend scaffold generation for the `backend` selection using a professional Express + Drizzle + Zod + TypeScript stack.

## Implementation Direction

The generator will provide a robust, scalable backend structure that moves beyond a simple "Hello World" and provides a real-world foundation.

## Proposed Output Structure

```text
generated-project/
  package.json
  tsconfig.json
  drizzle.config.ts
  .env.example
  src/
    server.ts           # Entry point
    app.ts              # Express app configuration
    config/             # Env vars and constants
      index.ts
    api_v1/
      controllers/        # Request handlers
        health.controller.ts
      middleware/         # Express middlewares
        error.middleware.ts
        validate.middleware.ts
      routes/             # Route definitions
        index.ts
        health.routes.ts
    db/                 # Database setup
      index.ts          # Connection
      schema.ts         # Table definitions
    services/           # Business logic
      health.service.ts
    validators/         # Zod schemas
      common.validators.ts
    utils/              # Helpers
      logger.ts
      async-handler.ts
      apiError.ts
```

## Implementation Plan

1. Detect the `backend` selection in the CLI flow.
2. Create a backend template source with the professional folder structure.
3. Configure `package.json` with necessary dependencies: `express`, `drizzle-orm`, `zod`, `dotenv`, etc.
4. Set up `tsconfig.json` for a modern Node.js environment.
5. Implement a base `app.ts` with standard middlewares (CORS, Helmet, JSON parsing).
6. Configure Drizzle ORM for postgres with a sample schema and connection logic.
7. Create a generic validation middleware that uses Zod schemas.
8. Implement a global error handling strategy.
9. Provide a sample health check route to verify all layers (Route -> Controller -> Service).
10. Ensure `drizzle-kit` is configured for easy migration management.

## Architectural Notes

- **Separation of Concerns**: Controllers handle HTTP concerns, Services handle business logic, and the DB layer handles data persistence.
- **Type Safety**: Zod schemas should be used to derive TypeScript types for end-to-end type safety.
- **Validation**: Request validation should happen early in the middleware chain.
- **Error Handling**: Use a centralized error handler to ensure consistent API responses.
- **Database**: Drizzle ORM is used for its "TypeScript-first" approach and lightweight footprint.

## Minimal Starter Behavior

The starter will include:
- A `/health` endpoint that returns system status.
- A sample database table definition in `schema.ts`.
- Environment variable loading and validation.
- A ready-to-use Drizzle migration setup.

## Risks

- Database connection issues during the first run if the user hasn't set up a local DB.
- Over-engineering the service layer for very small projects.
- Complexity in Drizzle setup for users unfamiliar with ORMs.

## Done Criteria

- Backend selection generates a full professional folder structure.
- The project includes Express, Drizzle, Zod, and TypeScript configurations.
- `npm run dev` starts the server successfully.
- `npm run generate` and `npm run push` (Drizzle Kit) are available for migrations.
- The project follows the proposed structure and architectural notes.
