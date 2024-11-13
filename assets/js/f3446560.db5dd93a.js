"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[555],{5393:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>h,frontMatter:()=>l,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"file-bundle/lazy-loading","title":"Lazy-Loading Files","description":"This chapter describes how to implement the lazy-loading of files in your","source":"@site/docs/file-bundle/11-lazy-loading.md","sourceDirName":"file-bundle","slug":"/file-bundle/lazy-loading","permalink":"/file-bundle/lazy-loading","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file-bundle/11-lazy-loading.md","tags":[],"version":"current","sidebarPosition":11,"frontMatter":{"title":"Lazy-Loading Files"},"sidebar":"docs","previous":{"title":"Mandatory File","permalink":"/file-bundle/mandatory-file"},"next":{"title":"Replicating Metadata in Entities","permalink":"/file-bundle/replicating-metadata-in-entities"}}');var a=i(4848),o=i(8453);const l={title:"Lazy-Loading Files"},r=void 0,s={},d=[{value:"Property Set-Up",id:"property-set-up",level:2},{value:"Getter Set-Up",id:"getter-set-up",level:2},{value:"Lazy-Loading Proxy and Mandatory Files",id:"lazy-loading-proxy-and-mandatory-files",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"This chapter describes how to implement the lazy-loading of files in your\nentities."}),"\n",(0,a.jsx)(n.h2,{id:"property-set-up",children:"Property Set-Up"}),"\n",(0,a.jsxs)(n.p,{children:["To lazy-load files in your entities, simply add the parameter ",(0,a.jsx)(n.code,{children:"fetch: 'LAZY'"})," to\nthe ",(0,a.jsx)(n.code,{children:"AsFileAssociation"})," attribute:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Rekalogika\\Contracts\\File\\FileInterface;\nuse Rekalogika\\File\\Association\\Attribute\\AsFileAssociation;\n\nclass Product\n{\n    // highlight-next-line\n    #[AsFileAssociation(fetch: 'LAZY')]\n    private FileInterface $image;\n}\n"})}),"\n",(0,a.jsx)(n.h2,{id:"getter-set-up",children:"Getter Set-Up"}),"\n",(0,a.jsx)(n.p,{children:"To preserve the normal behavior of your entity when using a lazy-loading proxy,\nyou should also modify the getter of the property like this:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Rekalogika\\Contracts\\File\\FileInterface;\n// highlight-next-line\nuse Rekalogika\\Contracts\\File\\FileProxy;\nuse Rekalogika\\File\\Association\\Attribute\\AsFileAssociation;\n\nclass Product\n{\n    #[AsFileAssociation(fetch: 'LAZY')]\n    private FileInterface $image;\n\n    public function getImage(): ?FileInterface\n    {\n        // highlight-next-line\n        return FileProxy::getFile($this->image);\n    }\n}\n"})}),"\n",(0,a.jsx)(n.admonition,{title:"Protip",type:"tip",children:(0,a.jsx)(n.p,{children:"You might want to make sure other methods in the entity don't use the property\ndirectly but use the getter instead."})}),"\n",(0,a.jsx)(n.admonition,{type:"info",children:(0,a.jsxs)(n.p,{children:["The class ",(0,a.jsx)(n.code,{children:"FileDecorator"})," used in ",(0,a.jsx)(n.a,{href:"replicating-metadata-in-entities",children:"metadata\nreplication"})," and ",(0,a.jsx)(n.a,{href:"collection",children:"file collection"}),"\nis aware of lazy-loading proxies, so you don't need to modify the getter as\nexplained here if you are using ",(0,a.jsx)(n.code,{children:"FileDecorator"}),"."]})}),"\n",(0,a.jsx)(n.h2,{id:"lazy-loading-proxy-and-mandatory-files",children:"Lazy-Loading Proxy and Mandatory Files"}),"\n",(0,a.jsxs)(n.p,{children:["If you want both lazy-loading and mandatory files, please read the chapter\n",(0,a.jsx)(n.a,{href:"mandatory-file",children:"Mandatory File"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>r});var t=i(6540);const a={},o=t.createContext(a);function l(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);