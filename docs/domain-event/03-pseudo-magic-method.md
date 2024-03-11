---
title: Pseudo Magic Method
---

The interface `DomainEventEmitterInterface` implemented by your entities and the
corresponding `DomainEventEmitterTrait` add a pseudo magic method `__remove()`.

The `__remove()` method is called when the entity is about to be removed from
the database. You can use this method to record a 'removed' event.

```php
use Rekalogika\Contracts\DomainEvent\DomainEventEmitterInterface;
use Rekalogika\Contracts\DomainEvent\DomainEventEmitterTrait;

class Post implements DomainEventEmitterInterface
{
    use DomainEventEmitterTrait;

    // ...

    public function __remove()
    {
        $this->recordEvent(new PostRemoved($this->id));
    }
}
```

This mechanism is devised because otherwise the entity cannot possibly know if
it is being removed from the database.