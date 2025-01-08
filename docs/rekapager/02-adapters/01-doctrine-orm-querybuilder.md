---
title: Doctrine ORM QueryBuilder
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`QueryBuilderAdapter` takes a Doctrine ORM `QueryBuilder` instance. It supports
keyset and offset pagination.

## Installation

```bash
composer require rekalogika/rekapager-doctrine-orm-adapter
```

If you need [SQL row values](../10-seek-method.md) support, you need to register
the necessary DQL function:

<Tabs>

<TabItem value="Symfony">

If you are using Symfony, add the following to your configuration:

```yaml title="config/packages/doctrine.yaml"
doctrine:
    orm:
        dql:
            string_functions:
                REKAPAGER_ROW_VALUES: Rekalogika\Rekapager\Doctrine\ORM\RowValuesFunction
```

</TabItem>

<TabItem value="Manual Wiring">

If you wire Doctrine manually, use the following code:

```php
use Doctrine\ORM\Configuration;
use Rekalogika\Rekapager\Doctrine\ORM\RowValuesFunction;

/** @var Configuration $configuration */
$configuration
    ->addCustomStringFunction('REKAPAGER_ROW_VALUES', RowValuesFunction::class);
```

</TabItem>

</Tabs>


## Usage

```php
use Doctrine\DBAL\LockMode;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\EntityRepository;
use Rekalogika\Rekapager\Doctrine\ORM\QueryBuilderAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;
use Rekalogika\Rekapager\Offset\OffsetPageable;

/** @var EntityRepository $postRepository */

$queryBuilder = $postRepository
    ->createQueryBuilder('p')
    ->where('p.group = :group')
    ->setParameter('group', $group)
    ->addOrderBy('p.date', 'DESC') // a date field that accepts DateTime
    ->addOrderBy('p.title', 'ASC')
    ->addOrderBy('p.id', 'ASC');

// highlight-start
$adapter = new QueryBuilderAdapter(
    queryBuilder: $queryBuilder,
    lockMode: LockMode::PESSIMISTIC_WRITE, // optional
    typeMapping: [
        'p.date' => Types::DATE_MUTABLE // the type of the date field
    ],
    indexBy: 'id' // optional
);
// highlight-end

$pageable = new KeysetPageable($adapter);
// or
$pageable = new OffsetPageable($adapter);
```

:::info

If you don't provide a type mapping, the adapter will try to look it up from
Doctrine's class metadata. If it fails, it will use heuristics to detect the
type for some common objects.

:::

:::caution

The `QueryBuilderAdapter` does not support QueryBuilder's `indexBy` (the third
parameter of `from()`, or the second parameter of a repository's
`createQueryBuilder()`). If you need the feature, use the `indexBy` parameter of
`QueryBuilderAdapter` as the above example.

:::

## Notes

With keyset pagination, there are additional prerequisites:

* The underlying `QueryBuilder` object must have a sort order. Be sure to call
  `orderBy()` or `addOrderBy()` on the query builder before passing it to the
  adapter.
* If a field in a sort order uses a non-scalar type, you should provide a
  `typeMapping` option. The adapter will use it in the `setParameter()` method
  of the `QueryBuilder`. The example above shows how to provide a type mapping
  for a date field.

## Limitations

One-to-many and many-to-many joins are not supported. Many-to-one joins are OK.

```php
// supported because a post has only one author
$queryBuilder
    ->from(Post::class, 'p')
    ->leftJoin('p.author', 'a')
    ->select('p');

// not supported because a post has many comments
$queryBuilder
    ->from(Post::class, 'p')
    ->leftJoin('p.comments', 'c')
    ->select('p');
```

If you have an entity with a one-to-many relationship, you can usually omit the
join and Doctrine will fetch the related entities lazily.

## Transactions

If you use the `lockMode` option, the adapter will pass the option to the
resulting `Query` object. In a batch processing, this is how to wrap the
processing of each page in a transaction:

```php
use Doctrine\DBAL\LockMode;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;
use Rekalogika\Rekapager\Keyset\KeysetPageable;
use Rekalogika\Rekapager\Doctrine\ORM\QueryBuilderAdapter;

/** @var EntityManagerInterface $entityManager */
/** @var QueryBuilder $queryBuilder */

$adapter = new QueryBuilderAdapter(
    queryBuilder: $queryBuilder,
    // highlight-next-line
    lockMode: LockMode::PESSIMISTIC_WRITE,
);

/** @var PageableInterface<int,Post> */
$pageable = new KeysetPageable(
    adapter: $adapter,
    itemsPerPage: 10,
);

// using explicit begin, commit and rollback

foreach ($pageable->getPages() as $page) {
    $entityManager->beginTransaction();

    try {
        foreach ($page as $post) {
            // do something with the post
        }
    } catch (\Throwable $e) {
        $entityManager->rollback();
        throw $e;
    }

    $entityManager->flush();
    $entityManager->commit();
}

// using wrap

foreach ($pageable->getPages() as $page) {
    $entityManager->wrapInTransaction(function () use ($page) {
        foreach ($page as $post) {
            // do something with the post
        }
    });
}
```

:::info

The above can work because `PageInterface` is lazy. The content of the page is
fetched when you iterate over it, not when you iterate over `getPages()`.

:::

## Overriding the Boundary Fields

By default, the adapter uses the fields in the `ORDER BY` clause as the boundary
fields, and it should work in most cases. This is an example scenario that
necessitates overriding the boundary fields.

Suppose you have this table:

```sql
CREATE TABLE post (
    id INT PRIMARY KEY NOT NULL,
    category VARCHAR(255),
    title VARCHAR(255)
);

CREATE INDEX post_category_id ON post (category, id);
```

To efficiently paginate over the posts of a specific category, you might want to
use `QueryBuilderAdapter` like this:

```php
use Doctrine\ORM\EntityRepository;
use Rekalogika\Rekapager\Doctrine\ORM\QueryBuilderAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;

/** @var EntityRepository $postRepository */

$queryBuilder = $postRepository->createQueryBuilder('p');

if ($category === null) {
    $queryBuilder->where('p.category IS NULL');
} else {
    $queryBuilder->where('p.category = :category')
        ->setParameter('category', $category);
}

// forces the database to use the same index for filtering and ordering:
$queryBuilder
    ->orderBy('p.category', 'ASC')
    ->addOrderBy('p.id', 'ASC');

$adapter = new QueryBuilderAdapter(
    queryBuilder: $queryBuilder,
    // highlight-next-line
    boundaryFields: ['id'],
);

$pageable = new KeysetPageable($adapter);
```

Without the `boundaryFields` argument, the adapter would use `category` and `id`
as the boundary fields. And it would work correctly, unless you have posts
with a NULL category, like in the above example.