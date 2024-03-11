---
title: Installation & Basic Usage
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Install and use the mapper.

## Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/mapper
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory, and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/mapper
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title="config/bundles.php"
return [
    // ...
    Rekalogika\Mapper\RekalogikaMapperBundle::class => ['all' => true],
];
```
</TabItem>

<TabItem value="nonsymfony" label="Non-Symfony Projects">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/mapper
```

:::warning

Many parts of this documentation assume you are using Symfony, and will need
to be done differently in non-Symfony projects.

:::

</TabItem>
</Tabs>

## Getting the Mapper Service

In Symfony projects, you can simply autowire `MapperInterface` to your services
and controllers just as you would do with any other service.

In non-Symfony projects, you can use the `MapperFactory` to get the mapper
service:

```php
use Rekalogika\Mapper\MapperFactory;

$mapperFactory = new MapperFactory();
$mapper = $mapperFactory->getMapper();
```

## Usage

Suppose you have a `Book` entity:

```php title="src/Entity/Book.php"
namespace App\Entity;

class Book
{
    public function __construct(
        private int $id,
        private string $title,
        private string $author,
    ) {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }
}
```

And need to map it to the `BookDto` data transfer object:

```php title="src/Dto/BookDto.php"
namespace App\Dto;

class BookDto
{
    public string $id;
    public string $title;
    public string $author;
}
```

You can simply do:

```php
use App\Entity\Book;
use Rekalogika\Mapper\MapperInterface;

/** @var MapperInterface $mapper */
/** @var Book $book */

$result = $mapper->map($book, BookDto::class);

// or map to an existing object

$bookDto = new BookDto();
$mapper->map($book, $bookDto);
```