"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[5444],{693:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"analytics/internals/refresh","title":"Refresh","description":"SummarySignal","source":"@site/docs/analytics/99-internals/02-refresh.md","sourceDirName":"analytics/99-internals","slug":"/analytics/internals/refresh","permalink":"/analytics/internals/refresh","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/analytics/99-internals/02-refresh.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"Refresh"},"sidebar":"docs","previous":{"title":"Partitioning","permalink":"/analytics/internals/partitioning"},"next":{"title":"rekalogika/api-lite","permalink":"/api-lite/"}}');var s=t(4848),r=t(8453);const a={title:"Refresh"},o=void 0,c={},l=[{value:"<code>SummarySignal</code>",id:"summarysignal",level:2},{value:"<code>SourceEntityListener</code>",id:"sourceentitylistener",level:2}];function d(e){const n={code:"code",h2:"h2",p:"p",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"summarysignal",children:(0,s.jsx)(n.code,{children:"SummarySignal"})}),"\n",(0,s.jsxs)(n.p,{children:["A ",(0,s.jsx)(n.code,{children:"SummarySignal"})," is an entity indicating a dirty partition, which is a\npartition in a summary table that needs to be refreshed. ",(0,s.jsx)(n.code,{children:"SummarySignal"})," should\nbe persisted and flushed at the same time as the rest of the entities, during\nthe ",(0,s.jsx)(n.code,{children:"onFlush"})," event. So if the flush fails, the signal will not be saved."]}),"\n",(0,s.jsxs)(n.p,{children:["A ",(0,s.jsx)(n.code,{children:"SummarySignal"})," can have null partition information. In this case, it means\nthere are new persisted entities that need to be summarized. New entities\nneed to be handled differently because they are not guaranteed to have an\nID before flush."]}),"\n",(0,s.jsx)(n.h2,{id:"sourceentitylistener",children:(0,s.jsx)(n.code,{children:"SourceEntityListener"})}),"\n",(0,s.jsxs)(n.p,{children:["Listens on Doctrine's ",(0,s.jsx)(n.code,{children:"onFlush"})," event. For every pending entities, it checks the\nchange set and determines if the change affects any summary tables. Then it\ninstantiates the corresponding ",(0,s.jsx)(n.code,{children:"SummarySignal"})," objects and persists them."]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var i=t(6540);const s={},r=i.createContext(s);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);