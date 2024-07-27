---
title: Pagerfanta Adapter
---

Allows leveraging any of the existing Pagerfanta adapters. The
`PagerfantaAdapterAdapter` supports only offset pagination. The adapter takes a
Pagerfanta's `AdapterInterface` instance as its argument.

## Installation

```bash
composer require rekalogika/rekapager-pagerfanta-adapter
```

## Usage

```php
use Pagerfanta\Doctrine\Collections\SelectableAdapter;
use Rekalogika\Rekapager\Offset\OffsetPageable;
use Rekalogika\Rekapager\Pagerfanta\PagerfantaAdapterAdapter;

$criteria = Criteria::create()
        ->where(Criteria::expr()->eq('group', $group));

$pagerfantaAdapter = new SelectableAdapter($user->getPosts(), $criteria);
// highlight-next-line
$adapter = new PagerfantaAdapterAdapter($pagerfantaAdapter);

$pageable = new OffsetPageable($adapter);
```

:::info

If you already have a `Pagerfanta` instance, you can use `PagerfantaPageable`
instead.

:::