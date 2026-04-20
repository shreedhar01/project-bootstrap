import { select } from "@inquirer/prompts";

import { PROJECT_TYPES, type ProjectType } from "./project-types.js";

export function resolveProjectTypeSelection(value: string): ProjectType | undefined {
  const normalizedValue = value.trim().toLowerCase();

  return PROJECT_TYPES.find((projectType) => {
    return (
      normalizedValue === projectType.key ||
      normalizedValue === projectType.label.toLowerCase()
    );
  });
}

export async function selectProjectType(): Promise<ProjectType> {
  return select<ProjectType>({
    message: "What do you want to create?",
    choices: PROJECT_TYPES.map((projectType) => ({
      name: projectType.label,
      value: projectType,
    })),
  });
}
