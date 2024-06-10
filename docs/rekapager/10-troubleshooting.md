---
title: Troubleshooting
---

Common issues and how to solve them.

:::note

For clarity, the examples below uses plain SQL queries. The same principles
apply to any database-backed adapters.

:::

## Wonky Pager

If you are using keyset pagination and the pager is not working as expected, as
like going to page 5 lands you on page 3 or 8, or it skips some entries when
going to the next page, etc; the most common cause is that the query lacks a
deterministic sort order.

For example:

```sql
SELECT *
FROM posts
ORDER BY createdDate DESC
```

The above query does not have a deterministic sort order. If two posts have the
same `createdDate`, then the sort result is non-deterministic, the database
engine is free to return them in any order. Because the pager uses the fields
mentioned in the `ORDER BY` clause to determine the page boundaries, the pager
will not work correctly.

To fix this, the easiest way is to ensure the last field in the `ORDER BY`
clause is the primary key. For example, to fix the query above, we can change
it to:

```sql
SELECT *
FROM posts
ORDER BY createdDate DESC, id DESC
```

:::info

There is no way for the pager to ensure your query has a deterministic
sort order.

:::

## Slow First (and Last) Page

If you are using keyset pagination, but the first (and last) page feels slower
than the rest, usually it is because the query requires further optimization.

A common example:

```sql
SELECT *
FROM comments
WHERE post_id = 123
ORDER BY id ASC
```

If the amount of comments for a post is large, the database might prefer to scan
the entire index to find the comments for post 123. Other pages are not affected
much because the pager adds an anchor that the database uses to start looking
for the entries.

To show a non-first page, the pager will modify the query above to something
like:

```sql
SELECT *
FROM comments
WHERE post_id = 123
-- highlight-next-line
    AND id > 1234
ORDER BY id ASC
-- highlight-next-line
LIMIT 10
```

Where `1234` is the ID of the last comment on the previous page. This query will
be much faster because the database can easily locate the starting point and
skip all the comments before the anchor.

### Solution 1: Create an Index

You can optimize the query by adding a composite index on the `post_id` and `id`
field:

```sql
CREATE INDEX idx_comments_post_id_id ON comments (post_id, id)
```

### Solution 2: Add the Boundaries to the Query

Alternatively, you can also try adding the boundary to the first and last page
yourself:

```sql
SELECT *
FROM comments
WHERE post_id = 123
-- highlight-start
    AND id >= 1000
    AND id <= 2000
-- highlight-end
ORDER BY id ASC
```

Where `1000` is the ID of the first comment of the page, and `2000` is that of
the last comment. Obviously, with this solution you need to have the IDs
beforehand, maybe by storing the IDs in the `posts` table.