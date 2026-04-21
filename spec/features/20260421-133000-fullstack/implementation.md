# Feature Implementation [COMPLETE]

The `fullstack` feature has been implemented by orchestrating the existing `frontend` and `backend` generators and adding root-level infrastructure files.

### 1. Update CLI Flow

- In `src/core/select-project-type.ts`, ensure `fullstack` is a selectable option.
- Update the choice handler to call `generateFullstack` when `fullstack` is selected.

### 2. Create Fullstack Generator

- Create `src/core/generate-fullstack.ts`.
- The `generateFullstack` function will:
    - Receive the target project path.
    - Create the base project directory.
    - Call `generateFrontend` with the path `<target>/frontend`.
    - Call `generateBackend` with the path `<target>/backend`.
    - Write a `docker-compose.db.yaml` file to the root of the project.
    - Write a root `.gitignore` file that covers both sub-projects.

### 3. Root-Level Infrastructure Files

- **`docker-compose.db.yaml`**: A basic configuration for a PostgreSQL database instance.
- **`.gitignore`**: A consolidated `.gitignore` file to manage both sub-projects from the root.

### 4. Adjust Existing Generators (if necessary)

- Ensure `generateFrontend` and `generateBackend` can correctly handle nested target paths.

## Proposed Code Structure

### `src/core/generate-fullstack.ts`

```typescript
import { generateFrontend } from './generate-frontend';
import { generateBackend } from './generate-backend';
import path from 'path';
import fs from 'fs-extra';

export async function generateFullstack(projectPath: string) {
    // Create subdirectories
    const frontendPath = path.join(projectPath, 'frontend');
    const backendPath = path.join(projectPath, 'backend');

    // Run generators
    await generateFrontend(frontendPath);
    await generateBackend(backendPath);

    // Add docker-compose for database
    const dockerComposeContent = `
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: fullstack_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
    `;
    await fs.writeFile(path.join(projectPath, 'docker-compose.db.yaml'), dockerComposeContent.trim());

    // Add root .gitignore
    const gitignoreContent = `
node_modules
.env
dist
build
.DS_Store
frontend/node_modules
frontend/dist
backend/node_modules
backend/dist
    `;
    await fs.writeFile(path.join(projectPath, '.gitignore'), gitignoreContent.trim());
}
```

## Integration with CLI

The `selectProjectType` function should be updated to include the `fullstack` option:

```typescript
// src/core/select-project-type.ts (simplified)
const choices = [
  { ti: 'frontend' },
  { title: 'Backend', valtle: 'Frontend', valueue: 'backend' },
  { title: 'Fullstack', value: 'fullstack' },
];
```

The switch statement for generation will then include:

```typescript
case 'fullstack':
    await generateFullstack(targetPath);
    break;
```
