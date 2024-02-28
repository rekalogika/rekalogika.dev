---
title: Mapping
---

By separating the entity and the `ApiResource` DTO, mapping between the two
becomes a very common task. This package utilizes our `rekalogika/mapper` as its
mapping engine. Usually, you will use it indirectly through the `map()` and
`mapCollection()` methods in the `AbstractState` class.

## When To Use the Mapper and When Not To

When you need to map an entity to a DTO, then the mapper is almost always the
tool for the job. It handles circular references and supports lazy-loading,
things that are difficult to do manually. The mapper should work most of the
time. And when it doesn't, it is only a simple matter to extend it.

However, when you need to map a DTO to an entity, it requires more
consideration. Your domain model might mandate a specific way to do things,
which is more than just calling the setters. If you can rely too much on the
mapper, it might indicate that your domain model is
[anemic](https://martinfowler.com/bliki/AnemicDomainModel.html), and you should
look into that. The integrity of your domain model should not suffer just
because using the mapper is convenient.

## Lazy Loading

The mapper supports lazy loading on regular objects and collection objects. So,
you are free to add relations among your DTOs as much as you need. You can have
your DTOs mirror the relations of your domain entities as closely as you want
without worrying about excessive Doctrine queries.

These are what you need to keep in mind:

* The DTOs must not be `final`. Otherwise, lazy loading will not work.
* You should type hint collection properties using `CollectionInterface`. Plain
  arrays cannot support lazy loading.
* Your DTOs must use the same identifier as your entities. Otherwise, the DTO
  might cause unwanted hydration of the source entity.

:::tip Protip

Mapper has a panel in Symfony Profiler. You can use it to debug the mapper if
you have a mapping problem.

:::

### Lazy-Loading Collection Example

API platform will turn the `reviews` property to the IRI of the collection:

```php
use ApiPlatform\Core\Annotation\ApiProperty;
use Rekalogika\Mapper\CollectionInterface;

class BookDto
{
    /**
     * @var ?CollectionInterface<int,ReviewDto>
     */
    #[ApiProperty(uriTemplate: '/books/{bookId}/reviews')]
    public ?CollectionInterface $reviews = null;
}
```

In this case, the serializer will not read the content of the `reviews`
property, and therefore Doctrine won't hydrate the source collection.

### Lazy-Loading Object Example

The `book` property below will be turned into the IRI of the `BookDto` resource:

```php
class ReviewDto
{
    public ?BookDto $book = null;
}
```

To generate the IRI, API Platform requires only the identifier. Doctrine will
not hydrate the entity if all we are getting from it is the identifier. Mapper's
proxy is smart enough to determine the identifier of the Doctrine entity, and
won't try to map the other properties.

Therefore, generating an IRI won't cost you a Doctrine query, as long as you
make sure both the DTO and the Doctrine entity use the same identifier property.

:::tip Protip

Just use `id` as the identifier property everywhere, and be done with it.

:::

## The Mapper Remembers...

The mapper remembers the previous mappings it has done in the same request, and
will take note of the *reverse* of the mappings.

If the client sent an IRI in the request, like
`/user/books/018dda4b-1884-76ab-af9d-71ab512a0c84`, API Platform will resolve
the IRI using a State Provider having the same URL pattern. If you are using
the same pattern elaborated in this document, then your State Provider will
get the entity from the database, map it to its DTO, and returns the DTO.

Once API Platform has the DTO, it will pass it as part of the input of your
State Processor. So you are getting the DTO, not the entity you need. How would
you get the entity? You map the DTO to the entity class. It will return you the
entity because you once mapped the entity to the DTO in the State Provider.
