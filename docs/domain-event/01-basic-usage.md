---
title: Basic Usage
---

## Creating Domain Events

Domain events are plain old PHP objects that you create to represent a specific
event happening in your domain. There is no particular requirement for these
classes.

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

When an entity records the event, the event will be dispatched three times:
immediately when it is recorded (immediate strategy), before the `flush()` is
called (pre-flush strategy), and after the `flush()` is called (post-flush
strategy).

To listen to the events, you can use the usual Symfony way of listening to
events. In the following example, the event listener will be invoked after you
call `flush()`.

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
        // this will be executed immediately after the entity records the event
    }

    #[AsPreFlushDomainEventListener]
    public function preFlush(PostCreated $event) {
        // this will be executed when you flush() the new post. before the actual
        // flush()
    }

    #[AsPostFlushDomainEventListener]
    public function postFlush(PostCreated $event) {
        // this will be executed when you flush() the new post. after the actual
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

## Dispatching the Events

With pre and post-flush strategy, the actual dispatching of the events is done
when you call `flush()` on the entity manager. It will do the following in
order:

* Collects the events from the entities, and adds them to the pre-flush and
  post-flush queue. Then it dispatches the events in the pre-flush queue.
* Calls the actual `flush()`.
* Dispatches post-flush events in the queue.

The pre-flush events might generate additional events, in which case they will
also be dispatched in the pre-flush phase. It does that until there are no more
events to dispatch.

:::note

There is a safeguard in place to prevent infinite loops. If the pre-flush events
keep generating more pre-flush events, it will throw a
`SafeguardTriggeredException` after 100 iterations.

:::