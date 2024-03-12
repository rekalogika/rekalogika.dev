---
title: Transactions
---

The framework fully supports transaction, as long as the caller uses the
methods provided by the entity manager.

## Semantics

* Immediate events are dispatched immediately as usual.
* Pre-flush events will be dispatched before every `flush()` regardless of the
  transaction status.
* Post-flush events will be dispatched after the outermost `commit()`.
* `rollback()` clears the pending post-flush events collected during the
  transaction, but retains the events collected before the transaction.
* The events are collected only on `flush()`.

## Managing Transaction Using DBAL is not Supported

:::warning

Doing the transaction by hand using DBAL's `Connection` is not supported. Always
do the transaction using entity manager's methods of `beginTransaction()`,
`commit()`, `rollback()`, `transactional()` and `wrapInTransaction()`.

:::

Don't do like this snippet taken from Doctrine's documentation:

```php
// warning: don't do this
$em->getConnection()->beginTransaction(); // 👎
try {
    // ... do some work
    $user = new User;
    $user->setName('George');
    $em->persist($user);
    $em->flush();
    $em->getConnection()->commit(); // 👎
} catch (Exception $e) {
    $em->getConnection()->rollBack(); // 👎
    throw $e;
}
```

Instead, do this:

```php
// highlight-next-line
$em->beginTransaction(); // 👍
try {
    // ... do some work
    $user = new User;
    $user->setName('George');
    $em->persist($user);
    $em->flush();
    // highlight-next-line
    $em->commit(); // 👍
} catch (Exception $e) {
    // highlight-next-line
    $em->rollback(); // 👍
    throw $e;
}
```
