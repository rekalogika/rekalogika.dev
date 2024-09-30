---
title: Immutable Objects
---

Immutable objects are objects whose state cannot be changed after they are
created. Their state is set during construction and cannot be changed. 

## Immutable Setter a.k.a. Wither Method

While the object itself is immutable, it can provide an immutable setter method,
also known as a wither method. Rather than returning void or itself, the wither
method returns a new instance of the object with the changed state.

Mapper support these immutable setters, as well as immutable adders and
removers. The caveat is that the host object that contains the immutable object
must have a setter method that accepts the new instance. Otherwise, the mapping
will fail with an exception.

## Unalterable Objects

Unalterable objects are our terms for objects that are immutable and do not have
a standard way that Mapper can use to alter their state, including through the
means of the wither method.

When trying to map from a source to an unalterable object, Mapper won't involve
the existing object, and assume it is null. Instead, it will instantiate a new
instance of the same type through the constructor.

## Determining If an Object is Unalterable

Mapper uses a simple heuristic to determine if an object is unalterable:

1. All of its properties are not writable.
2. The above also applies to objects accessible from its readable properties.

## Overriding the Detection

The detection strategy should work most of the time, but if the heuristic fails,
you can override the detection by adding the attribute `#[Unalterable]` or
`#[Unalterable(false)]` to the class.