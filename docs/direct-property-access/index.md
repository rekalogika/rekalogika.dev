---
title: rekalogika/direct-property-access
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Implementation of Symfony's `PropertyAccessorInterface` that reads and writes
directly to the object's properties, bypassing getters and setters.

Installation
------------

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/direct-property-access
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory, and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/direct-property-access
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title=config/bundles.php
return [
    // ...
    Rekalogika\DirectPropertyAccess\RekalogikaDirectPropertyAccessBundle::class => ['all' => true],
];
```
</TabItem>

<TabItem value="nonsymfony" label="Non-Symfony Projects">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/direct-property-access
```
</TabItem>
</Tabs>

Usage
-----

In Symfony projects, you can autowire `DirectPropertyAccessor`. In other
projects, you can simply instantiate it.

Read [Symfony's PropertyAccess
documentation](https://symfony.com/doc/current/components/property_access.html)
for more information on how to use it. The difference is that
`DirectPropertyAccessor` does not call any of the object's methods, but reads
and writes directly to the object's properties, even if they are private.

Caveats
-------

Currently does not support arrays and paths beyond one level deep.

Credits
-------

This project took inspiration from the following projects.

* [Symfony Property Access](https://github.com/symfony/property-access)
* [kwn/reflection-property-access](https://github.com/kwn/reflection-property-access)
* [nelmio/alice](https://github.com/nelmio/alice/blob/master/src/PropertyAccess/ReflectionPropertyAccessor.php)