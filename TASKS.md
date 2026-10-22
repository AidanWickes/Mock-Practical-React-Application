# Task Sheet: Music Application Database

## Scenario

You are building the database for a music streaming application. The app needs to store **artists**, **songs**, **albums**, **genres** and **users**, and the links between them.

Your job is to design the database with Prisma, fill it with realistic sample data, and explain how and why you built it the way you did.

Before you start, follow [SETUP.md](SETUP.md) steps 1 and 2 to install the packages and set up Prisma. Call your database `music` rather than `booking`.

## What you will hand in

| # | Deliverable | Where it goes |
|---|---|---|
| 1 | A working database schema | `prisma/schema.prisma` |
| 2 | A seed script that fills the database with sample data | `prisma/seed.ts` |
| 3 | A screenshot of your ERD from the Prisma Studio Visualizer | `docs/erd.png` |
| 4 | A written explanation of every relationship in your ERD | `docs/relationships.md` |
| 5 | A work log covering what you did and why | `WORKLOG.md` |

Start your work log (Task 5) **before** you start Task 1, and add to it every session.

---

## Task 1: Design the schema (`prisma/schema.prisma`)

Create a model for each of these five entities: `Artist`, `Song`, `Album`, `Genre` and `User`.

### Requirements

Your schema must support all of the following rules. Read each one carefully and decide which type of relationship it describes: **one-to-one**, **one-to-many** or **many-to-many**.

1. An artist can release many albums. Each album is released by one artist.
2. An album contains many songs. Each song appears on one album.
3. A song can be performed by more than one artist (for example, a song featuring a guest artist), and an artist can perform many songs.
4. A song can belong to more than one genre, and a genre contains many songs.
5. A user can like many songs, and a song can be liked by many users.
6. A user can follow many artists, and an artist can have many followers.

### Every model must have

- A primary key (`@id`).
- Sensible field types (for example, `Int` for a track number, `DateTime` for a release date).
- At least two fields that describe the entity, beyond its ID and foreign keys. For example, an `Album` might have a `title` and a `releaseDate`, and a `Song` might have a `title` and a `durationSeconds`.

### Things to think about (and write about in your log)

- Where does each **foreign key** go in a one-to-many relationship, and why?
- For each many-to-many relationship, will you use an **implicit** relation (Prisma creates the join table for you) or an **explicit** one (you write the join model yourself)? An explicit join model lets you store extra data. For example, the date a user liked a song, or whether an artist is the main artist or a featured artist on a song. Which is the better fit for each relationship?
- Which fields should be **unique**? (For example, should two users be allowed the same email address? Should a genre name be unique?)
- Which fields should be **optional** (`?`) and which required?
- What should happen to an artist's albums if the artist is deleted? Look up `onDelete` in the Prisma docs.

### Check and build it

Follow [SETUP.md](SETUP.md) step 3:

```bash
npx prisma format
npx prisma migrate dev --name init
npx prisma generate
```

If you change your schema later, run `migrate dev` again with a new, descriptive name, and record the change in your log.

---

## Task 2: Seed the database (`prisma/seed.ts`)

Write a seed script that fills your database with realistic sample data.

### Minimum data

| Model | Minimum number of records |
|---|---|
| Genre | 5 |
| Artist | 5 |
| Album | 6 (at least one artist must have more than one album) |
| Song | 20 |
| User | 3 |

Your data must also show every relationship working:

- At least one song with **more than one artist**.
- At least one song in **more than one genre**.
- Every user has **liked** at least three songs.
- Every user **follows** at least one artist, and at least one artist has more than one follower.

### Hints

- Your seed script needs a Prisma Client that uses the PostgreSQL adapter. Look at the Prisma docs for "seeding" and for `@prisma/adapter-pg`. Your client is generated in `app/generated/prisma`.
- Load your `.env` file at the top of the script with `import "dotenv/config";` so that `DATABASE_URL` is available.
- Tell Prisma how to run your script by adding this to `prisma.config.ts`:

  ```ts
  migrations: { seed: "tsx prisma/seed.ts" }
  ```

- Your script should be safe to run more than once. Either delete the existing data at the start (in the right order, think about foreign keys!) or use `upsert`. Explain your choice in your log.
- Use nested writes (`create` and `connect` inside another `create`) to build relationships. They are often much shorter than creating everything separately.

### Run it

```bash
npx prisma db seed
```

Then open Prisma Studio and check that the data and links are all there:

```bash
npx prisma studio
```

---

## Task 3: Screenshot your ERD

1. Run `npx prisma studio`.
2. Open the **Visualizer** view.
3. Arrange the tables so that every table and every relationship line can be seen clearly, with no overlapping lines hiding each other.
4. Take a screenshot and save it as `docs/erd.png`.

If your ERD includes join tables, make sure they are visible too.

---

## Task 4: Explain the relationships (`docs/relationships.md`)

For **every** relationship shown in your ERD, write a short explanation covering:

1. **Which tables** are linked.
2. **The type** of relationship (one-to-one, one-to-many or many-to-many) and the **cardinality** in plain English, for example: "One artist can have zero or many albums. Each album must have exactly one artist."
3. **How it is built** in the database: which table holds the foreign key, or which join table links the two tables.
4. **Why** you designed it this way. Link it back to the requirements in Task 1, and explain any choice you made, such as implicit vs explicit many-to-many, or your `onDelete` rule.

Include your ERD screenshot at the top of the file:

```md
![ERD](erd.png)
```

---

## Task 5: Keep a work log (`WORKLOG.md`)

Keep a log of your work from the start of the task to the end. Add an entry **every time you work on the project**, not all at the end. Your log should make it possible for someone else to understand what you did, what went wrong, and why you made the choices you made.

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
> - I used an explicit join model, `SongArtist`, for the link between songs and artists instead of an implicit many-to-many. This lets me store a `role` field ("main" or "featured"), which the app needs to show "feat." in song titles. An implicit relation cannot store extra fields.

### What a weak entry looks like

> **Why I did it this way**
> - I made the tables because the task said to.

The "why" is the most important part of the log. Explain the alternatives you considered and why you rejected them.

---

## Checklist before you submit

- [ ] `npx prisma format` runs with no errors.
- [ ] `npx prisma migrate dev` has been run and the `prisma/migrations` folder is included.
- [ ] `npx prisma db seed` runs with no errors, and can be run a second time without failing.
- [ ] All six relationship rules from Task 1 are in the schema.
- [ ] The seed data meets every minimum in Task 2.
- [ ] `docs/erd.png` shows every table and relationship clearly.
- [ ] `docs/relationships.md` explains every relationship in the ERD.
- [ ] `WORKLOG.md` has an entry for every session, each with a "why".
- [ ] `.env` is **not** included in your submission.

## Extension tasks (optional)

- Add a `Playlist` model. A user can create many playlists, and a playlist holds many songs **in a set order**. How will you store the order?
- Add a `Play` model that records each time a user plays a song, and seed it with listening history.
- Write a short script that uses Prisma Client to print the five most-liked songs, with their artists and album.
