---
title: Class Arguments
---

Our classes accept arguments in their constructors. Different classes may or
may not accept the different arguments listed below. Most of these arguments
accept null, which means the default value.

## The Arguments

### `orderBy`

The `orderBy` argument is used to sort the collection. It accepts one of the
following values:

* `string` means the column name to sort by.
* `array<string,Order>`. The key means the column names to sort, the value is
  the order to sort by.
* `null` means use the default order by.

### `indexBy`

The `indexBy` argument is used to determine the field of the object used as the
key of the collection. It accepts string, meaning the column name to index by.
If null, the default is used. If the default is null, then the collection will
be a list.

### `itemsPerPage`

The number of items in a page when using pagination. It accepts an integer.
It can be overridden post-instantiation using `withItemsPerPage()`.

### `count`

The count strategy to use. Accepts a `CountStrategy` instance. Read more about
count strategies in the [Counting](./03-counting.md) section.

### `softLimit` and `hardLimit`

The `softLimit` and `hardLimit` arguments are used to limit the number of
results returned. The `softLimit` is the maximum number of results before the
collection will give you a deprecation warning. The `hardLimit` is the maximum
number of results before the collection will throw an exception. Read more
about limits in the [Potential Out-of-Memory Handling](./01-oom.md) section.

### `keyTransformer`

Accepts a `KeyTransformer` object used to transform the key before passing it to
the underlying `Collection`. Read more about it in the [Key Type
Widening](./05-key-type-widening.md) section.

## Changing the Default Argument Values

The default argument values can be changed by setting the static properties of
`Configuration`.

To change the default value, for example, you can do it in one of these
following places:

* In your application's kernel.
* Using `composer.json`'s `files` autoloading mechanism.
* In `index.php`.