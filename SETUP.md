# Project Setup Guide

This guide takes you from a fresh copy of the project to a running Next.js app connected to a PostgreSQL database through Prisma.

Run every command from the **project root** (the folder that contains `package.json`), in the order shown.

## Before you start

You need:

- **Node.js** installed. Check with `node --version`.
- **PostgreSQL** installed and running, with an empty database created for this project (for example, one called `booking`).
- The **username, password, host and port** for that database. You will need them in step 2.

## What the tools are

| Tool | What it is for |
|---|---|
| **Next.js** | The React framework that runs the front end and the server code. |
| **Prisma** | An ORM (Object-Relational Mapper). You describe your tables in `prisma/schema.prisma`, and Prisma creates the tables and gives you a typed client to query them from TypeScript. |
| **`pg` + `@prisma/adapter-pg`** | The PostgreSQL driver, and the adapter that lets Prisma use it. |
| **dotenv** | Loads secret settings, such as the database URL, from a `.env` file. |
| **tsx** | Runs TypeScript files directly, for example a seed script. |

## 1. Install dependencies

```bash
npm install
```
Downloads every package listed in `package.json` into the `node_modules` folder. Run it after you first clone or download the project, and again whenever `package.json` changes.

## 2. Set up Prisma

```bash
npx prisma init --datasource-provider postgresql --output ../app/generated/prisma
```
Creates three things:

- `prisma/schema.prisma`, where you define your models (tables).
- `prisma.config.ts`, which holds Prisma's settings.
- `.env`, containing a placeholder `DATABASE_URL`.

The `--output` option tells Prisma to put the generated client code in `app/generated/prisma`.

Next, open `.env` and replace the placeholder with your own connection details:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/booking?schema=public"
```

> **Never commit `.env` to Git.** It contains your database password. Check that `.env` is listed in `.gitignore`.

Then add your models to `prisma/schema.prisma` before going on to step 3.

## 3. Create the database tables

```bash
npx prisma format
```
Tidies the layout of `prisma/schema.prisma` (spacing and alignment) and checks it for mistakes, such as a typo in a field type or a relation that is missing its other side. Errors are shown with line numbers. Run it whenever you edit the schema, before migrating.

```bash
npx prisma migrate dev --name init
```
Compares your schema with the database, writes a migration (a SQL file saved in `prisma/migrations`) and applies it, so the tables now exist. Each time you change the schema, run this again with a new, descriptive name, for example `--name add-bookings`.

```bash
npx prisma generate
```
Builds the typed Prisma Client from your schema, so that code like `prisma.booking.findMany()` has autocomplete and type checking. Run it after every schema change.

## 4. Run the app

```bash
npm run dev
```
Starts the development server at http://localhost:3000. The page reloads automatically when you save a file. This is the command you will use most.

```bash
npm run lint
```
Checks your code with ESLint for common mistakes and style problems.

```bash
npm run build
```
Creates an optimised production version of the app. It is a good way to catch type errors before submitting work.

```bash
npm run start
```
Runs the production build. You must run `npm run build` first.

---

## Optional commands

You do not need these to get the project running, but they are useful.

```bash
npx prisma studio
```
Opens a web page where you can browse and edit the data in your database, which is handy for checking that your app saved what you expected. Use it whenever you like.

```bash
npx prisma db seed
```
Fills the database with starting data, such as test users or sample bookings. It only works once you have:

1. written a seed script, for example `prisma/seed.ts`, and
2. told Prisma about it in `prisma.config.ts`: `migrations: { seed: "tsx prisma/seed.ts" }`.

Skip it until your project needs sample data.

## Troubleshooting: blocked install scripts

When you run `npm install`, npm may print warnings like this:

```
npm warn install-scripts 1 package has install scripts not yet covered by allowScripts:
npm warn install-scripts   esbuild@0.28.2 (postinstall: node install.js)
```

**What this means:** some packages ship a small script that npm can run straight after installing them. Because these scripts can run any code on your computer, this version of npm blocks them until you approve them. That is a security feature.

**Do you need them?** Usually not. On a normal setup, the files these scripts would prepare are already included when you install the packages. The project was tested without approving them.

| Package | What its script does |
|---|---|
| `prisma` | A check before installing. Nothing later depends on it. |
| `@prisma/engines` | Downloads Prisma's schema engine, the program behind `migrate` and other `db` commands, if it is missing. |
| `esbuild` | Checks that the esbuild binary (used by `tsx`) is set up correctly. |
| `unrs-resolver` | Sets up a native helper that ESLint uses to resolve imports. |

**Only if something fails**, for example a Prisma command reports a missing engine or `tsx` reports an esbuild error, approve the scripts and re-run them:

```bash
npm install-scripts approve prisma @prisma/engines esbuild unrs-resolver
npm rebuild
```
The first command marks the four packages as trusted. The second command runs their install scripts.

**Good habit:** only approve install scripts for packages you recognise and chose to install.
