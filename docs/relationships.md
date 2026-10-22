# Relationships

## How to fill this in

1. Save your ERD screenshot as `docs/erd.png`. It will appear under **My ERD** below.
2. Count the relationship lines in your ERD. You need **one section for each line**.
3. In each section, answer the four questions. Delete the *grey hint text* (the lines starting with `>`) and write your answer in its place.
4. Stuck? Open the **worked example** below. It uses a different database (authors and books), so you can see what a good answer looks like without copying.

<details>
<summary><strong>Worked example: Author and Book (click to open)</strong></summary>

### Author and Book

**1. Which tables are linked, and what type of relationship is it?**

`Author` and `Book`. It is a **one-to-many** relationship.

**2. What is the cardinality in plain English?**

One author can have zero or many books. Each book must have exactly one author.

**3. How is it built in the database?**

The `Book` table has a foreign key called `authorId`. It stores the `id` of the author who wrote the book.

**4. Why did I build it this way?**

The rule says each book has one author, so a single `authorId` column on `Book` is enough. If I put the foreign key on `Author` instead, one author row would need to hold a list of book IDs in one column, which a relational database cannot store properly. I made `authorId` required (not optional) because a book cannot exist without an author.

</details>

---

## My ERD

![My ERD from the Prisma Studio Visualizer](erd.png)

---

## Relationship 1: [Table] and [Table]

**1. Which tables are linked, and what type of relationship is it?**

> Name both tables. Is it one-to-one, one-to-many or many-to-many?

**2. What is the cardinality in plain English?**

> Write two sentences, one from each side:
> "One ___ can have ___ ___. Each ___ must have ___ ___."

**3. How is it built in the database?**

> Which table holds the foreign key, and what is the column called?
> Or, for many-to-many: what is the join table called, and what columns does it have? (Check your `migration.sql`.)

**4. Why did I build it this way?**

> Which rule in the task sheet does this meet? Why is the foreign key (or join table) where it is? Did you make anything optional, and why?

---

## Relationship 2: [Table] and [Table]

**1. Which tables are linked, and what type of relationship is it?**

> Name both tables. Is it one-to-one, one-to-many or many-to-many?

**2. What is the cardinality in plain English?**

> Write two sentences, one from each side:
> "One ___ can have ___ ___. Each ___ can have ___ ___."

**3. How is it built in the database?**

> Which table holds the foreign key, and what is the column called?
> Or, for many-to-many: what is the join table called, and what columns does it have? (Check your `migration.sql`.)

**4. Why did I build it this way?**

> Which rule in the task sheet does this meet? Why is the foreign key (or join table) where it is? Did you make anything optional, and why?
