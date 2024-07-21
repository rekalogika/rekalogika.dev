---
title: Introduction
---

High-level file abstraction library built on top of Flysystem. It lets you work
with file objects in an object-oriented manner. A file object represents a file
in a Flysystem filesystem. It can be a local file or a file in a cloud storage,
the library lets you work with them in the same way.

## Features

### General Features

* Rich, high-level abstraction of files built on top of Flysystem.
* Abstractions for file name and media type (MIME type).
* Caches and stores metadata in a sidecar file. Uniform metadata support across
  all filesystems.
* Uses the repository pattern for files.
* Remote façade pattern in accessing metadata. Improves performance with remote
  filesystems. Two metadata queries require only one round trip.
* Rich metadata support.
* Option to use lazy-loading proxy for files.
* Support for file derivations.
* Separated contracts and implementation. Useful for enforcing architectural
  boundaries. Your domain models don't have to depend on the framework.
### Interoperability Features

* Adapters for Symfony HttpFoundation, Form, and Validator.
* Adapter for OneupUploaderBundle.

## Components

The File framework consists of several components.

![File components](./diagrams/file-components.light.svg#light)
![File components](./diagrams/file-components.dark.svg#dark)

* **rekalogika/file**: The core library. It provides the file abstraction and
  metadata support.
* **rekalogika/file-bundle**: Integrates the library with Symfony.
* **rekalogika/file-association**: Provides support for associating files with
* **rekalogika/file-association-entity**: Utilities for handling files inside
  domain entities.
* **rekalogika/file-contracts**: Contains the interfaces and contracts used by
  the library.
* **rekalogika/file-derivation**: Library for creating derived files.
* **rekalogika/file-filepond**: Form for uploading files utilizing the FilePond Javascript library.
* **rekalogika/file-image**: Provides image resizing filter.
* **rekalogika/file-metadata**: Classes that represent file metadata.
* **rekalogika/file-metadata-contracts**: Contains additional interfaces
* **rekalogika/file-null**: Implementation of the null object pattern.
* **rekalogika/file-oneup-uploader-bridge**: Adapter for OneupUploaderBundle.
* **rekalogika/file-server**: Temporary URL server for files.
* **rekalogika/file-symfony-bridge**: Adapter for Symfony HttpFoundation, Form, and
* **rekalogika/file-zip**: Streams files as a ZIP file to the client.

## License

MIT

## Contributing

This framework consists of multiple repositories split from a monorepo. Be
sure to submit issues and pull requests to the
[rekalogika/file-src](https://github.com/rekalogika/file-src) monorepo.