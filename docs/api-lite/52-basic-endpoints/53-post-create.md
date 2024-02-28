---
title: POST Endpoint for Entity Creation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab" groupId="api">

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/Admin/BookDto.php"
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\ApiInput\BookInputDto;
use App\ApiState\Admin\Book\BookCreateProcessor;

#[ApiResource(
    shortName: 'Admin/Book',
    routePrefix: '/admin',
    operations: [
        // ...
        new Post(
            uriTemplate: '/books',
            input: BookInputDto::class,
            processor: BookCreateProcessor::class
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

</TabItem>

<TabItem value="stateprocessor" label="State Processor">

```php title="src/ApiState/Book/BookCreateProcessor.php"
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\EntityManagerInterface;
use App\ApiInput\BookInputDto;
use App\ApiResource\BookDto;
use App\Entity\Book;
use App\Repository\BookRepository;
use Rekalogika\ApiLite\State\AbstractProcessor;

/**
 * @extends AbstractProcessor<BookInputDto,BookDto>
 */
class BookCreateProcessor extends AbstractProcessor
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
        // Check for authorization
        $this->denyAccessUnlessGranted('add', $this->bookRepository);

        // Map the input DTO to the Book entity. In more complex scenarios,
        // using the mapper can be impractical, and you need to do it according
        // to the requirement of your domain logic.
        $book = $this->map($data, Book::class);

        // Persist the entity and flush the changes
        $this->entityManager->persist($book);
        $this->entityManager->flush();

        // Map the resulting Book to the output DTO, and return it.
        return $this->map($book, BookDto::class);
    }
}

```

</TabItem>

</Tabs>