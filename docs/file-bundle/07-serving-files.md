---
title: Serving Files
---

This chapter describes how to serve files to the client web browser.

## Streaming Files in a Symfony Controller

:::info Preparation

You need to install the package `rekalogika/file-symfony-bridge` to use this
feature:

```bash
composer require rekalogika/file-symfony-bridge
```

:::

To send a file to the web browser, you can use `FileResponse`:

```php
use Rekalogika\File\Bridge\Symfony\HttpFoundation\FileResponse;
use Rekalogika\Contracts\File\FileInterface;
use Symfony\Component\HttpFoundation\Response;

class SomeController
{
    public function download(): Response
    {
        /** @var FileInterface $file */
        $file = ...;

        return new FileResponse($file);
    }
}
```

## Generate a Temporary URL to a File

Rather than creating a controller action to serve a file for every possible
situation, it is more convenient to generate a temporary URL to a file.

:::info Preparation

You need to install the package `rekalogika/file-server` to use this feature:

```bash
composer require rekalogika/file-server
```

If you are not using Symfony Flex, read the documentation of
[`rekalogika/file-bundle`](../file-bundle/installation) and [`rekalogika/temporary-url-bundle`](../temporary-url-bundle) to
learn how to register the required bundles.

:::

### PHP Usage

Wire in the `TemporaryUrlGeneratorInterface` service, and use the
`generateUrl()` method to generate a temporary URL to a file. It accepts either
a `FileInterface` or a `FilePointerInterface`.

```php
use Rekalogika\TemporaryUrl\TemporaryUrlGeneratorInterface;
use Rekalogika\File\FileInterface;
use Rekalogika\File\FilePointerInterface;

/** @var TemporaryUrlGeneratorInterface $temporaryUrlGenerator */
/** @var FileInterface|FilePointerInterface $file */

$url = $temporaryUrlGenerator->generateUrl($file);
```

### Twig Usage

In Twig templates, you can use the `temporary_url` filter to generate a
temporary URL to a file.

```twig
<a href="{{ file|temporary_url }}" {{ temporary_url_autoexpire() }}>
    Click here to download
</a>
```

With images, a convenient pattern is to chain the `temporary_url` filter with
the `image_resize` filter from the `rekalogika/file-image` package.

```twig
<img src="{{ my_image|image_resize(200)|temporary_url }}" />
```

:::info

The `image_resize` filter requires the `rekalogika/file-image` package:

```bash
composer require rekalogika/file-image
```

Read more in the [Filtering](filtering) section.

:::

### More Information

The `generateUrl()` method and the `temporary_url` Twig filter accept several
options. Read the documentation of [`rekalogika/temporary-url-bundle`](../temporary-url-bundle) to
learn more.
