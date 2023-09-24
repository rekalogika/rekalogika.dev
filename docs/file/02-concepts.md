---
title: Concepts & Terms
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

## Terms

* **FileRepository**: Manages files in the framework. Implements
  `FileRepositoryInterface`.
* **File**: A file in a Flysystem filesystem. Implements `FileInterface`. Each
  file is identified by a filesystem identifier and a key. A null filesystem
  identifier denotes that the file is in the local filesystem.
* **FilePointer**: A pointer to a file. Implements `FilePointerInterface`. Like
  a file, a file pointer has a filesystem identifier and a key, but nothing
  else.
* **Filesystem**: A Flysystem filesystem. Implements Flysystem's
  `FilesystemOperator`. The caller should not use it directly but use the
  `FileRepository` instead.
* **Local filesystem**: A special Flysystem filesystem initialized by the
  framework that points to an unscoped local filesystem, using '/' as its root
  location.

:::info

A Flysystem filesystem using `LocalFilesystemAdapter` that is set up by the user
is not considered a local filesystem in this document.

:::

## Class Diagram

:::note

'Interface' in the names are stripped for brevity. Simple getters are
represented by properties.

:::

<ThemedImage
  alt="File classes"
  sources={{
    light: useBaseUrl('/diagrams/light/file.svg'),
    dark: useBaseUrl('/diagrams/dark/file.svg'),
  }}
  width="100%"
/>

## Keys vs Paths

The library encourages using the concept of 'keys', not 'paths'. Although the
key can appear similar to a path, the main difference is that the filename is
not part of the key, but part of the file's metadata. The key is similar to the
primary key of a database table. You can change the 'name' field, but the ID
usually stays the same.