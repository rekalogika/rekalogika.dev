---
title: Interfaces
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

Interfaces implemented by classes in this package.

## `Recollection`

This package improves Doctrine Collections by extending the `Collection`
interface with additional methods. We call this new interface `Recollection`.

<ThemedImage
  alt="File classes"
  sources={{
    light: useBaseUrl('/diagrams/light/collections-recollection.svg'),
    dark: useBaseUrl('/diagrams/dark/collections-recollection.svg'),
  }}
  width="100%"
/>

In Doctrine `Collection`, the following methods accept `int|string` as the argument. In
`Recollection`, they are overriden, and these arguments are widen to `mixed`:

* `containsKey($key)`
* `get($key)`
* `remove($key)`
* `set($key, $value)`

By the widening, it can now accept UUID objects as the key. Decorators will
automatically transform the UUID to the format expected by the underlying
`Collection`. Also, by accepting `mixed`, the caller does not need to perform
type checking, avoiding a lot of boilerplate code.

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
corresponding minimal version, run static analysis, and deal with the parts of
your code that still call non-safe methods.

<ThemedImage
  alt="File classes"
  sources={{
    light: useBaseUrl('/diagrams/light/collections-minimal-recollection.svg'),
    dark: useBaseUrl('/diagrams/dark/collections-minimal-recollection.svg'),
  }}
  width="100%"
/>

:::warning

This interface will be updated if Doctrine adds new safe methods in the future.
Currently, the glaring omissions are the `remove` and `removeElement` methods.
We expect them to be added to Doctrine ORM sooner or later.

:::

## `PageableRecollection`

An extra-minimal version of `Recollection` that only extends `PageableInterface`.

<ThemedImage
  alt="File classes"
  sources={{
    light: useBaseUrl('/diagrams/light/collections-pageable-recollection.svg'),
    dark: useBaseUrl('/diagrams/dark/collections-pageable-recollection.svg'),
  }}
  width="100%"
/>

## `Repository`

An alternative implementation of the repository pattern using the `Recollection`
interface. You can treat the repository like a regular collection.

<ThemedImage
  alt="File classes"
  sources={{
    light: useBaseUrl('/diagrams/light/collections-repository.svg'),
    dark: useBaseUrl('/diagrams/dark/collections-repository.svg'),
  }}
  width="100%"
/>

It adds one new method:

* `reference($key)`: Creates a reference, or a proxy object, to the object
  identified by the given key. This method has the same function as the
  `EntityManagerInterface::getReference()` method.

## `MinimalRepository`

The minimal flavor of `Repository` above.

<ThemedImage
  alt="File classes"
  sources={{
    light: useBaseUrl('/diagrams/light/collections-minimal-repository.svg'),
    dark: useBaseUrl('/diagrams/dark/collections-minimal-repository.svg'),
  }}
  width="100%"
/>

It adds these new methods:

* `reference($key)`: Creates a reference, or a proxy object, to the object
  identified by the given key. This method has the same function as the
  `EntityManagerInterface::getReference()` method.
* `remove($key)`: Removes the object identified by the given key.
* `removeElement($element)`: Removes the given element from the repository.