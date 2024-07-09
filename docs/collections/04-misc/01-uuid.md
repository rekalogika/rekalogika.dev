---
title: UUID Primary Keys
---

If you need UUID primary keys, we highly recommend using string-based UUIDs
primary key instead of object-based UUIDs (like Symfony or Ramsey's `UuidType`).

Note that it does not mean you are storing the UUIDs as `CHAR(36)` in the
database. It means your entity uses `string` instead of `Uuid` as the type of
its ID property.

Example:

```php
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\UuidV7;
use Symfony\Component\Uid\Uuid;

abstract class AbstractEntity
{
    #[ORM\Id]
    #[ORM\Column(type: 'guid')]
    private readonly string $id;

    public function __construct()
    {
        $this->id = (new UuidV7())->toRfc4122();
    }

    // with PHP >= 8.3 only:
    public function __clone()
    {
        $this->id = (new UuidV7())->toRfc4122();
    }

    final public function getId(): string
    {
        return $this->id;
    }

    final public function getUuid(): Uuid
    {
        return new Uuid($this->id);
    }
}
```

This way, you retain all the best practices of using UUID primary keys, but
without the headaches:

* You still have compact, binary UUIDs in the database.
* You still have time-ordered UUIDs.
* You still have the means to work with object-based UUIDs in your PHP code
  using the `getUuid()` method.
* You don't need to change how you work with `QueryBuilder`'s `setParameter()`.
* The keys in a `Collection` with `indexBy` are now usable. You will be able to
  reliably call `$collection->get($id)`. You no longer need to choose whether to
  use `toRfc4122()` or `toBinary()` depending on the database driver, or even
  depending on whether the `Collection` is lazily loaded or not.
* If you previously used object-based UUIDs, it should not be difficult to
  migrate to string-based UUIDs.
* By generating the UUID in the constructor, new entities already have the ID
  before `flush()`, which is an often overlooked advantage of using UUID primary
  keys in the first place.