---
title: Pagination
---

The `AbstractState` class provides the `mapCollection()` method that automates
the task of handling collection results, including pagination.

## Usage

Common usage pattern in a state provider for a `GetCollection` endpoint:

```php
use ApiPlatform\Metadata\Operation;
use Rekalogika\ApiLite\State\AbstractProvider;

/**
 * @extends AbstractProvider<SomeObjectDto>
 */
class CollectionProvider extends AbstractProvider
{
    // ...

    public function provide(
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): object|array|null {
        // get the $collectionObject here

        // highlight-start
        return $this->mapCollection(
            collection: $collectionObject,
            target: SomeObjectDto::class,
            operation: $operation,
            context: $context
        );
        // highlight-end
    }
}
```

The highlighted code takes the `$collectionObject`, pages it according to the
paging parameters provided by API Platform, maps each item in the collection to
the `SomeObjectDto` class, and returns the results in a `PaginatorInterface`
object that API Platform expects.

## Supported Collection Objects

The `mapCollection()` method supports the following collection object types:

* Doctrine `Collection` and `ReadableCollection`.
* Doctrine `Selectable`.
* Doctrine ORM `Query` and `QueryBuilder`.
* Pagerfanta's `PagerfantaInterface` and `PagerfantaAdapterInterface`

## Supporting Other Collection Objects

If you need to support other collection object types, you can create a class
implementing `PaginatorApplierInterface`.

## Use Case: Doctrine Repository

Doctrine repositories implement `Selectable`, so you can conveniently do the
following in the state provider, and avoid the need to create queries:

```php
use ApiPlatform\Metadata\Operation;
use Rekalogika\ApiLite\State\AbstractProvider;

/**
 * @extends AbstractProvider<SomeObjectDto>
 */
class CollectionProvider extends AbstractProvider
{
    public function __construct(
        private SomeObjectRepository $someObjectRepository
    ) {
    }

    public function provide(
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): object|array|null {
        return $this->mapCollection(
            collection: $this->someObjectRepository,
            target: SomeObjectDto::class,
            operation: $operation,
            context: $context
        );
    }
}
```

To get a default sorting, you can override the `matching()` method in the
repository like this:

```php
use Doctrine\Common\Collections\Criteria;

class SomeObjectRepository extends EntityRepository implements Selectable
{
    public function matching(Criteria $criteria): Collection
    {
        if (count($criteria->orderings()) === 0) {
            $criteria->orderBy(['createdAt' => 'DESC']);
        }

        return parent::matching($criteria);
    }
}
```
