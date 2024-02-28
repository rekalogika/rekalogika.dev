---
title: POST Endpoint for an Action Without Input
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab" groupId="api">

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/Admin/BookDto.php"
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\OpenApi\Model\Operation;
use ApiPlatform\OpenApi\Model\RequestBody;
use App\ApiInput\BookInputDto;
use App\ApiState\Admin\Book\BookCheckProcessor;

#[ApiResource(
    shortName: 'Admin/Book',
    routePrefix: '/admin',
    operations: [
        // ...
        new Post(
            uriTemplate: '/books/{id}/check',
            processor: BookCheckProcessor::class,
            input: false,
            openapi: new Operation(
                summary: 'Check the book\'s condition',
                description: 'Tells us that the book condition has been checked.',
            )
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

<TabItem value="stateprocessor" label="State Processor">

```php title="src/ApiState/Admin/Book/BookCheckProcessor.php"
namespace App\ApiState\Admin\Book;

use ApiPlatform\Metadata\Operation;
use App\ApiResource\Admin\BookDto;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Rekalogika\ApiLite\Exception\NotFoundException;
use Rekalogika\ApiLite\State\AbstractProcessor;

/**
 * @extends AbstractProcessor<void,BookDto>
 */
class BookCheckProcessor extends AbstractProcessor
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private BookRepository $bookRepository
    ) {
    }

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ) {
        // Gets the book from the database
        $book = $this->bookRepository
            ->find($uriVariables['id'] ?? null)
            ?? throw new NotFoundException('Book not found');

        // Check for authorization
        $this->denyAccessUnlessGranted('check', $book);

        // Execute the action
        $book->check();

        // Flush any changes to the database
        $this->entityManager->flush();

        // Map the Book to the output DTO, and return it.
        return $this->map($book, BookDto::class);
    }
}
```

</TabItem>

</Tabs>