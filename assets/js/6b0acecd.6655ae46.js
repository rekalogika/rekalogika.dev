"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[9035],{7622:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>s,contentTitle:()=>a,default:()=>d,frontMatter:()=>r,metadata:()=>p,toc:()=>c});var o=t(4848),i=t(8453);const r={title:"Mapping a DTO to a Persisted Doctrine Entity"},a=void 0,p={id:"mapper/cookbook/doctrine-entity",title:"Mapping a DTO to a Persisted Doctrine Entity",description:"This is an example of mapping a DTO to an entity already persisted in the",source:"@site/docs/mapper/20-cookbook/01-doctrine-entity.md",sourceDirName:"mapper/20-cookbook",slug:"/mapper/cookbook/doctrine-entity",permalink:"/mapper/cookbook/doctrine-entity",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/20-cookbook/01-doctrine-entity.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Mapping a DTO to a Persisted Doctrine Entity"},sidebar:"docs",previous:{title:"Cookbook",permalink:"/mapper/cookbook/"},next:{title:"Overriding a Mapping Table Entry",permalink:"/mapper/cookbook/overriding-transformer"}},s={},c=[];function l(n){const e={code:"code",p:"p",pre:"pre",...(0,i.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.p,{children:"This is an example of mapping a DTO to an entity already persisted in the\ndatabase."}),"\n",(0,o.jsx)(e.p,{children:"The DTO and the entity:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-php",children:"class BookDto\n{\n    public function __construct(public int $id)\n    {\n    }\n}\n\nclass Book\n{\n    private int $id;\n    private string $title;\n\n    public function getId(): int\n    {\n        return $this->id;\n    }\n\n    public function getTitle(): string\n    {\n        return $this->title;\n    }\n\n    public function setTitle(string $title): void\n    {\n        $this->title = $title;\n    }\n}\n"})}),"\n",(0,o.jsx)(e.p,{children:"The mapper:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Attribute\\AsObjectMapper;\n\nclass BookDtoToBookMapper\n{\n    public function __construct(\n        private BookRepository $bookRepository\n    ) {\n    }\n\n    #[AsObjectMapper]\n    public function map(BookDto $dto): Book\n    {\n        $book = $this->bookRepository->find($dto->id);\n\n        if ($book === null) {\n            throw new NotFoundException();\n        }\n\n        return $book;\n    }\n}\n"})}),"\n",(0,o.jsx)(e.p,{children:"The caller:"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-php",children:"use Rekalogika\\Mapper\\MapperInterface;\n\n/** @var MapperInterface $mapper */\n\n$bookDto = new BookDto(1);\n$book = $mapper->map($bookDto, Book::class);\n"})})]})}function d(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(l,{...n})}):l(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>a,x:()=>p});var o=t(6540);const i={},r=o.createContext(i);function a(n){const e=o.useContext(r);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function p(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:a(n.components),o.createElement(r.Provider,{value:e},n.children)}}}]);