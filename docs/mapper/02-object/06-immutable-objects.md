---
title: Immutable Objects
---

Immutable objects are objects whose state cannot be changed after they are
created. Their state is set during construction and cannot be changed. 

While the object itself is immutable, it can provide an immutable setter method,
also known as a wither method. Rather than returning void or itself, the wither
method returns a new instance of the object with the requested change.

Mapper supports these immutable setters, as well as immutable adders and
removers. The caveat is that the host object that contains the immutable object
must have a setter method that accepts the new instance. Otherwise, the mapping
will fail with an exception.

:::note

Mapping using property paths does not support immutable setters.

:::