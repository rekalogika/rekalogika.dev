"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[3372],{7915:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>a});var t=i(5893),o=i(1151);const r={title:"Repository"},s=void 0,l={id:"collections/implementations/repository",title:"Repository",description:"Implementation of the repository pattern. This is an alternative to Doctrine's",source:"@site/docs/collections/02-implementations/03-repository.md",sourceDirName:"collections/02-implementations",slug:"/collections/implementations/repository",permalink:"/collections/implementations/repository",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/collections/02-implementations/03-repository.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Repository"},sidebar:"docs",previous:{title:"Query-Backed Collection",permalink:"/collections/implementations/query-collection"},next:{title:"ArrayCollection",permalink:"/collections/implementations/array-collection"}},c={},a=[{value:"Installation",id:"installation",level:2},{value:"Creating a Repository",id:"creating-a-repository",level:2},{value:"The Minimal Flavor",id:"the-minimal-flavor",level:2},{value:"Convenience Methods",id:"convenience-methods",level:2}];function d(e){const n={admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["Implementation of the repository pattern. This is an alternative to Doctrine's\nstandard ",(0,t.jsx)(n.code,{children:"EntityRepository"}),". Unlike Doctrine's, our repository implements\n",(0,t.jsx)(n.code,{children:"Collection"})," interface, so you can work with the repository like any other\nimplementation of ",(0,t.jsx)(n.code,{children:"Collection"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/collections-orm\n"})}),"\n",(0,t.jsx)(n.h2,{id:"creating-a-repository",children:"Creating a Repository"}),"\n",(0,t.jsx)(n.p,{children:"Repository interface:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"use Rekalogika\\Contracts\\Collections\\Repository;\n\n/**\n * @extends Repository<int,Citizen>\n */\ninterface CitizenRepository extends Repository\n{\n    // you may wish to add custom methods here\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"Repository implementation:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"use Rekalogika\\Collections\\ORM\\AbstractRepository;\nuse Rekalogika\\Collections\\ORM\\Configuration\\RepositoryConfiguration;\n\n/**\n * @extends AbstractRepository<int,Citizen>\n */\nclass CitizenRepository extends AbstractRepository implements CitizenRepository\n{\n    protected function configure(): RepositoryConfiguration\n    {\n        return new RepositoryConfiguration(\n            class: Citizen::class,\n        );\n    }\n}\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsx)(n.p,{children:"Technically, it is not strictly required to create the interface for the\nrepository. You can just create the implementation class. Creating the interface\nis a common practice in domain-driven design (DDD). The interface belongs to the\ndomain layer, while the implementation belongs to the infrastructure layer.\nOther components of the application work with the interface, not the\nimplementation directly."})}),"\n",(0,t.jsx)(n.h2,{id:"the-minimal-flavor",children:"The Minimal Flavor"}),"\n",(0,t.jsx)(n.p,{children:"If you want to use the minimal version of the repository, you can substitute:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"Repository"})," with ",(0,t.jsx)(n.code,{children:"MinimalRepository"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"AbstractRepository"})," with ",(0,t.jsx)(n.code,{children:"AbstractMinimalRepository"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"RepositoryConfiguration"})," with ",(0,t.jsx)(n.code,{children:"MinimalRepositoryConfiguration"})]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"convenience-methods",children:"Convenience Methods"}),"\n",(0,t.jsxs)(n.p,{children:["The base ",(0,t.jsx)(n.code,{children:"AbstractRepository"})," class provides convenience methods to be called by\nthe methods in the concrete repository implementation:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"getEntityManager()"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"createQueryBuilder()"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"getDoctrineRepository()"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"createCriteriaRecollection()"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"createCriteriaPageable()"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"createQueryRecollection()"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"createQueryPageable()"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>l,a:()=>s});var t=i(7294);const o={},r=t.createContext(o);function s(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);