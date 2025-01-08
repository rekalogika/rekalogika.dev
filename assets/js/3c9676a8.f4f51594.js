"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[7480],{853:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>u});const r=JSON.parse('{"id":"rekapager/batch-processing/index","title":"Batch Processing","description":"Sections","source":"@site/docs/rekapager/06-batch-processing/index.md","sourceDirName":"rekapager/06-batch-processing","slug":"/rekapager/batch-processing/","permalink":"/rekapager/batch-processing/","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/06-batch-processing/index.md","tags":[],"version":"current","frontMatter":{"title":"Batch Processing"},"sidebar":"docs","previous":{"title":"Integrating Rekapager into a Framework","permalink":"/rekapager/framework-integration/integrating"},"next":{"title":"Using Pageable for Batch Processing","permalink":"/rekapager/batch-processing/pageable"}}');var s=n(4848),o=n(8453),c=n(7473);const i={title:"Batch Processing"},a=void 0,l={},u=[{value:"Sections",id:"sections",level:2}];function d(e){const t={h2:"h2",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{id:"sections",children:"Sections"}),"\n",(0,s.jsx)(c.A,{})]})}function p(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},7473:(e,t,n)=>{n.d(t,{A:()=>N});var r=n(6540),s=n(4164),o=n(3751),c=n(6289),i=n(797);const a=["zero","one","two","few","many","other"];function l(e){return a.filter((t=>e.includes(t)))}const u={locale:"en",pluralForms:l(["one","other"]),select:e=>1===e?"one":"other"};function d(){const{i18n:{currentLocale:e}}=(0,i.A)();return(0,r.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:l(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),u}}),[e])}function p(){const e=d();return{selectMessage:(t,n)=>function(e,t,n){const r=e.split("|");if(1===r.length)return r[0];r.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${r.length}: ${e}`);const s=n.select(t),o=n.pluralForms.indexOf(s);return r[Math.min(o,r.length-1)]}(n,t,e)}}var m=n(2887),h=n(539),g=n(9303);const f={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var x=n(4848);function k(e){let{href:t,children:n}=e;return(0,x.jsx)(c.A,{href:t,className:(0,s.A)("card padding--lg",f.cardContainer),children:n})}function b(e){let{href:t,icon:n,title:r,description:o}=e;return(0,x.jsxs)(k,{href:t,children:[(0,x.jsxs)(g.A,{as:"h2",className:(0,s.A)("text--truncate",f.cardTitle),title:r,children:[n," ",r]}),o&&(0,x.jsx)("p",{className:(0,s.A)("text--truncate",f.cardDescription),title:o,children:o})]})}function j(e){let{item:t}=e;const n=(0,o.Nr)(t),r=function(){const{selectMessage:e}=p();return t=>e(t,(0,h.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return n?(0,x.jsx)(b,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??r(t.items.length)}):null}function w(e){let{item:t}=e;const n=(0,m.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",r=(0,o.cC)(t.docId??void 0);return(0,x.jsx)(b,{href:t.href,icon:n,title:t.label,description:t.description??r?.description})}function v(e){let{item:t}=e;switch(t.type){case"link":return(0,x.jsx)(w,{item:t});case"category":return(0,x.jsx)(j,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function y(e){let{className:t}=e;const n=(0,o.$S)();return(0,x.jsx)(N,{items:n.items,className:t})}function N(e){const{items:t,className:n}=e;if(!t)return(0,x.jsx)(y,{...e});const r=(0,o.d1)(t);return(0,x.jsx)("section",{className:(0,s.A)("row",n),children:r.map(((e,t)=>(0,x.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,x.jsx)(v,{item:e})},t)))})}},8453:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>i});var r=n(6540);const s={},o=r.createContext(s);function c(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);