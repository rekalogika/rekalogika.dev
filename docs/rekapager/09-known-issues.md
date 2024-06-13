---
title: Known Issues
---

## `Selectable` Bug in Counting `matching()` Results

There is a Doctrine bug involving `->matching($criteria)->count()`. If the `Criteria` has
a `maxResults`, then it will be disregarded and the `count()` will return the
total number of items as if the `maxResults` were not set.

* [issue #9951](https://github.com/doctrine/orm/issues/9951)
* [issue #10766](https://github.com/doctrine/orm/issues/10766)
* [PR #10767](https://github.com/doctrine/orm/pull/10767)

We work around this bug by fetching the items and counting them manually. This
is suboptimal, but it works. If performance is critical, use a small proximity
and a small page size. Or, use `QueryBuilderAdapter` instead.

## Underlying `QueryBuilder` or `Criteria` With `setFirstResult()` and `setMaxResults()`

`QueryBuilderAdapter` and `SelectableAdapter` currently do not support
underlying `QueryBuilder` or `Criteria` with `setFirstResult()` and
`setMaxResults()`. If the underlying object has any these set, then they will be
ignored.