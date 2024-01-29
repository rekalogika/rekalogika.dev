---
title: Mapping to Abstract Classes and Interfaces
---

To map to an abstract class or an interface, you need to add the attribute
`InheritanceMap` to the abstract class or interface. For example:

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