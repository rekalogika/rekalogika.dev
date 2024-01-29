---
title: Mapping Between Object and Array
---

Mapper does not do the mapping of (non-array-like) objects to arrays (and vice
versa) on its own. It delegates the task to the normalizer and denormalizer
components of Symfony Serializer. Therefore, if you map an object to an array,
or the other way around, it will respect the configuration of Symfony
Serializer.

## Providing Context to Symfony Normalizer and Denormalizer

If you need to provide context to Symfony normalizer and denormalizer, you can
add `NormalizerContext` and/or `DenormalizerContext` object to the context.
This is useful for providing serialization groups, among other things.

```php
$normalizationContext = new NormalizerContext([
    'groups' => ['groupa', 'groupc'],
]);

$context = Context::create($normalizationContext);

$dto = $this->mapper->map($object, Dto::class, $context);
```

Then, if the mapper encounters the situation where it needs to transform an
object to an array, it will pass the context you provided to the Symfony
normalizer.
