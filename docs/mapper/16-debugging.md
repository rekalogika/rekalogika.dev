---
title: Debugging the Mapper
---

## Command Line

### Get the List of Transformers

```bash
php bin/console debug:container --tag=rekalogika.mapper.transformer
```

### Dump the Mapping Table

```bash
php bin/console rekalogika:mapper:mapping
```

### Get the Mapping Result Between a Source and Target Type

```bash
php bin/console rekalogika:mapper:try 'App\Entity\Book' 'App\Entity\BookDto'
```

## Symfony Profiler

In debug mode, Mapper will collect mapping data and display it in the Symfony
Profiler. You can find comprehensive mapping information in the Mapper tab in
the Symfony Profiler.