---
title: Transactional Outbox Pattern
---

The package `rekalogika/domain-event-outbox` implements the transactional outbox
pattern. It publishes the events as part of a database transaction by saving
them to the outbox table. This mechanism guarantees integrity and delivery.

## How It Works

During the same time as the pre-flush phase, for each of the domain events, the
framework wraps the event in a Symfony Messenger `Envelope`, and then in an
`OutboxMessage` object. Then, it calls the entity manager to persist the
`OutboxMessage` object.

When `flush()` or `commit()` is finally called, Doctrine will save the
`OutboxMessage` objects in the same transaction as the rest of the changes to
the domain entities. This guarantees that the events are published only if the
transaction is successful.

Then the message relay is executed. It reads the outbox table, publishes the
events to the event bus, and removes the events from the outbox table.

## Comparison with the Post-Flush Strategy

With the post-flush strategy, if an error happens during the dispatching, then
the event will be lost.

In contrast, the transactional outbox pattern guarantees that the event will be
delivered. If an error happens, both the events and the entire changes to the
domain model will not be committed to the database. Because all the other
changes are rolled back, the discarded events would have been invalid anyway,
and should not be delivered.

## Message Relay

Message relay's job is to read the outbox table, publish the events to the event
bus, and remove the events from the outbox table. The message relay is executed
using the following mechanisms:

* Using the `kernel.terminate` and `console.terminate` events, a listener checks
  if there are new messages sent to the outbox in the current session. If there
  are, it tells the message relay to run using Symfony Messenger bus.
* Using Symfony Scheduler, the message relay is executed every hour.
* Manually, using the console command `bin/console rekalogika:domain-event:relay`.

## Message Preparer

When the domain events are being saved to the outbox table, the message preparer
services are executed to prepare the events. By default, it adds the
`UserIdentifierStamp` to the envelope. You can add your own message preparer by
implementing the `MessagePreparerInterface` (tag name:
`rekalogika.domain_event.outbox.message_preparer`)