"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[3173],{9945:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>b,frontMatter:()=>l,metadata:()=>o,toc:()=>p});const o=JSON.parse('{"id":"api-lite/basic-endpoints/get-collection","title":"GET Collection Endpoint","description":"","source":"@site/docs/api-lite/52-basic-endpoints/51-get-collection.md","sourceDirName":"api-lite/52-basic-endpoints","slug":"/api-lite/basic-endpoints/get-collection","permalink":"/api-lite/basic-endpoints/get-collection","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/api-lite/52-basic-endpoints/51-get-collection.md","tags":[],"version":"current","sidebarPosition":51,"frontMatter":{"title":"GET Collection Endpoint"},"sidebar":"docs","previous":{"title":"Objects Used in the Examples","permalink":"/api-lite/basic-endpoints/objects"},"next":{"title":"GET Endpoint","permalink":"/api-lite/basic-endpoints/get"}}');var r=n(4848),a=n(8453),i=n(1470),s=n(9365);const l={title:"GET Collection Endpoint"},c=void 0,u={},p=[];function d(e){const t={code:"code",pre:"pre",...(0,a.R)(),...e.components};return(0,r.jsxs)(i.A,{queryString:"tab",groupId:"api",children:[(0,r.jsx)(s.A,{value:"apiresource",label:"API Resource",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",metastring:'title="src/ApiResource/Admin/BookDto.php"',children:"namespace App\\ApiResource\\Admin;\n\nuse ApiPlatform\\Metadata\\ApiResource;\nuse ApiPlatform\\Metadata\\GetCollection;\nuse App\\ApiState\\Admin\\Book\\BookCollectionProvider;\n\n#[ApiResource(\n    shortName: 'Admin/Book',\n    routePrefix: '/admin',\n    // // Uncomment the following to enable keyset-pagination:\n    // extraProperties: [\n    //     'api_lite_rekapager' => true\n    // ]\n    operations: [\n        // ...\n        new GetCollection(\n            uriTemplate: '/books',\n            provider: BookCollectionProvider::class,\n        ),\n        // ...\n    ]\n)]\nclass BookDto\n{\n    // ...\n}\n\n"})})}),(0,r.jsx)(s.A,{value:"stateprovider",label:"State Provider",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",metastring:'title="src/ApiState/Admin/Book/BookCollectionProvider.php"',children:"namespace App\\ApiState\\Admin\\Book;\n\nuse ApiPlatform\\Metadata\\Operation;\nuse App\\ApiResource\\Admin\\BookDto;\nuse App\\Repository\\BookRepository;\nuse Rekalogika\\ApiLite\\State\\AbstractProvider;\n\n/**\n * @extends AbstractProvider<BookDto>\n */\nclass BookCollectionProvider extends AbstractProvider\n{\n    public function __construct(\n        private BookRepository $bookRepository\n    ) {\n    }\n\n    public function provide(\n        Operation $operation,\n        array $uriVariables = [],\n        array $context = []\n    ): object|array|null {\n        // Check for authorization\n        $this->denyAccessUnlessGranted('view', $this->bookRepository);\n\n        // A Doctrine repository implements Selectable, and our PaginatorApplier\n        // supports Selectable, so we can convieniently use it as a collection\n        // of entities to map. Here we map the Books to BookDtos, and return\n        // them.\n        return $this->mapCollection(\n            collection: $this->bookRepository,\n            target: BookDto::class,\n            operation: $operation,\n            context: $context\n        );\n    }\n}\n"})})})]})}function b(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},9365:(e,t,n)=>{n.d(t,{A:()=>i});n(6540);var o=n(4164);const r={tabItem:"tabItem_Ymn6"};var a=n(4848);function i(e){let{children:t,hidden:n,className:i}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,o.A)(r.tabItem,i),hidden:n,children:t})}},1470:(e,t,n)=>{n.d(t,{A:()=>x});var o=n(6540),r=n(4164),a=n(3104),i=n(6347),s=n(205),l=n(7485),c=n(1682),u=n(679);function p(e){return o.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,o.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function d(e){const{values:t,children:n}=e;return(0,o.useMemo)((()=>{const e=t??function(e){return p(e).map((e=>{let{props:{value:t,label:n,attributes:o,default:r}}=e;return{value:t,label:n,attributes:o,default:r}}))}(n);return function(e){const t=(0,c.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function b(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:n}=e;const r=(0,i.W6)(),a=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l.aZ)(a),(0,o.useCallback)((e=>{if(!a)return;const t=new URLSearchParams(r.location.search);t.set(a,e),r.replace({...r.location,search:t.toString()})}),[a,r])]}function f(e){const{defaultValue:t,queryString:n=!1,groupId:r}=e,a=d(e),[i,l]=(0,o.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!b({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const o=n.find((e=>e.default))??n[0];if(!o)throw new Error("Unexpected error: 0 tabValues");return o.value}({defaultValue:t,tabValues:a}))),[c,p]=m({queryString:n,groupId:r}),[f,h]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[r,a]=(0,u.Dv)(n);return[r,(0,o.useCallback)((e=>{n&&a.set(e)}),[n,a])]}({groupId:r}),v=(()=>{const e=c??f;return b({value:e,tabValues:a})?e:null})();(0,s.A)((()=>{v&&l(v)}),[v]);return{selectedValue:i,selectValue:(0,o.useCallback)((e=>{if(!b({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);l(e),p(e),h(e)}),[p,h,a]),tabValues:a}}var h=n(2303);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=n(4848);function k(e){let{className:t,block:n,selectedValue:o,selectValue:i,tabValues:s}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,a.a_)(),u=e=>{const t=e.currentTarget,n=l.indexOf(t),r=s[n].value;r!==o&&(c(t),i(r))},p=e=>{let t=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":n},t),children:s.map((e=>{let{value:t,label:n,attributes:a}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:o===t?0:-1,"aria-selected":o===t,ref:e=>l.push(e),onKeyDown:p,onClick:u,...a,className:(0,r.A)("tabs__item",v.tabItem,a?.className,{"tabs__item--active":o===t}),children:n??t},t)}))})}function A(e){let{lazy:t,children:n,selectedValue:a}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===a));return e?(0,o.cloneElement)(e,{className:(0,r.A)("margin-top--md",e.props.className)}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:i.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function y(e){const t=f(e);return(0,g.jsxs)("div",{className:(0,r.A)("tabs-container",v.tabList),children:[(0,g.jsx)(k,{...t,...e}),(0,g.jsx)(A,{...t,...e})]})}function x(e){const t=(0,h.A)();return(0,g.jsx)(y,{...e,children:p(e.children)},String(t))}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>s});var o=n(6540);const r={},a=o.createContext(r);function i(e){const t=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),o.createElement(a.Provider,{value:t},e.children)}}}]);