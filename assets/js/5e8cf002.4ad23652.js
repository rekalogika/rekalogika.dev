"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[2006],{3905:(e,n,t)=>{t.d(n,{Zo:()=>m,kt:()=>f});var a=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},m=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,p=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),d=s(t),c=i,f=d["".concat(p,".").concat(c)]||d[c]||u[c]||o;return t?a.createElement(f,r(r({ref:n},m),{},{components:t})):a.createElement(f,r({ref:n},m))}));function f(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,r=new Array(o);r[0]=c;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[d]="string"==typeof e?e:i,r[1]=l;for(var s=2;s<o;s++)r[s]=t[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5553:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var a=t(7462),i=(t(7294),t(3905));const o={title:"Integration With Symfony Components"},r=void 0,l={unversionedId:"file-bundle/symfony",id:"file-bundle/symfony",title:"Integration With Symfony Components",description:"This chapter describes how to integrate this framework with the typical Symfony",source:"@site/docs/file-bundle/04-symfony.md",sourceDirName:"file-bundle",slug:"/file-bundle/symfony",permalink:"/file-bundle/symfony",draft:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file-bundle/04-symfony.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Integration With Symfony Components"},sidebar:"docs",previous:{title:"Working With Entities & Files",permalink:"/file-bundle/working-with-entities"},next:{title:"Serving Files",permalink:"/file-bundle/serving-files"}},p={},s=[{value:"Components Summary",id:"components-summary",level:2},{value:"Adapters",id:"adapters",level:2},{value:"Streaming a <code>FileInterface</code>",id:"streaming-a-fileinterface",level:2},{value:"Forms",id:"forms",level:2},{value:"Validators",id:"validators",level:2}],m={toc:s},d="wrapper";function u(e){let{components:n,...t}=e;return(0,i.kt)(d,(0,a.Z)({},m,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This chapter describes how to integrate this framework with the typical Symfony\ncomponents used to work with files."),(0,i.kt)("admonition",{title:"Preparation",type:"info"},(0,i.kt)("p",{parentName:"admonition"},"To enable this feature, you need to install the package\n",(0,i.kt)("inlineCode",{parentName:"p"},"rekalogika/file-symfony-bridge"),":"),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"composer require rekalogika/file-symfony-bridge\n"))),(0,i.kt)("h2",{id:"components-summary"},"Components Summary"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Adapters to convert HttpFoundation ",(0,i.kt)("inlineCode",{parentName:"li"},"File")," objects to a ",(0,i.kt)("inlineCode",{parentName:"li"},"FileInterface")," and\nvice versa, with special handling for ",(0,i.kt)("inlineCode",{parentName:"li"},"UploadedFile"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"FileResponse")," for streaming a ",(0,i.kt)("inlineCode",{parentName:"li"},"FileInterface")," to the client web browser."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"FileType")," form that works with ",(0,i.kt)("inlineCode",{parentName:"li"},"FileInterface")," objects."),(0,i.kt)("li",{parentName:"ul"},"A form transformer ",(0,i.kt)("inlineCode",{parentName:"li"},"FileTransformer")," that you can add to an existing Symfony\n",(0,i.kt)("inlineCode",{parentName:"li"},"FileType")," fields so that it gives us a ",(0,i.kt)("inlineCode",{parentName:"li"},"FileInterface")," instead of a\n",(0,i.kt)("inlineCode",{parentName:"li"},"UploadedFile")," object."),(0,i.kt)("li",{parentName:"ul"},"A form extension ",(0,i.kt)("inlineCode",{parentName:"li"},"FileTypeExtension")," that you can optionally register to\nautomatically convert all the existing Symfony ",(0,i.kt)("inlineCode",{parentName:"li"},"FileType")," so they all give us\na ",(0,i.kt)("inlineCode",{parentName:"li"},"FileInterface"),"."),(0,i.kt)("li",{parentName:"ul"},"Subclassed ",(0,i.kt)("inlineCode",{parentName:"li"},"FileValidator")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"ImageValidator")," that works with\n",(0,i.kt)("inlineCode",{parentName:"li"},"FileInterface")," objects.")),(0,i.kt)("h2",{id:"adapters"},"Adapters"),(0,i.kt)("p",null,"Converts a HttpFoundation ",(0,i.kt)("inlineCode",{parentName:"p"},"File")," (and child classes, including ",(0,i.kt)("inlineCode",{parentName:"p"},"UploadedFile"),")\nto a ",(0,i.kt)("inlineCode",{parentName:"p"},"FileInterface"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\File\\Bridge\\Symfony\\HttpFoundation\\FromHttpFoundationFileAdapter;\nuse Symfony\\Component\\HttpFoundation\\File\\File;\n\n/** @var File $httpFoundationFile */\n\n$file = FromHttpFoundationFileAdapter::adapt($httpFoundationFile);\n")),(0,i.kt)("p",null,"However, it is more convenient to use the universal adapter instead, although\nthe universal adapter still needs this package to be installed."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use Symfony\\Component\\HttpFoundation\\File\\File;\nuse Rekalogika\\File\\FileAdapter;\n\n/** @var File $httpFoundationFile */\n\n$file = FileAdapter::adapt($httpFoundationFile);\n")),(0,i.kt)("p",null,"Converts a ",(0,i.kt)("inlineCode",{parentName:"p"},"FileInterface")," to a HttpFoundation ",(0,i.kt)("inlineCode",{parentName:"p"},"File"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\File\\Bridge\\Symfony\\HttpFoundation\\ToHttpFoundationFileAdapter;\nuse Rekalogika\\Contracts\\File\\FileInterface;\n\n/** @var FileInterface $file */\n\n$httpFoundationFile = ToHttpFoundationFileAdapter::adapt($file);\n")),(0,i.kt)("h2",{id:"streaming-a-fileinterface"},"Streaming a ",(0,i.kt)("inlineCode",{parentName:"h2"},"FileInterface")),(0,i.kt)("p",null,"To stream a ",(0,i.kt)("inlineCode",{parentName:"p"},"FileInterface")," to the client's web browser, you can use\n",(0,i.kt)("inlineCode",{parentName:"p"},"FileResponse"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\File\\Bridge\\Symfony\\HttpFoundation\\FileResponse;\nuse Rekalogika\\Contracts\\File\\FileInterface;\nuse Symfony\\Component\\HttpFoundation\\Response;\n\nclass SomeController\n{\n    public function download(): Response\n    {\n        /** @var FileInterface $file */\n        $file = ...;\n\n        return new FileResponse($file);\n    }\n}\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"FileResponse")," accepts additional optional parameters:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"$status"),": HTTP status code. Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"200"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"$headers"),": Array of additional headers. Default: ",(0,i.kt)("inlineCode",{parentName:"li"},"[]"),"."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"$disposition"),": Force the first parameter of the ",(0,i.kt)("inlineCode",{parentName:"li"},"Content-Disposition")," header\nto the specified value. It can be ",(0,i.kt)("inlineCode",{parentName:"li"},"attachment")," or ",(0,i.kt)("inlineCode",{parentName:"li"},"inline"),". The filename is\nautomatically taken from the metadata.")),(0,i.kt)("h2",{id:"forms"},"Forms"),(0,i.kt)("p",null,"We provide a ",(0,i.kt)("inlineCode",{parentName:"p"},"FileType")," that works with ",(0,i.kt)("inlineCode",{parentName:"p"},"FileInterface")," objects. This is\nbasically the same as Symfony's ",(0,i.kt)("inlineCode",{parentName:"p"},"FileType")," with a transformer built-in:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\File\\Bridge\\Symfony\\Form\\FileType;\nuse Symfony\\Component\\Form\\AbstractType;\nuse Symfony\\Component\\Form\\FormBuilderInterface;\n\nclass SomeFormType extends AbstractType\n{\n    public function buildForm(FormBuilderInterface $builder, array $options): void\n    {\n        $builder\n            // ...\n            ->add('file', FileType::class, [\n                // ...\n            ])\n        ;\n    }\n}\n")),(0,i.kt)("p",null,"If for some reason you cannot change the form type, you can use\n",(0,i.kt)("inlineCode",{parentName:"p"},"FileTransformer")," to transform existing fields. It should work with Symfony's\n",(0,i.kt)("inlineCode",{parentName:"p"},"FileType")," and any third-party form types with a compatible behavior:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\File\\Bridge\\Symfony\\Form\\FileTransformer;\nuse Symfony\\Component\\Form\\Extension\\Core\\Type\\FileType;\nuse Symfony\\Component\\Form\\AbstractType;\nuse Symfony\\Component\\Form\\FormBuilderInterface;\n\nclass SomeFormType extends AbstractType\n{\n    public function buildForm(FormBuilderInterface $builder, array $options): void\n    {\n        $builder\n            ->add('file', FileType::class, [\n                // ...\n            ]);\n\n        $builder->get('file')->addModelTransformer(new FileTransformer());\n    }\n}\n")),(0,i.kt)("p",null,"You can also modify all the existing Symfony's ",(0,i.kt)("inlineCode",{parentName:"p"},"FileType")," fields en masse by\nregistering the ",(0,i.kt)("inlineCode",{parentName:"p"},"FileTypeExtension"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml",metastring:"title=config/services.yaml",title:"config/services.yaml"},"services:\n    Rekalogika\\File\\Bridge\\Symfony\\Form\\FileTypeExtension:\n        tags:\n            - { name: form.type_extension }\n")),(0,i.kt)("h2",{id:"validators"},"Validators"),(0,i.kt)("p",null,"We provide ",(0,i.kt)("inlineCode",{parentName:"p"},"File")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Image")," validators. They are the same as Symfony's\n",(0,i.kt)("inlineCode",{parentName:"p"},"File")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Image")," validators, except that they work with ",(0,i.kt)("inlineCode",{parentName:"p"},"FileInterface"),"\nobjects instead of HttpFoundation ",(0,i.kt)("inlineCode",{parentName:"p"},"File")," objects:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"use Rekalogika\\Contracts\\File\\FileInterface;\nuse Rekalogika\\File\\Bridge\\Symfony\\Constraints\\File as FileConstraint;\nuse Rekalogika\\File\\Bridge\\Symfony\\Constraints\\Image as ImageConstraint;\n\nclass Product\n{\n    #[ImageConstraint(minWidth: '1000']\n    private ?FileInterface $photo = null;\n\n    #[ImageConstraint(maxSize: '10000k']\n    private ?FileInterface $manual = null;\n\n    // ...\n}\n")),(0,i.kt)("admonition",{type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Due to how the adapters work, some validator functions might not work\ncorrectly, like those that check file names.")))}u.isMDXComponent=!0}}]);