---
title: Multiple Entity Managers
---

This library supports using [multiple entity
managers](https://symfony.com/doc/current/doctrine/multiple_entity_managers.html).
And you can work with them the same way as you would do without domain events.

However, if you need the domain event related methods, you can use
`DomainEventAwareManagerRegistry` in place of `ManagerRegistry`. It adds several
methods to the registry that you can use to manage domain event dispatching:

* `getDomainEventAwareManager()`
* `getDomainEventAwareManagers()`
* `getDomainEventAwareManagerForClass()`

These are basically the same as their counterparts in `ManagerRegistry`, but
return `DomainEventAwareObjectManager` instead of `ObjectManager`.