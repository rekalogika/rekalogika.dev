---
title: Adapters
---

The library provides a `FileAdapter` class that can be used to adapt or convert
a file object from another library to our `FileInterface`.

```php
use Rekalogika\File\FileAdapter;
use Rekalogika\File\FileInterface;

// $theirFile is any of the supported file object

$ourFile = FileAdapter::adapt($theirFile);
assert($ourFile instanceof FileInterface);
```

Currently supported objects:

* string: assumed to be a path to a local file
* PHP's `SplFileInfo`
* Symfony HttpFoundation `File` (and descendants, including the ubiquitous
  `UploadedFile`). Requires the `rekalogika/file-symfony-bridge` package.
* `FileInterface` of OneupUploaderBundle. Requires the
  `rekalogika/file-oneup-uploader-bridge` package.


