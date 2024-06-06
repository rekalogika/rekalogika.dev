"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[1215],{6708:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>g,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var i=t(5893),a=t(1151);const r={title:"Working With Entities & Files"},o=void 0,s={id:"file-bundle/working-with-entities",title:"Working With Entities & Files",description:"You can work with the entities and associated files as usual, and they will work",source:"@site/docs/file-bundle/04-working-with-entities.md",sourceDirName:"file-bundle",slug:"/file-bundle/working-with-entities",permalink:"/file-bundle/working-with-entities",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/file-bundle/04-working-with-entities.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Working With Entities & Files"},sidebar:"docs",previous:{title:"Associating Files to Doctrine Entities",permalink:"/file-bundle/doctrine-entity"},next:{title:"File Uploads Using FilePond",permalink:"/file-bundle/file-upload-filepond"}},l={},c=[{value:"Creating an entity, adding it to a file, &amp; persisting it",id:"creating-an-entity-adding-it-to-a-file--persisting-it",level:2},{value:"Replacing an associated file",id:"replacing-an-associated-file",level:2},{value:"Updating the metadata of an associated file",id:"updating-the-metadata-of-an-associated-file",level:2},{value:"Removing an associated file",id:"removing-an-associated-file",level:2},{value:"Removing the entity will also remove the associated file",id:"removing-the-entity-will-also-remove-the-associated-file",level:2},{value:"Copying Files Between Entities",id:"copying-files-between-entities",level:2},{value:"Moving Files Between Entities",id:"moving-files-between-entities",level:2},{value:"Caveat: Avoid Doctrine&#39;s <code>Query::toIterable()</code>",id:"caveat-avoid-doctrines-querytoiterable",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"You can work with the entities and associated files as usual, and they will work\npretty much the way you expect them to work."}),"\n",(0,i.jsx)(n.h2,{id:"creating-an-entity-adding-it-to-a-file--persisting-it",children:"Creating an entity, adding it to a file, & persisting it"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\EntityManagerInterface;\nuse Rekalogika\\File\\File;\n\n/** @var EntityManagerInterface $entityManager */\n\n$product = new Product();\n$image = new File('/tmp/image.png');\n$product->setImage($image);\n\n$entityManager->persist($product);\n$entityManager->flush();\n"})}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"The framework will copy the file to the storage location, and leave the original\nfile alone. It is the responsibility of the caller to delete the original if it\nwishes to do so."}),(0,i.jsx)(n.p,{children:"If the file arrived from a file upload, PHP will delete the file automatically\nwhen the request ends."})]}),"\n",(0,i.jsx)(n.h2,{id:"replacing-an-associated-file",children:"Replacing an associated file"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\EntityManagerInterface;\nuse Rekalogika\\File\\File;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product */\n\n$newImage = new File('/tmp/newImage.png')\n$product->setImage($newImage);\n$entityManager->flush();\n"})}),"\n",(0,i.jsx)(n.h2,{id:"updating-the-metadata-of-an-associated-file",children:"Updating the metadata of an associated file"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var Product $product */\n\n$product->getImage()?->setName('newImage.png');\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["Files are not Doctrine entities. File modifications are carried out\nimmediately, independent of Doctrine's ",(0,i.jsx)(n.code,{children:"flush()"}),"."]})}),"\n",(0,i.jsx)(n.h2,{id:"removing-an-associated-file",children:"Removing an associated file"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product */\n\n$product->setImage(null);\n$entityManager->flush();\n"})}),"\n",(0,i.jsx)(n.h2,{id:"removing-the-entity-will-also-remove-the-associated-file",children:"Removing the entity will also remove the associated file"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product */\n\n$entityManager->remove($product);\n$entityManager->flush();\n"})}),"\n",(0,i.jsx)(n.h2,{id:"copying-files-between-entities",children:"Copying Files Between Entities"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product1 */\n/** @var Product $product2 */\n\n$product2->setImage($product1->getImage());\n$entityManager->flush();\n"})}),"\n",(0,i.jsx)(n.h2,{id:"moving-files-between-entities",children:"Moving Files Between Entities"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var EntityManagerInterface $entityManager */\n/** @var Product $product1 */\n/** @var Product $product2 */\n\n$product2->setImage($product1->getImage());\n$product1->setImage(null);\n$entityManager->flush();\n"})}),"\n",(0,i.jsxs)(n.h2,{id:"caveat-avoid-doctrines-querytoiterable",children:["Caveat: Avoid Doctrine's ",(0,i.jsx)(n.code,{children:"Query::toIterable()"})]}),"\n",(0,i.jsxs)(n.p,{children:["Doctrine documentation tells us to use ",(0,i.jsx)(n.code,{children:"Query::toIterable()"})," to iterate over\nlarge result sets. This is not recommended because ",(0,i.jsx)(n.code,{children:"toIterable()"})," may not\ntrigger the ",(0,i.jsx)(n.code,{children:"postLoad"})," event handler that is necessary for our use case."]}),"\n",(0,i.jsxs)(n.p,{children:["We recommend using our ",(0,i.jsx)(n.code,{children:"rekalogika/rekapager"})," package instead. Read more in our\n",(0,i.jsx)(n.a,{href:"/rekapager/batch-processing",children:"batch processing"})," documentation."]})]})}function g(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>o});var i=t(7294);const a={},r=i.createContext(a);function o(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);