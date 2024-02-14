---
title: SubMapper
---

SubMapper is a highly simplified mapper used in places where you might need to
delegate the mapping of another object to the main mapper. It is designed so
that you don't have to deal with the complexity of managing types.

In SubMapper, passing the `Context` is optional. SubMapper automatically passes
the `Context` from the caller if you don't specifically do it.

## `map()` Method

The `map()` method maps an object to the class or object you specified.

```php
use Rekalogika\Mapper\SubMapper\SubMapperInterface;

/** @var SubMapperInterface $subMapper */

// using class-string as the target type
$postDto = $subMapper->map($source, PostDto::class);

// the target can also be an existing object
$postDto = new PostDto();
$subMapper->map($source, $postDto);
```

## `mapForProperty()` Method

With the `mapForProperty()`, you specify the property name of the variable that
will contain the result of the mapping. SubMapper will detect the type of the
property in `$containing::$propertyName` and use it as the target type for the
mapping.

This is useful if the property is an array or an array-like object, as PHP
doesn't have generics and it is not simple to specify the type of the array
elements.

```php
use Rekalogika\Mapper\SubMapper\SubMapperInterface;

class Post {
    /** @var list<Comment> */
    public array $comments;
}

class Comment {}

class PostDto {
    /** @var list<CommentDto> */
    public array $comments;
}

class CommentDto {}

/** @var Post $post */
/** @var SubMapperInterface $subMapper */

$postDto = new PostDto();
$subMapper->cache($postDto);

// highlight-next-line
$commentsDto = $subMapper->mapForProperty($post->comments, PostDto::class, 'comments');
$postDto->comments = $commentsDto;
```

`$containing` can be a class string or an existing object. If it is an
existing object, SubMapper will attempt to retrieve the current object from the
property and map the source to it.

## `cache()` Method

To reduce the possibility of infinite recursion due to circular references, you
can use the `cache()` method to store the object that is being mapped. You
should call `cache()` after you instantiate the object and before you delegate
the mapping of its properties by calling `map()` or `mapForProperty()`.

```php
use Rekalogika\Mapper\SubMapper\SubMapperInterface;

/** @var SubMapperInterface $subMapper */

$postDto = new PostDto();
$subMapper->cache($postDto);
$postDto->author = $subMapper->map($source->author, AuthorDto::class);

return $postDto;
```

## `createProxy()` Method

You can use the `createProxy()` method to create a proxy object that will be
initialized only after you first access its properties.

```php
use Rekalogika\Mapper\SubMapper\SubMapperInterface;

/** @var SubMapperInterface $subMapper */
/** @var Post $source */

// this is the function that will be used to initialize the proxy object
$initializer = static function (
    PostDto $target
) use ($source): void {
    $target->__construct();
    $target->name = $source->getName();
};

$postDto = $subMapper->createProxy(
    PostDto::class, // real target class
    $initializer,   // will be executed when the proxy is first accessed
    ['id']          // eager properties, accessing these will not trigger the 
                    // hydration of the proxy object
);

// id is eager, so this will not cause the initializer to be called.
$postDto->id = $post->getId();

// this will trigger the initializer
$name = $postDto->name; 
```