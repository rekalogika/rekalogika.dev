---
title: Testing
---

## Undispatched Event Problem

> `Rekalogika\DomainEvent\Exception\UndispatchedEventsException`: There are
> still 1 undispatched domain events. If you disable autodispatch, you have to
> dispatch them manually or clear them.

Our entity manager checks if there are any undispatched domain events in
`__destroy()`. If there are, it throws an exception. This poses a problem in
unit tests, especially with negative tests.

To prevent the problem, in `setUp()`, save the entity manager to a property,
then in `tearDown()`, call `clearUndispatchedEvents()` on the entity manager.

```php
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Rekalogika\DomainEvent\DomainEventAwareEntityManagerInterface;

class SomeTest extends KernelTestCase
{
    protected DomainEventAwareEntityManagerInterface $entityManager;

    public function setUp(): void
    {
        parent::setUp();

        $this->entityManager = self::getContainer()->get(DomainEventAwareEntityManagerInterface::class);
    }

    public function tearDown(): void
    {
        $this->entityManager->clearUndispatchedEvents();

        parent::tearDown();
    }

    // ...
}
```

## Immediate Dispatcher in Unit Tests

> `RuntimeException`: ImmediateDomainEventDispatcher has not been initialized.

Immediate event dispatcher works by installing the event dispatcher to a static
variable. This installation happens during the kernel boot.

If the kernel is not booted, there is no opportunity to install the event
dispatcher. This usually happens only in isolated unit tests. To address the
problem, you can install a stub event dispatcher manually like this.

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

:::note

The stub dispatcher doesn't do anything. If you want to test the dispatching,
you need to get the real dispatcher from the container.

:::

:::tip

This is not necessary if your test extends `KernelTestCase` because it will boot
the kernel for you automatically.

:::