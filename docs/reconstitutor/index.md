---
title: rekalogika/reconstitutor
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This library provides a thin layer that sits above Doctrine events to help you
reconstitute/hydrate your entities. It lets you augment Doctrine's hydration
with your logic in a concise and expressive class.

After Doctrine hydrates an object from the database, this framework gives you
the control to hydrate additional properties not handled by Doctrine, without
having to deal with the peculiarities of Doctrine events and Unit of Work.
Similar things also happen when the object is persisted to the database, or
removed.

The most common case of this type of task is for handling file uploads, of
which many specialized libraries have already been written. But plenty of other
cases exist:

* A lazy-loading proxy that fetches the real resource using an API call.
* Linking objects that are managed by different object managers, or non-Doctrine
  entities.

These days we usually call the process *hydration*. *Reconstitution* is the term
used by Eric Evans in the Blue Book: *"Domain-Driven Design: Tackling Complexity
in the Heart of Software"*.

Features
--------

* Simple declaration in a class. You can create a reconstitutor class to handle
  the reconstitution of a specific entity class, entities that implement a
  specific interface, entities in a class hierarchy, or those with a specific
  PHP attribute.
* Our abstract classes provide `get()` and `set()` methods as a convenience.
  They let you work with the properties directly, bypassing getters and setters.
  It is the best practice in reconstitutions as it frees you to have business
  logic in the getters and setters.
* The `get()` and `set()` methods are forwarders to a custom implementation of
  Symfony's `PropertyAccessorInterface`. Therefore, you can use the same
  exceptions defined in `PropertyAccessorInterface`.
* It has what we think is the correct behavior. It asks your reconstitutor to
  save only after Doctrine has successfully saved the object. It doesn't rely on
  Doctrine seeing the object being dirty before `flush()`-ing. i.e. your
  entities don't have to modify a Doctrine-managed property —like
  `$lastUpdated`— just to make sure the correct Doctrine event will be fired.

Installation
------------

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/reconstitutor
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory, and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/reconstitutor
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title=config/bundles.php
return [
    // ...
    Rekalogika\Reconstitutor\RekalogikaReconstitutorBundle::class => ['all' => true],
];
```
</TabItem>
</Tabs>

Usage
-----

Because everyone knows about file uploads, we are going to use it as an
example, even if you probably won't use this framework as a means for handling
file uploads.

:::info

Speaking about file uploads, we also provide [`rekalogika/file`](../file)
framework that handles file uploads and much more. It also utilizes this library
behind the scenes.

:::

Suppose you have an `Order` object that stores a payment receipt in the
`paymentReceipt` property:

```php
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Uid\UuidV7;

class Order
{
    private string $id;
    private ?File $paymentReceipt = null;

    public function __construct()
    {
        $this->id = new UuidV7;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getPaymentReceipt(): ?File
    {
        return $this->paymentReceipt;
    }

    public function setPaymentReceipt(File $paymentReceipt): void
    {
        $this->paymentReceipt = $paymentReceipt;
    }
}
```

During the fetching of the object from the database, Doctrine will instantiate
the object and hydrate `$id` and other properties that it manages. Afterward, it
will be our reconstitutor's turn to handle the `$paymentReceipt` property.
Similar things also happen when the object is persisted to the database, or
removed.

```php
use Rekalogika\Reconstitutor\AbstractClassReconstitutor;
use Symfony\Component\HttpFoundation\File\File;

/**
 * @extends AbstractClassReconstitutor<Order>
 */
final class OrderReconstitutor extends AbstractClassReconstitutor
{
    /**
     * The class that this reconstitutor manages. It can also be a super class
     * or an interface.
     */
    public static function getClass(): string
    {
        return Order::class;
    }

    /**
     * When the object is being saved, we check if the paymentReceipt has been
     * just uploaded. If it is, we save it to a file.
     */
    public function onSave(object $order): void
    {
        $path = sprintf('/tmp/payment_receipt/%s', $order->getId());

        $file = $this->get($order, 'paymentReceipt');

        if ($file instanceof UploadedFile) {
            file_put_contents($path, $file->getContent());
            $this->set($order, 'paymentReceipt', new File($path));
        }
    }

    /**
     * When the object is being loaded from the database, we check if the
     * supposed payment receipt is already saved. If it is, then we load the
     * file to the property.
     */
    public function onLoad(object $order): void
    {
        $path = sprintf('/tmp/payment_receipt/%s', $order->getId());

        if (file_exists($path)) {
            $file = new File($path);
        } else {
            $file = null;
        }

        $this->set($order, 'paymentReceipt', $file);
    }

    /**
     * If the order is being removed, we remove the associated payment receipt
     * here.
     */
    public function onRemove(object $order): void
    {
        $path = sprintf('/tmp/payment_receipt/%s', $order->getId());

        if (file_exists($path)) {
            unlink($path);
        }
    }
}
```

Reconstitutor Abstract Class
----------------------------

The example above uses `AbstractClassReconstitutor` where our target object is
matched using the class provided by `getClass()`. There is also
`AbstractAttributeReconstitutor` that operates on objects that have a specific
PHP attribute.