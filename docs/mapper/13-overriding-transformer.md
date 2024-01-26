---
title: Overriding Transformer
---

If the mapper chooses the wrong transformer for the job, you can override it by
decorating the correct transformer and adding it to the mapping table.

Suppose you have a `YourObject` class and a `YourObjectDto` class, but the
mapper does not use the desired transformer for the job. You can fix it by
decorating the correct transformer like this:
    
```php
use Rekalogika\Mapper\Transformer\AbstractTransformerDecorator;
use Rekalogika\Mapper\Transformer\ObjectToObjectTransformer;
use Rekalogika\Mapper\Transformer\Contracts\TypeMapping;
use Rekalogika\Mapper\Util\TypeFactory;

class OverrideTransformer extends AbstractTransformerDecorator
{
    public function __construct(ObjectToObjectTransformer $transformer)
    {
        parent::__construct($transformer);
    }

    public function getSupportedTransformation(): iterable
    {
        yield new TypeMapping(
            TypeFactory::objectOfClass(YourObject::class),
            TypeFactory::objectOfClass(YourObjectDto::class),
        );
    }
}
```

With the above example, when the source is `YourObject` and the target is
`YourObjectDto`, the mapper will now choose `ObjectToObjectTransformer` instead
of choosing from the rest of the mapping table.