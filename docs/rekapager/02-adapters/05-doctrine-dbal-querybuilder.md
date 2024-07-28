---
title: Doctrine DBAL QueryBuilder
---

`QueryBuilderAdapter` takes a Doctrine DBAL `QueryBuilder` instance. It supports
keyset and offset pagination.

## Installation

```bash
composer require rekalogika/rekapager-doctrine-dbal-adapter
```

## Usage

```php
use Doctrine\DBAL\Connection;
use Rekalogika\Rekapager\Doctrine\DBAL\QueryBuilderAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;
use Rekalogika\Rekapager\Offset\OffsetPageable;

/** @var Connection $connection */

$queryBuilder = $connection
    ->createQueryBuilder()
    ->select('p.id', 'p.date', 'p.title', 'p.content')
    ->from('post', 'p')
    ->where('p.set_name = :setName')
    ->setParameter('setName', $setName);

// highlight-start
$adapter = new QueryBuilderAdapter(
    queryBuilder: $queryBuilder,
    orderBy: [
        'p.date' => Order::Descending,
        'p.title' => Order::Ascending,
        'p.id' => Order::Ascending,
    ],
    indexBy: 'id'
);
// highlight-end

$pageable = new KeysetPageable($adapter);
// or
$pageable = new OffsetPageable($adapter);
```