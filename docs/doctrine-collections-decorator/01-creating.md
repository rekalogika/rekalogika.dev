---
title: Creating a Decorator Class
---

This chapter will show you how to use this library.

## Creating a Decorator Class

The simplest way to create a decorator class is to extend `CollectionDecorator`.

```php
use Rekalogika\Collections\Decorator\Decorator\CollectionDecorator;

/**
 * @extends CollectionDecorator<array-key,Book>
 */
class BookCollection extends CollectionDecorator
{
    // ...
}
```

Then add your methods to override the existing one. In your methods, you can
access the wrapped collection object by calling `$this->getWrapped()`.

:::tip Protip

If you want the caller to use the `matching()` method of the wrapped collection,
you can use the `SelectableCollectionDecorator` class instead.

:::

## Using it in an Entity

To use it, simply wrap the collection in the constructor.

```php
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

class BookShelf
{
    /**
     * @var Collection<array-key,Book>
     */
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