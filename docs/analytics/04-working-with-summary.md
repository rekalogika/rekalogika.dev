---
title: Working with Summaries
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
use Rekalogika\Analytics\SummaryManagerRegistry;

/** @var SummaryManagerRegistry $summaryManagerRegistry */

$result = $summaryManagerRegistry
  ->getManager(OrderSummary::class)
  ->createQuery()
  ->select('price', 'count') // property names of the measures
  ->groupBy('time.month', 'customerCountry') // property name of the dimension
  ->getResult();
```

The result is an instance of `SummaryResult`. It presents the data in the form
of a tree. The order of the `groupBy` arguments determines the order of the
tree. With the example above, the `time.month` property is the first level of
the tree, and the `customerCountry` property is the second level.