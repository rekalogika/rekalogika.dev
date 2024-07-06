---
title: Iterating Large Collections
---

## Problem

Using `foreach()` directly on a large collection will trigger full
initialization of the collection, and can cause an out-of-memory error.

Doctrine `Collection` does provide the `slice()` method to paginate the
collection. However it uses offset pagination that has these drawbacks:

* With a large collection, it will become slower and slower as you go further
  away from the start.
* If the underlying data changes while you are iterating it, the entire set will
  drift, and the iteration is going to miss or duplicate some records.

## Solution

`foreach()`-ing a collection from this package is subject to `$softLimit` and
`$hardLimit` checks as described in the [Potential Out-of-Memory
Handling](01-oom.md) section. It will stop you before it becomes an
out-of-memory problem.

All of our classes implement higher-level `PageableInterface` from our
`rekalogika/rekapager-contracts` which add keyset pagination feature to the
underlying data. Unlike offset pagination, keyset pagination does not have the
aforementioned drawbacks.

To iterate over a large collection, you can simply do this:

```php
use Doctrine\ORM\EntityManagerInterface;
use Rekalogika\Rekapager\PageableInterface;

/** @var EntityManagerInterface $entityManager */
// $collection is any collection object from this package

foreach ($collection->withItemsPerPage(1000)->getPages() as $page) {
    foreach ($page as $entity) {
        // Do something with the $entity
    }

    // Do something after each page here
    // With Doctrine, you'd usually want to flush() and clear() here
    $entityManager->flush(); // if required
    $entitymanager->clear();
}
```

There is no need to create ad-hoc queries every time you need to perform safe
iteration over a large collection.

For more information about batch processing using `PageableInterface`, see
[Batch Processing](../../rekapager/07-batch-processing.md).