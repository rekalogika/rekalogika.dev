---
title: Dispatch Events
---

When a domain event is dispatched, another event is dispatched. The event wraps
the original domain event, allowing you to listen to all domain events in a
single listener.

These events are dispatched using the default Symfony event dispatcher.

## List of the Dispatch Events

* `DomainEventImmediateDispatchEvent`: dispatched immediately after the domain
  event is recorded.
* `DomainEventPreFlushDispatchEvent`: dispatched before the `flush()` is called.
* `DomainEventPostFlushDispatchEvent`: dispatched after the `flush()` is called.

## Listening to the Dispatch Events

```php
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener]
class PreFlushDispatchEventListener
{
    public function __invoke(DomainEventPreFlushDispatchEvent $event) {
        // log the $event, publish the $event on an event bus, etc
    }
}
```

## Purpose

This mechanism is created to allow you to build on top of the domain events. For
example, you can record the events for audit trails, or publish the events on an
event bus.