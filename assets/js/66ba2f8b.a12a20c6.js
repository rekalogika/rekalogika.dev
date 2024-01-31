"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[1624],{1296:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>d});var r=t(5893),a=t(1151),o=t(4866),s=t(5162);const l={title:"Introduction & Installation"},i=void 0,c={id:"mapper/intro",title:"Introduction & Installation",description:"rekalogika/mapper is an object mapper for PHP and Symfony, also commonly known",source:"@site/docs/mapper/00-intro.md",sourceDirName:"mapper",slug:"/mapper/intro",permalink:"/mapper/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/00-intro.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{title:"Introduction & Installation"},sidebar:"docs",previous:{title:"rekalogika/mapper",permalink:"/mapper/"},next:{title:"Basic Usage",permalink:"/mapper/usage"}},u={},d=[{value:"Synopsis",id:"synopsis",level:2},{value:"Features",id:"features",level:2},{value:"Future Features",id:"future-features",level:2},{value:"Installation",id:"installation",level:2},{value:"License",id:"license",level:2},{value:"Contributing",id:"contributing",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"rekalogika/mapper"})," is an object mapper for PHP and Symfony, also commonly known\nas an automapper. It maps an object to another object. It removes a lot of the\nrepetitive code you would normally have to write to map an object to another\nobject."]}),"\n",(0,r.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"use App\\Entity\\Book;\nuse Rekalogika\\Mapper\\MapperInterface;\n\n/** @var MapperInterface $mapper */\n/** @var Book $book */\n\n$result = $mapper->map($book, BookDto::class);\n\n// or map to an existing object\n\n$bookDto = new BookDto();\n$mapper->map($book, $bookDto);\n"})}),"\n",(0,r.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Automatically lists the properties of the source and target, detects their\ntypes, and maps them accordingly."}),"\n",(0,r.jsx)(n.li,{children:"By default, does not attempt to circumvent your class constraints. Reads only\nfrom and writes only to public properties, getters, setters. Does not\ninstantiate objects without their constructor."}),"\n",(0,r.jsx)(n.li,{children:"Override the mapping logic using a custom property mapper."}),"\n",(0,r.jsx)(n.li,{children:"Constructor initialization."}),"\n",(0,r.jsx)(n.li,{children:"Handles nested objects."}),"\n",(0,r.jsx)(n.li,{children:"Handles recursion and circular references."}),"\n",(0,r.jsx)(n.li,{children:"Inheritance support. Maps to abstract classes and interfaces using an\ninheritance map attribute."}),"\n",(0,r.jsx)(n.li,{children:"Reads the type from PHP type declaration and PHPDoc annotations, including\nthe type of the nested objects."}),"\n",(0,r.jsxs)(n.li,{children:["Handles ",(0,r.jsx)(n.code,{children:"array"}),", ",(0,r.jsx)(n.code,{children:"ArrayAccess"})," and ",(0,r.jsx)(n.code,{children:"Traversable"})," objects, and the mapping\nbetween them."]}),"\n",(0,r.jsxs)(n.li,{children:["Handles non-string & non-integer keys in array-like objects, like\n",(0,r.jsx)(n.code,{children:"SplObjectStorage"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["Lazy stream mapping if the target is type-hinted as ",(0,r.jsx)(n.code,{children:"Traversable"}),". Consumes\nless memory & avoids hydrating a Doctrine collection prematurely."]}),"\n",(0,r.jsxs)(n.li,{children:["In addition, when the target is ",(0,r.jsx)(n.code,{children:"Traversable"})," and the source is a ",(0,r.jsx)(n.code,{children:"Countable"}),",\nthen the target will also be a ",(0,r.jsx)(n.code,{children:"Countable"}),". With an extra-lazy Doctrine\nCollection, the consumer will be able to count the target without causing a\nfull hydration of the source."]}),"\n",(0,r.jsx)(n.li,{children:"Manual mapping using a class method."}),"\n",(0,r.jsx)(n.li,{children:"Easy to extend by creating new transformers, or decorating the existing ones."}),"\n",(0,r.jsx)(n.li,{children:"Match classes using attributes in your transformers, in addition to using\nclass names."}),"\n",(0,r.jsx)(n.li,{children:"Helpful exception messages."}),"\n",(0,r.jsx)(n.li,{children:"Console commands for debugging."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"future-features",children:"Future Features"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Option to read & write to private properties."}),"\n",(0,r.jsxs)(n.li,{children:["Option to inject ",(0,r.jsx)(n.code,{children:"Context"})," and ",(0,r.jsx)(n.code,{children:"MainTransformer"})," to a property mapper."]}),"\n",(0,r.jsx)(n.li,{children:"Data collector and profiler integration."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsxs)(n.p,{children:["Make sure Composer is installed globally, as explained in the\n",(0,r.jsx)(n.a,{href:"https://getcomposer.org/doc/00-intro.md",children:"installation chapter"}),"\nof the Composer documentation."]}),"\n",(0,r.jsxs)(o.Z,{children:[(0,r.jsxs)(s.Z,{value:"flex",label:"With Symfony Flex",children:[(0,r.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute:"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/mapper\n"})})]}),(0,r.jsxs)(s.Z,{value:"noflex",label:"Without Symfony Flex",children:[(0,r.jsx)(n.p,{children:"Step 1: Download the Bundle"}),(0,r.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute the\nfollowing command to download the latest stable version of this bundle:"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/mapper\n"})}),(0,r.jsx)(n.p,{children:"Step 2: Enable the Bundle"}),(0,r.jsxs)(n.p,{children:["Then, enable the bundle by adding it to the list of registered bundles\nin the ",(0,r.jsx)(n.code,{children:"config/bundles.php"})," file of your project:"]}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",metastring:"title=config/bundles.php",children:"return [\n    // ...\n    Rekalogika\\Mapper\\RekalogikaMapperBundle::class => ['all' => true],\n];\n"})})]}),(0,r.jsxs)(s.Z,{value:"nonsymfony",label:"Non-Symfony Projects",children:[(0,r.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute:"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/mapper\n"})}),(0,r.jsx)(n.admonition,{type:"warning",children:(0,r.jsx)(n.p,{children:"Many parts of this documentation assume you are using Symfony, and will need\nto be done differently in non-Symfony projects."})})]})]}),"\n",(0,r.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,r.jsx)(n.p,{children:"MIT"}),"\n",(0,r.jsx)(n.h2,{id:"contributing",children:"Contributing"}),"\n",(0,r.jsxs)(n.p,{children:["Issues and pull requests should be filed in the GitHub repository\n",(0,r.jsx)(n.a,{href:"https://github.com/rekalogika/mapper",children:"rekalogika/mapper"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},5162:(e,n,t)=>{t.d(n,{Z:()=>s});t(7294);var r=t(6905);const a={tabItem:"tabItem_Ymn6"};var o=t(5893);function s(e){let{children:n,hidden:t,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(a.tabItem,s),hidden:t,children:n})}},4866:(e,n,t)=>{t.d(n,{Z:()=>k});var r=t(7294),a=t(6905),o=t(2466),s=t(6550),l=t(469),i=t(1980),c=t(7392),u=t(12);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:a}}=e;return{value:n,label:t,attributes:r,default:a}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function h(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const a=(0,s.k6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i._X)(o),(0,r.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(a.location.search);n.set(o,e),a.replace({...a.location,search:n.toString()})}),[o,a])]}function b(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,o=p(e),[s,i]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:o}))),[c,d]=m({queryString:t,groupId:a}),[b,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,o]=(0,u.Nk)(t);return[a,(0,r.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:a}),g=(()=>{const e=c??b;return h({value:e,tabValues:o})?e:null})();(0,l.Z)((()=>{g&&i(g)}),[g]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),d(e),f(e)}),[d,f,o]),tabValues:o}}var f=t(2389);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=t(5893);function j(e){let{className:n,block:t,selectedValue:r,selectValue:s,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),u=e=>{const n=e.currentTarget,t=i.indexOf(n),a=l[t].value;a!==r&&(c(n),s(a))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;n=i[t]??i[0];break}case"ArrowLeft":{const t=i.indexOf(e.currentTarget)-1;n=i[t]??i[i.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":t},n),children:l.map((e=>{let{value:n,label:t,attributes:o}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>i.push(e),onKeyDown:d,onClick:u,...o,className:(0,a.Z)("tabs__item",g.tabItem,o?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function y(e){let{lazy:n,children:t,selectedValue:a}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==a})))})}function v(e){const n=b(e);return(0,x.jsxs)("div",{className:(0,a.Z)("tabs-container",g.tabList),children:[(0,x.jsx)(j,{...e,...n}),(0,x.jsx)(y,{...e,...n})]})}function k(e){const n=(0,f.Z)();return(0,x.jsx)(v,{...e,children:d(e.children)},String(n))}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>s});var r=t(7294);const a={},o=r.createContext(a);function s(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);