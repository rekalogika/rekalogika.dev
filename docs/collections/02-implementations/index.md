---
title: Implementations
---

import DocCardList from '@theme/DocCardList';

## Summary

| Underlying object         | Full flavor             | Minimal flavor                 | Extra-Minimal flavor |
| ------------------------- | ----------------------- | ------------------------------ | -------------------- |
| `Collection`              | `RecollectionDecorator` | `MinimalRecollectionDecorator` |                      |
| `Collection` + `Criteria` | `CriteriaRecollection`  | `MinimalCriteriaRecollection`  |                      |
| `ManagerRegistry`         | `AbstractRepository`    | `AbstractMinimalRepository`    |                      |
| `QueryBuilder`            | `QueryRecollection`     |                                | `QueryPageable`      |


## Sections

<DocCardList />