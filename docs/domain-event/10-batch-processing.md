---
title: Batch Processing
---

How to handle domain events in batch processing.

## Common Patterns

To handle domain events in batch processing, you probably want to disable
auto-dispatch. This way, your equatable events will only be dispatched once at
the end of the batch processing, and you can avoid expensive event listeners
from affecting the performance of your batch processing.

```php
use Rekalogika\DomainEvent\DomainEventAwareEntityManagerInterface;

/** @var DomainEventEntityManagerInterface $entityManager */

// highlight-start
// disable autodispatching of domain events
$entityManager->setAutoDispatchDomainEvents(false);
// highlight-end

// Do some batch processing
$batchSize = 20;
$i = 1;

foreach (...) { // example loop, can also be a while, for, etc loop too.
    // Do some processing here. You can persist, update, or remove entities,
    // operations that might emit domain events.

    if ($i % $batchSize === 0) {
        // highlight-start
        // dispatches domain events in the pre-flush phase
        $entityManager->dispatchPreFlushDomainEvents();
        // highlight-end

        // flushes the changes to the database
        $entityManager->flush();

        // detaches all objects from Doctrine
        $entityManager->clear(); 
    }

    $i++;
}

// do not forget to handle the remaining items
$entityManager->dispatchPreFlushDomainEvents();
$entityManager->flush();
$entityManager->clear(); 

// highlight-start
// dispatches domain events in the post-flush phase
$entityManager->dispatchPostFlushDomainEvents();
// highlight-end

// highlight-start
// reenable autodispatching of domain events
$entityManager->setAutoDispatchDomainEvents(true);
// highlight-end
```