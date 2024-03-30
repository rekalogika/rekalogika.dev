"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[3175],{4193:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>d});var r=t(5893),o=t(1151),i=t(3361);const s={title:"rekalogika/gotenberg-pdf-bundle"},l=void 0,a={id:"gotenberg-pdf-bundle/index",title:"rekalogika/gotenberg-pdf-bundle",description:"Symfony Bundle for generating PDF using Gotenberg.",source:"@site/docs/gotenberg-pdf-bundle/index.md",sourceDirName:"gotenberg-pdf-bundle",slug:"/gotenberg-pdf-bundle/",permalink:"/gotenberg-pdf-bundle/",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/gotenberg-pdf-bundle/index.md",tags:[],version:"current",frontMatter:{title:"rekalogika/gotenberg-pdf-bundle"},sidebar:"docs",previous:{title:"Marking Entities using Interface",permalink:"/file-bundle/advanced/file-association-interface"},next:{title:"Installation & Quick Start",permalink:"/gotenberg-pdf-bundle/installation"}},c={},d=[{value:"Features",id:"features",level:2},{value:"Sections",id:"sections",level:2},{value:"License",id:"license",level:2},{value:"Contributing",id:"contributing",level:2}];function u(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"Symfony Bundle for generating PDF using Gotenberg."}),"\n",(0,r.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Easy provisioning with Symfony Flex, Symfony CLI, and Docker Compose. Just\ninstall the bundle and you're ready to generate your first PDF."}),"\n",(0,r.jsxs)(n.li,{children:["Separated high-level interfaces in ",(0,r.jsx)(n.code,{children:"rekalogika/print-contracts"}),". If Gotenberg\ngets out of fashion in the future, hopefully we only need to replace this\npackage, and don't need to change our code."]}),"\n",(0,r.jsx)(n.li,{children:"Abstractions for paper sizes and page layouts."}),"\n",(0,r.jsx)(n.li,{children:"Leverages Symfony HTTP Client. See the requests and responses in Symfony"}),"\n",(0,r.jsx)(n.li,{children:"With the heavy lifting already done by Gotenberg, there is no need to deal\nwith Chrome instances, CLI tools, Puppeteer, NodeJS, etc."}),"\n",(0,r.jsx)(n.li,{children:"Scalable architecture. Suitable for low-volume development and high-volume\nusage alike. No need to reengineer if your usage outgrows your solution. Just\nadd more instances of Gotenberg with Docker Compose or the container\norchestration tool you are using."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"sections",children:"Sections"}),"\n",(0,r.jsx)(i.Z,{}),"\n",(0,r.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,r.jsx)(n.p,{children:"MIT"}),"\n",(0,r.jsx)(n.h2,{id:"contributing",children:"Contributing"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"rekalogika/gotenberg-pdf-bundle"})," repository is a read-only repo split from\nthe main repo. Issues and pull requests should be submitted to the\n",(0,r.jsx)(n.a,{href:"https://github.com/rekalogika/print-src",children:"rekalogika/print-src"})," monorepo."]})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},3361:(e,n,t)=>{t.d(n,{Z:()=>C});var r=t(7294),o=t(6905),i=t(3438),s=t(3692),l=t(2263);const a=["zero","one","two","few","many","other"];function c(e){return a.filter((n=>e.includes(n)))}const d={locale:"en",pluralForms:c(["one","other"]),select:e=>1===e?"one":"other"};function u(){const{i18n:{currentLocale:e}}=(0,l.Z)();return(0,r.useMemo)((()=>{try{return function(e){const n=new Intl.PluralRules(e);return{locale:e,pluralForms:c(n.resolvedOptions().pluralCategories),select:e=>n.select(e)}}(e)}catch(n){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${n.message}\n`),d}}),[e])}function h(){const e=u();return{selectMessage:(n,t)=>function(e,n,t){const r=e.split("|");if(1===r.length)return r[0];r.length>t.pluralForms.length&&console.error(`For locale=${t.locale}, a maximum of ${t.pluralForms.length} plural forms are expected (${t.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const o=t.select(n),i=t.pluralForms.indexOf(o);return r[Math.min(i,r.length-1)]}(t,n,e)}}var g=t(3919),f=t(5999),p=t(2503);const m={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var b=t(5893);function x(e){let{href:n,children:t}=e;return(0,b.jsx)(s.Z,{href:n,className:(0,o.Z)("card padding--lg",m.cardContainer),children:t})}function k(e){let{href:n,icon:t,title:r,description:i}=e;return(0,b.jsxs)(x,{href:n,children:[(0,b.jsxs)(p.Z,{as:"h2",className:(0,o.Z)("text--truncate",m.cardTitle),title:r,children:[t," ",r]}),i&&(0,b.jsx)("p",{className:(0,o.Z)("text--truncate",m.cardDescription),title:i,children:i})]})}function y(e){let{item:n}=e;const t=(0,i.LM)(n),r=function(){const{selectMessage:e}=h();return n=>e(n,(0,f.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:n}))}();return t?(0,b.jsx)(k,{href:t,icon:"\ud83d\uddc3\ufe0f",title:n.label,description:n.description??r(n.items.length)}):null}function j(e){let{item:n}=e;const t=(0,g.Z)(n.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,i.xz)(n.docId??void 0);return(0,b.jsx)(k,{href:n.href,icon:t,title:n.label,description:n.description??r?.description})}function v(e){let{item:n}=e;switch(n.type){case"link":return(0,b.jsx)(j,{item:n});case"category":return(0,b.jsx)(y,{item:n});default:throw new Error(`unknown item type ${JSON.stringify(n)}`)}}function w(e){let{className:n}=e;const t=(0,i.jA)();return(0,b.jsx)(C,{items:t.items,className:n})}function C(e){const{items:n,className:t}=e;if(!n)return(0,b.jsx)(w,{...e});const r=(0,i.MN)(n);return(0,b.jsx)("section",{className:(0,o.Z)("row",t),children:r.map(((e,n)=>(0,b.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,b.jsx)(v,{item:e})},n)))})}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>s});var r=t(7294);const o={},i=r.createContext(o);function s(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);