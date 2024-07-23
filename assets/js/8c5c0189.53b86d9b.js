"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[7133],{4221:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var o=t(5893),i=t(1151);const s={title:"Introduction"},r=void 0,l={id:"collections/intro",title:"Introduction",description:"Pragmatic, opinionated enhancements to Doctrine's Collections library. Improves",source:"@site/docs/collections/00-intro.md",sourceDirName:"collections",slug:"/collections/intro",permalink:"/collections/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/collections/00-intro.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{title:"Introduction"},sidebar:"docs",previous:{title:"rekalogika/collections",permalink:"/collections/"},next:{title:"Interfaces",permalink:"/collections/interfaces"}},a={},c=[{value:"Background",id:"background",level:2},{value:"Components",id:"components",level:2},{value:"Features",id:"features",level:2},{value:"License",id:"license",level:2},{value:"Contributing",id:"contributing",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"Pragmatic, opinionated enhancements to Doctrine's Collections library. Improves\nthe use of Doctrine Collections in large datasets, and other common problems."}),"\n",(0,o.jsx)(n.h2,{id:"background",children:"Background"}),"\n",(0,o.jsx)(n.p,{children:"We work with huge datasets that are managed by Doctrine ORM, and have complex\nbusiness rules. These come with these challenges:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"With standard Doctrine, it seems it is too easy to introduce bugs that will\naccidentally load the entire dataset into memory and cause out-of-memory\nerrors. And these sorts of errors will usually only show up in production, but\nnever in the development environment."}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Iterating over large datasets with the correct method is difficult and\ncumbersome. You usually need to devise custom solutions for each use case."}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Counting the number of records is very slow. Sometimes we can do away with the\ncount, sometimes it is a must, and we need to work around the problem."}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"Other, non-performance issues include:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Doctrine's ",(0,o.jsx)(n.code,{children:"Selectable"})," appears to be a prevalent abstraction leak. Coders\ntend to litter the codebase with internal-revealing ",(0,o.jsx)(n.code,{children:"Criteria"})," objects, and\nupdating the entity can potentially become a nightmare. No static analysis\ntool can currently detect this problem. In fact, some exacerbate the problem\nby assuming a ",(0,o.jsx)(n.code,{children:"Collection"})," must also be a ",(0,o.jsx)(n.code,{children:"Selectable"}),"."]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Previously, we created ",(0,o.jsx)(n.code,{children:"rekalogika/doctrine-collections-decorator"})," to solve\nthese problems. However, it is still too cumbersome because we need to approach\nthe problem one at a time. We need a more comprehensive solution."]}),"\n",(0,o.jsx)(n.h2,{id:"components",children:"Components"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Decorator classes that enhance any Doctrine Collections classes."}),"\n",(0,o.jsxs)(n.li,{children:["Query-backed collections. Turns a ",(0,o.jsx)(n.code,{children:"QueryBuilder"})," into a lazy-loading\ncollection."]}),"\n",(0,o.jsxs)(n.li,{children:["An alternative implementation of the repository pattern that implements\n",(0,o.jsx)(n.code,{children:"Collection"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:["Modifications to ",(0,o.jsx)(n.code,{children:"ArrayCollection"})," that does ",(0,o.jsx)(n.code,{children:"matching()"})," against the private\nproperties directly, to reproduce the same behavior of ",(0,o.jsx)(n.code,{children:"PersistentCollection"}),"."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Safeguards against potential out-of-memory situations. Throws an exception\nbefore it hits harder-to-debug out-of-memory situation."}),"\n",(0,o.jsx)(n.li,{children:"Pluggable counting strategies. Work around long counting times using your own\ncounting strategies."}),"\n",(0,o.jsx)(n.li,{children:"Full versions of the collection classes that offer full compatibility with the\noriginal Doctrine Collection. And the minimal flavors that only expose the\nsafe methods."}),"\n",(0,o.jsxs)(n.li,{children:["Built in keyset pagination using\n",(0,o.jsx)(n.a,{href:"https://rekalogika.dev/rekapager",children:(0,o.jsx)(n.code,{children:"rekalogika/rekapager"})})," library. Iterate\nover collections of any size without loading them all into memory. And without\nhaving to create ad-hoc queries every time you need to achieve that."]}),"\n",(0,o.jsx)(n.li,{children:"Option to use the traditional offset pagination instead of keyset pagination."}),"\n",(0,o.jsx)(n.li,{children:"Keyset pagination can also be used to create pagination for user interfaces\nand API outputs."}),"\n",(0,o.jsxs)(n.li,{children:["Encourages you to create expressive, higher-level methods to provide the same\nfunctionality as the ",(0,o.jsx)(n.code,{children:"Selectable"})," interface, but without exposing the inner\nworkings of the class."]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,o.jsx)(n.p,{children:"MIT"}),"\n",(0,o.jsx)(n.h2,{id:"contributing",children:"Contributing"}),"\n",(0,o.jsxs)(n.p,{children:["Issues and pull requests should be filed in the GitHub repository\n",(0,o.jsx)(n.a,{href:"https://github.com/rekalogika/collections",children:"rekalogika/collections"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>r});var o=t(7294);const i={},s=o.createContext(i);function r(e){const n=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(s.Provider,{value:n},e.children)}}}]);