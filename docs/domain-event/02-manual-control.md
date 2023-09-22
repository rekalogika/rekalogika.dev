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
/** @var DomainEventAwareEntityManagerInterface $entityManager */

$events = $entityManager->popDomainEvents();
```

This can be useful if you want to dispatch the events in another process, or
store them in a database, etc.

## Immediate Dispatcher Installation

Immediate event dispatcher works by installing the event dispatcher to a static
variable. This installation happens on several opportunities:

* In these events: `kernel.request` and `console.command`.
* During the initialization of `ManagerRegistry`.
* During the initialization of an `EntityManagerInterface`.

When any of these don't occur, there is no opportunity to install the event
dispatcher. This usually happens only in isolated unit tests. To fix the
problem, you can install a stub event dispatcher manually like the following.

```php
use PHPUnit\Framework\TestCase;
use Rekalogika\DomainEvent\ImmediateDomainEventDispatcherInstaller;
use Symfony\Component\EventDispatcher\EventDispatcher;

class SomeTest extends TestCase
{
    public function setUp(): void
    {
        $installer = new ImmediateDomainEventDispatcherInstaller(new EventDispatcher);
        $installer->install();

    }

    // ...
}
```

In integration tests where you have access to the service container, but the
tests don't involve `EntityManager` or `ManagerRegistry`, you can pull the
installer from the container to install the immediate dispatcher:

```php
use Rekalogika\DomainEvent\ImmediateDomainEventDispatcherInstaller;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class SomeTest extends KernelTestCase
{
    public function setUp(): void
    {
        self::bootKernel();
        static::getContainer()
          ->get(ImmediateDomainEventDispatcherInstaller::class)->install();
    }

    // ...
}
```