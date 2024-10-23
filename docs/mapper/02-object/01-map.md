---
title: Changing the Mapping Behavior with the Map Attribute
---

By default, Mapper will map a property on the source side to a property with the
same name on the target side. You can use the `#[Map]` attribute to change this
default behavior.

## Mapping Properties with Different Source and Target Names

```php
use Rekalogika\Mapper\Attribute\Map;
use Rekalogika\Mapper\MapperInterface;

class SomeObject
{
    public string $sourcePropertyA = 'sourcePropertyA';
}

class SomeObjectDto
{
    // highlight-next-line
    #[Map(property: 'sourcePropertyA')]
    public ?string $targetPropertyA = null;
}

/** @var MapperInterface $mapper */

$source = new SomeObject();
$result = $mapper->map($source, SomeObjectDto::class);
```

In the above example, the mapper will map the `sourcePropertyA` from the source
object to the `targetPropertyA` on the target object.

## Ignoring a Property

If you want to ignore a property, you can use the `#[Map(false)]` attribute:

```php
class SomeObject
{
    #[Map(false)]
    public string $sourcePropertyA = 'sourcePropertyA';
}
```

## Bidirectionality

`#[Map]` is bidirectional, the same attribute above will also work in reverse:

```php
$source = new SomeObjectDto();
$result = $mapper->map($source, SomeObject::class);
```
## Virtual Properties

A property may be 'virtual', i.e. it has a getter and setter, but no actual
property. In this case, you can place the `#[Map]` attribute on the getter or
setter method:

```php
class Person
{
    // highlight-next-line
    #[Map(property: 'alias')]
    public function getName(): string
    {
        return 'John Doe';
    }
}
```

:::tip Protip

It will also work with withers, issers, hassers, canners, adders, and removers.

:::

## Limiting to a Specific Class

The `#[Map]` attribute has an optional `$class` argument, which can be used to
limit the effect only to a specific paired class. i.e. it will only take effect
if the other class is the class specified in the `$class` argument:

```php
class SomeObjectDto
{
    // highlight-next-line
    #[Map(property: 'sourcePropertyA', class: SomeObject::class)]
    public ?string $targetPropertyA = null;
}
```

:::tip Protip

You may have multiple `#[Map]` attributes on the same property, each with a
different `$class` argument.

:::

## Property Path

`#[Map]` also supports property path using the same syntax provided by [Symfony
PropertyAccess](https://symfony.com/doc/current/components/property_access.html),
i.e. you can map a property to a nested property:

```php
class BookDto
{
    // highlight-next-line
    #[Map(property: 'authors[0].name')]
    public ?string $author = null;
}
```

If the caller tries to map a `Book` object to a `BookDto` object above, Mapper
will get the name using `$book->getAuthors()[0]->getName()` (or equivalent) and
assign it to the `author` property of the `BookDto` object.

The reverse will also work. If the caller tries to map a `BookDto` object to a
`Book` object, Mapper will set the name using
`$book->getAuthors()[0]->setName($bookDto->author)` (or equivalent).

:::caution Limitations

Property path does not support variadic setter, i.e. things like
`setAuthors(Author ...$authors)`. It also does not support immutable setters,
or wither methods.

:::