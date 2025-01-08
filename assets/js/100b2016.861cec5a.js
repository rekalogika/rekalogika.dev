"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[5477],{5673:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>r,toc:()=>c});const r=JSON.parse('{"id":"rekapager/framework-integration/symfony","title":"Symfony Integration","description":"Symfony integration is provided by the package rekalogika/rekapager-bundle.","source":"@site/docs/rekapager/05-framework-integration/01-symfony.md","sourceDirName":"rekapager/05-framework-integration","slug":"/rekapager/framework-integration/symfony","permalink":"/rekapager/framework-integration/symfony","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/05-framework-integration/01-symfony.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"Symfony Integration"},"sidebar":"docs","previous":{"title":"Framework Integration","permalink":"/rekapager/framework-integration/"},"next":{"title":"API Platform Integration","permalink":"/rekapager/framework-integration/api-platform"}}');var a=t(4848),o=t(8453);const i={title:"Symfony Integration"},s=void 0,l={},c=[{value:"Installation",id:"installation",level:2},{value:"Transforming a Pageable into a Pager",id:"transforming-a-pageable-into-a-pager",level:2},{value:"Rendering the Pager",id:"rendering-the-pager",level:2},{value:"Infinite Scrolling",id:"infinite-scrolling",level:2},{value:"Default Options",id:"default-options",level:2},{value:"Customizing Out of Bounds Behavior",id:"customizing-out-of-bounds-behavior",level:2},{value:"Redirecting to the First Page",id:"redirecting-to-the-first-page",level:3},{value:"Showing a Custom Error Message",id:"showing-a-custom-error-message",level:3},{value:"Batch Process Console Command",id:"batch-process-console-command",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["Symfony integration is provided by the package ",(0,a.jsx)(n.code,{children:"rekalogika/rekapager-bundle"}),"."]}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsx)(n.p,{children:"Preinstallation checklists:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Make sure Composer is installed globally, as explained in the ",(0,a.jsx)(n.a,{href:"https://getcomposer.org/doc/00-intro.md",children:"installation\nchapter"})," of the Composer\ndocumentation. Run ",(0,a.jsx)(n.code,{children:"composer about"})," to verify."]}),"\n",(0,a.jsxs)(n.li,{children:["Make sure your project has Symfony Flex installed and enabled (it is enabled\nby default). Run ",(0,a.jsx)(n.code,{children:"composer why symfony/flex"})," to verify."]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/rekapager-bundle\n"})}),"\n",(0,a.jsx)(n.h2,{id:"transforming-a-pageable-into-a-pager",children:"Transforming a Pageable into a Pager"}),"\n",(0,a.jsxs)(n.p,{children:["Before we can render a pagination control in the UI, we need to transform the\n",(0,a.jsx)(n.code,{children:"PageableInterface"})," into a ",(0,a.jsx)(n.code,{children:"PagerInterface"})," object. To do that, wire the\n",(0,a.jsx)(n.code,{children:"PagerFactoryInterface"})," service, and use the ",(0,a.jsx)(n.code,{children:"createPager()"})," method."]}),"\n",(0,a.jsx)(n.p,{children:"Example with a Symfony Controller:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Rekalogika\\Rekapager\\Bundle\\Contracts\\PagerFactoryInterface;\nuse Rekalogika\\Rekapager\\Bundle\\PagerOptions;\nuse Symfony\\Component\\HttpFoundation\\Request;\nuse Symfony\\Component\\HttpFoundation\\Response;\nuse Symfony\\Bundle\\FrameworkBundle\\Controller\\AbstractController;\n\nclass MyController extends AbstractController\n{\n    public function index(\n        PagerFactoryInterface $pagerFactory,\n        Request $request\n    ): Response {\n        $pageable = ...; // Get or create a PageableInterface object here\n\n        // highlight-start\n        $pager = $pagerFactory->createPager(\n            pageable: $pageable,\n            request: $request,\n            options: new PagerOptions(\n                proximity: 3,\n            )\n        );\n        // highlight-end\n\n        return $this->render('my_template.html.twig', [\n            'pager' => $pager,\n        ]);\n    }\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"Available options:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"pageParameterName"}),": The query string parameter name for the page number.\nThe default is ",(0,a.jsx)(n.code,{children:"page"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"proximity"}),": The number of pages to show before and after the current page.\nThe default is ",(0,a.jsx)(n.code,{children:"2"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"routeName"}),": The route name to generate the URL. The default is the current\nroute."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"routeParameters"}),": The route parameters. The default is the current route\nparameters."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"urlReferenceType"}),": The type of URL reference, see\n",(0,a.jsx)(n.code,{children:"UrlGeneratorInterface::generate()"})," for more information. The default is\n",(0,a.jsx)(n.code,{children:"UrlGeneratorInterface::ABSOLUTE_PATH"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"itemsPerPage"}),": The number of items per page. The default is ",(0,a.jsx)(n.code,{children:"50"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"pageLimit"}),": The maximum number of pages to show in the pagination control.\nThe default is the effective value in the pageable object."]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"rendering-the-pager",children:"Rendering the Pager"}),"\n",(0,a.jsxs)(n.p,{children:["In Twig template, you can use the ",(0,a.jsx)(n.code,{children:"rekapager()"})," function to render the pager."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-handlebars",children:'{# Outputs the item from the current page #}\n\n<table class="table">\n    <thead>\n        <tr>\n            <th>ID</th>\n            <th>Title</th>\n            <th>Date</th>\n            <th>Content</th>\n        </tr>\n    </thead>\n\n    {# Optionally enables infinite scrolling #}\n    // highlight-next-line\n    <tbody {{ rekapager_infinite_scrolling_content() }}>\n        {% for post in pager.currentPage %}\n            <tr>\n                <td>{{ post.id }}</td>\n                <td>{{ post.title }}</td>\n                <td>{{ post.date|date(\'Y-m-d\') }}</td>\n                <td>{{ post.content }}</td>\n            </tr>\n        {% endfor %}\n    </tbody>\n</table>\n\n{# Render the pager #}\n\n// highlight-next-line\n{{ rekapager(pager, template="@RekalogikaRekapager/bootstrap5.html.twig") }}\n'})}),"\n",(0,a.jsx)(n.p,{children:"Available options:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"template"}),": The template to use for rendering the pager. The default is\n",(0,a.jsx)(n.code,{children:"@RekalogikaRekapager/default.html.twig"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"proximity"}),": Override the number of pages to show before and after the current\npage."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"locale"}),": Override the current locale for translations."]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"All options are optional."}),"\n",(0,a.jsx)(n.admonition,{type:"tip",children:(0,a.jsxs)(n.p,{children:["Wants to see the pager in your language? Feel free to ",(0,a.jsx)(n.a,{href:"https://github.com/rekalogika/rekapager/tree/main/packages/rekapager-bundle/translations",children:"submit your translation"}),"."]})}),"\n",(0,a.jsx)(n.p,{children:"List of currently available templates:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"@RekalogikaRekapager/default.html.twig"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"@RekalogikaRekapager/bootstrap5.html.twig"})}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"infinite-scrolling",children:"Infinite Scrolling"}),"\n",(0,a.jsxs)(n.p,{children:["Because infinite scrolling is such a common feature in modern web applications,\nwe provide a helper function to enable it. To enable infinite scrolling, simply\nadd ",(0,a.jsx)(n.code,{children:"{{ rekapager_infinite_scrolling_content() }}"})," to the element that contains\nthe items; if you are using a table, it should be the ",(0,a.jsx)(n.code,{children:"tbody"})," element."]}),"\n",(0,a.jsxs)(n.p,{children:["Infinite scrolling will be activated if the width of the page is less than 768px\n(equivalent to Bootstrap's ",(0,a.jsx)(n.code,{children:"xs"})," and ",(0,a.jsx)(n.code,{children:"sm"})," breakpoints) when the page is first\nloaded. It will find the pagination element (",(0,a.jsx)(n.code,{children:".pagination"}),"), take note of the\nnext page URL (from ",(0,a.jsx)(n.code,{children:'[rel="next"]'}),"), and remove the pagination element."]}),"\n",(0,a.jsx)(n.p,{children:"When the user scrolls to the bottom of the page, it will fetch the next page,\nparse the document, get the new items, and appends them to the same element in\nthe current page."}),"\n",(0,a.jsx)(n.h2,{id:"default-options",children:"Default Options"}),"\n",(0,a.jsx)(n.p,{children:"The global defaults can be set in the bundle configuration file."}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",metastring:'title="config/packages/rekapager.yaml"',children:"rekalogika_rekapager:\n    default_template: '@RekalogikaRekapager/default.html.twig'\n    default_page_parameter_name: page\n    default_proximity: 2\n"})}),"\n",(0,a.jsx)(n.h2,{id:"customizing-out-of-bounds-behavior",children:"Customizing Out of Bounds Behavior"}),"\n",(0,a.jsxs)(n.p,{children:["If the user navigates to a page beyond the last page, the pager will throw\n",(0,a.jsx)(n.code,{children:"OutOfBoundsException"}),", and Symfony will show a 404 error page by default."]}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"OutOfBoundsException"})," class provided by the bundle is an extended class\nthat contains information about the pager and the pager options. You can create\na ",(0,a.jsx)(n.code,{children:"KernelEvents::EXCEPTION"})," event listener to intercept the exception and\ncustomize the behavior."]}),"\n",(0,a.jsx)(n.h3,{id:"redirecting-to-the-first-page",children:"Redirecting to the First Page"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Rekalogika\\Rekapager\\Bundle\\Exception\\OutOfBoundsException;\nuse Symfony\\Component\\EventDispatcher\\Attribute\\AsEventListener;\nuse Symfony\\Component\\HttpFoundation\\RedirectResponse;\nuse Symfony\\Component\\HttpKernel\\Event\\ExceptionEvent;\nuse Symfony\\Component\\HttpKernel\\KernelEvents;\n\nfinal readonly class RekapagerOutOfBoundsListener\n{\n    #[AsEventListener(KernelEvents::EXCEPTION)]\n    public function onKernelException(\n        ExceptionEvent $event\n    ): void {\n        $exception = $event->getThrowable();\n\n        if (!$exception instanceof OutOfBoundsException) {\n            return;\n        }\n\n        $url = $exception->getPager()->getFirstPage()->getUrl();\n        $response = new RedirectResponse($url);\n        $event->setResponse($response);\n    }\n}\n"})}),"\n",(0,a.jsx)(n.h3,{id:"showing-a-custom-error-message",children:"Showing a Custom Error Message"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Rekalogika\\Rekapager\\Bundle\\Exception\\OutOfBoundsException;\nuse Symfony\\Component\\EventDispatcher\\Attribute\\AsEventListener;\nuse Symfony\\Component\\HttpFoundation\\Response;\nuse Symfony\\Component\\HttpKernel\\Event\\ExceptionEvent;\nuse Symfony\\Component\\HttpKernel\\KernelEvents;\nuse Twig\\Environment;\n\nfinal readonly class RekapagerOutOfBoundsListener\n{\n    public function __construct(\n        private Environment $twig\n    ) {\n    }\n\n    #[AsEventListener(KernelEvents::EXCEPTION)]\n    public function onKernelException(\n        ExceptionEvent $event\n    ): void {\n        $exception = $event->getThrowable();\n\n        if (!$exception instanceof OutOfBoundsException) {\n            return;\n        }\n\n        $html = $this->twig->render('out_of_bounds.html.twig', [\n            'pager' => $exception->getPager(),\n            'pager_options' => $exception->getPagerOptions(),\n        ]);\n\n        $response = new Response($html, Response::HTTP_NOT_FOUND);\n        $event->setResponse($response);\n    }\n}\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-twig",metastring:'title="templates/out_of_bounds.html.twig"',children:'<!DOCTYPE html>\n<html>\n    <head>\n        <title>Page Not Found</title>\n    </head>\n    <body>\n        <h1>Page Not Found</h1>\n        <p>\n            The page you are looking for does not exist.\n        </p>\n\n        <p>\n            <a href="{{ pager.firstPage.url }}">Go to the first page</a>\n        </p>\n    </body>\n</html>\n'})}),"\n",(0,a.jsx)(n.h2,{id:"batch-process-console-command",children:"Batch Process Console Command"}),"\n",(0,a.jsxs)(n.p,{children:["The package provides a easy-to-use framework for creating console commands for\nbatch processing. Read the ",(0,a.jsx)(n.a,{href:"./../batch-processing/batch-command",children:"Simple Batch\nCommand"})," documentation for more information."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>s});var r=t(6540);const a={},o=r.createContext(a);function i(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);