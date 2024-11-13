"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[743],{6484:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>i});const r=JSON.parse('{"id":"mapper/object/extra-target-values","title":"Extra Target Values","description":"Mapper will map the properties of the source object to that of the target","source":"@site/docs/mapper/02-object/07-extra-target-values.md","sourceDirName":"mapper/02-object","slug":"/mapper/object/extra-target-values","permalink":"/mapper/object/extra-target-values","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/02-object/07-extra-target-values.md","tags":[],"version":"current","sidebarPosition":7,"frontMatter":{"title":"Extra Target Values"},"sidebar":"docs","previous":{"title":"Immutable Objects","permalink":"/mapper/object/immutable-objects"},"next":{"title":"Mapping Arrays & Array-Like Objects","permalink":"/mapper/collection"}}');var n=a(4848),o=a(8453);const s={title:"Extra Target Values"},c=void 0,p={},i=[];function l(e){const t={code:"code",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["Mapper will map the properties of the source object to that of the target\nobject. However, there might be times when you need to set additional values to\nthe target object that are not present in the source object. You can specify\nthese additional values using the ",(0,n.jsx)(t.code,{children:"ExtraTargetValues"})," context object."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Context\\ExtraTargetValues;\nuse Rekalogika\\Mapper\\Context\\Context;\nuse Rekalogika\\Mapper\\MapperInterface;\n\n/** @var MapperInterface $mapper */\n\n$target = $mapper->map(\n    source: new SomeObject(),\n    target: SomeObjectDto::class,\n    context: Context::create(\n        new ExtraTargetValues([\n            SomeObjectDto::class => [\n                'date' => new \\DateTimeImmutable('2021-01-01'),\n            ],\n        ]),\n    ),\n);\n"})}),"\n",(0,n.jsxs)(t.p,{children:["In the example above, the ",(0,n.jsx)(t.code,{children:"date"})," property of the ",(0,n.jsx)(t.code,{children:"SomeObjectDto"})," class will be\nset to ",(0,n.jsx)(t.code,{children:"2021-01-01"}),". The value will be set on the target object using the same\nmechanism as the normal mapping process, including on constructor arguments,\nsetters, and public properties."]})]})}function u(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},8453:(e,t,a)=>{a.d(t,{R:()=>s,x:()=>c});var r=a(6540);const n={},o=r.createContext(n);function s(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);