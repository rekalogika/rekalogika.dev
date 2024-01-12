---
title: Manual Mapping using a Class Method
---

This chapter describes how to map using a class method.

This feature an alternative to creating a transformer. It is useful if your
class requires a custom logic to map the data. You can make your DTO implement
the `MapToObjectInterface` or `MapFromObjectInterface` and create the required
methods.

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
        array $context = []
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
object, the mapper will call the `mapFromObject()` method. The mapping will be
done even if your `Money` object is deeply buried within the object you are
mapping from.

## Mapping to Another Object

You can also get the reverse of the above by implement the
`MapToObjectInterface` and create the `mapToObject()` method.

```php title="src/Dto/MoneyDto.php"
namespace App\Dto;

use Brick\Money\Money;
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
        array $context = []
    ): object {
        return Money::of($this->amount, $this->currency);
    }
    // highlight-end
}
```
## Sub Mapper

The `$mapper` parameter in the `mapFromObject()` and `mapToObject()` methods
provides you with the sub mapper. You can use it to map another object, so you
don't have to do everything yourself.

There are two methods in the sub mapper that you can use. The first is `map()`.

```php
/** @var SubMapperInterface $mapper */

// the $target can be an existing object, or a class-string
$result = $mapper->map($source, $target);
```

The other is `mapForProperty()`.

```php
/** @var SubMapperInterface $mapper */

$result = $mapper->mapForProperty($source, $className, $propertyName);
```

`mapForProperty()` will detect the type of the specified property, and then use
it as the target type for the mapping. This is useful if the property is an
array or an array-like object, as PHP doesn't have generics and it is not simple
to specify the type of the array elements.