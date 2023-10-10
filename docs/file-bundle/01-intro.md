---
title: Introduction
---

Symfony bundle to easily integrate the `rekalogika/file` framework and related
packages within a Symfony application.

## Features

* Works out of the box without configuration.
* DX improvement, less micro-management of entity-file relations.
* Requires only a single property in the entity for each associated file.
* Having said that, there is an option to replicate the file metadata in the
  entity, and it does so without changing how you work with the files.
* Trait and abstract class to ease implementing a one-to-many relation between
  an entity and multiple files.
* Reads and writes directly into the file properties, even if private. You are
  free to have business logic in the getters and setters.
* Doesn't require you to update another property of the entity (`lastUpdated`?)
  just to make sure the correct Doctrine events will be fired.
* Localization. Show strings in the user's language.
* Adapters for various Symfony components, including HttpFoundation, Form, and
  Validator.
* Image resizing filter.
* Temporary URL generation to files.
* Mandatory files (not null for file properties). Substitute the file with a
  null object if it is not found in the storage backend.
* Lazy loading for files.
* ZIP download of multiple files.
* Full-featured FilePond-based file upload form.

## License

MIT

## Contributing

This framework consists of multiple repositories split from a monorepo. Be
sure to submit issues and pull requests to the
[rekalogika/file-src](https://github.com/rekalogika/file-src) monorepo.