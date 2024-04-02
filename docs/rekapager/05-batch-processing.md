---
title: Batch Processing
---

Any `PageableInterface` objects can be used to iterate its underlying data page
by page.

## Prerequisites

When using the library only for batch processing, you only need to [install the
adapters](adapters) you need. Framework integration is not required.

## Batch Processing

To iterate over a large amount of data, you can use the following pattern:

```php
use Doctrine\ORM\EntityManagerInterface;
use Rekalogika\Rekapager\PageableInterface;

/** @var PageableInterface $pageable */
/** @var EntityManagerInterface $entityManager */

foreach ($pageable->withItemsPerPage(1000)->getPages() as $page) {
    foreach ($page as $item) {
        // Do something with the item
    }

    // Do something after each page here
    // With Doctrine, you'd usually want to flush() and clear() here
    $entityManager->flush(); // if required
    $entitymanager->clear();
}
```

:::tip Protip

You should always use keyset pagination for batch processing large amounts of
data residing in a database.

:::