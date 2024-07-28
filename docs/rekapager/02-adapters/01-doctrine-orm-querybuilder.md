---
title: Doctrine ORM QueryBuilder
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`QueryBuilderAdapter` takes a Doctrine ORM `QueryBuilder` instance. It supports
keyset and offset pagination.

## Installation

```bash
composer require rekalogika/rekapager-doctrine-orm-adapter
```

If you need [SQL row values](../10-seek-method) support, you need to register
the necessary DQL function:

<Tabs>

<TabItem value="Symfony">

If you are using Symfony, add the following to your configuration:

```yaml title="config/packages/doctrine.yaml"
doctrine:
    orm:
        dql:
            string_functions:
                REKAPAGER_ROW_VALUES: Rekalogika\Rekapager\Doctrine\ORM\RowValuesFunction
```

</TabItem>

<TabItem value="Manual Wiring">

If you wire Doctrine manually, use the following code:

```php
use Doctrine\ORM\Configuration;
use Rekalogika\Rekapager\Doctrine\ORM\RowValuesFunction;

/** @var Configuration $configuration */
$configuration
    ->addCustomStringFunction('REKAPAGER_ROW_VALUES', RowValuesFunction::class);
```

</TabItem>

</Tabs>


## Usage

```php
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\EntityRepository;
use Rekalogika\Rekapager\Doctrine\ORM\QueryBuilderAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;
use Rekalogika\Rekapager\Offset\OffsetPageable;

/** @var EntityRepository $postRepository */

$queryBuilder = $postRepository
    ->createQueryBuilder('p')
    ->where('p.group = :group')
    ->setParameter('group', $group)
    ->addOrderBy('p.date', 'DESC') // a date field that accepts DateTime
    ->addOrderBy('p.title', 'ASC')
    ->addOrderBy('p.id', 'ASC');

// highlight-start
$adapter = new QueryBuilderAdapter(
    queryBuilder: $queryBuilder,
    typeMapping: [
        'p.date' => Types::DATE_MUTABLE // the type of the date field
    ],
    indexBy: 'id' // optional
);
// highlight-end

$pageable = new KeysetPageable($adapter);
// or
$pageable = new OffsetPageable($adapter);
```

## Notes

With keyset pagination, there are additional prerequisites:

* The underlying `QueryBuilder` object must have a sort order. Be sure to call
  `orderBy()` or `addOrderBy()` on the query builder before passing it to the
  adapter.
* If a field in a sort order uses a non-scalar type, you should provide a
  `typeMapping` option. The adapter will use it in the `setParameter()` method
  of the `QueryBuilder`. The example above shows how to provide a type mapping
  for a date field.

:::info

If you don't provide a type mapping, the adapter will try to look it up from
Doctrine's class metadata. If it fails, it will use heuristics to detect the
type for some common objects.

:::

:::caution

The `QueryBuilderAdapter` does not support QueryBuilder's `indexBy` (the third
parameter of `from()`, or the second parameter of a repository's
`createQueryBuilder()`). If you need the feature, use the `indexBy` parameter of
`QueryBuilderAdapter` as the above example.

:::