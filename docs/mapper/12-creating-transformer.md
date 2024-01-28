---
title: Creating a Custom Transformer
---

Extend the mapper by creating your own transformer.

## Creating the Transformer

Suppose you are using the `brick/money` library to represent a monetary value in
your application, and you need to map the `Money` object to the following DTO:

```php title="src/Dto/MoneyDto.php"
namespace App\Dto;

class MoneyDto
{
    public function __construct(
        private string $amount,
        private string $currency,
    ) {
    }

    public function getAmount(): string
    {
        return $this->amount;
    }

    public function getCurrency(): string
    {
        return $this->currency;
    }
}
```

You can create the transformer as follows:

```php title="src/Mapper/MoneyToMoneyDtoTransformer.php"
namespace App\Mapper;

use Brick\Money\Money;
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Contracts\TransformerInterface;
use Rekalogika\Mapper\Contracts\TypeMapping;
use Rekalogika\Mapper\Util\TypeCheck;
use Rekalogika\Mapper\Util\TypeFactory;
use Symfony\Component\PropertyInfo\Type;

class MoneyToMoneyDtoTransformer implements TransformerInterface
{
    // This tells the library that this transformer supports the transformation
    // from the Money object to the MoneyDto object, and vice versa.
    //
    // The TypeFactory methods are convenience methods for creating the
    // PropertyInfo Type objects.

    public function getSupportedTransformation(): iterable
    {

        yield new TypeMapping(
            TypeFactory::objectOfClass(Money::class),
            TypeFactory::objectOfClass(MoneyDto::class)
        );

        yield new TypeMapping(
            TypeFactory::objectOfClass(MoneyDto::class),
            TypeFactory::objectOfClass(Money::class)
        );
    }

    // This method is called when the mapper is trying to transform Money to
    // MoneyDto, and vice versa.
    //
    // The $source and $target parameters are the source and target objects,
    // respectively. $target is usually null, unless there is already an
    // existing value in the target object.
    //
    // $sourceType and $targetType are the types of the source and target, in
    // the form of PropertyInfo Type object.
    //
    // The TypeCheck class is a convenience class for verifying the type
    // specified by a Type object.

    public function transform(
        mixed $source,
        mixed $target,
        ?Type $sourceType,
        ?Type $targetType,
        Context $context
    ): mixed {
        if (
            $source instanceof Money
            && TypeCheck::isObjectOfType($targetType, MoneyDto::class)
        ) {
            return new MoneyDto(
                amount: $source->getAmount()->__toString(),
                currency: $source->getCurrency()->getCurrencyCode(),
            );
        }

        if (
            $source instanceof MoneyDto
            && TypeCheck::isObjectOfType($targetType, Money::class)
        ) {
            return Money::of(
                $source->getAmount(),
                $source->getCurrency()
            );
        }

        throw new InvalidArgumentException('Unsupported transformation');
    }
}

```

## Registering the Transformer

If you are not using autoconfiguration, you need to register the transformer
and add the `rekalogika.mapper.transformer` tag:

```yaml title="config/services.yaml"
services:
    App\Mapper\MoneyToMoneyDtoTransformer:
        tags:
            - { name: rekalogika.mapper.transformer, priority: 0 }
```

:::info

The default priority is `0`. The higher the priority, the mapping supplied by
the transformer will be considered earlier.

:::

If you are using autoconfiguration, you can use the `#[AsTaggedItem]` attribute
to set its priority.

## Verifying

To verify that the transformer is registered, you can use the `debug:container`
command:

```bash
php bin/console debug:container --tag=rekalogika.mapper.transformer
```

Also, you can verify the existence of the transformer in the mapping table:

```bash
php bin/console rekalogika:mapper:mapping
```

## Delegating Mapping to the Main Transformer

Your transformer does not need to do everything. You can delegate the mapping of
properties or other objects back to the main transformer. To accomplish this,
your transformer needs to implement `MainTransformerAwareInterface`. We also
provide `MainTransformerAwareTrait` to help you with that:

```php title="src/Mapper/MyObjectToMyDtoTransformer.php"
namespace App\Mapper;

use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Contracts\MainTransformerAwareInterface;
use Rekalogika\Mapper\Contracts\MainTransformerInterface;
use Rekalogika\Mapper\Contracts\TransformerInterface;

class MyObjectToMyDtoTransformer implements
    TransformerInterface,
    // highlight-next-line
    MainTransformerAwareInterface
{
    // highlight-next-line
    use MainTransformerAwareTrait;

    public function transform(
        mixed $source,
        mixed $target,
        ?Type $sourceType,
        ?Type $targetType,
        Context $context
    ): mixed {
        // ...

        // delegating the task of transforming 'someProperty' to the main
        // transformer
        // highlight-start
        $target->someProperty = $this->getMainTransformer()->transform(
            source: $source->getSomeProperty(),
            target: $target->someProperty, // current value of the target
            targetTypes: [TypeFactory::objectOfClass(SomeDto::class)]
            context: $context
        );
        // highlight-end

        // ...

        return $target;
    }

    // ...
}
```

## Variant Target Matching

By default, the target in the mapping is invariant. This means that the target
type must exactly be the same as the target specified in the mapping. For
example, the mapping `MoneyToMoneyDtoTransformer` above is invariant. It will
only do the mapping if the target is type-hinted exactly `MoneyDto`, but not any
of its subclasses.

To get a variant matching, set the third parameter of `TypeMapping` to `true`.

