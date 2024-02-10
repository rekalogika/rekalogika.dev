"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[6773],{9041:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>i,default:()=>h,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var a=t(5893),r=t(1151),o=t(4866),s=t(5162);const l={title:"Installation & Basic Usage"},i=void 0,c={id:"mapper/installation-usage",title:"Installation & Basic Usage",description:"Install and use the mapper.",source:"@site/docs/mapper/01-installation-usage.md",sourceDirName:"mapper",slug:"/mapper/installation-usage",permalink:"/mapper/installation-usage",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/01-installation-usage.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Installation & Basic Usage"},sidebar:"docs",previous:{title:"Introduction",permalink:"/mapper/intro"},next:{title:"Mapping Object to Object",permalink:"/mapper/object"}},u={},p=[{value:"Installation",id:"installation",level:2},{value:"Getting the Mapper Service",id:"getting-the-mapper-service",level:2},{value:"Usage",id:"usage",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"Install and use the mapper."}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsxs)(n.p,{children:["Make sure Composer is installed globally, as explained in the\n",(0,a.jsx)(n.a,{href:"https://getcomposer.org/doc/00-intro.md",children:"installation chapter"}),"\nof the Composer documentation."]}),"\n",(0,a.jsxs)(o.Z,{children:[(0,a.jsxs)(s.Z,{value:"flex",label:"With Symfony Flex",children:[(0,a.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/mapper\n"})})]}),(0,a.jsxs)(s.Z,{value:"noflex",label:"Without Symfony Flex",children:[(0,a.jsx)(n.p,{children:"Step 1: Download the Bundle"}),(0,a.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute the\nfollowing command to download the latest stable version of this bundle:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/mapper\n"})}),(0,a.jsx)(n.p,{children:"Step 2: Enable the Bundle"}),(0,a.jsxs)(n.p,{children:["Then, enable the bundle by adding it to the list of registered bundles\nin the ",(0,a.jsx)(n.code,{children:"config/bundles.php"})," file of your project:"]}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",metastring:"title=config/bundles.php",children:"return [\n    // ...\n    Rekalogika\\Mapper\\RekalogikaMapperBundle::class => ['all' => true],\n];\n"})})]}),(0,a.jsxs)(s.Z,{value:"nonsymfony",label:"Non-Symfony Projects",children:[(0,a.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/mapper\n"})}),(0,a.jsx)(n.admonition,{type:"warning",children:(0,a.jsx)(n.p,{children:"Many parts of this documentation assume you are using Symfony, and will need\nto be done differently in non-Symfony projects."})})]})]}),"\n",(0,a.jsx)(n.h2,{id:"getting-the-mapper-service",children:"Getting the Mapper Service"}),"\n",(0,a.jsxs)(n.p,{children:["In Symfony projects, you can simply autowire ",(0,a.jsx)(n.code,{children:"MapperInterface"})," to your services\nand controllers just as you would do with any other service."]}),"\n",(0,a.jsxs)(n.p,{children:["In non-Symfony projects, you can use the ",(0,a.jsx)(n.code,{children:"MapperFactory"})," to get the mapper\nservice:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Rekalogika\\Mapper\\MapperFactory;\n\n$mapperFactory = new MapperFactory();\n$mapper = $mapperFactory->getMapper();\n"})}),"\n",(0,a.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsxs)(n.p,{children:["Suppose you have a ",(0,a.jsx)(n.code,{children:"Book"})," entity:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",metastring:'title="src/Entity/Book.php"',children:"namespace App\\Entity;\n\nclass Book\n{\n    public function __construct(\n        private int $id,\n        private string $title,\n        private string $author,\n    ) {\n    }\n\n    public function getId(): ?int\n    {\n        return $this->id;\n    }\n\n    public function getTitle(): ?string\n    {\n        return $this->title;\n    }\n\n    public function getAuthor(): ?string\n    {\n        return $this->author;\n    }\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["And need to map it to the ",(0,a.jsx)(n.code,{children:"BookDto"})," data transfer object:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",metastring:'title="src/Dto/BookDto.php"',children:"namespace App\\Dto;\n\nclass BookDto\n{\n    public string $id;\n    public string $title;\n    public string $author;\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"You can simply do:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use App\\Entity\\Book;\nuse Rekalogika\\Mapper\\MapperInterface;\n\n/** @var MapperInterface $mapper */\n/** @var Book $book */\n\n$result = $mapper->map($book, BookDto::class);\n\n// or map to an existing object\n\n$bookDto = new BookDto();\n$mapper->map($book, $bookDto);\n"})})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},5162:(e,n,t)=>{t.d(n,{Z:()=>s});t(7294);var a=t(6905);const r={tabItem:"tabItem_Ymn6"};var o=t(5893);function s(e){let{children:n,hidden:t,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,a.Z)(r.tabItem,s),hidden:t,children:n})}},4866:(e,n,t)=>{t.d(n,{Z:()=>k});var a=t(7294),r=t(6905),o=t(2466),s=t(6550),l=t(469),i=t(1980),c=t(7392),u=t(12);function p(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function d(e){const{values:n,children:t}=e;return(0,a.useMemo)((()=>{const e=n??function(e){return p(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:r}}=e;return{value:n,label:t,attributes:a,default:r}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function h(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const r=(0,s.k6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,i._X)(o),(0,a.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(r.location.search);n.set(o,e),r.replace({...r.location,search:n.toString()})}),[o,r])]}function g(e){const{defaultValue:n,queryString:t=!1,groupId:r}=e,o=d(e),[s,i]=(0,a.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:o}))),[c,p]=m({queryString:t,groupId:r}),[g,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,o]=(0,u.Nk)(t);return[r,(0,a.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:r}),b=(()=>{const e=c??g;return h({value:e,tabValues:o})?e:null})();(0,l.Z)((()=>{b&&i(b)}),[b]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!h({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);i(e),p(e),f(e)}),[p,f,o]),tabValues:o}}var f=t(2389);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=t(5893);function j(e){let{className:n,block:t,selectedValue:a,selectValue:s,tabValues:l}=e;const i=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),u=e=>{const n=e.currentTarget,t=i.indexOf(n),r=l[t].value;r!==a&&(c(n),s(r))},p=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=i.indexOf(e.currentTarget)+1;n=i[t]??i[0];break}case"ArrowLeft":{const t=i.indexOf(e.currentTarget)-1;n=i[t]??i[i.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":t},n),children:l.map((e=>{let{value:n,label:t,attributes:o}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:a===n?0:-1,"aria-selected":a===n,ref:e=>i.push(e),onKeyDown:p,onClick:u,...o,className:(0,r.Z)("tabs__item",b.tabItem,o?.className,{"tabs__item--active":a===n}),children:t??n},n)}))})}function y(e){let{lazy:n,children:t,selectedValue:r}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===r));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function v(e){const n=g(e);return(0,x.jsxs)("div",{className:(0,r.Z)("tabs-container",b.tabList),children:[(0,x.jsx)(j,{...e,...n}),(0,x.jsx)(y,{...e,...n})]})}function k(e){const n=(0,f.Z)();return(0,x.jsx)(v,{...e,children:p(e.children)},String(n))}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>s});var a=t(7294);const r={},o=a.createContext(r);function s(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);