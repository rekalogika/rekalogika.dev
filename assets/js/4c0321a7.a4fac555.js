"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[2548],{5328:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"analytics/intro","title":"Introduction","description":"Creates and maintains pre-aggregated summary tables for Doctrine entities.","source":"@site/docs/analytics/00-intro.md","sourceDirName":"analytics","slug":"/analytics/intro","permalink":"/analytics/intro","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/analytics/00-intro.md","tags":[],"version":"current","sidebarPosition":0,"frontMatter":{"title":"Introduction"},"sidebar":"docs","previous":{"title":"rekalogika/analytics","permalink":"/analytics/"},"next":{"title":"Quick Start","permalink":"/analytics/quickstart"}}');var i=n(4848),s=n(8453);const o={title:"Introduction"},r=void 0,l={},c=[{value:"Advantages",id:"advantages",level:2},{value:"Requirements",id:"requirements",level:2},{value:"Installation",id:"installation",level:2},{value:"License",id:"license",level:2},{value:"Contributing",id:"contributing",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"Creates and maintains pre-aggregated summary tables for Doctrine entities.\nProvides a fast and easy way to perform analytical queries."}),"\n",(0,i.jsx)(t.p,{children:"This package works using the classical OLAP cube approach of data warehousing.\nIt processes data from the source table and pre-aggregate it in a summary table.\nThis summary table is then used to perform analytical queries."}),"\n",(0,i.jsx)(t.admonition,{type:"danger",children:(0,i.jsx)(t.p,{children:"These packages are still in development and not yet ready for production use.\nNot all features are implemented yet. The API is subject to change. And it does\nnot support Doctrine ORM 3 yet."})}),"\n",(0,i.jsx)(t.h2,{id:"advantages",children:"Advantages"}),"\n",(0,i.jsx)(t.p,{children:"Works directly on the entities. Does not use intermediate fact tables. Does not\nrequire any additional ETL processes."}),"\n",(0,i.jsx)(t.p,{children:"Optimized for incremental updates. (TBD explain)"}),"\n",(0,i.jsx)(t.p,{children:"Better logistics. No need to pass data to and from external systems. No need to\nmaintain additional infrastructure."}),"\n",(0,i.jsx)(t.p,{children:"A simpler and cheaper alternative to modern analytical solutions. Less\nsophisticated but probably good enough for many use cases."}),"\n",(0,i.jsx)(t.p,{children:"Sometimes things can be more challenging legally and politically, rather than\ntechnically. This framework does not send data to the cloud, so it complies with\nthe 'no-cloud' policy if you happen to be bound by it."}),"\n",(0,i.jsx)(t.p,{children:"Understands Doctrine's metadata, unlike external solutions that work directly\nwith the database. No need to duplicate the knowledge about your database\nschema between your application and the external analytical system."}),"\n",(0,i.jsx)(t.p,{children:"Detects if an entity is added, modified, or deleted. It can then automatically\nupdate the summary table accordingly. No need to devise a way to signal an\nexternal system that the data has changed. Or even to blindly recalculate all\ndata up to 5 years ago periodically, just because you fear some process might\nhave changed records that old, but you can't know for sure."}),"\n",(0,i.jsx)(t.h2,{id:"requirements",children:"Requirements"}),"\n",(0,i.jsx)(t.p,{children:"Only works with PostgreSQL for now."}),"\n",(0,i.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-bash",children:"composer require rekalogika/analytics-bundle\n"})}),"\n",(0,i.jsx)(t.h2,{id:"license",children:"License"}),"\n",(0,i.jsx)(t.p,{children:"MIT"}),"\n",(0,i.jsx)(t.h2,{id:"contributing",children:"Contributing"}),"\n",(0,i.jsxs)(t.p,{children:["This framework consists of multiple repositories split from a monorepo. Be\nsure to submit issues and pull requests to the\n",(0,i.jsx)(t.a,{href:"https://github.com/rekalogika/analytics",children:(0,i.jsx)(t.code,{children:"rekalogika/analytics"})})," monorepo."]})]})}function u(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>r});var a=n(6540);const i={},s=a.createContext(i);function o(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);