---
title: Installation & Configuration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## With a Symfony Application

Installation within a Symfony application.

:::info

This section is only applicable in a Symfony application. For standalone usage
please refer to the [standalone installation](#standalone-installation) section
below.

:::

### Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory and execute:

```bash
composer require rekalogika/file-bundle
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/file-bundle
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title=config/bundles.php
return [
    // ...
    Rekalogika\File\Bundle\RekalogikaFileBundle::class => ['all' => true],
];
```
</TabItem>
</Tabs>

### Configuration

The bundle should work out of the box without configuration. By default, it will
create a filesystem identified by 'default' that stores files in the directory
`%kernel.project_dir%/var/storage/default`.

The following is the default configuration:

```yaml title=config/packages/rekalogika_file.yaml
rekalogika_file:
    filesystems:
        # our default filesystem service
        default: rekalogika.file.default_filesystem

    default_filesystem_directory: '%kernel.project_dir%/var/storage/default'
```

### Integration With Flysystem Bundle

If you are using the Flysystem bundle, you can use the filesystems defined in
the Flysystem bundle:

```yaml title=config/packages/rekalogika_file.yaml
rekalogika_file:
    filesystems:
        # 'default.storage' is the filesystem key under 'flysystem.storages'
        # in config/packages/flysystem.yaml
        default: 'default.storage'
```

## Standalone Installation

Installation without a framework, or with another framework.

:::info

This section is not necessary with a Symfony application. With a Symfony
application, please refer to the [with a Symfony
application](#with-a-symfony-application) section above.

:::

### Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

Open a command console, enter your project directory and execute:

```bash
composer require rekalogika/file-bundle
```

### Configuration

Initialize the file repository using the following example:

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