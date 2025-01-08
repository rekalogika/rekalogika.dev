"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[9405],{5025:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>l,default:()=>m,frontMatter:()=>c,metadata:()=>r,toc:()=>u});const r=JSON.parse('{"id":"api-lite/index","title":"rekalogika/api-lite","description":"A set of tools to simplify working with [API","source":"@site/docs/api-lite/index.md","sourceDirName":"api-lite","slug":"/api-lite/","permalink":"/api-lite/","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/api-lite/index.md","tags":[],"version":"current","frontMatter":{"title":"rekalogika/api-lite"},"sidebar":"docs","next":{"title":"Introduction","permalink":"/api-lite/intro"}}');var i=n(4848),o=n(8453),s=n(7473);const c={title:"rekalogika/api-lite"},l=void 0,a={},u=[{value:"Sections",id:"sections",level:2}];function d(e){const t={a:"a",h2:"h2",p:"p",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["A set of tools to simplify working with ",(0,i.jsx)(t.a,{href:"https://api-platform.com/",children:"API\nPlatform"})," in your projects."]}),"\n",(0,i.jsx)(t.h2,{id:"sections",children:"Sections"}),"\n",(0,i.jsx)(s.A,{})]})}function m(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},7473:(e,t,n)=>{n.d(t,{A:()=>N});var r=n(6540),i=n(4164),o=n(3751),s=n(6289),c=n(797);const l=["zero","one","two","few","many","other"];function a(e){return l.filter((t=>e.includes(t)))}const u={locale:"en",pluralForms:a(["one","other"]),select:e=>1===e?"one":"other"};function d(){const{i18n:{currentLocale:e}}=(0,c.A)();return(0,r.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:a(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),u}}),[e])}function m(){const e=d();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const i=n.select(t),o=n.pluralForms.indexOf(i);return r[Math.min(o,r.length-1)]}(n,t,e)}}var p=n(2887),f=n(539),h=n(9303);const g={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var x=n(4848);function k(e){let{href:t,children:n}=e;return(0,x.jsx)(s.A,{href:t,className:(0,i.A)("card padding--lg",g.cardContainer),children:n})}function j(e){let{href:t,icon:n,title:r,description:o}=e;return(0,x.jsxs)(k,{href:t,children:[(0,x.jsxs)(h.A,{as:"h2",className:(0,i.A)("text--truncate",g.cardTitle),title:r,children:[n," ",r]}),o&&(0,x.jsx)("p",{className:(0,i.A)("text--truncate",g.cardDescription),title:o,children:o})]})}function w(e){let{item:t}=e;const n=(0,o.Nr)(t),r=function(){const{selectMessage:e}=m();return t=>e(t,(0,f.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return n?(0,x.jsx)(j,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??r(t.items.length)}):null}function y(e){let{item:t}=e;const n=(0,p.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,o.cC)(t.docId??void 0);return(0,x.jsx)(j,{href:t.href,icon:n,title:t.label,description:t.description??r?.description})}function A(e){let{item:t}=e;switch(t.type){case"link":return(0,x.jsx)(y,{item:t});case"category":return(0,x.jsx)(w,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function v(e){let{className:t}=e;const n=(0,o.$S)();return(0,x.jsx)(N,{items:n.items,className:t})}function N(e){const{items:t,className:n}=e;if(!t)return(0,x.jsx)(v,{...e});const r=(0,o.d1)(t);return(0,x.jsx)("section",{className:(0,i.A)("row",n),children:r.map(((e,t)=>(0,x.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,x.jsx)(A,{item:e})},t)))})}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>c});var r=n(6540);const i={},o=r.createContext(i);function s(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);