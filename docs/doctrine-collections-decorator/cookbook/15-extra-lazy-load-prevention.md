---
title: Loading Prevention in Extra Lazy Collections
---

Suppose you have an entity that has a one-to-many relation with a million of
related entities. The solution is to use [`fetch: 'EXTRA_LAZY'`](https://www.doctrine-project.org/projects/doctrine-orm/en/latest/tutorials/extra-lazy-associations.html) and `indexBy:
'id'`.

This will allow working with some of the methods of the collection without
loading the whole collection into memory. As long as you don't call the other
methods, you will be fine.

But then one of your team members forgets about it and inadvertently calls one of
the methods that triggers a full load of the collection. In their development
environment, it appears fine because of the much smaller dataset. It would pass
CI and be deployed to production. But in production, everything immediately
grinds to a halt because it tries to load a million records into memory.

A solution to prevent this problem is to decorate the collection to throw an
exception if a non-safe method is called.

The list of safe methods is listed in the documentation of [Extra Lazy
Association](https://www.doctrine-project.org/projects/doctrine-orm/en/current/tutorials/extra-lazy-associations.html).
They are: `contains()`, `containsKey()`, `count()`, `get()`, `slice()`, `add()`,
and `offsetSet()`.

## The Decorator Class

This package already comes with ready-made decorators for this purpose. For
completeness, like every other of our classes, they come with four flavors
depending on the type of collection you are decorating:

* `ExtraLazyCollection`
* `ExtraLazyReadableCollection`
* `ExtraLazySelectableCollection`
* `ExtraLazySelectableReadableCollection`

But you probably want to use `ExtraLazyCollection` most of the time.

:::info

While these decorators only allow safe methods, they still implement
`Collection` (or the other interfaces) so that they can still be used in places
where the original collection is expected, like `PagerFanta`.

:::

## Usage Example in Entities

```php
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Rekalogika\Collections\Decorator\ExtraLazy\ExtraLazyCollection;

#[ORM\Entity()]
class BookShelf
{
    // our bookshelf has a million of books...
    #[ORM\OneToMany(
        targetEntity: Book::class,
        fetch: 'EXTRA_LAZY', // needs this, or it will not work
        // also needs this, or containsKey() & get() will trigger the loading:
        indexBy: 'id', 
    )]
    private Collection $books;

    public function getBooks(): Collection
    {
        return new ExtraLazyCollection($this->books);
    }
}
```
