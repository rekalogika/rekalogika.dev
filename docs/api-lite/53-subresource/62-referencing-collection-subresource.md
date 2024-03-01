---
title: Referencing a Collection of Subresources
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Using a Collection of IRIs

By default, API Platform will use a collection of the IRI of the subresource
objects. But, if you want this style, we recommend setting it explicitly using
`#[ApiProperty(readableLink: false)]`.

<Tabs queryString="tab" groupId="collection-subresource">

<TabItem value="output" label="Output">

```json
{
    "@context": "/contexts/User/Book",
    "@id": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54",
    "@type": "User/Book",
    "id": "018dda4b-19be-7ad3-9eb4-b56e253e9c54",
    "title": "Some Book",
    "description": "Eligendi sunt explicabo quae qui omnis expedita et. Et incidunt earum recusandae itaque recusandae. Ipsam id id qui.",
    // highlight-start
    "reviews": [
        "/user/reviews/018dda4b-19a5-7ac7-824d-caa21760643a",
        "/user/reviews/018dda4b-19a7-716a-94e0-2d6704a564d5",
        "/user/reviews/018dda4b-19aa-7336-af9b-dbaf19d7e744",
    ]
    // highlight-end
}
```

</TabItem>

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/User/BookDto.php"
namespace App\ApiResource\User;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;

#[ApiResource(
    // ...
)]
class BookDto
{
    public ?Uuid $id = null;
    public ?string $title = null;
    public ?string $description = null;

    /**
     * @var ?CollectionInterface<int,ReviewDto>
     */
    // highlight-next-line
    #[ApiProperty(readableLink: false)]
    public ?CollectionInterface $reviews = null;}
```

</TabItem>

</Tabs>

## Using a Collection of Embedded Resources

<Tabs queryString="tab" groupId="collection-subresource">

<TabItem value="output" label="Output">

```json
{
    "@context": "/contexts/User/Book",
    "@id": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54",
    "@type": "User/Book",
    "id": "018dda4b-19be-7ad3-9eb4-b56e253e9c54",
    "title": "Some Book",
    "description": "Eligendi sunt explicabo quae qui omnis expedita et. Et incidunt earum recusandae itaque recusandae. Ipsam id id qui.",
    // highlight-start
    "reviews": [
        {
            "@id": "/user/reviews/018dda4b-19a5-7ac7-824d-caa21760643a",
            "@type": "User/Review",
            "id": "018dda4b-19a5-7ac7-824d-caa21760643a",
            "body": "Ut esse esse ea qui. Placeat esse deleniti et est. Deserunt est architecto et et.",
            "rating": 3,
            "book": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54"
        },
        // ...
    ]
    // highlight-end
}
```

</TabItem>

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/User/BookDto.php"
namespace App\ApiResource\User;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;

#[ApiResource(
    // ...
)]
class BookDto
{
    public ?Uuid $id = null;
    public ?string $title = null;
    public ?string $description = null;

    /**
     * @var ?CollectionInterface<int,ReviewDto>
     */
    // highlight-next-line
    #[ApiProperty(readableLink: true)]
    public ?CollectionInterface $reviews = null;}
```

</TabItem>

</Tabs>

## Using the IRI of the Collection

If your resource has a lot of subresources, you might want to change it to use
the IRI of the collection instead.

<Tabs queryString="tab" groupId="collection-subresource">

<TabItem value="output" label="Output">

```json
{
    "@context": "/contexts/User/Book",
    "@id": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54",
    "@type": "User/Book",
    "id": "018dda4b-19be-7ad3-9eb4-b56e253e9c54",
    "title": "Some Book",
    "description": "Eligendi sunt explicabo quae qui omnis expedita et. Et incidunt earum recusandae itaque recusandae. Ipsam id id qui.",
    // highlight-next-line
    "reviews": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54/reviews"
}
```

</TabItem>

<TabItem value="apiresource" label="API Resource">

```php title="src/ApiResource/User/BookDto.php"
namespace App\ApiResource\User;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;

#[ApiResource(
    // ...
)]
class BookDto
{
    public ?Uuid $id = null;
    public ?string $title = null;
    public ?string $description = null;

    /**
     * @var ?CollectionInterface<int,ReviewDto>
     */
    // highlight-next-line
    #[ApiProperty(uriTemplate: '/books/{bookId}/reviews')]
    public ?CollectionInterface $reviews = null;
}
```

</TabItem>

</Tabs>