---
title: Marking Entities using Interface
---

As an alternative to using attributes to mark your entities, you can also have
your entities implement `FileAssociationInterface`.

:::note

We recommend using attributes instead of implementing the interface as
described in [Associating Files with Doctrine Entities](./03-doctrine-entity.md).

:::

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

