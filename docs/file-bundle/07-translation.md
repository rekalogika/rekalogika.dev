---
title: Translation
---

This chapter explains localization support in the framework.

## Translatable Strings

Currently the framework supports localization in a few places:

* File names. For displaying 'Untitled' in the UI if the file name is null.
* File type description. For displaying 'Unknown file type' if the file type is
  not recognized.

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

$name = $file->getName(); // this is translatable
$baseFileName = $file->getName()->getBase(); // also translatable
$fullFileName = $file->getName()->getFull(); // translatable, too
$typeDescription = $file->getType()->getDescription(); // translatable as well
```

## Translation

The framework uses Symfony's translation contracts. To translate strings, you
need to use the `TranslatorInterface` service:

```php
use Rekalogika\Contracts\File\FileInterface; 
use Symfony\Contracts\Translation\TranslatorInterface;

/** @var FileInterface $file */
/** @var TranslatorInterface $translator */

$fileName = $file->getName();
$translatedFileName = $fileName->trans($translator);
```

:::note

File names are not translated. Only 'Untitled' and 'Unknown file type' are
translated.

:::

In Twig:

```twig
{# 'file' is an instance of FileInterface #}

The file name is {{ file.name|trans }}
```

## Using the Framework Without Translation

All the translatable strings also implement `Stringable`. Therefore, if your
application does not use translations, you can simply cast to string.

```php
use Rekalogika\Contracts\File\FileInterface;

/** @var FileInterface $file */

$fileNameInString = (string) $file->getName();
```
## Translating to Your Language

To add translations to your language, submit a pull request to the repository
here:

[github.com/rekalogika/file-src/tree/main/packages/file-bundle/translations](https://github.com/rekalogika/file-src/tree/main/packages/file-bundle/translations)

Use the English XLIFF as a template.