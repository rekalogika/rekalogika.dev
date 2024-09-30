---
title: Mapping to Abstract Classes and Interfaces
---

To map to an abstract class or an interface, you can add the attribute
`InheritanceMap` to specify the concrete class the mapper will map to. For
example:

```php
use Rekalogika\Mapper\Attribute\InheritanceMap;
use Rekalogika\Mapper\Tests\Fixtures\Inheritance\ConcreteClassA;
use Rekalogika\Mapper\Tests\Fixtures\Inheritance\ConcreteClassB;

#[InheritanceMap([
    ConcreteClassA::class => ConcreteClassADto::class,
    ConcreteClassB::class => ConcreteClassBDto::class,
    ConcreteClassB::class => ConcreteClassCDto::class,
])]
abstract class AbstractClassDto
{
}
```

In the above example, the mapper will map the source to `ConcreteClassADto` if
the source is an instance of `ConcreteClassA`, and so on.

:::info

This only applies if there is no a preexisting object on the target side. If
there is already an object on the target side, Mapper will map to that object
instead.

:::

:::tip Protip

The `#[InheritanceMap]` is bidirectional. If Mapper encounters the attribute on
the source side, it will flip the mapping, so the same attribute above will also
work in reverse.

:::