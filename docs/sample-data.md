# Sample Data

Use this data in `prisma/seed.ts` so you can spend your time on the database, not on thinking up films. You do not have to use all of it: pick enough to meet the rules in each task.

The data already meets every rule in [tasks.md](tasks.md):

- Christopher Nolan has more than one film.
- Several films have more than one actor.
- Several actors appear in more than one film.

## Directors (Task 1)

Pick 2 or 3. Christopher Nolan is already in the starter seed script.

| Variable | name | nationality |
|---|---|---|
| `nolan` | Christopher Nolan | British |
| `gerwig` | Greta Gerwig | American |
| `villeneuve` | Denis Villeneuve | Canadian |

## Films (Task 2)

Pick 3 to 5. Only pick films whose director you created in Task 1.

| Variable | title | releaseYear | Director |
|---|---|---|---|
| `inception` | Inception | 2010 | `nolan` |
| `interstellar` | Interstellar | 2014 | `nolan` |
| `oppenheimer` | Oppenheimer | 2023 | `nolan` |
| `littleWomen` | Little Women | 2019 | `gerwig` |
| `dune` | Dune | 2021 | `villeneuve` |

## Actors (Task 3)

Pick 3 to 5. Only connect an actor to films you created in Task 2.

| name | birthYear | Films |
|---|---|---|
| Leonardo DiCaprio | 1974 | `inception` |
| Cillian Murphy | 1976 | `inception`, `oppenheimer` |
| Matt Damon | 1970 | `interstellar`, `oppenheimer` |
| Timothée Chalamet | 1995 | `interstellar`, `littleWomen`, `dune` |
| Florence Pugh | 1996 | `oppenheimer`, `littleWomen` |

## Reviews (extension task only)

Pick up to 5.

| Film | rating | comment |
|---|---|---|
| `inception` | 5 | Clever and exciting. I want to watch it again. |
| `inception` | 4 | Confusing at first, but the ending is brilliant. |
| `interstellar` | 5 | The music and the space scenes are amazing. |
| `oppenheimer` | 3 | Very good acting, but far too long. |
| `dune` | 4 | Looks incredible on a big screen. |
