---
title: PATCH and PUT Endpoint for Entity Update
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab" groupId="api">

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/Admin/BookDto.php"
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Patch;
use App\ApiInput\BookInputDto;
use App\ApiState\Admin\Book\BookProvider;
use App\ApiState\Admin\Book\BookUpdateProcessor;

#[ApiResource(
    shortName: 'Admin/Book',
    routePrefix: '/admin',
    operations: [
        // ...
        new Patch(
            uriTemplate: '/books/{id}',
            input: BookInputDto::class,
            processor: BookUpdateProcessor::class,
            read: false,
        ),
        new Put(
            uriTemplate: '/books/{id}',
            input: BookInputDto::class,
            processor: BookUpdateProcessor::class,
            read: false,
        ),
        // ...
    ]
)]
class BookDto
{
    // ...
}
```

</TabItem>

<TabItem value="inputdto" label="Input DTO">

```php title="src/ApiInput/BookInputDto.php"
namespace App\ApiInput;

class BookInputDto
{
    public string $title;
    public string $description;
}
```

:::warning

The properties in the input DTO are uninitialized. This is important for PATCH
because the client may send only the properties that need to be updated. The
mapper will not update the property on the entity's side if the property in
the input DTO is uninitialized.

If it were initialized to null, then it will be set to null on the entity, which
is probably not what we want.

:::

</TabItem>

<TabItem value="stateprocessor" label="State Processor">

```php title="src/ApiState/Admin/Book/BookUpdateProcessor.php"
namespace App\ApiState\Admin\Book;

use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\EntityManagerInterface;
use App\ApiInput\BookInputDto;
use App\ApiResource\Admin\BookDto;
use App\Repository\BookRepository;
use Rekalogika\ApiLite\Exception\NotFoundException;
use Rekalogika\ApiLite\State\AbstractProcessor;

/**
 * @extends AbstractProcessor<BookInputDto,BookDto>
 */
class BookUpdateProcessor extends AbstractProcessor
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private BookRepository $bookRepository,
    ) {
    }

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ) {
        // Get the book from the database
        $book = $this->bookRepository
            ->find($uriVariables['id'] ?? null)
            ?? throw new NotFoundException('Book not found');

        // Check for authorization
        $this->denyAccessUnlessGranted('update', $book);

        // Update the book by mapping the input DTO to the entity. In a more
        // complex scenario you might need to do this differently, possibly
        // without the mapper
        $this->map($data, $book);

        // Flush the changes to the database
        $this->entityManager->flush();

        // Map the resulting Book to the output DTO, and return it.
        return $this->map($book, BookDto::class);
    }
}
```

</TabItem>

</Tabs>