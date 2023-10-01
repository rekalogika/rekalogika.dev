---
title: Null File
---

This chapter describes the null object pattern applied to files.

## The Missing File Problem

One of the most common problems when working with files is how to handle the
case when the business logic necessitates that a file must be present, but in
actuality, it is not. For example, if an image has been assigned to a product in
the past, the product has a record of it and knows that it has an image. But in
the storage, the image is missing for some reason.

We can use a standard null value, but by doing so, we will have to check for
null every time we want to use the file, as well as do the branching logic
everywhere. This is tedious and error-prone. Such cases also rarely happen, and
therefore the handling logic will also be rarely tested. When it happens, it
often results in a fatal error, which is not a good user experience.

## Solution: Use a `NullFile` Object

`NullFile` is a [null object
pattern](https://martinfowler.com/eaaCatalog/specialCase.html) implementation
for files. It is a `FileInterface` that represents the missing file. It appears
like a real file to the caller and can be considered a real file by most parts
of the code.

Instead of a fatal error, your user will now be able to see if there is a file,
but something is wrong with it, and will be able to tell the admin about it. The
admin will be able to act on it, for example, by re-uploading the file or
restoring it from backup.

The `NullFile` does that without much effort from the developer.

A `NullFile` will only stop acting like a real file if the caller is trying to
operate on it that would cause a side effect. For example, you will not be able
to copy a `NullFile` to another location, to change its content, etc. If that
happens, `NullFile` will throw a `NullFileOperationException`.

## Usage

:::info Preparation

You need to install the package `rekalogika/file-null` to use this
feature:

```bash
composer require rekalogika/file-null
```

:::

An example on how to use `NullFile` in your entity:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\Domain\File\Null\NullFile;

class Product {
    private ?FileInterface $image = null;

    public function __construct(FileInterface $image) {
        $this->image = $image;
    }

    // The image must never be null. So, if the image does not exist, we
    // substitute it with a NullFile instead.
    public function getImage(): FileInterface {
        return $this->image ?? new NullFile();
    }
}
```

## Checking for a Null File

All null files implement the `NullFileInterface`. You can use this interface to
check if a file is null:

```php
use Rekalogika\Contracts\File\NullFileInterface;

/** @var FileInterface $file */

if ($file instanceof NullFileInterface) {
    // The file is null.
}
```

## `InvalidFile`: a Null File That is Also an Exception

There is also a null file called `InvalidFile` which is identical to the
standard `NullFile`, but also extends `Exception`. The idea is that it contains
the stack trace where it was instantiated that can help you debug the problem,
if you can log it somewhere. You can also throw it somewhere down the line if
you need it.

To log an `InvalidFile` you can do something like the following.

```php
use Rekalogika\Contracts\File\FileInterface;
use Psr\Log\LoggerInterface;

/** @var FileInterface $file */
/** @var LoggerInterface $logger */

if ($file instanceof InvalidFile) {
    $logger->error('Invalid file', [
        'exception' => $file,
    ]);
}
```