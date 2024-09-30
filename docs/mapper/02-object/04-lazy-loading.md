---
title: Lazy Loading
---

Mapper will attempt to create a lazy-loading proxy for the target object, and
use it in place of the real object. The benefit is that the target object will
not be hydrated until it is actually used.

If the source object is a Doctrine entity, the mapping will not trigger the
hydration of the source; even accessing ID properties on the target will also
not trigger the hydration. Only after accessing other properties of the target
will the hydration take place.

:::warning

If the target is `final`, then lazy-loading will not be possible. There are also
other cases that can prevent a lazy-loading proxy from being created. To see if
a proxy is being used, or the reason why it is not, you can see that in the
Mapper panel in the Symfony profiler.

:::

## Mapping to Doctrine Entities

Doctrine reads properties using `Reflection` directly, and therefore will not
trigger the hydration of our proxy objects. To prevent problems while working
with Doctrine entities, Mapper will prevent proxy creation if the target is a
Doctrine entity.

## API Platform

With API Platform, if you are using DTOs as `ApiResource`, then API Platform
should be able to generate IRIs without causing the hydration of the source (if
the source is a Doctrine entity). The only thing you need to do is to ensure
the source (a Doctrine entity) and the target (an `ApiResource` DTO) both use
the same identifier property name. Or better: just use `id` as the identifier
everywhere, and be done with it.

Without lazy-loading, API Platform will hydrate everything in the object graph,
even when it only needs to generate an IRI.

:::info Shameless Plug

Read the documentation of [api-lite](/api-lite) to know more about how we
utilize Mapper with API Platform.

:::

## Eager Properties

During the mapping, Mapper will try to identify the identifier properties on the
source side. First, it looks for the information in Doctrine's class metadata.
If not found, it will use `id`, `uuid`, or `identifier` if any of those exists
on the source side.

These identifier properties will not be lazy, and will be mapped immediately
after the instantiation of the target proxy object. This should not cause the
hydration of the source side because a Doctrine proxy already hold the
identifier, even when uninitialized.

If your application needs to have a custom logic for determining the identifier
fields, you can create a service implementing
`EagerPropertiesResolverInterface`.

:::info

If an identifier property maps to a constructor argument on the target side,
then everything in the constructor will be mapped eagerly.

:::

## Disabling Lazy-Loading

There should be no downside to using a lazy-loading proxy in place of the real
object. In most cases, they should be interchangeable. However, a proxy incurs a
small overhead, and you may wish to disable it in some cases, for example if you
are using the Mapper in a batch process.

### Using `MapperOptions`

If you want to disable lazy-loading for a mapping run, you can set the option
`enableLazyLoading` to false in the `MapperOptions` object, and add it to the
context:

```php
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Context\MapperOptions;

$options = new MapperOptions(lazyLoading: false);
$context = Context::create($options);

$target = $this->mapper->map($source, TargetDto::class, $context);
```

### Using `Eager` Attribute

To disable proxy creation for a specific class, add the `#[Eager]` attribute to
the target class:

```php
use Rekalogika\Mapper\Attribute\Eager;

#[Eager]
class TargetDto
{
    // ...
}
```

### Other Ways of Disabling Lazy-Loading

* Currently, if the target is `final`, then it will not use a proxy. But in
  future versions of PHP, final objects might be finally allowed to be proxied.
* You can instantiate manually, and pass the object as the mapper's target.
* You can decorate `ProxyGeneratorInterface`, and throw
  `ProxyNotSupportedException` if it asks for your specific class. Read
  `DoctrineProxyGenerator` for an example.