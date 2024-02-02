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

## Custom Property Mapper

If you need a custom mapping logic for a specific property, you can create a
service and add the attribute `AsPropertyMapper` to a custom method. Example:

```php
use Rekalogika\Mapper\PropertyMapper\AsPropertyMapper;

class UserMapper
{
    #[AsPropertyMapper(
        sourceClass: User::class,
        targetClass: UserDto::class,
        property: 'name',
    )]
    public function mapName(User $user): string
    {
        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());
    }
}
```

The above example concatenates first name and last name from the source object,
transforms it to uppercase, and returns the result. The framework will then
assign the result to the `name` property of the target object, as specified in
the 'property' argument of the `AsPropertyMapper` attribute.

If you have many properties to manually map, you can also do the following
shorthand:

```php
use Rekalogika\Mapper\PropertyMapper\AsPropertyMapper;

#[AsPropertyMapper(
    sourceClass: User::class,
    targetClass: UserDto::class,
)]
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

To dump the list of all property mappers, run the following command:

```bash
$ bin/console debug:container --tag=rekalogika.mapper.property_mapper
```