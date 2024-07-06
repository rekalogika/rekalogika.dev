---
title: Query-Backed Collection
---

An implementation of `Recollection` using a `QueryBuilder` as the data source.

## Installation

```bash
composer require rekalogika/collections-orm
```

## Usage

```php
use Rekalogika\Collections\ORM\QueryRecollection;

$queryBuilder = ... // create a QueryBuilder instance

$collection = new QueryRecollection(
    queryBuilder: $queryBuilder,
    indexBy: 'id'
);

// use $collection like a regular Collection or Recollection
```

## The Minimal Flavor

The minimal version of `QueryRecollection` is `QueryPageable`, which implements
`PageableRecollection`. Simply replace `QueryRecollection` with `QueryPageable` in
the example above.

## Extending `QueryRecollection`

TBD