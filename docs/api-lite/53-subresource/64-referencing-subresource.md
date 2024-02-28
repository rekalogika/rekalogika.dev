---
title: Referencing a Subresource
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Using the IRI of the resource

By default, API Platform will use IRIs to refer to a resource. But, if you want this style, we recommend setting it explicitly using
`#[ApiProperty(readableLink: false)]`.

<Tabs queryString="tab" groupId="subresource">

<TabItem value="output" label="Output">

```json
{
    "@context": "/contexts/User/Review",
    "@id": "/user/reviews/018de474-1a23-7494-85f9-e92fb962d2a8",
    "@type": "User/Review",
    "id": "018de474-1a23-7494-85f9-e92fb962d2a8",
    "body": "Occaecati voluptate sed sed suscipit. Voluptas expedita quis molestias quam modi deleniti earum. Voluptas dolorem pariatur iusto quis. Rerum in quisquam nisi neque.",
    "rating": 5,
    // highlight-next-line
    "book": "/user/books/018de474-1a2a-7975-87bb-5944ee8ee95f"
}
```

</TabItem>

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/User/BookDto.php"
namespace App\ApiResource\User;

use ApiPlatform\Metadata\ApiResource;

#[ApiResource(
    // ...
)]
class ReviewDto
{
    public ?Uuid $id = null;
    public ?string $body = null;

    /**
     * @var int<1,5>|null
     */
    public ?int $rating = null;

    // highlight-next-line
    #[ApiProperty(readableLink: false)]
    public ?BookDto $book = null;
}
```

</TabItem>

</Tabs>

## Embed the resource

<Tabs queryString="tab" groupId="subresource">

<TabItem value="output" label="Output">

```json
{
    "@context": "/contexts/User/Review",
    "@id": "/user/reviewsWithEmbeddedResource/018de474-1a23-7494-85f9-e92fb962d2a8",
    "@type": "User/Review",
    "id": "018de474-1a23-7494-85f9-e92fb962d2a8",
    "body": "Occaecati voluptate sed sed suscipit. Voluptas expedita quis molestias quam modi deleniti earum. Voluptas dolorem pariatur iusto quis. Rerum in quisquam nisi neque.",
    "rating": 5,
    // highlight-start
    "book": {
        "@id": "/user/books/018de474-1a2a-7975-87bb-5944ee8ee95f",
        "@type": "User/Book",
        "id": "018de474-1a2a-7975-87bb-5944ee8ee95f",
        "title": "Saepe enim sint culpa fuga.",
        "description": "Ad cupiditate asperiores quas quis non facere nam. Fugit praesentium natus aut error perspiciatis quo. Iusto dolores quaerat quibusdam qui praesentium.",
        "reviews": "/user/books/018de474-1a2a-7975-87bb-5944ee8ee95f/reviews"
    }
    // highlight-end
}
```

</TabItem>

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/User/BookDto.php"
namespace App\ApiResource\User;

use ApiPlatform\Metadata\ApiResource;

#[ApiResource(
    // ...
)]
class ReviewDto
{
    public ?Uuid $id = null;
    public ?string $body = null;

    /**
     * @var int<1,5>|null
     */
    public ?int $rating = null;

    // highlight-next-line
    #[ApiProperty(readableLink: true)]
    public ?BookDto $book = null;
}
```

</TabItem>

</Tabs>