---
title: Using File & FileRepository
---

When using this framework, the user will primarily work with the
`FileRepositoryInterface` and `FileInterface` objects.
## Working With the File Repository

### Create a file

:::caution

These methods overwrite the existing file if it already exists.

:::

```php
use Rekalogika\Contracts\File\FileRepositoryInterface;
use Rekalogika\File\FilePointer;

/** @var FileRepositoryInterface $fileRepository */

// Create a file from a string
$file = $fileRepository->createFromString(
    new FilePointer('default', 'key'),
    'Hello World!'
);

// Create a file from a stream (resource or PSR-7 StreamInterface)
$file = $fileRepository->createFromStream(
    new FilePointer('default', 'key'),
    $stream
);

// Create a file from a local file
$file = $fileRepository->createFromLocalFile(
    new FilePointer('default', 'key'),
    '/tmp/foo.txt'
);

```

### Get a file

```php
use Rekalogika\Contracts\File\FileRepositoryInterface;
use Rekalogika\Contracts\File\Exception\File\FileNotFoundException;
use Rekalogika\File\FilePointer;

/** @var FileRepositoryInterface $fileRepository */

// get() will throw an exception if the file is not found
try {
    $file = $fileRepository->get(new FilePointer('default', 'key'));
} catch (FileNotFoundException $e) {
    // File not found
}

// tryGet() will return null if the file is not found
$file = $fileRepository->tryGet(new FilePointer('default', 'key'));

// With a local file, you can also do it without using file repository:
try {
    $file = new File('/path/to/file');
} catch (FileNotFoundException $e) {
    // File not found
}
```

### Delete a file

```php
use Rekalogika\Contracts\File\FileRepositoryInterface;
use Rekalogika\File\FilePointer;

/** @var FileRepositoryInterface $fileRepository */

$fileRepository->delete(new FilePointer('default', 'key'));
```

### Copy and move a file

```php
use Rekalogika\Contracts\File\FileRepositoryInterface;
use Rekalogika\File\FilePointer;

/** @var FileRepositoryInterface $fileRepository */

$newFile = $fileRepository->copy(
    new FilePointer('default', 'key'),
    new FilePointer('otherfilesystem', 'destinationkey')
);

$newFile = $fileRepository->move(
    new FilePointer('default', 'key'),
    new FilePointer('otherfilesystem', 'destinationkey')
);
```

:::tip

You can also use a `FileInterface` as the origin or the destination
of the move or copy operation.

:::

### Create a temporary file

```php
use Rekalogika\Contracts\File\FileRepositoryInterface;

/** @var FileRepositoryInterface $fileRepository */

$file = $fileRepository->createTemporaryFile();
```

:::note

The temporary file is represented by a special `TemporaryFile` that will be
automatically deleted if it is unset or falls out of scope.

:::

## Working With a File

### Reading the file's content

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// As a string
$string = $file->getContent();

// As a stream
$stream = $file->getContentAsStream();

// getContentAsStream() returns a PSR-7 StreamInterface, to get a plain PHP
// resource, call detach() on it
$resource = $stream->detach();
```

### Writing to the file, replacing its content

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// From a string
$file->setContent('Hello World!');

// From a stream or resource
$file->setContentFromStream($resource);
```

### Renaming the file

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

$file->setName('my-photo.jpg');

// If you omit the extension, the library will automatically choose the correct
// extension based on the file's MIME type

$file->setName('my-photo');
$name = (string) $file->getName(); // my-photo.jpg

// If you absolutely don't want an extension, you can set it directly to the
// metadata

$file->get(FileMetadataInterface::class)->setFileName('my-photo');
$file->flush();

// getName() returns FileNameInterface that provides several convenient methods
// to get information about the filename

$file->setName('foo.png');

$name = (string) $file->getName(); // foo.png
$fullName = $file->getName()->getFull(); // foo.png
$baseName = $file->getName()->getBase(); // foo
$extension = $file->getName()->getExtension(); // png
$hasExtension = $file->getName()->hasExtension(); // true
```

### Saving to a local file

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// Saves the file to /tmp/foo.txt
$localFile = $file->saveToLocalFile('/tmp/foo.txt'); 

// Saves the file to a temporary file
$temporaryFile = $file->createLocalTemporaryFile();
```

### Media type (MIME type) handling

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// Setting the MIME type is usally not necessary as the framework will
// automatically detect media type
$file->setType('image/jpeg'); // sets the media type to image/jpeg

$type = (string) $file->getType(); // image/jpeg
$type = $file->getType()->getName(); // image/jpeg
$type = $file->getType()->getType(); // image
$type = $file->getType()->getSubType(); // jpeg
$type = $file->getType()->getCommonExtensions(); // ['jpg', 'jpeg', 'jpe']
$type = $file->getType()->getExtension(); // jpg
$type = (string) $file->getType()->getDescription(); // JPEG image
```

### File size & last modified time

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// Main metadata
$size = $file->getSize(); // file size in bytes
$lastModified = $file->getLastModified(); // last modified time
```

### Image metadata

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\Contracts\File\Metadata\ImageMetadataInterface;

/** @var FileInterface $file */

$width = $file->get(ImageMetadataInterface::class)?->getWidth(); 
$height = $file->get(ImageMetadataInterface::class)?->getHeight(); 

// You can also use string identifiers, useful when specifying FQCNs is
// unwieldy, like in Twig templates

$width = $file->get('imageMetadata')?->getWidth(); 
$height = $file->get('imageMetadata')?->getHeight(); 
```

### HTTP metadata

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\Contracts\File\Metadata\HttpMetadataInterface;

/** @var FileInterface $file */

// Setting the disposition value, will be used in the Content-Disposition header
// when the file is downloaded
$file->get(HttpMetadataInterface::class)?->setDisposition('attachment'); 
$file->flush();

// Getting all the HTTP headers that will be used when the file is downloaded
$httpHeaders = $file->get(HttpMetadataInterface::class)?->getHeaders(); 
```

### Flushing metadata

Updating metadata using a high-level method (those on `FileInterface`) will be
saved automatically. But using a low-level method (under
`FileInterface::get()`), you have to call `flush()` manually. You can take
advantage of this so that multiple metadata updates are saved in a single round
trip.

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

### File Pointer & comparison

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// get pointer from a FileInterface
$filePointer = $file->getPointer();

// determine if two File/FilePointer objects point to the same file
$isEqual = $filePointer->isEqualTo($file);
$isEqual = $file->isEqualTo($filePointer);
$isEqual = $file1->isEqualTo($file2);
$isEqual = $filePointer1->isEqualTo($filePointer2);
```

