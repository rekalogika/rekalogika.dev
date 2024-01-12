---
title: Creating a Custom Transformer
---

This chapter describes how to create a custom transformer.

## Creating the Transformer

Suppose you are using the `brick/money` library to represent money in your
application, and you need to map the `Money` object to the following DTO:

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
use Rekalogika\Mapper\Contracts\TransformerInterface;
use Rekalogika\Mapper\Contracts\TypeMapping;
use Rekalogika\Mapper\Exception\InvalidArgumentException;
use Rekalogika\Mapper\Tests\Fixtures\Money\MoneyDto;
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
        Type $sourceType,
        ?Type $targetType,
        array $context
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

The default priority is `0`. The higher the priority, the mapping provided by
the transformer will be taken into consideration earlier.

:::

If you are using autoconfiguration, you can use the `#[AsTaggedItem]` attribute
to set its property.

## Verifying

To verify that the transformer is registered, you can use the `debug:container`
command:

```bash
php bin/console debug:container --tag=rekalogika.mapper.transformer
```

Also, you can verify the existense of the transformer in the mapping table:

```bash
php bin/console rekalogika:mapper:mapping
```