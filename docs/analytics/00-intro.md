---
title: Introduction
---

Creates and maintains pre-aggregated summary tables for Doctrine entities.
Provides a fast and easy way to perform analytical queries.

This package works using the classical OLAP cube approach of data warehousing.
It processes data from the source table and pre-aggregate it in a summary table.
This summary table is then used to perform analytical queries.

:::danger

These packages are still in development and not yet ready for production use.
Not all features are implemented yet. The API is subject to change. And it does
not support Doctrine ORM 3 yet.

:::

## Advantages

Works directly on the entities. Does not use intermediate fact tables. Does not
require any additional ETL processes.

Optimized for incremental updates. (TBD explain)

Better logistics. No need to pass data to and from external systems. No need to
maintain additional infrastructure.

A simpler and cheaper alternative to modern analytical solutions. Less
sophisticated but probably good enough for many use cases.

Sometimes things can be more challenging legally and politically, rather than
technically. This framework does not send data to the cloud, so it complies with
the 'no-cloud' policy if you happen to be bound by it.

Architecturally sensible if the result of the analytical query will be used as
an input of a business process in the same application, as opposed to being used
for external reporting purposes only.

Understands Doctrine's metadata, unlike external solutions that work directly
with the database. No need to duplicate the knowledge about your database
schema between your application and the external analytical system.

Detects if an entity is added, modified, or deleted. It can then automatically
update the summary table accordingly. No need to devise a way to signal an
external system that the data has changed. Or even to blindly recalculate all
data up to 5 years ago periodically, just because you fear some process might
have changed records that old, but you can't know for sure.

## Requirements

Only works with PostgreSQL for now.

## Installation

```bash
composer require rekalogika/analytics-bundle
```

## License

MIT

## Contributing

This framework consists of multiple repositories split from a monorepo. Be
sure to submit issues and pull requests to the
[`rekalogika/analytics`](https://github.com/rekalogika/analytics) monorepo.