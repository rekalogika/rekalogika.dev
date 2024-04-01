---
title: Integrating Rekapager into a Framework
---

This document explains what you need to do to integrate Rekapager into a
framework.

## Implement `PageIdentifierEncoderLocatorInterface`

It takes the class name of a page identifier object, and returns an instance of
`PageIdentifierEncoderInterface` that will be used to encode and decode the page
identifier.

Rekapager ships with two pageable types: `KeysetPageable` and `OffsetPageable`
(`PagerfantaPageable` is a wrapper around `OffsetPageable`, so it doesn't apply
here). The packages already have the encoders, all you need to do is to
wire their dependencies, and implement the locator.

## Implement `PageUrlGeneratorInterface`

It takes a page identifier already converted into a string, and returns a URL
containing the string.

## Create a Pager Factory

This factory should do the following:

* Take a `PageableInterface` object from the caller.
* Determine the page identifier string from the URL. If not found, use the first
  page as the current page.
* Transform the string into a page identifier object. You can use the same
  locator that you implemented earlier. To get the identifier class, you can
  call the static method `getPageByIdentifier()` on the pageable object.
* Call `getPageByIdentifier()` on the pageable object to get the current page.
* Instantiate `Pager`, and return it.

## Create a Pager Renderer (optional)

This class should take a `PagerInterface` object, and render the pagination
control in the user interface, which is probably the final result that most
people are looking for.