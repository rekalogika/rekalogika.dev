---
title: Dimensions
---

A summary table can have one or more dimensions. Dimensions are properties of
the source entity that are used to group the data. They have distinct, descriptive
values.

In a summary table, a dimension is defined using the `#[Analytics\Dimension]`
attribute.

## Source Definition

The most important property of a dimension is the `source` argument. This
argument specifies how we get the value from the source entity.

```php
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Rekalogika\Analytics\Attribute as Analytics;
use Rekalogika\Analytics\ValueResolver\PropertyValueResolver;

class YourSummary extends Summary
{
    #[ORM\Column(type: Types::STRING)]
    #[Analytics\Dimension(
        // highlight-start
        source: new PropertyValueResolver('status'),
        // highlight-end
    )]
    private ?string $status = null;
}
```

The source can be of these types:

* `string`: The name of the property in the source entity; can also be a path
  that will traverse the entity tree. The framework will try to autodetect how
  to get the value from the source entity.
* A `ValueResolver` instance: Defines a DQL expression on how to get the value
  from the source entity.
* An array of `string` or `ValueResolver` instances: Explained TBD.

## Hierarchical Dimensions

A dimension can be hierarchical. A common example is the `time` dimension. The
`time` dimension can be further divided into `year`, `month`, `day`, and more.
The caller will then be able to decide whether to group the time by `year`,
`month`, or `day`, etc.

```php
use Doctrine\ORM\Mapping as ORM;
use Rekalogika\Analytics\Attribute as Analytics;
use Rekalogika\Analytics\Model\Hierarchy\TimeDimensionHierarchy;
use Rekalogika\Analytics\ValueResolver\PropertyValueResolver;

class YourSummary extends Summary
{
    #[ORM\Embedded()]
    #[Analytics\Dimension(
        source: new PropertyValueResolver('time'),
        sourceTimeZone: new \DateTimeZone('UTC'),
        summaryTimeZone: new \DateTimeZone('Asia/Jakarta'),
    )]
    private TimeDimensionHierarchy $time;
}
```

The framework provides these predefined time hierarchies:

* `TimeDimensionHierarchy`
* `DateDimensionHierarchy`
* `SimpleTimeDimensionHierarchy`
* `SimpleDateDimensionHierarchy`