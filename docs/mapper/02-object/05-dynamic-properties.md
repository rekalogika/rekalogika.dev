---
title: Dynamic Properties & Property Overloading
---

Dynamic properties are properties that are not explicitly declared in the class
definition. Before PHP 8.2, all classes have dynamic properties. After PHP 8.2,
only classes extending `stdClass` and those marked with
`#[AllowDynamicProperties]` have dynamic properties.

## Mapper Semantic for Dynamic Properties

Mapper supports classes with `#[AllowDynamicProperties]`, including `stdClass`
and all classes that extends `stdClass`, with the following semantics.

If the target is `stdClass` (or an object with `#[AllowDynamicProperties]`),
then all properties of the source will be mapped to the target. If the target
has explicit properties, then they will be respected as usual.

If the source is a `stdClass` (or an object with `#[AllowDynamicProperties]`)
and the target is a regular object, then the mapping will take place for each
property of the target that has a matching property on the source side.

If the source is a `stdClass` (or an object with `#[AllowDynamicProperties]`)
and an argument of the target constructor is mandatory, then Mapper will assume
the source value is null.

## Classes With Overloading, or `__get()` and `__set()` Methods

Classes that use overloading, or have `__get()` and `__set()` methods generally
work the same way with Mapper as classes with dynamic properties as above.

You can throw `BadMethodCallException` in your `__get()` and `__set()` methods
if you want to indicate that the property being accessed does not exist.