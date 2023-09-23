---
title: Metadata
---

This chapter describes how file metadata is handled by this library.

## Primary Metadata

Firstly, `FileInterface` has several methods that returns or sets what can be
considered metadata of the file:

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// Returns the file's name
$name = (string) $file->getName();

// Returns the file's MIME type
$mime = (string) $file->getType();

// Returns the file's size in bytes
$size = $file->getSize();

// Returns the file's last modified time
$lastModified = $file->getLastModified();
```

## Metadata Objects

A `FileInterface` can also have several metadata objects associated with it. A
metadata object is an object that represents a specific type of metadata of the
file.

These are the metadata objects that are currently implemented:

* `RawMetadataInterface`: Represents the raw metadata object. It is a simple
  key-value object. The value can be a string, integer, boolean or null.
* `FileMetadataInterface`: Represents the metadata that every file has: name,
  type, size and last modified time.
* `HttpMetadataInterface`: Represents metadata used in HTTP responses. It is 
  used when streaming the file to the client over HTTP.
* `ImageMetadataInterface`: Contains metadata specific to images, including
  image dimension and orientation.

## Getting Metadata Objects

The `FileInterface` has a `get()` method that returns an associated object of
the file. The caller can use this method to get a specific metadata object of a
file.

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// Returns the FileMetadataInterface object
$fileMetadata = $file->get(FileMetadataInterface::class);

// Returns the ImageMetadataInterface object
$imageMetadata = $file->get(ImageMetadataInterface::class);

// Getting image related metadata
$width = $file->get(ImageMetadataInterface::class)->getWidth();
$height = $file->get(ImageMetadataInterface::class)->getHeight();
```

You can also use string aliases instead of FQCNs. This is useful when specifying
FQCNs is inconvenient, like in Twig templates:

```twig
<img src="{{ image_file|temporary_url }}"
   width="{{ image_file.get('imageMetadata').width }}"
   height="{{ image_file.get('imageMetadata').height }}">
```

## Setting Metadata

Metadata objects can provide methods that can be used to set the metadata value.
For example, the `FileMetadataInterface` has `setName()` and `setType()`, the
`HttpMetadataInterface` has `setDisposition()`, etc. After setting the metadata
using these methods, the caller must call `flush()` to persist the changes.

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\Contracts\File\Metadata\HttpMetadataInterface;

/** @var FileInterface $file */

// Each of the following will be flush automatically individually, and will
// require two roundtrips to the storage backend
$file->setType('image/jpeg');
$file->setName('foo.jpg');

// The following needs an explicit flush(). It will only require one roundtrip
// to the storage backend.
$file->get(FileMetadataInterface::class)?->setType('image/jpeg'); 
$file->get(FileMetadataInterface::class)?->setName('foo.jpg'); 
$file->flush();
```

:::note

Local files don't persist metadata. Changes in the metadata are only valid for
the duration of the request. However, if the file is copied or moved to a
non-local filesystem, the metadata will be copied and persisted by the
destination file.

:::

## Low-Level Metadata Handling

In a non local filesystem, the library stores a file's metadata in a [sidecar
file](https://en.wikipedia.org/wiki/Sidecar_file) in the JSON format. If the
file key is `foo/bar.txt`, the metadata file key will be
`foo/bar.txt.metadata`.

Rationale:

* Supports all filesystem.
* Uniform way of handling metadata with all filesystem.
* Simpler administration. i.e. when copying between different filesystems.
* Implements coarse-grained [remote façade pattern](https://martinfowler.com/eaaCatalog/remoteFacade.html) to improve performance with remote filesystems.

With the local filesystem, the library provides the same interface as above, but
does not save the metadata to a sidecar file. Instead, the metadata is
determined from the file and stored in an in-memory cache. Any changes to the
metadata are not persisted and only valid in the current request, but will be
considered if the caller copies or moves the file to a non-local filesystem.

The caller is expected to treat files in the local filesystem as transient
objects, and expected to copy or move the files to a non-local filesystem if
they wish to store the file.

