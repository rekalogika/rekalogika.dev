---
title: Components Overview
---

These are the components involved in building an API Platform-based project
using the principles described in this documentation.

## Components Defined by Your Application

### Domain Layer

The heart of your software. The domain layer describes the business logic and
rules. It consists of entities, value objects, domain services, and other
supporting classes.

In most Symfony and API Platform projects, Doctrine is used to manage the
persistence of the domain layer. However, it can be anything & our API layer
does not care about how the domain layer is persisted and managed.

### API Resource DTOs

These are the data transfer objects (DTOs) that are used to represent the
resources in the API. In our projects, we will be using these DTOs as the
`ApiResource` classes. Unlike most of the API Platform examples and demos you
will find on the Internet, we will not be adding the `ApiResource` attribute to
our entities.

These DTOs will usually mirror the domain entities. They usually contain a
subset of the properties, but without the domain logic. And like the entities,
these DTOs will usually form a rich, interconnected graph of objects.

These DTOs act as the output of the endpoints.

An entity can be mapped to one or more DTOs if we need different API
representations of a specific entity. For example, we can use a specific DTO
for a class of user, and a different DTO for another class or user.

### Input DTOs

The DTOs representing the input data for operations that require an input, like
POST, PUT, and PATCH.

## Components Defined by API Platform

### State Provider

Used to get the output of a GET operations. Using our guidelines, you will
implement a state provider for every GET operation that you define. The state
provider will be responsible for fetching the entity from the domain layer,
mapping it to the DTO, and returning it.

### State Processor

Modifies the state of the entity. Used by the POST, PUT, PATCH, and DELETE
operations. Using our guidelines, you will implement a state processor for every
operation that modifies the state of the entity.

### Paginator

A paginator is an API Platform interface used to paginate the results of a GET
operations. If your endpoint is a GET operation that is supposed to return a
collection of objects, you should return a paginator object instead of an array
or a collection. By doing so, you will get proper paging of the results.

## Components Defined By `rekalogika/api-lite`

### Mapper

Maps an object to another object. The functionality is provided by
`rekalogika/mapper` behind the scenes. It can be used to map between entities
and DTOs. This mapper provides several critical features for our purposes,
including handling circular references and lazy-loading target objects.
Therefore, we can have interconnected DTOs and API Platform should be able to
generate IRIs without causing the hydration of the entire object graph.

### Paginator Applier

A service provided by `rekalogika/api-lite` to automatically transform
a collection of objects to a paginator. It ships with paginator appliers for
Doctrine Collection, Selectable, Query, QueryBuilder, as well as Pagerfanta and
Pagerfanta adapter..