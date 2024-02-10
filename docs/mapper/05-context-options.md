---
title: Context and Mapping Options
---

Provide context variables to the mapper to control the mapping process.

## Context

The `Context` object stores objects that are used during the mapping process.
The caller can provide a `Context` in the `map()` method. If not provided,
the mapper will create a new `Context` object internally.

`Context` stores objects using class names as keys. Therefore, only one object
of a given class can be stored in a `Context`.

```php
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\MapperInterface;

// Create a context
$context = Context::create();

// Create a context, initialized with mapper options & a custom object
$mapperOptions = new MapperOptions(lazyLoading: false);
$yourCustomObject = new YourCustomObject();
$context = Context::create($mapperOptions, $yourCustomObject);

// Call map() with the context
/** @var MapperInterface $mapper */
$target = $mapper->map($source, TargetObject::class, $context);

// Add an object to the context, note that context is immutable
$context = $context->with($someObject);

// Remove an object from the context
$context = $context->without(SomeObject::class);

// Get an object from the context
$mapperOptions = $context->get(MapperOptions::class);
// or
$mapperOptions = $context(MapperOptions::class);

// Iterates over all objects in the context
foreach ($context as $object) {
    // ...
}
```

The `Context` is available in most of the places where you write code to
customize the mapping process.

## Built-in Context Objects

The following context objects are provided by the mapper:

* `MapperOptions`: Options for the mapping process.
* `ObjectCache`: Used to store objects that have already been mapped. It is
  used to handle circular references and to prevent infinite loops.
* `Path`: Stores the mapping path. Used for tracing and creating meaningful
  error messages.
* `NormalizerContext` and `DenormalizerContext`: Used to store the context
  that will be used by Symfony Serializer.

## Mapper Options

The `MapperOptions` object is passed by the caller to provide options for the
mapping process. The following options are available:

* `lazyLoading`: Enable lazy-loading.
* `readTargetValue`: If true, the mapper will get the existing value from the
  target. If exists, it will be used as the target. If false, the mapper will
  always create a new target object.