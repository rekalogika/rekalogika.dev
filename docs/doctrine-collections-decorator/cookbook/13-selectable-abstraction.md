---
title: Selectable Abstraction
---

Doctrine ORM uses collection objects that also implement the `Selectable`
interface. It gives us the `matching()` method that allows us to filter the
collection using a criteria object. It is very powerful and convenient, but also
an abstraction leak. To use it, the caller needs to know the internal structure
of the member entity class. Without restraint, the knowledge about the internal
details of a popular class will be spread all over your codebase, and updating
the class can potentially become a nightmare.

To solve the problem, we can decorate the collection object to keep the
`Selectable` interface private and expose more concise, higher-level methods
that the caller can use.

## The Decorator Class

```php
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\Selectable;
use Rekalogika\Collections\Decorator\AbstractDecorator\AbstractCollectionDecorator;

/**
 * @extends AbstractCollectionDecorator<array-key,Book>
 */
class BookCollection extends AbstractCollectionDecorator
{
    /**
     * @param Collection<array-key,Book>&Selectable<array-key,Book> $collection
     */
    public function __construct(private Collection $collection)
    {
        if (!$collection instanceof Selectable) {
            throw new \RuntimeException('The wrapped collection must implement the Selectable interface.');
        }
    }

    /**
     * @return Collection<array-key,Book>&Selectable<array-key,Book>
     */
    #[\Override]
    protected function getWrapped(): Collection&Selectable
    {
        return $this->collection;
    }

    // highlight-start
    public function findByAuthor(string $author): self
    {
        $criteria = Criteria::create()
            ->where(Criteria::expr()->eq('author', $author));

        $result = $this->getWrapped()->matching($criteria);

        return new self($result);
    }
    // highlight-end
}
```

## Usage in the `one-to-many` Side

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

    public function __construct()
    {
        $this->books = new ArrayCollection();
    }

    public function getBooks(): BookCollection
    {
        // highlight-next-line
        return new BookCollection($this->books);
    }
}
```

## The Caller Side

Then the caller will be able to do something like this:

```php
/** @var BookShelf $bookShelf */

$booksByJohnDoe = $bookShelf->getBooks()->findByAuthor('John Doe');
```