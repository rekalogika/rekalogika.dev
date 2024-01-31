---
title: Mapping Arrays & Array-Like Objects
---

This chapter describes how to map arrays and array-like objects.

## Basic Usage

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

Supported types of the target side:

* Normal array
* `ArrayAccess`
* `ArrayObject`
* Doctrine `Collection`
* Doctrine `ArrayCollection`

The source side must be an array or a `Traversable` object, i.e. anything that
you can `foreach()` over.

## Mapping to `Traversable`

You also have the option to map to a `Traversable` object. If the target
property is type-hinted with `Traversable`, the mapper will map to a `Generator`
object.

```php
class PostDto
{
    /** @var ?\Traversable<int,CommentDto> */
    public ?\Traversable $comments = null;
}
```

This way, you are getting lazy-loading if the source supports lazy loading (like
Doctrine `PersistentCollection`). The source will not be hydrated unless the
consumer actually uses the mapped property on the target side. This might be
useful like if you are using the DTOs in a view, where you don't always need to
use the property.

Furthermore, you are also getting stream mapping using `Generator`, which can
save a lot of memory if your source is large.

If the source is an array or an object that implements `Countable`, you will
also get a `Countable` target, i.e. you can `count()` or `->count()` it. In
addition, if your source is an extra-lazy Doctrine Collection, the consumer will
be able to `count()` the target without causing a full hydration of the source.