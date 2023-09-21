---
title: Introduction & Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

An implementation of [domain event pattern](https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-events-design-implementation)
for Symfony & Doctrine.

## Features

* Works out of the box. No configuration is required.
* Simple, unopinionated architecture. Uses plain event objects, and doesn't
  require much from your domain entities.
* Uses standard Symfony's event dispatcher, with the same dispatching semantics
  & listener registrations.
* Three dispatching strategies: pre-flush, post-flush, and immediate.
* In pre-flush or post-flush modes, multiple events considered identical are
  dispatched only once.
* Does not require you to change how you work with entities, most of the time.
* Should work everywhere without any change: in controllers, message handlers,
  command line, etc.
* Separated contracts & framework. Useful for enforcing architectural
  boundaries. Your domain doesn't have to depend on the framework.

## Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory and execute:

```bash
composer require rekalogika/domain-event
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

### Step 1: Download the Bundle

Open a command console, enter your project directory and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/domain-event
```

### Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title=config/bundles.php
return [
    // ...
    Rekalogika\DomainEvent\RekalogikaDomainEventBundle::class => ['all' => true],
];
```
</TabItem>
</Tabs>

## License

MIT

## Contributing

This framework consists of multiple repositories splitted from a monorepo. Be
sure to submit issues and pull request to the
[`rekalogika/domain-event-src`](https://github.com/rekalogika/domain-event-src) monorepo.