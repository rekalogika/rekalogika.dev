---
title: Housekeeping
---

Maintaining a summary table involves ensuring that the data in the summary table
is up-to-date with the source table.

## Refreshing Manually from the Command Line

You can refresh the summary table manually from the command line:

```bash
php bin/console rekalogika:analytics:refresh 'App\Entity\SomeSummary' \
    [start key [end key]]
```

Optional arguments:

* `start key` is the start key for the range of entities to refresh. This is the
  partitioning key as described in the
  [partitioning](summary-entity/partitioning) documentation.
* `end key` is the end key that marks the end of the range of entities to
  refresh.

Optional options:

* `--resume=<resume ID>`. If you interrupt the refresh process using
  <kbd>Ctrl</kbd>-<kbd>C</kbd>, it will tell you the resume ID. You can use this
  option to resume the refresh process from where it left off. Note that you
  need to make sure the rest of the arguments and options are the same as when
  you started the refresh process, otherwise the resume won't work.
* `--batch-size=<batch size>`. The number of partitions to refresh in a single
  roll up query. The default is 1. Increasing this may speed up or slow down the
  refresh process.