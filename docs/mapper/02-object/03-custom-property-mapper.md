---
title: Custom Property Mapper
---

If you need a custom mapping logic for a specific property, you can create a
service and add the attribute `AsPropertyMapper` to a custom method.

## Basic Usage

Example:

```php
use Rekalogika\Mapper\Attribute\AsPropertyMapper;

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

## Shorthand Using `AsPropertyMapper` Attached to the Class

If you have many properties to manually map, you can put the `AsPropertyMapper`
attribute on the class, and it will apply to all methods in the class. Example:

```php
use Rekalogika\Mapper\Attribute\AsPropertyMapper;

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

## Property Name Magic

For even more shorthand, you can omit the property name altogether, and the
mapper will use the method name, stripping the leading 'map' and lowercasing
the first letter.

```php
use Rekalogika\Mapper\Attribute\AsPropertyMapper;

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

## Getting the Existing Target Value

If you need to get the existing value of the target property, you can add the
optional second argument to the method. The mapper will pass the existing value
to the method.

```php
use Rekalogika\Mapper\Attribute\AsPropertyMapper;

class UserMapper
{
    #[AsPropertyMapper(
        targetClass: User::class,
        property: 'birthDate',
    )]
    public function mapBirthDate(
        UserDto $userDto,
        // highlight-next-line
        ?\DateTimeInterface $birthDate // this will contain the current value
    ): \DateTimeInterface {
        return new \DateTimeImmutable($userDto->birthDate);
    }
}
```

:::note

If the target property contains an object, you may return the original instance
or a new instance. If you return a new instance, Mapper will replace the
original instance with the new one.

:::

## Extra Arguments

You also have the option to inject the main transformer, sub-mapper, and the
context to the property mapper. This can be in any order, but the first argument
must be the source object, followed by an optional second argument for the
existing target value.

```php
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\MainTransformerInterface;
use Rekalogika\Mapper\Attribute\AsPropertyMapper;
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

## Source Union Types

Union types on the source side are supported.

```php
use Rekalogika\Mapper\Attribute\AsPropertyMapper;

class AnimalMapper
{
    #[AsPropertyMapper(
        targetClass: AnimalDto::class,
        property: 'name',
    )]
    // highlight-next-line
    public function mapName(Cat|Dog $animal): string
    {
        return $animal->getName();
    }
}
```

## Refusing To Map

If you throw `RefuseToMapException` from the property mapper, the mapper will
skip mapping the property.

```php
use Rekalogika\Mapper\Attribute\AsPropertyMapper;
use Rekalogika\Mapper\Exception\RefuseToMapException;

class UserMapper
{
    #[AsPropertyMapper(
        targetClass: UserDto::class,
        property: 'name',
    )]
    public function mapName(User $user): string
    {
        if ($user->isDeleted()) {
            // highlight-next-line
            throw new RefuseToMapException();
        }

        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());
    }
}
```

## Handling Uninitialized Properties

Because Mapper doesn't know the source property your custom property mapper
will be reading from, you need to handle the case if the source property might be
uninitialized.

Alternatively, you can use the `ignoreUninitialized` argument of
the `AsPropertyMapper` attribute to make Mapper ignore any uninitialized
errors if it occurs inside your custom property mapper.

Both property mappers below will accomplish the same thing.

Manually:

```php
use Rekalogika\Mapper\Attribute\AsPropertyMapper;
use Rekalogika\Mapper\Exception\RefuseToMapException;

class UserMapper
{
    #[AsPropertyMapper(
        targetClass: UserDto::class,
        property: 'name',
    )]
    public function mapName(User $user): string
    {
        try {
            return strtoupper($user->name);
        } catch (\Error $e) {
            if (str_contains($e->getMessage(), 'must not be accessed before initialization')) {
                throw new RefuseToMapException();
            }

            throw $e;
        }
    }
}
```

With `ignoreUninitialized`:

```php
use Rekalogika\Mapper\Attribute\AsPropertyMapper;

class UserMapper
{
    #[AsPropertyMapper(
        targetClass: UserDto::class,
        property: 'name',
        // highlight-next-line
        ignoreUninitialized: true,
    )]
    public function mapName(User $user): string
    {
        // if $user->name is uninitialized, Mapper will ignore the mapping.
        return strtoupper($user->name);
    }
}
```

As you can see, using the `ignoreUninitialized` argument can remove a lot of
boilerplate code.

## Manual Wiring

If you don't use autowiring, autoconfiguration, or don't want to use attributes,
you can add the service manually like this:

```yaml title="config/services.yaml"
services:
    App\Mapper\UserMapper:
        tags:
            -   name: 'rekalogika.mapper.property_mapper'
                method: 'mapName'
                sourceClass: 'App\Entity\User'
                targetClass: 'App\Dto\UserDto'
                property: 'name'
            -   name: 'rekalogika.mapper.property_mapper'
                method: 'mapBirthDate'
                sourceClass: 'App\Entity\User'
                targetClass: 'App\Dto\UserDto'
                property: 'birthDate'
            -   name: 'rekalogika.mapper.property_mapper'
                method: 'mapEmail'
                sourceClass: 'App\Entity\User'
                targetClass: 'App\Dto\UserDto'
                property: 'email'
```

## Dumping Property Mapper Table

To dump the list of all property mappers, run the following command:

```bash
$ bin/console debug:container --tag=rekalogika.mapper.property_mapper
```
