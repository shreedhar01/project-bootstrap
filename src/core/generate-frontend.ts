import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { input } from "@inquirer/prompts";

import { createFrontendTemplate } from "../templates/frontend.js";

export function normalizeProjectName(value: string): string {
  const trimmed = value.trim();

  if (trimmed === "." || trimmed === "./") {
    return ".";
  }

  return trimmed
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

async function assertTargetDirectoryIsEmpty(targetDirectory: string): Promise<void> {
  try {
    const entries = await readdir(targetDirectory);

    if (entries.length > 0) {
      throw new Error(`Target directory already exists and is not empty: ${targetDirectory}`);
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);

    if (!message.includes("ENOENT")) {
      throw error;
    }
  }
}

export async function promptForProjectName(): Promise<string> {
  const projectName = await input({
    message: "What should the frontend project be named? (use '.' for current directory)",
    default: "frontend-app",
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

export async function generateFrontendProject(
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

  const templateFiles = createFrontendTemplate(displayProjectName);

  for (const file of templateFiles) {
    const filePath = path.join(targetDirectory, file.path);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, file.content, "utf8");
  }

  return targetDirectory;
}