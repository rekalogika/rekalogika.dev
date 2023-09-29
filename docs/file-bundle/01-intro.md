---
title: Introduction
---

Symfony bundle to easily integrate the `rekalogika/file` framework and related
packages within a Symfony application.

## Features

* Works out of the box without configuration.
* DX improvement, less micro-management of entity-file relations.
* Requires only a single property in the entity for each associated file.
* File properties are file properties. It is not required to store any of the
  file's properties in the entity associated with the file.
* Having said that, there is an option to replicate the file metadata in the
  entity, and it does so without changing how you work with the files.
* Abstract class to ease implementing one-entity-to-many-files relations.
* Reads and writes directly into the file properties, even if private. You are
  free to have business logic in the getters and setters.
* Doesn't require you to update another property of the entity (`lastUpdated`?)
  just to make sure the correct Doctrine events will be fired.
* Localization. Currently only for 'Untitled' files, and 'unknown file type'.
* Adapters for various Symfony components, including HttpFoundation, Form, and
  Validator.
* Image resizing filter.
* Temporary URL generation to files.

## License

MIT

## Contributing

This framework consists of multiple repositories split from a monorepo. Be
sure to submit issues and pull requests to the
[rekalogika/file-src](https://github.com/rekalogika/file-src) monorepo.