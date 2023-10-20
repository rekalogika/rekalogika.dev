---
title: Usage
---

This chapter describes how to use the bundle.

## Specifying the URL to the Gotenberg Server

The bundle uses the `GOTENBERG_URL` environment variable to determine the URL to
the Gotenberg server. You can override it using the standard [Symfony
environment variable](https://symfony.com/doc/current/configuration.html#configuration-based-on-environment-variables) mechanism.

## General Usage

Callers will interact with the `PdfGeneratorInterface` to generate PDF files.
The `PdfGeneratorInterface` is a high-level interface that abstracts away the
implementation details of the underlying PDF generator.

```php
namespace Rekalogika\Contracts\Print;

use Psr\Http\Message\StreamInterface;

interface PdfGeneratorInterface
{
    public function generatePdfFromHtml(
        string $htmlContent,
        PaperInterface $paper,
        PageLayoutInterface $pageLayout,
        ?string $header = null,
        ?string $footer = null,
    ): StreamInterface;
}
```

To get an instance of `PdfGeneratorInterface`, you can usually autowire it in
your controller or service:

```php
namespace App\Controller;

use Rekalogika\Contracts\Print\PdfGeneratorInterface;

class AppController
{
    public function index(PdfGeneratorInterface $pdfGenerator)
    {
        // ...
    }
}
```

`generatePdfFromHtml()` returns a PSR-7 `StreamInterface` containing the
resulting PDF file. To get the raw PHP resource, call `detach()` on the result.

## Paper Size

The method `generatePdfFromHtml` requires a `$paper` parameter containing a
`PaperInterface` instance. It defines the paper size of the PDF output. You can
use the `Paper` class to create a paper size:

```php
use Rekalogika\Print\Paper;

$a4Paper = Paper::A4(); // A4
$letterPaper = Paper::Letter(); // Letter
$customPaper = Paper::inMm(200, 300); // Custom paper size in mm
$customPaperInInches = Paper::inInches(7, 10); // Custom paper size in inches
```

There are many other paper sizes defined in the class.

## Page Layout

The method `generatePdfFromHtml` requires a `$pageLayout` parameter containing
a `PageLayoutInterface` instance. It defines the orientation of the page and
its margins. You can use the `PageLayout` class to create a page layout:

```php
use Rekalogika\Print\PageLayout;
use Rekalogika\Contracts\Print\PageOrientation;

// Portrait with 30mm margins
$layout = PageLayout::inMm(PageOrientation::Portrait, 30);

// Landscape with 2 inches of vertical margin and 1 inch of horizontal margin
$layout = PageLayout::inInches(PageOrientation::Landscape, 2, 1);

// Portrait with 10mm top margin, 20mm right margin, 30mm bottom margin, and
// 40mm left margin
$layout = PageLayout::inMm(PageOrientation::Portrait, 10, 20, 30, 40);
```

## Header and Footer

The `$header` and `$footer` parameters of `generatePdfFromHtml` are optional.
You can use them to specify the HTML content of the header and footer of the PDF
file. Read the [Header and
Footer](https://gotenberg.dev/docs/routes#header--footer) chapter of the
Gotenberg documentation to learn more.
