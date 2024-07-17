---
title: Doctrine Collections Integration
---

High-level integration with Doctrine Collections is provided by our
`rekalogika/collections-*` packages. Read more about them in the
[rekalogika/collections](/collections) documentation. This document focuses on
how this high-level integration can improve your workflow.

## Transforms a `Collection` into a `Collection` + `Pageable`

Use the `RecollectionDecorator` class to add `PageableInterface` functionality
to a Doctrine Collection.

```php
use Doctrine\Common\Collections\Collection;
use Rekalogika\Contracts\Collections\Recollection;
use Rekalogika\Domain\Collections\RecollectionDecorator;

/** @var Collection $someCollection */

$improvedCollection = RecollectionDecorator::create($someCollection);
```

In the example above, `$improvedCollection` is now a `Recollection` object which
is still a `Collection` but also a `PageableInterface` at the same time.

## A Better `->matching()`

Rather than doing this:

```php
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;

/** @var Collection $collection */

$criteria = Criteria::create()->where(...);

$filteredCollection = $collection->matching($criteria);
```

You can do this:

```php
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Rekalogika\Domain\Collections\CriteriaRecollection;

/** @var Collection $collection */

$criteria = Criteria::create()->where(...);

$filteredCollection = CriteriaRecollection::create($collection, $criteria);
```

The upside of the latter is that the result is lazy-loaded and implements both
`ReadableCollection` and `PageableInterface`.

## Transforms a `QueryBuilder` into a `Collection` + `Pageable`

```php
use Rekalogika\Collections\ORM\QueryRecollection;

$queryBuilder = ... // create a QueryBuilder instance

$collection = new QueryRecollection(
    queryBuilder: $queryBuilder,
    indexBy: 'id'
);
```

In the example above, `$collection` is now a `Recollection` object which is a
`Collection` and a `PageableInterface` at the same time.

## There are More

Our `rekalogika/collections-*` packages are more than just about
`PageableInterface`. Check out the [rekalogika/collections](/collections)
documentation for more information.