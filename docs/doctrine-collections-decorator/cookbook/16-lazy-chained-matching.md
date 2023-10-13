---
title: Lazy Chained Matching
---

If you call `matching()` on a `PersistentCollection`, it will immediately query
the database and return the result, even if you won't use the result. If you
call `matching()` again on the result, it will be processed from the in-memory
`ArrayCollection`, not from the database.

:::note

With `EXTRA_LAZY` fetch mode, `PersistentCollection` will return a
`LazyCriteriaCollection`. But subsequent `matching()` call on the result
will still be processed immediately.

:::

We can decorate the collection so that chained-`matching()` will be done lazily.
The database query will only be done when the caller asks for the result.
Calling `matching()` will only merge the supplied criteria to the existing
criteria.

With the standard behavior, the following code will do the processing three
times (twice with `EXTRA_LAZY`). With our decorator, it will only be done once
when `foreach` is called.

```php
/** @var Collection<array-key,mixed> $collection */
/** @var Criteria $criteria1 */
/** @var Criteria $criteria2 */
/** @var Criteria $criteria3 */

$result = $collection
    ->matching($criteria1)
    ->matching($criteria2)
    ->matching($criteria3);

foreach ($result as $item) {
    // ...
} 
```


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

With this example, there will be only two database queries, one due to
`$entityManager->find()`, and one due to the `foreach` call.