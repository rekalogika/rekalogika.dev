"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[9021],{7413:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var a=r(5893),t=r(1151);const o={title:"API Platform Integration"},i=void 0,s={id:"rekapager/framework-integration/api-platform",title:"API Platform Integration",description:"API Platform integration is provided by the package",source:"@site/docs/rekapager/03-framework-integration/02-api-platform.md",sourceDirName:"rekapager/03-framework-integration",slug:"/rekapager/framework-integration/api-platform",permalink:"/rekapager/framework-integration/api-platform",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/03-framework-integration/02-api-platform.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"API Platform Integration"},sidebar:"docs",previous:{title:"Symfony Integration",permalink:"/rekapager/framework-integration/symfony"},next:{title:"Doctrine Collections Integration",permalink:"/rekapager/framework-integration/doctrine"}},l={},c=[{value:"Installation",id:"installation",level:2},{value:"Provided Components",id:"provided-components",level:2},{value:"Usage in a State Provider or Processor",id:"usage-in-a-state-provider-or-processor",level:2},{value:"Doctrine ORM Support",id:"doctrine-orm-support",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["API Platform integration is provided by the package\n",(0,a.jsx)(n.code,{children:"rekalogika/rekapager-api-platform"}),"."]}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsx)(n.p,{children:"Preinstallation checklists:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Make sure Composer is installed globally, as explained in the ",(0,a.jsx)(n.a,{href:"https://getcomposer.org/doc/00-intro.md",children:"installation\nchapter"})," of the Composer\ndocumentation. Run ",(0,a.jsx)(n.code,{children:"composer about"})," to verify."]}),"\n",(0,a.jsxs)(n.li,{children:["Make sure your project has Symfony Flex installed and enabled (it is enabled\nby default). Run ",(0,a.jsx)(n.code,{children:"composer why symfony/flex"})," to verify."]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/rekapager-api-platform\n"})}),"\n",(0,a.jsx)(n.h2,{id:"provided-components",children:"Provided Components"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["A decorator for ",(0,a.jsx)(n.code,{children:"OpenApiFactoryInterface"})," that changes the type of every\n'page' query parameter from integer to string. It should still be compatible\nwith API Platform's standard pagination system."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"PagerNormalizer"}),": a normalizer for ",(0,a.jsx)(n.code,{children:"PagerInterface"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"RekapagerExtension"}),": an extension for API Platform's Doctrine ORM integration\nto use Rekapager."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"PagerFactory"}),": creates a ",(0,a.jsx)(n.code,{children:"PagerInterface"})," object from a ",(0,a.jsx)(n.code,{children:"PageableInterface"}),",\nthe current operation, and the context. Useful in a state provider or\nprocessor."]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"usage-in-a-state-provider-or-processor",children:"Usage in a State Provider or Processor"}),"\n",(0,a.jsxs)(n.p,{children:["In a state provider, you can use ",(0,a.jsx)(n.code,{children:"PagerFactoryInterface"})," to transform any\n",(0,a.jsx)(n.code,{children:"PageableInterface"})," into a ",(0,a.jsx)(n.code,{children:"PagerInterface"}),". Then, you can simply return the\npager instance and our ",(0,a.jsx)(n.code,{children:"PagerNormalizer"})," will output it correctly."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use ApiPlatform\\Metadata\\Operation;\nuse ApiPlatform\\State\\ProviderInterface;\nuse Rekalogika\\Rekapager\\ApiPlatform\\PagerFactoryInterface;\nuse Rekalogika\\Rekapager\\Doctrine\\Collections\\SelectableAdapter;\nuse Rekalogika\\Rekapager\\Keyset\\KeysetPageable;\n\n/**\n * @implements ProviderInterface<Post>\n */\nclass PostProvider implements ProviderInterface\n{\n    public function __construct(\n        private PagerFactoryInterface $pagerFactory,\n    ) {\n    }\n\n    public function provide(\n        Operation $operation,\n        array $uriVariables = [],\n        array $context = []\n    ): object|array|null {\n        $pageable = ...; // Get or create a PageableInterface object here\n\n        // highlight-next-line\n        $pager = $this->pagerFactory->createPager($pageable, $operation, $context);\n\n        return $pager;\n    }\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"PagerFactory"})," should respect these standard API Platform settings in the\noperation, as well as their corresponding global settings."]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"paginationItemsPerPage"}),": the number of items per page."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"paginationClientEnabled"}),": whether to enable the pagination settings from the\nclient."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"paginationClientItemsPerPage"}),": the number of items per page that the client\nrequested."]}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"paginationMaximumItemsPerPage"})}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"doctrine-orm-support",children:"Doctrine ORM Support"}),"\n",(0,a.jsxs)(n.p,{children:["This package supports the pagination for API Platform's Doctrine ORM integration\nas an alternative to the default pagination. Its usage is opt-in. You can enable\nit per operation using the ",(0,a.jsx)(n.code,{children:"rekapager_orm_enabled"})," extra property:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"#[ApiResource(\n    extraProperties: [\n        'rekapager_orm_enabled' => true\n    ]\n)]\nclass Post\n{\n    // ...\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"To enable it globally, you can set it in the configuration:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-yaml",metastring:'title="config/packages/api_platform.yaml"',children:"api_platform:\n    defaults:\n        extra_properties:\n            rekapager_orm_enabled: true\n"})})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>s,a:()=>i});var a=r(7294);const t={},o=a.createContext(t);function i(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);