---
title: Integration With Symfony Components
---

This chapter describes how to integrate this framework with the typical Symfony
components used to work with files.

:::info Preparation

To enable this feature, you need to install the package
`rekalogika/file-symfony-bridge`:

```bash
composer require rekalogika/file-symfony-bridge
```

:::

## Components Summary

* Adapters to convert HttpFoundation `File` objects to a `FileInterface` and
  vice versa, with special handling for `UploadedFile`.
* `FileResponse` for streaming a `FileInterface` to the client web browser.
* `FileType` form that works with `FileInterface` objects.
* A form transformer `FileTransformer` that you can add to an existing Symfony
  `FileType` fields so that it gives us a `FileInterface` instead of a
  `UploadedFile` object.
* A form extension `FileTypeExtension` that you can optionally register to
  automatically convert all the existing Symfony `FileType` so they all give us
  a `FileInterface`.
* Subclassed `FileValidator` and `ImageValidator` that works with
  `FileInterface` objects.

## Adapters

Converts a HttpFoundation `File` (and child classes, including `UploadedFile`)
to a `FileInterface`:

```php
use Rekalogika\File\Bridge\Symfony\HttpFoundation\FromHttpFoundationFileAdapter;
use Symfony\Component\HttpFoundation\File\File;

/** @var File $httpFoundationFile */

$file = FromHttpFoundationFileAdapter::adapt($httpFoundationFile);
```

However, it is more convenient to use the universal adapter instead, although
the universal adapter still needs this package to be installed.

```php
use Symfony\Component\HttpFoundation\File\File;
use Rekalogika\File\FileAdapter;

/** @var File $httpFoundationFile */

$file = FileAdapter::adapt($httpFoundationFile);
```

Converts a `FileInterface` to a HttpFoundation `File`:

```php
use Rekalogika\File\Bridge\Symfony\HttpFoundation\ToHttpFoundationFileAdapter;
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

$httpFoundationFile = ToHttpFoundationFileAdapter::adapt($file);
```

## Streaming a `FileInterface`

To stream a `FileInterface` to the client's web browser, you can use
`FileResponse`.

```php
use Rekalogika\File\Bridge\Symfony\HttpFoundation\FileResponse;
use Rekalogika\Contracts\File\FileInterface;
use Symfony\Component\HttpFoundation\Response;

class SomeController
{
    public function download(): Response
    {
        /** @var FileInterface $file */
        $file = ...;

        return new FileResponse($file);
    }
}
```

`FileResponse` accepts additional optional parameters:

* `$status`: HTTP status code. Default: `200`.
* `$headers`: Array of additional headers. Default: `[]`.
* `$disposition`: Force the first parameter of the `Content-Disposition` header
  to the specified value. It can be `attachment` or `inline`. The filename is
  automatically taken from the metadata.

## Forms

:::tip Protip

You might want to use our `FilePondType` form type instead. See the chapter
[File Upload With FilePond](./file-upload-filepond) for more information.

:::

We provide a `FileType` that works with `FileInterface` objects. This is
basically the same as Symfony's `FileType` with a transformer built-in:

```php
use Rekalogika\File\Bridge\Symfony\Form\FileType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class SomeFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            // ...
            ->add('file', FileType::class, [
                // ...
            ])
        ;
    }
}
```

If for some reason you cannot change the form type, you can use
`FileTransformer` to transform existing fields. It should work with Symfony's
`FileType` and any third-party form types with a compatible behavior:

```php
use Rekalogika\File\Bridge\Symfony\Form\FileTransformer;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class SomeFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('file', FileType::class, [
                // ...
            ]);

        $builder->get('file')->addModelTransformer(new FileTransformer());
    }
}
```

You can also modify all the existing Symfony's `FileType` fields en masse by
registering the `FileTypeExtension`:

```yaml title=config/services.yaml
services:
    Rekalogika\File\Bridge\Symfony\Form\FileTypeExtension:
        tags:
            - { name: form.type_extension }
```

## Validators

We provide `File` and `Image` validators. They are the same as Symfony's
`File` and `Image` validators, except that they work with `FileInterface`
objects instead of HttpFoundation `File` objects:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Bridge\Symfony\Constraints\File as FileConstraint;
use Rekalogika\File\Bridge\Symfony\Constraints\Image as ImageConstraint;

class Product
{
    #[ImageConstraint(minWidth: '1000']
    private ?FileInterface $photo = null;

    #[ImageConstraint(maxSize: '10000k']
    private ?FileInterface $manual = null;

    // ...
}
```

:::caution

Due to how the adapters work, some validator functions might not work
correctly, like those that check file names.

:::