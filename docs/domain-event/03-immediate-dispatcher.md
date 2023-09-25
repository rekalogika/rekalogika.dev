---
title: Immediate Dispatcher Handling & Troubleshooting
---

### Immediate Dispatcher in Unit Tests

Immediate event dispatcher works by installing the event dispatcher to a static
variable. This installation happens on several opportunities:

* In these events: `kernel.request` and `console.command`.
* During the initialization of `ManagerRegistry`.
* During the initialization of an `EntityManagerInterface`.

If none of these occurs, there is no opportunity to install the event dispatcher.
This usually happens only in isolated unit tests. To fix the problem, you can
install a stub event dispatcher manually like this.

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

In integration tests where you have access to the service container, but the
tests don't involve `EntityManager` or `ManagerRegistry`, you can manually pull
the installer from the container to install the immediate dispatcher:

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