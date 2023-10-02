"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[342],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),c=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return i.createElement(s.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},g=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(n),g=a,f=d["".concat(s,".").concat(g)]||d[g]||u[g]||r;return n?i.createElement(f,o(o({ref:t},p),{},{components:n})):i.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=g;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,o[1]=l;for(var c=2;c<r;c++)o[c]=n[c];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}g.displayName="MDXCreateElement"},3053:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var i=n(7462),a=(n(7294),n(3905));const r={title:"Working With Entities"},o=void 0,l={unversionedId:"file-bundle/working-with-entities",id:"file-bundle/working-with-entities",title:"Working With Entities",description:"You can work with the entities and associated files as usual, and they will work",source:"@site/docs/file-bundle/03-working-with-entities.md",sourceDirName:"file-bundle",slug:"/file-bundle/working-with-entities",permalink:"/file-bundle/working-with-entities",draft:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file-bundle/03-working-with-entities.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Working With Entities"},sidebar:"docs",previous:{title:"Associating Files to Doctrine Entities",permalink:"/file-bundle/doctrine-entity"},next:{title:"Integration With Symfony Components",permalink:"/file-bundle/symfony"}},s={},c=[{value:"Creating an entity, adding it to a file, &amp; persisting it",id:"creating-an-entity-adding-it-to-a-file--persisting-it",level:2},{value:"Replacing an associated file",id:"replacing-an-associated-file",level:2},{value:"Updating the metadata of an associated file",id:"updating-the-metadata-of-an-associated-file",level:2},{value:"Removing an associated file",id:"removing-an-associated-file",level:2},{value:"Removing the entity will also remove the associated file",id:"removing-the-entity-will-also-remove-the-associated-file",level:2},{value:"Copying Files Between Entities",id:"copying-files-between-entities",level:2},{value:"Moving Files Between Entities",id:"moving-files-between-entities",level:2}],p={toc:c},d="wrapper";function u(e){let{components:t,...n}=e;return(0,a.kt)(d,(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"You can work with the entities and associated files as usual, and they will work\npretty much the way you expect them to work."),(0,a.kt)("h2",{id:"creating-an-entity-adding-it-to-a-file--persisting-it"},"Creating an entity, adding it to a file, & persisting it"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Doctrine\\ORM\\EntityManagerInterface;\nuse Rekalogika\\File\\File;\n\n/** @var EntityManagerInterface $entityManager */\n\n$product = new Product();\n$image = new File('/tmp/image.png');\n$product->setImage($image);\n\n$entityManager->persist($product);\n$entityManager->flush();\n")),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"The framework will copy the file to the storage location, and leave the original\nfile alone. It is the responsibility of the caller to delete the original if it\nwishes to do so."),(0,a.kt)("p",{parentName:"admonition"},"If the file arrived from a file upload, PHP will delete the file automatically\nwhen the request ends.")),(0,a.kt)("h2",{id:"replacing-an-associated-file"},"Replacing an associated file"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Doctrine\\ORM\\EntityManagerInterface;\nuse Rekalogika\\File\\File;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product */\n\n$newImage = new File('/tmp/newImage.png')\n$product->setImage($newImage);\n$entityManager->flush();\n")),(0,a.kt)("h2",{id:"updating-the-metadata-of-an-associated-file"},"Updating the metadata of an associated file"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var Product $product */\n\n$product->getImage()?->setName('newImage.png');\n")),(0,a.kt)("admonition",{type:"note"},(0,a.kt)("p",{parentName:"admonition"},"Files are not Doctrine entities. File modifications are carried out\nimmediately, independent of Doctrine's ",(0,a.kt)("inlineCode",{parentName:"p"},"flush()"),".")),(0,a.kt)("h2",{id:"removing-an-associated-file"},"Removing an associated file"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product */\n\n$product->setImage(null);\n$entityManager->flush();\n")),(0,a.kt)("h2",{id:"removing-the-entity-will-also-remove-the-associated-file"},"Removing the entity will also remove the associated file"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product */\n\n$entityManager->remove($product);\n$entityManager->flush();\n")),(0,a.kt)("h2",{id:"copying-files-between-entities"},"Copying Files Between Entities"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product1 */\n/** @var Product $product2 */\n\n$product2->setImage($product1->getImage());\n$entityManager->flush();\n")),(0,a.kt)("h2",{id:"moving-files-between-entities"},"Moving Files Between Entities"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-php"},"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product1 */\n/** @var Product $product2 */\n\n$product2->setImage($product1->getImage());\n$product1->setImage(null);\n$entityManager->flush();\n")))}u.isMDXComponent=!0}}]);