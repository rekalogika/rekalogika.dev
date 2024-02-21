---
title: Mapping Between Object and Array
---

Mapping between an object and an array follows the same semantics as [mapping
involving an `stdClass`
object](object#classes-with-dynamic-properties-including-stdclass).

Internally, Mapper will convert the array to `stdClass`, and convert the result
back to an array if necessary.