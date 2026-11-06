# Sample Data

Use this data in `prisma/seed.ts` so you can spend your time on the database, not on making up bands. You do not have to use all of it: pick enough to meet the rules in each task. The artists are made up. Any real band with the same name is a coincidence.

## The minimum set

Rows marked ✓ in the **Min** column are the **minimum set**: 3 artists, 3 albums, 6 tracks and 2 playlists. The minimum set meets every rule in [tasks.md](tasks.md), so use it to save typing. Add the other rows only if you finish early.

The minimum set meets every rule because:

- The Harbour Lights have more than one album.
- Every album in the set has two tracks.
- Every playlist has more than one track.
- _Night Bus_ and _Arcade Lights_ are on more than one playlist.
- _Rain on the Strand_ is on no playlists at all, and Kara Moss has no albums yet. Both are allowed. Think about what they tell you about each relationship.

The full data meets the same rules. In the full data, _Daylight Again_ is the track on no playlists.

The **Variable** column gives a name you can use for each record in your seed script. Later tasks use these names.

## Artists (Task 1)

| Min | Variable        | name               | genre      | hometown |
| --- | --------------- | ------------------ | ---------- | -------- |
| ✓   | `harbourLights` | The Harbour Lights | Indie Rock | Torquay  |
| ✓   | `neonTide`      | Neon Tide          | Electronic | Plymouth |
| ✓   | `karaMoss`      | Kara Moss          | Folk       | Totnes   |

## Albums (Task 2)

| Min | Variable       | title          | releaseYear | Artist          |
| --- | -------------- | -------------- | ----------- | --------------- |
| ✓   | `lowTide`      | Low Tide       | 2022        | `harbourLights` |
| ✓   | `pierPressure` | Pier Pressure  | 2024        | `harbourLights` |
| ✓   | `afterglow`    | Afterglow      | 2023        | `neonTide`      |
|     | `stoneAndSalt` | Stone and Salt | 2025        | `karaMoss`      |

## Tracks (Task 3)

`durationSeconds` is the length of the track in seconds (214 seconds = 3 minutes 34 seconds).

| Min | Variable        | title              | trackNumber | durationSeconds | Album          |
| --- | --------------- | ------------------ | ----------- | --------------- | -------------- |
| ✓   | `seaWall`       | Sea Wall           | 1           | 214             | `lowTide`      |
| ✓   | `lastFerry`     | Last Ferry Home    | 2           | 251             | `lowTide`      |
|     | `paperBoats`    | Paper Boats        | 3           | 189             | `lowTide`      |
| ✓   | `arcadeLights`  | Arcade Lights      | 1           | 202             | `pierPressure` |
| ✓   | `strandRain`    | Rain on the Strand | 2           | 236             | `pierPressure` |
| ✓   | `nightBus`      | Night Bus          | 1           | 263             | `afterglow`    |
| ✓   | `staticHearts`  | Static Hearts      | 2           | 228             | `afterglow`    |
|     | `daylightAgain` | Daylight Again     | 3           | 301             | `afterglow`    |
|     | `dartmoorRain`  | Dartmoor Rain      | 1           | 197             | `stoneAndSalt` |
|     | `longWayRound`  | The Long Way Round | 2           | 242             | `stoneAndSalt` |

## Playlists (Task 4)

In the minimum set, leave out any track in the **Tracks** column that you did not create.

| Min | Variable   | name      | isPublic | Tracks                                                  |
| --- | ---------- | --------- | -------- | ------------------------------------------------------- |
| ✓   | `roadTrip` | Road Trip | true     | `lastFerry`, `nightBus`, `arcadeLights`, `longWayRound` |
|     | `rainyDay` | Rainy Day | false    | `strandRain`, `dartmoorRain`, `paperBoats`              |
| ✓   | `gymMix`   | Gym Mix   | true     | `nightBus`, `staticHearts`, `arcadeLights`, `seaWall`   |

## Users (extension task only)

| Variable | username | email            | Owns playlists       | Follows artists             |
| -------- | -------- | ---------------- | -------------------- | --------------------------- |
| `jess`   | jess_t   | jess@example.com | `roadTrip`           | `harbourLights`, `neonTide` |
| `sam`    | sam_k    | sam@example.com  | `rainyDay`, `gymMix` | `karaMoss`, `harbourLights` |
