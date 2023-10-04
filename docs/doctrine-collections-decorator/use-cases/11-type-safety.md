---
title: Type Safety
---

We can use collection decoration to ensure that the items in a collection are of
a certain type.

:::note

We find this usage superfluous most of the time considering static analysis
tools can do a pretty good job these days. But it is also one of the most common
objectives of people asking to have a custom Doctrine collection.

:::

## The Decorator Class

```php
/**
 * @extends AbstractCollectionDecorator<array-key,Book>
 */
class Books extends AbstractCollectionDecorator
{
    /**
     * @param Collection<array-key,Book> $wrapped
     */
    public function __construct(private Collection $wrapped)
    {
    }

    #[\Override]
    protected function getWrapped(): Collection
    {
        return $this->wrapped;
    }

    // highlight-start
    private static function assert(mixed $book): Book
    {
        if (!$book instanceof Book) {
            throw new \InvalidArgumentException('Invalid input');
        }

        return $book;
    }
    // highlight-end

    #[\Override]
    public function add(mixed $element): void
    {
        // highlight-next-line
        $this->getWrapped()->add(self::assert($element));
    }

    #[\Override]
    public function set(string|int $key, mixed $value): void
    {
        // highlight-next-line
        $this->getWrapped()->set($key, self::assert($value));
    }
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

    public function getBooks(): Books
    {
        // highlight-next-line
        return new Books($this->books);
    }
}
```