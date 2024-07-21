"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[3197],{9284:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>i,contentTitle:()=>r,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var t=o(5893),c=o(1151);const s={title:"Decorating Member Objects"},r=void 0,a={id:"doctrine-collections-decorator/cookbook/decorating-members",title:"Decorating Member Objects",description:"We can use a collection decorator to dynamically decorate the members of the",source:"@site/docs/doctrine-collections-decorator/cookbook/14-decorating-members.md",sourceDirName:"doctrine-collections-decorator/cookbook",slug:"/doctrine-collections-decorator/cookbook/decorating-members",permalink:"/doctrine-collections-decorator/cookbook/decorating-members",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/doctrine-collections-decorator/cookbook/14-decorating-members.md",tags:[],version:"current",sidebarPosition:14,frontMatter:{title:"Decorating Member Objects"},sidebar:"docs",previous:{title:"Selectable Abstraction",permalink:"/doctrine-collections-decorator/cookbook/selectable-abstraction"},next:{title:"Loading Prevention in Extra Lazy Collections",permalink:"/doctrine-collections-decorator/cookbook/extra-lazy-load-prevention"}},i={},l=[{value:"<code>BusinessContract</code> Entity &amp; Superclass",id:"businesscontract-entity--superclass",level:2},{value:"Decorator for <code>BusinessContract</code>",id:"decorator-for-businesscontract",level:2},{value:"Decorator for the <code>BusinessContract</code> Collection",id:"decorator-for-the-businesscontract-collection",level:2},{value:"Usage in the <code>PartnerCompany</code> Object",id:"usage-in-the-partnercompany-object",level:2},{value:"Class Diagram",id:"class-diagram",level:2}];function d(e){const n={code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,c.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"We can use a collection decorator to dynamically decorate the members of the\ncollection on the fly."}),"\n",(0,t.jsxs)(n.p,{children:["In this example, we will be using an example of a one-to-many association\nbetween ",(0,t.jsx)(n.code,{children:"PartnerCompany"})," and ",(0,t.jsx)(n.code,{children:"BusinessContract"})," entities. The ",(0,t.jsx)(n.code,{children:"PartnerCompany"}),"\nentity has a collection of ",(0,t.jsx)(n.code,{children:"BusinessContract"})," entities."]}),"\n",(0,t.jsxs)(n.h2,{id:"businesscontract-entity--superclass",children:[(0,t.jsx)(n.code,{children:"BusinessContract"})," Entity & Superclass"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\Mapping as ORM;\n\ninterface BusinessContractInterface {\n    // ...\n}\n\n#[ORM\\Entity()]\nclass BusinessContract implements BusinessContractInterface {\n    // ...\n}\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"decorator-for-businesscontract",children:["Decorator for ",(0,t.jsx)(n.code,{children:"BusinessContract"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"class BusinessContractDecorator implements BusinessContractInterface {\n    public function __construct(private BusinessContractInterface $wrapped)\n    {\n    }\n\n    // ...\n}\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"decorator-for-the-businesscontract-collection",children:["Decorator for the ",(0,t.jsx)(n.code,{children:"BusinessContract"})," Collection"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"use Doctrine\\Common\\Collections\\Collection;\nuse Doctrine\\Common\\Collections\\Criteria;\nuse Doctrine\\Common\\Collections\\Selectable;\nuse Rekalogika\\Collections\\Decorator\\Decorator\\CollectionDecorator;\n\n/**\n * @extends CollectionDecorator<array-key,BusinessContractInterface>\n */\nclass BusinessContractCollectionDecorator extends CollectionDecorator\n{\n    #[\\Override]\n    public function get(string|int $key): BusinessContractInterface\n    {\n        return new BusinessContractDecorator(\n            $this->getWrapped()->get($key)\n        );\n    }\n\n    #[\\Override]\n    public function getIterator(): \\Traversable\n    {\n        foreach ($this->getWrapped() as $key => $value) {\n            yield $key => new BusinessContractDecorator($value);\n        }\n    }\n\n    // We should override all the other methods that returns\n    // BusinessContractInterface, but for conciseness, we skip them here.\n}\n"})}),"\n",(0,t.jsxs)(n.h2,{id:"usage-in-the-partnercompany-object",children:["Usage in the ",(0,t.jsx)(n.code,{children:"PartnerCompany"})," Object"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-php",children:"use Doctrine\\Common\\Collections\\ArrayCollection;\nuse Doctrine\\Common\\Collections\\Collection;\nuse Doctrine\\ORM\\Mapping as ORM;\n\n#[ORM\\Entity()]\nclass PartnerCompany\n{\n    /**\n     * @var Collection<array-key,BusinessContractInterface>\n     */\n    #[ORM\\OneToMany(targetEntity: BusinessContract::class)]\n    private Collection $businessContracts;\n\n    public function __construct()\n    {\n        $this->businessContracts = new ArrayCollection();\n    }\n\n    public function getBusinessContracts(): BusinessContractCollectionDecorator\n    {\n        return new BusinessContractCollectionDecorator($this->businessContracts);\n    }\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"class-diagram",children:"Class Diagram"}),"\n",(0,t.jsx)(n.p,{children:"Now for a bird's-eye view of our classes."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.img,{alt:"Decorating members",src:o(4869).Z+"#light",width:"761",height:"946"}),"\n",(0,t.jsx)(n.img,{alt:"Decorating members",src:o(8309).Z+"#dark",width:"773",height:"946"})]})]})}function u(e={}){const{wrapper:n}={...(0,c.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},8309:(e,n,o)=>{o.d(n,{Z:()=>t});const t=o.p+"assets/images/decorating-members.dark-c3ad79a5da645d5e3ce5d3b7a7cb6fa8.svg"},4869:(e,n,o)=>{o.d(n,{Z:()=>t});const t=o.p+"assets/images/decorating-members.light-c0557afcab055e7b8a110c62de85989c.svg"},1151:(e,n,o)=>{o.d(n,{Z:()=>a,a:()=>r});var t=o(7294);const c={},s=t.createContext(c);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);