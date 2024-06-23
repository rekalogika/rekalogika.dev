---
title: Batch Processing
---

Any `PageableInterface` objects can be used to iterate its underlying data page
by page. Rather than loading the entire data set into memory, you can process
the data in multiple batches (a.k.a pages, chunks, slices).

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

## Always Use Keyset Pagination

While it is possible to use traditional offset pagination, you should always use
keyset pagination for batch processing:

* With offset pagination you risk missing items, or processing the same items
multiple times, if the underlying data changes while you are processing it.

* Offset pagination will become slower and slower as you go further away from
  the first page.

## Comparison to `Query::toIterable()`

Doctrine's documentation [recommends using
`Query::toIterable()`](https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/batch-processing.html#iterating-results)
to iterate over large result sets. This, however, has several drawbacks:

* Contrary to what one might expect, `toIterable()` actually runs the query only
  once, then loads the entire result into memory, which can be problematic for
  large result sets. It only saves us memory in the hydration phase, in the
  sense that it does not hydrate the result into entities all at once.

* Even when you don't care about memory usage, queries with large results will be
  much slower to execute. The application must wait for the query to finish, and
  depending on the application, it may affect interactivity and user experience.

* `toIterable()` may not trigger the [`postLoad` event
  handlers](https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/events.html#postload).
  Therefore, your entities might not behave the same way as when you load them
  normally.

Using `PageableInterface` for batch processing should solve these issues.

## Suspending and Resuming Batch Processing

Sometimes you might need to suspend and resume batch processing. For example,
you might need to stop the process to perform some maintenance, to perform the
processing only during off-peak hours, or to continue in the event of a failure.

The strategy is to save the last page's identifier, and then use it as the input
for `getPages()` when you resume the process. Here is an example:

```php
use Doctrine\ORM\EntityManagerInterface;
use Rekalogika\Rekapager\PageableInterface;

/**
 * Runs the batch for the specified duration. Will continue from the last
 * in the next run.
 */
class Batch
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private PageableInterface $pageable,
        private string $identifierFile,
        private int $maxDurationInSeconds,
    ) {
    }

    public function batchProcess(): void
    {
        $startTime = time();
    
        $start = $this->loadIdentifier();
        $pageable = $this->pageable->withItemsPerPage(1000);
    
        foreach ($pageable->getPages($start) as $page) {
            $this->saveIdentifier($page->getIdentifier());
    
            if (time() - $startTime > $this->maxDurationInSeconds) {
                return;
            }
    
            foreach ($page as $item) {
                // Do something with the item
            }
    
            // Do something after each page here
            $this->entityManager->flush(); // if required
            $this->entitymanager->clear();
        }

        echo "all done. don't rerun again.";
        $this->removeIdentifier();
    }

    private function saveIdentifier(object $identifier): void
    {
        file_put_contents($this->identifierFile, serialize($identifier));
    }
    
    private function loadIdentifier(): ?object
    {
        if (!file_exists($this->identifierFile)) {
            return null;
        }
    
        return unserialize(file_get_contents($this->identifierFile));
    }

    private function removeIdentifier(): void
    {
        if (file_exists($this->identifierFile)) {
            unlink($this->identifierFile);
        }
    }
}
```