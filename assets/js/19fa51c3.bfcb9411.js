"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[2714],{557:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>u});var i=n(4848),r=n(8453),s=n(5871);const o={title:"Use Cases: Basic Endpoints"},c=void 0,a={id:"api-lite/basic-endpoints/index",title:"Use Cases: Basic Endpoints",description:"",source:"@site/docs/api-lite/52-basic-endpoints/index.md",sourceDirName:"api-lite/52-basic-endpoints",slug:"/api-lite/basic-endpoints/",permalink:"/api-lite/basic-endpoints/",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/api-lite/52-basic-endpoints/index.md",tags:[],version:"current",frontMatter:{title:"Use Cases: Basic Endpoints"},sidebar:"docs",previous:{title:"Filtering",permalink:"/api-lite/filtering"},next:{title:"Objects Used in the Examples",permalink:"/api-lite/basic-endpoints/objects"}},l={},u=[];function d(e){return(0,i.jsx)(s.A,{})}function p(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d()}},5871:(e,t,n)=>{n.d(t,{A:()=>y});var i=n(6540),r=n(4164),s=n(6972),o=n(8774),c=n(4586);const a=["zero","one","two","few","many","other"];function l(e){return a.filter((t=>e.includes(t)))}const u={locale:"en",pluralForms:l(["one","other"]),select:e=>1===e?"one":"other"};function d(){const{i18n:{currentLocale:e}}=(0,c.A)();return(0,i.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:l(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),u}}),[e])}function p(){const e=d();return{selectMessage:(t,n)=>function(e,t,n){const i=e.split("|");if(1===i.length)return i[0];i.length>n.pluralForms.length&&console.error(`For locale=${n.locale}, a maximum of ${n.pluralForms.length} plural forms are expected (${n.pluralForms.join(",")}), but the message contains ${i.length}: ${e}`);const r=n.select(t),s=n.pluralForms.indexOf(r);return i[Math.min(s,i.length-1)]}(n,t,e)}}var m=n(6654),f=n(1312),h=n(1107);const g={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};var x=n(4848);function b(e){let{href:t,children:n}=e;return(0,x.jsx)(o.A,{href:t,className:(0,r.A)("card padding--lg",g.cardContainer),children:n})}function j(e){let{href:t,icon:n,title:i,description:s}=e;return(0,x.jsxs)(b,{href:t,children:[(0,x.jsxs)(h.A,{as:"h2",className:(0,r.A)("text--truncate",g.cardTitle),title:i,children:[n," ",i]}),s&&(0,x.jsx)("p",{className:(0,r.A)("text--truncate",g.cardDescription),title:s,children:s})]})}function k(e){let{item:t}=e;const n=(0,s.Nr)(t),i=function(){const{selectMessage:e}=p();return t=>e(t,(0,f.T)({message:"1 item|{count} items",id:"theme.docs.DocCard.categoryDescription.plurals",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t}))}();return n?(0,x.jsx)(j,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??i(t.items.length)}):null}function C(e){let{item:t}=e;const n=(0,m.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,s.cC)(t.docId??void 0);return(0,x.jsx)(j,{href:t.href,icon:n,title:t.label,description:t.description??i?.description})}function w(e){let{item:t}=e;switch(t.type){case"link":return(0,x.jsx)(C,{item:t});case"category":return(0,x.jsx)(k,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function v(e){let{className:t}=e;const n=(0,s.$S)();return(0,x.jsx)(y,{items:n.items,className:t})}function y(e){const{items:t,className:n}=e;if(!t)return(0,x.jsx)(v,{...e});const i=(0,s.d1)(t);return(0,x.jsx)("section",{className:(0,r.A)("row",n),children:i.map(((e,t)=>(0,x.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,x.jsx)(w,{item:e})},t)))})}},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>c});var i=n(6540);const r={},s=i.createContext(r);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);