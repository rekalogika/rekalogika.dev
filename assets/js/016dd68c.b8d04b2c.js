"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[7886],{9365:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>d,toc:()=>c});var t=s(5893),i=s(1151);const r={title:"Known Issues and Limitations"},o=void 0,d={id:"rekapager/known-issues",title:"Known Issues and Limitations",description:"Selectable Bug in Counting matching() Results",source:"@site/docs/rekapager/09-known-issues.md",sourceDirName:"rekapager",slug:"/rekapager/known-issues",permalink:"/rekapager/known-issues",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/09-known-issues.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{title:"Known Issues and Limitations"},sidebar:"docs",previous:{title:"Integrating Rekapager into a Framework",permalink:"/rekapager/integrating"},next:{title:"Troubleshooting",permalink:"/rekapager/troubleshooting"}},l={},c=[{value:"<code>Selectable</code> Bug in Counting <code>matching()</code> Results",id:"selectable-bug-in-counting-matching-results",level:2},{value:"Underlying <code>QueryBuilder</code> or <code>Criteria</code> With <code>setFirstResult()</code> and <code>setMaxResults()</code>",id:"underlying-querybuilder-or-criteria-with-setfirstresult-and-setmaxresults",level:2},{value:"<code>SelectableAdapter</code> does not Preserve Keys/Indexes",id:"selectableadapter-does-not-preserve-keysindexes",level:2}];function a(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.h2,{id:"selectable-bug-in-counting-matching-results",children:[(0,t.jsx)(n.code,{children:"Selectable"})," Bug in Counting ",(0,t.jsx)(n.code,{children:"matching()"})," Results"]}),"\n",(0,t.jsxs)(n.p,{children:["There is a Doctrine bug involving ",(0,t.jsx)(n.code,{children:"->matching($criteria)->count()"}),". If the ",(0,t.jsx)(n.code,{children:"Criteria"})," has\na ",(0,t.jsx)(n.code,{children:"maxResults"}),", then it will be disregarded and the ",(0,t.jsx)(n.code,{children:"count()"})," will return the\ntotal number of items as if the ",(0,t.jsx)(n.code,{children:"maxResults"})," were not set."]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/doctrine/orm/issues/9951",children:"issue #9951"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/doctrine/orm/issues/10766",children:"issue #10766"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/doctrine/orm/pull/10767",children:"PR #10767"})}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["We work around this bug by fetching the items and counting them manually. This\nis suboptimal, but it works. If performance is critical, use a small proximity\nand a small page size. Or, use ",(0,t.jsx)(n.code,{children:"QueryBuilderAdapter"})," instead."]}),"\n",(0,t.jsxs)(n.h2,{id:"underlying-querybuilder-or-criteria-with-setfirstresult-and-setmaxresults",children:["Underlying ",(0,t.jsx)(n.code,{children:"QueryBuilder"})," or ",(0,t.jsx)(n.code,{children:"Criteria"})," With ",(0,t.jsx)(n.code,{children:"setFirstResult()"})," and ",(0,t.jsx)(n.code,{children:"setMaxResults()"})]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"QueryBuilderAdapter"})," and ",(0,t.jsx)(n.code,{children:"SelectableAdapter"})," currently do not support\nunderlying ",(0,t.jsx)(n.code,{children:"QueryBuilder"})," or ",(0,t.jsx)(n.code,{children:"Criteria"})," with ",(0,t.jsx)(n.code,{children:"setFirstResult()"})," and\n",(0,t.jsx)(n.code,{children:"setMaxResults()"}),". If the underlying object has any these set, then the adapter\nwill throw an exception."]}),"\n",(0,t.jsxs)(n.h2,{id:"selectableadapter-does-not-preserve-keysindexes",children:[(0,t.jsx)(n.code,{children:"SelectableAdapter"})," does not Preserve Keys/Indexes"]}),"\n",(0,t.jsx)(n.p,{children:"The problem is caused by this Doctrine bug:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/doctrine/orm/issues/4693",children:"issue #4693"})}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Workaround: use ",(0,t.jsx)(n.code,{children:"indexBy"})," parameter of the adapter. Example:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"$adapter = new SelectableAdapter(\n    collection: $collection,\n    criteria: $criteria,\n// highlight-next-line\n    indexBy: 'id',\n);\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>d,a:()=>o});var t=s(7294);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);