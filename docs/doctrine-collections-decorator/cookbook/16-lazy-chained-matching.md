---
title: Lazy Chained Matching
---

If you call `matching()` on a `Collection` it will be processed immediately and
it will return you the result. Except when you use `EXTRA_LAZY` fetch mode, then
it will return a `LazyCriteriaCollection`. But any subsequent `matching()` call
on the result will still be processed immediately.

We can decorate the collection so that chained-`matching()` will be done lazily,
and all the criteria in the chain of `matching()` will be merged. The actual
`matching()` query will be delayed until the caller calls a method that requires
the result.

```php
/** @var Collection<array-key,mixed> $collection */

$result = $collection->matching()->matching()->matching();

foreach ($result as $item) {
    // ...
} 
```

With the standard behavior, the above code will do the processing three times
(twice with `EXTRA_LAZY`). With our decorator, it will only be done once when
the `foreach` is called.

## The Decorator Class

This package already comes with `LazyMatchingCollection` that you can use for
this purpose.

## Usage Example in Entities

```php
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Rekalogika\Collections\Decorator\LazyMatching\LazyMatchingCollection;

#[ORM\Entity()]
class BookShelf
{
    #[ORM\OneToMany(targetEntity: Book::class, fetch: 'EXTRA_LAZY', indexBy: 'id')]
    private Collection $books;

    public function __construct()
    {
        $this->books = new ArrayCollection();
    }

    /**
     * @return Collection<array-key,Book>&Selectable<array-key,Book>
     */
    public function getBooks(): Collection&Selectable
    {
        // highlight-next-line
        return new LazyMatchingCollection($this->books);
    }

    public function getScienceBooks(): Collection
    {
        return $this->getBooks()->matching(
            Criteria::create()
                ->where(Criteria::expr()->eq('genre', 'science'))
        );
    }

    public function getOldScienceBooks(): Collection
    {
        return $this->getScienceBook()->matching(
            Criteria::create()
                ->where(Criteria::expr()->lt('publishedAt', new \DateTime('-10 years')))
        );
    }
}
```

## The Caller Side

Then the caller will be able to do something like this:

```php
$bookShelf = $entityManager->find(BookShelf::class, 1);

$oldScienceBook = $bookShelf->getOldScienceBook();

foreach ($oldScienceBook as $book) {
    echo $book->getTitle();
}
```

Nothing will be loaded from the database until the `foreach`.