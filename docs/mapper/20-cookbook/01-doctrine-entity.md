---
title: Mapping a DTO to a Persisted Doctrine Entity
---

This is an example of mapping a DTO to an entity already persisted in the
database.

The DTO and the entity:

```php
class BookDto
{
    public function __construct(public int $id)
    {
    }
}

class Book
{
    private int $id;
    private string $title;

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }
}
```

The mapper:

```php
use Rekalogika\Mapper\Attribute\AsObjectMapper;

class BookDtoToBookMapper
{
    public function __construct(
        private BookRepository $bookRepository
    ) {
    }

    #[AsObjectMapper]
    public function map(BookDto $dto): Book
    {
        $book = $this->bookRepository->find($dto->id);

        if ($book === null) {
            throw new NotFoundException();
        }

        return $book;
    }
}
```

The caller:

```php
use Rekalogika\Mapper\MapperInterface;

/** @var MapperInterface $mapper */

$bookDto = new BookDto(1);
$book = $mapper->map($bookDto, Book::class);
```