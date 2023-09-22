---
title: Basic Usage
---

## Creating Domain Events

Domain events are plain old PHP objects that you create to represent a specific
event happening in your domain.

```php
// our event superclass for the Post object

abstract class AbstractPostEvent
{
    public function __construct(private string $id)
    {
    }

    public function getId(): string
    {
        return $this->id;
    }
}

// our concrete events

final class PostCreated extends AbstractPostEvent
{
}

final class PostChanged extends AbstractPostEvent
{
}

final class PostRemoved extends AbstractPostEvent
{
}
```

## Recording Events

Your emitters (entities) must implement `DomainEventEmitterInterface`.
There is a `DomainEventEmitterTrait` to help you with that. To record events,
you can use the method `recordEvents()` defined in the trait.

```php
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Rekalogika\Contracts\DomainEvent\DomainEventEmitterInterface;
use Rekalogika\Contracts\DomainEvent\DomainEventEmitterTrait;
use Symfony\Component\Uid\UuidV7;

class Post implements DomainEventEmitterInterface
{
    use DomainEventEmitterTrait;

    private string $id;
    private string $title;
    /** @var Collection<int,Comment> */
    private Collection $comments;

    public function __construct(string $title)
    {
        $this->id = new UuidV7();
        $this->title = $title;
        $this->comments = new ArrayCollection();

        // highlight-next-line
        $this->recordEvent(new PostCreated($this->id));
    }

    // __remove() is our special method that gets triggered when the entity is
    // going to be removed from the persistence layer
    public function __remove()
    {
        // highlight-next-line
        $this->recordEvent(new PostRemoved($this->id));
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;

        // highlight-next-line
        $this->recordEvent(new PostChanged($this->id));
    }
}
```

## Listening to Events

To listen to the events, you can use the usual Symfony way of listening to
events. The framework will collect events from persisted entities, and dispatch
them at the end of the `flush()`.

```php
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener]
class PostEventListener
{
    // this method will be invoked after a new Post is persist()-ed & flush()-ed
    public function __invoke(PostCreated $event) {
        $postId = $event->getId();
        // ...
    }
}
```

Alternatively, you can use different attributes to choose a different
dispatching strategy.

```php
use Rekalogika\Contracts\DomainEvent\Attribute\AsImmediateDomainEventListener;
use Rekalogika\Contracts\DomainEvent\Attribute\AsPostFlushDomainEventListener;
use Rekalogika\Contracts\DomainEvent\Attribute\AsPreFlushDomainEventListener;

class PostEventListener
{
    #[AsImmediateDomainEventListener]
    public function immediate(PostCreated $event) {
        // this will run immediately after the entity records the event
    }

    #[AsPreFlushDomainEventListener]
    public function preFlush(PostCreated $event) {
        // this will run when you flush() the new post. before the actual
        // flush()
    }

    #[AsPostFlushDomainEventListener]
    public function postFlush(PostCreated $event) {
        // this will run when you flush() the new post. after the actual
        // flush()
    }
}
```

:::note

* `AsEventListener` and `AsPostFlushDomainEventListener` currently have
  identical behavior, but they utilize different event dispatchers. We plan to
  have a different event dispatcher behavior with
  `AsPostFlushDomainEventListener` while keeping `AsEventListener` standard.
* Doing a `flush()` inside a pre-flush listener is not allowed and will result
  in a `FlushNotAllowedException`.

:::

## Equatable Domain Events

A domain event can optionally implement `EquatableDomainEventInterface` which
requires the method `getSignature()`. Two objects with the same signature will
be considered identical by `DomainEventManager` and won't be dispatched twice.

This is useful if your entity is working with a million of related objects. By
implementing `EquatableDomainEventInterface`, you can have your `ObjectChanged`
event dispatched only once, and occupies only a single spot in the memory,
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

Equatable domain events only applies to pre-flush and post-flush events.
Immediate domain events are dispatched immediately, and there is no chance for
the equatable check to take place.

:::
