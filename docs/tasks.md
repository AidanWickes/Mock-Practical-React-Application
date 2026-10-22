# Task Sheet: Film Database

## Scenario

You are building the database for a small film review website. The site needs to store **directors**, **films** and **actors**, and the links between them.

Your job is to design the database with Prisma, fill it with a small amount of sample data, and explain how and why you built it the way you did.

You will build the database **one table at a time**. For each table you will add the model, migrate, seed it, and check it in Prisma Studio before moving on. If something breaks, you only have one new thing to look at.

Before you start, follow [setup.md](setup.md) steps 1 to 3: install packages, start the database with `npx prisma dev`, and make your `.env` file. Skip setup step 4: Tasks 1 to 3 below replace it, with one migration per table instead of a single `init` migration.

## What you will hand in

| #   | Deliverable                                                | Where it goes                               |
| --- | ---------------------------------------------------------- | ------------------------------------------- |
| 1   | A working database schema with three tables                | `prisma/schema.prisma`                      |
| 2   | A seed script that fills the database with sample data     | `prisma/seed.ts`                            |
| 3   | A screenshot of your ERD from the Prisma Studio Visualizer | `docs/erd.png`                              |
| 4   | A written explanation of every relationship in your ERD    | `docs/relationships.md` (template provided) |
| 5   | A work log covering what you did and why                   | `WORKLOG.md`                                |

### Already done for you

You do **not** need to create these. Open them and read them so you know what they do:

- `prisma/schema.prisma`: the generator and datasource are set up. You add your models.
- `prisma.config.ts`: tells Prisma where your schema, migrations and seed script are, and which databases to use.
- `lib/prisma.ts`: a ready-made Prisma Client connected to PostgreSQL. Import it wherever you need to talk to the database.
- `.env.example`: a template for your database connection strings. Copy it to `.env` and fill in the blanks (see [setup.md](setup.md) step 3).
- `docs/relationships.md`: a template for Task 5.
- `docs/sample-data.md`: directors, films, actors and reviews you can use in your seed script, with the variable names used in this sheet.

### The loop you will repeat for every table

Tasks 1, 2 and 3 each follow the same five steps:

1. **Model**: add the model to `prisma/schema.prisma`.
2. **Migrate**: run these three commands (with a new name each time):
   ```bash
   npx prisma format
   npx prisma migrate dev --name <name>
   npx prisma generate
   ```
3. **Seed**: add records for the new table to `prisma/seed.ts`.
4. **Run**: `npx prisma db seed`
5. **Check**: open `npx prisma studio` and look at the new table. Are the records there? Are the links right?

Do not start the next table until the check passes.

---

## Task 0: Start your work log (`WORKLOG.md`)

Create `WORKLOG.md` in the project root **now**, before you write any code. Add an entry **at the end of every task below**, and at the end of every session.

Copy this template for each entry:

```md
## Entry <number>: <date>

### What I did

-

### Why I did it this way

-

### Problems I hit and how I fixed them

-

### What I will do next

-
```

### What a good entry looks like

> **Why I did it this way**
>
> - I put the foreign key `directorId` on `Film`, not on `Director`. Each film has only one director, so one column holds it. If I put it on `Director` I would need a list of film IDs in one column, which a relational database cannot store properly.

### What a weak entry looks like

> **Why I did it this way**
>
> - I made the tables because the task said to.

The "why" is the most important part of the log.

---

## Task 1: The `Director` table

This table has no relationships yet, so it is the easiest place to start. The model is given to you as a worked example.

### 1. Model

Add this to the bottom of `prisma/schema.prisma`:

```prisma
model Director {
  id          Int    @id @default(autoincrement())
  name        String
  nationality String
}
```

- `@id` makes `id` the primary key.
- `@default(autoincrement())` means the database picks the number for you: 1, 2, 3...

### 2. Migrate

```bash
npx prisma format
npx prisma migrate dev --name add-director
npx prisma generate
```

Look in `prisma/migrations`. A new folder has appeared with a `migration.sql` file. Open it and find the `CREATE TABLE` statement.

### 3. Seed

Create `prisma/seed.ts` and copy this in:

```ts
import "dotenv/config";
import prisma from "../lib/prisma";

async function main() {
  // Delete existing data, so the script can be run more than once.
  await prisma.director.deleteMany();

  // Directors
  const nolan = await prisma.director.create({
    data: { name: "Christopher Nolan", nationality: "British" },
  });

  // TODO: create 1 or 2 more directors in the same way.

  console.log("Seeding finished.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
```

Add **1 or 2 more** directors from [sample-data.md](sample-data.md), so you have **2 or 3** in total. Save each one in its own variable (like `nolan`). You will need these in Task 2.

### 4. Run

```bash
npx prisma db seed
```

### 5. Check

Open `npx prisma studio` and click on `Director`. You should see your 2 or 3 directors. Run the seed a second time: you should still have the same number, not double.

**Write a work log entry before you move on.**

---

## Task 2: The `Film` table (one-to-many)

**Rule:** a director can direct many films. Each film has one director.

This is a **one-to-many** relationship. This time you write the model yourself, using `Director` as a pattern.

### 1. Model

Add a `Film` model with:

- An `id` primary key, like `Director`.
- At least two fields that describe a film, with sensible types. For example, `title` (`String`) and `releaseYear` (`Int`).
- A foreign key, `directorId`, and a relation field linking it to `Director`.

Then add the other side of the relation to `Director`: a field that holds a list of that director's films.

