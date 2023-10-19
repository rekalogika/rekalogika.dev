---
title: File Uploads Using FilePond
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This chapter describes how to easily create a form for uploading files.

## Features

* Uses [FilePond](https://pqina.nl/filepond/) in the frontend, and [Symfony
  Form](https://symfony.com/doc/current/forms.html) in the backend.
* DX improvement. Simply add a field to your form using `FilePondType` or
  `FilePondCollectionType` and you get file upload, image preview, file removal,
  and all the other features.
* To upload, users can browse the files, use drag and drop, or copy & paste
  them.
* Looks nice out of the box.
* No need to write any JavaScript code. Options are supplied using HTML
  attributes.
* Upload files along with the other properties of your entity, no need to create
  a separate form, controller, or logic just for uploading files and removing
  them.
* Localization support. Automatically detects the user's locale and displays
  messages in the correct language.
* Image preview of uploaded files & images. Also shows the preview for
  previously uploaded files when editing an entity.
* To delete the file, users can use the remove button on the preview and submit the form.
* Ships with the kitchen sink. Includes all the plugins that can be configured
  without Javascript, and all the available locales.

## Installation

Preinstallation checklists:

* Make sure Composer is installed globally, as explained in the [installation
chapter](https://getcomposer.org/doc/00-intro.md) of the Composer documentation.
* Make sure you have
[StimulusBundle](https://symfony.com/bundles/StimulusBundle/current/index.html)
configured in your app.
* Make sure your project has Symfony Flex installed and enabled (it is enabled
  by default).

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/file-filepond
```

If you're using WebpackEncore, install your assets and restart Encore (not
needed if you're using AssetMapper):

<Tabs>
<TabItem value="yarn" label="Yarn">

```bash
yarn install --force
yarn watch
```

</TabItem>

<TabItem value="npm" label="NPM">

```bash
npm install --force
npm run watch
```

</TabItem>
</Tabs>

## Usage for a Single File Property

Simply add your field to your form, using the form type `FilePondType`. Example:

```php
use Rekalogika\File\Bridge\FilePond\FilePondType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class MyFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            // ...
            ->add('image', FilePondType::class, [
                'label' => 'Product Image',
                'required' => false,
                'attr' => [
                    'accept' => 'image/png, image/jpeg'
                ],
                'allow_delete' => true,
            ])
        ;
    }
}
```

If `allow_delete` is true, then the file will be removed on form submission if
the user removes the file using the remove button on the preview.

## Usage for a Collection of Files

First, you need to set up the relation in your entity like what is described in
[Implementing a Collection of Files](collection). Then you can use
`FilePondCollectionType`. Example:

```php
use Rekalogika\File\Bridge\FilePond\FilePondCollectionType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class MyFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            // ...
            ->add('images', FilePondCollectionType::class, [
                'label' => 'Product Images',
                'required' => false,
                'attr' => [
                    'accept' => 'image/png, image/jpeg'
                ],
                'allow_delete' => true,
            ]);
        ;
    }
}
```

If `allow_delete` is true, then the file will be removed on form submission if
the user removes the file using the remove button on the preview.

## Specifying Options

You can specify FilePond options using the `attr` option of the form field. The
example below will disable replacing files.

```php
    ->add('image', FilePondType::class, [
        'attr' => [
            'data-allow-replace' => 'false'
        ],
    ])
```

The list of available options can be found in the [FilePond
properties](https://pqina.nl/filepond/docs/api/instance/properties/)
documentation.

To specify the option, you need to convert from camelCase to kebab-case, and
prefix the property name with `data-`. For example, the property `allowReplace`
becomes `data-allow-replace`.

We also use several plugins that add additional options. You can read the
[documentation of each of the
plugins](https://pqina.nl/filepond/docs/api/plugins/) to see what options are
available.

This is the list of the enabled plugins:

* File Encode
* File Metadata
* File Poster
* File ValidateSize
* File ValidateType
* Image Crop
* Image Edit
* Image ExifOrientation
* Image Preview
* Image Resize
* Image Transform
* Image ValidateSize

## Caveats and Limitations

Due to a [FilePond bug](https://github.com/pqina/filepond/pull/941),
`FilePondCollectionType` uses the [file encode
plugin](https://pqina.nl/filepond/docs/api/plugins/file-encode/) to upload the
files. It works by encoding the files as Base64 strings, and then sending them
to the server. It means the files will be about 33% larger on the wire, it might
also trigger application based firewalls that limit the size of the request
body, and it might exhaust the browser's or the server's memory if the files are
too large.

`FilePondType` is also affected by the bug. But we can afford to tolerate it as
the bug does not appear to affect its function, except that we will get an error
in the console every time a file is added to the field.