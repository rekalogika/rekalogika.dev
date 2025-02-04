---
title: Current To-do List
---

## Bugs

* Improve `QueryResult` API for consumer usage.
* Not all interval objects start and end at the proper time.

## Missing Features

* Metadata caching
* Support for MS SQL Server
* Configurable event timing (`RefreshClassPropertiesResolver`)
* Allow customized generation of dirty flag (see `DirtyFlagGenerator`)
* It should be possible for `DirtyFlagGenerator` to generate dirty partition
  signals for non-`IDENTITY` entities, bypassing 'new entity' phase.
* Hyperloglog
* Binning value resolver
* Measure using getter (example: `getAverage()` that gets its value from
  `$this->sum / $this->count`)
* Subtotals

## Limitations

* Postgres `GROUP BY` maximum grouping set limit of 4096, can be circumvented by
  using multiple queries.

## Reorganization

* Spin off pivot table to its own package.
* Exception refactoring