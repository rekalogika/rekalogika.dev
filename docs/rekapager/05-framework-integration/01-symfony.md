---
title: Symfony Integration
---

Symfony integration is provided by the package `rekalogika/rekapager-bundle`.

## Installation

Preinstallation checklists:

* Make sure Composer is installed globally, as explained in the [installation
  chapter](https://getcomposer.org/doc/00-intro.md) of the Composer
  documentation. Run `composer about` to verify.
* Make sure your project has Symfony Flex installed and enabled (it is enabled
  by default). Run `composer why symfony/flex` to verify.

Open a command console, enter your project directory, and execute:

```bash
composer require rekalogika/rekapager-bundle
```

## Transforming a Pageable into a Pager

Before we can render a pagination control in the UI, we need to transform the
`PageableInterface` into a `PagerInterface` object. To do that, wire the
`PagerFactoryInterface` service, and use the `createPager()` method.

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
        $pageable = ...; // Get or create a PageableInterface object here

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

```handlebars
{# Outputs the item from the current page #}

<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Content</th>
        </tr>
    </thead>

    {# Optionally enables infinite scrolling #}
    // highlight-next-line
    <tbody {{ rekapager_infinite_scrolling_content() }}>
        {% for post in pager.currentPage %}
            <tr>
                <td>{{ post.id }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.date|date('Y-m-d') }}</td>
                <td>{{ post.content }}</td>
            </tr>
        {% endfor %}
    </tbody>
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

## Infinite Scrolling

Because infinite scrolling is such a common feature in modern web applications,
we provide a helper function to enable it. To enable infinite scrolling, simply
add `{{ rekapager_infinite_scrolling_content() }}` to the element that contains
the items; if you are using a table, it should be the `tbody` element.

Infinite scrolling will be activated if the width of the page is less than 768px
(equivalent to Bootstrap's `xs` and `sm` breakpoints) when the page is first
loaded. It will find the pagination element (`.pagination`), take note of the
next page URL (from `[rel="next"]`), and remove the pagination element.

When the user scrolls to the bottom of the page, it will fetch the next page,
parse the document, get the new items, and appends them to the same element in
the current page.

## Default Options

The global defaults can be set in the bundle configuration file.

```yaml title="config/packages/rekapager.yaml"
rekalogika_rekapager:
    default_template: '@RekalogikaRekapager/default.html.twig'
    default_page_parameter_name: page
    default_proximity: 2
```

## Customizing Out of Bounds Behavior

If the user navigates to a page beyond the last page, the pager will throw
`OutOfBoundsException`, and Symfony will show a 404 error page by default.

The `OutOfBoundsException` class provided by the bundle is an extended class
that contains information about the pager and the pager options. You can create
a `KernelEvents::EXCEPTION` event listener to intercept the exception and
customize the behavior.

### Redirecting to the First Page

```php
use Rekalogika\Rekapager\Bundle\Exception\OutOfBoundsException;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final readonly class RekapagerOutOfBoundsListener
{
    #[AsEventListener(KernelEvents::EXCEPTION)]
    public function onKernelException(
        ExceptionEvent $event
    ): void {
        $exception = $event->getThrowable();

        if (!$exception instanceof OutOfBoundsException) {
            return;
        }

        $url = $exception->getPager()->getFirstPage()->getUrl();
        $response = new RedirectResponse($url);
        $event->setResponse($response);
    }
}
```

### Showing a Custom Error Message

```php
use Rekalogika\Rekapager\Bundle\Exception\OutOfBoundsException;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Twig\Environment;

final readonly class RekapagerOutOfBoundsListener
{
    public function __construct(
        private Environment $twig
    ) {
    }

    #[AsEventListener(KernelEvents::EXCEPTION)]
    public function onKernelException(
        ExceptionEvent $event
    ): void {
        $exception = $event->getThrowable();

        if (!$exception instanceof OutOfBoundsException) {
            return;
        }

        $html = $this->twig->render('out_of_bounds.html.twig', [
            'pager' => $exception->getPager(),
            'pager_options' => $exception->getPagerOptions(),
        ]);

        $response = new Response($html, Response::HTTP_NOT_FOUND);
        $event->setResponse($response);
    }
}
```

```twig title="templates/out_of_bounds.html.twig"
<!DOCTYPE html>
<html>
    <head>
        <title>Page Not Found</title>
    </head>
    <body>
        <h1>Page Not Found</h1>
        <p>
            The page you are looking for does not exist.
        </p>

        <p>
            <a href="{{ pager.firstPage.url }}">Go to the first page</a>
        </p>
    </body>
</html>
```

## Batch Process Console Command

The package provides a easy-to-use framework for creating console commands for
batch processing. Read the [Simple Batch
Command](./../batch-processing/batch-command) documentation for more information.
