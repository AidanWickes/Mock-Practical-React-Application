import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Runs when you type `npx prisma db seed`
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
    // An empty database Prisma uses to check your migrations during `npx prisma migrate dev`
    shadowDatabaseUrl: process.env["SHADOW_DATABASE_URL"],
  },
});
