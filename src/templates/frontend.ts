export type FrontendTemplateFile = {
  path: string;
  content: string;
};

function appPackageJson(projectName: string): string {
  return JSON.stringify(
    {
      name: projectName,
      private: true,
      version: "0.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc -b && vite build",
        lint: "eslint",
        preview: "vite preview",
      },
      dependencies: {
        "@tanstack/react-query": "^5.87.1",
        "axios": "^1.8.2",
        "react": "^19.1.1",
        "react-dom": "^19.1.1",
        "react-router-dom": "^7.8.2",
      },
      devDependencies: {
        "@tailwindcss/vite": "^4.1.13",
        "@types/react": "^19.1.6",
        "@types/react-dom": "^19.1.9",
        "@vitejs/plugin-react": "^5.0.2",
        "tailwindcss": "^4.1.12",
        "typescript": "^5.9.2",
        "vite": "^7.1.4",


        "@eslint/js": "^9.39.4",
        "@types/node": "^24.12.2",
        "eslint": "^9.39.4",
        "eslint-plugin-react-hooks": "^7.1.1",
        "eslint-plugin-react-refresh": "^0.5.2",
        "globals": "^17.5.0",
        "typescript-eslint": "^8.58.2",
      },
    },
    null,
    2,
  );
}

export function createFrontendTemplate(projectName: string): FrontendTemplateFile[] {
  return [
    {
      path: "package.json",
      content: `${appPackageJson(projectName)}\n`,
    },
    {
      path: "eslint.config.js",
      content: `
      import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
      `,
    },
    {
      path: "tsconfig.json",
      content: `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
`,
    },
    {
      path: "tsconfig.app.json",
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "types": ["vite/client"],
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
`,
    },
    {
      path: "tsconfig.node.json",
      content: `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
`,
    },
    {
      path: "vite.config.ts",
      content: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`,
    },
    {
      path: "index.html",
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    },
    {
      path: "src/main.tsx",
      content: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppProviders } from "./app/providers";
import { AppRouter } from "./routes";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>,
);
`,
    },
    {
      path: "src/app/providers.tsx",
      content: `import type { PropsWithChildren } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { queryClient } from "../lib/query-client";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
`,
    },
    {
      path: "src/routes/index.tsx",
      content: `import { Route, Routes } from "react-router-dom";

import { HomePage } from "../pages/Home";

export function AppRouter() {
  return (
    <Routes>
        <Route index element={<HomePage />} />
    </Routes>
  );
}
`,
    },
    {
      path: "src/pages/Home.tsx",
      content: `
export function HomePage() {

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <h1 className="text-4xl font-bold">Welcome to the Home Page!</h1>
    </div>
  );
}
`,
    },
    {
      path: "src/lib/http.ts",
      content: `import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
`,
    },
    {
      path: "src/lib/query-client.ts",
      content: `import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
`,
    },
    {
      path: "src/styles.css",
      content: `@import "tailwindcss";

:root {
  color: #f8fafc;
  background-color: #020617;
  font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(34, 211, 238, 0.15), transparent 35%),
    linear-gradient(180deg, #020617 0%, #0f172a 100%);
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input {
  font: inherit;
}
`,
    },
    {
      path: "README.md",
      content: `# ${projectName}

Frontend starter generated with:

- Vite React
- Axios
- TanStack Query
- Tailwind CSS
- React Router DOM
- Context API

## Scripts

\`\`\`bash
npm install
npm run dev
\`\`\`
`,
    },
  ];
}
