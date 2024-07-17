---
title: AbstractState
---

Base class for our providers and processors.

This package provides `AbstractProvider` and `AbstractProcessor` to be extended
by your state providers and processors. They consist of useful methods that are
commonly used in the state providers and processors. Some of the methods are
'stolen' from `AbstractController`, so anyone familiar with Symfony controllers
should feel at home.

:::info

If you don't want your state providers and processors to extend `AbstractState`,
read the [Usage Without AbstractState](./04-without-abstractstate.md) section.

:::

## `map()`

Maps an object to another object. Useful for mapping an entity to its API
resource DTO.

```php
/** @var Book $book */

$bookDto = $this->map($book, BookDto::class);

// also works with an existing object

$bookDto = new BookDto();
$this->map($book, $bookDto);
```

## `mapCollection()`

Takes a supported collection object, and returns a `PaginatorInterface` with its
items mapped to the specified class. It also respects the current page and items
per page of the endpoint.

```php
/** @var Book $book */

// returns a paginator of `ReviewDto`
return $this->mapCollection(
    collection: $book->getReviews(),
    target: BookDto::class,
    operation: $operation, // operation from the `provide()` method
    context: $context, // context from the `provide()` method
);
```

If the target is null, `mapCollection()` skips the mapping, it only does the
pagination.

## `getUser()`

Returns the current user according to the security system.

```php
$user = $this->getUser();
```

## `isGranted()`

Checks if the attribute is granted against the current authentication token and
the supplied subject.

```php
if (!$this->isGranted('view', $book)) {
    throw $this->createAccessDeniedException();
}
```

## `denyAccessUnlessGranted()`

Throws an `AccessDeniedException` if the attribute is not granted against the
current authentication token and optionally the supplied subject.

```php
$this->denyAccessUnlessGranted('view', $book);
```

## `createAccessDeniedException()`

Creates an `AccessDeniedException`.

## `createNotFoundException()`

Creates a `NotFoundException`.
