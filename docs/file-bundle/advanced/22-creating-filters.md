---
title: Creating Filters
---

This chapter explains how to create your own file filters using
`AbstractFileFilter`.

:::info Preparation

You need to install the package `rekalogika/file-derivation` to use this
feature:

```bash
composer require rekalogika/file-derivation
```

:::

To create a filter class, you can extend `AbstractFileFilter`, create a method
(or more) for the callers to specify the filtering parameters, and implement all
the abstract methods.

The following is an example filter class that creates a derived file by (rather
uselessly) appending a text to the original content:

```php
use Rekalogika\Contracts\File\FileInterface;
use Rekalogika\File\Derivation\Filter\AbstractFileFilter;
use Rekalogika\File\TemporaryFile;

class TextAppender extends AbstractFileFilter
{
    private string $text;

    /**
     * Your custom method that lets the caller specify the filtering parameters.
     */
    public function appendText(string $text): self
    {
        assert(ctype_alpha($text)); // ensure alpha characters only
        $this->text = $text;

        return $this;
    }

    /**
     * This method return the derivation ID from the filtering parameters the
     * caller provided.
     */
    #[\Override]
    protected function getDerivationId(): string
    {
        return 'append_' . $this->text;
    }

    #[\Override]
    protected function process(): FileInterface
    {
        $originalContent = $this->getSourceFile()->getContent();

        return new TemporaryFile::createFromString($originalContent . $this->text);
    }
}
```

If you are using autoconfiguration, then you are all set. Otherwise, you need
to tag your class with `rekalogika.file.derivation.filter`:

```yaml title=config/services.yaml
services:
    App\TextAppender:
        tags:
            - { name: 'rekalogika.file.derivation.filter' }
```

A caller will be able to use the above filter like the following:

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var TextAppender $textAppender */
/** @var FileInterface $file */

$derivedFile = $textAppender
    ->take($file)
    ->appendText('foo')
    ->getResult();
```
