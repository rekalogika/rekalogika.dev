"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[1403],{3114:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>i,default:()=>p,frontMatter:()=>c,metadata:()=>a,toc:()=>d});var s=n(5893),o=n(1151);const c={title:"AbstractState"},i=void 0,a={id:"api-lite/abstractstate",title:"AbstractState",description:"Base class for our providers and processors.",source:"@site/docs/api-lite/03-abstractstate.md",sourceDirName:"api-lite",slug:"/api-lite/abstractstate",permalink:"/api-lite/abstractstate",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/api-lite/03-abstractstate.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"AbstractState"},sidebar:"docs",previous:{title:"Design Considerations & Decisions",permalink:"/api-lite/design"},next:{title:"Usage Without AbstractState",permalink:"/api-lite/without-abstractstate"}},r={},d=[{value:"<code>map()</code>",id:"map",level:2},{value:"<code>mapCollection()</code>",id:"mapcollection",level:2},{value:"<code>getUser()</code>",id:"getuser",level:2},{value:"<code>isGranted()</code>",id:"isgranted",level:2},{value:"<code>denyAccessUnlessGranted()</code>",id:"denyaccessunlessgranted",level:2},{value:"<code>createAccessDeniedException()</code>",id:"createaccessdeniedexception",level:2},{value:"<code>createNotFoundException()</code>",id:"createnotfoundexception",level:2}];function l(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"Base class for our providers and processors."}),"\n",(0,s.jsxs)(t.p,{children:["This package provides ",(0,s.jsx)(t.code,{children:"AbstractProvider"})," and ",(0,s.jsx)(t.code,{children:"AbstractProcessor"})," to be extended\nby your state providers and processors. They consist of useful methods that are\ncommonly used in the state providers and processors. Some of the methods are\n'stolen' from ",(0,s.jsx)(t.code,{children:"AbstractController"}),", so anyone familiar with Symfony controllers\nshould feel at home."]}),"\n",(0,s.jsx)(t.admonition,{type:"info",children:(0,s.jsxs)(t.p,{children:["If you don't want your state providers and processors to extend ",(0,s.jsx)(t.code,{children:"AbstractState"}),",\nread the ",(0,s.jsx)(t.a,{href:"/api-lite/without-abstractstate",children:"Usage Without AbstractState"})," section."]})}),"\n",(0,s.jsx)(t.h2,{id:"map",children:(0,s.jsx)(t.code,{children:"map()"})}),"\n",(0,s.jsx)(t.p,{children:"Maps an object to another object. Useful for mapping an entity to its API\nresource DTO."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-php",children:"/** @var Book $book */\n\n$bookDto = $this->map($book, BookDto::class);\n\n// also works with an existing object\n\n$bookDto = new BookDto();\n$this->map($book, $bookDto);\n"})}),"\n",(0,s.jsx)(t.h2,{id:"mapcollection",children:(0,s.jsx)(t.code,{children:"mapCollection()"})}),"\n",(0,s.jsxs)(t.p,{children:["Takes a supported collection object, and returns a ",(0,s.jsx)(t.code,{children:"PaginatorInterface"})," with its\nitems mapped to the specified class. It also respects the current page and items\nper page of the endpoint."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-php",children:"/** @var Book $book */\n\n// returns a paginator of `ReviewDto`\nreturn $this->mapCollection(\n    collection: $book->getReviews(),\n    target: BookDto::class,\n    operation: $operation, // operation from the `provide()` method\n    context: $context, // context from the `provide()` method\n);\n"})}),"\n",(0,s.jsxs)(t.p,{children:["If the target is null, ",(0,s.jsx)(t.code,{children:"mapCollection()"})," skips the mapping, it only does the\npagination."]}),"\n",(0,s.jsx)(t.h2,{id:"getuser",children:(0,s.jsx)(t.code,{children:"getUser()"})}),"\n",(0,s.jsx)(t.p,{children:"Returns the current user according to the security system."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-php",children:"$user = $this->getUser();\n"})}),"\n",(0,s.jsx)(t.h2,{id:"isgranted",children:(0,s.jsx)(t.code,{children:"isGranted()"})}),"\n",(0,s.jsx)(t.p,{children:"Checks if the attribute is granted against the current authentication token and\nthe supplied subject."}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-php",children:"if (!$this->isGranted('view', $book)) {\n    throw $this->createAccessDeniedException();\n}\n"})}),"\n",(0,s.jsx)(t.h2,{id:"denyaccessunlessgranted",children:(0,s.jsx)(t.code,{children:"denyAccessUnlessGranted()"})}),"\n",(0,s.jsxs)(t.p,{children:["Throws an ",(0,s.jsx)(t.code,{children:"AccessDeniedException"})," if the attribute is not granted against the\ncurrent authentication token and optionally the supplied subject."]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-php",children:"$this->denyAccessUnlessGranted('view', $book);\n"})}),"\n",(0,s.jsx)(t.h2,{id:"createaccessdeniedexception",children:(0,s.jsx)(t.code,{children:"createAccessDeniedException()"})}),"\n",(0,s.jsxs)(t.p,{children:["Creates an ",(0,s.jsx)(t.code,{children:"AccessDeniedException"}),"."]}),"\n",(0,s.jsx)(t.h2,{id:"createnotfoundexception",children:(0,s.jsx)(t.code,{children:"createNotFoundException()"})}),"\n",(0,s.jsxs)(t.p,{children:["Creates a ",(0,s.jsx)(t.code,{children:"NotFoundException"}),"."]})]})}function p(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>i});var s=n(7294);const o={},c=s.createContext(o);function i(e){const t=s.useContext(c);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(c.Provider,{value:t},e.children)}}}]);