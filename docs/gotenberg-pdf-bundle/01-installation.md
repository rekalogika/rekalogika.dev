---
title: Installation & Quick Start
---

This chapter describes how to install and use the bundle.

## Installation

Preinstallation checklists:

* Make sure Composer is installed globally, as explained in the [installation
  chapter](https://getcomposer.org/doc/00-intro.md) of the Composer
  documentation. Run `composer about` to verify.
* Make sure your project has Symfony Flex installed and enabled (it is enabled
  by default). Run `composer why symfony/flex` to verify.

Open a command console, enter your project directory, and execute:

```bash
composer config extra.symfony.allow-contrib true
composer require rekalogika/gotenberg-pdf-bundle
```

## Quick Start

Checklist:

* Make sure you have Docker Compose installed. Run `docker compose version` to
  verify.
* Make sure you have Symfony CLI installed. Run `symfony version` to verify.

To start the Gotenberg server (and other services registered in the Docker
Compose configuration), run:

```bash
docker compose up -d
```

Then start the web server using Symfony CLI:

```bash
symfony serve
```

Create a sample controller for generating a PDF file:

```php title="src/Controller/AppController.php"
namespace App\Controller;

use Rekalogika\Contracts\Print\PageOrientation;
use Rekalogika\Contracts\Print\PdfGeneratorInterface;
use Rekalogika\Print\PageLayout;
use Rekalogika\Print\Paper;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route('/pdf')]
    public function index(PdfGeneratorInterface $pdfGenerator): Response
    {
        $pdf = $pdfGenerator->generatePdfFromHtml(
            htmlContent: '<h1>Hello World</h1>',
            paper: Paper::A4(),
            pageLayout: PageLayout::inMm(PageOrientation::Portrait, 30)
        );

        return new StreamedResponse(
            callback: fn () => fpassthru($pdf->detach()),
            status: 200,
            headers: [
                'Content-Type' => 'application/pdf',
            ]
        );
    }
}
```

Then open your browser and go to [localhost:8000/pdf](http://localhost:8000/pdf).