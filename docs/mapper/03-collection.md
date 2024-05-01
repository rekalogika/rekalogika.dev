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
    // highlight-next-line
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
* `CollectionInterface`

## Mapping Using Adder and Remover Methods

Mapper supports mapping using adder and remover method on the target side.
Example:

```php
class PostDto
{
    /** @var array<int,CommentDto> */
    private array $comments = [];

    /**
     * @return array<int,CommentDto>
     */
    public function getComments(): array
    {
        return $this->comments;
    }

    public function addComment(CommentDto $comment): void
    {
        $this->comments[] = $comment;
    }

    public function removeComment(CommentDto $comment): void
    {
        $key = array_search($comment, $this->comments, true);

        if ($key !== false) {
            unset($this->comments[$key]);
        }
    }
}
```

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

If the source is an array or an object that implements `Countable`, the result
will also be a `Countable`, i.e. that you can `count()` or `->count()`. In
addition, if your source is an extra-lazy Doctrine Collection, the consumer will
be able to `count()` the target without causing a full hydration of the source.

:::note

For this to work, the target must be null or unset.

:::

## Non-Integer and Non-String Keys

The mapper supports non-integer and non-string keys if the underlying objects
support it, including `SplObjectStorage`. The key value will be transformed to the
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

:::warning

For this to work, the type-hint of the target side cannot be `SplObjectStorage`
or other concrete class. Use `ArrayAccess` instead. Also it must be initially
null, not pre-initialized. The mapper uses a custom `HashTable` object on the
target side to accomplish this.

Using `Traversable` type hint also works.

:::

## Lazy Loading

The mapper supports lazy-loading, and will instantiate a lazy-loading object on
the target size if the conditions are met.

* The target must be type-hinted using `Traversable`, `ArrayAccess`, or the
  special `CollectionInterface`.
* If the target is `ArrayAccess` or `CollectionInterface`, the source must be an
  array, or an array-like object that implements `ArrayAccess`, `Traversable`,
  and `Countable` (pretty much all of them do).
* The target side cannot be a simple array.
* The target variable must not be pre-initialized. It must be null or
  uninitialized.
* The target property must not be using an adder method.
* Does not support non-integer, non-string keys.

If lazy loading is active on the target side, and the source supports lazy
loading (like Doctrine `PersistentCollection`), the source will not be hydrated
unless the consumer actually uses the mapped property on the target side. This
might be useful, like if you are using the DTOs in a view, where you don't
always need to use the property.

## Deleting Items on the Target Side Not Present in Source

If you add the `AllowDelete` attribute to the target property, Mapper will
remove items from the target side that are not present in the source. Example:

```php
use Rekalogika\Mapper\Attributes\AllowDelete;

class PostDto
{
    /** @var ?array<int,CommentDto> */
    // highlight-next-line
    #[AllowDelete]
    public ?array $comments = null;
}
```

:::note

The identity check is done on the value, after transformation. This means it
will only work, for example, if you have set up an object mapper to map a DTO to
a persisted Doctrine entity. For an example on how to accomplish this, see
[Mapping a DTO to a Persisted Doctrine Entity](cookbook/doctrine-entity).

:::