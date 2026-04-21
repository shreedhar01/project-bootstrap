import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import {
  generateFrontendProject,
} from "../src/core/generate-frontend.js";
import { normalizeProjectName } from "../src/core/utils.js";

test("normalizes project names for filesystem and package usage", () => {
  assert.equal(normalizeProjectName("Frontend App"), "frontend-app");
  assert.equal(normalizeProjectName("  My_App  "), "my-app");
  assert.equal(normalizeProjectName("hello---world"), "hello-world");
  assert.equal(normalizeProjectName("."), ".");
  assert.equal(normalizeProjectName("./"), ".");
});

test("generates the frontend starter structure in current directory", async () => {
  const sandbox = await mkdtemp(path.join(tmpdir(), "frontend-generator-dot-"));
  // Pass "." as projectName to simulate current directory generation
  const targetDirectory = await generateFrontendProject(sandbox, ".");

  assert.equal(targetDirectory, sandbox);

  const topLevelEntries = await readdir(targetDirectory);
  const packageJson = await readFile(path.join(targetDirectory, "package.json"), "utf8");

  assert.ok(topLevelEntries.includes("src"));
  assert.ok(topLevelEntries.includes("vite.config.ts"));
  // It should use the sandbox directory name as the package name
  const sandboxName = path.basename(sandbox);
  assert.match(packageJson, new RegExp(`"name": "${sandboxName}"`));
});

test("generates the frontend starter structure", async () => {
  const sandbox = await mkdtemp(path.join(tmpdir(), "frontend-generator-"));
  const targetDirectory = await generateFrontendProject(sandbox, "frontend-app");

  const topLevelEntries = await readdir(targetDirectory);
  const packageJson = await readFile(path.join(targetDirectory, "package.json"), "utf8");
  const mainTsx = await readFile(path.join(targetDirectory, "src/main.tsx"), "utf8");

  assert.ok(topLevelEntries.includes("src"));
  assert.ok(topLevelEntries.includes("vite.config.ts"));
  assert.match(packageJson, /"react-router-dom"/);
  assert.match(packageJson, /"@tanstack\/react-query"/);
  assert.match(packageJson, /"axios"/);
  assert.match(packageJson, /"tailwindcss"/);
  assert.match(mainTsx, /AppProviders/);
});
