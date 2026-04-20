#!/usr/bin/env node

import { selectProjectType } from "../core/select-project-type.js";

async function main(): Promise<void> {
  const projectType = await selectProjectType();
  console.log(projectType.message);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`CLI failed: ${message}\n`);
  process.exitCode = 1;
});
