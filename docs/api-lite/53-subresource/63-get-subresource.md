---
title: GET Endpoint for a Subresource
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
use App\ApiState\User\Review\BookReviewProvider;

#[ApiResource(
    shortName: 'User/Review',
    routePrefix: '/user',
    operations: [
        // ...
        new Get(
            uriTemplate: '/books/{bookId}/reviews/{id}',
            provider: BookReviewProvider::class,
            uriVariables: [
                'bookId' => new Link(
                    fromClass: BookDto::class,
                )
            ],
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

```php title="src/ApiState/User/Review/BookReviewProvider.php"
namespace App\ApiState\User\Review;

use ApiPlatform\Metadata\Operation;
use App\ApiResource\User\ReviewDto;
use App\Repository\BookRepository;
use Rekalogika\ApiLite\Exception\NotFoundException;
use Rekalogika\ApiLite\State\AbstractProvider;
use Symfony\Component\Uid\Uuid;

/**
 * @extends AbstractProvider<ReviewDto>
 */
class BookReviewProvider extends AbstractProvider
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

        // Gets the review ID from the URI variables
        $reviewId = $uriVariables['id']
            ?? throw new NotFoundException('Review not found');

        // Check the type of the review ID because the next step demands that
        // the ID is in UUID format. You don't need this check if you are using
        // a plain integer or string ID.
        if (!$reviewId instanceof Uuid) {
            throw new \InvalidArgumentException('Invalid reviewId');
        }

        // Get the review from the book's collection of reviews, using the
        // review ID.
        $review = $book->getReviews()->get($reviewId->toBinary())
            ?? throw new NotFoundException('Review not found');

        // Check for authorization
        $this->denyAccessUnlessGranted('view', $review);

        // Map the Review to the output DTO, and return it.
        return $this->map($review, ReviewDto::class);
    }
}
```

</TabItem>

</Tabs>