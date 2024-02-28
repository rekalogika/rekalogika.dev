---
title: DELETE Endpoint
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab" groupId="api">

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/Admin/BookDto.php"
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Patch;
use App\ApiInput\BookInputDto;
use App\ApiState\Admin\Book\BookRemoveProcessor;

#[ApiResource(
    shortName: 'Admin/Book',
    routePrefix: '/admin',
    operations: [
        // ...
        new Delete(
            uriTemplate: '/books/{id}',
            processor: BookRemoveProcessor::class
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

```php title="src/ApiState/Admin/Book/BookRemoveProcessor.php"
namespace App\ApiState\Admin\Book;

use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\BookRepository;
use Rekalogika\ApiLite\Exception\NotFoundException;
use Rekalogika\ApiLite\State\AbstractProcessor;

/**
 * @extends AbstractProcessor<void,void>
 */
class BookRemoveProcessor extends AbstractProcessor
{
    public function __construct(
        private BookRepository $bookRepository,
        private EntityManagerInterface $entityManager
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
        $this->denyAccessUnlessGranted('remove', $book);

        // Remove the book
        $this->entityManager->remove($book);

        // Flush the change to the database
        $this->entityManager->flush();
    }
}
```

</TabItem>

</Tabs>