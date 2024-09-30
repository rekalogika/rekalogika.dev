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

## Getting the Existing Target Value

If you need to get the existing value of the target property, you can add the
optional second argument to the method. The mapper will pass the existing value
to the method.

```php
use Brick\Money\Money;
use Rekalogika\Mapper\Attribute\AsObjectMapper;

class MoneyObjectMapper
{
    #[AsObjectMapper]
    public function mapMoneyDtoToMoney(
        MoneyDto $moneyDto,
        // highlight-next-line
        Money $existingMoney
    ): Money {
        return Money::of($moneyDto->getAmount(), $moneyDto->getCurrency());
    }
}
```

:::note

You may return the original instance or a new instance. If you return a new
instance, Mapper will replace the original instance with the new one.

:::

## Extra Arguments

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

## Source Union Types

Union types on the source side are supported.

```php
use Rekalogika\Mapper\Attribute\AsObjectMapper;

class AnimalMapper
{
    #[AsObjectMapper()]
    // highlight-next-line
    public function mapCatOrDogToAnimalDto(Cat|Dog $animal): AnimalDto
    {
        return new AnimalDto($animal);
    }
}
```

Read more about the sub mapper in the [SubMapper](submapper) chapter.

## Using a Lazy-Loading Proxy

Instead of doing the mapping immediately, you can also use the `createProxy()`
method to create a target proxy object. The mapping will be deferred to the
point when you first access the properties of the proxy object.

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
        Money $source,
        SubMapperInterface $subMapper,
    ): MoneyDto {
        return $subMapper->createProxy(
            MoneyDto::class,
            static function (MoneyDto $target) use ($source) {
                $target->__construct(
                    $source->getAmount()->__toString(),
                    $source->getCurrency()->getCurrencyCode(),
                );
            },
        );
    }
}
```

Read more about the `createProxy()` method in the [SubMapper](submapper#createproxy-method)
chapter.