"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[558],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>y});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},f=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(n),f=a,y=u["".concat(s,".").concat(f)]||u[f]||d[f]||r;return n?i.createElement(y,o(o({ref:t},c),{},{components:n})):i.createElement(y,o({ref:t},c))}));function y(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var p=2;p<r;p++)o[p]=n[p];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9811:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var i=n(7462),a=(n(7294),n(3905));const r={title:"Mandatory File"},o=void 0,l={unversionedId:"file-bundle/mandatory-file",id:"file-bundle/mandatory-file",title:"Mandatory File",description:"This chapter explains the situation where a file is mandatory to the entity.",source:"@site/docs/file-bundle/10-mandatory-file.md",sourceDirName:"file-bundle",slug:"/file-bundle/mandatory-file",permalink:"/file-bundle/mandatory-file",draft:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file-bundle/10-mandatory-file.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"Mandatory File"},sidebar:"docs",previous:{title:"Translation",permalink:"/file-bundle/translation"},next:{title:"Lazy-Loading Files",permalink:"/file-bundle/lazy-loading"}},s={},p=[{value:"Making a File Mandatory in an Entity",id:"making-a-file-mandatory-in-an-entity",level:2},{value:"If The File That is Supposed to be Present is not Present...",id:"if-the-file-that-is-supposed-to-be-present-is-not-present",level:2},{value:"Mandatory File and Lazy-Loading Proxy",id:"mandatory-file-and-lazy-loading-proxy",level:2}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This chapter explains the situation where a file is mandatory to the entity."),(0,a.kt)("h2",{id:"making-a-file-mandatory-in-an-entity"},"Making a File Mandatory in an Entity"),(0,a.kt)("p",null,"To make a file mandatory in an entity, you simply need to type-hint the file\nproperty with ",(0,a.kt)("inlineCode",{parentName:"p"},"FileInterface")," instead of ",(0,a.kt)("inlineCode",{parentName:"p"},"?FileInterface"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\Contracts\\File\\FileInterface;\nuse Rekalogika\\File\\Association\\Attribute\\WithFileAssociation;\nuse Rekalogika\\File\\Association\\Attribute\\AsFileAssociation;\n\n#[WithFileAssociation]\nclass Product\n{\n    #[AsFileAssociation]\n    // highlight-next-line\n    private FileInterface $image;\n}\n")),(0,a.kt)("p",null,"By doing so, the framework will consider that the property has to be filled with\na ",(0,a.kt)("inlineCode",{parentName:"p"},"FileInterface")," object, one way or another."),(0,a.kt)("h2",{id:"if-the-file-that-is-supposed-to-be-present-is-not-present"},"If The File That is Supposed to be Present is not Present..."),(0,a.kt)("p",null,"If the property is mandatory, but the actual file does not exist in the storage\nbackend, the framework will substitute it with a ",(0,a.kt)("inlineCode",{parentName:"p"},"MissingFile")," object. The\nsituation is considered an error and will be logged as such. The administrator\nor the developer is expected to fix the problem."),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"MissingFile")," object is an implementation of the ",(0,a.kt)("a",{parentName:"p",href:"https://martinfowler.com/eaaCatalog/specialCase.html"},"null object\npattern"),". It should not\ncause a fatal error, unless the caller is trying to operate on it that would\ncause a permanent effect, like saving it to an entity."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"MissingFile")," is also an ",(0,a.kt)("inlineCode",{parentName:"p"},"Exception"),", but is not thrown by the framework. You\ncan treat it as a regular exception, including getting the stack trace from it."),(0,a.kt)("p",null,"For more information about ",(0,a.kt)("inlineCode",{parentName:"p"},"NullFile")," in the framework, read the chapter\n",(0,a.kt)("a",{parentName:"p",href:"../file/null-file"},"Null File"),"."),(0,a.kt)("h2",{id:"mandatory-file-and-lazy-loading-proxy"},"Mandatory File and Lazy-Loading Proxy"),(0,a.kt)("p",null,"If you are using a lazy-loading proxy, the property will always be filled by an\ninstance of ",(0,a.kt)("inlineCode",{parentName:"p"},"FileInterface"),". However, the framework does not check if the file\nexists in the storage backend until you first try to access the file. If you\nwant a mandatory file, you have to do it yourself:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\Contracts\\File\\FileInterface;\nuse Rekalogika\\Contracts\\File\\FileProxy;\nuse Rekalogika\\Domain\\File\\Null\\NullFile;\nuse Rekalogika\\File\\Association\\Attribute\\AsFileAssociation;\n\n#[WithFileAssociation]\nclass Product\n{\n    #[AsFileAssociation(fetch: 'LAZY')]\n    private FileInterface $image;\n\n    public function getImage(): FileInterface\n    {\n        return FileProxy::getFile($this->image) ?? new NullFile;\n    }\n}\n")),(0,a.kt)("admonition",{title:"Protip",type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"You might want to make sure other methods in the entity don't use the property\ndirectly but use the getter instead.")))}d.isMDXComponent=!0}}]);