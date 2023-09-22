---
title: Metadata
---

This chapter describes how file metadata is handled by this library.

## Metadata Handling

In a non local filesystem, the library stores a file's metadata in a [sidecar
file](https://en.wikipedia.org/wiki/Sidecar_file) in the JSON format. If the
file key is `foo/bar.txt`, the metadata file key will be
`foo/bar.txt.metadata`.

Our rationale:

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

## Metadata Objects

There are several types of metadata, represented by different objects:

* `RawMetadataInterface`: Represents the raw metadata object stored in the
  sidecar file. It is a simple key-value object, with the key being the name of
  the metadata property, and the value being the metadata value. The value can
  be a string, integer, boolean or null.
* `FileMetadataInterface`: Represents the metadata that every file has.
* `HttpMetadataInterface`: Represents metadata used in HTTP responses. It is 
  used when streaming the file to the client over HTTP.
* `ImageMetadataInterface`: Contains metadata specific to images, including
  the image dimension and orientation.

## Getting Metadata from a File

The `FileInterface` has a `get()` method that returns an associated object of
the file. The caller can use this method to get a specific metadata object of a
file.

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// returns the FileMetadataInterface object
$fileMetadata = $file->get(FileMetadataInterface::class);

// returns the ImageMetadataInterface object
$imageMetadata = $file->get(ImageMetadataInterface::class);
```

You can also use string aliases instead of FQCNs. This is useful when specifying
FQCNs is inconvenient, like in Twig templates:

```twig
<img src="{{ image_file|temporary_url }}"
   width="{{ image_file.get('imageMetadata').width }}"
   height="{{ image_file.get('imageMetadata').height }}">
```

