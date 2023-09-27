---
title: rekalogika/psr-16-simple-cache-bundle
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Enables PSR-16 Simple Cache services in Symfony projects. These were previously
enabled in the older Symfony version but were removed in 4.3.

## Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/psr-16-simple-cache-bundle
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory, and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/psr-16-simple-cache-bundle
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title=config/bundles.php
return [
    // ...
    Rekalogika\Psr16SimpleCacheBundle\RekalogikaPsr16SimpleCacheBundle::class => ['all' => true],
];
```
</TabItem>
</Tabs>

## Usage

Callers can simply wire in `Psr\SimpleCache\CacheInterface`. The service uses
the same underlying pool used by Symfony's `CacheInterface`.

```php
use Psr\SimpleCache\CacheInterface;

class SomeService
{
    public function __construct(private CacheInterface $cache)
    {
    }

    public function doSomething()
    {
        $this->cache->set('foo', 'bar');
    }
}
```

## Rationale

We are using PSR-16 mostly as an expiring key-value storage. While PSR-6 and
Symfony's CacheInterface are more powerful and easier to use for caching things,
we don't feel their interfaces are suitable for key-value storage.

## Credits

This package is just a service definition. The actual implementation is done by
the Symfony project; they just don't make the service available by default.

* [Adapters For Interoperability between PSR-6 and PSR-16 Cache](https://symfony.com/doc/current/components/cache/psr6_psr16_adapters.html)
* [Service definition by Tobion](https://github.com/symfony/symfony/issues/28918#issuecomment-433489302)

## License

MIT

## Contributing

Issues and pull requests should be filed in the GitHub repository
[rekalogika/psr-16-simple-cache-bundle](https://github.com/rekalogika/psr-16-simple-cache-bundle).