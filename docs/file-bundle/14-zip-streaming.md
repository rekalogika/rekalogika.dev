---
title: Streaming a ZIP File of Files
---

This chapter explains how to stream-download a ZIP file containing several
files to the client's web browser.

:::info Preparation

You need to install the package `rekalogika/file-zip` to use this feature:

```bash
composer require rekalogika/file-zip
```

:::

## Concepts

A `DirectoryInterface` represents a tree of files. It contains entries of
`FileInterface`, `FilePointerInterface`, or other `DirectoryInterface`. The
`FileZip` service turns a `DirectoryInterface` into a ZIP file.

The ZIP file is created on the fly and streamed to the client's web browser,
and does not involve a temporary file. Therefore, the operation is relatively
inexpensive.

:::note

We are using the [ZipStream-PHP](https://github.com/maennchen/ZipStream-PHP)
package under the hood.

:::

## Basic Usage

The `FileZip::streamZip()` method takes a `DirectoryInterface` and streams
a ZIP file to the client's web browser.

```php
use Rekalogika\File\Zip\FileZip;
use Rekalogika\Contracts\File\DirectoryInterface;
use Rekalogika\File\Directory;
use Rekalogika\Contracts\File\FileInterface;

/** @var FileZip $fileZip */
/** @var FileInterface $file1 */
/** @var FileInterface $file2 */
/** @var FileInterface $file3 */

$directory = new Directory('my_zip_file', [$file1, $file2, $file3]);
$fileZip->streamZip($directory);
```

## In Controllers

To get an HTTP Foundation `Response` object, use
`FileZip::createZipResponse()`:

```php
use Rekalogika\File\Zip\FileZip;
use Rekalogika\File\Directory;
use Rekalogika\Contracts\File\FileInterface;

class SomeController {
    public function download(FileZip $fileZip): Response
    {
        /** @var FileInterface $file1 */
        /** @var FileInterface $file2 */
        /** @var FileInterface $file3 */
        
        $directory = new Directory('my_zip_file', [$file1, $file2, $file3]);

        return $fileZip->createZipResponse($directory);
    }
}
```

## Dealing With Doctrine Collections Containing Files

To convert a Doctrine collection of files into a `DirectoryInterface`, you can
use `FileCollection`.

```php
use Doctrine\Common\Collections\Collection;
use Rekalogika\Domain\File\Association\Entity\FileCollection;
use Rekalogika\Contracts\File\DirectoryInterface;
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Directory;
use Rekalogika\File\Zip\FileZip;

class SomeController {
    public function download(Product $product, FileZip $fileZip): Response
    {
        /** @var Collection<int,Images> */
        $images = $product->getImages();

        /** @var FileCollection */
        $directoryOfImages = new FileCollection($images, 'product-image');

        return $fileZip->createZipResponse($directoryOfImages);
    }
}
```

## Returning a `DirectoryInterface` in the Getter Itself

`FileCollection` implements both `DirectoryInterface` and `Collection`. So, it
is safe to return a `FileCollection` in the getter because it won't change the
existing behavior of your getter.

```php
use Rekalogika\Domain\File\Association\Entity\FileCollection;

class Product
{
    // ...

    /**
     * @return FileCollection<int,Image>
     */
    public function getImages(): FileCollection
    {
        return new FileCollection(
            $this->images,
            sprintf('product %s images', $this->getName())
        );
    }

    // ...
}
```

Then, you can do something like this in the controller:

```php
use Rekalogika\File\Zip\FileZip;

class SomeController {
    public function download(Product $product, FileZip $fileZip): Response
    {
        return $fileZip->createZipResponse($product->getImages());
    }
}
```

## Creating a Link to the ZIP File

The framework registers a temporary URL handler. So, you can simply use
`TemporaryUrlGeneratorInterface::generateUrl()` to generate a temporary URL
to the ZIP file.

```php
use Rekalogika\TemporaryUrl\TemporaryUrlGeneratorInterface;

/** @var TemporaryUrlGeneratorInterface $temporaryUrlGenerator */

/** @var FileCollection */
$images = $product->getImages();

$url = $temporaryUrlGenerator->generateUrl($images);
```

## In Twig Templates

In Twig templates, you can easily generate URLs to a ZIP file by using the
`temporary_url` filter with a `DirectoryInterface` as the input.

```twig
<a href="{{ product.images|temporary_url }}" {{ temporary_url_autoexpire() }}>
    Download Product Images
</a>
```