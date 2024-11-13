"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[5727],{8135:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>d});const r=JSON.parse('{"id":"psr-16-simple-cache-bundle/index","title":"rekalogika/psr-16-simple-cache-bundle","description":"Enables PSR-16 Simple Cache services in Symfony projects. These were previously","source":"@site/docs/psr-16-simple-cache-bundle/index.md","sourceDirName":"psr-16-simple-cache-bundle","slug":"/psr-16-simple-cache-bundle/","permalink":"/psr-16-simple-cache-bundle/","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/psr-16-simple-cache-bundle/index.md","tags":[],"version":"current","frontMatter":{"title":"rekalogika/psr-16-simple-cache-bundle"},"sidebar":"docs","previous":{"title":"Rationale, or Why Create Another Mapper?","permalink":"/mapper/rationale"},"next":{"title":"rekalogika/reconstitutor","permalink":"/reconstitutor/"}}');var a=t(4848),l=t(8453),s=t(1470),i=t(9365);const o={title:"rekalogika/psr-16-simple-cache-bundle"},c=void 0,u={},d=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Rationale",id:"rationale",level:2},{value:"Credits",id:"credits",level:2},{value:"License",id:"license",level:2},{value:"Contributing",id:"contributing",level:2}];function h(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"Enables PSR-16 Simple Cache services in Symfony projects. These were previously\nenabled in the older Symfony version but were removed in 4.3."}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsxs)(n.p,{children:["Make sure Composer is installed globally, as explained in the\n",(0,a.jsx)(n.a,{href:"https://getcomposer.org/doc/00-intro.md",children:"installation chapter"}),"\nof the Composer documentation."]}),"\n",(0,a.jsxs)(s.A,{children:[(0,a.jsxs)(i.A,{value:"flex",label:"With Symfony Flex",children:[(0,a.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/psr-16-simple-cache-bundle\n"})})]}),(0,a.jsxs)(i.A,{value:"noflex",label:"Without Symfony Flex",children:[(0,a.jsx)(n.p,{children:"Step 1: Download the Bundle"}),(0,a.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute the\nfollowing command to download the latest stable version of this bundle:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/psr-16-simple-cache-bundle\n"})}),(0,a.jsx)(n.p,{children:"Step 2: Enable the Bundle"}),(0,a.jsxs)(n.p,{children:["Then, enable the bundle by adding it to the list of registered bundles\nin the ",(0,a.jsx)(n.code,{children:"config/bundles.php"})," file of your project:"]}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",metastring:'title="config/bundles.php"',children:"return [\n    // ...\n    Rekalogika\\Psr16SimpleCacheBundle\\RekalogikaPsr16SimpleCacheBundle::class => ['all' => true],\n];\n"})})]})]}),"\n",(0,a.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsxs)(n.p,{children:["Callers can simply wire in ",(0,a.jsx)(n.code,{children:"Psr\\SimpleCache\\CacheInterface"}),". The service uses\nthe same underlying pool used by Symfony's ",(0,a.jsx)(n.code,{children:"CacheInterface"}),"."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Psr\\SimpleCache\\CacheInterface;\n\nclass SomeService\n{\n    public function __construct(private CacheInterface $cache)\n    {\n    }\n\n    public function doSomething()\n    {\n        $this->cache->set('foo', 'bar');\n    }\n}\n"})}),"\n",(0,a.jsx)(n.h2,{id:"rationale",children:"Rationale"}),"\n",(0,a.jsx)(n.p,{children:"We are using PSR-16 mostly as an expiring key-value storage. While PSR-6 and\nSymfony's CacheInterface are more powerful and easier to use for caching things,\nwe don't feel their interfaces are suitable for key-value storage."}),"\n",(0,a.jsx)(n.h2,{id:"credits",children:"Credits"}),"\n",(0,a.jsx)(n.p,{children:"This package is just a service definition. The actual implementation is done by\nthe Symfony project; they just don't make the service available by default."}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://symfony.com/doc/current/components/cache/psr6_psr16_adapters.html",children:"Adapters For Interoperability between PSR-6 and PSR-16 Cache"})}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://github.com/symfony/symfony/issues/28918#issuecomment-433489302",children:"Service definition by Tobion"})}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,a.jsx)(n.p,{children:"MIT"}),"\n",(0,a.jsx)(n.h2,{id:"contributing",children:"Contributing"}),"\n",(0,a.jsxs)(n.p,{children:["Issues and pull requests should be filed in the GitHub repository\n",(0,a.jsx)(n.a,{href:"https://github.com/rekalogika/psr-16-simple-cache-bundle",children:"rekalogika/psr-16-simple-cache-bundle"}),"."]})]})}function p(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>s});t(6540);var r=t(4164);const a={tabItem:"tabItem_Ymn6"};var l=t(4848);function s(e){let{children:n,hidden:t,className:s}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,r.A)(a.tabItem,s),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>k});var r=t(6540),a=t(4164),l=t(3104),s=t(6347),i=t(205),o=t(7485),c=t(1682),u=t(679);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:a}}=e;return{value:n,label:t,attributes:r,default:a}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const a=(0,s.W6)(),l=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,o.aZ)(l),(0,r.useCallback)((e=>{if(!l)return;const n=new URLSearchParams(a.location.search);n.set(l,e),a.replace({...a.location,search:n.toString()})}),[l,a])]}function b(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,l=h(e),[s,o]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:l}))),[c,d]=m({queryString:t,groupId:a}),[b,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,l]=(0,u.Dv)(t);return[a,(0,r.useCallback)((e=>{t&&l.set(e)}),[t,l])]}({groupId:a}),g=(()=>{const e=c??b;return p({value:e,tabValues:l})?e:null})();(0,i.A)((()=>{g&&o(g)}),[g]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);o(e),d(e),f(e)}),[d,f,l]),tabValues:l}}var f=t(2303);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=t(4848);function x(e){let{className:n,block:t,selectedValue:r,selectValue:s,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,l.a_)(),u=e=>{const n=e.currentTarget,t=o.indexOf(n),a=i[t].value;a!==r&&(c(n),s(a))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;n=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;n=o[t]??o[o.length-1];break}}n?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:l}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>o.push(e),onKeyDown:d,onClick:u,...l,className:(0,a.A)("tabs__item",g.tabItem,l?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function y(e){let{lazy:n,children:t,selectedValue:l}=e;const s=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===l));return e?(0,r.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==l})))})}function j(e){const n=b(e);return(0,v.jsxs)("div",{className:(0,a.A)("tabs-container",g.tabList),children:[(0,v.jsx)(x,{...n,...e}),(0,v.jsx)(y,{...n,...e})]})}function k(e){const n=(0,f.A)();return(0,v.jsx)(j,{...e,children:d(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>i});var r=t(6540);const a={},l=r.createContext(a);function s(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);