---
title: Introduction
---

Pragmatic, opinionated enhancements to Doctrine's Collections library.

## Components

* Decorator classes that enhances any Doctrine Collections classes.
* Query-backed collections. Turns a `QueryBuilder` into a lazy-loading
  collection.
* An alternative implementation of the repository pattern that implements
  `Collection`.
* Modifications to `ArrayCollection` that does `matching()` against the private
  properties directly, to reproduce the same behavior of `PersistentCollection`.

## Features

* Notifies you about potential future out-of-memory situations. And throws an
  exception before it hits harder-to-debug out-of-memory situation.
* Plugable counting strategies. Work around long counting times using your own
  counting strategies.
* Full versions of the collection classes that have all the feature. And the
  minimal flavors that only expose the safe methods.
* Built in keyset pagination using `rekalogika/rekapager` library. Iterate over
  large collections without loading them all into memory. And without having to
  create ad-hoc queries.
* Keyset pagination can also be used to create pagination in user interfaces and
  API outputs.
* Encourages you to create expressive, higher-level methods to provide the same
  functionality as the `Selectable` interface, but without exposing the inner
  workings of the class.

## License

MIT

## Contributing

Issues and pull requests should be filed in the GitHub repository
[rekalogika/collections](https://github.com/rekalogika/collections).