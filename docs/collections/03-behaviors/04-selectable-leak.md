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

The following is an example of the problem. It is a problem because `matching()`
is used outside the entity. It mentions the property 'age', which is almost
always private. If the property is, for example, renamed, then we would need to
scour the codebase to find all the places where 'age' is used, and update them
accordingly.

```php
/** @var Country $country */

$workingAgeCitizens = $country->getCitizens()->matching(
    Criteria::create()
        ->where(Criteria::expr()->gte('age', 15))
        ->andWhere(Criteria::expr()->lte('age', 64))
);
```

That code above should have been written like this:

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

        return $this->createCriteriaRecollection(
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
    public function getCitizens(): CitizenCollection
    {
        return new CitizenCollection(
            collection: $this->citizen,
            indexBy: 'id'
        );
    }
}
```