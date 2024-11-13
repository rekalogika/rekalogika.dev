"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[4017],{293:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"mapper/object/dynamic-properties","title":"Dynamic Properties & Property Overloading","description":"Dynamic properties are properties that are not explicitly declared in the class","source":"@site/docs/mapper/02-object/05-dynamic-properties.md","sourceDirName":"mapper/02-object","slug":"/mapper/object/dynamic-properties","permalink":"/mapper/object/dynamic-properties","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/02-object/05-dynamic-properties.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"title":"Dynamic Properties & Property Overloading"},"sidebar":"docs","previous":{"title":"Lazy Loading","permalink":"/mapper/object/lazy-loading"},"next":{"title":"Immutable Objects","permalink":"/mapper/object/immutable-objects"}}');var o=s(4848),n=s(8453);const a={title:"Dynamic Properties & Property Overloading"},i=void 0,c={},d=[{value:"Mapper Semantic for Dynamic Properties",id:"mapper-semantic-for-dynamic-properties",level:2},{value:"Classes With Overloading, or <code>__get()</code> and <code>__set()</code> Methods",id:"classes-with-overloading-or-__get-and-__set-methods",level:2}];function l(e){const t={code:"code",h2:"h2",p:"p",...(0,n.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(t.p,{children:["Dynamic properties are properties that are not explicitly declared in the class\ndefinition. Before PHP 8.2, all classes have dynamic properties. After PHP 8.2,\nonly classes extending ",(0,o.jsx)(t.code,{children:"stdClass"})," and those marked with\n",(0,o.jsx)(t.code,{children:"#[AllowDynamicProperties]"})," have dynamic properties."]}),"\n",(0,o.jsx)(t.h2,{id:"mapper-semantic-for-dynamic-properties",children:"Mapper Semantic for Dynamic Properties"}),"\n",(0,o.jsxs)(t.p,{children:["Mapper supports classes with ",(0,o.jsx)(t.code,{children:"#[AllowDynamicProperties]"}),", including ",(0,o.jsx)(t.code,{children:"stdClass"}),"\nand all classes that extends ",(0,o.jsx)(t.code,{children:"stdClass"}),", with the following semantics."]}),"\n",(0,o.jsxs)(t.p,{children:["If the target is ",(0,o.jsx)(t.code,{children:"stdClass"})," (or an object with ",(0,o.jsx)(t.code,{children:"#[AllowDynamicProperties]"}),"),\nthen all properties of the source will be mapped to the target. If the target\nhas explicit properties, then they will be respected as usual."]}),"\n",(0,o.jsxs)(t.p,{children:["If the source is a ",(0,o.jsx)(t.code,{children:"stdClass"})," (or an object with ",(0,o.jsx)(t.code,{children:"#[AllowDynamicProperties]"}),")\nand the target is a regular object, then the mapping will take place for each\nproperty of the target that has a matching property on the source side."]}),"\n",(0,o.jsxs)(t.p,{children:["If the source is a ",(0,o.jsx)(t.code,{children:"stdClass"})," (or an object with ",(0,o.jsx)(t.code,{children:"#[AllowDynamicProperties]"}),")\nand an argument of the target constructor is mandatory, then Mapper will assume\nthe source value is null."]}),"\n",(0,o.jsxs)(t.h2,{id:"classes-with-overloading-or-__get-and-__set-methods",children:["Classes With Overloading, or ",(0,o.jsx)(t.code,{children:"__get()"})," and ",(0,o.jsx)(t.code,{children:"__set()"})," Methods"]}),"\n",(0,o.jsxs)(t.p,{children:["Classes that use overloading, or have ",(0,o.jsx)(t.code,{children:"__get()"})," and ",(0,o.jsx)(t.code,{children:"__set()"})," methods generally\nwork the same way with Mapper as classes with dynamic properties as above."]}),"\n",(0,o.jsxs)(t.p,{children:["You can throw ",(0,o.jsx)(t.code,{children:"BadMethodCallException"})," in your ",(0,o.jsx)(t.code,{children:"__get()"})," and ",(0,o.jsx)(t.code,{children:"__set()"})," methods\nif you want to indicate that the property being accessed does not exist."]})]})}function p(e={}){const{wrapper:t}={...(0,n.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>i});var r=s(6540);const o={},n=r.createContext(o);function a(e){const t=r.useContext(n);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),r.createElement(n.Provider,{value:t},e.children)}}}]);