---
title: Object ID Resolver
---

An object ID resolver takes an object and returns its ID. The framework uses an
object ID resolver as one of the parameters used to determine where to store the
file.

There are two built-in ID resolvers in the framework:

* `DoctrineObjectIdResolver`: Uses Doctrine's `ClassMetadata` and `UnitOfWork`
  to determine the ID of the entity.
* `DefaultObjectIdResolver`: Calls the method `getId()` on the object.

:::tip Protip

You can have multiple implementations of `ObjectIdResolverInterface` in your
application. The framework will use the first one that returns a value.

:::

:::info

If you have a custom implementation of `ObjectIdResolverInterface`, the default
resolvers are still active but have a lower priority than your custom
implementation.

:::

## Creating An Object ID Resolver

```php
use Rekalogika\Contracts\File\Association\ObjectIdResolverInterface;

class MyObjectIdResolver implements ObjectIdResolverInterface
{
    public function getObjectId(object $object): string
    {
        // your implementation here
    }
}
```

If you are using autoconfiguration, then it is all set. If not, you need to
register your class in the service container:

```yaml title=config/services.yaml
services:
    App\MyObjectIdResolver:
        tags:
            - { name: 'rekalogika.file.association.object_id_resolver' }
```