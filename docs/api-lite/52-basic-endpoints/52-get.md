---
title: GET Endpoint
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab" groupId="api">

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/Admin/BookDto.php"
namespace App\ApiResource\Admin;

use App\ApiState\Admin\Book\BookProvider;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;

#[ApiResource(
    shortName: 'Admin/Book',
    routePrefix: '/admin',
    operations: [
        // ...
        new Get(
            uriTemplate: '/books/{id}',
            provider: BookProvider::class,
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

<TabItem value="stateprovider" label="State Provider">

```php title="src/ApiState/Admin/Book/BookProvider.php"
namespace App\ApiState\Admin\Book;

use ApiPlatform\Metadata\Operation;
use App\ApiResource\Admin\BookDto;
use App\Repository\BookRepository;
use Rekalogika\ApiLite\Exception\NotFoundException;
use Rekalogika\ApiLite\State\AbstractProvider;

/**
 * @extends AbstractProvider<BookDto>
 */
class BookProvider extends AbstractProvider
{
    public function __construct(
        private BookRepository $bookRepository
    ) {
    }

    public function provide(
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): object|array|null {
        // Get the book from the database
        $book = $this->bookRepository
            ->find($uriVariables['id'] ?? null)
            ?? throw new NotFoundException('Book not found');

        // Check for authorization
        $this->denyAccessUnlessGranted('view', $book);

        // Map the Book to the output DTO, and return it.
        return $this->map($book, BookDto::class);
    }
}
```

</TabItem>

</Tabs>