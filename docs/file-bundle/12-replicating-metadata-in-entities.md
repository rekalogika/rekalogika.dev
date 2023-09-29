---
title: Replicating Metadata in Entities
---

This chapter describes how to replicate file metadata in your entities.

:::note

This feature is only nominally tested.

:::

## Objective

This framework gives you the convenience of requiring only a single property to
associate a file with an entity. However, there are cases where it can be useful
to have the file's metadata stored in the entity. For example:

* To optimize performance together with our [lazy-loading
  feature](lazy-loading), especially when you are dealing with a lot of entities
  and/or files.
* You need to use the database to index, search, or sort the files based on
  their metadata.

Using the method described in this chapter, you will be able to accomplish that
by replicating the files' metadata in your entities and it does not require you
to change the way you work with files.

## Execution

:::info Preparation

You need to install the package `rekalogika/file-association-entity` to use this
feature:

```bash
composer require rekalogika/file-association-entity
```

:::

In short, you need to:

1. Add a property with `EmbeddedMetadata` type. This is a Doctrine embeddable
   that implements `RawMetadataInterface` we will be using to store the file's
   metadata.
2. Modify the getter of the file property so that it returns a decorated
   version of the `FileInterface` that will use our `EmbeddedMetadata` in #1.
3. Modify the setter of the file property so it will copy the metadata of a new
   file to our `EmbeddedMetadata` in #1.

If your original entity looks like this:

```php
use Doctrine\ORM\Mapping\Entity;
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Association\Attribute\WithFileAssociation;
use Rekalogika\File\Association\Attribute\AsFileAssociation;

#[Entity]
#[WithFileAssociation]
class Product
{
    #[AsFileAssociation]
    private ?FileInterface $image = null;

    public function getImage(): ?FileInterface
    {
        return $this->image;
    }

    public function setImage(?FileInterface $image): self
    {
        $this->image = $image;

        return $this;
    }
}
```

You need to modify it to look like this:

```php
// highlight-next-line
use Doctrine\ORM\Mapping\Embedded;
use Doctrine\ORM\Mapping\Entity;
use Rekalogika\Contracts\File\FileInterface;
// highlight-start
use Rekalogika\Domain\File\Association\Entity\EmbeddedMetadata;
use Rekalogika\Domain\File\Association\Entity\FileDecorator;
// highlight-end
use Rekalogika\File\Association\Attribute\WithFileAssociation;
use Rekalogika\File\Association\Attribute\AsFileAssociation;

#[Entity]
#[WithFileAssociation]
class Product
{
    #[AsFileAssociation]
    private ?FileInterface $image = null;

    // highlight-start
    #[Embedded]
    private EmbeddedMetadata $imageMetadata;
    // highlight-end

    public function __construct()
    {
        // highlight-next-line
        $this->imageMetadata = new EmbeddedMetadata();  
    }

    public function getImage(): ?FileInterface
    {
        // highlight-next-line
        return FileDecorator::getFile($this->image, $this->imageMetadata);
    }

    public function setImage(?FileInterface $image): self
    {
        // highlight-next-line
        FileDecorator::setFile($file, $this->file, $this->fileMetadata);

        return $this;
    }
}
```

After the change, calling the setter will still give you a `FileInterface` that
you can use like before. But behind the scenes, any reads to the metadata will
be done from the data stored in the entity. On the other hand, writes to
metadata are saved to both the file and the entity.

:::info

Because the metadata is now saved in the entity, after any changes to the
metadata, you need to call `flush()` on the entity manager to save the metadata
to the database.

:::

## Using The Metadata Fields for Querying and Indexing

`EmbeddedMetadata` is a [Doctrine embeddable](https://www.doctrine-project.org/projects/doctrine-orm/en/latest/tutorials/embeddables.html) that contains the following fields:

* `name`: The file name.
* `size`: The file size in bytes.
* `type`: The file MIME type.
* `modificationTime`: The file modification time.
* `width`: The width if the file is an image.
* `height`: The height if the file is an image.
* `other`: Other metadata that is not covered by the above fields.

You can use these fields (other than the `other`) to query and index the files
in your database.