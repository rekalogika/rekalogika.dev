---
title: Overriding Transformer
---

If you need to override the transformer picked by the mapper, you can do so by
creating a custom transformer like this:
    
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

With the above example, if the source is `YourObject` and the target is
`YourObjectDto`, the mapper will now choose `ObjectToObjectTransformer` instead
of choosing from the rest of the mapping table.