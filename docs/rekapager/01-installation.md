---
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Components

This library is separated into several packages. You can install only what you
need.

Core components, required in all cases:

* `rekalogika/rekapager-contracts`: core interfaces and classes.
* `rekalogika/rekapager-core`: core pager implementation.

Pagination strategies, implementations of `PageableInterface` and `PageInterface`:

* `rekalogika/rekapager-offset-pagination`
* `rekalogika/rekapager-keyset-pagination`
  
Adapters:

* `rekalogika/rekapager-doctrine-collections-adapter`
* `rekalogika/rekapager-doctrine-orm-adapter`
* `rekalogika/rekapager-pagerfanta-adapter`

Framework integration:

* `rekalogika/rekapager-bundle`

## Symfony Bundle Installation

Rekapager provides a Symfony bundle that integrates the library with the Symfony
framework.

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