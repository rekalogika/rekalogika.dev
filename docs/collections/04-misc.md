---
title: Miscellaneous
---

## Composite Primary Keys

Composite primary keys cannot be supported.

## UUID Primary Keys

We highly recommend using string-based UUIDs primary key instead of object-based
UUIDs (like Symfony or Ramsey's `UuidType`). Note that it does not mean you are
storing the UUIDs as `CHAR(36)` in the database. It means your entity uses
`string` instead of `Uuid` as the type of its ID property.

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

This way, you still have all the perks of using UUID primary keys, but without
the headaches:

* You still have compact, binary UUIDs in the database.
* You still have time-ordered UUIDs.
* You still have the opportunity to work with object-based UUIDs in your PHP
  code.
* You don't need to change how you work with `QueryBuilder`'s `setParameter()`.
* `Collection` key is now usable. You no longer need to choose whether to use
  `toRfc4122()` or `toBinary()` depending on the database driver, or even
  depending on whether the `Collection` is lazily loaded or not.
* If you previously use object-based UUIDs, it should not be difficult to
  migrate to string-based UUIDs.
* By generating the UUID in the constructor, you already have the ID before
  `flush()`, which is an often overlooked advantage of using UUID primary keys
  in the first place.