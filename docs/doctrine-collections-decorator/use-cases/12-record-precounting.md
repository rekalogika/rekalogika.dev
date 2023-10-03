---
title: Record Precounting
---

Database servers can be [slow in counting
records](https://wiki.postgresql.org/wiki/Slow_Counting), especially when your
entity has a million related entities. Doing `$collection->count()` or
`count($collection)` will be slow because it will do a `COUNT()` query behind
the scenes.

One way to optimize this is to do a precounting and store the count in a
separate column. This way, you can get the count of related entities without
having to do a very expensive `COUNT()` query every single time.

But it would also mean you need to change the way you get the count. To solve
this problem, you can decorate the collection object to fetch the count from
the field storing the pre-counted value.

```php
use Doctrine\Common\Collections\Collection;
use Rekalogika\Collections\Decorator\AbstractCollectionDecorator;

/**
 * @extends AbstractCollectionDecorator<array-key,Book>
 */
class BookCollection extends AbstractCollectionDecorator
{
    /**
     * @param Collection<array-key,Book> $collection
     */
    public function __construct(
        private Collection $collection,
        private int &$count   // pass by reference
    ) {
    }

    protected function getWrapped(): Collection
    {
        return $this->collection;
    }

    public function count(): int
    {
        return $this->count();
    }

    /**
     * Calculates the count and stores it in the `$count` property.
     */
    public function preCount(): void
    {
        $this->count = $this->getWrapped()->count();
    }
}
```

Then, on the one-to-many side, you can do something like this:

```php
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity()]
class BookShelf
{
    /**
     * @var Collection<array-key,Book>
     */
    #[ORM\OneToMany(targetEntity: Book::class)]
    private Collection $books;

    #[ORM\Column()]
    private int $booksCount = 0;

    public function __construct()
    {
        $this->books = new ArrayCollection();
    }

    public function getBooks(): BookCollection
    {
        return new BookCollection($this->books, $this->booksCount);
    }
}
```

To get the count, you can do the same way as before the optimization, and it
will give you the pre-counted result instantly:

```php
$bookShelf->getBooks()->count();
// or:
count($bookShelf->getBooks());
```

When it is time to update the count, you can do this:

```php
/** @var EntityManagerInterface $entityManager */

$bookShelf->getBooks()->preCount();
$entityManager->flush();
```