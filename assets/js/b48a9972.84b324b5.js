"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[7465],{7398:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var t=i(4848),s=i(8453);const o={title:"UUID Primary Keys"},r=void 0,c={id:"collections/misc/uuid",title:"UUID Primary Keys",description:"If you need UUID primary keys, we highly recommend using string-based UUIDs",source:"@site/docs/collections/04-misc/01-uuid.md",sourceDirName:"collections/04-misc",slug:"/collections/misc/uuid",permalink:"/collections/misc/uuid",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/collections/04-misc/01-uuid.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"UUID Primary Keys"},sidebar:"docs",previous:{title:"Miscellaneous",permalink:"/collections/misc/"},next:{title:"rekalogika/direct-property-access",permalink:"/direct-property-access/"}},d={},l=[];function a(e){const n={code:"code",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["If you need UUID primary keys, we highly recommend using string-based UUIDs\nprimary key instead of object-based UUIDs (like Symfony or Ramsey's ",(0,t.jsx)(n.code,{children:"UuidType"}),")."]}),"\n",(0,t.jsxs)(n.p,{children:["Note that it does not mean you are storing the UUIDs as ",(0,t.jsx)(n.code,{children:"CHAR(36)"})," in the\ndatabase. It means your entity uses ",(0,t.jsx)(n.code,{children:"string"})," instead of ",(0,t.jsx)(n.code,{children:"Uuid"})," as the type of\nits ID property."]}),"\n",(0,t.jsx)(n.p,{children:"Example:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\Mapping as ORM;\nuse Symfony\\Component\\Uid\\UuidV7;\nuse Symfony\\Component\\Uid\\Uuid;\n\nabstract class AbstractEntity\n{\n    #[ORM\\Id]\n    #[ORM\\Column(type: 'guid')]\n    private readonly string $id;\n\n    public function __construct()\n    {\n        $this->id = (new UuidV7())->toRfc4122();\n    }\n\n    // with PHP >= 8.3 only:\n    public function __clone()\n    {\n        $this->id = (new UuidV7())->toRfc4122();\n    }\n\n    final public function getId(): string\n    {\n        return $this->id;\n    }\n\n    final public function getUuid(): Uuid\n    {\n        return new Uuid($this->id);\n    }\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"This way, you retain all the benefits of using UUID primary keys, with all the\nbest practices, but without the headaches:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"You still have compact, binary UUIDs in the database."}),"\n",(0,t.jsx)(n.li,{children:"You still have time-ordered UUIDs."}),"\n",(0,t.jsxs)(n.li,{children:["You still have the means to work with object-based UUIDs in your PHP code\nusing the ",(0,t.jsx)(n.code,{children:"getUuid()"})," method."]}),"\n",(0,t.jsxs)(n.li,{children:["You don't need to change how you work with ",(0,t.jsx)(n.code,{children:"QueryBuilder"}),"'s ",(0,t.jsx)(n.code,{children:"setParameter()"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["The keys in a ",(0,t.jsx)(n.code,{children:"Collection"})," with ",(0,t.jsx)(n.code,{children:"indexBy"})," are now usable. You will be able to\nreliably call ",(0,t.jsx)(n.code,{children:"$collection->get($id)"}),". You no longer need to choose whether to\nuse ",(0,t.jsx)(n.code,{children:"toRfc4122()"})," or ",(0,t.jsx)(n.code,{children:"toBinary()"})," depending on the database driver, or even\ndepending on whether the ",(0,t.jsx)(n.code,{children:"Collection"})," is lazily loaded or not."]}),"\n",(0,t.jsx)(n.li,{children:"If you previously used object-based UUIDs, it should not be difficult to\nmigrate to string-based UUIDs."}),"\n",(0,t.jsxs)(n.li,{children:["By generating the UUID in the constructor, new entities already have the ID\nbefore ",(0,t.jsx)(n.code,{children:"flush()"}),", which is an often overlooked advantage of using UUID primary\nkeys in the first place."]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>c});var t=i(6540);const s={},o=t.createContext(s);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);