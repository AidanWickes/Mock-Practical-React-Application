# Task Sheet: Riptide Music Database

## Scenario

**Riptide** is a new music streaming app for unsigned bands and solo artists from the South West. Before the app can be built, it needs a database.

The database must store **artists**, **albums**, **tracks** and **playlists**, and the links between them. These are the business rules it must follow:

1. An artist can release many albums. Each album belongs to one artist.
2. An album has many tracks. Each track is on one album.
3. A playlist holds many tracks, and a track can be on many playlists.

Your job is to design and build the database with Prisma, fill it with sample data, and then write a design report explaining how you planned it and why you built it the way you did.

## How this sheet works

You build the database **one table at a time**. Each task gives you **less help** than the one before, so by Task 4 you are working like a developer who has been handed a requirement and nothing else.

| Task  | Table      | How much help you get                                          | Suggested time | Aim to finish by |
| ----- | ---------- | -------------------------------------------------------------- | -------------- | ---------------- |
| Setup |            | [setup.md](setup.md) steps 1 to 3.                             | 10 min         | 0:10             |
| 1     | `Artist`   | **Worked example.** All the code is given. Copy it and run it. | 10 min         | 0:20             |
| 2     | `Album`    | **Guided.** Hints and one example. You write the rest.         | 20 min         | 0:40             |
| 3     | `Track`    | **Requirements only.** Use Task 2 as your pattern.             | 15 min         | 0:55             |
| 4     | `Playlist` | **Business rule only.** You plan it and build it from a short reference. | 30 min | 1:25 |
| 5     | ERD        | Screenshot your finished database.                             | 5 min          | 1:30             |
| 6     | Report     | Write up your design in `docs/design.md`.                      | 30 min         | 2:00             |

> **At 1 hour 30 minutes, stop building and start Task 6**, even if you have not finished Task 4. The report is where most of your credit comes from, and it has a section for unfinished work.

Before you start, follow [setup.md](setup.md) steps 1 to 3: check the packages are installed, start the database with `npx prisma dev`, and make your `.env` file. **Skip setup step 4.** The tasks below replace it, with one migration per table.

> **There is no internet in this session.** Everything you need is in this folder: this sheet, your earlier tasks, and the files Prisma creates for you. Do not run `npm install`.

### If you get stuck

1. Read the error message properly. Prisma errors put the useful part near the **top**: which line of your code failed, and a one-line reason. The long list of `at ...` lines underneath can usually be ignored.
2. Compare your work with the tables you have already built. Most problems in Tasks 3 and 4 have already been solved earlier.
3. Let VS Code help. After `npx prisma generate`, press `Ctrl+Space` inside `data: { }` in `seed.ts` to list the fields you can use. Hover over a red underline to read the error. `npx prisma format` also points to mistakes in your schema.
4. Ask someone else on the course, or ask me.
5. If you still cannot move on, **stop building and go to Task 6**. Write up what you have built and explain what you were trying to do in the task you could not finish.

I can only give credit for the thinking I can see. A clear plan for an unfinished table gets you more credit than a blank space.

> **Tip:** keep rough notes as you go, such as error messages, what fixed them and decisions you made. Your notes are not handed in, but they make Task 6 much quicker to write.

## What you will hand in

| #   | Deliverable                                                 | Where it goes                        |
| --- | ----------------------------------------------------------- | ------------------------------------ |
| 1   | A database schema with four tables                          | `prisma/schema.prisma`               |
| 2   | One migration for each table                                | `prisma/migrations/`                 |
| 3   | A seed script that fills the database with sample data      | `prisma/seed.ts`                     |
| 4   | A screenshot of your ERD from the Prisma Studio Visualizer  | `docs/erd.png`                       |
| 5   | A design report explaining your planning and your decisions | `docs/design.md` (questions provided) |

### Already done for you

You do **not** need to create these. Open them and read them so you know what they do:

