"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[5718],{3192:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>s,metadata:()=>o,toc:()=>p});const o=JSON.parse('{"id":"mapper/object/general","title":"General","description":"Mapping an object to another object is the most common task done by a mapper.","source":"@site/docs/mapper/02-object/00-general.md","sourceDirName":"mapper/02-object","slug":"/mapper/object/general","permalink":"/mapper/object/general","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/02-object/00-general.md","tags":[],"version":"current","sidebarPosition":0,"frontMatter":{"title":"General"},"sidebar":"docs","previous":{"title":"Mapping Object to Object","permalink":"/mapper/object/"},"next":{"title":"Changing the Mapping Behavior with the Map Attribute","permalink":"/mapper/object/map"}}');var r=n(4848),a=n(8453);const s={title:"General"},i=void 0,c={},p=[{value:"How It Works",id:"how-it-works",level:2}];function l(e){const t={code:"code",h2:"h2",p:"p",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["Mapping an object to another object is the most common task done by a mapper.\nInternally, this task is done by ",(0,r.jsx)(t.code,{children:"ObjectToObjectTransformer"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"how-it-works",children:"How It Works"}),"\n",(0,r.jsx)(t.p,{children:"The mapper identifies properties that have the same name on the source and the\ntarget side. It looks at public properties, public getters & setters, and\nconstructor arguments."}),"\n",(0,r.jsx)(t.p,{children:"It gets the existing value on the target side. If it is null, then it\ninstantiates a new target object, populating its constructor arguments by\ntransforming properties of the same name from the source object."}),"\n",(0,r.jsx)(t.p,{children:"Then, it transforms each source property to the target type, and sets them on\nthe target."})]})}function m(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>i});var o=n(6540);const r={},a=o.createContext(r);function s(e){const t=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(a.Provider,{value:t},e.children)}}}]);