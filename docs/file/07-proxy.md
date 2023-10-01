---
title: Lazy-Loading Proxy
---

This chapter describes how to lazy-load a file.

## Getting a Proxy to a File

To get a lazy-loading proxy to a real file, you can use the method `getReference()` of `FileRepositoryInterface`:

```php
use Rekalogika\Contracts\File\FileRepositoryInterface;
use Rekalogika\File\FilePointer;

/** @var FileRepositoryInterface $fileRepository */

$pointer = new FilePointer('default', 'key');

$file = $fileRepository->getReference($pointer);
```

The `$file` variable will contain a `FileInterface` object that is actually a
proxy to the real thing. It behaves the same way as a real `FileInterface`
object, except that it will throw `FileNotFoundException` if the file is not
found when you are trying to use it.

:::info

If the file is already in the cache of the `FileRepositoryInterface`, then the
real file will be returned instead of a proxy.

:::

## Getting The Real File from a Proxy

To get the real file from a proxy, you can call the static method
`FileProxy::getFile()`:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\Contracts\File\FileProxy;

/** @var FileInterface $file */

// $realFile will be a FileInterface object or null if it does not exist
$realFile = FileProxy::getFile($file);
```

:::tip Protip

You can pass any `FileInterface` to `FileProxy::getFile()`. If the file is not
a proxy, it will be returned as is.

:::