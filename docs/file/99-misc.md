---
title: Miscellaneous
---

Random stuff that doesn't fit anywhere else.

## Traits

### EqualityTrait

Provides `isEqualTo()` and `isSameFilesystem()` methods to help creating the
implementations of the `FilePointerInterface` and `FileInterface` interfaces.

### FileDecoratorTrait

Aids the creation of a decorator class for `FileInterface`. It is recommended to
use this trait instead of doing it manually.

## Classes

### FileProxy

A lazy-loading proxy class for `FileInterface` that can be used to delay the
instantiation of the actual `FileInterface` object, and save a round-trip to the
storage backend if the file is not needed.
