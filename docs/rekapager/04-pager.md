---
title: Pager
---

A `PagerInterface` represents navigation through a collection of items. A view
layer can use it to render a pagination control.

A pager works at a higher level than a `PageableInterface`. It needs to be able
to determine the current page from the context of the request, and it needs to
be able to generate URLs for each page. Therefore, a factory should be used to
instantiate a pager, and the factory will be framework-specific.

:::info

The example below uses the Symfony integration provided by the package
`rekalogika/rekapager-bundle`.

:::

## Transforming a Pageable into a Pager

Before we can be able to render a pagination control in the UI, we need to
transform the `PageableInterface` into a `PagerInterface` object. To do that,
wire the `PagerFactoryInterface` service, and use the `create()` method.

Example in a Symfony Controller:

```php
use Rekalogika\Rekapager\Bundle\Contracts\PagerFactoryInterface;
use Rekalogika\Rekapager\Bundle\PagerOptions;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MyController extends AbstractController
{
    public function index(PagerFactoryInterface $pagerFactory, Request $request)
    {
        $pageable = ...; // Create a PageableInterface object

        // highlight-start
        $pager = $pagerFactory->createPager(
            pageable: $pageable,
            request: $request,
            options: new PagerOptions(
                proximity: 3,
            )
        );
        // highlight-end

        return $this->render('my_template.html.twig', [
            'pager' => $pager,
        ]);
    }
}
```

## Rendering the Pager

In Twig template, you can use the `rekapager()` function to render the pager.

```twig
{# Outputs the item from the current page #}

<table class="table">
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Date</th>
        <th>Content</th>
    </tr>
    {% for post in pager.currentPage %}
        <tr>
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.date|date('Y-m-d') }}</td>
            <td>{{ post.content }}</td>
        </tr>
    {% endfor %}
</table>

{# Render the pager #}

{{ rekapager(pager) }}
```