---
title: Working With Entities & Files
---

You can work with the entities and associated files as usual, and they will work
pretty much the way you expect them to work.

## Creating an entity, adding it to a file, & persisting it

```php
use Doctrine\ORM\EntityManagerInterface;
use Rekalogika\File\File;

/** @var EntityManagerInterface $entityManager */

$product = new Product();
$image = new File('/tmp/image.png');
$product->setImage($image);

$entityManager->persist($product);
$entityManager->flush();
```

:::note

The framework will copy the file to the storage location, and leave the original
file alone. It is the responsibility of the caller to delete the original if it
wishes to do so.

If the file arrived from a file upload, PHP will delete the file automatically
when the request ends.

:::

## Replacing an associated file

```php
use Doctrine\ORM\EntityManagerInterface;
use Rekalogika\File\File;

/** @var EntityManagerInterface $entityManager */
/** @var Product $product */

$newImage = new File('/tmp/newImage.png')
$product->setImage($newImage);
$entityManager->flush();
```

## Updating the metadata of an associated file

```php
use Doctrine\ORM\EntityManagerInterface;

/** @var Product $product */

$product->getImage()?->setName('newImage.png');
```

:::note

Files are not Doctrine entities. File modifications are carried out
immediately, independent of Doctrine's `flush()`.

:::

## Removing an associated file

```php
use Doctrine\ORM\EntityManagerInterface;

/** @var EntityManagerInterface $entityManager */
/** @var Product $product */

$product->setImage(null);
$entityManager->flush();
```

## Removing the entity will also remove the associated file

```php
use Doctrine\ORM\EntityManagerInterface;

/** @var EntityManagerInterface $entityManager */
/** @var Product $product */

$entityManager->remove($product);
$entityManager->flush();
```

## Copying Files Between Entities

```php
use Doctrine\ORM\EntityManagerInterface;

/** @var EntityManagerInterface $entityManager */
/** @var Product $product1 */
/** @var Product $product2 */

$product2->setImage($product1->getImage());
$entityManager->flush();
```

## Moving Files Between Entities

```php
use Doctrine\ORM\EntityManagerInterface;

/** @var EntityManagerInterface $entityManager */
/** @var Product $product1 */
/** @var Product $product2 */

$product2->setImage($product1->getImage());
$product1->setImage(null);
$entityManager->flush();
```