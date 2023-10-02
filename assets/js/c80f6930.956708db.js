"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[686],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),u=s(n),f=a,d=u["".concat(p,".").concat(f)]||u[f]||c[f]||i;return n?r.createElement(d,o(o({ref:t},m),{},{components:n})):r.createElement(d,o({ref:t},m))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=f;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},9193:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const i={title:"Serving Files"},o=void 0,l={unversionedId:"file-bundle/serving-files",id:"file-bundle/serving-files",title:"Serving Files",description:"This chapter describes how to serve files to the client web browser.",source:"@site/docs/file-bundle/05-serving-files.md",sourceDirName:"file-bundle",slug:"/file-bundle/serving-files",permalink:"/file-bundle/serving-files",draft:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file-bundle/05-serving-files.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{title:"Serving Files"},sidebar:"docs",previous:{title:"Integration With Symfony Components",permalink:"/file-bundle/symfony"},next:{title:"Filtering",permalink:"/file-bundle/filtering"}},p={},s=[{value:"Streaming Files in a Symfony Controller",id:"streaming-files-in-a-symfony-controller",level:2},{value:"Generate a Temporary URL to a File",id:"generate-a-temporary-url-to-a-file",level:2},{value:"PHP Usage",id:"php-usage",level:3},{value:"Twig Usage",id:"twig-usage",level:3},{value:"More Information",id:"more-information",level:3}],m={toc:s},u="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This chapter describes how to serve files to the client web browser."),(0,a.kt)("h2",{id:"streaming-files-in-a-symfony-controller"},"Streaming Files in a Symfony Controller"),(0,a.kt)("admonition",{title:"Preparation",type:"info"},(0,a.kt)("p",{parentName:"admonition"},"You need to install the package ",(0,a.kt)("inlineCode",{parentName:"p"},"rekalogika/file-symfony-bridge")," to use this\nfeature:"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"composer require rekalogika/file-symfony-bridge\n"))),(0,a.kt)("p",null,"To send a file to the web browser, you can use ",(0,a.kt)("inlineCode",{parentName:"p"},"FileResponse"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\File\\Bridge\\Symfony\\HttpFoundation\\FileResponse;\nuse Rekalogika\\Contracts\\File\\FileInterface;\nuse Symfony\\Component\\HttpFoundation\\Response;\n\nclass SomeController\n{\n    public function download(): Response\n    {\n        /** @var FileInterface $file */\n        $file = ...;\n\n        return new FileResponse($file);\n    }\n}\n")),(0,a.kt)("h2",{id:"generate-a-temporary-url-to-a-file"},"Generate a Temporary URL to a File"),(0,a.kt)("p",null,"Rather than creating a controller action to serve a file for every possible\nsituation, it is more convenient to generate a temporary URL to a file."),(0,a.kt)("admonition",{title:"Preparation",type:"info"},(0,a.kt)("p",{parentName:"admonition"},"You need to install the package ",(0,a.kt)("inlineCode",{parentName:"p"},"rekalogika/file-server")," to use this feature:"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"composer require rekalogika/file-server\n")),(0,a.kt)("p",{parentName:"admonition"},"If you are not using Symfony Flex, read the documentation of\n",(0,a.kt)("a",{parentName:"p",href:"../file-bundle/installation"},(0,a.kt)("inlineCode",{parentName:"a"},"rekalogika/file-bundle"))," and ",(0,a.kt)("a",{parentName:"p",href:"../temporary-url-bundle"},(0,a.kt)("inlineCode",{parentName:"a"},"rekalogika/temporary-url-bundle"))," to\nlearn how to register the required bundles.")),(0,a.kt)("h3",{id:"php-usage"},"PHP Usage"),(0,a.kt)("p",null,"Wire in the ",(0,a.kt)("inlineCode",{parentName:"p"},"TemporaryUrlGeneratorInterface")," service, and use the\n",(0,a.kt)("inlineCode",{parentName:"p"},"generateUrl()")," method to generate a temporary URL to a file. It accepts either\na ",(0,a.kt)("inlineCode",{parentName:"p"},"FileInterface")," or a ",(0,a.kt)("inlineCode",{parentName:"p"},"FilePointerInterface"),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\TemporaryUrl\\TemporaryUrlGeneratorInterface;\nuse Rekalogika\\File\\FileInterface;\nuse Rekalogika\\File\\FilePointerInterface;\n\n/** @var TemporaryUrlGeneratorInterface $temporaryUrlGenerator */\n/** @var FileInterface|FilePointerInterface $file */\n\n$url = $temporaryUrlGenerator->generateUrl($file);\n")),(0,a.kt)("h3",{id:"twig-usage"},"Twig Usage"),(0,a.kt)("p",null,"In Twig templates, you can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"temporary_url")," filter to generate a\ntemporary URL to a file."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-twig"},'<a href="{{ file|temporary_url }}">Click here to download</a>\n')),(0,a.kt)("p",null,"With images, a convenient pattern is to chain the ",(0,a.kt)("inlineCode",{parentName:"p"},"temporary_url")," filter with\nthe ",(0,a.kt)("inlineCode",{parentName:"p"},"image_resize")," filter from the ",(0,a.kt)("inlineCode",{parentName:"p"},"rekalogika/file-image")," package."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-twig"},'<img src="{{ my_image|image_resize(200)|temporary_url }}" />\n')),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"image_resize")," filter requires the ",(0,a.kt)("inlineCode",{parentName:"p"},"rekalogika/file-image")," package:"),(0,a.kt)("pre",{parentName:"admonition"},(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"composer require rekalogika/file-image\n")),(0,a.kt)("p",{parentName:"admonition"},"Read more in the ",(0,a.kt)("a",{parentName:"p",href:"filtering"},"Filtering")," section.")),(0,a.kt)("h3",{id:"more-information"},"More Information"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"generateUrl()")," method and the ",(0,a.kt)("inlineCode",{parentName:"p"},"temporary_url")," Twig filter accept several\noptions. Read the documentation of ",(0,a.kt)("a",{parentName:"p",href:"../temporary-url-bundle"},(0,a.kt)("inlineCode",{parentName:"a"},"rekalogika/temporary-url-bundle"))," to\nlearn more."))}c.isMDXComponent=!0}}]);