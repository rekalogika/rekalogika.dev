---
title: GET Collection Endpoint for Subresources
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs queryString="tab" groupId="api">

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/User/ReviewDto.php"
namespace App\ApiResource\User;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use App\ApiState\User\Review\BookReviewCollectionProvider;

#[ApiResource(
    shortName: 'User/Review',
    routePrefix: '/user',
    operations: [
        // ...
        new GetCollection(
            uriTemplate: '/books/{bookId}/reviews',
            uriVariables: [
                'bookId' => new Link(
                    fromClass: BookDto::class,
                ),
            ],
            provider: BookReviewCollectionProvider::class,
            paginationItemsPerPage: 10
        ),
        // ...
    ]
)]
class ReviewDto
{
    // ...
}
```

</TabItem>

<TabItem value="stateprovider" label="State Provider">

```php title="src/ApiState/User/Review/BookReviewCollectionProvider.php"
namespace App\ApiState\User\Review;

use ApiPlatform\Metadata\Operation;
use App\ApiResource\User\ReviewDto;
use App\Repository\BookRepository;
use Rekalogika\ApiLite\Exception\NotFoundException;
use Rekalogika\ApiLite\State\AbstractProvider;

/**
 * @extends AbstractProvider<ReviewDto>
 */
class BookReviewCollectionProvider extends AbstractProvider
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
        // Gets the book from the database
        $book = $this->bookRepository
            ->find($uriVariables['bookId'] ?? null)
            ?? throw new NotFoundException('Book not found');

        // Check for authorization
        $this->denyAccessUnlessGranted('getReviews', $book);

        // Get the collection of reviews we want to show. This will get us a
        // Doctrine collection of Review entities.
        $reviews = $book->getReviews();

        // Map the collection of reviews to a collection of output DTO, and
        // return them.
        return $this->mapCollection(
            collection: $reviews,
            target: ReviewDto::class,
            operation: $operation,
            context: $context
        );
    }
}
```

</TabItem>

</Tabs>