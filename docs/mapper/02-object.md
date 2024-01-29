---
title: Mapping Object to Object
---

Mapping an object to another object is the most common task done by a mapper.
Internally, this task is done by `ObjectToObjectTransformer`. It identifies
properties that have the same name on the source and the target, transforms
to the target type, and either sets the target property or adds it to the
constructor arguments.

## Custom Property Mapping Logic

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
        return strtoupper($user->getName());
    }
}
```

The above example takes the `name` property from the source object, transforms
it to uppercase, and returns the result. The framework will then assign the
result to the `name` property of the target object, as specified in the
'property' argument of the `AsPropertyMapper` attribute.

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
        return strtoupper($user->getName());
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
