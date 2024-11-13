"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[4345],{5847:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>d,contentTitle:()=>o,default:()=>p,frontMatter:()=>s,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"rekapager/adapters/doctrine-dbal-querybuilder","title":"Doctrine DBAL QueryBuilder","description":"QueryBuilderAdapter takes a Doctrine DBAL QueryBuilder instance. It supports","source":"@site/docs/rekapager/02-adapters/05-doctrine-dbal-querybuilder.md","sourceDirName":"rekapager/02-adapters","slug":"/rekapager/adapters/doctrine-dbal-querybuilder","permalink":"/rekapager/adapters/doctrine-dbal-querybuilder","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/02-adapters/05-doctrine-dbal-querybuilder.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"title":"Doctrine DBAL QueryBuilder"},"sidebar":"docs","previous":{"title":"Doctrine Collections Collection","permalink":"/rekapager/adapters/doctrine-collections-collection"},"next":{"title":"Pagerfanta Adapter","permalink":"/rekapager/adapters/pagerfanta-adapter"}}');var t=n(4848),i=n(8453);const s={title:"Doctrine DBAL QueryBuilder"},o=void 0,d={},l=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2}];function c(e){const r={code:"code",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(r.p,{children:[(0,t.jsx)(r.code,{children:"QueryBuilderAdapter"})," takes a Doctrine DBAL ",(0,t.jsx)(r.code,{children:"QueryBuilder"})," instance. It supports\nkeyset and offset pagination."]}),"\n",(0,t.jsx)(r.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-bash",children:"composer require rekalogika/rekapager-doctrine-dbal-adapter\n"})}),"\n",(0,t.jsx)(r.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-php",children:"use Doctrine\\DBAL\\Connection;\nuse Rekalogika\\Rekapager\\Doctrine\\DBAL\\QueryBuilderAdapter;\nuse Rekalogika\\Rekapager\\Keyset\\KeysetPageable;\nuse Rekalogika\\Rekapager\\Offset\\OffsetPageable;\n\n/** @var Connection $connection */\n\n$queryBuilder = $connection\n    ->createQueryBuilder()\n    ->select('p.id', 'p.date', 'p.title', 'p.content')\n    ->from('post', 'p')\n    ->where('p.set_name = :setName')\n    ->setParameter('setName', $setName);\n\n// highlight-start\n$adapter = new QueryBuilderAdapter(\n    queryBuilder: $queryBuilder,\n    orderBy: [\n        'p.date' => Order::Descending,\n        'p.title' => Order::Ascending,\n        'p.id' => Order::Ascending,\n    ],\n    indexBy: 'id'\n);\n// highlight-end\n\n$pageable = new KeysetPageable($adapter);\n// or\n$pageable = new OffsetPageable($adapter);\n"})})]})}function p(e={}){const{wrapper:r}={...(0,i.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},8453:(e,r,n)=>{n.d(r,{R:()=>s,x:()=>o});var a=n(6540);const t={},i=a.createContext(t);function s(e){const r=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),a.createElement(i.Provider,{value:r},e.children)}}}]);