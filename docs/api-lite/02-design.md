---
title: Design Considerations & Decisions
---

Some of our design considerations and decisions based on our experience. These
are what we consider as the best practice of using API Platform. Some of these
are more opinionated than the others, and might or might not apply to your
project.

:::info

We are an exclusive REST/OpenAPI shop. Our approach might have issues with
GraphQL, but we cannot say for sure. If you know something, please let us know.

:::

## Component Decoupling

API Platform must not implicitly interact with Doctrine or other persistence
layer behind the scenes. You can do that by not attaching `#[ApiResource]` to
any Doctrine entities. But to make sure this is the case, you can add these
options to your configuration:

```yaml title="config/packages/api_platform.yaml"
api_platform:
    doctrine:
        enabled: false
    doctrine_mongodb_odm:
        enabled: false
```

## DTOs as the `ApiResource`

Domain entities are not designated `ApiResource`. Instead, we create a DTO for
the purpose. Then, in the state providers and processors, we will map the entity
to the DTO, and return the DTO.

## No Serialization Groups

Serialization groups are not scalable. They can start becoming unwieldy as the
project grows. Instead, if we need a different API representation of the same
entity, we explicitly create multiple DTOs that act as the `ApiResource`. These
different DTOs should get a different URL and a different `shortName`.

## Separate Input and Output DTOs

Avoid using the same DTO as both input and output, and using serialization
groups to define the differences between the two. Instead, we use a separate DTO
for input and output.

The `ApiResource` DTOs defines the output data structure. In POST, PUT, and
PATCH endpoints, we create another DTO to represent the input data structure. In
the `ApiResource` DTO, we use the `input` argument to point to the input DTO.

## Provider-less Operations

`ApiResource` and all of its operations do not get assigned a provider, except
for `Get` and `GetCollection`. All processors get their data directly from the
repository. We find this degree of explicitness helps with DX, readability, and
flexibility.

`Get` and `GetCollection` also gets a separate provider each for more
explicitness.

`Put`, `Patch`, and `Delete` will require a `read: false` option to prevent
`404` error.

## Authorization

Because of the nature of our provider-less operations above, the `security`
property in `ApiResource` and its operations will be less useful, as `object`
will either be `null` or points to the DTO, not the entity.

Instead, our `AbstractState` provides `isGranted()` and
`denyAccessUnlessGranted()` methods that most of us are already familiar.
Security checks involving an action toward an object should be done next to the
action anyway, not in a separate class. Otherwise, it reduces readability, and
can easily lead to coding errors.
