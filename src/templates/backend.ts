export type BackendTemplateFile = {
  path: string;
  content: string;
};

function appPackageJson(projectName: string): string {
  return JSON.stringify(
    {
      name: projectName,
      version: "1.0.0",
      description: "Backend service with Express, Drizzle, and Zod",
      main: "dist/server.js",
      scripts: {
        "dev": "tsx watch src/server.ts",
        "build": "tsc",
        "start": "node dist/server.js",
        "lint": "eslint .",
        "generate": "drizzle-kit generate",
        "push": "drizzle-kit push",
        "studio": "drizzle-kit studio"
      },
      dependencies: {
        "express": "^4.19.2",
        "cors": "^2.8.5",
        "helmet": "^7.1.0",
        "dotenv": "^16.4.5",
        "zod": "^3.23.8",
        "drizzle-orm": "^0.30.10",
        "pg": "^8.11.5",
        "morgan": "^1.10.0",
        "jsonwebtoken": "^9.0.2",
        "bcrypt": "^5.1.1"
      },
      devDependencies: {
        "@types/express": "^4.17.21",
        "@types/cors": "^2.8.17",
        "@types/node": "^20.12.12",
        "@types/pg": "^8.11.6",
        "@types/morgan": "^1.9.9",
        "@types/jsonwebtoken": "^9.0.6",
        "@types/bcrypt": "^5.0.2",
        "tsx": "^4.11.0",
        "typescript": "^5.4.5",
        "drizzle-kit": "^0.21.4",
        "eslint": "^8.57.0",
        "@typescript-eslint/parser": "^7.10.0",
        "@typescript-eslint/eslint-plugin": "^7.10.0"
      }
    },
    null,
    2,
  );
}

export function createBackendTemplate(projectName: string): BackendTemplateFile[] {
  return [
    {
      path: "package.json",
      content: `${appPackageJson(projectName)}\n`,
    },
    {
      path: "tsconfig.json",
      content: `{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
`,
    },
    {
      path: "drizzle.config.ts",
      content: `import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
`,
    },
    {
      path: ".env.example",
      content: `PORT=8000
DATABASE_URL=postgres://user:password@localhost:5432/dbname
NODE_ENV=development
`,
    },
    {
      path: "src/server.ts",
      content: `import app from "./app.js";
import { config } from "./config/index.js";

const port = config.PORT || 8000;

app.listen(port, () => {
  console.log(\`Server is running on http://localhost:\${port}\`);
});
`,
    },
    {
      path: "src/app.ts",
      content: `import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiV1Router } from "./api_v1/routes/index.js";
import { errorHandler } from "./api_v1/middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", apiV1Router);

app.use(errorHandler);

export default app;
`,
    },
    {
      path: "src/config/index.ts",
      content: `import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "development",
};
`,
    },
    {
      path: "src/api_v1/routes/index.ts",
      content: `import { Router } from "express";
import { healthRouter } from "./health.routes.js";

const router = Router();

router.use("/health", healthRouter);

export const apiV1Router = router;
`,
    },
    {
      path: "src/api_v1/routes/health.routes.ts",
      content: `import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";

const router = Router();

router.get("/", getHealth);

export const healthRouter = router;
`,
    },
    {
      path: "src/api_v1/controllers/health.controller.ts",
      content: `import { Request, Response, NextFunction } from "express";
import { healthService } from "../../services/health.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";

export const getHealth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const health = await healthService.getHealthStatus();
    res.json(new ApiResponse(200, health));
});
`,
    },
    {
      path: "src/services/health.service.ts",
      content: `export const healthService = {
  getHealthStatus: async () => {
    return {
      status: "UP",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  },
};
`,
    },
    {
      path: "src/api_v1/middleware/error.middleware.ts",
      content: `import { Request, Response, NextFunction } from "express";
import { ApiError } from "../../utils/apiError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      statusCode: err.statusCode,
      errors: err.error,
      data: err.data
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    statusCode: 500
  });
};
`,
    },
    {
      path: "src/api_v1/middleware/validate.middleware.ts",
      content: `import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { ApiError } from "../../utils/apiError.js";

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(new ApiError(400, "Validation failed", error.errors));
      }
      return next(error);
    }
  };
};
`,
    },
    {
      path: "src/db/index.ts",
      content: `import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { config } from "../config/index.js";
import * as schema from "./schema.js";

const pool = new pg.Pool({
  connectionString: config.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
`,
    },
    {
      path: "src/db/schema.ts",
      content: `import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const samples = pgTable("samples", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
`,
    },
    {
      path: "src/validators/common.validators.ts",
      content: `import { z } from "zod";

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
  }),
});
`,
    },
    {
      path: "src/utils/apiError.ts",
      content: `class ApiError extends Error {
    statusCode: number;
    error: any[];
    success: boolean;
    data: any | null;

    constructor(
        statusCode: number,
        message = "Something went wrong",
        error: any[] = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.error = error
        this.success = false
        this.data = null

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }
`,
    },
    {
      path: "src/utils/apiResponse.ts",
      content: `class ApiResponse{
    statusCode:number
    data:any
    message:string
    success: boolean

    constructor(
        statusCode:number,
        data:any,
        message="success"
    ){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export {ApiResponse}
`,
    },
    {
      path: "src/utils/asyncHandler.ts",
      content: `import type {
    NextFunction,
    Request,
    RequestHandler,
    Response
} from "express";

export const asyncHandler = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err))
    }
}
`,
    },
    {
      path: "src/utils/logger.ts",
      content: `export const logger = {
  info: (msg: string) => console.log(\`[INFO] \${msg}\`),
  error: (msg: string) => console.error(\`[ERROR] \${msg}\`),
  warn: (msg: string) => console.warn(\`[WARN] \${msg}\`),
};
`,
    },
    {
      path: "src/utils/bcrypt.ts",
      content: `import bcrypt from "bcrypt"

export const hashPassword = async (pass: string) => {
    return await bcrypt.hash(pass, 10)
}

export const comparePassword = async (pass: string, dbPass: string) => {
    return await bcrypt.compare(pass, dbPass)
}
`,
    },
    {
      path: "src/utils/jwt.ts",
      content: `import jwt, { SignOptions } from "jsonwebtoken"

export const generateToken = (payload: any, secret: string, expiresIn: SignOptions["expiresIn"]) => {
    return jwt.sign(payload, secret, { expiresIn })
}

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret)
}
`,
    },
    {
      path: "README.md",
      content: `# ${projectName}

Backend starter generated with:

- Express
- Drizzle ORM
- Zod
- TypeScript
- PostgreSQL

## Getting Started

1. Copy \`.env.example\` to \`.env\` and update the database URL.
2. Install dependencies: \`npm install\`
3. Run development server: \`npm run dev\`

## Scripts

- \`npm run dev\`: Start development server with tsx
- \`npm run build\`: Build the project
- \`npm run start\`: Start production server
- \`npm run generate\`: Generate Drizzle migrations
- \`npm run push\`: Push migrations to database
- \`npm run studio\`: Open Drizzle Studio
`,
    },
  ];
}
