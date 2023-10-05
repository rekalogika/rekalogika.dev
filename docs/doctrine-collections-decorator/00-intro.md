---
title: Introduction & Installation
---

Lets you easily create decorator classes to modify the behaviors of Doctrine
Collection objects, including the collection objects used by Doctrine ORM in
your entities.

## Motivation

Custom collection classes won't come to Doctrine ORM anytime soon. Therefore,
the only way to modify the behavior of a Doctrine collection is to use
decorators. However, creating a Collection decorator by hand is a tedious
process.

## Installation

Make sure Composer is installed globally, as explained in the
[installation chapter](https://getcomposer.org/doc/00-intro.md)
of the Composer documentation.

Open a command console, enter your project directory and execute:

```bash
composer require rekalogika/doctrine-collections-decorator
```

## License

MIT

## Contributing

This framework consists of multiple repositories split from a monorepo. Be
sure to submit issues and pull requests to the
[`rekalogika/domain-event-src`](https://github.com/rekalogika/domain-event-src) monorepo.