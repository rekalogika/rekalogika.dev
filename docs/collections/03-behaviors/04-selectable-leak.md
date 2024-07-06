---
title: Selectable Abstraction Leak
---

## Problem

Doctrine Collections classes implement `Selectable` interface. This is a
powerful feature that allows filtering and sorting the collection. However, it
is also an abstraction leak, and a popular one at that.

To use it, the caller might need to know the internal structure of the class.
Without restraint, the knowledge about the internal structure of an entity might
spread throughout the codebase. And updating the class can potentially break a
lot of code.

## Solution

Our classes does not expose the `Selectable` interface. Instead, they are made
to be easily extended. We can easily add expressive, higher-level methods to the
class to provide the same functionality, but without exposing the inner workings
of the class.

## Example

An example of the problem:

```php
/** @var Country $country */

$workingAgeCitizens = $country->getCitizens()->matching(
    Criteria::create()
        ->where(Criteria::expr()->gte('age', 15))
        ->andWhere(Criteria::expr()->lte('age', 64))
);
```

That code should be refactored into:

```php
/** @var Country $country */

$workingAgeCitizens = $country->getCitizens()->inWorkingAge();
```

To achieve that, we can extend one of our decorator class like this:

```php
use Rekalogika\Domain\Collections\RecollectionDecorator;
use Rekalogika\Contracts\Collections\ReadableRecollection;

/**
 * @extends RecollectionDecorator<int,Citizen>
 */
class CitizenCollection extends RecollectionDecorator
{
    public function inWorkingAge(): ReadableRecollection
    {
        $criteria = $this->matching(
            Criteria::create()
                ->where(Criteria::expr()->gte('age', 15))
                ->andWhere(Criteria::expr()->lte('age', 64))
        );

        return $this->createCriteriaCollection(
            criteria: $criteria,
            instanceId: __METHOD__,
        );
    }
}
```

Then, we can use the `CitizenCollection` class in our `Country` class:

```php
use Rekalogika\Contracts\Collections\ReadableRecollection;

class Country
{
    /**
     * @return ReadableRecollection<int,Citizen>
     */
    public function getCitizens(): ReadableRecollection
    {
        return new CitizenCollection(
            collection: $this->citizen,
            indexBy: 'id'
        );
    }
}
```