- `prisma/schema.prisma`: the generator and datasource are set up. You add your models.
- `prisma.config.ts`: tells Prisma where your schema, migrations and seed script are, and which databases to use.
- `lib/prisma.ts`: a ready-made Prisma Client connected to PostgreSQL. Import it wherever you need to talk to the database.
- `.env.example`: a template for your database connection strings.
- `docs/sample-data.md`: artists, albums, tracks and playlists to use in your seed script.
- `docs/design.md`: the questions for your design report (Task 6).

### The build loop

Every table is built with the same five steps. Task 1 walks you through all of them. After that, you are expected to remember them.

1. **Model**: add the model to `prisma/schema.prisma`.
2. **Migrate**: `npx prisma format`, then `npx prisma migrate dev --name <name>`, then `npx prisma generate`.
3. **Seed**: add records for the new table to `prisma/seed.ts`.
4. **Run**: `npx prisma db seed`
5. **Check**: open `npx prisma studio` and check the new table. Are the records there? Are the links right?

Do not start the next table until the check passes.

> **Prisma Studio shows the database, not your schema.** Its column names for links may not match the relation field names in your schema exactly (`albums`, `tracks`, and so on). Look for the column that links to the other table, and check the records it points to.

### Save typing: the minimum data set

You do not have to type in all the sample data. The rows marked **Min** in [sample-data.md](sample-data.md) (3 albums, 6 tracks and 2 playlists) meet every rule in Tasks 2 to 4. Use them unless you finish early.

---

## Task 1: The `Artist` table (worked example)

This table has no relationships, so it is the easiest place to start. Everything is given to you. Read each part so you understand what it does: you will be writing these yourself soon.

### 1. Model

Add this to the bottom of `prisma/schema.prisma`:

```prisma
model Artist {
  id       Int    @id @default(autoincrement())
  name     String
  genre    String
  hometown String
}
```

- `@id` makes `id` the primary key.
- `@default(autoincrement())` means the database picks the number for you: 1, 2, 3...

### 2. Migrate

```bash
npx prisma format
npx prisma migrate dev --name add-artist
npx prisma generate
```

Look in `prisma/migrations`. A new folder has appeared with a `migration.sql` file. Open it and find the `CREATE TABLE` statement. Compare it with your model.

### 3. Seed

Create `prisma/seed.ts` and copy this in:

```ts
import "dotenv/config";
import prisma from "../lib/prisma";

async function main() {
  // Delete existing data, so the script can be run more than once.
  await prisma.artist.deleteMany();

  // Artists
  const harbourLights = await prisma.artist.create({
    data: {
      name: "The Harbour Lights",
      genre: "Indie Rock",
      hometown: "Torquay",
    },
  });

  // Add the rest of the artists

  console.log("Seeding finished.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
```

Each artist is saved in a variable (`harbourLights`, `neonTide`, `karaMoss`) because you will need their `id`s in Task 2. VS Code may warn that the variables are unused. That is fine for now.

### 4. Run

```bash
npx prisma db seed
```

### 5. Check

Open `npx prisma studio` and click on `Artist`. You should see three artists. Run the seed a second time: you should still have three, not six. The `deleteMany()` line is what makes that work.

---

## Task 2: The `Album` table (guided)

**Business rule 1:** an artist can release many albums. Each album belongs to one artist.

This is a **one-to-many** relationship. This time you write the model yourself.

### 1. Model

Add an `Album` model with:

- An `id` primary key, like `Artist`.
- A `title` (`String`) and a `releaseYear` (`Int`).
- A foreign key, `artistId`, and a relation field, `artist`, that links it to `Artist`.

Then add the other side of the relation to `Artist`: a field called `albums` that holds a list of that artist's albums.

Here is the same kind of relationship in a **library** database, where each book has one author. Use it as your pattern:

```prisma
model Book {
  id       Int    @id @default(autoincrement())
  title    String
  authorId Int
  author   Author @relation(fields: [authorId], references: [id])
}
```

- `authorId` is the foreign key: a real column that stores the author's `id`.
- `author` is the relation field. It is not a column. It tells Prisma that `authorId` points at `Author`'s `id`, so your code can get the whole author.

