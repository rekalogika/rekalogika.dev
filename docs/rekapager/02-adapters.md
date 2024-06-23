---
title: Adapters
---

An adapter provides a common interface for different types of underlying data.
There are two types of adapter interfaces: `OffsetPaginationAdapterInterface`
and `KeysetPaginationAdapterInterface`. An adapter implementation can implement
one or both of these interfaces.

## Doctrine ORM `QueryBuilder` Adapter

```bash
composer require rekalogika/rekapager-doctrine-orm-adapter
```

The `QueryBuilderAdapter` supports keyset pagination. The class requires a
`QueryBuilder` instance with the following conditions:

* It must have a sort order. Be sure to call `orderBy()` or `addOrderBy()` on
  the query builder before passing it to the adapter.
* If a field in a sort order uses non-scalar type, you should provide a type
  mapping. The adapter will use it in the `setParameter()` method of the
  `QueryBuilder`. See the example below.

:::info

If you don't provide a type mapping, the adapter will try to look it up from
Doctrine's class metadata. If it fails, it will use heuristics to detect the
type for some common objects.

:::

```php
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\EntityRepository;
use Rekalogika\Rekapager\Doctrine\ORM\QueryBuilderAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;

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

// QueryBuilderAdapter only supports Keyset pagination
$pageable = new KeysetPageable($adapter);
```

### `indexBy` Parameter

The `QueryBuilderAdapter` adds items to the end of the `select` clause.
Therefore, it does not support QueryBuilder's `indexBy` (the third parameter of
`from()`, or the second parameter of a repository's `createQueryBuilder()`).

If you need the feature, use the `indexBy` parameter of `QueryBuilderAdapter` as
the above example. `indexBy` supports deep addressing by using the dot notation,
e.g., `indexBy: 'user.id'`.

## Doctrine Collections `Selectable` Adapter

```bash
composer require rekalogika/rekapager-doctrine-collections-adapter
```

The `SelectableAdapter` supports both keyset and offset pagination. The class
requires a `Selectable` instance. Usually, it is a Doctrine `Collection` used in
entities, or a Doctrine repository.

The class needs to work with a `Criteria` object, but if the caller omits it,
the adapter will create an empty `Criteria` object. If the `Criteria` does not
have a sort order, the adapter will sort the collection using the field `id`. If
the object does not have an `id` field, Doctrine will throw an exception.

```php
use Doctrine\Common\Collections\Criteria;
use Doctrine\ORM\EntityRepository;
use Rekalogika\Rekapager\Doctrine\Collections\SelectableAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;
use Rekalogika\Rekapager\Offset\OffsetPageable;

/** @var EntityRepository $postRepository */

$selectable = $postRepository; // a Doctrine repository is also a Selectable
// or
$selectable = $user->getComments(); // a Doctrine Collection in an entity

$criteria = Criteria::create()
    ->where(Criteria::expr()->eq('group', $group))
    ->orderBy([
        'date' => Order::Descending,
        'title' => Order::Ascending,
        'id' => Order::Ascending
    ]);

// highlight-start
$adapter = new SelectableAdapter(
    collection: $selectable,
    criteria: $criteria,
    indexBy: 'id' // optional
);
// highlight-end

$pageable = new KeysetPageable($adapter);
// or
$pageable = new OffsetPageable($adapter);
```

### `indexBy` Parameter

There is a Doctrine bug that may prevents a `matching()` call from preserving
the keys of the collection. To workaround this issue, add the `indexBy`
parameter to the adapter like the example above.

## Doctrine Collections `Collection` Adapter

```bash
composer require rekalogika/rekapager-doctrine-collections-adapter
```

The `CollectionAdapter` supports only offset pagination. The class works with a
Doctrine `ReadableCollection` (also `Collection`) instance.

```php
use Doctrine\Common\Collections\Collection;
use Rekalogika\Rekapager\Doctrine\Collections\CollectionAdapter;
use Rekalogika\Rekapager\Offset\OffsetPageable;

/** @var Collection $collection */
$collection = $user->getComments(); // a Doctrine Collection in an entity

// highlight-next-line
$adapter = new CollectionAdapter($collection);

$pageable = new OffsetPageable($adapter);
```

## Pagerfanta Adapter Adapter

```bash
composer require rekalogika/rekapager-pagerfanta-adapter
```

Allows leveraging any of the existing Pagerfanta adapters. The
`PagerfantaAdapterAdapter` supports only offset pagination. The adapter takes a
Pagerfanta's `AdapterInterface` instance as its argument.

```php
use Pagerfanta\Doctrine\Collections\SelectableAdapter;
use Rekalogika\Rekapager\Offset\OffsetPageable;
use Rekalogika\Rekapager\Pagerfanta\PagerfantaAdapterAdapter;

$criteria = Criteria::create()
        ->where(Criteria::expr()->eq('group', $group));

$pagerfantaAdapter = new SelectableAdapter($user->getPosts(), $criteria);
// highlight-next-line
$adapter = new PagerfantaAdapterAdapter($pagerfantaAdapter);

$pageable = new OffsetPageable($adapter);
```

:::info

If you already have a `Pagerfanta` instance, you can use `PagerfantaPageable`
instead.

:::