---
title: Cache Pre-warming
---

Mapper caches the results of expensive processing, so when it does the same
mapping again, it can quickly refer to the cached result instead of doing the
expensive processing once more.

Because this cache won't change during the lifetime of the application, it can
make sense to pre-warm the cache before deployment.

:::note

This chapter is Symfony-specific.

:::

## Pre-warming is Optional

First off, Mapper can work without pre-warming the cache. It will just take a
bit longer to process the first mapping. In most deployments, it should not be
necessary to pre-warm the cache.

## When Pre-warming is Useful

Very busy applications: Without pre-warming, a new deployment starts with an
empty cache. With a busy application, it can result in a load spike, where many
requests come in at the same time, and each request tries to perform the same
expensive operation.

Strict read-only deployments: Such systems might have no choice but to store the
cache over the network, and pre-warming can help to reduce the overhead.

## How to Pre-warm the Cache

Mapper cannot possibly know beforehand which mapping you are going to do in the
application. So, you need to inform Mapper the list of the mappings. To do so,
create a mapping collection file and store it in the `config/rekalogika-mapper`
directory, any filename is fine.

```php title="config/rekalogika-mapper/mappings.php"
<?php

use Rekalogika\Mapper\CacheWarmer\MappingCollection;

return function (MappingCollection $mappingCollection) : void {
    $mappingCollection->addObjectMapping(
        source: SomeSourceClass::class,
        target: SomeTargetClass::class
    );

    $mappingCollection->addObjectMapping(
        source: OtherSourceClass::class,
        target: OtherTargetClass::class
    );
}
```

Then, the mapping cache will be pre-warmed as part of Symfony's cache
pre-warming process:

```bash
$ APP_ENV=prod APP_DEBUG=0 php bin/console cache:clear
```

## Using PHPStan to Automatically Generate the Mapping Collection

If you are using PHPStan, you can add the configuration below to your PHPStan
configuration file, then PHPStan will automatically generate the mapping
collection in the specified file every time you run PHPStan.

```yaml title="phpstan.neon.dist"
parameters:
    rekalogika-mapper:
        mapperDumpFile: config/rekalogika-mapper/generated-mappings.php

# only required if you are not using phpstan/extension-installer:
includes:
    - vendor/rekalogika/mapper/phpstan-extension.neon
```

:::note

The automatic PHPStan mapping generation is not foolproof. It cannot detect
every possible use cases. You might still need to add some of the mappings
manually.

:::