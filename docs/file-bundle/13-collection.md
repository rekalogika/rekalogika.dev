---
title: Implementing a Collection of Files
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This chapter describes how to implement a collection of files, or one-to-many
relation between a Doctrine entity and several files.

:::note

This feature is currently only nominally tested.

:::

## Summary

This is what we do to implement a one-to-many relation between an entity and
several files:

1. Create a new entity that will represent a file. For convenience, we provide
   `AbstractFile` or `FileTrait` that your entity can extend or use.

2. Create a one-to-many relation from an entity to the entity in #1.
   
:::info Preparation

You need to install the package `rekalogika/file-association-entity` to use this
feature:

```bash
composer require rekalogika/file-association-entity
```

:::

## The `many-to-one` Side

In the following example, we will be creating an entity `Product` that will
have multiple `Image`s.

You will need your `Product` entity to extend `AbstractFile`. Alternatively, if
your entity needs to extend another entity, you can use the trait `FileTrait`
instead.

<Tabs>
<TabItem value="abstract" label="By Extending AbstractFile">

Create the `Image` entity by extending `AbstractFile`. The following are the
relevant parts.

```php
use Doctrine\ORM\Mapping as ORM;
use Rekalogika\Domain\File\Association\Entity\AbstractFile;

#[ORM\Entity]
class Image extends AbstractFile
{
    // ...

    #[ORM\ManyToOne(inversedBy: 'images')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

        return $this;
    }

    // ...
}
```

</TabItem>

<TabItem value="trait" label="By Using FileTrait">

Create the `Image` entity by using the `FileTrait`. The following are the
relevant parts.

```php
use Doctrine\ORM\Mapping as ORM;
use Rekalogika\Domain\File\Association\Entity\AbstractFile;
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Association\Attribute\WithFileAssociation;

#[ORM\Entity]
#[WithFileAssociation]
class Image implements FileInterface
{
    use FileTrait;

    #[ORM\ManyToOne(inversedBy: 'images')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

        return $this;
    }
}
```

If you don't use attributes to configure your Doctrine mappings, you will need
to add the following configuration to the Doctrine's mapping configuration.

<Tabs>

<TabItem value="xml" label="XML">

```xml
<doctrine-mapping>
    <!-- ... -->
    <entity name="Image">
        <!-- ... -->
        <embedded
             name="metadata"
             class="Rekalogika\Domain\File\Association\Entity\EmbeddedMetadata" />
    </entity>
    <!-- ... -->
</doctrine-mapping>
```

</TabItem>

</Tabs>


</TabItem>
</Tabs>

## The `one-to-many` Side

The relevant parts:
    
```php
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Product
{
    // ...

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: Image::class, orphanRemoval: true)]
    private Collection $images;

    public function __construct()
    {
        $this->images = new ArrayCollection();
    }

    /**
     * @return Collection<int, Image>
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): static
    {
        if (!$this->images->contains($image)) {
            $this->images->add($image);
            $image->setProduct($this);
        }

        return $this;
    }

    public function removeImage(Image $image): static
    {
        if ($this->images->removeElement($image)) {
            // set the owning side to null (unless already changed)
            if ($image->getProduct() === $this) {
                $image->setProduct(null);
            }
        }

        return $this;
    }

    // ...
}
```

Optionally, for convenience, you can also modify the adder `addImage` above so
that it also accepts an instance of `FileInterface`:

```php
use Rekalogika\Contracts\File\FileInterface;

class Product
{
    // ...

    public function addImage(Image|FileInterface $image): static
    {
        // highlight-start
        if (!$image instanceof Image) {
            $image = new Image($image);
        }
        // highlight-end

        if (!$this->images->contains($image)) {
            $this->images->add($image);
            $image->setProduct($this);
        }

        return $this;
    }

    // ...
}
```

## Using The Relation

By following the guide above, your `Image` entity is a `FileInterface`.
Therefore, with the example above, you can treat the `Image` entity as a file.

```php
use Rekalogika\File\File;

$product = new Product();
$image1 = new File('product_image_1.jpg');
$image2 = new File('product_image_2.jpg');
$image3 = new File('product_image_3.jpg');

$product
    ->addImage($image1)
    ->addImage($image2)
    ->addImage($image3);

foreach ($product->getImages() as $image) {
    $name = $image->getName(); // product_image_1.jpg, etc.
    $description = $image->getType()->getDescription(); // "JPEG image", etc.
}
```

## Indexing and Querying by File Properties

`AbstractFile` uses `EmbeddedMetadata` under the hood. Read more about it in the
[Replicating Metadata in Entities](replicating-metadata-in-entities) section.