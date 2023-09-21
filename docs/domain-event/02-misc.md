---
title: Miscellaneous
---

## Best Practices

This explains our best practices that others might find useful, but not strictly
required.

Use UUIDs as identifiers & have the entities generate one for themselves on
instantiation. That means new entities already have an ID before `flush()` and
you can store just the ID in our domain event objects, not the entire object. It
will make the event usable in all cases. It will also result in better logistics
as you can easily pass the events anywhere without alteration.

Use pre-flush events to make alterations to your domain that will be
`flush()`-ed together along with the other changes.

Use post-flush for things that should occur only if the change is successful,
like notifications, etc.

## Caveats

* Currently only supports `EntityManager`. Support for other `ObjectManager`s
  is planned.
* It is not aware of explicit transactions yet. You should dispatch the events
  manually if you are using an explicit transaction as described above. In the
  future, we have plans to dispatch post-flush events after the outermost
  `commit()`, and dispatch pre-flush events before every `commit()`.
* It is an inconvenience that Symfony Event Dispatcher does not currently
  support event inheritance. We cannot have a single listener for an entire
  class of domain events, and for example, use it to implement the outbox
  pattern. We plan to fix this in the future.