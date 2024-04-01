"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[986],{7582:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>c,contentTitle:()=>s,default:()=>g,frontMatter:()=>r,metadata:()=>l,toc:()=>o});var t=n(5893),i=n(1151);const r={title:"Pageables and Pages"},s=void 0,l={id:"rekapager/pageable-page",title:"Pageables and Pages",description:"A PageableInterface represents a collection that can be",source:"@site/docs/rekapager/03-pageable-page.md",sourceDirName:"rekapager",slug:"/rekapager/pageable-page",permalink:"/rekapager/pageable-page",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/03-pageable-page.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Pageables and Pages"},sidebar:"docs",previous:{title:"Adapters",permalink:"/rekapager/adapters"},next:{title:"Pager",permalink:"/rekapager/pager"}},c={},o=[{value:"Pageable Implementations",id:"pageable-implementations",level:2},{value:"<code>KeysetPageable</code>",id:"keysetpageable",level:3},{value:"<code>OffsetPageable</code>",id:"offsetpageable",level:3},{value:"<code>PagerfantaPageable</code>",id:"pagerfantapageable",level:3},{value:"Pageable Properties",id:"pageable-properties",level:2},{value:"Number of items per page",id:"number-of-items-per-page",level:3},{value:"The count strategy",id:"the-count-strategy",level:3},{value:"Page limit",id:"page-limit",level:3},{value:"Example Usage",id:"example-usage",level:2},{value:"Page Identifiers",id:"page-identifiers",level:2},{value:"Batch Processing",id:"batch-processing",level:2}];function d(e){const a={admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(a.p,{children:["A ",(0,t.jsx)(a.code,{children:"PageableInterface"})," represents a collection that can be\npartitioned into pages, or ",(0,t.jsx)(a.code,{children:"PageInterface"}),"."]}),"\n",(0,t.jsx)(a.h2,{id:"pageable-implementations",children:"Pageable Implementations"}),"\n",(0,t.jsx)(a.h3,{id:"keysetpageable",children:(0,t.jsx)(a.code,{children:"KeysetPageable"})}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"KeysetPageable"})," is a pageable that supports keyset pagination. It is\navailable with the ",(0,t.jsx)(a.code,{children:"rekalogika/rekapager-keyset-pagination"})," package."]}),"\n",(0,t.jsxs)(a.p,{children:["It takes an implementation of ",(0,t.jsx)(a.code,{children:"KeysetPaginationAdapterInterface"})," as its\nargument. The library currently provides two implementations:"]}),"\n",(0,t.jsxs)(a.ul,{children:["\n",(0,t.jsx)(a.li,{children:(0,t.jsx)(a.code,{children:"SelectableAdapter"})}),"\n",(0,t.jsx)(a.li,{children:(0,t.jsx)(a.code,{children:"QueryBuilderAdapter"})}),"\n"]}),"\n",(0,t.jsx)(a.h3,{id:"offsetpageable",children:(0,t.jsx)(a.code,{children:"OffsetPageable"})}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"OffsetPageable"})," is a pageable that supports offset pagination. It is\navailable with the ",(0,t.jsx)(a.code,{children:"rekalogika/rekapager-offset-pagination"})," package."]}),"\n",(0,t.jsxs)(a.p,{children:["It takes an implementation of ",(0,t.jsx)(a.code,{children:"OffsetPaginationAdapterInterface"})," as its\nargument. The library currently provides three implementations:"]}),"\n",(0,t.jsxs)(a.ul,{children:["\n",(0,t.jsx)(a.li,{children:(0,t.jsx)(a.code,{children:"CollectionAdapter"})}),"\n",(0,t.jsx)(a.li,{children:(0,t.jsx)(a.code,{children:"SelectableAdapter"})}),"\n",(0,t.jsx)(a.li,{children:(0,t.jsx)(a.code,{children:"PagerfantaAdapterAdapter"})}),"\n"]}),"\n",(0,t.jsxs)(a.p,{children:[(0,t.jsx)(a.code,{children:"PagerfantaAdapterAdapter"})," allows the use of the existing Pagerfanta adapters."]}),"\n",(0,t.jsx)(a.h3,{id:"pagerfantapageable",children:(0,t.jsx)(a.code,{children:"PagerfantaPageable"})}),"\n",(0,t.jsxs)(a.p,{children:["Takes a ",(0,t.jsx)(a.code,{children:"Pagerfanta"})," object and turns it into a ",(0,t.jsx)(a.code,{children:"PageableInterface"}),". It is\navailable with the ",(0,t.jsx)(a.code,{children:"rekalogika/rekapager-pagerfanta-adapter"})," package."]}),"\n",(0,t.jsx)(a.h2,{id:"pageable-properties",children:"Pageable Properties"}),"\n",(0,t.jsxs)(a.p,{children:["All ",(0,t.jsx)(a.code,{children:"PageableInterface"})," implementations should have the following properties."]}),"\n",(0,t.jsx)(a.h3,{id:"number-of-items-per-page",children:"Number of items per page"}),"\n",(0,t.jsxs)(a.p,{children:["In ",(0,t.jsx)(a.code,{children:"OffsetPageable"})," & ",(0,t.jsx)(a.code,{children:"KeysetPageable"}),", the number of items per page is set in\nthe constructor parameter ",(0,t.jsx)(a.code,{children:"$itemsPerPage"}),", with the default value of 50. In\n",(0,t.jsx)(a.code,{children:"PagerfantaPageable"}),", it is taken from the underlying ",(0,t.jsx)(a.code,{children:"Pagerfanta"})," object."]}),"\n",(0,t.jsxs)(a.p,{children:["The value can be altered post-instantiation using the ",(0,t.jsx)(a.code,{children:"withItemsPerPage()"}),"\nwither method, or rather you get a new instance with a different number of items\nper page."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-php",children:"use Rekalogika\\Contracts\\Rekapager\\PageableInterface;\n\n/** @var PageableInterface $pageable */\n\n$pageableWith10ItemsPerPage = $pageable->withItemsPerPage(10);\n"})}),"\n",(0,t.jsx)(a.h3,{id:"the-count-strategy",children:"The count strategy"}),"\n",(0,t.jsx)(a.p,{children:"There are three strategies for counting the total number of items: ignore (and\nassume the count is unknown), fetch the count from the underlying data, or\nsupplied by the caller. By default, all implementations use 'ignore' because it\nis the safest option."}),"\n",(0,t.jsxs)(a.p,{children:["All pageables accepts the ",(0,t.jsx)(a.code,{children:"$count"})," parameter in the constructor. The parameter\naccepts integer or bool. ",(0,t.jsx)(a.code,{children:"false"})," means the count is unknown, ",(0,t.jsx)(a.code,{children:"true"})," means the\ncount is fetched from the underlying data, and an integer is the count value\nsupplied by the caller."]}),"\n",(0,t.jsx)(a.h3,{id:"page-limit",children:"Page limit"}),"\n",(0,t.jsx)(a.p,{children:"The maximum page number that can be navigated to. Beyond the limit, the page is\ndisabled. By default, the limit is 100."}),"\n",(0,t.jsxs)(a.p,{children:["Only applicable to ",(0,t.jsx)(a.code,{children:"OffsetPageable"})," and ",(0,t.jsx)(a.code,{children:"PagerfantaPageable"}),". Does not make\nsense with ",(0,t.jsx)(a.code,{children:"KeysetPageable"}),", so the option is not provided there."]}),"\n",(0,t.jsx)(a.h2,{id:"example-usage",children:"Example Usage"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-php",children:"use Rekalogika\\Contracts\\Rekapager\\PageableInterface;\n\n/** @var PageableInterface $pageable */\n\n// Getting the first page\n$firstPage = $pageable->getFirstPage();\n\n// Getting the last page. Some pageable does not support seeking to the last\n// page, and will return null.\n$lastPage = $pageable->getLastPage();\n\n// Getting the second page, or the page after the first page\n$secondPage = $firstPage->getNextPage();\n\n// Getting three pages after the first page\n$nextPages = $firstPage->getNextPages(3);\n\n// All pages are instances of PageInterface.\n// Every page has an identifier object, which we can use to get the page later.\n$pageIdentifier = $secondPage->getIdentifier();\n\n// Getting a page by its identifier\n$alsoSecondPage = $pageable->getPageByIdentifier($pageIdentifier);\n"})}),"\n",(0,t.jsx)(a.h2,{id:"page-identifiers",children:"Page Identifiers"}),"\n",(0,t.jsxs)(a.p,{children:["Every page has an identifier object, that can be used to get the page later. The\nclass of this identifier object is determined by the implementation of the\n",(0,t.jsx)(a.code,{children:"PageableInterface"}),". Keyset pagination uses the ",(0,t.jsx)(a.code,{children:"KeysetPageIdentifier"})," class,\nwhile offset pagination uses the ",(0,t.jsx)(a.code,{children:"PageNumber"})," class."]}),"\n",(0,t.jsxs)(a.p,{children:["Each of these page identifier classes is accompanied by a\n",(0,t.jsx)(a.code,{children:"PageIdentifierEncoderInterface"})," which is used to encode and decode the\nidentifier object from and to a string. This string is used as query string\nparameter in the URL."]}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"PageNumber"})," object is encoded as a simple integer."]}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"rekapager/rekapager-keyset-pagination"})," package ships with two encoders:"]}),"\n",(0,t.jsxs)(a.ul,{children:["\n",(0,t.jsxs)(a.li,{children:[(0,t.jsx)(a.code,{children:"SerializeSecretKeysetPageIdentifierEncoder"})," which uses PHP's ",(0,t.jsx)(a.code,{children:"serialize()"})," and\n",(0,t.jsx)(a.code,{children:"unserialize()"})," functions. It is protected by checksums to prevent tampering."]}),"\n",(0,t.jsxs)(a.li,{children:[(0,t.jsx)(a.code,{children:"SymfonySerializerKeysetPageIdentifierEncoder"})," which uses Symfony's\n",(0,t.jsx)(a.code,{children:"Serializer"})," component to serialize and unserialize the object."]}),"\n"]}),"\n",(0,t.jsx)(a.p,{children:"Our Symfony integration uses the latter encoder."}),"\n",(0,t.jsx)(a.h2,{id:"batch-processing",children:"Batch Processing"}),"\n",(0,t.jsx)(a.p,{children:"To iterate over a large amount of data, you can use the following pattern:"}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-php",children:"use Doctrine\\ORM\\EntityManagerInterface;\nuse Rekalogika\\Rekapager\\PageableInterface;\n\n/** @var PageableInterface $pageable */\n/** @var EntityManagerInterface $entityManager */\n\n$page = $pageable->withItemsPerPage(1000)->getFirstPage();\n\nwhile ($page = $page->getNextPage()) {\n    foreach ($page as $item) {\n        // Do something with the item\n    }\n\n    $entityManager->flush(); // if required\n    $entitymanager->clear();\n}\n"})}),"\n",(0,t.jsx)(a.admonition,{title:"Protip",type:"tip",children:(0,t.jsx)(a.p,{children:"You should always use keyset pagination for batch processing large amounts of\ndata residing in a database."})})]})}function g(e={}){const{wrapper:a}={...(0,i.a)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,a,n)=>{n.d(a,{Z:()=>l,a:()=>s});var t=n(7294);const i={},r=t.createContext(i);function s(e){const a=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function l(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),t.createElement(r.Provider,{value:a},e.children)}}}]);