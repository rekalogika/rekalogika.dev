"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[7572],{8709:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>d,metadata:()=>t,toc:()=>c});const t=JSON.parse('{"id":"rekapager/known-issues","title":"Known Issues and Limitations","description":"Selectable Bug in Counting matching() Results","source":"@site/docs/rekapager/11-known-issues.md","sourceDirName":"rekapager","slug":"/rekapager/known-issues","permalink":"/rekapager/known-issues","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/11-known-issues.md","tags":[],"version":"current","sidebarPosition":11,"frontMatter":{"title":"Known Issues and Limitations"},"sidebar":"docs","previous":{"title":"Keyset Seek Method","permalink":"/rekapager/seek-method"},"next":{"title":"Troubleshooting","permalink":"/rekapager/troubleshooting"}}');var i=s(4848),r=s(8453);const d={title:"Known Issues and Limitations"},l=void 0,o={},c=[{value:"<code>Selectable</code> Bug in Counting <code>matching()</code> Results",id:"selectable-bug-in-counting-matching-results",level:2},{value:"Underlying <code>QueryBuilder</code> or <code>Criteria</code> With <code>setFirstResult()</code> and <code>setMaxResults()</code>",id:"underlying-querybuilder-or-criteria-with-setfirstresult-and-setmaxresults",level:2},{value:"<code>SelectableAdapter</code> does not Preserve Keys/Indexes",id:"selectableadapter-does-not-preserve-keysindexes",level:2}];function a(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.h2,{id:"selectable-bug-in-counting-matching-results",children:[(0,i.jsx)(n.code,{children:"Selectable"})," Bug in Counting ",(0,i.jsx)(n.code,{children:"matching()"})," Results"]}),"\n",(0,i.jsxs)(n.p,{children:["There is a Doctrine bug involving ",(0,i.jsx)(n.code,{children:"->matching($criteria)->count()"}),". If the ",(0,i.jsx)(n.code,{children:"Criteria"})," has\na ",(0,i.jsx)(n.code,{children:"maxResults"}),", then it will be disregarded and the ",(0,i.jsx)(n.code,{children:"count()"})," will return the\ntotal number of items as if the ",(0,i.jsx)(n.code,{children:"maxResults"})," were not set."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/doctrine/orm/issues/9951",children:"issue #9951"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/doctrine/orm/issues/10766",children:"issue #10766"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/doctrine/orm/pull/10767",children:"PR #10767"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["We work around this bug by fetching the items and counting them manually. This\nis suboptimal, but it works. If performance is critical, use a small proximity\nand a small page size. Or, use ",(0,i.jsx)(n.code,{children:"QueryBuilderAdapter"})," instead."]}),"\n",(0,i.jsxs)(n.h2,{id:"underlying-querybuilder-or-criteria-with-setfirstresult-and-setmaxresults",children:["Underlying ",(0,i.jsx)(n.code,{children:"QueryBuilder"})," or ",(0,i.jsx)(n.code,{children:"Criteria"})," With ",(0,i.jsx)(n.code,{children:"setFirstResult()"})," and ",(0,i.jsx)(n.code,{children:"setMaxResults()"})]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"QueryBuilderAdapter"})," and ",(0,i.jsx)(n.code,{children:"SelectableAdapter"})," currently do not support\nunderlying ",(0,i.jsx)(n.code,{children:"QueryBuilder"})," or ",(0,i.jsx)(n.code,{children:"Criteria"})," with ",(0,i.jsx)(n.code,{children:"setFirstResult()"})," and\n",(0,i.jsx)(n.code,{children:"setMaxResults()"}),". If the underlying object has any these set, then the adapter\nwill throw an exception."]}),"\n",(0,i.jsxs)(n.h2,{id:"selectableadapter-does-not-preserve-keysindexes",children:[(0,i.jsx)(n.code,{children:"SelectableAdapter"})," does not Preserve Keys/Indexes"]}),"\n",(0,i.jsx)(n.p,{children:"The problem is caused by this Doctrine bug:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://github.com/doctrine/orm/issues/4693",children:"issue #4693"})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Workaround: use ",(0,i.jsx)(n.code,{children:"indexBy"})," parameter of the adapter. Example:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"$adapter = new SelectableAdapter(\n    collection: $collection,\n    criteria: $criteria,\n// highlight-next-line\n    indexBy: 'id',\n);\n"})})]})}function u(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>d,x:()=>l});var t=s(6540);const i={},r=t.createContext(i);function d(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);