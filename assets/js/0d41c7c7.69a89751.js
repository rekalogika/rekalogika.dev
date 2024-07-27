"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[3605],{3193:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>d,toc:()=>l});var a=t(5893),n=t(1151);const i={title:"Doctrine ORM QueryBuilder"},o=void 0,d={id:"rekapager/adapters/doctrine-orm-querybuilder",title:"Doctrine ORM QueryBuilder",description:"QueryBuilderAdapter takes a Doctrine ORM QueryBuilder instance. It supports",source:"@site/docs/rekapager/02-adapters/01-doctrine-orm-querybuilder.md",sourceDirName:"rekapager/02-adapters",slug:"/rekapager/adapters/doctrine-orm-querybuilder",permalink:"/rekapager/adapters/doctrine-orm-querybuilder",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/02-adapters/01-doctrine-orm-querybuilder.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Doctrine ORM QueryBuilder"},sidebar:"docs",previous:{title:"Adapters",permalink:"/rekapager/adapters/"},next:{title:"Doctrine ORM NativeQuery",permalink:"/rekapager/adapters/doctrine-orm-nativequery"}},s={},l=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Notes",id:"notes",level:2}];function p(e){const r={admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,n.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(r.p,{children:[(0,a.jsx)(r.code,{children:"QueryBuilderAdapter"})," takes a Doctrine ORM ",(0,a.jsx)(r.code,{children:"QueryBuilder"})," instance. It supports\nkeyset and offset pagination."]}),"\n",(0,a.jsx)(r.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-bash",children:"composer require rekalogika/rekapager-doctrine-orm-adapter\n"})}),"\n",(0,a.jsx)(r.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsx)(r.pre,{children:(0,a.jsx)(r.code,{className:"language-php",children:"use Doctrine\\DBAL\\Types\\Types;\nuse Doctrine\\ORM\\EntityRepository;\nuse Rekalogika\\Rekapager\\Doctrine\\ORM\\QueryBuilderAdapter;\nuse Rekalogika\\Rekapager\\Keyset\\KeysetPageable;\nuse Rekalogika\\Rekapager\\Offset\\OffsetPageable;\n\n/** @var EntityRepository $postRepository */\n$queryBuilder = $postRepository\n    ->createQueryBuilder('p')\n    ->where('p.group = :group')\n    ->setParameter('group', $group)\n    ->addOrderBy('p.date', 'DESC') // a date field that accepts DateTime\n    ->addOrderBy('p.title', 'ASC')\n    ->addOrderBy('p.id', 'ASC');\n\n// highlight-start\n$adapter = new QueryBuilderAdapter(\n    queryBuilder: $queryBuilder,\n    typeMapping: [\n        'p.date' => Types::DATE_MUTABLE // the type of the date field\n    ],\n    indexBy: 'id' // optional\n);\n// highlight-end\n\n$pageable = new KeysetPageable($adapter);\n// or\n$pageable = new OffsetPageable($adapter);\n"})}),"\n",(0,a.jsx)(r.h2,{id:"notes",children:"Notes"}),"\n",(0,a.jsx)(r.p,{children:"With keyset pagination, there are additional prerequisites:"}),"\n",(0,a.jsxs)(r.ul,{children:["\n",(0,a.jsxs)(r.li,{children:["The underlying ",(0,a.jsx)(r.code,{children:"QueryBuilder"})," object must have a sort order. Be sure to call\n",(0,a.jsx)(r.code,{children:"orderBy()"})," or ",(0,a.jsx)(r.code,{children:"addOrderBy()"})," on the query builder before passing it to the\nadapter."]}),"\n",(0,a.jsxs)(r.li,{children:["If a field in a sort order uses a non-scalar type, you should provide a\n",(0,a.jsx)(r.code,{children:"typeMapping"})," option. The adapter will use it in the ",(0,a.jsx)(r.code,{children:"setParameter()"})," method\nof the ",(0,a.jsx)(r.code,{children:"QueryBuilder"}),". The example above shows how to provide a type mapping\nfor a date field."]}),"\n"]}),"\n",(0,a.jsx)(r.admonition,{type:"info",children:(0,a.jsx)(r.p,{children:"If you don't provide a type mapping, the adapter will try to look it up from\nDoctrine's class metadata. If it fails, it will use heuristics to detect the\ntype for some common objects."})}),"\n",(0,a.jsx)(r.admonition,{type:"caution",children:(0,a.jsxs)(r.p,{children:["The ",(0,a.jsx)(r.code,{children:"QueryBuilderAdapter"})," does not support QueryBuilder's ",(0,a.jsx)(r.code,{children:"indexBy"})," (the third\nparameter of ",(0,a.jsx)(r.code,{children:"from()"}),", or the second parameter of a repository's\n",(0,a.jsx)(r.code,{children:"createQueryBuilder()"}),"). If you need the feature, use the ",(0,a.jsx)(r.code,{children:"indexBy"})," parameter of\n",(0,a.jsx)(r.code,{children:"QueryBuilderAdapter"})," as the above example."]})})]})}function c(e={}){const{wrapper:r}={...(0,n.a)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>d,a:()=>o});var a=t(7294);const n={},i=a.createContext(n);function o(e){const r=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function d(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:o(e.components),a.createElement(i.Provider,{value:r},e.children)}}}]);