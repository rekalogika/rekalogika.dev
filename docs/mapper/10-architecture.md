---
title: Architecture
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

This chapter describes the architecture of the library.

<ThemedImage
  alt="File classes"
  sources={{
    light: useBaseUrl('/diagrams/light/mapper.svg'),
    dark: useBaseUrl('/diagrams/dark/mapper.svg'),
  }}
  width="100%"
/>

## Main Components

### Mapper Factory

Creates the mapper service. Only used in non-framework usage.

### Mapper

A façade for the entire mapping framework. A user-facing interface that is used
directly by the caller. It provides a convenient, typed interface, for the
caller, and forwards the call to the main transformer.

### Main Transformer

The main transformer is the entry point of the library. It is responsible
for finding the transformer that supports the source to target mapping,
and forwards the task to that transformer.

### Transformer Registry

A registry of the transformers. It is used by the main transformer to find
the matching transformer for the specific source and target types.

### Object Cache Factory

An object cache stores the objects that have been mapped, keyed by the source
object and the target type. This is used to handle circular references. The
object cache factory creates such object caches.

### Mapping Factory

Creates the mapping table from the list of the transformers.

The mapping table is a list of the supported source to target type, mapped to
the transformer suitable for the task. It is used by `TransformerRegistry` to
find the correct transformer for transforming the source to the target type.

### Transformer

Transforms a source variable to the target variable. A transformer class
provides the list of the supported source to target mappings, as well as
the logic for transforming the source to the target.

## Components Used by Transformers

### Object to Object Metadata Factory

Creates the metadata for `ObjectToObjectTransformer`. The metadata provides all
the information it needs to do the mapping between two objects.

### Symfony Property Info

The library uses the Symfony Property Info component to list the properties of
the source and target variables, and to query their types. This library uses
the `Type` objects returned by the Symfony Property Info component as the
means of describing the types of the source and target variables.

### Property Mapper

A method that maps a single property from the source to the target.

### Property Mapper Resolver

Used to determine if a property mapper is available for a specific source and
target property pair.

### Eager Properties Resolver

Inspect a class and determine the properties that can be safely mapped eagerly.

### Proxy Registry

Register a proxy class, and save it to the filesystem.

### Proxy Generator

Generates the source code of a proxy class.

### Array Like Metadata Factory

Creates the metadata for `TraversableToArrayAccessTransformer` and
`TraversableToTraversableTransformer`. The metadata provides all the information
it needs to do the mapping between two arrays or array-like objects.

### Object Mapper

User provided methods for mapping a specific object pair.

### Object Mapper Resolver

Obtains an object mapper for a specific source and target object pair.

### Object Mapper Table Factory

Constructs the object mapper table from all the available object mappers in the
system.