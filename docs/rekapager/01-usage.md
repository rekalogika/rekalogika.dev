---
title: Installation and Usage
---

Installation checklist:

* [Install one or more adapters](adapters) for the data types that you are
  using.
* Install the integration package for the framework you are using. Currently,
  there are [Symfony integration](05-framework-integration/01-symfony.md) and
  [API Platform integration](05-framework-integration/02-api-platform.md).

:::tip Protip

If you are using this library only for batch processing, then installing only
the adapters you need is sufficient.

:::

## Transforming the underlying data into a `PageableInterface` object

This part is framework-independent.

```php
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\EntityRepository;
use Rekalogika\Rekapager\Doctrine\ORM\QueryBuilderAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;
use Rekalogika\Rekapager\Offset\OffsetPageable;

// The underlying data in this example is a Doctrine ORM QueryBuilder

/** @var EntityRepository $postRepository */

$queryBuilder = $postRepository
    ->createQueryBuilder('p')
    ->where('p.group = :group')
    ->setParameter('group', $group)
    ->addOrderBy('p.date', 'DESC')
    ->addOrderBy('p.title', 'ASC')
    ->addOrderBy('p.id', 'ASC');

// The adapter provides an uniform interface for the different types of
// underlying data collection

$adapter = new QueryBuilderAdapter(
    queryBuilder: $queryBuilder,
    typeMapping: [
        'p.date' => Types::DATE_MUTABLE
    ]
),

// A pageable represents something that can be partitioned into pages. This
// example uses KeysetPageable, which is a pageable that supports keyset
// pagination.

$pageable = new KeysetPageable(
    adapter: $adapter,
    itemsPerPage: $itemsPerPage,
    count: $count,
);

// There is also an OffsetPageable for offset pagination. An adapter can
// support either or both types of pagination.

$pageable = new OffsetPageable(
    adapter: $adapter,
    itemsPerPage: $itemsPerPage,
    count: $count,
);
```

## Transforming the `PageableInterface` into a `PagerInterface` object

In this phase, we start involving the framework used in the application. The
example below uses Symfony integration provided by
`rekalogika/rekapager-bundle`.

```php
use Rekalogika\Rekapager\Bundle\Contracts\PagerFactoryInterface;
use Symfony\Component\HttpFoundation\Request;

/** @var PagerFactoryInterface $pagerFactory */
/** @var Request $request */

// The pager factory is a service that creates a PagerInterface from a
// PageableInterface

$pager = $pagerFactory->createFromPageable(
    pageable: $pageable,
    request: $request,
    options: new PagerOptions(
        proximity: 3,
    )
);

$currentPage = $pager->getCurrentPage();

foreach ($currentPage as $item) {
    // Do something with the item
}
```

## Rendering the Pager

The `PagerInterface` object contains all the necessary information to render the
pagination control in the user interface. The example below uses the Twig
integration provided by `rekalogika/rekapager-bundle`.

```twig
{# Outputs the item from the current page #}

<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Content</th>
        </tr>
    </thead>
    // highlight-next-line
    <tbody {{ rekapager_infinite_scrolling_content() }}>
        {% for post in pager.currentPage %}
            <tr>
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.date|date('Y-m-d') }}</td>
                <td>{{ post.content }}</td>
            </tr>
        {% endfor %}
    </tbody>
</table>

{# Render the pager #}

// highlight-next-line
{{ rekapager(pager) }}
```

## Batch Processing

A `PageableInterface` object can also be used for batch processing a large
amount of underlying data. The example below demonstrates how to do batch
processing using Doctrine.

```php
use Doctrine\ORM\EntityManagerInterface;
use Rekalogika\Rekapager\PageableInterface;

/** @var PageableInterface $pageable */
/** @var EntityManagerInterface $entityManager */

foreach ($pageable->withItemsPerPage(1000)->getPages() as $page) {
    foreach ($page as $item) {
        // Do something with the item
    }

    // Do something after each page here
    $entityManager->flush(); // if required
    $entitymanager->clear();
}
```
