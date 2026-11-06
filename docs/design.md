# Design Report: Riptide Music Database

**Name:**

**Date:**

## How to fill this in

- You have about **30 minutes** for this report. Each section shows a suggested time. Start it at **1 hour 30 minutes** into the session, even if you have not finished building.
- Answer every prompt (the `>` lines). Leave the prompts in and write your answers under them, in whatever form explains your thinking best.
- Explain your thinking. "I did it because the task said to" does not explain anything. Say **why** that choice is right for _this_ system.
- Use names from your own schema, data and `migration.sql` files as evidence.
- If you did not finish, **section 6 is the most important section**. It is how I find out what you were trying to do.

---

## 1. Planning (5 minutes)

> For each of your tables, what does **one record** represent? Which fields did you add because of a business rule, rather than because the task listed them?

> Before you wrote any code for Task 4, how did you plan the playlist relationship? Use the sample data to explain why a single foreign key on `Track` or on `Playlist` could not hold it.

---

## 2. Relationships (10 minutes)

Save your ERD screenshot as `docs/erd.png`. It will appear below.

![My ERD from the Prisma Studio Visualizer](erd.png)

Your database has two **one-to-many** relationships that are built the same way, and one **many-to-many**.

### `Artist` and `Album` (one-to-many)

> What is the cardinality, in both directions? Can either side have zero? Use your sample data.

> Which table holds the foreign key, and why that table and not the other?

> Quote the line in `migration.sql` that creates the link, and explain each part of it.

### `Album` and `Track` (one-to-many)

> How is this relationship the same as `Artist` and `Album`, and is anything different?

### `Playlist` and `Track` (many-to-many)

> What is the cardinality, in both directions? Some tracks are on no playlists. What does that tell you?

> Your schema has no foreign key on `Playlist` or `Track`. Where are the links stored, and what does one row there mean?

> Quote the lines in `migration.sql` that create the join table and its keys. Why is its primary key made of two columns?

> Does your ERD show this relationship as one line, or as a join table with two lines? Explain why the diagram looks the way it does.

---

## 3. Deleting data and referential integrity (5 minutes)

Open `migration.sql` for `add-album` and for `add-playlist`, and find the words after `ON DELETE` on each foreign key.

> Your seed must delete albums **before** artists, or it fails. But `prisma.playlist.deleteMany()` works in any position, even before or after `prisma.track.deleteMany()`. Explain why, quoting the `ON DELETE` rules from the two migrations.

> Suppose `Album_artistId_fkey` were `ON DELETE CASCADE` instead. What would happen when an artist is deleted? Would that be a good rule for Riptide? Give one reason for and one against.

---

## 4. Design decisions (5 minutes)

> Describe **two** decisions you made. For each one, say what you chose, what else you could have chosen, and why your choice is better for Riptide.

Ideas, if you need them:

- Storing a track's length as `durationSeconds` (`Int`) instead of text like `"3:34"`.
- Which fields you made optional (`?`) and which you made required. What would an optional `artistId` mean?
- The extra field you chose for `Playlist`, its type, and whether it has a default.
- Whether any field should be unique (for example `trackNumber` within an album).

---

## 5. Evaluation: implicit or explicit many-to-many? (5 minutes)

You built the playlist relationship as an **implicit** many-to-many: Prisma made the join table and hides it from your schema. The other option is an **explicit** many-to-many, where you write the join table yourself as a model of its own. That model has two one-to-many relationships, one to each side, each built like your `Album` to `Artist` link.

> A real playlist plays its tracks in a set order. Why can your current design not store that order?

> What would an explicit join model for Riptide contain? Give one advantage and one disadvantage compared with what you built. Which would you choose for the real Riptide app, and why?

---

## 6. Progress and unfinished work

> For each task (1 to 5, and any extension you tried), is it done, partly done or not started?

> For **every** task that is not done: what were you trying to build, and how should it link to the other tables? Show the model you were trying to make, even if it does not work. Where did you get stuck? Give the exact error message and the command that caused it. What did you try, what do you think the problem is, and what would you try next?