Look up "one-to-many relations" in the Prisma docs. **Hint:** `npx prisma format` can add the missing side of a relation for you, but you should understand what it added.

Think about (and write about in your log):

- Why does the foreign key go on `Film` and not on `Director`?
- Should any of your fields be optional (`?`)?

### 2. Migrate

```bash
npx prisma format
npx prisma migrate dev --name add-film
npx prisma generate
```

Open the new `migration.sql`. Find the `FOREIGN KEY` line. Which table is it on?

### 3. Seed

In `prisma/seed.ts`:

1. **Update the delete step.** Films point to directors, so the database will not let you delete a director while a film still points at them. Delete the films **first**:
   ```ts
   await prisma.film.deleteMany();
   await prisma.director.deleteMany();
   ```
2. **Add your films** below your directors. Link each film to a director with the director's `id`:
   ```ts
   // Films
   const inception = await prisma.film.create({
     data: { title: "Inception", releaseYear: 2010, directorId: nolan.id },
   });
   ```
   Use your own field names if they are different. Save each film in a variable: you will need them in Task 3.

Create **3 to 5** films in total (see [sample-data.md](sample-data.md)). **At least one director must have more than one film.**

### 4. Run

```bash
npx prisma db seed
```

### 5. Check

In Prisma Studio, open `Film`. Does every film have a `directorId`? Now open `Director` and look at the `films` column. Does the director with more than one film show them all?

**Write a work log entry before you move on.**

---

## Task 3: The `Actor` table (many-to-many)

**Rule:** a film has many actors, and an actor can appear in many films.

This is a **many-to-many** relationship. A foreign key on one side cannot hold this, because each side needs a _list_ of the other. A **join table** sits in the middle instead.

### 1. Model

Add an `Actor` model with:

- An `id` primary key.
- At least two fields that describe an actor.
- A list field holding the films the actor is in.

Then add a list field to `Film` holding its actors.

Use an **implicit** many-to-many relation: you only write the two list fields, and Prisma creates the join table for you. Look up "implicit many-to-many relations" in the Prisma docs.

### 2. Migrate

```bash
npx prisma format
npx prisma migrate dev --name add-actor
npx prisma generate
```

Open the new `migration.sql`. It creates **two** tables, not one. What is the second one called, and what columns does it have?

### 3. Seed

In `prisma/seed.ts`:

1. **Update the delete step.** Add `prisma.actor.deleteMany()`. Prisma clears the join table for you when you delete films and actors. Where in the order should it go? Write about your answer in your log.
2. **Add your actors** at the bottom, and link each one to their films with `connect`:
   ```ts
   // Actors
   await prisma.actor.create({
     data: {
       name: "Leonardo DiCaprio",
       birthYear: 1974,
       films: { connect: [{ id: inception.id }] },
     },
   });
   ```

Create **3 to 5** actors in total (see [sample-data.md](sample-data.md)). Make sure that:

- At least one film has **more than one** actor.
- At least one actor appears in **more than one** film.

### 4. Run

```bash
npx prisma db seed
```

### 5. Check

In Prisma Studio, open `Actor` and `Film` and check the links both ways. Then run the seed a second time to make sure it still works.

**Write a work log entry before you move on.**

---

## Task 4: Screenshot your ERD

1. Run `npx prisma studio`.
2. Open the **Visualizer** view.
3. Arrange the tables so every table and every relationship line can be seen clearly.
4. Take a screenshot and save it as `docs/erd.png`.

---

## Task 5: Explain the relationships (`docs/relationships.md`)

Open the template in `docs/relationships.md` and follow the "How to fill this in" steps at the top. Your ERD has two relationship lines (`Director` to `Film`, and `Film` to `Actor`), and the template has one section ready for each. If you do the `Review` extension task, copy a section to make a third.

Each section answers the same four questions:

1. **Which tables are linked, and what type of relationship is it?** One-to-one, one-to-many or many-to-many.
2. **What is the cardinality in plain English?** One sentence from each side, for example: "One director can have zero or many films. Each film must have exactly one director."
3. **How is it built in the database?** Which table holds the foreign key and what the column is called, or, for many-to-many, the join table's name and columns (check your `migration.sql` from Task 3).
4. **Why did I build it this way?** Link it back to the rules in Tasks 2 and 3, explain where the foreign key or join table is, and say whether you made anything optional.

Replace the hint lines (the ones starting with `>`) with your answers. The worked example (authors and books) shows what a good answer looks like.

---

## Checklist before you submit

- [ ] `npx prisma format` runs with no errors.
- [ ] `prisma/migrations` contains three migrations: `add-director`, `add-film` and `add-actor`.
- [ ] `npx prisma db seed` runs with no errors, and can be run a second time without failing.
- [ ] Both relationship rules (Tasks 2 and 3) are in the schema.
- [ ] Every table has between 2 and 5 records, and the seed data meets every rule in Tasks 2 and 3.
- [ ] `docs/erd.png` shows every table and relationship clearly.
- [ ] `docs/relationships.md` explains every relationship in the ERD.
- [ ] `WORKLOG.md` has an entry for every task and every session, each with a "why".
- [ ] `.env` is **not** included in your submission.

## Extension tasks (optional)

- Add a `Review` table using the same five-step loop: a film has many reviews, each with a `rating` (1 to 5) and a `comment`. Seed up to 5 reviews from [sample-data.md](sample-data.md).
- Write a short script that uses `lib/prisma.ts` to print every film with its director's name and its actors.
