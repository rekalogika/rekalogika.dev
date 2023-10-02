---
title: Associating Files to Doctrine Entities
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

1. Create a property that accepts a `FileInterface`.
2. Add the attribute `#[WithFileAssociation]` to the class.
3. Add the attribute `#[AsFileAssociation]` to the property.

:::caution

The framework assumes that it can get the ID of the entity by calling the method
`getId()`. If your entity uses a different mechanism, you need to implement
`ObjectIdResolverInterface`. See the chapter [Object ID
Resolver](object-id-resolver) for more information.

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
     * of the object to get the ID. If your entity doesn't use getId(), you need
     * to create your implementation of ObjectIdResolverInterface.
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

## Mandatory File

If your business logic necessitates that the file is mandatory to an entity, you
can omit the `?` in the property type hint:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Association\Attribute\WithFileAssociation;
use Rekalogika\File\Association\Attribute\AsFileAssociation;

#[WithFileAssociation]
class Product
{
    #[AsFileAssociation]
    // highlight-start
    private FileInterface $image = null;
    // highlight-end
}
```

Read more about mandatory files in the chapter [Mandatory File](mandatory-file).