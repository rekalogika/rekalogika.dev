"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[5496],{8672:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>p,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>l});const a=JSON.parse('{"id":"mapper/debugging","title":"Debugging the Mapper","description":"Command Line","source":"@site/docs/mapper/16-debugging.md","sourceDirName":"mapper","slug":"/mapper/debugging","permalink":"/mapper/debugging","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/16-debugging.md","tags":[],"version":"current","sidebarPosition":16,"frontMatter":{"title":"Debugging the Mapper"},"sidebar":"docs","previous":{"title":"SubMapper","permalink":"/mapper/submapper"},"next":{"title":"Cache Pre-warming","permalink":"/mapper/cache-prewarming"}}');var r=t(4848),i=t(8453);const o={title:"Debugging the Mapper"},p=void 0,s={},l=[{value:"Command Line",id:"command-line",level:2},{value:"Get the List of Transformers",id:"get-the-list-of-transformers",level:3},{value:"Dump the Mapping Table",id:"dump-the-mapping-table",level:3},{value:"Get the Mapping Result Between a Source and Target Type",id:"get-the-mapping-result-between-a-source-and-target-type",level:3},{value:"Symfony Profiler",id:"symfony-profiler",level:2}];function c(e){const n={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"command-line",children:"Command Line"}),"\n",(0,r.jsx)(n.h3,{id:"get-the-list-of-transformers",children:"Get the List of Transformers"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"php bin/console debug:container --tag=rekalogika.mapper.transformer\n"})}),"\n",(0,r.jsx)(n.h3,{id:"dump-the-mapping-table",children:"Dump the Mapping Table"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"php bin/console rekalogika:mapper:mapping\n"})}),"\n",(0,r.jsx)(n.h3,{id:"get-the-mapping-result-between-a-source-and-target-type",children:"Get the Mapping Result Between a Source and Target Type"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"php bin/console rekalogika:mapper:try 'App\\Entity\\Book' 'App\\Entity\\BookDto'\n"})}),"\n",(0,r.jsx)(n.h2,{id:"symfony-profiler",children:"Symfony Profiler"}),"\n",(0,r.jsx)(n.p,{children:"In debug mode, Mapper will collect mapping data and display it in the Symfony\nProfiler. You can find comprehensive mapping information in the Mapper tab in\nthe Symfony Profiler."})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>p});var a=t(6540);const r={},i=a.createContext(r);function o(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function p(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);