---
title: Mapping Object to Object
---

Mapping an object to another object is the most common task done by a mapper.
Internally, this task is done by `ObjectToObjectTransformer`.

## How It Works

The mapper identifies properties that have the same name on the source and the
target side. It looks at public properties, public getters & setters, and
constructor arguments.

It gets the existing value on the target side. If it is null, then it
instantiates a new target object, populating its constructor arguments by
transforming properties of the same name from the source object.

It then transforms each source property to the target type, and sets them on the
target.

## Mapping to Abstract Classes and Interfaces

To map to an abstract class or an interface, you need to add the attribute
`InheritanceMap` to the abstract class or interface. For example:

```php
use Rekalogika\Mapper\Attribute\InheritanceMap;
use Rekalogika\Mapper\Tests\Fixtures\Inheritance\ConcreteClassA;
use Rekalogika\Mapper\Tests\Fixtures\Inheritance\ConcreteClassB;

#[InheritanceMap([
    ConcreteClassA::class => ConcreteClassADto::class,
    ConcreteClassB::class => ConcreteClassBDto::class,
    ConcreteClassB::class => ConcreteClassCDto::class,
])]
abstract class AbstractClassDto
{
}
```

In the above example, the mapper will map the source to `ConcreteClassADto` if
the source is an instance of `ConcreteClassA`, and so on.

:::note

This only applies if there is no a preexisting object on the target side.

:::

## Custom Property Mapper

If you need a custom mapping logic for a specific property, you can create a
service and add the attribute `AsPropertyMapper` to a custom method.

:::note

This is optional. You only need to use this if you need a custom logic to
populate a specific target property.

:::

Example:

```php
use Rekalogika\Mapper\PropertyMapper\AsPropertyMapper;

class UserMapper
{
    #[AsPropertyMapper(
        targetClass: UserDto::class,
        property: 'name',
    )]
    public function mapName(User $user): string
    {
        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());
    }
}
```

The above example concatenates first name and last name from the source `User`
object, transforms it to uppercase, and returns the result. Mapper will then
assign the result to the `name` property of the target `UserDto` object, as
specified in the arguments of the `AsPropertyMapper` attribute.

### Shorthand Using `AsPropertyMapper` Attached to the Class

If you have many properties to manually map, you can put the `AsPropertyMapper`
attribute on the class, and it will apply to all methods in the class. Example:

```php
use Rekalogika\Mapper\PropertyMapper\AsPropertyMapper;

#[AsPropertyMapper(targetClass: UserDto::class)]
class UserMapper
{
    #[AsPropertyMapper('name')]
    public function mapName(User $user): string
    {
        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());
    }

    #[AsPropertyMapper('birthDate')]
    public function mapBirthDate(User $user): string
    {
        return $user->getBirthDate()->format('Y-m-d');
    }

    #[AsPropertyMapper('email')]
    public function mapEmail(User $user): string
    {
        return $user->getEmailAddress();
    }
}
```

### Property Name Magic

For even more shorthand, you can omit the property name altogether, and the
mapper will use the method name, stripping the leading 'map' and lowercasing
the first letter.

```php
use Rekalogika\Mapper\PropertyMapper\AsPropertyMapper;

#[AsPropertyMapper(targetClass: UserDto::class)]
class UserMapper
{
    // maps to 'name'
    #[AsPropertyMapper]
    public function mapName(User $user): string
    {
        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());
    }

    // maps to 'birthDate'
    #[AsPropertyMapper]
    public function mapBirthDate(User $user): string
    {
        return $user->getBirthDate()->format('Y-m-d');
    }

    // maps to 'email
    #[AsPropertyMapper]
    public function mapEmail(User $user): string
    {
        return $user->getEmailAddress();
    }
}
```

### Extra Arguments

You also have the option to inject the main transformer, sub-mapper, and the
context to the property mapper. This can be in any order, but the first argument
must be the source object.

```php
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\MainTransformerInterface;
use Rekalogika\Mapper\PropertyMapper\AsPropertyMapper;
use Rekalogika\Mapper\SubMapper\SubMapperInterface;

#[AsPropertyMapper(targetClass: UserDto::class)]
class UserMapper
{
    #[AsPropertyMapper]
    public function mapName(
        User $user,
        // highlight-start
        MainTransformerInterface $mainTransformer,
        SubMapperInterface $subMapper,
        Context $context
        // highlight-end
    ): string {
        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());
    }
}
```

### Manual Wiring

If you don't use autowiring, autoconfiguration, or don't want to use attributes,
you can add the service manually like this:

```yaml title="config/services.yaml"
services:
    App\Mapper\UserMapper:
        tags:
            -
                name: 'rekalogika.mapper.property_mapper'
                method: 'mapName'
                sourceClass: 'App\Entity\User'
                targetClass: 'App\Dto\UserDto'
                property: 'name'
            -
                name: 'rekalogika.mapper.property_mapper'
                method: 'mapBirthDate'
                sourceClass: 'App\Entity\User'
                targetClass: 'App\Dto\UserDto'
                property: 'birthDate'
            -
                name: 'rekalogika.mapper.property_mapper'
                method: 'mapEmail'
                sourceClass: 'App\Entity\User'
                targetClass: 'App\Dto\UserDto'
                property: 'email'
```

### Dumping Property Mapper Table

To dump the list of all property mappers, run the following command:

```bash
$ bin/console debug:container --tag=rekalogika.mapper.property_mapper
```

## Lazy Loading

Mapper will attempt to create a lazy-loading proxy for the target object, and
use it in place of the real object. The benefit is that the target object will
not be hydrated until it is actually used.

If the source object is a Doctrine entity, the mapping will not trigger the
hydration of the source; even accessing ID properties on the target will also
not trigger the hydration. Only after accessing other properties of the target
will the hydration take place.

:::warning

If the target is `final`, then lazy-loading will not be possible. There are also
things that can prevent a lazy-loading proxy from being created. To see if a
proxy is being used, or the reason why it is not, you can see that in the Mapper
panel in the Symfony profiler.

:::

### Disabling Lazy-Loading

There should be no downside to using a lazy-loading proxy in place of the real
object, they should be interchangeable. However, a proxy incurs a small
overhead, and you may wish to disable it in some cases, for example if you are
using the Mapper in a batch process.

If you want to disable lazy-loading for a mapping run, you can set the option
`enableLazyLoading` to false in the `MapperOptions` object, and add it to the
context:

```php
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Context\MapperOptions;

$options = new MapperOptions(enableLazyLoading: false);
$context = Context::create($options);

$target = $this->mapper->map($source, ObjectWithScalarPropertiesDto::class, $context);
```

To disable lazy-loading for a specific mapping, you can make the target class
`final`.

### API Platform

With API Platform, if you are using DTOs as `ApiResource`, then API Platform
should be able to generate IRIs without causing the hydration of the source (if
the source is a Doctrine entity). The only thing you need to do is to ensure
the source (a Doctrine entity) and the target (an `ApiResource` DTO) both use
the same identifier property name.

Without lazy-loading, API Platform will hydrate everything in the object graph,
even only to generate an IRI.

### Eager Properties

During the mapping, Mapper will try to identify the identifier properties on the
source side. First, it looks for the information in Doctrine's class metadata.
If not found, it will use `id`, `uuid`, or `identifier` if any of those exists
on the source side.

These identifier properties are not lazy, and will be mapped immediately after
the instantiation of the target proxy object. This should not cause the
hydration of the source side because a Doctrine proxy already hold the
identifier, even when uninitialized.

If your application needs to have a custom logic for determining the identifier
fields, you can create a service implementing
`EagerPropertiesResolverInterface`.