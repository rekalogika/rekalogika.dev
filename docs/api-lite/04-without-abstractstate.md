---
title: Usage Without AbstractState
---

If you don't want your state providers and processors to extend `AbstractState`,
you can wire the services directly.

To use `map()`, you can inject `ApiMapperInterface`. And to use
`mapCollection()`, you can inject `ApiCollectionMapperInterface`. The usage is
the same as described in the [AbstractState section](./abstractstate).

:::warning

Be sure to use the correct service class `ApiMapperInterface`, not
`MapperInterface`, which is the plain mapper implementation from
`rekalogika/mapper` without the remembering feature.

:::