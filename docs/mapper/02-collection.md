---
title: Mapping Arrays & Array-Like Objects
---

This chapter describes how to map arrays and array-like objects.

## Basic Usage

To map between arrays or array-like objects, you need to type-hint the array
on the target side. For example:

```php
class ObjectWithArrayPropertyDto
{
    /**
     * @var ?array<int,ObjectWithScalarPropertiesDto>
     */
    public ?array $property = null;
}
```

In the above case, if the source has an array-like `$property`, the mapper will
map it to the target's `$property` array, and map the source member to the
object `ObjectWithScalarPropertiesDto`.

:::info

Without the type-hint, the mapper will copy the source objects to the target
array as-is.

:::

Supported types of the target side are:

* Normal arrays
* `ArrayAccess`
* `ArrayObject`
* Doctrine `Collection`
* Doctrine `ArrayCollection`

The source side must be an array or a `Traversable` object, i.e. anything that
you can `foreach()` over.

## Mapping to `Traversable`

You also have the option to map to a `Traversable` object. If the target
property is type-hinted with `Traversable`, the mapper will map to a `Generator`
object.

```php
class ObjectWithArrayPropertyDto
{
    /**
     * @var ?\Traversable<int,ObjectWithScalarPropertiesDto>
     */
    public ?\Traversable $property = null;
}
```

This way, you are getting lazy-loading if the source supports lazy loading (like
Doctrine `PersistentCollection`), the source will not be hydrated unless the
consumer uses the mapped property on the target side.

Furthermore, you are also getting stream mapping using `Generator`, which can
save a lot of memory if your source is large.

If the source is an array or an object that implements `Countable`, you will
also get a `Countable` target, i.e. you can `count()` or `->count()` it. In
addition, if your source is an extra-lazy Doctrine Collection, the consumer will
be able to `count()` the target without causing a full hydration of the source.