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

Immediate dispatching is dispatched outside `DomainEventManager` and
`DomainEventAwareEntityManager`, and therefore unaffected by
`setAutoDispatchDomainEvents()`.

:::

## Clearing Events

If the domain event queues are not empty at the end of the request,
`DomainEventManager` will throw `UndispatchedEventsException`. To prevent that
from happening, if you disable auto-dispatch, you need to make sure that you
dispatch both pre-flush and post-flush events as above. Alternatively, you can
clear the events if you don't want them dispatched:

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

## Getting the Events in the Queue

You can get the undispatched events in the queue by calling `popDomainEvents()`.

```php
use Rekalogika\DomainEvent\DomainEventAwareEntityManagerInterface;

/** @var DomainEventAwareEntityManagerInterface $entityManager */

$events = $entityManager->popDomainEvents();
```

This can be useful if you want to dispatch the events in another process, or
store them in a database, etc.