---
title: Doctrine ORM NativeQuery
---

`NativeQueryAdapter` allows you to use Doctrine's native SQL functionality. It
supports only keyset pagination.

## Installation

```bash
composer require rekalogika/rekapager-doctrine-orm-adapter
```

## Usage

```php
use Doctrine\Common\Collections\Order;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use Rekalogika\Rekapager\Doctrine\ORM\NativeQueryAdapter;
use Rekalogika\Rekapager\Doctrine\ORM\Parameter;
use Rekalogika\Rekapager\Keyset\KeysetPageable;

/** @var EntityManagerInterface $entityManager */

$resultSetMapping = new ResultSetMappingBuilder($entityManager);
$resultSetMapping->addRootEntityFromClassMetadata(Post::class, 'p');

$sql = "
    SELECT {$resultSetMapping}, {{SELECT}}
    FROM post p
    WHERE p.group = :group {{WHERE}}
    ORDER BY {{ORDER}}
    LIMIT {{LIMIT}} OFFSET {{OFFSET}}
";

$countSql = "
    SELECT COUNT(*) AS count
    FROM (
        SELECT *
        FROM post p
        WHERE p.group = :group {{WHERE}}
        ORDER BY {{ORDER}}
        LIMIT {{LIMIT}} OFFSET {{OFFSET}}
    )
";

$countAllSql = "
    SELECT COUNT(*) AS count
    FROM post p
    WHERE p.set_name = :setName
";

$adapter = new NativeQueryAdapter(
    entityManager: $this->entityManager,

    // The ResultSetMapping or ResultSetMappingBuilder instance
    resultSetMapping: $resultSetMapping,

    // The SQL query, must contain placeholders for {{SELECT}}, {{WHERE}},
    // {{ORDER}}, {{LIMIT}}, and {{OFFSET}}
    sql: $sql,

    // The SQL query for counting records, must contain placeholders for
    // {{WHERE}}, {{ORDER}}, {{LIMIT}}, and {{OFFSET}}. The count field must
    // be using the alias 'count'. Optional. If null, the adapter will use $sql
    // encased in a subquery.
    countSql: $countSql,

    // The SQL query for counting all records. Optional. If null, the total will
    // not be available.
    countAllSql: $countAllSql,

    // The ordering must be provided here, not directly in the SQL query.
    orderBy: [
        'p.date' => Order::Descending,
        'p.title' => Order::Ascending,
        'p.id' => Order::Ascending,
    ],

    // The parameters for the query.
    parameters: [
        new Parameter('group', 'some group'),
    ],

    // The property of the result that will be used as the index. Optional.
    indexBy: 'id',
);

$pageable = new KeysetPageable($adapter);
```

