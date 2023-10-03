---
title: Abstraction
---

Doctrine ORM uses collection objects that also implement the `Selectable`
interface. It gives us the `matching()` method that allows us to filter the
collection using a criteria object. It is very useful and convenient, but also
an abstraction leak: the caller needs to know the internal structure of the
member entity class.

We can decorate the collection object to keep the `Selectable` interface inside
and expose more useful, higher-level methods that the caller can use.

```php
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Selectable;
use Rekalogika\Collections\Decorator\AbstractCollectionDecorator;

/**
 * @extends AbstractCollectionDecorator<array-key,Book>
 */
class BookCollection extends AbstractCollectionDecorator
{
    /**
     * @param Collection<array-key,Book> $collection
     */
    public function __construct(private Collection $collection)
    {
    }

    protected function getWrapped(): Collection&Selectable
    {
        return $this->collection;
    }

    public function findByAuthor(string $author): self
    {
        $result = $this->matching(
            Criteria::create()
                ->where(Criteria::expr()->eq('author', $author))
        );

        return new self($result);
    }
}
```

The one-to-many side:

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

Then the caller will be able to do something like this:

```php
/** @var BookShelf $bookShelf */

$booksByJohnDoe = $bookShelf->getBooks()->findByAuthor('John Doe');
```