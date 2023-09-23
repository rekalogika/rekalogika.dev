---
title: Associating Files with Doctrine Entities
---

This chapter describes how to create a file property in a Doctrine entity that
you can use to associate a file to an entity, including to store the result of a
file upload.

:::info Preparation

To enable this feature, you need to install the package
`rekalogika/file-association`:

```bash
composer require rekalogika/file-association
```

:::

## Creating a File Property in an Entity

To create a file property in an entity that will be managed by this framework,
you need to:

1. Create a property that accept a `FileInterface`.
2. Add the attribute `#[WithFileAssociation]` to the class.
3. Add the attribute `#[AsFileAssociation]` to the property.

:::caution

The framework assumes that it can get the ID of the entity by calling the method
`getId()`. If your entity uses a different mechanism, you need to implement
`ObjectIdResolverInterface`. See the chapter [Creating Object ID
Resolver](objectidresolver) for more information.

:::

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Association\Attribute\WithFileAssociation;
use Rekalogika\File\Association\Attribute\AsFileAssociation;
use Rekalogika\File\File;

// highlight-next-line
#[WithFileAssociation]
class Product
{
    /**
     * The file property must accept a FileInterface
     */
    // highlight-start
    #[AsFileAssociation]
    private ?FileInterface $image = null;
    // highlight-end

    /**
     * The framework needs the ID of the entity. By default, it will call getId()
     * of the object to get the ID. If your entity doesn't use getId(), read
     * the next section.
     */
    public function getId(): string
    {
        return $this->id;
    }

    //
    // The rest of this class is inconsequential to the framework
    //

    /**
     * This framework reads and writes directly to the properties, even if
     * private. Therefore, you are free to have your own business logic in the
     * getters and setters.
     */
    public function getImage(): FileInterface
    {
        if (date('m-d') == '04-01') { // if today is april 1st
            return new File('shock-image.jpg'); // april fools!
        }

        return $this->image;
    }

    public function setImage(?FileInterface $image): self
    {
        if ($this->status == 'published') {
            throw new \Exception("Cannot change a published product's image");
        }

        $this->image = $image;

        return $this;
    }
}
```

## Working With Entities & Files

You can work with the entities and associated files as usual, and they will work
the way you expect them to work.

### Creating an entity, associating it with a file, & persisting it

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

### Replacing an associated file

```php
use Doctrine\ORM\EntityManagerInterface;
use Rekalogika\File\File;

/** @var EntityManagerInterface $entityManager */
/** @var Product $product */

$newImage = new File('/tmp/newImage.png')
$product->setImage($newImage);
$entityManager->flush();
```

### Updating the metadata of an associated file

```php
use Doctrine\ORM\EntityManagerInterface;

/** @var Product $product */

$product->getImage()?->setName('newImage.png');
```

:::note

Files are not Doctrine entities. File modifications are carried out
immediately, independent of Doctrine's `flush()`.

:::

### Removing an associated file

```php
use Doctrine\ORM\EntityManagerInterface;

/** @var EntityManagerInterface $entityManager */
/** @var Product $product */

$product->setImage(null);
$entityManager->flush();
```

### Removing the entity will also remove the associated file

```php
use Doctrine\ORM\EntityManagerInterface;

/** @var EntityManagerInterface $entityManager */
/** @var Product $product */

$entityManager->remove($product);
$entityManager->flush();
```

## Symfony Integration (or How To Upload Files)

For integrations with various Symfony Components, including HttpFoundation,
Form, and Validator, please read the chapter [Symfony Integration](symfony).

## (alternative) Entity Setup Using Interface

As an alternative to using attributes to mark the file property above, you can
also have your entity implement `FileAssociationInterface`:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\Contracts\File\Association\FileAssociationInterface;

class Product implements FileAssociationInterface
{
    /**
     * The file properties must accept FileInterface
     */
    private ?FileInterface $image = null;

    /**
     * This method gives the list of properties of this class that will
     * be managed by this framework. In this case it tells us that the
     * property 'image' is a file property we need to manage.
     */
    public static function getFileAssociationPropertyList(): array
    {
        return ['image'];
    }

    /**
     * The framework needs the ID of the entity. By default, it will call getId()
     * of the object to get the ID.
     */
    public function getId(): string
    {
        return $this->id;
    }

    //
    // The rest of this class is inconsequential to the framework
    //

    /**
     * This framework reads and writes directly to the properties, even if
     * private. Therefore, you are free to have your own business logic in the
     * getters and setters.
     */
    public function getImage(): FileInterface
    {
        if (date('m-d') == '04-01') { // if today is april 1st
            return new File('shock-image.jpg'); // april fools!
        }

        return $this->image;
    }

    public function setImage(?FileInterface $image): self
    {
        if ($this->status == 'published') {
            throw new \Exception("Cannot change a published product's image");
        }

        $this->image = $image;

        return $this;
    }
}
```

:::note

We recommend using attributes instead of implementing the interface. But
currently using attributes can be less performant than using the interface.

:::