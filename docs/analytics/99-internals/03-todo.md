---
title: Current To-do List
---

## Bugs

* It is impractical to traverse nodes of `Interval` type (e.g. month). Needs
  string matching method other than using `Stringable`.

## Missing Features

* Metadata caching
* Filtering
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
* Custom Doctrine types for interval types.
* Order by entity properties.

## Limitations

* Postgres `GROUP BY` maximum grouping set limit of 4096, can be circumvented by
  using multiple queries.

## Refactors

* Spin off pivot table to its own package.
* Exception refactoring
* Use parameters for `QueryBuilder` (see `DoctrineQueryTest`)
* Use native query for queries.