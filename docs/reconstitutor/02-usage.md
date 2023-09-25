---
title: Usage
---

Because everyone knows about file uploads, we are going to use it as an
example, even if you probably won't use this framework as a means for handling
file uploads.

:::info

We also provide [`rekalogika/file`](../file) framework that handles file uploads
and so much more. It also utilizes this library behind the scenes.

:::

## Class Reconstitutor

This will apply to objects that are instances of a specific class, subclasses
of a specific class, or implement a specific interface.

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