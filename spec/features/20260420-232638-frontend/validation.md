# Validation

## Validation Goal

Confirm that the frontend scaffold feature generates a usable starter project with the expected stack and structure.

## Manual Validation Scenarios

### Scenario 1: Frontend generation runs

Steps:

1. Start the CLI.
2. Select `frontend`.
3. Complete generation in a target directory.

Expected Result:

- A new frontend project directory is created.
- The generated files match the frontend starter scope.

### Scenario 2: Dependencies are correct

Steps:

1. Open the generated `package.json`.
2. Inspect the declared dependencies.

Expected Result:

- The project includes React via Vite React setup.
- The project includes Axios.
- The project includes TanStack Query.
- The project includes Tailwind CSS.
- The project includes React Router DOM.
- No alternate state library is introduced.

### Scenario 3: Project structure is present

Steps:

1. Open the generated `src` directory.
2. Inspect the main app structure.

Expected Result:

- Routing-related files exist.
- Context-related files exist.
- A reusable Axios client location exists.
- Tailwind-enabled styling files exist.

### Scenario 4: App boots locally

Steps:

1. Install dependencies in the generated project.
2. Start the development server.

Expected Result:

- The project installs successfully.
- The dev server starts successfully.
- The starter application loads without immediate setup fixes.

### Scenario 5: Routing and providers are wired

Steps:

1. Inspect `main.tsx`, `App.tsx`, and route setup.
2. Inspect provider setup.

Expected Result:

- React Router DOM is wired into app startup.
- TanStack Query provider is configured.
- Context provider is configured.

## Validation Checklist

- Frontend selection triggers real scaffold generation
- Generated project uses Vite React
- Axios is present
- TanStack Query is present
- Tailwind CSS is present
- React Router DOM is present
- Context API is used for shared app state
- Starter app runs after install

## Deferred Validation

The following are deferred to later features:

- Authentication
- API integration details
- Production build optimization
- Testing setup
- Advanced route guards
- UI design system depth