```php
use Brick\Money\Money;
use Rekalogika\Mapper\Contracts\TransformerInterface;
use Rekalogika\Mapper\Contracts\TypeMapping;
use Rekalogika\Mapper\Util\TypeFactory;

class MoneyToMoneyDtoTransformer implements TransformerInterface
{
    // ...

    public function getSupportedTransformation(): iterable
    {

        yield new TypeMapping(
            TypeFactory::objectOfClass(Money::class),
            TypeFactory::objectOfClass(MoneyDto::class),
            // highlight-next-line
            true
        );
    }

    // ...
}
```

Suppose you have a `UsdMoneyDto` object that extends `MoneyDto`, using the
example above, the mapping will apply if the target is type-hinted as
`MoneyDto` or `UsdMoneyDto`.

:::info

The source is always variant.

:::

## Caching and Circular References Detection

If you delegate the mapping of the property of your object, your transformer
should add the resulting object to the cache right after instantiation, but
before mapping its properties. This is done to prevent infinite recursion when
there is a circular reference in the source object.

```php title="src/Mapper/MyObjectToMyDtoTransformer.php"
namespace App\Mapper;

use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Contracts\MainTransformerAwareInterface;
use Rekalogika\Mapper\Contracts\MainTransformerInterface;
use Rekalogika\Mapper\Contracts\TransformerInterface;
use Symfony\Component\PropertyInfo\PropertyTypeExtractorInterface;

class MyObjectToMyDtoTransformer implements
    TransformerInterface,
{
    public function transform(
        mixed $source,
        mixed $target,
        ?Type $sourceType,
        ?Type $targetType,
        Context $context
    ): mixed {
        // ...

        // instantiate the target object
        $target = new MyDto();

        // highlight-start
        // add it to the cache
        $context(ObjectCache::class)
            ->saveTarget($source, $targetType, $target);
        // highlight-end

        // delegate the work of mapping the property to the main transformer
        $target->property = $this->getMainTransformer()->transform(
            source: $source->getProperty(),
            target: $target->property,
            targetTypes: $this->propertyTypeExtractor
                ->getTypes($target, 'property');
            context: $context
        );

        return $target;
    }

    // ...
}
```

## Attribute Matching

You can also match classes using attributes in your transformers, in addition
to using class names. The prerequisite is that your attribute needs to implement
`MapperAttributeInterface`.

```php title="src/Attribute/MyAttribute.php"
use Rekalogika\Mapper\Attribute\MapperAttributeInterface;

#[\Attribute(\Attribute::TARGET_CLASS)]
class SomeAttribute implements MapperAttributeInterface
{
}
```

Then you can use it as if it is the object's class name in your
`getSupportedTransformation()`.

```php title="src/Mapper/MyObjectToMyDtoTransformer.php"
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Contracts\TransformerInterface;
use Rekalogika\Mapper\Contracts\TypeMapping;
use Rekalogika\Mapper\Util\TypeCheck;
use Rekalogika\Mapper\Util\TypeFactory;
use Symfony\Component\PropertyInfo\Type;

class MyObjectToMyDtoTransformer implements TransformerInterface
{
    // ...

    public function getSupportedTransformation(): iterable
    {
        yield new TypeMapping(
            TypeFactory::objectOfClass(SomeAttribute::class),
            TypeFactory::objectOfClass(SomeDto::class)
        );
    }

    // ...
}
```

When using attributes, the `$sourceType` and `$targetType` parameters in the
`transform()` method will refer to the type of the attribute, not the object.

## Refusal to Transform

If the transformer throws `RefuseToHandleException`, the `MainTransformer` will
pass the mapping to the next transformer in the priority chain.

```php title="src/Mapper/MyObjectToMyDtoTransformer.php"
namespace App\Mapper;

use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Contracts\TransformerInterface;

class MyObjectToMyDtoTransformer implements
    TransformerInterface,
{
    public function transform(
        mixed $source,
        mixed $target,
        ?Type $sourceType,
        ?Type $targetType,
        Context $context
    ): mixed {
        if ($source instanceof MyObject) {
            // highlight-next-line
            throw new RefuseToHandleException();
        }

        // ...

    }

    // ...
}
```

## Property Path

`MainInterface::transform()` has an optional `$path` parameter. If your
transformer defers the mapping of a property to the main transformer, you should
pass the property name to this parameter. It will be used for tracing and for
generating a meaningful exception message if the mapping fails.

```php title="src/Mapper/MyObjectToMyDtoTransformer.php"
namespace App\Mapper;

use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Contracts\TransformerInterface;

class MyObjectToMyDtoTransformer implements
    TransformerInterface,
{
    public function transform(
        mixed $source,
        mixed $target,
        ?Type $sourceType,
        ?Type $targetType,
        Context $context
    ): mixed {
        // ...

        // delegate the work of mapping the property to the main transformer
        $target->someProperty = $this->getMainTransformer()->transform(
            source: $source->getProperty(),
            target: $target->someProperty,
            targetTypes: $this->propertyTypeExtractor
                ->getTypes($target, 'someProperty');
            context: $context,
            // highlight-next-line
            path: 'someProperty'
        );

        return $target;
    }

    // ...
}
```

If your target object is an array-like object, you should use the `[n]`
notation:

```php title="src/Mapper/MyObjectToMyDtoTransformer.php"
namespace App\Mapper;

use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Contracts\TransformerInterface;

class MyObjectToMyDtoTransformer implements
    TransformerInterface,
{
    public function transform(
        mixed $source,
        mixed $target,
        ?Type $sourceType,
        ?Type $targetType,
        Context $context
    ): mixed {
        // ...

        // delegate the work of mapping the array key to the main transformer
        $target[$key] = $this->getMainTransformer()->transform(
            source: $source[$key],
            target: $target[$key],
            targetTypes: $targetTypes,
            context: $context,
            // highlight-next-line
            path: sprintf('[%s]', $key)
        );

        return $target;
    }

    // ...
}
```
