"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[169],{972:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>r,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"analytics/summary-entity/summary-class","title":"Summary Class","description":"A summary entity is an entity that contains pre-aggregated data from the source","source":"@site/docs/analytics/02-summary-entity/01-summary-class.md","sourceDirName":"analytics/02-summary-entity","slug":"/analytics/summary-entity/summary-class","permalink":"/analytics/summary-entity/summary-class","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/analytics/02-summary-entity/01-summary-class.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"title":"Summary Class"},"sidebar":"docs","previous":{"title":"Summary Entity","permalink":"/analytics/summary-entity/"},"next":{"title":"Partitioning","permalink":"/analytics/summary-entity/partitioning"}}');var a=t(4848),s=t(8453);const r={title:"Summary Class"},o=void 0,l={},c=[{value:"Example Source Entity",id:"example-source-entity",level:2},{value:"The Summary Entity",id:"the-summary-entity",level:2},{value:"Sections",id:"sections",level:2},{value:"1. Partition",id:"1-partition",level:3},{value:"2. Dimensions",id:"2-dimensions",level:3},{value:"3. Measures",id:"3-measures",level:3},{value:"Getters",id:"getters",level:2},{value:"Labels and Translations",id:"labels-and-translations",level:2},{value:"Indexing",id:"indexing",level:2},{value:"Changing Summary Entity",id:"changing-summary-entity",level:2},{value:"Summary Entity is an Entity but not an Entity",id:"summary-entity-is-an-entity-but-not-an-entity",level:2}];function u(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"A summary entity is an entity that contains pre-aggregated data from the source\nentity. To work with this package, you need to create one or more summary\nentities for each source entity that you want to analyze."}),"\n",(0,a.jsx)(n.h2,{id:"example-source-entity",children:"Example Source Entity"}),"\n",(0,a.jsxs)(n.p,{children:["This is the example of an entity that we would like to analyze. Here, we have an\n",(0,a.jsx)(n.code,{children:"Order"}),":"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Doctrine\\DBAL\\Types\\Types;\nuse Doctrine\\ORM\\Mapping as ORM;\n\n#[ORM\\Entity()]\nclass Order\n{\n    #[ORM\\Id]\n    #[ORM\\GeneratedValue]\n    #[ORM\\Column]\n    private ?int $id = null;\n\n    #[ORM\\ManyToOne()]\n    private ?Item $item = null;\n\n    #[ORM\\ManyToOne()]\n    private ?Customer $customer = null;\n\n    #[ORM\\Column(type: Types::DATETIME_MUTABLE)]\n    private ?\\DateTimeInterface $time = null;\n\n    // setters, getters and other logic are omitted for brevity\n}\n"})}),"\n",(0,a.jsx)(n.p,{children:"The source entity must have a key field that has the following properties:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Permanent, the value never changes in the lifetime of the entity."}),"\n",(0,a.jsx)(n.li,{children:"Monotonic, always increases."}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"Most of the time, you should be able to use the primary key of the entity as the\nkey field."}),"\n",(0,a.jsx)(n.h2,{id:"the-summary-entity",children:"The Summary Entity"}),"\n",(0,a.jsxs)(n.p,{children:["This is an example summary entity for the above ",(0,a.jsx)(n.code,{children:"Order"})," entity. A summary table\nis a standard Doctrine entity with additional attributes that define how the\ndata is rolled up from the source entity:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Brick\\Money\\Money;\nuse Doctrine\\DBAL\\Types\\Types;\nuse Doctrine\\ORM\\Mapping as ORM;\nuse Rekalogika\\Analytics\\AggregateFunction\\Count;\nuse Rekalogika\\Analytics\\AggregateFunction\\Sum;\nuse Rekalogika\\Analytics\\Attribute as Analytics;\nuse Rekalogika\\Analytics\\Model\\Hierarchy\\TimeDimensionHierarchy;\nuse Rekalogika\\Analytics\\Model\\Partition\\DefaultIntegerPartition;\nuse Rekalogika\\Analytics\\Model\\Summary;\nuse Rekalogika\\Analytics\\ValueResolver\\EntityValueResolver;\nuse Rekalogika\\Analytics\\ValueResolver\\PropertyValueResolver;\nuse Symfony\\Component\\Translation\\TranslatableMessage;\n\n#[ORM\\Entity()]\n#[Analytics\\Summary(\n    sourceClass: Order::class,\n    label: new TranslatableMessage('Orders'),\n)]\nclass OrderSummary extends Summary\n{\n    // 1. Partition\n\n    #[ORM\\Embedded()]\n    #[Analytics\\Partition(new PropertyValueResolver('id'))]\n    private DefaultIntegerPartition $partition;\n\n    // 2. Dimensions\n\n    #[ORM\\Embedded()]\n    #[Analytics\\Dimension(\n        source: new PropertyValueResolver('time'),\n        label: new TranslatableMessage('Time'),\n        sourceTimeZone: new \\DateTimeZone('UTC'),\n        summaryTimeZone: new \\DateTimeZone('Asia/Jakarta'),\n    )]\n    private TimeDimensionHierarchy $time;\n\n    #[ORM\\ManyToOne()]\n    #[Analytics\\Dimension(\n        source: new EntityValueResolver('customer.country'),\n        label: new TranslatableMessage('Customer Country'),\n    )]\n    private ?Country $customerCountry = null;\n\n    #[ORM\\ManyToOne()]\n    #[Analytics\\Dimension(\n        source: new EntityValueResolver('customer.country.region'),\n        label: new TranslatableMessage('Customer Region'),\n    )]\n    private ?Region $customerRegion = null;\n\n    #[ORM\\Column(enumType: Gender::class, nullable: true)]\n    #[Analytics\\Dimension(\n        source: new PropertyValueResolver('customer.gender'),\n        label: new TranslatableMessage('Customer Gender'),\n    )]\n    private ?Gender $customerGender = null;\n\n    // 3. Measures\n\n    #[ORM\\Column(type: Types::INTEGER)]\n    #[Analytics\\Measure(\n        function: new Sum('item.price'),\n        label: new TranslatableMessage('Price'),\n    )]\n    private ?int $price = null;\n\n    #[ORM\\Column(type: Types::INTEGER)]\n    #[Analytics\\Measure(\n        function: new Count('id'),\n        label: new TranslatableMessage('Count'),\n    )]\n    private ?int $count = null;\n\n    // 4. An example getter with business logic\n\n    public function getPrice(): ?Money\n    {\n        if ($this->price === null) {\n            return null;\n        }\n\n        return Money::ofMinor($this->price, 'EUR');\n    }\n"})}),"\n",(0,a.jsx)(n.h2,{id:"sections",children:"Sections"}),"\n",(0,a.jsx)(n.h3,{id:"1-partition",children:"1. Partition"}),"\n",(0,a.jsxs)(n.p,{children:["The ",(0,a.jsx)(n.code,{children:"partition"})," attribute is used to define how the data is partitioned. The\ndefault ",(0,a.jsx)(n.code,{children:"DefaultIntegerPartition"})," here should be sufficient for\nauto-incrementing primary key of the source entity."]}),"\n",(0,a.jsxs)(n.p,{children:["Read more about partitions in the ",(0,a.jsx)(n.a,{href:"partitioning",children:"partitioning"})," section."]}),"\n",(0,a.jsx)(n.h3,{id:"2-dimensions",children:"2. Dimensions"}),"\n",(0,a.jsxs)(n.p,{children:["These are the properties that have distinct, descriptive values. You will use\nthese properties to filter and group the data. Using SQL as an analogy, these\nare the fields that you would use in a ",(0,a.jsx)(n.code,{children:"GROUP BY"})," and/or ",(0,a.jsx)(n.code,{children:"WHERE"})," clause."]}),"\n",(0,a.jsxs)(n.p,{children:["All dimensions are indicated by the ",(0,a.jsx)(n.code,{children:"#[Analytics\\Dimension]"})," attribute. The most\nimportant argument is the ",(0,a.jsx)(n.code,{children:"source"})," argument. This argument is used to resolve\nthe value of the dimension from the source entity. A ",(0,a.jsx)(n.code,{children:"PropertyValueResolver"}),"\npoints to the value of a property in the source entity. An ",(0,a.jsx)(n.code,{children:"EntityValueResolver"}),"\npoints to a related entity."]}),"\n",(0,a.jsxs)(n.p,{children:["A dimension can be hierarchical, like the ",(0,a.jsx)(n.code,{children:"time"})," dimension above. A hierarchical\ndimension is modeled using a Doctrine embeddable. Inside the class, the time\ndimension is further divided into ",(0,a.jsx)(n.code,{children:"year"}),", ",(0,a.jsx)(n.code,{children:"month"}),", ",(0,a.jsx)(n.code,{children:"day"}),", and more."]}),"\n",(0,a.jsxs)(n.p,{children:["Read more about dimensions in the ",(0,a.jsx)(n.a,{href:"dimensions",children:"dimensions"})," section."]}),"\n",(0,a.jsx)(n.h3,{id:"3-measures",children:"3. Measures"}),"\n",(0,a.jsxs)(n.p,{children:["These are the properties that you want to aggregate. Using SQL as an analogy,\nyou would use these fields in a ",(0,a.jsx)(n.code,{children:"SUM"}),", ",(0,a.jsx)(n.code,{children:"COUNT"}),", and other aggregate functions."]}),"\n",(0,a.jsxs)(n.p,{children:["Measures are indicated by the ",(0,a.jsx)(n.code,{children:"#[Analytics\\Measure]"})," attribute. The most\nimportant argument is the ",(0,a.jsx)(n.code,{children:"function"})," argument. It is used to define the\naggregation function."]}),"\n",(0,a.jsxs)(n.p,{children:["Read more about measures in the ",(0,a.jsx)(n.a,{href:"measures",children:"measures"})," section."]}),"\n",(0,a.jsx)(n.h2,{id:"getters",children:"Getters"}),"\n",(0,a.jsxs)(n.p,{children:["Just like a regular Doctrine entity, you can define getters in the summary\nentity. You can also have simple business logic in these getters. For example,\nthe ",(0,a.jsx)(n.code,{children:"getPrice()"})," getter above converts the price to a ",(0,a.jsx)(n.code,{children:"Money"})," object."]}),"\n",(0,a.jsx)(n.h2,{id:"labels-and-translations",children:"Labels and Translations"}),"\n",(0,a.jsxs)(n.p,{children:["All the items in the summary entity have a ",(0,a.jsx)(n.code,{children:"label"})," attribute that accepts a\nstring or a ",(0,a.jsx)(n.code,{children:"TranslatableInterface"}),". These labels are used in the user interface\nto identify the item, for example in a table header or a chart legend."]}),"\n",(0,a.jsxs)(n.p,{children:["If a ",(0,a.jsx)(n.code,{children:"TranslatableInterface"})," is used, the label will be translated using the\nSymfony translation component."]}),"\n",(0,a.jsx)(n.h2,{id:"indexing",children:"Indexing"}),"\n",(0,a.jsx)(n.p,{children:"The framework automatically creates indexes for the summary table. You don't\nneed to create any indexes manually."}),"\n",(0,a.jsx)(n.h2,{id:"changing-summary-entity",children:"Changing Summary Entity"}),"\n",(0,a.jsxs)(n.p,{children:["A summary entity should not be changed after it is created and populated. Mainly\nbecause the summary entity has the ",(0,a.jsx)(n.code,{children:"groupings"})," property, which relies on the\nentity's properties and their ordering. If you make any changes, then you will\nneed to refresh the entire data anyway."]}),"\n",(0,a.jsxs)(n.p,{children:["If you need to change the summary entity, you should create a new one, refresh\nthe data and wait until it is completed, and then retire the old one. If you\nanticipate that you will have to change the summary entity, we suggest\ndate-coding the summary entity class name, for example ",(0,a.jsx)(n.code,{children:"OrderSummary20250115"}),"."]}),"\n",(0,a.jsx)(n.h2,{id:"summary-entity-is-an-entity-but-not-an-entity",children:"Summary Entity is an Entity but not an Entity"}),"\n",(0,a.jsxs)(n.p,{children:["A summary entity is defined as a Doctrine entity. But it is mainly for defining\nthe structure of the summary table and the summarization behavior. You will\nnever interact with a real instance of the summary entity. Instead, you query\nthe summary table using the ",(0,a.jsx)(n.code,{children:"SummaryManager"}),", and gets the result not in the\nform of a summary entity."]}),"\n",(0,a.jsx)(n.p,{children:"An event listener is installed to prevent you from accidentally persisting,\nupdating, or deleting a summary entity."})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>o});var i=t(6540);const a={},s=i.createContext(a);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);