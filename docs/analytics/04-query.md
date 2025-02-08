---
title: Queries
---

To work with the summary entities, the framework provides `SummaryManager`
and `SummaryManagerRegistry`.

## `SummaryManager`

`SummaryManager` is a service that lets you interact with a specific summary
entity. To get an instance of `SummaryManager`, you can use the
`SummaryManagerRegistry` service.

```php
use Rekalogika\Analytics\SummaryManagerRegistry;

/** @var SummaryManagerRegistry $summaryManagerRegistry */

$summaryManager = $summaryManagerRegistry->getManager(YourSummary::class);
```

## Querying the Summary

You can query the summary entity using the `createQuery` method. The method
returns an instance of `Query` that you can use to build your query.

```php
use Doctrine\Common\Collections\Criteria;
use Rekalogika\Analytics\SummaryManagerRegistry;

/** @var SummaryManagerRegistry $summaryManagerRegistry */

$result = $summaryManagerRegistry
    ->getManager(OrderSummary::class)
    ->createQuery()
    ->groupBy('time.year', 'customerCountry') // property name of the dimension
    ->select('price', 'count') // property names of the measures
    ->where(Criteria::expr()->eq('time.year', 2023))
    ->getResult();
```

The result is an instance of `Result`. It presents the data in the form of a
tree, with measures already unpivoted for convenience. The order of the
`groupBy` arguments determines the order of the dimensions in the tree. With the
example above, the `time.year` property is the first level of the tree, and the
`customerCountry` property is the second level.

## Query Methods

The methods of the `Query` object are modeled after the Doctrine `QueryBuilder`
methods. The methods are chainable, so you can write the query in a fluent
style.

### `groupBy` and `addGroupBy`

The `groupBy` method is used to specify the dimensions of the query. The
dimension name is the same as the property name of your summary class. The order
in `groupBy` is important, and will be used to determine the order of the
dimensions in the result tree.

### `select` and `addSelect`

The `select` method is used to specify the measures of the query. Again, the
measure name is the name of the property in the summary class.

### `where` and `andWhere`

The `where` method is used to filter the data. The method accepts a Doctrine
Criteria `Expression` object.

## The `Result` Object

The `Result` object has a tree structure. Each node in the tree represents a
dimension or one of the measures. The previous example will produce a result
like this:

![Result tree example](./diagrams/simple.light.svg#light)
![Result tree example](./diagrams/simple.dark.svg#dark)

## Traversing the `Result` Tree

The root node is always an instance of `Result`. The other nodes are instances
of `ResultNode`. To locate a specific node you can use the `traverse()` method:

```php
$node = $result->traverse('2023', 'DE');
```

`traverse()` accepts the instance values, or for convenince, you can use the
string representation of the values. For example, if the `Country` object
implements `Stringable`, the following `traverse()` calls give the same result:

```php
$germany = $countryRepository->find('DE');
$node = $result->traverse('2023', $germany);
$node = $result->traverse('2023', 'DE');
```

Each node has other methods that you can use to get the data:

```php
// Same as the traverse() method of the root node above.
$descendant = $node->traverse('count');

// Get the item of the node, e.g. an instance of `Country` representing Germany
$item = $node->getItem();

// Get the value of the node, e.g. the count of orders from Germany in 2023
$value = $node->getValue();

// Get the raw value of the node. The value above is taken from the getter method,
// while the raw value is taken from the instance property value. This is useful for
// things like monetary values.
$rawValue = $node->getRawValue();
```

Example of getting a single value:

```php
use Rekalogika\Analytics\SummaryManagerRegistry;

/** @var SummaryManagerRegistry $summaryManagerRegistry */

$summaryManager = $summaryManagerRegistry
    ->getManager(OrderSummary::class)
    ->createQuery()
    ->groupBy('time.year', 'customerCountry')
    ->select('count')
    ->getResult()
    ->traverse('2023', 'DE', 'count')
    ?->getValue()
    ?? 0;
```

## Iterating Over the `Result` Tree

To iterate over a node, you can simply use the `foreach` loop:

```php
// $node is an instance of Result or ResultNode
// $item will be the node item, e.g. an instance of Country, it will be the
// same as $childNode->getItem()
foreach ($node as $item => $childNode) {
    // Do something with $childNode
}
```

## Grouping by Measure Type

By default, the measures are placed at the leaf of the tree. You can group the
measures earlier by using the special `@values` keyword:

```php
use Rekalogika\Analytics\SummaryManagerRegistry;

/** @var SummaryManagerRegistry $summaryManagerRegistry */

$result = $summaryManagerRegistry
    ->getManager(OrderSummary::class)
    ->createQuery()
    // highlight-next-line
    ->groupBy('time.year', '@values', 'customerCountry') // property name of the dimension
    ->select('price', 'count') // property names of the measures
    ->getResult();
```

In this case, the result will look like this:

![Early measure grouping](./diagrams/early-measure-grouping.light.svg#light)
![Early measure grouping](./diagrams/early-measure-grouping.dark.svg#dark)