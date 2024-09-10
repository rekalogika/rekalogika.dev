---
title: API Platform Integration
---

API Platform integration is provided by the package
`rekalogika/rekapager-api-platform`.

## Installation

Preinstallation checklists:

* Make sure Composer is installed globally, as explained in the [installation
  chapter](https://getcomposer.org/doc/00-intro.md) of the Composer
  documentation. Run `composer about` to verify.
* Make sure your project has Symfony Flex installed and enabled (it is enabled
  by default). Run `composer why symfony/flex` to verify.

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/rekapager-api-platform
```

## API Changes

This package aims to implement keyset pagination by changing the type of the
existing 'page' query parameter from integer to string.

```diff-json
  {
    "@context": "/api/contexts/Post",
    "@id": "/api/posts",
    "@type": "hydra:Collection",
    "hydra:member": [
      ...
    ],
    "hydra:view": {
      "@type": "hydra:PartialCollectionView",
      "@id": "/api/posts",
-     "hydra:last": "/api/posts?page=21",
-     "hydra:next": "/api/posts?page=2"
+     "hydra:last": "/api/posts?page=q1YqU7KKjtVRKlCy0jXUUcpRssorzcnRUcpXsjLQUSpRslIqVaoFAA",
+     "hydra:next": "/api/posts?page=q1YqU7KqVsrXy0xRsjI2qNVRKlCyMtJRylGyyivNydFRyleyMtBRKlGyAgrVAgA"
    }
  }
```

The change should be transparent to the consumers of the API, and does not
require any changes, as long as they traverse the set by using the URIs as they
are returned by the API.

However, if the consumer currently increments the page number manually on their
side, they need to change how they go to the next page by using the URI provided
by the API (`hydra:next`) instead. Clients that still use the integer page
number (after switching to keyset pagination) will get a 400 Bad Request
response.

The change is opt-in and can be enabled per operation or globally. You will be
able to keep the standard API Platform pagination system, then make sure all the
consumers conform to the required behavior, and enable it only after everyone is
ready.

:::note

The parameter `page=1` is special and will not cause a 400 error response. It
will be treated as a request for the first page.

:::

:::tip Not using JSON-LD?

If your API does not use JSON-LD, your consumer can get the related URIs using
the `Link` header. Example:

```http
Link: </api/posts?page=q1YqU7KqVsrXy0xRsjI2qNVRKlCyMtJRylGyyivNydFRyleyMtBRKlGyAgrVAgA>; rel="next",
      </api/posts?page=q1YqU7KKjtVRKlCy0jXUUcpRssorzcnRUcpXsjLQUSpRslIqVaoFAA>; rel="last",
      <http://127.0.0.1:8000/api/docs.jsonld>; rel="http://www.w3.org/ns/hydra/core#apiDocumentation" 
```

:::

## Provided Components

* A decorator for `OpenApiFactoryInterface` that changes the type of every
  'page' query parameter from integer to string. It should still be compatible
  with API Platform's standard pagination system.
* `PagerNormalizer`: a normalizer for `PagerInterface`.
* `RekapagerExtension`: an extension for API Platform's Doctrine ORM integration
  to use Rekapager.
* `PagerFactory`: creates a `PagerInterface` object from a `PageableInterface`,
  the current operation, and the context. Useful in a state provider or
  processor.
* `RekapagerLinkProcessor`: add the links to the `Link` HTTP header.

## Usage in a State Provider or Processor

In a state provider, you can use `PagerFactoryInterface` to transform any
`PageableInterface` into a `PagerInterface`. Then, you can simply return the
pager instance and our `PagerNormalizer` will output it correctly.

```php
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use Rekalogika\Rekapager\ApiPlatform\PagerFactoryInterface;
use Rekalogika\Rekapager\Doctrine\Collections\SelectableAdapter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;

/**
 * @implements ProviderInterface<Post>
 */
class PostProvider implements ProviderInterface
{
    public function __construct(
        private PagerFactoryInterface $pagerFactory,
    ) {
    }

    public function provide(
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): object|array|null {
        $pageable = ...; // Get or create a PageableInterface object here

        // highlight-next-line
        $pager = $this->pagerFactory->createPager($pageable, $operation, $context);

        return $pager;
    }
}
```

`PagerFactory` should respect these standard API Platform settings in the
operation, as well as their corresponding global settings.

* `paginationItemsPerPage`: the number of items per page.
* `paginationClientEnabled`: whether to enable the pagination settings from the
  client.
* `paginationClientItemsPerPage`: the number of items per page that the client
  requested.
* `paginationMaximumItemsPerPage`

## Doctrine ORM Support

This package supports the pagination for API Platform's Doctrine ORM integration
as an alternative to the default pagination. Its usage is opt-in. You can enable
it per operation using the `rekapager_orm_enabled` extra property:

```php
#[ApiResource(
    extraProperties: [
        'rekapager_orm_enabled' => true
    ]
)]
class Post
{
    // ...
}
```

To enable it globally, you can set it in the configuration:

```yaml title="config/packages/api_platform.yaml"
api_platform:
    defaults:
        extra_properties:
            rekapager_orm_enabled: true
```