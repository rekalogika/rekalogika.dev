---
title: Rationale, or Why Create Another Mapper?
---

We developed a project that during its planning phase we determined that it
would be beneficial to integrate an automapper into the architecture. We looked
around and found some potential automappers, and decided to go ahead with the
planned architecture.

We first tried
[AutoMapper-Plus](https://github.com/mark-gerarts/automapper-plus) and
immediately ran into the issue that it reads and writes directly to properties,
including private properties, which is unacceptable to our purposes. For
example, we store monetary values as integers in the object, and convert them
from and to `Money` objects in the getter and setter. Using this mapper, it
would get the raw integers, not the `Money` objects. We also feel it violates
the principles of encapsulation. However, this was not a blocker as it supports
a custom property accessor, and it was possible to resolve this issue by
creating an adapter that uses Symfony PropertyAccess component.

With AutoMapper-Plus, users are expected to create a mapping configuration for
each mapping pair. It has an automatic creation of mappings, but it seems to
only work for simple mapping. Also, all of our entities and DTOs are typed, but
we need to create a mapping for every non-trivial pair, despite the type
information is already there in the involved classes. Custom mapper is
available, but it does not let us access the main mapper. If a mapping pair uses
a custom mapper, we are responsible for mapping everything, including the nested
objects ourselves because the option to delegate to the main mapper is not
available. There was another case that was simply not possible to accomplish, I
don't remember what it was, but it forced us to switch to another mapper
overnight.

Our next mapper was [Jolicode
Automapper](https://github.com/jolicode/automapper), formerly known as [Jane
Automapper](https://github.com/janephp/automapper). It behaved as expected,
there were no big surprises, and there was very little to complain about its
behavior. It should also be very fast, as it compiles its mapping code to PHP
files. The problem was error handling. When an error occurred in the compiled
mappers, it was usually a `TypeError`. It was difficult to debug, and even more
difficult to resolve the problem, addressing the problem requires the skill of
working with AST. We found that the problems were usually deployment errors
(usually forgetting to clear the cache), some edge cases (easy to work around),
or bugs in the mapper. It was rare to get an error, but when it happened, it was
difficult and time-consuming to resolve. We did contribute some fixes back to
the project.

The second problem was that the mapper was difficult to extend. Adding a new
transformer requires the skill of working with AST, and there was no option to
do a mapping using plain old PHP code that you write yourself. We hit a brick
wall when a new requirement surfaced that requires the mapper to target an
abstract class, a feature that was not supported by the mapper. We figured it
would be easier for us to spend a week creating our own mapper from scratch
using our experiences with the other mappers, and here we are.

Other mappers that were considered:

[MicroMapper](https://github.com/SymfonyCasts/micro-mapper/) is a mapper that
requires you to write the mapping code yourself. It is all manual work, but
still working within the mapping framework, and should be suitable for our
purpose, as long as we are willing to write the mapping code ourselves. The
mapping code also supports delegating to the main mapper, unlike
AutoMapper-Plus. However, at this point, we were way past of contemplating
whether to do it manually, so we did not consider it further.

[Pull request for a future Symfony Mapper](https://github.com/symfony/symfony/pull/51741).
In the form that I saw it, it was too simplistic, and does not provide any
extension points. I (@priyadi) did provide some feedback in the pull request.