import "dotenv/config";
import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "test" ? ".env.test" : ".env";

dotenv.config({ path: envFile, override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL, // ✅ her setter du URL til databasen
  },
});

