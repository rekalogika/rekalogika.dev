---
title: Refresh Mechanism
---

## `DirtyFlag`

A `DirtyFlag` is an entity indicating a dirty partition, which is a partition in
a summary table that needs to be refreshed. `DirtyFlag` should be persisted and
flushed at the same time as the rest of the entities, during the `onFlush`
event. So if the flush fails, the flag will not be saved.

A `DirtyFlag` can have null partition information. In this case, it means there
are new persisted entities that need to be summarized. New entities need to be
handled differently because they are not guaranteed to have an ID before flush.

## `SourceEntityListener`

Listens on Doctrine's `onFlush` event. For every pending entities, it checks the
change set and determines if the change affects any summary tables. If a
property is changed, and that would affect one or more summary tables, it
creates the corresponding `DirtyFlag` objects for each of the partition that
needs to be refreshed.

:::warning

This automatic detection works only for simple cases: it only detects the change
of the properties in the entity itself. If the change that would affect the
summary is in a related entity, the framework cannot detect that.

:::

At the end of a flush, the listener will dispatch a `NewDirtyFlagEvent` event.

## `NewDirtyFlagListener`

Listens on the `NewDirtyFlagEvent` event. It calls
`RefreshScheduler::scheduleWorker()` to schedule a worker to refresh the dirty
partitions.

## Refresh Worker

The refresh worker is responsible for performing refresh at a specific time. Its
objectives:

* Runs immediately if there is no contention.
* Runs only once within a given interval.
* Allows ad-hoc refreshes to take place.
* Anticipates long-running refreshes.

There are 3 timing parameters used by the worker defined in `RefreshClassProperties`:

* `startDelay`: The delay between the source change and the first worker run.
* `interval`: The interval between runs.
* `expectedMaximumProcessingTime`: The maximum time the worker is expected to
  run.

Scheduler pseudocode:

```
$s = startDelay
$i = interval
$m = expectedMaximumProcessingTime

acquire lock that expires at now() + $s + $m + 2 * $i

if lock acquired:
    schedule primary worker at now() + $s
    do not release $lock
else:
    raise flag
```

Worker pseudocode:

```
refresh lock to expire at now() + $m + 2 * $i
remove flag
do the work
refresh lock to expire at now() + 2 * $i
schedule secondary worker at now() + $i
```

Secondary worker pseudocode:

```
if flag is raised:
    execute primary worker
else:
    release lock
```