"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[7765],{968:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>b,frontMatter:()=>s,metadata:()=>u,toc:()=>d});var r=t(4848),i=t(8453),o=t(1470),a=t(9365);const s={title:"Referencing a Collection of Subresources"},l=void 0,u={id:"api-lite/subresource/referencing-collection-subresource",title:"Referencing a Collection of Subresources",description:"Using a Collection of IRIs",source:"@site/docs/api-lite/53-subresource/62-referencing-collection-subresource.md",sourceDirName:"api-lite/53-subresource",slug:"/api-lite/subresource/referencing-collection-subresource",permalink:"/api-lite/subresource/referencing-collection-subresource",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/api-lite/53-subresource/62-referencing-collection-subresource.md",tags:[],version:"current",sidebarPosition:62,frontMatter:{title:"Referencing a Collection of Subresources"},sidebar:"docs",previous:{title:"GET Collection Endpoint for Subresources",permalink:"/api-lite/subresource/get-collection-subresource"},next:{title:"GET Endpoint for a Subresource",permalink:"/api-lite/subresource/get-subresource"}},c={},d=[{value:"Using a Collection of IRIs",id:"using-a-collection-of-iris",level:2},{value:"Using a Collection of Embedded Resources",id:"using-a-collection-of-embedded-resources",level:2},{value:"Using the IRI of the Collection",id:"using-the-iri-of-the-collection",level:2}];function p(e){const n={code:"code",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"using-a-collection-of-iris",children:"Using a Collection of IRIs"}),"\n",(0,r.jsxs)(n.p,{children:["By default, API Platform will use a collection of the IRI of the subresource\nobjects. But, if you want this style, we recommend setting it explicitly using\n",(0,r.jsx)(n.code,{children:"#[ApiProperty(readableLink: false)]"}),"."]}),"\n",(0,r.jsxs)(o.A,{queryString:"tab",groupId:"collection-subresource",children:[(0,r.jsx)(a.A,{value:"output",label:"Output",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n    "@context": "/contexts/User/Book",\n    "@id": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54",\n    "@type": "User/Book",\n    "id": "018dda4b-19be-7ad3-9eb4-b56e253e9c54",\n    "title": "Some Book",\n    "description": "Eligendi sunt explicabo quae qui omnis expedita et. Et incidunt earum recusandae itaque recusandae. Ipsam id id qui.",\n    // highlight-start\n    "reviews": [\n        "/user/reviews/018dda4b-19a5-7ac7-824d-caa21760643a",\n        "/user/reviews/018dda4b-19a7-716a-94e0-2d6704a564d5",\n        "/user/reviews/018dda4b-19aa-7336-af9b-dbaf19d7e744",\n    ]\n    // highlight-end\n}\n'})})}),(0,r.jsx)(a.A,{value:"apiresource",label:"API Resource",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",metastring:'title="src/ApiResource/User/BookDto.php"',children:"namespace App\\ApiResource\\User;\n\nuse ApiPlatform\\Metadata\\ApiProperty;\nuse ApiPlatform\\Metadata\\ApiResource;\n\n#[ApiResource(\n    // ...\n)]\nclass BookDto\n{\n    public ?Uuid $id = null;\n    public ?string $title = null;\n    public ?string $description = null;\n\n    /**\n     * @var ?CollectionInterface<int,ReviewDto>\n     */\n    // highlight-next-line\n    #[ApiProperty(readableLink: false)]\n    public ?CollectionInterface $reviews = null;}\n"})})})]}),"\n",(0,r.jsx)(n.h2,{id:"using-a-collection-of-embedded-resources",children:"Using a Collection of Embedded Resources"}),"\n",(0,r.jsxs)(o.A,{queryString:"tab",groupId:"collection-subresource",children:[(0,r.jsx)(a.A,{value:"output",label:"Output",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n    "@context": "/contexts/User/Book",\n    "@id": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54",\n    "@type": "User/Book",\n    "id": "018dda4b-19be-7ad3-9eb4-b56e253e9c54",\n    "title": "Some Book",\n    "description": "Eligendi sunt explicabo quae qui omnis expedita et. Et incidunt earum recusandae itaque recusandae. Ipsam id id qui.",\n    // highlight-start\n    "reviews": [\n        {\n            "@id": "/user/reviews/018dda4b-19a5-7ac7-824d-caa21760643a",\n            "@type": "User/Review",\n            "id": "018dda4b-19a5-7ac7-824d-caa21760643a",\n            "body": "Ut esse esse ea qui. Placeat esse deleniti et est. Deserunt est architecto et et.",\n            "rating": 3,\n            "book": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54"\n        },\n        // ...\n    ]\n    // highlight-end\n}\n'})})}),(0,r.jsx)(a.A,{value:"apiresource",label:"API Resource",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",metastring:'title="src/ApiResource/User/BookDto.php"',children:"namespace App\\ApiResource\\User;\n\nuse ApiPlatform\\Metadata\\ApiProperty;\nuse ApiPlatform\\Metadata\\ApiResource;\n\n#[ApiResource(\n    // ...\n)]\nclass BookDto\n{\n    public ?Uuid $id = null;\n    public ?string $title = null;\n    public ?string $description = null;\n\n    /**\n     * @var ?CollectionInterface<int,ReviewDto>\n     */\n    // highlight-next-line\n    #[ApiProperty(readableLink: true)]\n    public ?CollectionInterface $reviews = null;}\n"})})})]}),"\n",(0,r.jsx)(n.h2,{id:"using-the-iri-of-the-collection",children:"Using the IRI of the Collection"}),"\n",(0,r.jsx)(n.p,{children:"If your resource has a lot of subresources, you might want to change it to use\nthe IRI of the collection instead."}),"\n",(0,r.jsxs)(o.A,{queryString:"tab",groupId:"collection-subresource",children:[(0,r.jsx)(a.A,{value:"output",label:"Output",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",children:'{\n    "@context": "/contexts/User/Book",\n    "@id": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54",\n    "@type": "User/Book",\n    "id": "018dda4b-19be-7ad3-9eb4-b56e253e9c54",\n    "title": "Some Book",\n    "description": "Eligendi sunt explicabo quae qui omnis expedita et. Et incidunt earum recusandae itaque recusandae. Ipsam id id qui.",\n    // highlight-next-line\n    "reviews": "/user/books/018dda4b-19be-7ad3-9eb4-b56e253e9c54/reviews"\n}\n'})})}),(0,r.jsx)(a.A,{value:"apiresource",label:"API Resource",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",metastring:'title="src/ApiResource/User/BookDto.php"',children:"namespace App\\ApiResource\\User;\n\nuse ApiPlatform\\Metadata\\ApiProperty;\nuse ApiPlatform\\Metadata\\ApiResource;\n\n#[ApiResource(\n    // ...\n)]\nclass BookDto\n{\n    public ?Uuid $id = null;\n    public ?string $title = null;\n    public ?string $description = null;\n\n    /**\n     * @var ?CollectionInterface<int,ReviewDto>\n     */\n    // highlight-next-line\n    #[ApiProperty(uriTemplate: '/books/{bookId}/reviews')]\n    public ?CollectionInterface $reviews = null;\n}\n"})})})]})]})}function b(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>a});t(6540);var r=t(4164);const i={tabItem:"tabItem_Ymn6"};var o=t(4848);function a(e){let{children:n,hidden:t,className:a}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.A)(i.tabItem,a),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>I});var r=t(6540),i=t(4164),o=t(3104),a=t(6347),s=t(205),l=t(7485),u=t(1682),c=t(679);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:i}}=e;return{value:n,label:t,attributes:r,default:i}}))}(t);return function(e){const n=(0,u.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function b(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function h(e){let{queryString:n=!1,groupId:t}=e;const i=(0,a.W6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l.aZ)(o),(0,r.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(i.location.search);n.set(o,e),i.replace({...i.location,search:n.toString()})}),[o,i])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:i}=e,o=p(e),[a,l]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!b({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:o}))),[u,d]=h({queryString:t,groupId:i}),[f,g]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,o]=(0,c.Dv)(t);return[i,(0,r.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:i}),m=(()=>{const e=u??f;return b({value:e,tabValues:o})?e:null})();(0,s.A)((()=>{m&&l(m)}),[m]);return{selectedValue:a,selectValue:(0,r.useCallback)((e=>{if(!b({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),g(e)}),[d,g,o]),tabValues:o}}var g=t(2303);const m={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var v=t(4848);function x(e){let{className:n,block:t,selectedValue:r,selectValue:a,tabValues:s}=e;const l=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.a_)(),c=e=>{const n=e.currentTarget,t=l.indexOf(n),i=s[t].value;i!==r&&(u(n),a(i))},d=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,v.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.A)("tabs",{"tabs--block":t},n),children:s.map((e=>{let{value:n,label:t,attributes:o}=e;return(0,v.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>l.push(e),onKeyDown:d,onClick:c,...o,className:(0,i.A)("tabs__item",m.tabItem,o?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function A(e){let{lazy:n,children:t,selectedValue:o}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:(0,i.A)("margin-top--md",e.props.className)}):null}return(0,v.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==o})))})}function k(e){const n=f(e);return(0,v.jsxs)("div",{className:(0,i.A)("tabs-container",m.tabList),children:[(0,v.jsx)(x,{...n,...e}),(0,v.jsx)(A,{...n,...e})]})}function I(e){const n=(0,g.A)();return(0,v.jsx)(k,{...e,children:d(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>s});var r=t(6540);const i={},o=r.createContext(i);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);