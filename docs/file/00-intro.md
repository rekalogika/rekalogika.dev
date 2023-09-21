---
title: Introduction
---

High-level file abstraction library built on top of Flysystem. It lets you work
with file objects in an object-oriented way. A file object represents a file in
a Flysystem filesystem. It can be a local file or a file in a cloud storage, the
library lets you work with them in the same way.

## Features

### General Features

* Rich, high-level abstraction of files built on top of Flysystem.
* Abstractions for file name and media type (MIME type).
* Caches and stores metadata in a sidecar file. Uniform metadata support across
  all filesystems.
* Uses the repository pattern for files.
* Remote façade pattern in accessing metadata, improves performance with remote
  filesystems. Two metadata queries require only one round trip.
* Rich metadata support.
* Separated contracts and implementation. Useful for enforcing architectural
  boundaries. Your domain models doesn't have to depend on the framework.

### Entity Association Features

* Requires only a single property in the entity for each associated file.
* File properties are file properties. It is not necessary to store any of the
  file's properties in the entity associated with the file.
* DX improvement, less micro-management of entity-file relations.
* Reads and writes directly into the file properties, even if private. You are
  free to have business logic in the getters and setters.
* Doesn't require you to update another property of the entity (`lastUpdated`)
  just to make sure the correct Doctrine events will be fired.

### Interoperability Features

* Adapters for Symfony HttpFoundation, Form, and Validator.
* Adapter for OneupUploaderBundle.

## License

MIT

## Contributing

This framework consists of multiple repositories splitted from a monorepo. Be
sure to submit issues and pull request to the
[rekalogika/file-src](https://github.com/rekalogika/file-src) monorepo.