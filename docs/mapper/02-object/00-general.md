---
title: General
---

Mapping an object to another object is the most common task done by a mapper.
Internally, this task is done by `ObjectToObjectTransformer`.

## How It Works

The mapper identifies properties that have the same name on the source and the
target side. It looks at public properties, public getters & setters, and
constructor arguments.

It gets the existing value on the target side. If it is null, then it
instantiates a new target object, populating its constructor arguments by
transforming properties of the same name from the source object.

Then, it transforms each source property to the target type, and sets them on
the target.