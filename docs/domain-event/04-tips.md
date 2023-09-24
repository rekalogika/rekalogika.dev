---
title: Tips and Best Practices
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

Therefore, you can reliably store the ID in your event objects, instead of the
object itself. Using the ID in the events means your events can be reliably
serialized, and you can pass them anywhere without alteration.

## Choosing Dispatching Strategy

If you want to do something similar to what you are used to doing with
application events, you probably want the post-flush strategy.

Use post-flush for things that should occur only if the change is successful,
like notifications, etc.

Use pre-flush events to make alterations to your domain that will be
`flush()`-ed together along with the other changes.

