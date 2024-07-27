---
title: Keyset Seek Method
---

If more than one column is used for sorting, there are two ways to construct
the WHERE clause in keyset pagination: using SQL Row Values, and using an
approximated variant.

## The Approximated Variant

```sql
SELECT *
FROM post p
WHERE p.date >= :date
   AND NOT (p.date = :date AND p.title <= :title)
   AND NOT (p.date = :date AND p.title = :title AND p.id <= :id)
ORDER BY p.date ASC, p.title ASC, p.id ASC
```

This method is slightly less efficient than using SQL Row Values, but it is more
portable across different database systems. It practically works in all cases.
This is the default seek method used by the library.

## SQL Row Values

```sql
SELECT *
FROM post p
WHERE (p.date, p.title, p.id) > (:date, :title, :id)
ORDER BY p.date ASC, p.title ASC, p.id ASC
```

This method might be slightly more efficient than the approximated variant, but
it is not supported by all database systems.

It also requires that all the columns are ordered in the same direction. For
example, if the first column is ordered in ascending order, the rest of the
columns must also be ordered in ascending order. If your requirement is to have
a different order for each column, you have to use the approximated variant.

## Support

All adapters support the approximated variant. The SQL row values method is
supported by the ORM `QueryBuilderAdapter` and `NativeQueryAdapter` adapters,
but the approximate variant is used by default.

## Changing the Seek Method

To change the seek method, you can use the `seekMethod` argument. There are
three options:

* `SeekMethod::Approximated`
* `SeekMethod::RowValues`
* `SeekMethod::Auto`

`SeekMethod::Auto` means the adapter will use the row values method if all sort
columns are ordered in the same direction, otherwise use the approximated
variant.

Example:

```php
use Rekalogika\Rekapager\Keyset\KeysetPageable;
use Rekalogika\Rekapager\Adapter\Common\SeekMethod;
use Rekalogika\Rekapager\Doctrine\ORM\QueryBuilderAdapter;

$adapter = new QueryBuilderAdapter(
    queryBuilder: $queryBuilder,
    // highlight-next-line
    seekMethod: SeekMethod::RowValues,
);