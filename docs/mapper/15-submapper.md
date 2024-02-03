---
title: SubMapper
---

SubMapper is a highly simplified mapper used in places where you might need to
delegate the mapping of another object to the main mapper. It is designed so
that you don't have to deal with the complexity of managing types.

In SubMapper, passing the `Context` is optional. SubMapper automatically passes
the `Context` from the caller if you don't specifically do it.

## `map()` Method

The `map()` method maps an object to the class or object you specified.

```php
use Rekalogika\Mapper\SubMapper\SubMapperInterface;

/** @var SubMapperInterface $mapper */

// using class-string as the target type
$postDto = $mapper->map($source, PostDto::class);

// the target can also be an existing object
$postDto = new PostDto();
$mapper->map($source, $postDto);
```

## `mapForProperty()` Method

With the `mapForProperty()`, you specify the property name of the variable that
will contain the result of the mapping. SubMapper will detect the type of the
object or class in `$containing` and use it as the target type for the mapping.

This is useful if the property is an array or an array-like object, as PHP
doesn't have generics and it is not simple to specify the type of the array
elements.

```php
use Rekalogika\Mapper\SubMapper\SubMapperInterface;

/** @var SubMapperInterface $mapper */

$result = $mapper->mapForProperty($source, $containing, $propertyName);
```

`$containing` can be a class string or an existing object. If it is an
existing object, SubMapper will attempt to retrieve the current object from the
property and map the source to it.