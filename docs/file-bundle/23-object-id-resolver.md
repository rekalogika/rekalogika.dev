---
title: Object ID Resolver
---

An object ID resolver takes an object and returns its ID. The framework uses an
object ID resolver as one of the parameters used to determine where to store the
file.

The default object ID resolver assumes that the ID of your entity is returned by
the method `getId()`. If your entity uses a different mechanism, you need to
create your own implementation of `ObjectIdResolverInterface`.

:::tip Protip

You can have multiple implementations of `ObjectIdResolverInterface` in your
application. The framework will use the first one that returns a value.

:::

:::info

If you have a custom implementation of `ObjectIdResolverInterface`, the default
implementation is still active but has a lower priority than your custom
implementation.

:::

## If Your Entity Simply Uses a Different Method

If your entity simply uses a different method name, you can reuse the default
implementation of `ObjectIdResolverInterface`:

```yaml title=config/services.yaml
services:
    app.object_id_resolver:
        class: 'Rekalogika\File\Association\ObjectIdResolver\DefaultObjectIdResolver'
        args:
            - 'getIdentifier' # put the method name here
        tags:
            - { name: 'rekalogika.file.association.object_id_resolver' }
```

:::note

`DefaultObjectIdResolver` can handle return types of `string`, `int`, and
`Stringable`.

:::

## If It Is More Complicated Than That

Then you need to create your own implementation of `ObjectIdResolverInterface`.

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