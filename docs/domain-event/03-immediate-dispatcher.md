---
title: Immediate Dispatcher Handling & Troubleshooting
---

### Immediate Dispatcher in Unit Tests

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

