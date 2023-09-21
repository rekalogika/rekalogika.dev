---
title: rekalogika/psr-16-simple-cache-bundle
---

Enables PSR-16 Simple Cache services in Symfony projects. These were previously
enabled in the older Symfony version but were removed in 4.3.

Installation
------------

Use Composer to install the package:

```bash
composer require rekalogika/psr-16-simple-cache-bundle
```

Add the bundle to your `config/bundles.php`. With Symfony Flex, this should be
done automatically.

```php title=config/bundles.php
return [
    // ...
    Rekalogika\Psr16SimpleCacheBundle\RekalogikaPsr16SimpleCacheBundle::class => ['all' => true],
];
```

Usage
-----

Caller can simply wire in `Psr\SimpleCache\CacheInterface`. The service uses
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

Rationale
---------

We are using PSR-16 mostly as an expiring key-value storage. While PSR-6 and
Symfony's CacheInterface are more powerful and easier to use for caching things,
we don't feel their interfaces are suitable for a key-value storage.

Credits
-------

This package is just a service definition. The actual implementation is done by
the Symfony project; they just don't make the service available by default.

* [Adapters For Interoperability between PSR-6 and PSR-16 Cache](https://symfony.com/doc/current/components/cache/psr6_psr16_adapters.html)
* [Service definition by Tobion](https://github.com/symfony/symfony/issues/28918#issuecomment-433489302)