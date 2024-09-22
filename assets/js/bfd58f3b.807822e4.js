"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[799],{4809:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var r=n(4848),a=n(8453);const s={title:"Mapping Object to Object"},i=void 0,o={id:"mapper/object",title:"Mapping Object to Object",description:"Mapping an object to another object is the most common task done by a mapper.",source:"@site/docs/mapper/02-object.md",sourceDirName:"mapper",slug:"/mapper/object",permalink:"/mapper/object",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/02-object.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Mapping Object to Object"},sidebar:"docs",previous:{title:"Installation & Basic Usage",permalink:"/mapper/installation-usage"},next:{title:"Mapping Arrays & Array-Like Objects",permalink:"/mapper/collection"}},p={},l=[{value:"How It Works",id:"how-it-works",level:2},{value:"Mapping Properties With Different Names",id:"mapping-properties-with-different-names",level:2},{value:"Mapping to Abstract Classes and Interfaces",id:"mapping-to-abstract-classes-and-interfaces",level:2},{value:"Custom Property Mapper",id:"custom-property-mapper",level:2},{value:"Shorthand Using <code>AsPropertyMapper</code> Attached to the Class",id:"shorthand-using-aspropertymapper-attached-to-the-class",level:3},{value:"Property Name Magic",id:"property-name-magic",level:3},{value:"Extra Arguments",id:"extra-arguments",level:3},{value:"Source Union Types",id:"source-union-types",level:3},{value:"Manual Wiring",id:"manual-wiring",level:3},{value:"Dumping Property Mapper Table",id:"dumping-property-mapper-table",level:3},{value:"Lazy Loading",id:"lazy-loading",level:2},{value:"Mapping to Doctrine Entities",id:"mapping-to-doctrine-entities",level:3},{value:"API Platform",id:"api-platform",level:3},{value:"Eager Properties",id:"eager-properties",level:3},{value:"Ad-Hoc Disabling of Lazy-Loading",id:"ad-hoc-disabling-of-lazy-loading",level:3},{value:"Other Ways of Disabling Lazy-Loading",id:"other-ways-of-disabling-lazy-loading",level:3},{value:"Classes With Dynamic Properties, Including <code>stdClass</code>",id:"classes-with-dynamic-properties-including-stdclass",level:2}];function c(e){const t={admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["Mapping an object to another object is the most common task done by a mapper.\nInternally, this task is done by ",(0,r.jsx)(t.code,{children:"ObjectToObjectTransformer"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"how-it-works",children:"How It Works"}),"\n",(0,r.jsx)(t.p,{children:"The mapper identifies properties that have the same name on the source and the\ntarget side. It looks at public properties, public getters & setters, and\nconstructor arguments."}),"\n",(0,r.jsx)(t.p,{children:"It gets the existing value on the target side. If it is null, then it\ninstantiates a new target object, populating its constructor arguments by\ntransforming properties of the same name from the source object."}),"\n",(0,r.jsx)(t.p,{children:"Then, it transforms each source property to the target type, and sets them on\nthe target."}),"\n",(0,r.jsx)(t.h2,{id:"mapping-properties-with-different-names",children:"Mapping Properties With Different Names"}),"\n",(0,r.jsxs)(t.p,{children:["By default, Mapper will map a property on the source side to a property with the\nsame name on the target side. If the names are different, you can use the\n",(0,r.jsx)(t.code,{children:"#[Map]"})," attribute."]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Attribute\\Map;\nuse Rekalogika\\Mapper\\MapperInterface;\n\nclass SomeObject\n{\n    public string $sourcePropertyA = 'sourcePropertyA';\n}\n\nclass SomeObjectDto\n{\n    // highlight-next-line\n    #[Map(property: 'sourcePropertyA')]\n    public ?string $targetPropertyA = null;\n}\n\n/** @var MapperInterface $mapper */\n\n$source = new SomeObject();\n$result = $mapper->map($source, SomeObjectDto::class);\n\n// Map is bidirectional, the above attribute will also work in reverse:\n\n$source = new SomeObjectDto();\n$result = $mapper->map($source, SomeObject::class);\n"})}),"\n",(0,r.jsxs)(t.p,{children:["In the above example, the mapper will map the ",(0,r.jsx)(t.code,{children:"sourcePropertyA"})," from the source\nobject to the ",(0,r.jsx)(t.code,{children:"targetPropertyA"})," on the target object, and also in reverse."]}),"\n",(0,r.jsx)(t.admonition,{title:"Protip",type:"tip",children:(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"#[Map]"})," attribute can be used on properties, getters, and setters. If the\nproperty is virtual (it has a getter and setter, but no actual property), you\ncan attach the attribute to the getter or setter."]})}),"\n",(0,r.jsxs)(t.p,{children:["The ",(0,r.jsx)(t.code,{children:"#[Map]"})," attribute has an optional ",(0,r.jsx)(t.code,{children:"$class"})," argument, which can be used to\nlimit the effect only to a specific class. i.e. it will only take effect if the\nother class is the class specified in the ",(0,r.jsx)(t.code,{children:"$class"})," argument:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"class SomeObjectDto\n{\n    // highlight-next-line\n    #[Map(property: 'sourcePropertyA', class: SomeObject::class)]\n    public ?string $targetPropertyA = null;\n}\n"})}),"\n",(0,r.jsx)(t.h2,{id:"mapping-to-abstract-classes-and-interfaces",children:"Mapping to Abstract Classes and Interfaces"}),"\n",(0,r.jsxs)(t.p,{children:["To map to an abstract class or an interface, you need to add the attribute\n",(0,r.jsx)(t.code,{children:"InheritanceMap"})," to the abstract class or interface. For example:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Attribute\\InheritanceMap;\nuse Rekalogika\\Mapper\\Tests\\Fixtures\\Inheritance\\ConcreteClassA;\nuse Rekalogika\\Mapper\\Tests\\Fixtures\\Inheritance\\ConcreteClassB;\n\n#[InheritanceMap([\n    ConcreteClassA::class => ConcreteClassADto::class,\n    ConcreteClassB::class => ConcreteClassBDto::class,\n    ConcreteClassB::class => ConcreteClassCDto::class,\n])]\nabstract class AbstractClassDto\n{\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["In the above example, the mapper will map the source to ",(0,r.jsx)(t.code,{children:"ConcreteClassADto"})," if\nthe source is an instance of ",(0,r.jsx)(t.code,{children:"ConcreteClassA"}),", and so on."]}),"\n",(0,r.jsx)(t.admonition,{type:"note",children:(0,r.jsx)(t.p,{children:"This only applies if there is no a preexisting object on the target side."})}),"\n",(0,r.jsx)(t.h2,{id:"custom-property-mapper",children:"Custom Property Mapper"}),"\n",(0,r.jsxs)(t.p,{children:["If you need a custom mapping logic for a specific property, you can create a\nservice and add the attribute ",(0,r.jsx)(t.code,{children:"AsPropertyMapper"})," to a custom method."]}),"\n",(0,r.jsx)(t.admonition,{type:"note",children:(0,r.jsx)(t.p,{children:"This is optional. You only need to use this if you need a custom logic to\npopulate a specific target property."})}),"\n",(0,r.jsx)(t.p,{children:"Example:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Attribute\\AsPropertyMapper;\n\nclass UserMapper\n{\n    #[AsPropertyMapper(\n        targetClass: UserDto::class,\n        property: 'name',\n    )]\n    public function mapName(User $user): string\n    {\n        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());\n    }\n}\n"})}),"\n",(0,r.jsxs)(t.p,{children:["The above example concatenates first name and last name from the source ",(0,r.jsx)(t.code,{children:"User"}),"\nobject, transforms it to uppercase, and returns the result. Mapper will then\nassign the result to the ",(0,r.jsx)(t.code,{children:"name"})," property of the target ",(0,r.jsx)(t.code,{children:"UserDto"})," object, as\nspecified in the arguments of the ",(0,r.jsx)(t.code,{children:"AsPropertyMapper"})," attribute."]}),"\n",(0,r.jsxs)(t.h3,{id:"shorthand-using-aspropertymapper-attached-to-the-class",children:["Shorthand Using ",(0,r.jsx)(t.code,{children:"AsPropertyMapper"})," Attached to the Class"]}),"\n",(0,r.jsxs)(t.p,{children:["If you have many properties to manually map, you can put the ",(0,r.jsx)(t.code,{children:"AsPropertyMapper"}),"\nattribute on the class, and it will apply to all methods in the class. Example:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Attribute\\AsPropertyMapper;\n\n#[AsPropertyMapper(targetClass: UserDto::class)]\nclass UserMapper\n{\n    #[AsPropertyMapper('name')]\n    public function mapName(User $user): string\n    {\n        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());\n    }\n\n    #[AsPropertyMapper('birthDate')]\n    public function mapBirthDate(User $user): string\n    {\n        return $user->getBirthDate()->format('Y-m-d');\n    }\n\n    #[AsPropertyMapper('email')]\n    public function mapEmail(User $user): string\n    {\n        return $user->getEmailAddress();\n    }\n}\n"})}),"\n",(0,r.jsx)(t.h3,{id:"property-name-magic",children:"Property Name Magic"}),"\n",(0,r.jsx)(t.p,{children:"For even more shorthand, you can omit the property name altogether, and the\nmapper will use the method name, stripping the leading 'map' and lowercasing\nthe first letter."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Attribute\\AsPropertyMapper;\n\n#[AsPropertyMapper(targetClass: UserDto::class)]\nclass UserMapper\n{\n    // maps to 'name'\n    #[AsPropertyMapper]\n    public function mapName(User $user): string\n    {\n        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());\n    }\n\n    // maps to 'birthDate'\n    #[AsPropertyMapper]\n    public function mapBirthDate(User $user): string\n    {\n        return $user->getBirthDate()->format('Y-m-d');\n    }\n\n    // maps to 'email\n    #[AsPropertyMapper]\n    public function mapEmail(User $user): string\n    {\n        return $user->getEmailAddress();\n    }\n}\n"})}),"\n",(0,r.jsx)(t.h3,{id:"extra-arguments",children:"Extra Arguments"}),"\n",(0,r.jsx)(t.p,{children:"You also have the option to inject the main transformer, sub-mapper, and the\ncontext to the property mapper. This can be in any order, but the first argument\nmust be the source object."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Context\\Context;\nuse Rekalogika\\Mapper\\MainTransformerInterface;\nuse Rekalogika\\Mapper\\Attribute\\AsPropertyMapper;\nuse Rekalogika\\Mapper\\SubMapper\\SubMapperInterface;\n\n#[AsPropertyMapper(targetClass: UserDto::class)]\nclass UserMapper\n{\n    #[AsPropertyMapper]\n    public function mapName(\n        User $user,\n        // highlight-start\n        MainTransformerInterface $mainTransformer,\n        SubMapperInterface $subMapper,\n        Context $context\n        // highlight-end\n    ): string {\n        return strtoupper($user->getFirstName() . ' ' . $user->getLastName());\n    }\n}\n"})}),"\n",(0,r.jsx)(t.h3,{id:"source-union-types",children:"Source Union Types"}),"\n",(0,r.jsx)(t.p,{children:"Union types on the source side are supported."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Attribute\\AsPropertyMapper;\n\nclass AnimalMapper\n{\n    #[AsPropertyMapper(\n        targetClass: AnimalDto::class,\n        property: 'name',\n    )]\n    // highlight-next-line\n    public function mapName(Cat|Dog $animal): string\n    {\n        return $animal->getName();\n    }\n}\n"})}),"\n",(0,r.jsx)(t.h3,{id:"manual-wiring",children:"Manual Wiring"}),"\n",(0,r.jsx)(t.p,{children:"If you don't use autowiring, autoconfiguration, or don't want to use attributes,\nyou can add the service manually like this:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",metastring:'title="config/services.yaml"',children:"services:\n    App\\Mapper\\UserMapper:\n        tags:\n            -\n                name: 'rekalogika.mapper.property_mapper'\n                method: 'mapName'\n                sourceClass: 'App\\Entity\\User'\n                targetClass: 'App\\Dto\\UserDto'\n                property: 'name'\n            -\n                name: 'rekalogika.mapper.property_mapper'\n                method: 'mapBirthDate'\n                sourceClass: 'App\\Entity\\User'\n                targetClass: 'App\\Dto\\UserDto'\n                property: 'birthDate'\n            -\n                name: 'rekalogika.mapper.property_mapper'\n                method: 'mapEmail'\n                sourceClass: 'App\\Entity\\User'\n                targetClass: 'App\\Dto\\UserDto'\n                property: 'email'\n"})}),"\n",(0,r.jsx)(t.h3,{id:"dumping-property-mapper-table",children:"Dumping Property Mapper Table"}),"\n",(0,r.jsx)(t.p,{children:"To dump the list of all property mappers, run the following command:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"$ bin/console debug:container --tag=rekalogika.mapper.property_mapper\n"})}),"\n",(0,r.jsx)(t.h2,{id:"lazy-loading",children:"Lazy Loading"}),"\n",(0,r.jsx)(t.p,{children:"Mapper will attempt to create a lazy-loading proxy for the target object, and\nuse it in place of the real object. The benefit is that the target object will\nnot be hydrated until it is actually used."}),"\n",(0,r.jsx)(t.p,{children:"If the source object is a Doctrine entity, the mapping will not trigger the\nhydration of the source; even accessing ID properties on the target will also\nnot trigger the hydration. Only after accessing other properties of the target\nwill the hydration take place."}),"\n",(0,r.jsx)(t.admonition,{type:"warning",children:(0,r.jsxs)(t.p,{children:["If the target is ",(0,r.jsx)(t.code,{children:"final"}),", then lazy-loading will not be possible. There are also\nother cases that can prevent a lazy-loading proxy from being created. To see if\na proxy is being used, or the reason why it is not, you can see that in the\nMapper panel in the Symfony profiler."]})}),"\n",(0,r.jsx)(t.h3,{id:"mapping-to-doctrine-entities",children:"Mapping to Doctrine Entities"}),"\n",(0,r.jsxs)(t.p,{children:["Doctrine reads properties using ",(0,r.jsx)(t.code,{children:"Reflection"})," directly, and therefore will not\ntrigger the hydration of our proxy objects. To prevent problems while working\nwith Doctrine entities, Mapper will prevent proxy creation if the target is a\nDoctrine entity."]}),"\n",(0,r.jsx)(t.h3,{id:"api-platform",children:"API Platform"}),"\n",(0,r.jsxs)(t.p,{children:["With API Platform, if you are using DTOs as ",(0,r.jsx)(t.code,{children:"ApiResource"}),", then API Platform\nshould be able to generate IRIs without causing the hydration of the source (if\nthe source is a Doctrine entity). The only thing you need to do is to ensure\nthe source (a Doctrine entity) and the target (an ",(0,r.jsx)(t.code,{children:"ApiResource"})," DTO) both use\nthe same identifier property name. Or better: just use ",(0,r.jsx)(t.code,{children:"id"})," as the identifier\neverywhere, and be done with it."]}),"\n",(0,r.jsx)(t.p,{children:"Without lazy-loading, API Platform will hydrate everything in the object graph,\neven when it only needs to generate an IRI."}),"\n",(0,r.jsx)(t.h3,{id:"eager-properties",children:"Eager Properties"}),"\n",(0,r.jsxs)(t.p,{children:["During the mapping, Mapper will try to identify the identifier properties on the\nsource side. First, it looks for the information in Doctrine's class metadata.\nIf not found, it will use ",(0,r.jsx)(t.code,{children:"id"}),", ",(0,r.jsx)(t.code,{children:"uuid"}),", or ",(0,r.jsx)(t.code,{children:"identifier"})," if any of those exists\non the source side."]}),"\n",(0,r.jsx)(t.p,{children:"These identifier properties will not be lazy, and will be mapped immediately\nafter the instantiation of the target proxy object. This should not cause the\nhydration of the source side because a Doctrine proxy already hold the\nidentifier, even when uninitialized."}),"\n",(0,r.jsxs)(t.p,{children:["If your application needs to have a custom logic for determining the identifier\nfields, you can create a service implementing\n",(0,r.jsx)(t.code,{children:"EagerPropertiesResolverInterface"}),"."]}),"\n",(0,r.jsx)(t.admonition,{type:"info",children:(0,r.jsx)(t.p,{children:"If an identifier property maps to a constructor argument on the target side,\nthen everything in the constructor will be mapped eagerly."})}),"\n",(0,r.jsx)(t.h3,{id:"ad-hoc-disabling-of-lazy-loading",children:"Ad-Hoc Disabling of Lazy-Loading"}),"\n",(0,r.jsx)(t.p,{children:"There should be no downside to using a lazy-loading proxy in place of the real\nobject. In most cases, they should be interchangeable. However, a proxy incurs a\nsmall overhead, and you may wish to disable it in some cases, for example if you\nare using the Mapper in a batch process."}),"\n",(0,r.jsxs)(t.p,{children:["If you want to disable lazy-loading for a mapping run, you can set the option\n",(0,r.jsx)(t.code,{children:"enableLazyLoading"})," to false in the ",(0,r.jsx)(t.code,{children:"MapperOptions"})," object, and add it to the\ncontext:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\Context\\Context;\nuse Rekalogika\\Mapper\\Context\\MapperOptions;\n\n$options = new MapperOptions(lazyLoading: false);\n$context = Context::create($options);\n\n$target = $this->mapper->map($source, TargetDto::class, $context);\n"})}),"\n",(0,r.jsx)(t.h3,{id:"other-ways-of-disabling-lazy-loading",children:"Other Ways of Disabling Lazy-Loading"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["You can make the target ",(0,r.jsx)(t.code,{children:"final"}),"."]}),"\n",(0,r.jsx)(t.li,{children:"You can instantiate manually, and pass the object as the mapper's target."}),"\n",(0,r.jsxs)(t.li,{children:["You can decorate ",(0,r.jsx)(t.code,{children:"ProxyGeneratorInterface"}),", and throw\n",(0,r.jsx)(t.code,{children:"ProxyNotSupportedException"})," if it asks for your specific class. Read\n",(0,r.jsx)(t.code,{children:"DoctrineProxyGenerator"})," for example."]}),"\n"]}),"\n",(0,r.jsxs)(t.h2,{id:"classes-with-dynamic-properties-including-stdclass",children:["Classes With Dynamic Properties, Including ",(0,r.jsx)(t.code,{children:"stdClass"})]}),"\n",(0,r.jsxs)(t.p,{children:["Mapper supports classes with ",(0,r.jsx)(t.code,{children:"#[AllowDynamicProperties]"}),", including ",(0,r.jsx)(t.code,{children:"stdClass"}),"\nand all classes that extends ",(0,r.jsx)(t.code,{children:"stdClass"}),", with the following semantics."]}),"\n",(0,r.jsxs)(t.p,{children:["If the target is ",(0,r.jsx)(t.code,{children:"stdClass"})," (or an object with ",(0,r.jsx)(t.code,{children:"#[AllowDynamicProperties]"}),"),\nthen all properties of the source will be mapped to the target. If the target\nhas explicit properties, then they will be respected as usual."]}),"\n",(0,r.jsxs)(t.p,{children:["If the source is a ",(0,r.jsx)(t.code,{children:"stdClass"})," (or an object with ",(0,r.jsx)(t.code,{children:"#[AllowDynamicProperties]"}),")\nand the target is a regular object, then the mapping will take place for each\nproperty of the target that has a matching property on the source side."]})]})}function d(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>o});var r=n(6540);const a={},s=r.createContext(a);function i(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);