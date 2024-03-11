---
title: Manual Control
---

To manually manage domain events, you can use
`DomainEventAwareEntityManagerInterface` in place of the regular
`EntityManagerInterface`. It adds several methods to the Entity Manager that you
can use to manage domain event dispatching.

## Manual Dispatching

You can disable automatic dispatching on `flush()` by calling
`setAutoDispatchDomainEvents(false)`.

```php
use Rekalogika\DomainEvent\DomainEventAwareEntityManagerInterface;

/** @var DomainEventAwareEntityManagerInterface $entityManager */

$entityManager->setAutoDispatchDomainEvents(false);

// ...

$entityManager->dispatchPreFlushDomainEvents();
$entityManager->flush();
$entityManager->dispatchPostFlushDomainEvents();
```

:::note

Immediate dispatching is dispatched outside `DomainEventAwareEntityManager`, and
therefore unaffected by `setAutoDispatchDomainEvents()`.

:::

## Clearing the Events

If the domain event queues are not empty at the end of the request,
`DomainEventEntityManager` will throw `UndispatchedEventsException`. To prevent
that from happening, if you disable auto-dispatch, you need to make sure that
you dispatch both pre-flush and post-flush events as above. Alternatively, you
can clear the events if you don't want them dispatched:

```php
use Rekalogika\DomainEvent\DomainEventAwareEntityManagerInterface;

/** @var DomainEventAwareEntityManagerInterface $entityManager */

$entityManager->setAutoDispatchDomainEvents(false);

// ...

$entityManager->flush();
$entityManager->clearDomainEvents();
```

:::note

In the event of an uncaught error, the framework will automatically
clear undispatched events using the `kernel.exception` and `console.error`
events, so in such cases, you don't have to handle that manually. But if you
catch an exception that previously caused pending events not to be dispatched,
you need to manually clear the events.

:::

## Getting the Events From the Queue and Dispatching Them Elsewhere

You can get the undispatched events in the queue by calling `popDomainEvents()`.

```php
use Rekalogika\DomainEvent\DomainEventAwareEntityManagerInterface;

/** @var DomainEventAwareEntityManagerInterface $entityManager */

$events = $entityManager->popDomainEvents();
```

:::note

As it suggests, `popDomainEvents()` also removes the events from the queue.

:::

Then, you can dispatch them in another place, for example, in another process,
or at the end of a batch process.

```php
use Rekalogika\DomainEvent\DomainEventAwareEntityManagerInterface;

/** @var DomainEventAwareEntityManagerInterface $entityManager */

// highlight-next-line
$entityManager->recordDomainEvent($events);

$entityManager->dispatchPreFlushDomainEvents();
$entityManager->flush();
$entityManager->dispatchPostFlushDomainEvents();
```

You might find the `DomainEventStore` object useful. You can use it to store the
events in transit. It handles events `EquatableDomainEventInterface` and will
not keep more than one event having the same signature.

```php
use Rekalogika\DomainEvent\DomainEventAwareEntityManagerInterface;
use Rekalogika\DomainEvent\Model\DomainEventStore;

/** @var DomainEventAwareEntityManagerInterface $entityManager */

$domainEventStore = new DomainEventStore();

// a batch process
foreach (...) {
    // ...
    $domainEventStore->add($entityManager->popDomainEvents());
}

// ...

// now at the end of the batch process

$entityManager->recordDomainEvent($domainEventStore);
$entityManager->dispatchPreFlushDomainEvents();
$entityManager->flush();
$entityManager->dispatchPostFlushDomainEvents();
```

## Multiple Entity Managers

When working with multiple entity managers, usually the `ManagerRegistry` is
used to get the correct entity manager. This method still works with domain
events without any change.

However, if you need the domain-event-specific methods, you can use
`DomainEventAwareManagerRegistry` in place of `ManagerRegistry`. It adds several
methods to the registry that you can use to manage domain event dispatching:

* `getDomainEventAwareManager()`
* `getDomainEventAwareManagers()`
* `getDomainEventAwareManagerForClass()`

These are basically the same as their counterparts in `ManagerRegistry`, only
return `DomainEventAwareObjectManager` instead of `ObjectManager`.