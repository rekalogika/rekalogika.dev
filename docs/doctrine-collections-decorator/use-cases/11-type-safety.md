---
title: Type Safety
---

We can use collection decoration to ensure that the items in a collection are of
a certain type.

```php
/**
 * @extends AbstractCollectionDecorator<array-key,Book>
 */
class TypedCollectionDecorator extends AbstractCollectionDecorator
{
    /**
     * @param Collection<array-key,Book> $wrapped
     */
    public function __construct(private Collection $wrapped)
    {
    }

    protected function getWrapped(): Collection
    {
        return $this->wrapped;
    }

    private static function ensure(mixed $book): Book
    {
        if (!$book instanceof Book) {
            throw new \InvalidArgumentException('Invalid input');
        }

        return $book;
    }

    public function add(mixed $element): void
    {
        $this->getWrapped()->add(self::ensure($element));
    }

    public function set(string|int $key, mixed $value): void
    {
        $this->getWrapped()->set($key, self::ensure($value));
    }
}
```

:::note

We think it is superfluous most of the time considering that static analysis
tools can do a pretty good job these days. But it is also the most common
objective of people wanting to have a custom Doctrine collection.

:::