---
title: Doctrine Collections Collection
---

The `CollectionAdapter` supports only offset pagination. The class works with a
Doctrine `ReadableCollection` (also `Collection`) instance.

## Installation

```bash
composer require rekalogika/rekapager-doctrine-collections-adapter
```

## Usage

```php
use Doctrine\Common\Collections\Collection;
use Rekalogika\Rekapager\Doctrine\Collections\CollectionAdapter;
use Rekalogika\Rekapager\Offset\OffsetPageable;

/** @var Collection $collection */
$collection = $user->getComments(); // a Doctrine Collection in an entity

// highlight-next-line
$adapter = new CollectionAdapter($collection);

$pageable = new OffsetPageable($adapter);
```

