---
title: Repository
---

An implementation of the repository pattern. This is an alternative to
Doctrine's standard `EntityRepository`. Unlike Doctrine's, our repository
implements `Collection` interface, so you can work with the repository like any
other implementation of `Collection`.

## Installation

```bash
composer require rekalogika/collections-orm
```

## Creating a Repository

Repository interface:

```php
use Rekalogika\Contracts\Collections\Repository;

/**
 * @extends Repository<int,Citizen>
 */
interface CitizenRepository extends Repository
{
    // you may wish to add custom methods here
}
```

Repository implementation:

```php
use Rekalogika\Collections\ORM\AbstractRepository;
use Rekalogika\Collections\ORM\Configuration\RepositoryConfiguration;

/**
 * @extends AbstractRepository<int,Citizen>
 */
class CitizenRepositoryImplementation extends AbstractRepository implements
    CitizenRepository
{
    public function __construct(ManagerRegistry $managerRegistry)
    {
        parent::__construct(
            managerRegistry: $managerRegistry,
            class: Citizen::class,
        );
    }

    // you may wish to add custom methods here
}
```

:::info

Technically, it is not strictly required to create the interface for the
repository. You can just create the implementation class. Creating the interface
is a common practice in domain-driven design (DDD). The interface belongs to the
domain layer, while the implementation belongs to the infrastructure layer.
Other components of the application work with the interface, not the
implementation directly.

:::

## The Minimal Flavor

If you want to use the minimal version of the repository, you can substitute:

* `Repository` with `MinimalRepository`
* `AbstractRepository` with `AbstractMinimalRepository`
* `RepositoryConfiguration` with `MinimalRepositoryConfiguration`

## Convenience Methods

The base `AbstractRepository` class provides convenience methods to be called by
the methods in the concrete repository implementation:

* `getEntityManager()`
* `createQueryBuilder()`
* `getDoctrineRepository()`
* `createCriteriaRecollection()`
* `createCriteriaPageable()`
* `createQueryRecollection()`
* `createQueryPageable()`