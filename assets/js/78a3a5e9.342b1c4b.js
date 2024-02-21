"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[4261],{5363:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>g,frontMatter:()=>p,metadata:()=>c,toc:()=>i});var a=n(5893),r=n(1151);const p={title:"Predetermined Mapping Preset"},o=void 0,c={id:"mapper/preset",title:"Predetermined Mapping Preset",description:"The user can provide a list of predetermined mapping between objects to Mapper.",source:"@site/docs/mapper/08-preset.md",sourceDirName:"mapper",slug:"/mapper/preset",permalink:"/mapper/preset",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/mapper/08-preset.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{title:"Predetermined Mapping Preset"},sidebar:"docs",previous:{title:"Manual Mapping using a Class Factory Method",permalink:"/mapper/class-factory-mapper"},next:{title:"Architecture",permalink:"/mapper/architecture"}},s={},i=[{value:"Usage",id:"usage",level:2},{value:"Populating <code>PresetMapping</code> from an Existing <code>ObjectCache</code>",id:"populating-presetmapping-from-an-existing-objectcache",level:2},{value:"Example: Remembering Mapper",id:"example-remembering-mapper",level:2}];function l(e){const t={code:"code",h2:"h2",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.p,{children:"The user can provide a list of predetermined mapping between objects to Mapper.\nIf Mapper encounters an object in the list, that matches to the provided target\nclass, it will use the preset value."}),"\n",(0,a.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\MapperInterface;\nuse Rekalogika\\Mapper\\Transformer\\Context\\PresetMapping;\nuse Rekalogika\\Mapper\\Context\\Context;\n\n/** @var MapperInterface $mapper */\n/** @var Book $book */\n/** @var BookDto $bookDto */\n\n// if a Book is being mapped to a BookDto, use the provided $bookDto\n$presetMapping = new PresetMapping([\n    $book => [\n        BookDto::class => $bookDto,\n    ]\n])\n\n$context = Context::create($presetMapping);\n\n$result = $mapper->map($book, BookDto::class, $context);\n$book === $result; // true\n"})}),"\n",(0,a.jsxs)(t.h2,{id:"populating-presetmapping-from-an-existing-objectcache",children:["Populating ",(0,a.jsx)(t.code,{children:"PresetMapping"})," from an Existing ",(0,a.jsx)(t.code,{children:"ObjectCache"})]}),"\n",(0,a.jsxs)(t.p,{children:["You can use the ",(0,a.jsx)(t.code,{children:"ObjectCache"})," from a previous mapping to populate the\n",(0,a.jsx)(t.code,{children:"PresetMapping"})," object."]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Mapper\\ObjectCache\\ObjectCacheFactoryInterface;\nuse Rekalogika\\Mapper\\Transformer\\Context\\PresetMapping;\nuse Rekalogika\\Mapper\\Context\\Context;\nuse Rekalogika\\Mapper\\MapperInterface;\n\n/** @var ObjectCacheFactoryInterface $objectCacheFactory */\n/** @var MapperInterface $mapper */\n/** @var Book $book */\n/** @var BookDto $bookDto */\n\n$objectCache = $objectCacheFactory->createObjectCache();\n$context = Context::create($objectCache);\n\n$result = $mapper->map($book, BookDto::class, $context);\n\n$presetMapping = PresetMappingFactory::fromObjectCache($objectCache);\n// ...\n"})}),"\n",(0,a.jsx)(t.h2,{id:"example-remembering-mapper",children:"Example: Remembering Mapper"}),"\n",(0,a.jsx)(t.p,{children:"A mapper that remembers the previous mappings:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-php",children:'use Rekalogika\\Mapper\\Context\\Context;\nuse Rekalogika\\Mapper\\Exception\\UnexpectedValueException;\nuse Rekalogika\\Mapper\\MapperInterface;\nuse Rekalogika\\Mapper\\ObjectCache\\ObjectCacheFactoryInterface;\nuse Rekalogika\\Mapper\\Transformer\\Context\\PresetMapping;\nuse Rekalogika\\Mapper\\Transformer\\Context\\PresetMappingFactory;\nuse Symfony\\Contracts\\Service\\ResetInterface;\n\nclass RememberingMapper implements MapperInterface, ResetInterface\n{\n    private PresetMapping $presetMapping;\n\n    public function __construct(\n        private MapperInterface $decorated,\n        private ObjectCacheFactoryInterface $objectCacheFactory\n    ) {\n        $this->presetMapping = new PresetMapping();\n    }\n\n    public function reset(): void\n    {\n        $this->presetMapping = new PresetMapping();\n    }\n\n    public function map(object $source, object|string $target, ?Context $context = null): object\n    {\n        $objectCache = $this->objectCacheFactory->createObjectCache();\n\n        if ($context === null) {\n            $context = Context::create();\n        }\n\n        $context = $context->with($objectCache, $this->presetMapping);\n\n        $result = $this->decorated->map($source, $target, $context);\n\n        if (is_object($target)) {\n            $target = $target::class;\n        }\n\n        if (!$result instanceof $target) {\n            throw new UnexpectedValueException(sprintf(\'Expected instance of "%s", got "%s"\', $target, get_class($result)));\n        }\n\n        $newPresetMapping = PresetMappingFactory::fromObjectCache($objectCache);\n        $this->presetMapping->mergeFrom($newPresetMapping);\n\n        return $result;\n    }\n}\n'})})]})}function g(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>o});var a=n(7294);const r={},p=a.createContext(r);function o(e){const t=a.useContext(p);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(p.Provider,{value:t},e.children)}}}]);