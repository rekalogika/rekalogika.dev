"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[8770],{7780:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>h});const i=JSON.parse('{"id":"api-lite/mapping","title":"Mapping","description":"By separating the entity and the ApiResource DTO, mapping between the two","source":"@site/docs/api-lite/05-mapping.md","sourceDirName":"api-lite","slug":"/api-lite/mapping","permalink":"/api-lite/mapping","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/api-lite/05-mapping.md","tags":[],"version":"current","sidebarPosition":5,"frontMatter":{"title":"Mapping"},"sidebar":"docs","previous":{"title":"Usage Without AbstractState","permalink":"/api-lite/without-abstractstate"},"next":{"title":"Pagination","permalink":"/api-lite/pagination"}}');var o=n(4848),a=n(8453);const r={title:"Mapping"},s=void 0,l={},h=[{value:"When To Use the Mapper and When Not To",id:"when-to-use-the-mapper-and-when-not-to",level:2},{value:"Lazy Loading",id:"lazy-loading",level:2},{value:"Lazy-Loading Collection Example",id:"lazy-loading-collection-example",level:3},{value:"Lazy-Loading Object Example",id:"lazy-loading-object-example",level:3},{value:"The Mapper Remembers...",id:"the-mapper-remembers",level:2}];function p(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(t.p,{children:["By separating the entity and the ",(0,o.jsx)(t.code,{children:"ApiResource"})," DTO, mapping between the two\nbecomes a very common task. This package utilizes our ",(0,o.jsx)(t.code,{children:"rekalogika/mapper"})," as its\nmapping engine. Usually, you will use it indirectly through the ",(0,o.jsx)(t.code,{children:"map()"})," and\n",(0,o.jsx)(t.code,{children:"mapCollection()"})," methods in the ",(0,o.jsx)(t.code,{children:"AbstractState"})," class."]}),"\n",(0,o.jsx)(t.h2,{id:"when-to-use-the-mapper-and-when-not-to",children:"When To Use the Mapper and When Not To"}),"\n",(0,o.jsx)(t.p,{children:"When you need to map an entity to a DTO, then the mapper is almost always the\ntool for the job. It handles circular references and supports lazy-loading,\nthings that are difficult to do manually. The mapper should work most of the\ntime. And when it doesn't, it is only a simple matter to extend it."}),"\n",(0,o.jsxs)(t.p,{children:["However, when you need to map a DTO to an entity, it requires more\nconsideration. Your domain model might mandate a specific way to do things,\nwhich might be different from than just calling the setters. If you can rely too\nmuch on the mapper, it might indicate that your ",(0,o.jsx)(t.a,{href:"https://martinfowler.com/bliki/AnemicDomainModel.html",children:"domain model is\nanemic"}),", and you should\nlook into that. The integrity of your domain model should not suffer just\nbecause using the mapper is convenient."]}),"\n",(0,o.jsx)(t.h2,{id:"lazy-loading",children:"Lazy Loading"}),"\n",(0,o.jsx)(t.p,{children:"The mapper supports lazy loading on regular objects and collection objects. So,\nyou are free to add relations among your DTOs as much as you need. You can have\nyour DTOs mirror the relations of your domain entities as closely as you want\nwithout worrying about excessive Doctrine queries."}),"\n",(0,o.jsx)(t.p,{children:"These are what you need to keep in mind:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:["The DTOs must not be ",(0,o.jsx)(t.code,{children:"final"}),". Otherwise, lazy loading will not work."]}),"\n",(0,o.jsxs)(t.li,{children:["You should type hint collection properties using ",(0,o.jsx)(t.code,{children:"CollectionInterface"}),". Plain\narrays cannot support lazy loading."]}),"\n",(0,o.jsx)(t.li,{children:"Your DTOs must use the same identifier as your entities. Otherwise, the DTO\nmight cause unwanted hydration of the source entity."}),"\n"]}),"\n",(0,o.jsx)(t.admonition,{title:"Protip",type:"tip",children:(0,o.jsx)(t.p,{children:"Mapper has a panel in Symfony Profiler. You can use it to debug the mapper if\nyou have a mapping problem."})}),"\n",(0,o.jsx)(t.h3,{id:"lazy-loading-collection-example",children:"Lazy-Loading Collection Example"}),"\n",(0,o.jsxs)(t.p,{children:["With the following example, API platform will turn the ",(0,o.jsx)(t.code,{children:"reviews"})," property to the\nIRI of the collection:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-php",children:"use ApiPlatform\\Core\\Annotation\\ApiProperty;\nuse Rekalogika\\Mapper\\CollectionInterface;\n\nclass BookDto\n{\n    /**\n     * @var ?CollectionInterface<int,ReviewDto>\n     */\n    #[ApiProperty(uriTemplate: '/books/{bookId}/reviews')]\n    public ?CollectionInterface $reviews = null;\n}\n"})}),"\n",(0,o.jsxs)(t.p,{children:["In this case, the serializer will not read the content of the ",(0,o.jsx)(t.code,{children:"reviews"}),"\nproperty, and therefore Doctrine won't hydrate the source collection."]}),"\n",(0,o.jsx)(t.h3,{id:"lazy-loading-object-example",children:"Lazy-Loading Object Example"}),"\n",(0,o.jsxs)(t.p,{children:["With the following example, the ",(0,o.jsx)(t.code,{children:"book"})," property below will be turned into the\nIRI of the ",(0,o.jsx)(t.code,{children:"BookDto"})," resource:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-php",children:"use ApiPlatform\\Core\\Annotation\\ApiProperty;\n\nclass ReviewDto\n{\n    #[ApiProperty(readableLink: false)]\n    public ?BookDto $book = null;\n}\n"})}),"\n",(0,o.jsx)(t.p,{children:"To generate the IRI, API Platform requires only the identifier. Doctrine will\nnot hydrate the entity if all we are getting from it is the identifier. Mapper's\nproxy is smart enough to determine the identifier of the Doctrine entity, and\nwon't try to map the other properties."}),"\n",(0,o.jsx)(t.p,{children:"Therefore, generating an IRI won't cost you a Doctrine query, as long as you\nmake sure both the DTO and the Doctrine entity use the same identifier property."}),"\n",(0,o.jsx)(t.admonition,{title:"Protip",type:"tip",children:(0,o.jsxs)(t.p,{children:["Just use ",(0,o.jsx)(t.code,{children:"id"})," as the identifier property everywhere, and be done with it."]})}),"\n",(0,o.jsx)(t.h2,{id:"the-mapper-remembers",children:"The Mapper Remembers..."}),"\n",(0,o.jsxs)(t.p,{children:["The mapper remembers the previous mappings it has done in the same request, and\nwill take note of the ",(0,o.jsx)(t.em,{children:"reverse"})," of the mappings."]}),"\n",(0,o.jsxs)(t.p,{children:["If the client sent an IRI in the request, like\n",(0,o.jsx)(t.code,{children:"/user/books/018dda4b-1884-76ab-af9d-71ab512a0c84"}),", API Platform will resolve\nthe IRI using a State Provider having the same URL pattern. If you are using\nthe same pattern elaborated in this document, then your State Provider will\nget the entity from the database, map it to its DTO, and returns the DTO."]}),"\n",(0,o.jsx)(t.p,{children:"Once API Platform has the DTO, it will pass it as part of the input of your\nState Processor. So you are getting the DTO, not the entity you need. How would\nyou get the entity? You map the DTO to the entity class. It will return you the\nentity because you once mapped the entity to the DTO in the State Provider."})]})}function d(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>s});var i=n(6540);const o={},a=i.createContext(o);function r(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);