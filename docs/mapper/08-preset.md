---
title: Predetermined Mapping Preset
---

The user can provide a list of predetermined mapping between objects to Mapper.
If Mapper encounters an object in the list, that matches to the provided target
class, it will use the preset value.

## Usage

```php
use Rekalogika\Mapper\MapperInterface;
use Rekalogika\Mapper\Transformer\Context\PresetMapping;
use Rekalogika\Mapper\Context\Context;

/** @var MapperInterface $mapper */
/** @var Book $book */
/** @var BookDto $bookDto */

// if a Book is being mapped to a BookDto, use the provided $bookDto
$presetMapping = new PresetMapping([
    $book => [
        BookDto::class => $bookDto,
    ]
])

$context = Context::create($presetMapping);

$result = $mapper->map($book, BookDto::class, $context);
$book === $result; // true
```

## Populating `PresetMapping` from an Existing `ObjectCache`

You can use the `ObjectCache` from a previous mapping to populate the
`PresetMapping` object.

```php
use Rekalogika\Mapper\ObjectCache\ObjectCacheFactoryInterface;
use Rekalogika\Mapper\Transformer\Context\PresetMapping;
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\MapperInterface;

/** @var ObjectCacheFactoryInterface $objectCacheFactory */
/** @var MapperInterface $mapper */
/** @var Book $book */
/** @var BookDto $bookDto */

$objectCache = $objectCacheFactory->createObjectCache();
$context = Context::create($objectCache);

$result = $mapper->map($book, BookDto::class, $context);

$presetMapping = PresetMappingFactory::fromObjectCache($objectCache);
// ...
```

## Example: Remembering Mapper

A mapper that remembers the previous mappings:

```php
use Rekalogika\Mapper\Context\Context;
use Rekalogika\Mapper\Exception\UnexpectedValueException;
use Rekalogika\Mapper\MapperInterface;
use Rekalogika\Mapper\ObjectCache\ObjectCacheFactoryInterface;
use Rekalogika\Mapper\Transformer\Context\PresetMapping;
use Rekalogika\Mapper\Transformer\Context\PresetMappingFactory;
use Symfony\Contracts\Service\ResetInterface;

class RememberingMapper implements MapperInterface, ResetInterface
{
    private PresetMapping $presetMapping;

    public function __construct(
        private MapperInterface $decorated,
        private ObjectCacheFactoryInterface $objectCacheFactory
    ) {
        $this->presetMapping = new PresetMapping();
    }

    public function reset(): void
    {
        $this->presetMapping = new PresetMapping();
    }

    public function map(object $source, object|string $target, ?Context $context = null): object
    {
        $objectCache = $this->objectCacheFactory->createObjectCache();

        if ($context === null) {
            $context = Context::create();
        }

        $context = $context->with($objectCache, $this->presetMapping);

        $result = $this->decorated->map($source, $target, $context);

        if (is_object($target)) {
            $target = $target::class;
        }

        if (!$result instanceof $target) {
            throw new UnexpectedValueException(sprintf('Expected instance of "%s", got "%s"', $target, get_class($result)));
        }

        $newPresetMapping = PresetMappingFactory::fromObjectCache($objectCache);
        $this->presetMapping->mergeFrom($newPresetMapping);

        return $result;
    }
}
```