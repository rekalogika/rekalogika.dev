---
title: Key Type Widening
---

## Problem

:::warning

Previously, this feature is used to convert UUID objects to string before it is
used as a key in a `Collection`. Unfortunately, we found out afterward that
Doctrine's behavior regarding UUID keys is undefined and inconsistent. For
example, UUID primary keys is converted into 8-4-4-4-12 format with PostgreSQL,
but become binary strings with SQLite.

We retain this feature because there are other benefits to it.

:::

The keys in Doctrine `Collection` can only be `int|string`. On the other
hand, Doctrine supports objects, like UUIDs, as primary keys. Therefore, callers
need to convert objects to the expected string format before using them as keys
in a `Collection`, especially if `strict_types` is enabled.

In some cases, passing UUIDs in the wrong format will give us 500 errors because
the database doesn't like it. They should be 404 errors instead.

In some cases, the caller cannot know the type of the key, and must perform type
checking to ensure it is `int|string` before using it in a `Collection`. This
result in unnecessary boilerplate code.

## Solution

Our interfaces extends `Collection` and overrides the following methods to widen
the key type to `mixed`:

* `containsKey($key)`
* `get($key)`
* `remove($key)`
* `set($key, $value)`
* `offsetExists($key)`
* `offsetGet($key)`
* `offsetSet($key, $value)`
* `offsetUnset($key)`
 
Then, the object is converted to string and passed to the underlying
`Collection`. If it is not possible, our classes will throw an exception, which
will become a 404 error.

The above is the default behavior as defined in `DefaultKeyTransformer`. The
behavior can be changed using the argument `$keyTransformer` in any of our
classes. The default behavior can be changed by setting
`Configuration::$defaultKeyTransformer`. A new behavior can be created by
implementing the `KeyTransformer` interface.

Other than `DefaultKeyTransformer`, the library also ships with
`UuidKeyTransformer`. It ensures the input is in the correct UUID format before
passing it to the underlying `Collection`.