---
title: Introduction
---

Rekapager is a pagination library for PHP, supporting both offset-based and
keyset-based pagination.

## Features

* Supports offset-based and keyset-based pagination.
* Works on the separate layer from your filtering and sorting logic. Does not
  mandate a specific way to filter or sort your data.
* By default, the pager does not fetch the total count from the underlying data,
  avoiding common database performance issues.
* The caller can supply the total count that the pager can use instead of
  fetching it from the underlying data.
* The total count is completely optional. The pager can work without knowing the
  total count of the underlying data.
* Fast seek to the last page if using keyset pagination, even without knowing
  the total count.
* Bidirectional navigation on keyset pagination.
* Offset page seeking on keyset pagination. Does not limit you only to the
  immediate next or previous page.
* Option to limit navigation to a specific maximum page number, preventing
  denials of service, malicious or accidental. Offset pagination has a default
  limit of 100 pages.
* Uses only a single query parameter for referencing a page. With offset
  pagination, it is in the form of page number. With keyset pagination, it is in
  the form of an encoded page identifier object.

## User Interface

Default:

![Pager](/rekapager/default.png)

If the last page is not known:

![Pager](/rekapager/unknown-last.png)

Navigating to the last page if the count is not known:

![Pager](/rekapager/last-without-count.png)

And if the count is known:

![Pager](/rekapager/last-with-count.png)

Page number limit in effect:

![Pager](/rekapager/limit.png)

Zero proximity:

![Pager](/rekapager/zero-proximity.png)

## Adapters

* Doctrine ORM `QueryBuilder`
* Doctrine Collections `Selectable` and `Collection`

## Demo

You can try the demo by running the following command:

```bash
git clone https://github.com/rekalogika/rekapager.git
cd rekapager
composer install
make doctrine serve
```

## License

MIT

## Contributing

This framework consists of multiple repositories split from a monorepo. Be
sure to submit issues and pull requests to the
[`rekalogika/rekapager`](https://github.com/rekalogika/rekapager) monorepo.