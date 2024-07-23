"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[8033],{9620:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>a});var i=t(5893),s=t(1151);const o={title:"Class Arguments"},r=void 0,c={id:"collections/behaviors/class-arguments",title:"Class Arguments",description:"Our classes accept arguments in their constructors. Different classes may or",source:"@site/docs/collections/03-behaviors/07-class-arguments.md",sourceDirName:"collections/03-behaviors",slug:"/collections/behaviors/class-arguments",permalink:"/collections/behaviors/class-arguments",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/collections/03-behaviors/07-class-arguments.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{title:"Class Arguments"},sidebar:"docs",previous:{title:"UI and API Pagination",permalink:"/collections/behaviors/pagination"},next:{title:"Compatibility with Original Doctrine Collection",permalink:"/collections/behaviors/compatibility"}},l={},a=[{value:"The Arguments",id:"the-arguments",level:2},{value:"<code>orderBy</code>",id:"orderby",level:3},{value:"<code>indexBy</code>",id:"indexby",level:3},{value:"<code>itemsPerPage</code>",id:"itemsperpage",level:3},{value:"<code>count</code>",id:"count",level:3},{value:"<code>pagination</code>",id:"pagination",level:3},{value:"<code>softLimit</code> and <code>hardLimit</code>",id:"softlimit-and-hardlimit",level:3},{value:"<code>keyTransformer</code>",id:"keytransformer",level:3},{value:"Changing the Default Argument Values",id:"changing-the-default-argument-values",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Our classes accept arguments in their constructors. Different classes may or\nmay not accept the different arguments listed below. Most of these arguments\naccept null, which means the default value."}),"\n",(0,i.jsx)(n.h2,{id:"the-arguments",children:"The Arguments"}),"\n",(0,i.jsx)(n.h3,{id:"orderby",children:(0,i.jsx)(n.code,{children:"orderBy"})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"orderBy"})," argument is used to sort the collection. It accepts one of the\nfollowing values:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"string"})," means the column name to sort by."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"array<string,Order>"}),". The key means the column names to sort, the value is\nthe order to sort by."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"null"})," means use the default order by."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"indexby",children:(0,i.jsx)(n.code,{children:"indexBy"})}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"indexBy"})," argument is used to determine the field of the object used as the\nkey of the collection. It accepts string, meaning the column name to index by.\nIf null, the default is used. If the default is null, then the collection will\nbe a list."]}),"\n",(0,i.jsx)(n.h3,{id:"itemsperpage",children:(0,i.jsx)(n.code,{children:"itemsPerPage"})}),"\n",(0,i.jsxs)(n.p,{children:["The number of items in a page when using pagination. It accepts an integer.\nIt can be overridden post-instantiation using ",(0,i.jsx)(n.code,{children:"withItemsPerPage()"}),"."]}),"\n",(0,i.jsx)(n.h3,{id:"count",children:(0,i.jsx)(n.code,{children:"count"})}),"\n",(0,i.jsxs)(n.p,{children:["The count strategy to use. Accepts a ",(0,i.jsx)(n.code,{children:"CountStrategy"})," instance. Read more about\ncount strategies in the ",(0,i.jsx)(n.a,{href:"/collections/behaviors/counting",children:"Counting"})," section."]}),"\n",(0,i.jsx)(n.h3,{id:"pagination",children:(0,i.jsx)(n.code,{children:"pagination"})}),"\n",(0,i.jsxs)(n.p,{children:["The pagination type to use. Either ",(0,i.jsx)(n.code,{children:"Pagination::Keyset"})," or ",(0,i.jsx)(n.code,{children:"Pagination::Offset"}),".\nDefaults to ",(0,i.jsx)(n.code,{children:"Pagination::Keyset"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["You should almost always use ",(0,i.jsx)(n.code,{children:"Pagination::Keyset"}),". However, there are cases\nwhere ",(0,i.jsx)(n.code,{children:"Pagination::Offset"})," might be required, for example, when paginating a\nsearch result ordered by search ranking."]}),"\n",(0,i.jsxs)(n.h3,{id:"softlimit-and-hardlimit",children:[(0,i.jsx)(n.code,{children:"softLimit"})," and ",(0,i.jsx)(n.code,{children:"hardLimit"})]}),"\n",(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"softLimit"})," and ",(0,i.jsx)(n.code,{children:"hardLimit"})," arguments are used to limit the number of\nresults returned. The ",(0,i.jsx)(n.code,{children:"softLimit"})," is the maximum number of results before the\ncollection will give you a deprecation warning. The ",(0,i.jsx)(n.code,{children:"hardLimit"})," is the maximum\nnumber of results before the collection will throw an exception. Read more\nabout limits in the ",(0,i.jsx)(n.a,{href:"/collections/behaviors/oom",children:"Potential Out-of-Memory Handling"})," section."]}),"\n",(0,i.jsx)(n.h3,{id:"keytransformer",children:(0,i.jsx)(n.code,{children:"keyTransformer"})}),"\n",(0,i.jsxs)(n.p,{children:["Accepts a ",(0,i.jsx)(n.code,{children:"KeyTransformer"})," object used to transform the key before passing it to\nthe underlying ",(0,i.jsx)(n.code,{children:"Collection"}),". Read more about it in the ",(0,i.jsx)(n.a,{href:"/collections/behaviors/key-type-widening",children:"Key Type\nWidening"})," section."]}),"\n",(0,i.jsx)(n.h2,{id:"changing-the-default-argument-values",children:"Changing the Default Argument Values"}),"\n",(0,i.jsxs)(n.p,{children:["The default argument values can be changed by setting the static properties of\n",(0,i.jsx)(n.code,{children:"Configuration"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"To change the default value, for example, you can do it in one of these\nfollowing places:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"In your application's kernel."}),"\n",(0,i.jsxs)(n.li,{children:["Using ",(0,i.jsx)(n.code,{children:"composer.json"}),"'s ",(0,i.jsx)(n.code,{children:"files"})," autoloading mechanism."]}),"\n",(0,i.jsxs)(n.li,{children:["In ",(0,i.jsx)(n.code,{children:"index.php"}),"."]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>c,a:()=>r});var i=t(7294);const s={},o=i.createContext(s);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);