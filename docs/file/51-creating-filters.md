---
title: Creating Filters
---

This chapter describes the concept of file derivation and how to create filters.

:::note

This chapter is intended for developers who want to create their own filters.
End users who simply want to use the ready-made filters can skip this chapter.

:::

## Derivation

`FileInterface` supports what we call 'derivation'. A file can have one or more
derivation of itself. For example, an image file can have a thumbnail, medium,
and large derivation. A derived file can also be derived further. For example, a
thumbnail can be in the original aspect ratio, or square-cropped.

`FileInterface` provides the method `getDerivation()` that returns a
`FilePointer` to the derived file. Our `File` objects ensure that a derivation
cannot be made if the file is in the local filesystem, or in an ad-hoc
filesystem, to avoid cluttering the local filesystem with unwanted files.

## Low-Level Implementation

At the low level, a derivation is created simply by appending the derivation ID
to the original file's key. For example, if the original file's key is:

```
entity/ffa87ef3fc5388bc8b666e2cec17d27cc493d0c1/image/e5/80/72/6d/31337
```

then, with the derivation ID '100px', the derived file's key becomes:

```
entity/ffa87ef3fc5388bc8b666e2cec17d27cc493d0c1/image/e5/80/72/6d/31337.d/100px
```

Deleting the original file will also result in the deletion of all of its
derivations.

Derivation can be nested. Suppose the derived file above will be derived further
with the derivation ID of 'square', then the derived file's key becomes:

```
entity/ffa87ef3fc5388bc8b666e2cec17d27cc493d0c1/image/e5/80/72/6d/31337.d/100px.d/square
```

:::caution

Because each derivation step requires a roundtrip to the storage backend, it is
not recommended to nest derivations too deep.

:::

## Filters

Derivation is the building block of filters. A filter is a service that creates
a derived file from a source file. A filter can be applied to a `FileInterface`
and does the following:

1. Obtain the original file.
2. Determine the derivation ID from the parameters provided by the caller. For
   example, if the caller wants to get a square thumbnail of an image, the
   filter can use the derivation ID like 'thumbnail-square'.
3. Call `FileInterface::getDerivation()` to get a pointer to the derived file.
4. Call `FileRepository::get()` to get the derived file.
   1. If the derived file does not exist, write the derived file to it.
   2. If the derived file exists and newer than the original file, return it.
   3. If the derived file exists and older than the original file, create a
      derivation out of the original file, then overwrite the old derived file.

Our `AbstractFileFilter` below can be used to create filters that automate
the above process and streamline the creation of derived files.

## Developing Filters Using `AbstractFileFilter`

:::note Preparation

You need to install the package `rekalogika/file-derivation` to use this feature:

```bash
composer require rekalogika/file-derivation
```

:::

To create a filter class, you can extend `AbstractFileFilter`, create a method
(or more) for the callers to specify the filtering parameters, and implement all
the abstract methods.

The following is an example filter class that creates a derived file by (rather
uselessly) appending a text to the original content:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Derivation\Filter\AbstractFileFilter;
use Rekalogika\File\TemporaryFile;

class TextAppender extends AbstractFileFilter
{
    private string $text;

    /**
     * Your custom method that provides the parameters
     */
    public function appendText(string $text): self
    {
        assert(ctype_alpha($text)); // ensure alpha characters only
        $this->text = $text;

        return $this;
    }

    #[\Override]
    protected function getDerivationId(): string
    {
        return 'append_' . $this->text;
    }

    #[\Override]
    protected function process(): FileInterface
    {
        $originalContent = $this->getSourceFile()->getContent();

        return new TemporaryFile::createFromString($originalContent . $this->text);
    }
}
```

If you are using autoconfiguration, then you are all set. Otherwise, you need
to tag your class with `rekalogika.file.derivation.filter`:

```yaml title=config/services.yaml
services:
    App\TextAppender:
        tags:
            - { name: 'rekalogika.file.derivation.filter' }
```

A caller will be able to use the above filter like the following:

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var TextAppender $textAppender */
/** @var FileInterface $file */

$derivedFile = $textAppender
    ->take($file)
    ->appendText('foo')
    ->getResult();
```
