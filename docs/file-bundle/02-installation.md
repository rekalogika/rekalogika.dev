---
title: Installation & Configuration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This chapter describes how to install and configure the bundle.

:::info

Most of the information under `rekalogika/file-bundle` is applicable only to
Symfony applications. If you are not using Symfony, please refer to the
[`rekalogika/file`](../file/01-installation.md) documentation instead.

:::

## Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/file-bundle
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory, and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/file-bundle
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title="config/bundles.php"
return [
    // ...
    Rekalogika\File\Bundle\RekalogikaFileBundle::class => ['all' => true],
];
```
</TabItem>
</Tabs>

## Configuration

The bundle should work out of the box without configuration. By default, it will
create a filesystem identified by 'default' that stores files in the directory
`%kernel.project_dir%/var/storage/default`.

The following is the default configuration:

```yaml title="config/packages/rekalogika_file.yaml"
rekalogika_file:
    filesystems:
        # our default filesystem service
        default: rekalogika.file.default_filesystem

    default_filesystem_directory: '%kernel.project_dir%/var/storage/default'
```

## Integration With Flysystem Bundle

If you are using the Flysystem bundle, you can use the filesystems defined in
the Flysystem bundle:

```yaml title="config/packages/rekalogika_file.yaml"
rekalogika_file:
    filesystems:
        # 'default.storage' is the filesystem key under 'flysystem.storages'
        # in config/packages/flysystem.yaml
        default: 'default.storage'
```