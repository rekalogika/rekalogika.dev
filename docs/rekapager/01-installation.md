---
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## General

Generally, you need to install the integration package for the framework you are
using. Currently, only [Symfony integration](#symfony-bundle-installation)
exists for now.

Then, [install one or more adapters](adapters) that you need for
your project.

If you are using this library only for batch processing, then installing only
the adapters you need is sufficient.

## Symfony Bundle Installation

Make sure Composer is installed globally, as explained in the [installation
chapter](https://getcomposer.org/doc/00-intro.md) of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory and execute:

```bash
composer require rekalogika/rekapager-bundle
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory, and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/rekapager-bundle
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title="config/bundles.php"
return [
    // ...
    Rekalogika\Rekapager\Bundle\RekalogikaRekapagerBundle::class => ['all' => true],
];
```
</TabItem>
</Tabs>