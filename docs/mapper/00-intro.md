---
title: Introduction & Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`rekalogika/mapper` is an object mapper for PHP and Symfony, also commonly known
as an automapper. It maps an object to another object. It removes a lot of the
repetitive code you would normally have to write to map an object to another
object.

## Synopsis

```php
use App\Entity\Book;
use Rekalogika\Mapper\MapperInterface;

/** @var MapperInterface $mapper */
/** @var Book $book */

$result = $mapper->map($book, BookDto::class);

// or map to an existing object

$bookDto = new BookDto();
$mapper->map($book, $bookDto);
```

## Features

* Automatically lists the properties of the source and target, detects their
  types, and maps them accordingly.
* By default, does not attempt to circumvent your class constraints. Reads only
  from and writes only to public properties, getters, setters. Does not
  instantiate objects without their constructor.
* Constructor initialization.
* Handles nested objects.
* Handles recursion and circular references.
* Inheritance support. Maps to abstract classes and interfaces using an
  inheritance map attribute.
* Reads the type from PHP type declaration and PHPDoc annotations, including
  the type of the nested objects.
* Handles `array`, `ArrayAccess` and `Traversable` objects, and the mapping
  between them.
* Lazy stream mapping if the target is type-hinted as `Traversable`. Consumes
  less memory & avoids hydrating a Doctrine collection prematurely.
* In addition, when the target is `Traversable` and the source is a `Countable`,
  then the target will also be a `Countable`. With an extra-lazy Doctrine
  Collection, the consumer will be able to count the target without causing a
  full hydration of the source.
* Manual mapping using a class method.
* Easy to extend by creating new transformers, or decorating the existing ones.
* Match classes using attributes in your transformers, in addition to using
  class names.
* Helpful exception messages.
* Console commands for debugging.

## Future Features

* Option to map to or from different property name? (seems to be a popular
  feature, but I prefer the native OOP way of doing it)
* Option to read & write to private properties?
* Data collector and profiler integration.

## Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

<Tabs>
<TabItem value="flex" label="With Symfony Flex">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/mapper
```
</TabItem>

<TabItem value="noflex" label="Without Symfony Flex">

Step 1: Download the Bundle

Open a command console, enter your project directory, and execute the
following command to download the latest stable version of this bundle:

```bash
composer require rekalogika/mapper
```

Step 2: Enable the Bundle

Then, enable the bundle by adding it to the list of registered bundles
in the `config/bundles.php` file of your project:

```php title=config/bundles.php
return [
    // ...
    Rekalogika\Mapper\RekalogikaMapperBundle::class => ['all' => true],
];
```
</TabItem>

<TabItem value="nonsymfony" label="Non-Symfony Projects">

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/mapper
```

:::warning

Many parts of this documentation assume you are using Symfony, and will need
to be done differently in non-Symfony projects.

:::

</TabItem>
</Tabs>

## License

MIT

## Contributing

Issues and pull requests should be filed in the GitHub repository
[rekalogika/mapper](https://github.com/rekalogika/mapper).