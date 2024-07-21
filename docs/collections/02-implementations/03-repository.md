---
title: Repository
---

An implementation of the repository pattern. This is an alternative to
Doctrine's standard `EntityRepository`. Unlike Doctrine's, our repository
implements `Collection` interface, so you can work with the repository like any
other implementation of `Collection`.

## Why?

Why not? A repository is essentially a collection of entities. It makes sense to
implement it as just another collection, having the same behavior as any other
collection.

Your `CitizenRepository` will work practically the same way as
`$country->getCitizens()`, except that the former contains all citizens, while
the latter contains citizens of a specific country.

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

## Migrating from Doctrine's Repository

### Persisting an entity

```diff-php
  use Doctrine\ORM\EntityManagerInterface;
  
  /**
   * @var EntityRepository $repository This is an implementation of the repository
   * mentioned in this document.
   */
  
  /** @var EntityManagerInterface $entityManager */
  
  $entity = new Entity();
- $entityManager->persist($entity);
+ $repository->add($entity);
  $entityManager->flush();
```

### Retrieving an entity

```diff-php
  use Doctrine\ORM\EntityManagerInterface;
  use Doctrine\ORM\EntityRepository;
  
  /**
   * @var EntityRepository $repository This is an implementation of the repository
   * mentioned in this document.
   */

  /** @var EntityManagerInterface $entityManager */
  /** @var EntityRepository<Entity> $doctrineRepository */

- $entity = $entityManager->find(Entity::class, $id);
- // or
- $entity = $doctrineRepository->find($id);
+ $entity = $repository->get($id);
+ // alternative that throws an exception if the entity is not found:
+ $entity = $repository->fetch($id);
```

### Removing an entity

```diff-php
  use Doctrine\ORM\EntityManagerInterface;
  
  /**
   * @var EntityRepository $repository This is an implementation of the repository
   * mentioned in this document.
   */
  
  /** @var EntityManagerInterface $entityManager */
  /** @var Entity $entity */

- $entityManager->remove($entity);
+ $repository->removeElement($entity);
  $entityManager->flush();
```

### Iterating All Entities

```diff-php
  use Doctrine\ORM\EntityManagerInterface;
  use Doctrine\ORM\EntityRepository;
  
  /**
   * @var EntityRepository $repository This is an implementation of the repository
   * mentioned in this document.
   */
  
  /** @var EntityManagerInterface $entityManager */
  /** @var EntityRepository<Entity> $doctrineRepository */

- $entities = $doctrineRepository->findAll();
- foreach ($entities as $entity) {
-    // do something
- }
+ // non-minimal flavor only:
+ foreach ($repository as $entity) {
+    // do something
+ }
+
+ // all flavors, iterating in batches, should never trigger out-of-memory
+ // situation:
+ foreach ($repository->withItemsPerPage(1000)->getPages() as $page) {
+    foreach ($page as $entity) {
+        // do something
+    }
+    $entityManager->clear();
+ }
```

## Coexisting with Doctrine's Standard Repository

It should be technically possible to implement this repository in the same class
as Doctrine's standard repository, but we don't have an implementation for that
yet.

If you no longer use the default Doctrine's repository, you can safely remove
the 'repository' argument in your entity configuration, and remove Doctrine's
repository class to reduce confusion. The default Doctrine's repository is still
available by calling `$entityManager->getRepository(Entity::class)`, it is just
you no longer have the option to add custom methods to it.

This implementation of repository sits above Doctrine's Entity Manager. The
entity manager does not have the knowledge of the repository.