**Hint:** if you write only the `Album` side, `npx prisma format` will add the missing side to `Artist` for you. Make sure you understand what it added, because you will explain it in your report.

Questions to think about (you will answer them in Task 6):

- Why does the foreign key go on `Album` and not on `Artist`?
- Should any of the fields be optional (`?`)? What would it mean if `artistId` were optional?

### 2. Migrate

Name this migration `add-album`. Then open the new `migration.sql` and find the `FOREIGN KEY` line. Which table is it on, and which column does it point to? What comes after `ON DELETE`? Note it down: you will need it in section 3 of your report.

### 3. Seed

1. **Update the delete step.** Albums point to artists, so the database will not let you delete an artist while an album still points at them. The table that does the pointing must be emptied **first**:
   ```ts
   await prisma.album.deleteMany();
   await prisma.artist.deleteMany();
   ```
2. **Add your albums** below your artists. Here is the first one. It links to an artist by using that artist's `id`:
   ```ts
   // Albums
   const lowTide = await prisma.album.create({
     data: { title: "Low Tide", releaseYear: 2022, artistId: harbourLights.id },
   });
   ```

Add the rest from [sample-data.md](sample-data.md). You need **3 or 4** albums, and **at least one artist must have more than one album**. Save each album in a variable, because you will need them in Task 3.

### 4. Run and 5. Check

Run the seed. In Prisma Studio, open `Album`. Does every album have an `artistId`, and does it match the right artist's `id`? Now open `Artist` and find the column that links to albums. Does The Harbour Lights link to both of their albums?

---

## Task 3: The `Track` table (requirements only)

**Business rule 2:** an album has many tracks. Each track is on one album.

This is the same type of relationship as Task 2. **Use your `Album` model and your Task 2 seed code as your pattern.** No code is given for this task.

### Requirements

- A `Track` model with an `id` primary key, a `title`, a `trackNumber` and a `durationSeconds`. Choose a sensible type for each one.
- `Track` is linked to `Album`, with the relation on both sides.
- A migration called `add-track`.
- **6 to 10** tracks in the seed script from [sample-data.md](sample-data.md). **Every album must have at least two tracks.** The 6 **Min** tracks are enough. Save each track in a variable, because you will need them in Task 4.
- The seed script still runs a second time without errors.

You now have three tables, so you need to work out the right order for the delete step yourself. If you get it wrong, the seed fails, usually on the **second** run, when there is already data to delete. Read the top of that error: it names the `deleteMany()` line that failed and the foreign key constraint (`Something_somethingId_fkey`) that stopped it.

### Check

- Every track has an `albumId`, and every album shows its tracks.
- Your seed runs twice in a row without failing or doubling the data.

---

## Task 4: The `Playlist` table (business rule only)

**Business rule 3:** a playlist holds many tracks, and a track can be on many playlists.

You are on your own for this one. There are no steps: plan it, then build it from what you learned in Tasks 2 and 3 and the short reference below.

### Plan before you code

Answer these in your rough notes first. They will go in your report.

- What kind of relationship is this? How do you know?
- Could a single foreign key column on `Track` or on `Playlist` hold this relationship? Try it in your head with the sample data: where would you store the fact that _Night Bus_ is on two playlists?
- If a foreign key cannot do it, where do the links get stored?

### What you need to know

**In the schema.** Look back at the `albums Album[]` field on `Artist` from Task 2, then open the `add-album` migration. `Artist` has no `albums` column: a list field like this only exists in Prisma, not in the database. An **implicit many-to-many** relation is written with a list field like this on **both** models, and **no** foreign key field or `@relation(fields: ...)` on either side. Prisma then creates a hidden join table to store the links.

**In the seed.** You cannot link these records by setting a foreign key, because there isn't one. You `connect` them instead. Here is an example from a college database, where a course has many students and a student takes many courses:

