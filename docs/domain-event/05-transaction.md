---
title: Transactions
---

The framework supports transaction with the following semantics.

* Immediate events are dispatched immediately as usual.
* Pre-flush events will be dispatched before every `flush()` regardless of the
  transaction status.
* Post-flush events will be dispatched after the outermost `commit()`.
* `rollback()` does not dispatch any events, and will clear the event queue.

:::warning

`rollback()` currently clears all the events from the queue regardless of the
transaction depth, and regardless where the events came from. You should not
rely on this behavior.

:::