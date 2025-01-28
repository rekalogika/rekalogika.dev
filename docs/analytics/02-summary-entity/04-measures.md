---
title: Measures
---

Measures are quantitative values that are aggregated in a summary table. In SQL,
these are fields that you would use in a `SUM`, `COUNT`, and other aggregate
functions.

Measures are defined using the `#[Analytics\Measure]` attribute.

## Aggregate Functions

The most important argument in the `#[Analytics\Measure]` attribute is the
`function` argument. This argument is used to define the aggregation function.

```php
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Rekalogika\Analytics\AggregateFunction\Sum;
use Rekalogika\Analytics\Attribute as Analytics;

class YourSummary extends Summary
{
    #[ORM\Column(type: Types::INTEGER)]
    #[Analytics\Measure(
        // highlight-start
        function: new Sum('price'),
        // highlight-end
    )]
    private ?int $price = null;
}
```

The above measure will sum the `price` property of the source entity.

## Available Aggregate Functions

The following aggregate functions are provided:

* `Sum`
* `Count`
* `Max`
* `Min`

Additional aggregate functions can be created by implementing the
`AggregateFunction` interface.