```ts
const webDev = await prisma.course.create({
  data: {
    title: "Web Development",
    students: { connect: [{ id: amir.id }, { id: beth.id }] },
  },
});
```

`connect` takes a list of the records to link, each picked out by its `id`. Prisma adds one row to the join table for each link.

> **Warning:** the `npx prisma format` trick from Task 2 does not work here. If you write only one side of this relation, `format` guesses, and it guesses one-to-many. Write both sides yourself. Then check the migration before you seed.

### Done when

- [ ] A `Playlist` model exists with an `id`, a `name`, and at least one more field you have chosen.
- [ ] The relationship between `Playlist` and `Track` is in the schema, with a field on both sides.
- [ ] A migration called `add-playlist` exists. You have opened its `migration.sql` and found out what was created **as well as** the `Playlist` table. What comes after `ON DELETE` this time, and how is it different from `add-album`?
- [ ] The seed creates **2 or 3** playlists. At least one playlist has more than one track, and at least one track is on more than one playlist.
- [ ] Prisma Studio shows the links: you can find which tracks are on each playlist, and which playlists _Night Bus_ is on. If Studio also lists a table called `_PlaylistToTrack`, that is the join table Prisma made for you. Work out what one row in it means.
- [ ] The seed still runs twice in a row without errors.

---

## Task 5: Screenshot your ERD

1. Run `npx prisma studio`.
2. Open the **Visualizer** view.
3. Arrange the tables so every table and every relationship line can be seen clearly. The Visualizer draws the real database, so the playlist relationship may appear as a join table with two lines rather than one line. Section 2 of the report asks you to explain why.
4. Take a screenshot and save it as `docs/erd.png`.

If you did not finish every table, screenshot what you have.

---

## Task 6: Write your design report (`docs/design.md`)

Do this **after Task 4**, **as soon as you are stuck and cannot move on**, or **at 1 hour 30 minutes**, whichever comes first. Allow 30 minutes.

This is not a diary of what you typed. It is your explanation of the system: how you planned the database, how the relationships are built and enforced, why you made each decision, how your design could be improved, and, if you did not finish, what you were trying to do and where it went wrong.

Open [design.md](design.md) and answer every prompt. Leave the prompts in and write your answers underneath them. Each section shows a suggested time.

---

## Checklist before you submit

- [ ] `npx prisma format` runs with no errors.
- [ ] `prisma/migrations` contains `add-artist`, `add-album`, `add-track` and `add-playlist`.
- [ ] `npx prisma db seed` runs with no errors, and can be run a second time without failing.
- [ ] All three business rules are in the schema.
- [ ] The seed data meets the rules in Tasks 2, 3 and 4.
- [ ] `docs/erd.png` shows every table and relationship clearly.
- [ ] `docs/design.md` has an answer under every prompt, including section 6 if anything is unfinished.
- [ ] `.env` is **not** included in your submission.

## Extension tasks (optional)

These have no step-by-step instructions. Only try them once Task 6 is written. Say what you built in section 6 of your report.

- **Track order.** Build the explicit many-to-many you described in section 5 of your report: replace the implicit relation with a join model that has a `position` field. The join model is linked to `Playlist` and to `Track` with two one-to-many relations, each built like Task 2.
- **Users.** A user can create many playlists, and each playlist has one owner. A user can follow many artists, and an artist can have many followers. Sample users are in [sample-data.md](sample-data.md). Be careful: your `Playlist` table already has data in it. What happens when you add a required foreign key to a table that already has rows?
- **No duplicate track numbers.** Stop an album from having two tracks with the same `trackNumber`. A unique rule across two fields together is written inside the model as `@@unique([fieldA, fieldB])`. Which two fields? Check what appears in the migration.
- **Query script.** Write a short script that uses `lib/prisma.ts` to print every playlist with the title and artist name of each of its tracks. `prisma.playlist.findMany()` gets every playlist. Adding `include: { tracks: true }` also gets each playlist's tracks. Use `Ctrl+Space` to find out how to go one level deeper, to each track's album and artist.
