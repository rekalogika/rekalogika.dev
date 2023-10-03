"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9441],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>d});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)r=i[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),p=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},f="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),f=p(r),c=n,d=f["".concat(s,".").concat(c)]||f[c]||m[c]||i;return r?a.createElement(d,l(l({ref:t},u),{},{components:r})):a.createElement(d,l({ref:t},u))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,l=new Array(i);l[0]=c;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[f]="string"==typeof e?e:n,l[1]=o;for(var p=2;p<i;p++)l[p]=r[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,r)}c.displayName="MDXCreateElement"},7205:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>p,toc:()=>f});var a=r(7462),n=(r(7294),r(3905)),i=r(4996),l=r(941);const o={title:"Introduction"},s=void 0,p={unversionedId:"file/intro",id:"file/intro",title:"Introduction",description:"High-level file abstraction library built on top of Flysystem. It lets you work",source:"@site/docs/file/00-intro.md",sourceDirName:"file",slug:"/file/intro",permalink:"/file/intro",draft:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file/00-intro.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{title:"Introduction"},sidebar:"docs",previous:{title:"rekalogika/file",permalink:"/file/"},next:{title:"Installation & Configuration",permalink:"/file/installation"}},u={},f=[{value:"Features",id:"features",level:2},{value:"General Features",id:"general-features",level:3},{value:"Interoperability Features",id:"interoperability-features",level:3},{value:"Components",id:"components",level:2},{value:"License",id:"license",level:2},{value:"Contributing",id:"contributing",level:2}],m={toc:f},c="wrapper";function d(e){let{components:t,...r}=e;return(0,n.kt)(c,(0,a.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"High-level file abstraction library built on top of Flysystem. It lets you work\nwith file objects in an object-oriented manner. A file object represents a file\nin a Flysystem filesystem. It can be a local file or a file in a cloud storage,\nthe library lets you work with them in the same way."),(0,n.kt)("h2",{id:"features"},"Features"),(0,n.kt)("h3",{id:"general-features"},"General Features"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Rich, high-level abstraction of files built on top of Flysystem."),(0,n.kt)("li",{parentName:"ul"},"Abstractions for file name and media type (MIME type)."),(0,n.kt)("li",{parentName:"ul"},"Caches and stores metadata in a sidecar file. Uniform metadata support across\nall filesystems."),(0,n.kt)("li",{parentName:"ul"},"Uses the repository pattern for files."),(0,n.kt)("li",{parentName:"ul"},"Remote fa\xe7ade pattern in accessing metadata. Improves performance with remote\nfilesystems. Two metadata queries require only one round trip."),(0,n.kt)("li",{parentName:"ul"},"Rich metadata support."),(0,n.kt)("li",{parentName:"ul"},"Option to use lazy-loading proxy for files."),(0,n.kt)("li",{parentName:"ul"},"Support for file derivations."),(0,n.kt)("li",{parentName:"ul"},"Separated contracts and implementation. Useful for enforcing architectural\nboundaries. Your domain models don't have to depend on the framework.")),(0,n.kt)("h3",{id:"interoperability-features"},"Interoperability Features"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Adapters for Symfony HttpFoundation, Form, and Validator."),(0,n.kt)("li",{parentName:"ul"},"Adapter for OneupUploaderBundle.")),(0,n.kt)("h2",{id:"components"},"Components"),(0,n.kt)("p",null,"The File framework consists of several components."),(0,n.kt)(l.Z,{alt:"File classes",sources:{light:(0,i.Z)("/diagrams/light/file-components.svg"),dark:(0,i.Z)("/diagrams/dark/file-components.svg")},width:"100%",mdxType:"ThemedImage"}),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file"),": The core library. It provides the file abstraction and\nmetadata support."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-bundle"),": Integrates the library with Symfony."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-association"),": Provides support for associating files with"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-association-entity"),": Utilities for handling files inside\ndomain entities."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-contracts"),": Contains the interfaces and contracts used by\nthe library."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-derivation"),": Library for creating derived files."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-image"),": Provides image resizing filter."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-metadata"),": Classes that represent file metadata."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-metadata-contracts"),": Contains additional interfaces\ndescribing file metadata."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-oneup-uploader-bridge"),": Adapter for OneupUploaderBundle."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-server"),": Temporary URL server for files."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"rekalogika/file-symfony-bridge"),": Adapter for Symfony HttpFoundation, Form, and\nValidator.")),(0,n.kt)("h2",{id:"license"},"License"),(0,n.kt)("p",null,"MIT"),(0,n.kt)("h2",{id:"contributing"},"Contributing"),(0,n.kt)("p",null,"This framework consists of multiple repositories split from a monorepo. Be\nsure to submit issues and pull requests to the\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/rekalogika/file-src"},"rekalogika/file-src")," monorepo."))}d.isMDXComponent=!0}}]);