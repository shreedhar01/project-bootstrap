export type ProjectType = {
  key: "frontend" | "backend" | "fullstack";
  label: string;
  message: string;
};

export const PROJECT_TYPES: ProjectType[] = [
  {
    key: "frontend",
    label: "Frontend",
    message: "hello world, from frontend",
  },
  {
    key: "backend",
    label: "Backend",
    message: "hello world, from backend",
  },
  {
    key: "fullstack",
    label: "Fullstack",
    message: "hello world, from full-stack",
  },
];
