---
title: rekalogika/gotenberg-pdf-bundle
---

import DocCardList from '@theme/DocCardList';

Symfony Bundle for generating PDF using Gotenberg.

## Features

* Easy provisioning with Symfony Flex, Symfony CLI, and Docker Compose. Just
  install the bundle and you're ready to generate your first PDF.
* Separated high-level interfaces in `rekalogika/print-contracts`. If Gotenberg
  gets out of fashion in the future, hopefully we only need to replace this
  package, and don't need to change our code.
* Abstractions for paper sizes and page layouts.
* Leverages Symfony HTTP Client. See the requests and responses in Symfony
* With the heavy lifting already done by Gotenberg, there is no need to deal
  with Chrome instances, CLI tools, Puppeteer, NodeJS, etc.
* Scalable architecture. Suitable for low-volume development and high-volume
  usage alike. No need to reengineer if your usage outgrows your solution. Just
  add more instances of Gotenberg with Docker Compose or the container
  orchestration tool you are using.

## Sections

<DocCardList />

## License

MIT

## Contributing

The `rekalogika/gotenberg-pdf-bundle` repository is a read-only repo split from
the main repo. Issues and pull requests should be submitted to the
[rekalogika/print-src](https://github.com/rekalogika/print-src) monorepo.
