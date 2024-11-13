"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[1299],{246:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"file/adapters","title":"Adapters","description":"The library provides a FileAdapter class that can be used to adapt or convert","source":"@site/docs/file/04-adapters.md","sourceDirName":"file","slug":"/file/adapters","permalink":"/file/adapters","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file/04-adapters.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"title":"Adapters"},"sidebar":"docs","previous":{"title":"Using File & FileRepository","permalink":"/file/file"},"next":{"title":"Metadata","permalink":"/file/metadata"}}');var r=n(4848),a=n(8453);const s={title:"Adapters"},l=void 0,o={},d=[];function c(e){const t={code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["The library provides a ",(0,r.jsx)(t.code,{children:"FileAdapter"})," class that can be used to adapt or convert\na file object from another library to our ",(0,r.jsx)(t.code,{children:"FileInterface"}),"."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\File\\FileAdapter;\nuse Rekalogika\\File\\FileInterface;\n\n// $theirFile is any of the supported file object\n\n$ourFile = FileAdapter::adapt($theirFile);\nassert($ourFile instanceof FileInterface);\n"})}),"\n",(0,r.jsx)(t.p,{children:"Currently supported objects:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"string: assumed to be a path to a local file"}),"\n",(0,r.jsxs)(t.li,{children:["PHP's ",(0,r.jsx)(t.code,{children:"SplFileInfo"})]}),"\n",(0,r.jsxs)(t.li,{children:["Symfony HttpFoundation ",(0,r.jsx)(t.code,{children:"File"})," (and descendants, including the ubiquitous\n",(0,r.jsx)(t.code,{children:"UploadedFile"}),"). Requires the ",(0,r.jsx)(t.code,{children:"rekalogika/file-symfony-bridge"})," package."]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:"FileInterface"})," of OneupUploaderBundle. Requires the\n",(0,r.jsx)(t.code,{children:"rekalogika/file-oneup-uploader-bridge"})," package."]}),"\n"]})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>l});var i=n(6540);const r={},a=i.createContext(r);function s(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);