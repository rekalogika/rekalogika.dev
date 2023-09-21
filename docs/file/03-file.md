---
title: Using File & FileRepository
---

When using this framework, the user will primarily work with the
`FileRepositoryInterface` and `FileInterface` objects.
## Working With a File Repository

### Create a file from a string

```php
use Rekalogika\Contracts\File\FileRepositoryInterface;
use Rekalogika\File\FilePointer;

/** @var FileRepositoryInterface $fileRepository */

$file = $fileRepository->createFromString(
    new FilePointer('default', 'key'),
    'Hello World!'
);
```

:::warning

Will overwrite the existing file if it already exists.

:::

### Create a file from a stream

```php
use Psr\Http\Message\StreamInterface;
use Rekalogika\Contracts\File\FileRepositoryInterface;
use Rekalogika\File\FilePointer;

/** @var FileRepositoryInterface $fileRepository */
/** @var resource|StreamInterface $stream */

$file = $fileRepository->createFromStream(
    new FilePointer('default', 'key'),
    $stream
);
```

:::warning

Will overwrite the existing file if it already exists.

:::

### Create a file from a local file

```php
use Rekalogika\Contracts\File\FileRepositoryInterface;
use Rekalogika\File\FilePointer;

/** @var FileRepositoryInterface $fileRepository */

$file = $fileRepository->createFromLocalFile(
    new FilePointer('default', 'key'),
    '/tmp/foo.txt'
);
```

:::warning

Will overwrite the existing file if it already exists.

:::

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

// with a local file, you can also do it without using file repository:
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

A temporary file will be automatically deleted if the `$file` object
is unset or falls out of scope.

:::

## Working With a File

### Reading the file's content

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// as a string
$string = $file->getContent();

// as a stream
$stream = $file->getContentAsStream();

// the stream is an instance of StreamInterface, to get a resource, use detach()
$resource = $stream->detach();
```

### Writing to the file, replacing its content

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// from a string
$file->setContent('Hello World!');

// from a stream or resource
$file->setContentFromStream($resource);
```

### Renaming the file

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

$file->setName('my-photo.jpg');

// if you omit the extension, the library will automatically choose the correct
// extension based on the file's MIME type

$file->setName('my-photo');
$name = (string) $file->getName(); // my-photo.jpg

// if you absolutely don't want an extension, you can set it directly to the
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

// saves the file to /tmp/foo.txt
$localFile = $file->saveToLocalFile('/tmp/foo.txt'); 

// saves the file to a temporary file
$temporaryFile = $file->createLocalTemporaryFile();
```

### Media type (MIME type) handling

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// usually not necessary as the framework will automatically detect media type
$file->setMediaType('image/jpeg'); // sets the media type to image/jpeg

$mediaType = (string) $file->getType(); // image/jpeg
$mediaType = $file->getType()->getName(); // image/jpeg
$mediaType = $file->getType()->getType(); // image
$mediaType = $file->getType()->getSubType(); // jpeg
$mediaType = $file->getType()->getCommonExtensions(); // ['jpg', 'jpeg', 'jpe']
$mediaType = $file->getType()->getExtension(); // jpg
$mediaType = (string) $file->getType()->getDescription(); // JPEG image
```

### File size & last modified time

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

// main metadata
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

// you can also do the following, useful when specifying FQCNs is unwieldy, like
// in Twig templates

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

// each of the following will be saved automatically, and will require two
// roundtrips to the storage backend
$file->setMediaType('image/jpeg');
$file->setName('foo.jpg');

// needs a flush()
$file->get(HttpMetadataInterface::class)?->setDisposition('attachment'); 
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

