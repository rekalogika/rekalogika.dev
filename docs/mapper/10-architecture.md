---
title: Architecture
---

This chapter describes the architecture of the library.

### Transformers

Transforms a source variable to the target variable. A transformer class
provides the list of the supported source to target mappings, as well as
the logic for transforming the source to the target.

### Main Transformer

The main transformer is the entry point of the library. It is responsible
for finding the transformer that supports the source to target mapping,
and transforming the source to the target using that transformer.

### Transformer Registry

A registry of the transformers. It is used by the main transformer to find
the matching transformer for the specific source and target types.

### Mapping Table Factory

Creates the mapping table from the list of the transformers.

The mapping table is a list of the supported source to target type, mapped to
the transformer suitable for the task. It is used by the main transformer to
find the correct transformer for transforming the source to the target type.

### Mapper

A façade for the main transformer. A user-facing interface that is used directly
by the caller. It provides a convenient, typed interface, for the caller, and
forwards the call to the main transformer.

### Mapper Factory

Creates the mapper service. Only used in non-framework usage.

### Object Cache

A mapping job has an object cache that is used to store the objects that have
been mapped. This is used to handle circular references.

### Symfony Property Info

The library uses the Symfony Property Info component to list the properties of
the source and target variables, and to query their types. This library uses
the `Type` objects returned by the Symfony Property Info component as the
means of describing the types of the source and target variables.