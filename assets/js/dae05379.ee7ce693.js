"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6670],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=c(n),d=i,m=u["".concat(s,".").concat(d)]||u[d]||f[d]||a;return n?r.createElement(m,l(l({ref:t},p),{},{components:n})):r.createElement(m,l({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,l=new Array(a);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:i,l[1]=o;for(var c=2;c<a;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1870:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>f,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var r=n(7462),i=(n(7294),n(3905));const a={title:"Creating Filters"},l=void 0,o={unversionedId:"file-bundle/creating-filters",id:"file-bundle/creating-filters",title:"Creating Filters",description:"This chapter explains how to create your own file filters using",source:"@site/docs/file-bundle/22-creating-filters.md",sourceDirName:"file-bundle",slug:"/file-bundle/creating-filters",permalink:"/file-bundle/creating-filters",draft:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file-bundle/22-creating-filters.md",tags:[],version:"current",sidebarPosition:22,frontMatter:{title:"Creating Filters"},sidebar:"docs",previous:{title:"File Association Internal Details",permalink:"/file-bundle/entity-association-internal"},next:{title:"Object ID Resolver",permalink:"/file-bundle/object-id-resolver"}},s={},c=[],p={toc:c},u="wrapper";function f(e){let{components:t,...n}=e;return(0,i.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This chapter explains how to create your own file filters using\n",(0,i.kt)("inlineCode",{parentName:"p"},"AbstractFileFilter"),"."),(0,i.kt)("admonition",{title:"Preparation",type:"note"},(0,i.kt)("p",{parentName:"admonition"},"You need to install the package ",(0,i.kt)("inlineCode",{parentName:"p"},"rekalogika/file-derivation")," to use this\nfeature:"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"composer require rekalogika/file-derivation\n"))),(0,i.kt)("p",null,"To create a filter class, you can extend ",(0,i.kt)("inlineCode",{parentName:"p"},"AbstractFileFilter"),", create a method\n(or more) for the callers to specify the filtering parameters, and implement all\nthe abstract methods."),(0,i.kt)("p",null,"The following is an example filter class that creates a derived file by (rather\nuselessly) appending a text to the original content:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\Contracts\\File\\FileInterface;\nuse Rekalogika\\File\\Derivation\\Filter\\AbstractFileFilter;\nuse Rekalogika\\File\\TemporaryFile;\n\nclass TextAppender extends AbstractFileFilter\n{\n    private string $text;\n\n    /**\n     * Your custom method that lets the caller specify the filtering parameters.\n     */\n    public function appendText(string $text): self\n    {\n        assert(ctype_alpha($text)); // ensure alpha characters only\n        $this->text = $text;\n\n        return $this;\n    }\n\n    /**\n     * This method return the derivation ID from the filtering parameters the\n     * caller provided.\n     */\n    #[\\Override]\n    protected function getDerivationId(): string\n    {\n        return 'append_' . $this->text;\n    }\n\n    #[\\Override]\n    protected function process(): FileInterface\n    {\n        $originalContent = $this->getSourceFile()->getContent();\n\n        return new TemporaryFile::createFromString($originalContent . $this->text);\n    }\n}\n")),(0,i.kt)("p",null,"If you are using autoconfiguration, then you are all set. Otherwise, you need\nto tag your class with ",(0,i.kt)("inlineCode",{parentName:"p"},"rekalogika.file.derivation.filter"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml",metastring:"title=config/services.yaml",title:"config/services.yaml"},"services:\n    App\\TextAppender:\n        tags:\n            - { name: 'rekalogika.file.derivation.filter' }\n")),(0,i.kt)("p",null,"A caller will be able to use the above filter like the following:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\Contracts\\File\\FileInterface;\n\n/** @var TextAppender $textAppender */\n/** @var FileInterface $file */\n\n$derivedFile = $textAppender\n    ->take($file)\n    ->appendText('foo')\n    ->getResult();\n")))}f.isMDXComponent=!0}}]);