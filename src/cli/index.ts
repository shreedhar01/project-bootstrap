#!/usr/bin/env node

import path from "node:path";

import { generateFrontendProject, promptForProjectName } from "../core/generate-frontend.js";
import { generateBackendProject, promptForBackendProjectName } from "../core/generate-backend.js";
import { generateFullstackProject, promptForFullstackProjectName } from "../core/generate-fullstack.js";
import { selectProjectType } from "../core/select-project-type.js";

async function main(): Promise<void> {
  const projectType = await selectProjectType();

  if (projectType.key === "frontend") {
    const projectName = await promptForProjectName();
    const targetDirectory = await generateFrontendProject(process.cwd(), projectName);

    console.log(`Created frontend project in ${path.relative(process.cwd(), targetDirectory) || "."}`);
    console.log("Next steps:");
    console.log(`  cd ${projectName}`);
    console.log("  npm install");
    console.log("  npm run dev");
    return;
  }

  if (projectType.key === "backend") {
    const projectName = await promptForBackendProjectName();
    const targetDirectory = await generateBackendProject(process.cwd(), projectName);

    console.log(`Created backend project in ${path.relative(process.cwd(), targetDirectory) || "."}`);
    console.log("Next steps:");
    console.log(`  cd ${projectName}`);
    console.log("  npm install");
    console.log("  cp .env.example .env");
    console.log("  npm run dev");
    return;
  }

  if (projectType.key === "fullstack") {
    const projectName = await promptForFullstackProjectName();
    const targetDirectory = await generateFullstackProject(process.cwd(), projectName);

    console.log(`Created fullstack project in ${path.relative(process.cwd(), targetDirectory) || "."}`);
    console.log("Next steps:");
    console.log(`  cd ${projectName}`);
    console.log("  # Start database");
    console.log("  docker compose -f docker-compose.db.yaml up -d");
    console.log("  # Setup backend");
    console.log("  cd backend && npm install && cp .env.example .env && npm run dev");
    console.log("  # Setup frontend (in another terminal)");
    console.log("  cd frontend && npm install && npm run dev");
    return;
  }

  console.log(projectType.message);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`CLI failed: ${message}\n`);
  process.exitCode = 1;
});
