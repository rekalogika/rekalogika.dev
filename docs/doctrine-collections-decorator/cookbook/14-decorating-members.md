---
title: Decorating Member Objects
---

We can use a collection decorator to dynamically decorate the members of the
collection on the fly.

In this example, we will be using an example of a one-to-many association
between `PartnerCompany` and `BusinessContract` entities. The `PartnerCompany`
entity has a collection of `BusinessContract` entities.

## `BusinessContract` Entity & Superclass

```php
use Doctrine\ORM\Mapping as ORM;

interface BusinessContractInterface {
    // ...
}

#[ORM\Entity()]
class BusinessContract implements BusinessContractInterface {
    // ...
}
```

## Decorator for `BusinessContract`

```php
class BusinessContractDecorator implements BusinessContractInterface {
    public function __construct(private BusinessContractInterface $wrapped)
    {
    }

    // ...
}
```

## Decorator for the `BusinessContract` Collection

```php
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Selectable;
use Rekalogika\Collections\Decorator\Decorator\CollectionDecorator;

/**
 * @extends CollectionDecorator<array-key,BusinessContractInterface>
 */
class BusinessContractCollectionDecorator extends CollectionDecorator
{
    #[\Override]
    public function get(string|int $key): BusinessContractInterface
    {
        return new BusinessContractDecorator(
            $this->getWrapped()->get($key)
        );
    }

    #[\Override]
    public function getIterator(): \Traversable
    {
        foreach ($this->getWrapped() as $key => $value) {
            yield $key => new BusinessContractDecorator($value);
        }
    }

    // We should override all the other methods that returns
    // BusinessContractInterface, but for conciseness, we skip them here.
}
```

## Usage in the `PartnerCompany` Object

```php
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity()]
class PartnerCompany
{
    /**
     * @var Collection<array-key,BusinessContractInterface>
     */
    #[ORM\OneToMany(targetEntity: BusinessContract::class)]
    private Collection $businessContracts;

    public function __construct()
    {
        $this->businessContracts = new ArrayCollection();
    }

    public function getBusinessContracts(): BusinessContractCollectionDecorator
    {
        return new BusinessContractCollectionDecorator($this->businessContracts);
    }
}
```
## Class Diagram

Now for a bird's-eye view of our classes.

![Decorating members](../diagrams/decorating-members.light.svg#light)
![Decorating members](../diagrams/decorating-members.dark.svg#dark)