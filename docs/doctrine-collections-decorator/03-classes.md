---
title: Decorator Classes and Traits
---

This chapter will describe all the available classes and traits in this package.

## Decorator Classes

All of our classes come in four flavors:

* Those that implement `Collection`
* Those that implement `ReadableCollection`
* Those that implement `Collection` and `Selectable`
* Those that implement `ReadableCollection` and `Selectable`

Most people probably want to extend one of the high-level decorator classes.
These will simply forward all method calls to the wrapped collection.

* `CollectionDecorator`
* `ReadableCollectionDecorator`
* `SelectableCollectionDecorator`
* `SelectableReadableCollectionDecorator`

Also available the 'reject' decorator classes, which will throw an exception
when any of the methods is called:

* `CollectionRejectDecorator`
* `ReadableCollectionRejectDecorator`
* `SelectableCollectionRejectDecorator`
* `SelectableReadableCollectionRejectDecorator`

## Abstract Decorator Classes

Also available are abstract classes for `Collection` and `ReadableCollection`,
with and without `Selectable`, if you prefer a slightly low-level approach:

* `AbstractCollectionDecorator`
* `AbstractReadableCollectionDecorator`
* `AbstractSelectableCollectionDecorator`
* `AbstractSelectableReadableCollectionDecorator`

And the 'reject' flavors:

* `AbstractCollectionRejectDecorator`
* `AbstractReadableCollectionRejectDecorator`
* `AbstractSelectableCollectionRejectDecorator`
* `AbstractSelectableReadableCollectionRejectDecorator`

## Decorator Traits

There are traits for each of the involved interfaces:

* `ArrayAccessDecoratorTrait`
* `IteratorAggregateDecoratorTrait`
* `CountableDecoratorTrait`
* `ReadableCollectionDecoratorTrait`
* `CollectionDecoratorTrait` 
* `SelectableDecoratorTrait`

And the 'reject' traits that will throw `BadMethodCallException` when any of the
methods is called.

* `ArrayAccessRejectDecoratorTrait`
* `IteratorAggregateRejectDecoratorTrait`
* `CountableRejectDecoratorTrait`
* `ReadableCollectionRejectDecoratorTrait`
* `CollectionRejectDecoratorTrait`
* `SelectableRejectDecoratorTrait`

All traits require the method `getWrapped()` which returns the wrapped
collection.

## Convenience Trait

There is one convenience trait `ArrayAccessDecoratorDxTrait` which forwards
`ArrayAccess` methods not to the wrapped collection, but to other methods of the
decorator.

The idea is that you only need to override `containsKey()`, `get()`, `set()`,
and `remove()`; and the methods `offsetExists()`, `offsetGet()`, `offsetSet()`,
and `offsetUnset()` will forward calls to the aforementioned methods.
