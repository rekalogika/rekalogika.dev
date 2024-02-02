---
title: Rationale, or Why Create Another Mapper?
---

TLDR:

* Needs to respect class constraints.
* Automatic mapping based on type information in the classes.
* Option to have a custom mapping logic.
* The custom mapping logic needs to have easy access to the main mapper.
* Helpful error messages.
* Easy to extend.

---

We developed a project that during its planning phase we determined that it
would be beneficial to integrate an automapper into the architecture. We looked
around and found some potential automappers, and decided to go ahead with the
planned architecture.

We first tried
[AutoMapper-Plus](https://github.com/mark-gerarts/automapper-plus) and the first
stumbling block is that it reads and writes directly to properties, including
private properties, which is unacceptable to our purposes. For example, we store
monetary values as integers in the object, and convert them from and to `Money`
objects in the getter and setter. Using this mapper, it would get us the raw
integers, not the `Money` objects. We feel it violates the principles of
encapsulation, **we need a mapper that respects class constraints**. However,
this was not a blocker as it has the option to use a custom property accessor,
and it was possible to resolve this issue by creating an adapter that uses
Symfony PropertyAccess component.

AutoMapper-Plus can automatically create mapping pairs on-the-fly. But it is
limited to simple mapping that does not involve conversion or nested objects. We
needed to create a mapping for every non-trivial pair, despite the type
information is already there in the involved classes. If would be nice if the
mapper **can recognize the type information and maps the variables
automatically**, at least most of the time.

Sometimes, it is necessary to have a custom logic in the mapping, and the mapper
needs to accommodate that. With AutoMapper-Plus, it is possible to create a
custom mapper, but it is not immediately obvious from the interface how to
access the main mapper. It would be nice if we can easily **delegate mapping
tasks to the main mapper** when we need to.

Next, we tried [Jolicode Automapper](https://github.com/jolicode/automapper),
formerly known as [Jane Automapper](https://github.com/janephp/automapper). It
behaved as expected, there were no big surprises, and there was very little to
complain about its behavior. It is very fast as it compiles its mapping code to
PHP files. The problem was error handling. When an error occurred in the
compiled mappers, it was usually a `TypeError` that was difficult to debug, and
even more difficult to resolve the problem. Addressing the problem requires the
skill of working with AST. We found that the problems were usually deployment
errors (usually forgetting to clear the cache), some edge cases (easy to work
around), or bugs in the mapper. It was rare to get an error, but when it
happened, it was difficult and time-consuming to resolve. We did contribute some
fixes back to the project.

We have come to the realization that automatic mapping has these inherent risks,
and when that happens, the mapper should **give us a clear error message**,
including in which mapping pairs the error occurred.

The second problem was that the mapper was difficult to extend. Adding a new
transformer requires the knowledge of working with AST, and there was no option
to do a mapping using plain old PHP code that you write yourself, except for
some limited usage. We hit a brick wall when a new requirement surfaced that
requires the mapper to target an abstract class, a feature that was not
supported by the mapper. We figured it would be easier for us to spend a week
creating our own mapper from scratch using our experiences with the other
mappers. Note: it now supports manual mapping using plain PHP.

Other mappers that were considered:

[MicroMapper](https://github.com/SymfonyCasts/micro-mapper/) is a mapper that
requires you to write the mapping code yourself. It is all manual work, but
still working within the mapping framework, and should be suitable for our
purpose, as long as we are willing to write the mapping code ourselves. It also
easily lets us delegate the mapping of child properties to the main mapper.

We feel the MicroMapper model is not that much more work compared to creating a
custom mapping configuration in other mappers, especially with AI code
generation. We only tried MicroMapper briefly; however, we were way past of
contemplating whether to do the mapping manually. If MicroMapper were available
at the time we started the project, it would be our first choice.

[Pull request for a future Symfony Mapper](https://github.com/symfony/symfony/pull/51741).
In the form that I saw it, it was too simplistic, and does not provide any
extension points. But it is currently the only open pull request about mapper
in Symfony, so it is something to look forward to in the future.