import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { input } from "@inquirer/prompts";

import { generateFrontendProject } from "./generate-frontend.js";
import { generateBackendProject } from "./generate-backend.js";
import { assertTargetDirectoryIsEmpty, normalizeProjectName } from "./utils.js";

export async function promptForFullstackProjectName(): Promise<string> {
  const projectName = await input({
    message: "What should the fullstack project be named? (use '.' for current directory)",
    default: "fullstack-app",
    validate(value) {
      const normalized = normalizeProjectName(value);

      if (!normalized) {
        return "Enter a valid project name.";
      }

      return true;
    },
  });

  return normalizeProjectName(projectName);
}

export async function generateFullstackProject(
  currentWorkingDirectory: string,
  projectName: string,
): Promise<string> {
  const isCurrentDirectory = projectName === ".";
  const targetDirectory = isCurrentDirectory
    ? currentWorkingDirectory
    : path.join(currentWorkingDirectory, projectName);

  await assertTargetDirectoryIsEmpty(targetDirectory);

  if (!isCurrentDirectory) {
    await mkdir(targetDirectory, { recursive: true });
  }

  // Generate Frontend
  await generateFrontendProject(targetDirectory, "frontend");

  // Generate Backend
  await generateBackendProject(targetDirectory, "backend");

  // Add docker-compose.db.yaml
  const dockerComposeContent = `version: '3.8'

services:
  db:
    image: postgres:15-alpine
    restart: always
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
  await writeFile(path.join(targetDirectory, "docker-compose.db.yaml"), dockerComposeContent, "utf8");

  // Add root .gitignore
  const gitignoreContent = `node_modules
.env
dist
build
.DS_Store

`;
  await writeFile(path.join(targetDirectory, ".gitignore"), gitignoreContent, "utf8");

  return targetDirectory;
}
