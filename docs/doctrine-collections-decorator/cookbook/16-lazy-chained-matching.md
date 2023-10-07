---
title: Lazy Chained Matching
---

If you call `matching()` on a `PersistentCollection`, it will return an
`ArrayCollection`. So if you call `matching()` again on the result, it will do
the processing in memory.

With `EXTRA_LAZY`, the first `matching()` will return a
`LazyCriteriaCollection`. The second `matching`()` will return an
`ArrayCollection`. Subsequent `matching()` be done in memory.

We can decorate the collection so that chained-`matching()` will be done lazily,
and all the criteria in the chain of `matching()` will be merged. The actual
`matching()` query will be delayed until the caller calls a method that requires
the result.

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
        return new LazyMatchingCollection($this->books);
    }

    public function getScienceBook(): Collection
    {
        return $this->getBooks()->matching(
            Criteria::create()
                ->where(Criteria::expr()->eq('genre', 'science'))
        );
    }

    public function getOldScienceBook(): Collection
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

Nothing will be loaded from the database until the `foreach`. We can also safely
use the result in something like `PagerFanta`.