---
title: Manual Mapping using an Object Mapper
---

If you need a custom logic in an object to another object mapping, one way to do
it is to create a service, and add the `AsObjectMapper` attribute to a method.

Example:

```php
use Brick\Money\Money;
use Rekalogika\Mapper\Attribute\AsObjectMapper;

class MoneyObjectMapper
{
    #[AsObjectMapper]
    public function mapMoneyToMoneyDto(Money $money): MoneyDto
    {
        return new MoneyDto(
            $money->getAmount()->__toString(),
            $money->getCurrency()->getCurrencyCode(),
        );
    }

    #[AsObjectMapper]
    public function mapMoneyDtoToMoney(MoneyDto $moneyDto): Money
    {
        return Money::of($moneyDto->getAmount(), $moneyDto->getCurrency());
    }
}
```

### Extra Arguments

You also have the option to inject the main transformer, sub-mapper, and the
context to the property mapper. This can be in any order, but the first argument
must be the source object.

```php
use Brick\Money\Money;
use Rekalogika\Mapper\Attribute\AsObjectMapper;
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\MainTransformerInterface;
use Rekalogika\Mapper\SubMapper\SubMapperInterface;

class MoneyObjectMapper
{
    #[AsObjectMapper]
    public function mapMoneyToMoneyDto(
        Money $money,
        // highlight-start
        MainTransformerInterface $mainTransformer,
        SubMapperInterface $subMapper,
        Context $context
        // highlight-end
    ): MoneyDto {
        return new MoneyDto(
            $money->getAmount()->__toString(),
            $money->getCurrency()->getCurrencyCode(),
        );
    }
}
```
Read more about the sub mapper in the [SubMapper](submapper) chapter.