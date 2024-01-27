"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[2749],{7857:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var n=a(5893),s=a(1151);const r={title:"Mapping to Abstract Classes and Interfaces"},c=void 0,o={id:"mapper/inheritance",title:"Mapping to Abstract Classes and Interfaces",description:"To map to an abstract class or an interface, you need to add the attribute",source:"@site/docs/mapper/03-inheritance.md",sourceDirName:"mapper",slug:"/mapper/inheritance",permalink:"/mapper/inheritance",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/03-inheritance.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Mapping to Abstract Classes and Interfaces"},sidebar:"docs",previous:{title:"Mapping Arrays & Array-Like Objects",permalink:"/mapper/collection"},next:{title:"Mapping Between Object and Array",permalink:"/mapper/object-array"}},i={},p=[];function l(e){const t={code:"code",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["To map to an abstract class or an interface, you need to add the attribute\n",(0,n.jsx)(t.code,{children:"InheritanceMap"})," to the abstract class or interface. For example:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Attribute\\InheritanceMap;\nuse Rekalogika\\Mapper\\Tests\\Fixtures\\Inheritance\\ConcreteClassA;\nuse Rekalogika\\Mapper\\Tests\\Fixtures\\Inheritance\\ConcreteClassB;\n\n#[InheritanceMap([\n    ConcreteClassA::class => ConcreteClassADto::class,\n    ConcreteClassB::class => ConcreteClassBDto::class,\n    ConcreteClassB::class => ConcreteClassCDto::class,\n])]\nabstract class AbstractClassDto\n{\n}\n"})}),"\n",(0,n.jsxs)(t.p,{children:["In the above example, the mapper will map the source to ",(0,n.jsx)(t.code,{children:"ConcreteClassADto"})," if\nthe source is an instance of ",(0,n.jsx)(t.code,{children:"ConcreteClassA"}),", and so on."]})]})}function d(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,t,a)=>{a.d(t,{Z:()=>o,a:()=>c});var n=a(7294);const s={},r=n.createContext(s);function c(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);