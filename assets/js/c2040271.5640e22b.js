"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4645],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=u(n),d=i,m=c["".concat(s,".").concat(d)]||c[d]||f[d]||o;return n?r.createElement(m,a(a({ref:t},p),{},{components:n})):r.createElement(m,a({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:i,a[1]=l;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4981:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>f,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var r=n(7462),i=(n(7294),n(3905));const o={title:"Introduction"},a=void 0,l={unversionedId:"file-bundle/intro",id:"file-bundle/intro",title:"Introduction",description:"Symfony bundle to easily integrate the rekalogika/file framework and related",source:"@site/docs/file-bundle/01-intro.md",sourceDirName:"file-bundle",slug:"/file-bundle/intro",permalink:"/file-bundle/intro",draft:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file-bundle/01-intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Introduction"},sidebar:"docs",previous:{title:"rekalogika/file-bundle",permalink:"/file-bundle/"},next:{title:"Installation & Configuration",permalink:"/file-bundle/installation"}},s={},u=[{value:"Features",id:"features",level:2},{value:"License",id:"license",level:2},{value:"Contributing",id:"contributing",level:2}],p={toc:u},c="wrapper";function f(e){let{components:t,...n}=e;return(0,i.kt)(c,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Symfony bundle to easily integrate the ",(0,i.kt)("inlineCode",{parentName:"p"},"rekalogika/file")," framework and related\npackages within a Symfony application."),(0,i.kt)("h2",{id:"features"},"Features"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Works out of the box without configuration."),(0,i.kt)("li",{parentName:"ul"},"DX improvement, less micro-management of entity-file relations."),(0,i.kt)("li",{parentName:"ul"},"Requires only a single property in the entity for each associated file."),(0,i.kt)("li",{parentName:"ul"},"Having said that, there is an option to replicate the file metadata in the\nentity, and it does so without changing how you work with the files."),(0,i.kt)("li",{parentName:"ul"},"Trait and abstract class to ease implementing a one-to-many relation between\nan entity and multiple files."),(0,i.kt)("li",{parentName:"ul"},"Reads and writes directly into the file properties, even if private. You are\nfree to have business logic in the getters and setters."),(0,i.kt)("li",{parentName:"ul"},"Doesn't require you to update another property of the entity (",(0,i.kt)("inlineCode",{parentName:"li"},"lastUpdated"),"?)\njust to make sure the correct Doctrine events will be fired."),(0,i.kt)("li",{parentName:"ul"},"Localization. Show strings in the user's language."),(0,i.kt)("li",{parentName:"ul"},"Adapters for various Symfony components, including HttpFoundation, Form, and\nValidator."),(0,i.kt)("li",{parentName:"ul"},"Image resizing filter."),(0,i.kt)("li",{parentName:"ul"},"Temporary URL generation to files."),(0,i.kt)("li",{parentName:"ul"},"Mandatory files (not null for file properties). Substitute the file with a\nnull object if it is not found in the storage backend."),(0,i.kt)("li",{parentName:"ul"},"Lazy loading for files.")),(0,i.kt)("h2",{id:"license"},"License"),(0,i.kt)("p",null,"MIT"),(0,i.kt)("h2",{id:"contributing"},"Contributing"),(0,i.kt)("p",null,"This framework consists of multiple repositories split from a monorepo. Be\nsure to submit issues and pull requests to the\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/rekalogika/file-src"},"rekalogika/file-src")," monorepo."))}f.isMDXComponent=!0}}]);