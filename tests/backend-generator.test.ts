import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { generateBackendProject } from "../src/core/generate-backend.js";
import { normalizeProjectName } from "../src/core/utils.js";

test("normalizes project names for backend", () => {
  assert.equal(normalizeProjectName("Backend App"), "backend-app");
  assert.equal(normalizeProjectName("."), ".");
});

test("generates the backend starter structure", async () => {
  const sandbox = await mkdtemp(path.join(tmpdir(), "backend-generator-"));
  const targetDirectory = await generateBackendProject(sandbox, "backend-app");

  const topLevelEntries = await readdir(targetDirectory);
  const packageJson = await readFile(path.join(targetDirectory, "package.json"), "utf8");
  const drizzleConfig = await readFile(path.join(targetDirectory, "drizzle.config.ts"), "utf8");
  const appTs = await readFile(path.join(targetDirectory, "src/app.ts"), "utf8");

  assert.ok(topLevelEntries.includes("src"));
  assert.ok(topLevelEntries.includes("drizzle.config.ts"));
  assert.ok(topLevelEntries.includes(".env.example"));
  
  assert.match(packageJson, /"express"/);
  assert.match(packageJson, /"drizzle-orm"/);
  assert.match(packageJson, /"zod"/);
  
  assert.match(drizzleConfig, /dialect: "postgresql"/);
  assert.match(appTs, /app\.use\("\/api\/v1", apiV1Router\)/);

  const apiV1Entries = await readdir(path.join(targetDirectory, "src/api_v1"));
  assert.ok(apiV1Entries.includes("routes"));
  assert.ok(apiV1Entries.includes("controllers"));
  assert.ok(apiV1Entries.includes("middleware"));

  const routeContent = await readFile(path.join(targetDirectory, "src/api_v1/routes/index.ts"), "utf8");
  assert.match(routeContent, /router\.use\("\/health", healthRouter\)/);
});

test("generates the backend starter in current directory", async () => {
  const sandbox = await mkdtemp(path.join(tmpdir(), "backend-generator-dot-"));
  const targetDirectory = await generateBackendProject(sandbox, ".");

  assert.equal(targetDirectory, sandbox);

  const topLevelEntries = await readdir(targetDirectory);
  const packageJson = await readFile(path.join(targetDirectory, "package.json"), "utf8");

  assert.ok(topLevelEntries.includes("src"));
  const sandboxName = path.basename(sandbox);
  assert.match(packageJson, new RegExp(`"name": "${sandboxName}"`));
});
