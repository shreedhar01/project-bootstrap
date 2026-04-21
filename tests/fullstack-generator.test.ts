import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  generateFullstackProject,
} from "../src/core/generate-fullstack.js";

test("generates the fullstack structure", async () => {
  const sandbox = await mkdtemp(path.join(tmpdir(), "fullstack-generator-"));
  const projectName = "my-fullstack-app";
  const targetDirectory = await generateFullstackProject(sandbox, projectName);

  const topLevelEntries = await readdir(targetDirectory);
  assert.ok(topLevelEntries.includes("frontend"));
  assert.ok(topLevelEntries.includes("backend"));
  assert.ok(topLevelEntries.includes("docker-compose.db.yaml"));
  assert.ok(topLevelEntries.includes(".gitignore"));

  // Check frontend
  const frontendEntries = await readdir(path.join(targetDirectory, "frontend"));
  assert.ok(frontendEntries.includes("package.json"));
  assert.ok(frontendEntries.includes("vite.config.ts"));

  // Check backend
  const backendEntries = await readdir(path.join(targetDirectory, "backend"));
  assert.ok(backendEntries.includes("package.json"));
  assert.ok(backendEntries.includes("src"));

  // Check docker-compose content
  const dockerCompose = await readFile(path.join(targetDirectory, "docker-compose.db.yaml"), "utf8");
  assert.match(dockerCompose, /image: postgres:15-alpine/);
  assert.match(dockerCompose, /fullstack_db/);

  // Check .gitignore content
  const gitignore = await readFile(path.join(targetDirectory, ".gitignore"), "utf8");
  assert.match(gitignore, /frontend\/node_modules/);
  assert.match(gitignore, /backend\/node_modules/);
});
