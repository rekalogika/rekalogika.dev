---
title: Pageables and Pages
---

A `PageableInterface` represents a collection that can be
partitioned into pages, or `PageInterface`.

![Pageable](./diagrams/pageable.light.svg#light)
![Pageable](./diagrams/pageable.dark.svg#dark)

## Pageable Implementations

### `KeysetPageable`

The `KeysetPageable` is a pageable that supports keyset pagination. It is
available with the `rekalogika/rekapager-keyset-pagination` package.

It takes an implementation of `KeysetPaginationAdapterInterface` as its
argument. The library currently provides two implementations:

* `SelectableAdapter`
* `QueryBuilderAdapter`

### `OffsetPageable`

The `OffsetPageable` is a pageable that supports offset pagination. It is
available with the `rekalogika/rekapager-offset-pagination` package.

It takes an implementation of `OffsetPaginationAdapterInterface` as its
argument. The library currently provides three implementations:

* `CollectionAdapter`
* `SelectableAdapter`
* `PagerfantaAdapterAdapter`

`PagerfantaAdapterAdapter` allows the use of the existing Pagerfanta adapters.

### `PagerfantaPageable`

Takes a `Pagerfanta` object and turns it into a `PageableInterface`. It is
available with the `rekalogika/rekapager-pagerfanta-adapter` package.

## Pageable Properties

All `PageableInterface` implementations should have the following properties.

### Number of items per page

In `OffsetPageable` & `KeysetPageable`, the number of items per page is set in
the constructor parameter `$itemsPerPage`, with the default value of 50. In
`PagerfantaPageable`, it is taken from the underlying `Pagerfanta` object.

The value can be altered post-instantiation using the `withItemsPerPage()`
wither method, or rather you get a new instance with a different number of items
per page.

```php
use Rekalogika\Contracts\Rekapager\PageableInterface;

/** @var PageableInterface $pageable */

$pageableWith10ItemsPerPage = $pageable->withItemsPerPage(10);
```

### The count strategy

There are three strategies for counting the total number of items: ignore (and
assume the count is unknown), fetch the count from the underlying data, or
supplied by the caller. By default, all implementations use 'ignore' because it
is the safest option.

All pageables accepts the `$count` parameter in the constructor. The parameter
accepts integer or bool. `false` means the count is unknown, `true` means the
count is fetched from the underlying data, and an integer is the count value
supplied by the caller.

### Page limit

The maximum page number that can be navigated to. Beyond the limit, the page is
disabled. By default, the limit is 100.

Only applicable to `OffsetPageable` and `PagerfantaPageable`. Does not make
sense with `KeysetPageable`, so the option is not provided there.

## Example Usage

```php
use Rekalogika\Contracts\Rekapager\PageableInterface;

/** @var PageableInterface $pageable */

// Getting the first page
$firstPage = $pageable->getFirstPage();

// Getting the last page. Some pageable does not support seeking to the last
// page, and will return null.
$lastPage = $pageable->getLastPage();

// Getting the second page, or the page after the first page
$secondPage = $firstPage->getNextPage();

// Getting three pages after the first page
$nextPages = $firstPage->getNextPages(3);

// All pages are instances of PageInterface.
// Every page has an identifier object, which we can use to get the page later.
$pageIdentifier = $secondPage->getIdentifier();

// Getting a page by its identifier
$alsoSecondPage = $pageable->getPageByIdentifier($pageIdentifier);
```

## Page Identifiers

Every page has an identifier object, that can be used to get the page later. The
class of this identifier object is determined by the implementation of the
`PageableInterface`. Keyset pagination uses the `KeysetPageIdentifier` class,
while offset pagination uses the `PageNumber` class.

Each of these page identifier classes is accompanied by a
`PageIdentifierEncoderInterface` which is used to encode and decode the
identifier object from and to a string. This string is used as query string
parameter in the URL.

The `PageNumber` object is encoded as a simple integer.

The `rekapager/rekapager-keyset-pagination` package ships with two encoders:

* `SerializeSecretKeysetPageIdentifierEncoder` which uses PHP's `serialize()` and
  `unserialize()` functions. It is protected by checksums to prevent tampering.
* `SymfonySerializerKeysetPageIdentifierEncoder` which uses Symfony's
  `Serializer` component to serialize and unserialize the object.

Our Symfony integration uses the latter encoder.