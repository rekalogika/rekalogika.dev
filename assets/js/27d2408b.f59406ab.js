"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[3349],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>f});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),d=s(n),u=i,f=d["".concat(l,".").concat(u)]||d[u]||p[u]||o;return n?r.createElement(f,a(a({ref:t},m),{},{components:n})):r.createElement(f,a({ref:t},m))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[d]="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2991:(e,t,n)=>{n.d(t,{Z:()=>v});var r=n(7294),i=n(6010),o=n(3438),a=n(9960),c=n(3919),l=n(5999);const s={cardContainer:"cardContainer_fWXF",cardTitle:"cardTitle_rnsV",cardDescription:"cardDescription_PWke"};function m(e){let{href:t,children:n}=e;return r.createElement(a.Z,{href:t,className:(0,i.Z)("card padding--lg",s.cardContainer)},n)}function d(e){let{href:t,icon:n,title:o,description:a}=e;return r.createElement(m,{href:t},r.createElement("h2",{className:(0,i.Z)("text--truncate",s.cardTitle),title:o},n," ",o),a&&r.createElement("p",{className:(0,i.Z)("text--truncate",s.cardDescription),title:a},a))}function p(e){let{item:t}=e;const n=(0,o.Wl)(t);return n?r.createElement(d,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,l.I)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function u(e){let{item:t}=e;const n=(0,c.Z)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,o.xz)(t.docId??void 0);return r.createElement(d,{href:t.href,icon:n,title:t.label,description:t.description??i?.description})}function f(e){let{item:t}=e;switch(t.type){case"link":return r.createElement(u,{item:t});case"category":return r.createElement(p,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function y(e){let{className:t}=e;const n=(0,o.jA)();return r.createElement(v,{items:n.items,className:t})}function v(e){const{items:t,className:n}=e;if(!t)return r.createElement(y,e);const a=(0,o.MN)(t);return r.createElement("section",{className:(0,i.Z)("row",n)},a.map(((e,t)=>r.createElement("article",{key:t,className:"col col--6 margin-bottom--lg"},r.createElement(f,{item:e})))))}},8139:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>m});var r=n(7462),i=(n(7294),n(3905)),o=n(2991);const a={title:"rekalogika/domain-event"},c=void 0,l={unversionedId:"domain-event/index",id:"domain-event/index",title:"rekalogika/domain-event",description:"A domain event pattern",source:"@site/docs/domain-event/index.md",sourceDirName:"domain-event",slug:"/domain-event/",permalink:"/domain-event/",draft:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/domain-event/index.md",tags:[],version:"current",frontMatter:{title:"rekalogika/domain-event"},sidebar:"docs",previous:{title:"Abstraction",permalink:"/doctrine-collections-decorator/use-cases/abstraction"},next:{title:"Introduction & Installation",permalink:"/domain-event/intro"}},s={},m=[{value:"Sections",id:"sections",level:2}],d={toc:m},p="wrapper";function u(e){let{components:t,...n}=e;return(0,i.kt)(p,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"A ",(0,i.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/domain-events-design-implementation"},"domain event pattern"),"\nimplementation for Symfony & Doctrine."),(0,i.kt)("h2",{id:"sections"},"Sections"),(0,i.kt)(o.Z,{mdxType:"DocCardList"}))}u.isMDXComponent=!0}}]);