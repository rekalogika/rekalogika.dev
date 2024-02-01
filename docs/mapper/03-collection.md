---
title: Mapping Arrays & Array-Like Objects
---

This chapter describes how to map arrays and array-like objects.

## Mapping to an Array

Suppose you have these entities:

```php
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

class Post
{
    /** @var Collection<int,Comment> */
    private Collection $comments;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
    }

    /**
     * @return Collection<int,Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }
}

class Comment
{
    private string $text;

    public function __construct(string $text)
    {
        $this->text = $text;
    }

    public function getText(): string
    {
        return $this->text;
    }
}
```

To map those entities to the corresponding DTOs, you can simply create the DTOs
like the following. Notice the type-hint of the `$comments` property:

```php
class PostDto
{
    /** @var ?array<int,CommentDto> */
    public ?array $comments = null;
}

class CommentDto
{
    public string $text;
}
```

Then, you can map between the two objects:

```php
/** @var MapperInterface $mapper */

$postDto = $mapper->map($post, PostDto::class);
```

:::info

Without the type-hint, the mapper will copy the source objects to the target
array as-is.

:::

The source side must be an iterable: an array or a `Traversable` object, i.e.
anything that you can `foreach()` over.

## Mapping to an Array-Like Object

You can also map to an array-like object. Example:

```php
class PostDto
{
    /** @var ?\ArrayObject<int,CommentDto> */
    public ?\ArrayObject $comments = null;
}
```

Supported types of the target side:

* `ArrayAccess`
* `ArrayObject`
* `ArrayIterator`
* Doctrine `ReadableCollection`
* Doctrine `Collection`
* Doctrine `ArrayCollection`

## `Generator`-Backed Mapping

If the target is type-hinted with `Traversable`, the mapper will map to a
`Generator` object.

```php
class PostDto
{
    /** @var ?\Traversable<int,CommentDto> */
    public ?\Traversable $comments = null;
}
```

With this approach, no values are stored on the target side. Instead, the target
will transform the source values to the desired type on-the-fly as you iterate
over it.

## Non-Integer and Non-String Keys

The mapper supports non-integer and non-string keys if the underlying objects
support it, like `SplObjectStorage`. The key value will be transformed to the
target key type-hint, just like the values. Example:

```php
class RelationshipMap
{
    /** @var \ArrayAccess<Person,Person> */
    public \ArrayAccess $spouseMap;

    public function __construct()
    {
        $this->spouseMap = new \SplObjectStorage();
    }
}

class RelationshipMapDto
{
    /** @var ?\ArrayAccess<PersonDto,PersonDto> */
    public ?\ArrayAccess $spouseMap = null;
}

$jack = new Person('Jack');
$jill = new Person('Jill');

$map = new RelationshipMap();
$map->spouseMap[$jack] = $jill;
$map->spouseMap[$jill] = $jack;

$mapDto = $mapper->map($map, RelationshipMapDto::class);
```

## Lazy Loading

The mapper supports lazy-loading, and will instantiate a lazy-loading object on
the target size if the conditions are met.

* `Generator`-backed mapping is always lazy-loading.
* The target side cannot be a simple array.
* The target variable must not be pre-initialized. It must be null or
  uninitialized.
* Does not support non-integer, non-string keys.

If the source supports lazy loading (like Doctrine `PersistentCollection`), it
will not be hydrated unless the consumer actually uses the mapped property on
the target side. This might be useful, like if you are using the DTOs in a view,
where you don't always need to use the property.

If the source is an array or an object that implements `Countable`, you will
also get a `Countable` target, i.e. you can `count()` or `->count()` it. In
addition, if your source is an extra-lazy Doctrine Collection, the consumer will
be able to `count()` the target without causing a full hydration of the source.