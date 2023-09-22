---
title: Installation & Configuration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section explains how to install and configure the `rekalogika/file`
package in a PHP project.

:::info

If you are developing a Symfony application, you might want to install the
bundle instead. See
[`rekalogika/file-bundle`](../file-bundle/02-installation.md) for more
information.

:::

## Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

Open a command console, enter your project directory and execute:

```bash
composer require rekalogika/file-bundle
```

## Initialization

In your application, initialize the file repository like the following example:

```php
use Rekalogika\File\FileFactory;
use League\Flysystem\Filesystem;
use League\Flysystem\Local\LocalFilesystemAdapter;

$fileFactory = new FileFactory(
    filesystems: [
        'default' => new Filesystem(new LocalFilesystemAdapter('/var/storage')),
    ]
);

/** @var FileRepositoryInterface */
$fileRepository = $fileFactory->getFileRepository();
```

Read Flysystem documentation on how to initialize the filesystem. Once you have
a Flysystem filesystem, you can pass it to our `FileFactory`. Then, use the
`FileFactory` to create a `FileRepositoryInterface` instance.