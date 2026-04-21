import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { input } from "@inquirer/prompts";

import { createBackendTemplate } from "../templates/backend.js";
import { assertTargetDirectoryIsEmpty, normalizeProjectName } from "./utils.js";

export async function promptForBackendProjectName(): Promise<string> {
  const projectName = await input({
    message: "What should the backend project be named? (use '.' for current directory)",
    default: "backend-app",
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

export async function generateBackendProject(
  currentWorkingDirectory: string,
  projectName: string,
): Promise<string> {
  const isCurrentDirectory = projectName === ".";
  const targetDirectory = isCurrentDirectory
    ? currentWorkingDirectory
    : path.join(currentWorkingDirectory, projectName);

  const displayProjectName = isCurrentDirectory
    ? path.basename(currentWorkingDirectory)
    : projectName;

  await assertTargetDirectoryIsEmpty(targetDirectory);

  if (!isCurrentDirectory) {
    await mkdir(targetDirectory, { recursive: true });
  }

  const templateFiles = createBackendTemplate(displayProjectName);

  for (const file of templateFiles) {
    const filePath = path.join(targetDirectory, file.path);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, file.content, "utf8");
  }

  return targetDirectory;
}
