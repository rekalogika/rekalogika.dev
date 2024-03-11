---
title: Tips
---

This chapter explains the tips and our best practices that others might find
useful, but not strictly required.

## Use UUIDs as Identifiers

Use UUIDs as entity identifiers & have the entities generate one for themselves
on instantiation. That means new entities already have an ID before `flush()`.

```php
use Symfony\Component\Uid\UuidV7;

class Post
{
    private string $id;

    public function __construct(string $title)
    {
        $this->id = new UuidV7();
    }

    // ...
}
```

This way, you can reliably store the ID in your event objects, instead of the
object itself. Using the ID in the events means your events can be reliably
serialized. It improves logistics because you can pass them anywhere without
modification, and without creating additional event objects.

## Persist Early after Entity Creation

On entity creation, `persist()` your entities early, and `flush()` late. This is
especially important if you are using the immediate listening strategy. It will
let your listener obtain the entity instance by calling `find()` on the
repository using the entity's identifier.

```php
$post = new Post();
$entityManager->persist($post);

$post->setContent('Hello, World!');

$entityManager->flush();
```

## Choosing Dispatching Strategy

If you want to do something similar to what you are used to doing with
application events, you probably want the post-flush strategy. If you are
already using Symfony Messenger, consider using the event bus strategy instead
for more reliability.

Use pre-flush events to make alterations to your domain that will be
`flush()`-ed together along with the other changes.

## No Event Inheritance, Yet

Symfony Event Dispatcher does not currently support event inheritance. This
needs to be mentioned because many programmers expect an event dispatcher to
support event inheritance, especially when working with a large amount of event
objects.

This is not ideal, and we want this feature in the future. But for now, this is
a limitation that you need to be aware of.

## Idempotent Event Bus Listeners

[Idempotence](https://en.wikipedia.org/wiki/Idempotence) is a desirable trait in
event bus messaging. This means if a listener receives the same event multiple
times, it should have the same effect as if it received the event only once.

With an event bus, a system failure might cause the same event to be dispatched
more than once. An idempotent listener won't cause any harm when that happens.

In simpler cases, you can leverage `EquatableDomainEventInterface`. If your
event implements `EquatableDomainEventInterface`, your listener can get the
event's signature and store it somewhere. If the event is dispatched again, the
listener can check if it has already processed the event.