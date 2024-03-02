"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[3349],{9152:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>u,frontMatter:()=>c,metadata:()=>s,toc:()=>l});var i=n(5893),o=n(1151),r=n(2991);const c={title:"rekalogika/domain-event"},a=void 0,s={id:"domain-event/index",title:"rekalogika/domain-event",description:"An implementation of domain event pattern for Symfony & Doctrine.",source:"@site/docs/domain-event/index.md",sourceDirName:"domain-event",slug:"/domain-event/",permalink:"/domain-event/",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/domain-event/index.md",tags:[],version:"current",frontMatter:{title:"rekalogika/domain-event"},sidebar:"docs",previous:{title:"Lazy Chained Matching",permalink:"/doctrine-collections-decorator/cookbook/lazy-chained-matching"},next:{title:"Introduction & Installation",permalink:"/domain-event/intro"}},d={},l=[{value:"Sections",id:"sections",level:2}];function m(e){const t={h2:"h2",p:"p",...(0,o.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"An implementation of domain event pattern for Symfony & Doctrine."}),"\n",(0,i.jsx)(t.h2,{id:"sections",children:"Sections"}),"\n",(0,i.jsx)(r.Z,{})]})}function u(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}},2991:(e,t,n)=>{n.d(t,{Z:()=>k});n(7294);var i=n(6905),o=n(3438),r=n(3692),c=n(3919),a=n(5999),s=n(2503);const d={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var l=n(5893);function m(e){let{href:t,children:n}=e;return(0,l.jsx)(r.Z,{href:t,className:(0,i.Z)("card padding--lg",d.cardContainer),children:n})}function u(e){let{href:t,icon:n,title:o,description:r}=e;return(0,l.jsxs)(m,{href:t,children:[(0,l.jsxs)(s.Z,{as:"h2",className:(0,i.Z)("text--truncate",d.cardTitle),title:o,children:[n," ",o]}),r&&(0,l.jsx)("p",{className:(0,i.Z)("text--truncate",d.cardDescription),title:r,children:r})]})}function p(e){let{item:t}=e;const n=(0,o.LM)(t);return n?(0,l.jsx)(u,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,a.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function f(e){let{item:t}=e;const n=(0,c.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,o.xz)(t.docId??void 0);return(0,l.jsx)(u,{href:t.href,icon:n,title:t.label,description:t.description??i?.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return(0,l.jsx)(f,{item:t});case"category":return(0,l.jsx)(p,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function x(e){let{className:t}=e;const n=(0,o.jA)();return(0,l.jsx)(k,{items:n.items,className:t})}function k(e){const{items:t,className:n}=e;if(!t)return(0,l.jsx)(x,{...e});const r=(0,o.MN)(t);return(0,l.jsx)("section",{className:(0,i.Z)("row",n),children:r.map(((e,t)=>(0,l.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,l.jsx)(h,{item:e})},t)))})}},1151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>c});var i=n(7294);const o={},r=i.createContext(o);function c(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);