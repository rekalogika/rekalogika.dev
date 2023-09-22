---
title: Filtering
---

In this framework, 'filtering' is the opportunistic creation & caching of
derived files from a source file. If a filter is applied to a `FileInterface`,
one of these things happens:

1. If the derived file does not exist, process the source and create the
   derived file, then save it.
2. If the derived file exists and newer than the source file, return the
   already made derived file.
3. If the derived file exists and older than the source file, then it is stale,
   the filter will create a derivation out of the source file, then overwrite
   the old derived file.

Currently, there is only one filter available, `ImageResizer`.

## `ImageResizer`

:::note Preparation

You need to install the package `rekalogika/file-image` to use this feature:

```bash
composer require rekalogika/file-image
```

:::

### PHP Usage

In PHP files, you need to inject the `ImageResizer` class to your service
or controller:

```php
use Rekalogika\File\Image\ImageResizer;
use Rekalogika\Contracts\File\FileInterface;

/** @var ImageResizer $imageResizer */
/** @var FileInterface $image */

$resizedImage = $imageResizer
    ->take($image)
    ->resize(100, ImageResizer::ASPECRATIO_SQUARE)
    ->getResult();
```

The first time it is called, the filter will create a 100-pixel-square-cropped
image from the original image. The second time it is called, the filter will
return the already created derived image.

If the original image is updated, the filter will create a new derived image and
overwrite the old one.

### Twig Usage

In Twig templates, you can use the `image_resize` filter. For example:

```twig
<img src="{{ image_file|image_resize(100, 'square')|temporary_url }}" />
```

The example above will give us a temporary URL to a square-cropped image with a
maximum width or height of 100 pixels out of the original image
`image_file`.