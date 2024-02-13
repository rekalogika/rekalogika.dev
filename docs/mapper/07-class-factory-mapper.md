---
title: Manual Mapping using a Class Factory Method
---

This mapping method is deprecated.

:::danger Deprecated

This mapping method is deprecated as it is not considered a good practice.

You should instead use `AsObjectMapper` explained in [Manual Mapping using an
Object Mapper](object-mapper) chapter. You will be able to map third-party
classes, separate the logic from the model, and inject other services into the
mapper.

:::

This is one way to have a custom logic of mapping an object to another object.
You can make your DTO implement the `MapToObjectInterface` or
`MapFromObjectInterface` and create the required mapper methods.

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

## Mapping from another Object

You can have your DTO implement the `MapFromObjectInterface` and create the
`mapFromObject()` method:

```php title="src/Dto/MoneyDto.php"
namespace App\Dto;

use Brick\Money\Money;
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\MethodMapper\MapFromObjectInterface;
use Rekalogika\Mapper\MethodMapper\SubMapperInterface;

// highlight-next-line
final class MoneyDto implements MapFromObjectInterface
{
    // ...

    // highlight-start
    public static function mapFromObject(
        object $source,
        SubMapperInterface $mapper,
        Context $context
    ): static {
        if (!$source instanceof Money) {
            throw new \InvalidArgumentException('Source must be instance of ' . Money::class);
        }

        return new static(
            $source->getAmount()->__toString(),
            $source->getCurrency()->getCurrencyCode(),
        );
    }
    // highlight-end
}
```

Then, the next time you are mapping from the `Money` object to the `MoneyDto`
object, the mapper will call the `mapFromObject()` method to get the resulting
`MoneyDto`. The mapping will be done even if your `Money` object is deeply
buried within the object you are mapping from.

## Mapping to Another Object

You can also get the reverse of the above by implement the
`MapToObjectInterface` and create the `mapToObject()` method.

```php title="src/Dto/MoneyDto.php"
namespace App\Dto;

use Brick\Money\Money;
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\MethodMapper\MapToObjectInterface;
use Rekalogika\Mapper\MethodMapper\SubMapperInterface;

// highlight-next-line
final class MoneyDto implements MapToObjectInterface
{
    // ...

    // highlight-start
    public function mapToObject(
        object|string $target,
        SubMapperInterface $mapper,
        Context $context
    ): object {
        return Money::of($this->amount, $this->currency);
    }
    // highlight-end
}
```
## SubMapper

The `$mapper` parameter in the `mapFromObject()` and `mapToObject()` methods
provides you with the SubMapper. Read more about the sub mapper in the
[SubMapper](submapper) chapter.

