import assert from "node:assert/strict";
import test from "node:test";

import { resolveProjectTypeSelection } from "../src/core/select-project-type.ts";

test("resolves selection by project name", () => {
  const frontend = resolveProjectTypeSelection("frontend");
  const backend = resolveProjectTypeSelection("backend");
  const fullstack = resolveProjectTypeSelection("fullstack");

  assert.equal(frontend?.message, "hello world, from frontend");
  assert.equal(backend?.message, "hello world, from backend");
  assert.equal(fullstack?.message, "hello world, from full-stack");
});

test("returns undefined for invalid selection", () => {
  const projectType = resolveProjectTypeSelection("mobile");

  assert.equal(projectType, undefined);
});
