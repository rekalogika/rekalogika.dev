---
title: Interfaces
---

Interfaces provided by this package.

## `Recollection`

This package enhances Doctrine Collections by extending the `Collection`
interface with additional methods. We call this new interface `Recollection`.

![Recollection classes](./diagrams/recollection.light.svg#light)
![Recollection classes](./diagrams/recollection.dark.svg#dark)

In Doctrine `Collection`, the following methods accept `int|string` as the
argument. In `Recollection`, they are overridden, and these arguments are
widened to `mixed`:

* `containsKey($key)`
* `get($key)`
* `remove($key)`
* `set($key, $value)`

The widening can remove some boilerplate code because the caller no longer
needs to perform type checking and conversion. It will be done by our classes
instead.

`Recollection` adds these new methods:

* `fetch($key)`: Similar to `get($key)`, but throws an exception if the object
  is not found. If uncaught in a web application, this exception will
  automatically be converted to a 404 response, which will further avoid
  boilerplate code.
* `refreshCount()`: Recalculates the count of the collection. The exact behavior
  depends on the provided counting strategy.

It also extends `PageableInterface` which enables pagination support.

## `MinimalRecollection`

A minimal version of `Recollection` that does not extend Doctrine `Collection`
but retains its safe methods with compatible signature. These are the methods
that should never trigger full initialization of an extra-lazy `Collection`.

The idea is that if a collection becomes too large, you can simply switch to the
corresponding minimal version, run static analysis, and refactor the parts of
your code that still call non-safe methods.

![MinimalRecollection classes](./diagrams/minimal-recollection.light.svg#light)
![MinimalRecollection classes](./diagrams/minimal-recollection.dark.svg#dark)

:::warning

This interface will be updated if Doctrine adds new safe methods in the future.
Currently, the glaring omissions are the `remove` and `removeElement` methods.
We expect them to be added to Doctrine ORM eventually.

:::

## `PageableRecollection`

An extra-minimal version of `Recollection` that only extends `PageableInterface`.

![PageableRecollection classes](./diagrams/pageable-recollection.light.svg#light)
![PageableRecollection classes](./diagrams/pageable-recollection.dark.svg#dark)

## `Repository`

An alternative implementation of the repository pattern using the `Recollection`
interface. You can treat the repository like a regular collection.

![Repository classes](./diagrams/repository.light.svg#light)
![Repository classes](./diagrams/repository.dark.svg#dark)

It adds one new method:

* `reference($key)`: Creates a reference, or a proxy object, to the object
  identified by the given key. This method has the same function as the
  `EntityManagerInterface::getReference()` method.

## `MinimalRepository`

The minimal flavor of `Repository` above.

![MinimalRepository classes](./diagrams/minimal-repository.light.svg#light)
![MinimalRepository classes](./diagrams/minimal-repository.dark.svg#dark)

It adds these new methods:

* `reference($key)`: Creates a reference, or a proxy object, to the object
  identified by the given key. This method has the same function as the
  `EntityManagerInterface::getReference()` method.
* `remove($key)`: Removes the object identified by the given key.
* `removeElement($element)`: Removes the given element from the repository.