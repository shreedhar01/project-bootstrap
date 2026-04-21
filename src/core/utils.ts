import { readdir } from "node:fs/promises";

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

export async function assertTargetDirectoryIsEmpty(targetDirectory: string): Promise<void> {
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
