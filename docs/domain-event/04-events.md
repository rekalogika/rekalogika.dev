---
title: Dispatch Events
---

When a domain event is dispatched, another event is dispatched. The event wraps
the original domain event, allowing you to listen to all domain events in a
single listener.

These events are dispatched using the default Symfony event dispatcher.

List of the dispatch events:

* `DomainEventImmediateDispatch`: dispatched immediately after the domain event
  is recorded.
* `DomainEventPreFlushDispatch`: dispatched before the `flush()` is called.
* `DomainEventPostFlushDispatch`: dispatched after the `flush()` is called.

This mechanism is created to allow you to build on top of the domain events. For
example, you can record the events for audit trails, or publish the events on an
event bus.