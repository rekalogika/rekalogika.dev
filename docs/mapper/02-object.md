---
title: Mapping Object to Object
---

Mapping an object to another object is the most common task done by a mapper.
Internally, this task is done by `ObjectToObjectTransformer`.

## How It Works

The mapper identifies properties that have the same name on the source and the
target side. It looks at public properties, public getters & setters, and
constructor arguments. It then transforms each source value to the target type,
and either sets the target property or adds it to the constructor arguments.

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