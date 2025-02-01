---
title: Refresh
---

## `SummarySignal`

A `SummarySignal` is an entity indicating a dirty partition, which is a
partition in a summary table that needs to be refreshed. `SummarySignal` should
be persisted and flushed at the same time as the rest of the entities, during
the `onFlush` event. So if the flush fails, the signal will not be saved.

A `SummarySignal` can have null partition information. In this case, it means
there are new persisted entities that need to be summarized. New entities
need to be handled differently because they are not guaranteed to have an
ID before flush.

## `SourceEntityListener`

Listens on Doctrine's `onFlush` event. For every pending entities, it checks the
change set and determines if the change affects any summary tables. Then it
instantiates the corresponding `SummarySignal` objects and persists them.