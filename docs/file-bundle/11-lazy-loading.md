---
title: Lazy-Loading Files
---

This chapter describes how to implement the lazy-loading of files in your
entities.

## Property Set-Up

To lazy-load files in your entities, simply add the parameter `fetch: 'LAZY'` to
the `AsFileAssociation` attribute:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Association\Attribute\AsFileAssociation;

class Product
{
    // highlight-next-line
    #[AsFileAssociation(fetch: 'LAZY')]
    private FileInterface $image;
}
```

## Getter Set-Up

To preserve the normal behavior of your entity when using a lazy-loading proxy,
you should also modify the getter of the property like this:

```php
use Rekalogika\Contracts\File\FileInterface;
// highlight-next-line
use Rekalogika\Contracts\File\FileProxy;
use Rekalogika\File\Association\Attribute\AsFileAssociation;

class Product
{
    #[AsFileAssociation(fetch: 'LAZY')]
    private FileInterface $image;

    public function getImage(): ?FileInterface
    {
        // highlight-next-line
        return FileProxy::getFile($this->image);
    }
}
```

:::tip Protip

You might want to make sure other methods in the entity don't use the property
directly but use the getter instead.

:::

:::info

The class `FileDecorator` used in [metadata
replication](replicating-metadata-in-entities) and [file collection](collection)
is aware of lazy-loading proxies, so you don't need to modify the getter as
explained here if you are using `FileDecorator`.

:::

## Lazy-Loading Proxy and Mandatory Files

If you want both lazy-loading and mandatory files, please read the chapter
[Mandatory File](mandatory-file).