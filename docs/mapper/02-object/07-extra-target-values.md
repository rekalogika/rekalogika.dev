---
title: Extra Target Values
---

Mapper will map the properties of the source object to that of the target
object. However, there might be times when you need to set additional values to
the target object that are not present in the source object. You can specify
these additional values using the `ExtraTargetValues` context object.

```php
use Rekalogika\Mapper\Context\ExtraTargetValues;
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\MapperInterface;

/** @var MapperInterface $mapper */

$target = $mapper->map(
    source: new SomeObject(),
    target: SomeObjectDto::class,
    context: Context::create(
        new ExtraTargetValues([
            SomeObjectDto::class => [
                'date' => new \DateTimeImmutable('2021-01-01'),
            ],
        ]),
    ),
);
```

In the example above, the `date` property of the `SomeObjectDto` class will be
set to `2021-01-01`. The value will be set on the target object using the same
mechanism as the normal mapping process, including on constructor arguments,
setters, and public properties.