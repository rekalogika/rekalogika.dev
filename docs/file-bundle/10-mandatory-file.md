---
title: Mandatory File
---

This chapter explains the situation where a file is mandatory to the entity.

## Making a File Mandatory in an Entity

To make a file mandatory in an entity, you simply need to type-hint the file
property with `FileInterface` instead of `?FileInterface`:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Association\Attribute\WithFileAssociation;
use Rekalogika\File\Association\Attribute\AsFileAssociation;

#[WithFileAssociation]
class Product
{
    #[AsFileAssociation]
    // highlight-next-line
    private FileInterface $image;
}
```

By doing so, the framework will consider that the property has to be filled with
a `FileInterface` object, one way or another.

## If The File That is Supposed to be Present is not Present...

If the property is mandatory, but the actual file does not exist in the storage
backend, the framework will substitute it with a `MissingFile` object. The
situation is considered an error and will be logged as such. The administrator
or the developer is expected to fix the problem.

The `MissingFile` object is an implementation of the [null object
pattern](https://martinfowler.com/eaaCatalog/specialCase.html). It appears to
your application like a normal file, and should not cause a fatal error; unless
you are trying to operate on it that would cause a permanent effect, like saving
it to an entity.

`MissingFile` is also an `Exception`, but is not thrown by the framework. You
can treat it as a regular exception, including getting the stack trace from it.

For more information about `NullFile` in the framework, read the chapter
[Null File](../file/null-file).

## Mandatory File and Lazy-Loading Proxy

If you are using a lazy-loading proxy, the property will always be filled by an
instance of `FileInterface`. However, the framework does not check if the file
exists in the storage backend until you first try to access the file. If you
want a mandatory file, you have to do it yourself:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\Contracts\File\FileProxy;
use Rekalogika\Domain\File\Null\NullFile;
use Rekalogika\File\Association\Attribute\AsFileAssociation;

#[WithFileAssociation]
class Product
{
    #[AsFileAssociation(fetch: 'LAZY')]
    private FileInterface $image;

    public function getImage(): FileInterface
    {
        return FileProxy::getFile($this->image) ?? new NullFile;
    }
}
```

:::tip Protip

You might want to make sure other methods in the entity don't use the property
directly but use the getter instead.

:::