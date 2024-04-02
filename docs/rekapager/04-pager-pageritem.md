---
title: Pager and Pager Items
---

A `PagerInterface` represents navigation through a collection of items. A view
layer can use it to render a pagination control.

:::info

This chapter is Symfony specific.

:::

A pager works at a higher level than a `PageableInterface`. It needs to be able
to determine the current page from the context of the request, and it needs to
be able to generate URLs for each page. Therefore, a factory should be used to
instantiate a pager, and the factory will be framework-specific.

A pager has many pager items. A pager item is an extended page object that
contains a URL.

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

<ThemedImage
  alt="File classes"
  sources={{
    light: useBaseUrl('/diagrams/light/rekapager-pager.svg'),
    dark: useBaseUrl('/diagrams/dark/rekapager-pager.svg'),
  }}
  width="100%"
/>

## Transforming a Pageable into a Pager

Before we can render a pagination control in the UI, we need to transform the
`PageableInterface` into a `PagerInterface` object. To do that, wire the
`PagerFactoryInterface` service, and use the `create()` method.

Example with a Symfony Controller:

```php
use Rekalogika\Rekapager\Bundle\Contracts\PagerFactoryInterface;
use Rekalogika\Rekapager\Bundle\PagerOptions;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MyController extends AbstractController
{
    public function index(
        PagerFactoryInterface $pagerFactory,
        Request $request
    ): Response {
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

Available options:

* `pageParameterName`: The query string parameter name for the page number.
  The default is `page`.
* `proximity`: The number of pages to show before and after the current page.
  The default is `2`.
* `routeName`: The route name to generate the URL. The default is the current
  route.
* `routeParameters`: The route parameters. The default is the current route
  parameters.
* `urlReferenceType`: The type of URL reference, see
  `UrlGeneratorInterface::generate()` for more information. The default is
  `UrlGeneratorInterface::ABSOLUTE_PATH`.
* `itemsPerPage`: The number of items per page. The default is `50`.
* `pageLimit`: The maximum number of pages to show in the pagination control.
  The default is the effective value in the pageable object.

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

// highlight-next-line
{{ rekapager(pager, template="@RekalogikaRekapager/bootstrap5.html.twig") }}
```

Available options:

* `template`: The template to use for rendering the pager. The default is
  `@RekalogikaRekapager/default.html.twig`.
* `proximity`: Override the number of pages to show before and after the current
  page.
* `locale`: Override the current locale for translations.

All options are optional.

:::tip

Wants to see the pager in your language? Feel free to [submit your translation](https://github.com/rekalogika/rekapager/tree/main/packages/rekapager-bundle/translations).

:::

List of currently available templates:

* `@RekalogikaRekapager/default.html.twig`
* `@RekalogikaRekapager/bootstrap5.html.twig`

## Default Options

The global defaults can be set in the bundle configuration file.

```yaml title="config/packages/rekapager.yaml"
rekalogika_rekapager:
    default_template: '@RekalogikaRekapager/default.html.twig'
    default_page_parameter_name: page
    default_proximity: 2
```