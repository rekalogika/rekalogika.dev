---
title: Partitioning
---

For performance and to facilitate incremental updates, the summary table is
partitioned according to the property tagged with the `#[Analytics\Partition]`
attribute. This property must be a Doctrine embeddable that implements
`Partition`.

:::warning

The partitioning term used here is different from the partitioning term used in
the database. Although, it might be possible to use the summary partitioning key
as the database partition key.

:::

## Best Practices, or TLDR;

If the source entity uses an auto-incrementing integer primary key, use this
partitioning scheme:

```php
use Doctrine\ORM\Mapping as ORM;
use Rekalogika\Analytics\Attribute as Analytics;
use Rekalogika\Analytics\Model\Summary;
use Rekalogika\Analytics\Partition\DefaultIntegerPartition;
use Rekalogika\Analytics\ValueResolver\PropertyValueResolver;

class YourSummary extends Summary
{
    // highlight-start
    #[ORM\Embedded()]
    #[Analytics\Partition(new PropertyValueResolver('id'))]
    private DefaultIntegerPartition $partition;
    // highlight-end
}
```

If your source entity uses UUIDv7 (or ULID) as the primary key, use this
partitioning scheme:

```php
use Doctrine\ORM\Mapping as ORM;
use Rekalogika\Analytics\Attribute as Analytics;
use Rekalogika\Analytics\Model\Partition\UuidV7IntegerPartition;
use Rekalogika\Analytics\Model\Summary;
use Rekalogika\Analytics\ValueResolver\UuidToTruncatedIntegerResolver;

class YourSummary extends Summary
{
    // highlight-start
    #[ORM\Embedded()]
    #[Analytics\Partition(new UuidToTruncatedIntegerResolver('id'))]
    private UuidV7IntegerPartition $partition;
    // highlight-end
}
```

## Concepts

A property of the source entity is designated the **partitioning key**. The key
is used to partition the data. The key is usually the primary key of the source
entity, but not necessarily so. The key must be monotonic, or always increasing,
but not necessarily unique.

Partitioning is divided into **levels**. Each level consists of multiple
**partition** of the same length, one after the other. Levels are indicated by a
number. A lower level has a shorter length than a higher level.

A partition is indicated by the **level** and the **key**. A partition of a
level consists of several partitions of the lower level, except the lowermost
level.

Records from the source entity are grouped by a specific lowest level partition
according to the **partitioning key**, and rolled up into that partition. Then,
eventually, the lowest level accumulates enough partitions, and in turn they are
rolled up into the next higher level partition. And so on, until the highest
level is reached.

If new source entities are added, they will be rolled up to the newest lowest
level partition, and the framework does not need to reprocess the entire summary
table.

If changes are detected in the old records, the lowest partition is marked as
dirty. The framework will reprocess the dirty partition, then mark the higher
level partition as dirty, and so on, until it bubbles up to the highest level.
Again, the framework does not need to reprocess the entire summary table.

## Available Partitioning Strategies

### `DefaultIntegerPartition`

Suitable for partitioning auto-incrementing integer primary keys. It partitions
using 11, 22, 33, 44, and 55 bits of width. A 11-bit partition aggregates up to
2048 records.

### `UuidV7IntegerPartition`

Suitable for partitioning UUIDv7 (or ULID) primary keys. It should be coupled
by a `UuidToTruncatedIntegerResolver` value resolver that truncates the 128-bit
UUID to a 48-bit integer.

UUIDv7 stores the time in the first 48 bits. So, the widths of each level
correspond to the following intervals:

- 22 bits: corresponds to 1.165 hour interval
- 27 bits: corresponds to 1.6 days interval
- 32 bits: corresponds to 50 days interval
- 37 bits: corresponds to 4.3 years interval

### Custom Integer Partition

You can create a custom integer partition by extending `IntegerPartition`.

### Custom Non-Integer Partition

You might be able to create your own non-integer partition by implementing the
`Partition` interface, but currently this is untested and unsupported.

## How Partitioning Works

The following table shows how the records are partitioned using the hypothetical
`IntegerPartition` with 1-2-3-4-5-6 bits of partitioning width. The leftmost
column indicates the level. Other cells are the partitions of that level.
Numbers in the cells indicate the partitioning key range that are rolled-up in
the partition.

<table class="partitioning">

<tr>
<th>L6</th>
<td colspan="32">0-63</td>
</tr>

<tr>
<th>L5</th>
<td colspan="16">0-31</td>
<td colspan="16">32-63</td>
</tr>

<tr>
<th>L4</th>
<td colspan="8">0-15</td>
<td colspan="8">16-31</td>
<td colspan="8">32-47</td>
<td colspan="8">48-63</td>
</tr>

<tr>
<th>L3</th>
<td colspan="4">0-7</td>
<td colspan="4">8-15</td>
<td colspan="4">16-23</td>
<td colspan="4">24-31</td>
<td colspan="4">32-39</td>
<td colspan="4">40-47</td>
<td colspan="4">48-55</td>
<td colspan="4">56-63</td>
</tr>

<tr>
<th>L2</th>
<td colspan="2">0-3</td>
<td colspan="2">4-7</td>
<td colspan="2">8-11</td>
<td colspan="2">12-15</td>
<td colspan="2">16-19</td>
<td colspan="2">20-23</td>
<td colspan="2">24-27</td>
<td colspan="2">28-31</td>
<td colspan="2">32-35</td>
<td colspan="2">36-39</td>
<td colspan="2">40-43</td>
<td colspan="2">44-47</td>
<td colspan="2">48-51</td>
<td colspan="2">52-55</td>
<td colspan="2">56-59</td>
<td colspan="2">60-63</td>
</tr>

<tr>
<th>L1</th>
<td>0-1</td>
<td>2-3</td>
<td>4-5</td>
<td>6-7</td>
<td>8-9</td>
<td>10-11</td>
<td>12-13</td>
<td>14-15</td>
<td>16-17</td>
<td>18-19</td>
<td>20-21</td>
<td>22-23</td>
<td>24-25</td>
<td>26-27</td>
<td>28-29</td>
<td>30-31</td>
<td>32-33</td>
<td>34-35</td>
<td>36-37</td>
<td>38-39</td>
<td>40-41</td>
<td>42-43</td>
<td>44-45</td>
<td>46-47</td>
<td>48-49</td>
<td>50-51</td>
<td>52-53</td>
<td>54-55</td>
<td>56-57</td>
<td>58-59</td>
<td>60-61</td>
<td>62-63</td>
</tr>

</table>

If we currently have 21 records already rolled-up, these are the partition that
we will have. If we were to perform a query, the framework will combine the
highlighted partitions to get the result:

<table class="partitioning">

<tr>
<th>L6</th>
</tr>

<tr>
<th>L5</th>
</tr>

<tr>
<th>L4</th>
<td colspan="8" class="highlight">0-15</td>
</tr>

<tr>
<th>L3</th>
<td colspan="4">0-7</td>
<td colspan="4">8-15</td>
</tr>

<tr>
<th>L2</th>
<td colspan="2">0-3</td>
<td colspan="2">4-7</td>
<td colspan="2">8-11</td>
<td colspan="2">12-15</td>
<td colspan="2" class="highlight">16-19</td>
</tr>

<tr>
<th>L1</th>
<td>0-1</td>
<td>2-3</td>
<td>4-5</td>
<td>6-7</td>
<td>8-9</td>
<td>10-11</td>
<td>12-13</td>
<td>14-15</td>
<td>16-17</td>
<td>18-19</td>
<td class="highlight">20-21</td>
</tr>

</table>