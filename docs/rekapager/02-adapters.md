---
title: Adapters
---

An adapter provides a common interface for different types of underlying data.
There are two types of adapter interfaces: `OffsetPaginationAdapterInterface`
and `KeysetPaginationAdapterInterface`. An adapter implementation can implement
one or both of these interfaces.

## Doctrine ORM `QueryBuilder` Adapter

The `QueryBuilderAdapter` is available with the
`rekalogika/rekapager-doctrine-orm-adapter` package. It supports keyset
pagination.

The class requires a `QueryBuilder` instance with the following conditions:

* It must have a sort order. Be sure to call `orderBy()` or `addOrderBy()` on
  the query builder before passing it to the adapter.
* If a field in a sort order uses non-scalar type, you need to provide a type
  mapping. The adapter will use it in the `setParameter()` method of the
  `QueryBuilder`. See the example below.

```php
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\EntityRepository;
use Rekalogika\Rekapager\Doctrine\ORM\QueryBuilderAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;

/** @var EntityRepository $postRepository */
$queryBuilder = $postRepository
    ->createQueryBuilder('p')
    ->where('p.setName = :setName')
    ->setParameter('setName', $setName)
    ->addOrderBy('p.date', 'DESC') // a date field that accepts DateTime
    ->addOrderBy('p.title', 'ASC')
    ->addOrderBy('p.id', 'ASC');

// highlight-start
$adapter = new QueryBuilderAdapter(
    queryBuilder: $queryBuilder,
    typeMapping: [
        'p.date' => Types::DATE_MUTABLE // the type of the date field
    ]
);
// highlight-end

// QueryBuilderAdapter only supports Keyset pagination
$pageable = new KeysetPageable($adapter);
```

## Doctrine Collections `Selectable` Adapter

The `SelectableAdapter` is available with the
`rekalogika/rekapager-doctrine-collections-adapter` package. It supports keyset
and offset pagination.

The class requires a `Selectable` instance. Usually, it is a Doctrine
`Collection` used in entities, or a Doctrine repository.

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
    ->where(Criteria::expr()->eq('setName', $setName))
    ->orderBy([
        'date' => Order::Descending,
        'title' => Order::Ascending,
        'id' => Order::Ascending
    ]);

// highlight-next-line
$adapter = new SelectableAdapter($selectable, $criteria);

$pageable = new KeysetPageable($adapter);
// or
$pageable = new OffsetPageable($adapter);
```

## Doctrine Collections `Collection` Adapter

The `CollectionAdapter` is available with the
`rekalogika/rekapager-doctrine-collections-adapter` package. It supports only
offset pagination.

The class works with a Doctrine `ReadableCollection` instance.

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

Allows leveraging any of the existing Pagerfanta adapters. The
`PagerfantaAdapterAdapter` is available with the
`rekalogika/rekapager-pagerfanta-adapter` package. It supports only offset
pagination.

The adapter takes a Pagerfanta's `AdapterInterface` instance as its argument.

```php
use Pagerfanta\Doctrine\Collections\SelectableAdapter;
use Rekalogika\Rekapager\Offset\OffsetPageable;
use Rekalogika\Rekapager\Pagerfanta\PagerfantaAdapterAdapter;

$criteria = Criteria::create()
        ->where(Criteria::expr()->eq('setName', $setName));

$pagerfantaAdapter = new SelectableAdapter($user->getPosts(), $criteria);
// highlight-next-line
$adapter = new PagerfantaAdapterAdapter($pagerfantaAdapter);

$pageable = new OffsetPageable($adapter);
```

:::info

If you already have a `Pagerfanta` instance, you can use `PagerfantaPageable`
instead.

:::