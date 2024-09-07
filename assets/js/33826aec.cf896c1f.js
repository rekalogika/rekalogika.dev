"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[6752],{356:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var i=t(4848),o=t(8453);const a={title:"Pagination"},r=void 0,s={id:"api-lite/pagination",title:"Pagination",description:"The mapCollection() method automates the task of handling collection results,",source:"@site/docs/api-lite/06-pagination.md",sourceDirName:"api-lite",slug:"/api-lite/pagination",permalink:"/api-lite/pagination",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/api-lite/06-pagination.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{title:"Pagination"},sidebar:"docs",previous:{title:"Mapping",permalink:"/api-lite/mapping"},next:{title:"Filtering",permalink:"/api-lite/filtering"}},c={},l=[{value:"Usage",id:"usage",level:2},{value:"Supported Collection Objects",id:"supported-collection-objects",level:2},{value:"Keyset Pagination (or Cursor Pagination) using Rekapager",id:"keyset-pagination-or-cursor-pagination-using-rekapager",level:2},{value:"Supporting Other Collection Objects",id:"supporting-other-collection-objects",level:2},{value:"Use Case: Doctrine Repository",id:"use-case-doctrine-repository",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"mapCollection()"})," method automates the task of handling collection results,\nincluding pagination."]}),"\n",(0,i.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(n.p,{children:["Common usage pattern in a state provider for a ",(0,i.jsx)(n.code,{children:"GetCollection"})," endpoint:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use ApiPlatform\\Metadata\\Operation;\nuse Rekalogika\\ApiLite\\State\\AbstractProvider;\n\n/**\n * @extends AbstractProvider<SomeObjectDto>\n */\nclass CollectionProvider extends AbstractProvider\n{\n    // ...\n\n    public function provide(\n        Operation $operation,\n        array $uriVariables = [],\n        array $context = []\n    ): object|array|null {\n        // get the $collectionObject here\n\n        // highlight-start\n        return $this->mapCollection(\n            collection: $collectionObject,\n            target: SomeObjectDto::class,\n            operation: $operation,\n            context: $context\n        );\n        // highlight-end\n    }\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The highlighted code takes the ",(0,i.jsx)(n.code,{children:"$collectionObject"}),", pages it according to the\npaging parameters provided by API Platform, maps each item in the collection to\nthe ",(0,i.jsx)(n.code,{children:"SomeObjectDto"})," class, and returns the results in a ",(0,i.jsx)(n.code,{children:"PaginatorInterface"}),"\nobject that API Platform expects."]}),"\n",(0,i.jsx)(n.h2,{id:"supported-collection-objects",children:"Supported Collection Objects"}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"mapCollection()"})," method supports the following collection object types:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Doctrine ",(0,i.jsx)(n.code,{children:"Collection"})," and ",(0,i.jsx)(n.code,{children:"ReadableCollection"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Doctrine ",(0,i.jsx)(n.code,{children:"Selectable"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Doctrine ORM ",(0,i.jsx)(n.code,{children:"Query"})," and ",(0,i.jsx)(n.code,{children:"QueryBuilder"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Pagerfanta's ",(0,i.jsx)(n.code,{children:"PagerfantaInterface"})," and ",(0,i.jsx)(n.code,{children:"PagerfantaAdapterInterface"})]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"If you enable Rekapager support to get keyset-based pagination, it supports the\nfollowing types:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Doctrine ORM ",(0,i.jsx)(n.code,{children:"QueryBuilder"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Doctrine ",(0,i.jsx)(n.code,{children:"Selectable"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"If Rekapager is enabled, but the underlying collection object is not supported,\nthe method will fall back to the default offset-based pagination."}),"\n",(0,i.jsx)(n.h2,{id:"keyset-pagination-or-cursor-pagination-using-rekapager",children:"Keyset Pagination (or Cursor Pagination) using Rekapager"}),"\n",(0,i.jsxs)(n.p,{children:["The package supports keyset pagination using our ",(0,i.jsx)(n.a,{href:"/rekapager",children:"Rekapager"}),"\npackage. Its usage is opt-in. By default, paginations will be done using the\ndefault offset-based API Platform pagination."]}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["Learn more about Rekapager and keyset pagination in our ",(0,i.jsx)(n.a,{href:"/rekapager",children:"Rekapager\ndocumentation"}),"."]})}),"\n",(0,i.jsxs)(n.p,{children:["To enable Rekapager support per operation, add the ",(0,i.jsx)(n.code,{children:"api_lite_rekapager"})," extra\nproperty to the operation:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"#[ApiResource(\n    extraProperties: [\n        'api_lite_rekapager' => true\n    ]\n)]\nclass Book\n{\n    // ...\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"To enable it globally, you can set it in API Platform's configuration:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",metastring:'title="config/packages/api_platform.yaml"',children:"api_platform:\n    defaults:\n        extra_properties:\n            api_lite_rekapager: true\n"})}),"\n",(0,i.jsx)(n.h2,{id:"supporting-other-collection-objects",children:"Supporting Other Collection Objects"}),"\n",(0,i.jsxs)(n.p,{children:["If you need to support other collection object types, you can create a class\nimplementing ",(0,i.jsx)(n.code,{children:"PaginatorApplierInterface"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"use-case-doctrine-repository",children:"Use Case: Doctrine Repository"}),"\n",(0,i.jsxs)(n.p,{children:["Doctrine repositories implement ",(0,i.jsx)(n.code,{children:"Selectable"}),", so you can conveniently do the\nfollowing in the state provider, and avoid the nee d to create queries:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use ApiPlatform\\Metadata\\Operation;\nuse Rekalogika\\ApiLite\\State\\AbstractProvider;\n\n/**\n * @extends AbstractProvider<SomeObjectDto>\n */\nclass CollectionProvider extends AbstractProvider\n{\n    public function __construct(\n        private SomeObjectRepository $someObjectRepository\n    ) {\n    }\n\n    public function provide(\n        Operation $operation,\n        array $uriVariables = [],\n        array $context = []\n    ): object|array|null {\n        return $this->mapCollection(\n            collection: $this->someObjectRepository,\n            target: SomeObjectDto::class,\n            operation: $operation,\n            context: $context\n        );\n    }\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["To get a default sorting, you can override the ",(0,i.jsx)(n.code,{children:"matching()"})," method in the\nrepository like this:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use Doctrine\\Common\\Collections\\Criteria;\n\nclass SomeObjectRepository extends EntityRepository implements Selectable\n{\n    public function matching(Criteria $criteria): Collection\n    {\n        if (count($criteria->orderings()) === 0) {\n            $criteria->orderBy(['createdAt' => 'DESC']);\n        }\n\n        return parent::matching($criteria);\n    }\n}\n"})})]})}function d(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(p,{...e})}):p(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>s});var i=t(6540);const o={},a=i.createContext(o);function r(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);