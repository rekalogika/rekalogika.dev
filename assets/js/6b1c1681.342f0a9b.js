"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[3535],{9665:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>g,frontMatter:()=>o,metadata:()=>t,toc:()=>s});const t=JSON.parse('{"id":"rekapager/framework-integration/integrating","title":"Integrating Rekapager into a Framework","description":"This document explains what you need to do to integrate Rekapager into a","source":"@site/docs/rekapager/05-framework-integration/04-integrating.md","sourceDirName":"rekapager/05-framework-integration","slug":"/rekapager/framework-integration/integrating","permalink":"/rekapager/framework-integration/integrating","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/05-framework-integration/04-integrating.md","tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"title":"Integrating Rekapager into a Framework"},"sidebar":"docs","previous":{"title":"Doctrine Collections Integration","permalink":"/rekapager/framework-integration/doctrine"},"next":{"title":"Batch Processing","permalink":"/rekapager/batch-processing/"}}');var a=r(4848),i=r(8453);const o={title:"Integrating Rekapager into a Framework"},c=void 0,d={},s=[{value:"Dependencies",id:"dependencies",level:2},{value:"Implement <code>PageIdentifierEncoderLocatorInterface</code>",id:"implement-pageidentifierencoderlocatorinterface",level:2},{value:"Wire <code>PageIdentifierEncoderResolver</code>",id:"wire-pageidentifierencoderresolver",level:2},{value:"Implement <code>PageUrlGeneratorInterface</code>",id:"implement-pageurlgeneratorinterface",level:2},{value:"Create a Pager Factory",id:"create-a-pager-factory",level:2},{value:"Create a Pager Renderer (optional)",id:"create-a-pager-renderer-optional",level:2}];function l(e){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"This document explains what you need to do to integrate Rekapager into a\nframework."}),"\n",(0,a.jsx)(n.h2,{id:"dependencies",children:"Dependencies"}),"\n",(0,a.jsx)(n.p,{children:"The integration package should depend on:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"rekalogika/rekapager-contracts"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"rekalogika/rekapager-core"})}),"\n"]}),"\n",(0,a.jsxs)(n.h2,{id:"implement-pageidentifierencoderlocatorinterface",children:["Implement ",(0,a.jsx)(n.code,{children:"PageIdentifierEncoderLocatorInterface"})]}),"\n",(0,a.jsxs)(n.p,{children:["It takes the class name of a page identifier object, and returns an instance of\n",(0,a.jsx)(n.code,{children:"PageIdentifierEncoderInterface"})," that will be used to encode and decode the page\nidentifier."]}),"\n",(0,a.jsxs)(n.p,{children:["Rekapager ships with two pageable types: ",(0,a.jsx)(n.code,{children:"KeysetPageable"})," and ",(0,a.jsx)(n.code,{children:"OffsetPageable"}),"\n(",(0,a.jsx)(n.code,{children:"PagerfantaPageable"})," is a wrapper around ",(0,a.jsx)(n.code,{children:"OffsetPageable"}),", so it doesn't apply\nhere). The packages already have the encoders, all you need to do is to\nwire their dependencies, and implement the locator."]}),"\n",(0,a.jsxs)(n.h2,{id:"wire-pageidentifierencoderresolver",children:["Wire ",(0,a.jsx)(n.code,{children:"PageIdentifierEncoderResolver"})]}),"\n",(0,a.jsxs)(n.p,{children:["The class is ready to use. It takes the ",(0,a.jsx)(n.code,{children:"PageIdentifierEncoderLocatorInterface"}),"\nas its argument."]}),"\n",(0,a.jsxs)(n.h2,{id:"implement-pageurlgeneratorinterface",children:["Implement ",(0,a.jsx)(n.code,{children:"PageUrlGeneratorInterface"})]}),"\n",(0,a.jsx)(n.p,{children:"It takes a page identifier already converted into a string, and returns a URL\ncontaining the string."}),"\n",(0,a.jsx)(n.h2,{id:"create-a-pager-factory",children:"Create a Pager Factory"}),"\n",(0,a.jsx)(n.p,{children:"This factory should do the following:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Take a ",(0,a.jsx)(n.code,{children:"PageableInterface"})," object from the caller."]}),"\n",(0,a.jsx)(n.li,{children:"Determine the page identifier string from the URL. If not found, use the first\npage as the current page."}),"\n",(0,a.jsxs)(n.li,{children:["Transform the string into a page identifier object using\n",(0,a.jsx)(n.code,{children:"PageIdentifierEncoderResolver"}),"."]}),"\n",(0,a.jsxs)(n.li,{children:["Call ",(0,a.jsx)(n.code,{children:"getPageByIdentifier($pageIdentifier)"})," on the pageable object to get the\ncurrent page."]}),"\n",(0,a.jsxs)(n.li,{children:["Instantiate ",(0,a.jsx)(n.code,{children:"Pager"}),", and return it."]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"create-a-pager-renderer-optional",children:"Create a Pager Renderer (optional)"}),"\n",(0,a.jsxs)(n.p,{children:["This class should take a ",(0,a.jsx)(n.code,{children:"PagerInterface"})," object, and render the pagination\ncontrol in the user interface, which is probably the final result that most\npeople are looking for."]})]})}function g(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>o,x:()=>c});var t=r(6540);const a={},i=t.createContext(a);function o(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);