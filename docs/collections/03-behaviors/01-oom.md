---
title: Potential Out-of-Memory Handling
---

## Problem

Doctrine ORM offers [extra lazy
collections](https://www.doctrine-project.org/projects/doctrine-orm/en/current/tutorials/extra-lazy-associations.html)
to handle large sets of data. However, only a few methods are extra-lazy-safe.
These safe methods will not trigger the full initialization of the collection,
and won't cause out-of-memory errors:

* `contains($entity)`
* `containsKey($key)` (only if `indexBy` is set)
* `count()`
* `get($key)` (only if `indexBy` is set)
* `slice($offset, $length = null)`
* `add($entity)`
* `offsetSet($key, $entity)` (only if `$key` is null)
* `offsetExists($key)` (only if `indexBy` is set)
* `offsetGet($key)` (only if `indexBy` is set)
* `matching($criteria)`

If a non-safe method is called, Doctrine will still load the entire collection
into memory, potentially causing out-of-memory errors. These errors can be very
difficult to debug. It is hard to catch in CI. And it often get triggered in
seemingly unrelated parts of the application.

And it can be all too easy to call the non-safe methods by accident, giving us
elusive errors that occur only in production, and never in development
environment.

## Solution

Our classes will pass the safe methods to the underlying collection unchanged.
But if a non-safe method is called, rather than loading the entire set, it adds
a `LIMIT` clause to the query. If the number of results exceeds 500, it gives a
deprecation warning. If it exceeds 2000, the classes will throw an exception.

This behavior applies to the following classes:

* `RecollectionDecorator`
* `CriteriaRecollection`
* `AbstractRepository`
* `QueryRecollection`

The thresholds can be changed by specifying the options `$softLimit` or
`$hardLimit` in the constructor of the classes that have this behavior.

The default threshold can be changed by setting static properties
`$defaultSoftLimit` and `$defaultHardLimit` in the `Configuration` class.

## What to Do After the Threshold is Reached

If you see the warning or exception, it means your code is loading too many
entities at once, and you need to use a different approach to the problem.

To start, you can change your code to use the minimal flavor instead:

* Change `RecollectionDecorator` to `MinimalRecollectionDecorator`
* Change `CriteriaRecollection` to `MinimalCriteriaRecollection`
* Change `AbstractRepository` to `AbstractMinimalRepository`
* Change `QueryRecollection` to `QueryPageable`

These minimal flavors should never trigger full load of the collection.

Then you can run a static analysis tool to find all the places that still call
the non-safe methods. You can then refactor the code to use a different
approach.