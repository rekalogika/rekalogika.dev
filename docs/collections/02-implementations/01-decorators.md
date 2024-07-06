---
title: Collection Decorators
---

Classes that decorate a Doctrine `Collection` and transform it into a
`Recollection` object.

## Installation

```bash
composer require rekalogika/collections-domain
```

## `RecollectionDecorator` Usage Example

If you have this in your entity:

```php
use Doctrine\Common\Collections\Collection;

class Country
{
    /**
     * @var Collection<int,Citizen>
     */
    private Collection $citizen;

    /**
     * @return Collection<int,Citizen>
     */
    public function getCitizens(): Collection
    {
        return $this->citizen;
    }
}
```

You can change it to:

```php
use Doctrine\Common\Collections\Collection;
use Rekalogika\Contracts\Collections\Recollection;
use Rekalogika\Domain\Collections\RecollectionDecorator;

class Country
{
    /**
     * @var Collection<int,Citizen>
     */
    private Collection $citizen;

    /**
     // highlight-next-line
     * @return Recollection<int,Citizen>
     */
    // highlight-next-line
    public function getCitizens(): Recollection
    {
        // highlight-start
        return RecollectionDecorator::create(
            collection: $this->citizen,
            indexBy: 'id'
        );
        // highlight-end
    }
}
```

## `CriteriaRecollection` Usage Example

If you have this in your entity:

```php
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\ReadableCollection;

class Country
{
    /**
     * @return ReadableCollection<int,Citizen>
     */
    public function getWorkingAgeCitizens(): ReadableCollection
    {
        $criteria = Criteria::create()
            ->where(Criteria::expr()->gte('age', 15))
            ->andWhere(Criteria::expr()->lte('age', 64));

        return $this->citizen->matching($criteria);
    }
}
```

You can change it to:

```php
use Rekalogika\Domain\Collections\CriteriaRecollection;
use Rekalogika\Contracts\Collections\ReadableRecollection;

class Country
{
    /**
     // highlight-next-line
     * @return ReadableRecollection<int,Citizen>
     */
     // highlight-next-line
    public function getWorkingAgeCitizens(): ReadableRecollection
    {
        $criteria = Criteria::create()
            ->where(Criteria::expr()->gte('age', 15))
            ->andWhere(Criteria::expr()->lte('age', 64));

        // highlight-start
        return CriteriaRecollection::create(
            collection: $this->citizen,
            criteria: $criteria,
            indexBy: 'id',
            instanceId: __METHOD__
        );
        // highlight-end
    }
}
```

## The Minimal Flavors

If you want to use the minimal version of the decorators, you can substitute:

* `Recollection` with `MinimalRecollection`
* `ReadableRecollection` with `MinimalReadableRecollection`
* `RecollectionDecorator` with `MinimalRecollectionDecorator`
* `CriteriaRecollection` with `MinimalCriteriaRecollection`

## Instance Caching

The decorator classes cache their instances. If you try to instantiate the
decorator the second time with the same arguments, it will return the same
instance. Therefore, you don't need to implement the caching yourself.

`CriteriaRecollection`, `MinimalCriteriaRecollection` and `CriteriaPageable` may
need the `$instanceId` argument to distinguish between different instances. If
omitted, the classes will use the serialization of the criteria as the instance
ID, which might be unreliable if the criteria has a reference to an entity.

## Extending Decorators

TBD