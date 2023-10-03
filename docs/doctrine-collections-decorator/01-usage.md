---
title: Usage
---

This chapter will show you how to use this library.

## Creating a Decorator Class

To create your decorator class, you need to:

1. Extend one of the abstract classes in the package.
2. Inject the original collection object into your decorator class.
3. Create the method `getWrapped()` that returns the original collection object
   in #2.
4. Override the methods you want to modify the behavior of.

The available abstract classes are:

* `AbstractCollectionDecorator`: Decorates a `Collection` object.
* `AbstractReadableCollectionDecorator`: Decorates a `ReadableCollection`
  object.
* `AbstractSelectableCollectionDecorator`: Decorates a `Collection`+`Selectable`
  object.

:::tip Protip

If you intend to use it with your entities, you probably want
`AbstractCollectionDecorator`. Or, you can use
`AbstractSelectableCollectionDecorator` if you need to use the `matching()`
method provided by the `Selectable` interface.

:::

## Example of the Decorator Class

An example of a collection decorator class:

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
    public function __construct(private Collection $collection)
    {
    }

    protected function getWrapped(): Collection
    {
        return $this->collection;
    }

    // add and override methods here:
    // ...
}
```

## Example of Using it in an Entity

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
        return new BookCollection($this->books);
    }
}
```