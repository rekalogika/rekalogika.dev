---
title: GET Collection Endpoint
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab" groupId="api">

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/Admin/BookDto.php"
namespace App\ApiResource\Admin;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\ApiState\Admin\Book\BookCollectionProvider;

#[ApiResource(
    shortName: 'Admin/Book',
    routePrefix: '/admin',
    operations: [
        // ...
        new GetCollection(
            uriTemplate: '/books',
            provider: BookCollectionProvider::class,
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

```php title="src/ApiState/Admin/Book/BookCollectionProvider.php"
namespace App\ApiState\Admin\Book;

use ApiPlatform\Metadata\Operation;
use App\ApiResource\Admin\BookDto;
use App\Repository\BookRepository;
use Rekalogika\ApiLite\State\AbstractProvider;

/**
 * @extends AbstractProvider<BookDto>
 */
class BookCollectionProvider extends AbstractProvider
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
        // Check for authorization
        $this->denyAccessUnlessGranted('view', $this->bookRepository);

        // A Doctrine repository implements Selectable, and our PaginatorApplier
        // supports Selectable, so we can convieniently use it as a collection
        // of entities to map. Here we map the Books to BookDtos, and return
        // them.
        return $this->mapCollection(
            collection: $this->bookRepository,
            target: BookDto::class,
            operation: $operation,
            context: $context
        );
    }
}
```

</TabItem>

</Tabs>