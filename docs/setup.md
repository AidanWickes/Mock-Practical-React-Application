# Project Setup

Run every command from the project folder (the one with `package.json`).

You need **Node.js** installed. Check with `node --version`.

## 1. Install packages

```bash
npm install
```

## 2. Start the database

Open a terminal and run:

```bash
npx prisma dev
```

This starts a local database on your computer. **Leave this terminal open** while you work. Open a second terminal for the other commands.

It prints two lines like these:

```
DATABASE_URL="postgres://postgres:postgres@localhost:51214/template1?..."
SHADOW_DATABASE_URL="postgres://postgres:postgres@localhost:51215/template1?..."
```

## 3. Make your `.env` file

Copy the template:

```bash
cp .env.example .env
```

(Windows PowerShell: `Copy-Item .env.example .env`)

Open `.env` and replace both lines with the two lines `npx prisma dev` printed. Copy them exactly.

> Never commit `.env` to Git.

## 4. Create the tables

Add your models to `prisma/schema.prisma`, then run:

```bash
npx prisma format
npx prisma migrate dev --name init
npx prisma generate
```

- `format` tidies the schema and shows any mistakes.
- `migrate dev` creates the tables. Run it again after each schema change, with a new name (e.g. `--name add-reviews`).
- `generate` updates the Prisma Client so your code gets autocomplete.

## 5. Check the database is running

```bash
npx prisma studio
```

This opens a web page showing your tables. If it loads and lists your models, the database is running and connected. Close it with `Ctrl+C` when you're done.

## Every time you come back

1. Terminal 1: `npx prisma dev`
2. Terminal 2: `npx prisma studio` to view and edit your data

## Other useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Runs the Next.js app at http://localhost:3000 (not needed to add data) |
| `npx prisma db seed` | Runs `prisma/seed.ts` to add starting data |
| `npm run lint` | Checks your code for mistakes |
| `npm run build` | Builds the app and catches type errors |

## Problems

**Can't connect to the database:** check `npx prisma dev` is still running in its terminal, and that `.env` has the lines it printed.

**npm warns about "install-scripts":** you can usually ignore it. If a Prisma or `tsx` command later fails, run:

```bash
npm install-scripts approve prisma @prisma/engines esbuild unrs-resolver
npm rebuild
```
