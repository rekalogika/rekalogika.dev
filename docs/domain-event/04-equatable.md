---
title: Equatable Domain Events
---

A domain event can optionally implement `EquatableDomainEventInterface` which
requires the method `getSignature()`. Two objects with the same signature will
be considered identical and won't be dispatched twice.

This is useful if your entity is working with a million of related objects. By
implementing `EquatableDomainEventInterface`, you can have your `ObjectChanged`
event dispatched only once and occupy only a single spot in the memory,
instead of a million times.

```php
use Rekalogika\Contracts\DomainEvent\EquatableDomainEventInterface;

class PostCommentAdded implements EquatableDomainEventInterface
{
    public function __construct(private string $postId)
    {
    }

    public function getSignature(): string
    {
        return sha1(serialize($this));
    }
}

use Rekalogika\Contracts\DomainEvent\DomainEventEmitterInterface;
use Rekalogika\Contracts\DomainEvent\DomainEventEmitterTrait;

class Post implements DomainEventEmitterInterface
{
    use DomainEventEmitterTrait;

    // ...

    public function addComment(string $comment): Comment
    {
        // ...

        // the PostCommentAdded event will only get dispatched once despite of
        // addComment being called multiple times.
        $this->recordEvent(new PostCommentAdded($this->id));
    }
}
```

:::note

Equatable domain events only apply to pre-flush and post-flush events. Immediate
domain events are dispatched immediately, and there is no chance for the
equatable check to take place.

:::

