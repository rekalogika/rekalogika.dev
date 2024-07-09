---
title: Slow Counting
---

## Problem

If the number of records is large, the database might [struggle in counting the
records](https://wiki.postgresql.org/wiki/Slow_Counting). Consequently, calling
`count($collection)` or `$collection->count()` or `collection|length` on a large,
extra-lazy Doctrine `Collection` can be very slow because it becomes a `COUNT()`
query behind the scenes.

## Default Behavior

Our classes offer pluggable counting strategy.

The default counting strategy for
full classes is `SafeDelegatedCountStrategy`. It delegates the count to
the underlying collection, with these caveats:

* If the result count is more than 5000, it will give a deprecation warning.
* If the result count is more than 50000, it will throw an exception.
* If the count duration is more than 2 seconds, it will give a deprecation
  warning.

The threshold can be changed in `Configuration` globally, or by providing the
arguments in the constructor of the strategy.

Our minimal classes use `DisabledCountStrategy`. See the corresponding
explanation below.

## What to Do After the Threshold is Reached

### Change the Counting Strategy

All of our classes provide pluggable strategy for handling the `count()`
operation. You can change how the count is calculated by switching the strategy,
or use your own counting strategy.

### Switch to the Corresponding Minimal Class

As an alternative to switching the counting strategy, you also have the option
to switch to the minimal version of the class if you don't really need the count
operation.

Our minimal classes do not implement `Countable`. So, you can run static
analysis to easily find out the parts of your code that still call the `count()`
on your collection, and clean them up.

## Changing the Counting Strategy

To change the counting strategy, provide the strategy in the `$count` argument
when creating the collection. Example:

```php
use Rekalogika\Contracts\Collections\Recollection;
use Rekalogika\Domain\Collections\Common\Count\ZeroCountStrategy;
use Rekalogika\Domain\Collections\RecollectionDecorator;

class Country
{
    /**
     * @var Collection<int,Citizen>
     */
    private Collection $citizen;

    private int $citizenCount = 0;

    /**
     * @return Recollection<int,Citizen>
     */
    public function getCitizens(): Recollection
    {
        return RecollectionDecorator::create(
            collection: $this->citizen,
            indexBy: 'id',
            // highlight-next-line
            count: new ZeroCountStrategy()
        );
    }
}
```

## Available Counting Strategies

* `SafeDelegatedCountStrategy`: The default, delegates the count to the
  underlying collection with exceptions described above.
* `DelegatedCountStrategy`: Delegates the count to the underlying collection
  without any checks. This strategy provides the same behavior as the original
  `Collection`.
* `DisabledCountStrategy`: Disables the count operation. Throws an exception if
  the count is called.
* `PrecountingStrategy`: Saves and restores the count to another property. See the
  section below for more information.
* `ZeroCountStrategy`: Always returns 0 as the count.
  
You can create your own counting strategy by implementing the interface
`CountStrategy`.

## Precounting Strategy

Precounting strategy stores the precounted value in a separate property. If the
`count()` is called, it will return the precounted value. If the
`refreshCount()` is called, it will recalculate the count from the underlying
collection and store it in the property.

Usage example:

```php
use Rekalogika\Contracts\Collections\Recollection;
use Rekalogika\Domain\Collections\Common\Count\PrecountingStrategy;
use Rekalogika\Domain\Collections\RecollectionDecorator;

class Country
{
    /**
     * @var Collection<int,Citizen>
     */
    private Collection $citizen;

    private int $citizenCount = 0;

    /**
     * @return Recollection<int,Citizen>
     */
    public function getCitizens(): Recollection
    {
        return RecollectionDecorator::create(
            collection: $this->citizen,
            indexBy: 'id',
            // highlight-next-line
            count: new PrecountingStrategy($this->citizenCount)
        );
    }
}
```

The caller can count the records like the following, and it will use the number
stored in `$citizenCount` as the result:

```php
/** @var Country $country */

$count = $country->getCitizens()->count();
// or
$count =count($country->getCitizens());
```

When it is necessary to refresh the pre-counted value, you can do this:

```php
use Doctrine\ORM\EntityManagerInterface;

/** @var EntityManagerInterface $entityManager */

$country->getCitizens()->refreshCount();
$entityManager->flush();
```

## Pagination is Possible Without the Total Count

All of our classes implement `PageableInterface` from our
`rekalogika/rekapager-contracts` package. This allows you to paginate the
collection for user interface or API output.

Unlike traditional pagination, our `PageableInterface` does not need the count
to perform pagination, and therefore remains performant even with huge
collections. You can safely use `DisabledCountStrategy` on your collection and
pagination will still work without any problem.

However, if your collection uses a counting strategy that does provide the
count, the pagination will happily use it to improve the user experience.

## Counting in Minimal Classes

Our minimal classes do not implement `Countable`. So, you cannot do a `count()`
or `->count()` on their instances. However, they still retain the counting logic
internally. You can use the method `getTotalItems()` to get the count result.
Unlike `Countable::count()`, `getTotalItems()` may return null if the count is
not known.
