---
title: Doctrine Collections Selectable
---

Takes a Doctrine `Selectable` instance, including Doctrine repository and
practically all implementations of Doctrine collections. The adapter supports
both keyset and offset pagination.

The class needs to work with a `Criteria` object, but if the caller omits it,
the adapter will create an empty `Criteria` object. If the `Criteria` does not
have a sort order, the adapter will sort the collection using the field `id`. If
the object does not have an `id` field, Doctrine will throw an exception.

## Installation

```bash
composer require rekalogika/rekapager-doctrine-collections-adapter
```

## Usage

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

