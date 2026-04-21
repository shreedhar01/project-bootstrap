# Validation

## Validation Goal

Confirm that the backend scaffold feature generates a professional-grade starter project with the expected stack, structure, and functionality.

## Manual Validation Scenarios

### Scenario 1: Backend generation runs

Steps:

1. Start the CLI.
2. Select `backend`.
3. Complete generation in a target directory.

Expected Result:

- A new backend project directory is created.
- The generated files follow the professional folder structure (controllers, services, etc.).

### Scenario 2: Dependencies are correct

Steps:

1. Open the generated `package.json`.
2. Inspect the declared dependencies.

Expected Result:

- The project includes `express`.
- The project includes `drizzle-orm` and `drizzle-kit`.
- The project includes `zod`.
- The project includes `typescript` and `@types/express`.

### Scenario 3: Folder structure is professional

Steps:

1. Open the generated project in an editor.
2. Inspect the `src` directory.

Expected Result:

- `src/api_v1/` contains `controllers`, `routes`, and `middleware`.
- Separate directories for `services`, `db`, `validators`, `config`, and `utils` exist.
- An `app.ts` and `server.ts` are present.

### Scenario 4: App compiles and boots

Steps:

1. Install dependencies in the generated project.
2. Run `npm run build`.
3. Run `npm run dev` (assuming DB is not required for basic boot or mocked).

Expected Result:

- The project compiles without TypeScript errors.
- The server starts and listens on the configured port.

### Scenario 5: API validation and health check

Steps:

1. Send a GET request to `/health`.
2. Inspect the response.

Expected Result:

- The server returns a 200 OK status.
- The response body contains system health information.

### Scenario 6: Database configuration is present

Steps:

1. Inspect `drizzle.config.ts` and `src/db/index.ts`.

Expected Result:

- Drizzle is configured correctly.
- A sample schema is defined in `src/db/schema.ts`.

## Validation Checklist

- Backend selection triggers real scaffold generation.
- Generated project uses Express, Drizzle, and Zod.
- `src/api_v1/` structure is present.
- `src/utils/apiError.ts` is present.
- TypeScript is configured correctly.
- Global error handling is implemented.
- Zod validation middleware is present.
- Health check endpoint is functional.
- Drizzle migrations are configurable.

## Deferred Validation

- Actual database connectivity (requires a running PostgreSQL instance).
- Advanced authentication integration.
- Performance benchmarking.
- Complex business logic testing.
