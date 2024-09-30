"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[146],{4515:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=t(4848),a=t(8453);const o={title:"Mapping Arrays & Array-Like Objects"},i=void 0,s={id:"mapper/collection",title:"Mapping Arrays & Array-Like Objects",description:"This chapter describes how to map arrays and array-like objects.",source:"@site/docs/mapper/03-collection.md",sourceDirName:"mapper",slug:"/mapper/collection",permalink:"/mapper/collection",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/03-collection.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Mapping Arrays & Array-Like Objects"},sidebar:"docs",previous:{title:"Immutable Objects",permalink:"/mapper/object/immutable-objects"},next:{title:"Mapping DateTime",permalink:"/mapper/datetime"}},l={},c=[{value:"Mapping to an Array",id:"mapping-to-an-array",level:2},{value:"Mapping to an Array-Like Object",id:"mapping-to-an-array-like-object",level:2},{value:"Mapping Using Adder and Remover Methods",id:"mapping-using-adder-and-remover-methods",level:2},{value:"<code>Generator</code>-Backed Mapping",id:"generator-backed-mapping",level:2},{value:"Non-Integer and Non-String Keys",id:"non-integer-and-non-string-keys",level:2},{value:"Lazy Loading",id:"lazy-loading",level:2},{value:"Deleting Items on the Target Side Not Present in Source",id:"deleting-items-on-the-target-side-not-present-in-source",level:2},{value:"Mapping Between Object and Array",id:"mapping-between-object-and-array",level:2},{value:"Attributes Handling",id:"attributes-handling",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"This chapter describes how to map arrays and array-like objects."}),"\n",(0,r.jsx)(n.h2,{id:"mapping-to-an-array",children:"Mapping to an Array"}),"\n",(0,r.jsx)(n.p,{children:"Suppose you have these entities:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"use Doctrine\\Common\\Collections\\ArrayCollection;\nuse Doctrine\\Common\\Collections\\Collection;\n\nclass Post\n{\n    /** @var Collection<int,Comment> */\n    private Collection $comments;\n\n    public function __construct()\n    {\n        $this->comments = new ArrayCollection();\n    }\n\n    /**\n     * @return Collection<int,Comment>\n     */\n    public function getComments(): Collection\n    {\n        return $this->comments;\n    }\n}\n\nclass Comment\n{\n    private string $text;\n\n    public function __construct(string $text)\n    {\n        $this->text = $text;\n    }\n\n    public function getText(): string\n    {\n        return $this->text;\n    }\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["To map those entities to the corresponding DTOs, you can simply create the DTOs\nlike the following. Notice the type-hint of the ",(0,r.jsx)(n.code,{children:"$comments"})," property:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"class PostDto\n{\n    // highlight-next-line\n    /** @var ?array<int,CommentDto> */\n    public ?array $comments = null;\n}\n\nclass CommentDto\n{\n    public string $text;\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"Then, you can map between the two objects:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"/** @var MapperInterface $mapper */\n\n$postDto = $mapper->map($post, PostDto::class);\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsx)(n.p,{children:"Without the type-hint, the mapper will copy the source objects to the target\narray as-is."})}),"\n",(0,r.jsxs)(n.p,{children:["The source side must be an iterable: an array or a ",(0,r.jsx)(n.code,{children:"Traversable"})," object, i.e.\nanything that you can ",(0,r.jsx)(n.code,{children:"foreach()"})," over."]}),"\n",(0,r.jsx)(n.h2,{id:"mapping-to-an-array-like-object",children:"Mapping to an Array-Like Object"}),"\n",(0,r.jsx)(n.p,{children:"You can also map to an array-like object. Example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"class PostDto\n{\n    /** @var ?\\ArrayObject<int,CommentDto> */\n    public ?\\ArrayObject $comments = null;\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"Supported types of the target side:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ArrayAccess"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ArrayObject"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"ArrayIterator"})}),"\n",(0,r.jsxs)(n.li,{children:["Doctrine ",(0,r.jsx)(n.code,{children:"ReadableCollection"})]}),"\n",(0,r.jsxs)(n.li,{children:["Doctrine ",(0,r.jsx)(n.code,{children:"Collection"})]}),"\n",(0,r.jsxs)(n.li,{children:["Doctrine ",(0,r.jsx)(n.code,{children:"ArrayCollection"})]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"CollectionInterface"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"mapping-using-adder-and-remover-methods",children:"Mapping Using Adder and Remover Methods"}),"\n",(0,r.jsx)(n.p,{children:"Mapper supports mapping using adder and remover method on the target side.\nExample:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"class PostDto\n{\n    /** @var array<int,CommentDto> */\n    private array $comments = [];\n\n    /**\n     * @return array<int,CommentDto>\n     */\n    public function getComments(): array\n    {\n        return $this->comments;\n    }\n\n    public function addComment(CommentDto $comment): void\n    {\n        $this->comments[] = $comment;\n    }\n\n    public function removeComment(CommentDto $comment): void\n    {\n        $key = array_search($comment, $this->comments, true);\n\n        if ($key !== false) {\n            unset($this->comments[$key]);\n        }\n    }\n}\n"})}),"\n",(0,r.jsxs)(n.h2,{id:"generator-backed-mapping",children:[(0,r.jsx)(n.code,{children:"Generator"}),"-Backed Mapping"]}),"\n",(0,r.jsxs)(n.p,{children:["If the target is type-hinted with ",(0,r.jsx)(n.code,{children:"Traversable"}),", the mapper will map to a\n",(0,r.jsx)(n.code,{children:"Generator"})," object."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"class PostDto\n{\n    /** @var ?\\Traversable<int,CommentDto> */\n    public ?\\Traversable $comments = null;\n}\n"})}),"\n",(0,r.jsx)(n.p,{children:"With this approach, no values are stored on the target side. Instead, the target\nwill transform the source values to the desired type on-the-fly as you iterate\nover it."}),"\n",(0,r.jsxs)(n.p,{children:["If the source is an array or an object that implements ",(0,r.jsx)(n.code,{children:"Countable"}),", the result\nwill also be a ",(0,r.jsx)(n.code,{children:"Countable"}),", i.e. that you can ",(0,r.jsx)(n.code,{children:"count()"})," or ",(0,r.jsx)(n.code,{children:"->count()"}),". In\naddition, if your source is an extra-lazy Doctrine Collection, the consumer will\nbe able to ",(0,r.jsx)(n.code,{children:"count()"})," the target without causing a full hydration of the source."]}),"\n",(0,r.jsx)(n.admonition,{type:"note",children:(0,r.jsx)(n.p,{children:"For this to work, the target must be null or unset."})}),"\n",(0,r.jsx)(n.h2,{id:"non-integer-and-non-string-keys",children:"Non-Integer and Non-String Keys"}),"\n",(0,r.jsxs)(n.p,{children:["The mapper supports non-integer and non-string keys if the underlying objects\nsupport it, including ",(0,r.jsx)(n.code,{children:"SplObjectStorage"}),". The key value will be transformed to the\ntarget key type-hint, just like the values. Example:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"class RelationshipMap\n{\n    /** @var \\ArrayAccess<Person,Person> */\n    public \\ArrayAccess $spouseMap;\n\n    public function __construct()\n    {\n        $this->spouseMap = new \\SplObjectStorage();\n    }\n}\n\nclass RelationshipMapDto\n{\n    /** @var ?\\ArrayAccess<PersonDto,PersonDto> */\n    public ?\\ArrayAccess $spouseMap = null;\n}\n\n$jack = new Person('Jack');\n$jill = new Person('Jill');\n\n$map = new RelationshipMap();\n$map->spouseMap[$jack] = $jill;\n$map->spouseMap[$jill] = $jack;\n\n$mapDto = $mapper->map($map, RelationshipMapDto::class);\n"})}),"\n",(0,r.jsxs)(n.admonition,{type:"warning",children:[(0,r.jsxs)(n.p,{children:["For this to work, the type-hint of the target side cannot be ",(0,r.jsx)(n.code,{children:"SplObjectStorage"}),"\nor other concrete class. Use ",(0,r.jsx)(n.code,{children:"ArrayAccess"})," instead. Also it must be initially\nnull, not pre-initialized. The mapper uses a custom ",(0,r.jsx)(n.code,{children:"HashTable"})," object on the\ntarget side to accomplish this."]}),(0,r.jsxs)(n.p,{children:["Using ",(0,r.jsx)(n.code,{children:"Traversable"})," type hint also works."]})]}),"\n",(0,r.jsx)(n.h2,{id:"lazy-loading",children:"Lazy Loading"}),"\n",(0,r.jsx)(n.p,{children:"The mapper supports lazy-loading, and will instantiate a lazy-loading object on\nthe target size if the conditions are met."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["The target must be type-hinted using ",(0,r.jsx)(n.code,{children:"Traversable"}),", ",(0,r.jsx)(n.code,{children:"ArrayAccess"}),", the special\n",(0,r.jsx)(n.code,{children:"CollectionInterface"}),", or Doctrine's ",(0,r.jsx)(n.code,{children:"Collection"})," or ",(0,r.jsx)(n.code,{children:"ReadableCollection"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["If the target is ",(0,r.jsx)(n.code,{children:"ArrayAccess"})," or ",(0,r.jsx)(n.code,{children:"CollectionInterface"}),", the source must be an\narray, or an array-like object that implements ",(0,r.jsx)(n.code,{children:"ArrayAccess"}),", ",(0,r.jsx)(n.code,{children:"Traversable"}),",\nand ",(0,r.jsx)(n.code,{children:"Countable"})," (pretty much all of them do)."]}),"\n",(0,r.jsx)(n.li,{children:"The target side cannot be a simple array."}),"\n",(0,r.jsx)(n.li,{children:"The target variable must not be pre-initialized. It must be null or\nuninitialized."}),"\n",(0,r.jsx)(n.li,{children:"The target property must not be using an adder method."}),"\n",(0,r.jsx)(n.li,{children:"Non-integer, non-string keys are not supported."}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["If lazy loading is active on the target side, and the source supports lazy\nloading (like Doctrine ",(0,r.jsx)(n.code,{children:"PersistentCollection"}),"), the source will not be hydrated\nunless the consumer actually uses the mapped property on the target side. This\nmight be useful, like if you are using the DTOs in a view, where you don't\nalways need to use the property."]}),"\n",(0,r.jsx)(n.h2,{id:"deleting-items-on-the-target-side-not-present-in-source",children:"Deleting Items on the Target Side Not Present in Source"}),"\n",(0,r.jsx)(n.p,{children:"By default, the mapper will not remove items already existing on the target\nside."}),"\n",(0,r.jsxs)(n.p,{children:["To change this behavior, you can add the ",(0,r.jsx)(n.code,{children:"AllowDelete"})," attribute to the target\nproperty, or the ",(0,r.jsx)(n.code,{children:"AllowTargetDelete"})," attribute to the source property. Mapper\nwill remove existing items from the target side that are not present in the\nsource."]}),"\n",(0,r.jsxs)(n.p,{children:["The following example maps a ",(0,r.jsx)(n.code,{children:"Post"})," entity to a ",(0,r.jsx)(n.code,{children:"PostDto"})," DTO."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"use Doctrine\\Common\\Collections\\Collection;\nuse Rekalogika\\Mapper\\MapperInterface;\nuse Rekalogika\\Mapper\\Attributes\\AllowDelete;\nuse Rekalogika\\Mapper\\Attributes\\AllowTargetDelete;\n\nclass Post\n{\n    /** @var Collection<int,Comment> */\n    // highlight-next-line\n    #[AllowTargetDelete]\n    private Collection $comments;\n}\n\nclass PostDto\n{\n    /** @var ?array<int,CommentDto> */\n    // highlight-next-line\n    #[AllowDelete]\n    public ?array $comments = null;\n}\n\n/** @var MapperInterface $mapper */\n/** @var Post $post */\n$dto = $mapper->map($post, PostDto::class);\n"})}),"\n",(0,r.jsx)(n.admonition,{title:"Protip",type:"tip",children:(0,r.jsxs)(n.p,{children:["If your property is virtual (i.e. a getter method without an actual property),\nyou may attach the ",(0,r.jsx)(n.code,{children:"AllowDelete"})," attribute to to the getter or remover method,\nand the ",(0,r.jsx)(n.code,{children:"AllowTargetDelete"})," attribute to the getter method."]})}),"\n",(0,r.jsxs)(n.admonition,{type:"note",children:[(0,r.jsx)(n.p,{children:"The identity check is done on the items, after transformation. If you are\nmapping a DTO to a persisted Doctrine entity, you need to use an object mapper\nto map the DTO to the persisted Doctrine entity."}),(0,r.jsxs)(n.p,{children:["For an example on how to accomplish this, see ",(0,r.jsx)(n.a,{href:"cookbook/doctrine-entity",children:"Mapping a DTO to a Persisted\nDoctrine Entity"}),"."]})]}),"\n",(0,r.jsx)(n.h2,{id:"mapping-between-object-and-array",children:"Mapping Between Object and Array"}),"\n",(0,r.jsxs)(n.p,{children:["Mapping between an object and an array follows the same semantics as ",(0,r.jsxs)(n.a,{href:"object#classes-with-dynamic-properties-including-stdclass",children:["mapping\ninvolving an ",(0,r.jsx)(n.code,{children:"stdClass"}),"\nobject"]}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Internally, Mapper will convert the array to ",(0,r.jsx)(n.code,{children:"stdClass"}),", and convert the result\nback to an array if necessary."]}),"\n",(0,r.jsx)(n.h2,{id:"attributes-handling",children:"Attributes Handling"}),"\n",(0,r.jsx)(n.p,{children:"Some attributes are used to control the mapping between two objects. These\nattributes can be attached to array or array-like objects, and will affect the\ntransformation between the members of the array or array-like object."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Attributes\\DateTimeOptions;\n\nclass SomeObject\n{\n    /**\n     * Array of dates in DateTimeInterface\n     * \n     * @var array<int,\\DateTimeInterface> */\n    public array $dates;\n}\n\nclass SomeObjectDto\n{\n    /**\n     * Array of dates in string, in Y-m-d format\n     * \n     * @var array<int,string>\n     */\n    #[DateTimeOptions(format: 'Y-m-d')]\n    public array $dates = [];\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["With the above example, the mapper will transform the array of\n",(0,r.jsx)(n.code,{children:"DateTimeInterface"})," to an array of string in ",(0,r.jsx)(n.code,{children:"Y-m-d"})," format."]})]})}function p(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>s});var r=t(6540);const a={},o=r.createContext(a);function i(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);