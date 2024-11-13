"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[5694],{2586:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>l});const i=JSON.parse('{"id":"reconstitutor/usage","title":"Usage","description":"Explains how to use the reconstitutor library.","source":"@site/docs/reconstitutor/02-usage.md","sourceDirName":"reconstitutor","slug":"/reconstitutor/usage","permalink":"/reconstitutor/usage","draft":false,"unlisted":false,"editUrl":"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/reconstitutor/02-usage.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"title":"Usage","description":"Explains how to use the reconstitutor library."},"sidebar":"docs","previous":{"title":"Introduction & Installation","permalink":"/reconstitutor/intro"},"next":{"title":"rekalogika/rekapager","permalink":"/rekapager/"}}');var o=n(4848),s=n(8453);const r={title:"Usage",description:"Explains how to use the reconstitutor library."},a=void 0,c={},l=[{value:"Reconstitution of a Class",id:"reconstitution-of-a-class",level:2},{value:"Reconstitution of Classes With a Specific PHP Attribute",id:"reconstitution-of-classes-with-a-specific-php-attribute",level:2},{value:"<code>get()</code> and <code>set()</code> Helpers",id:"get-and-set-helpers",level:2},{value:"Caveat: Avoid <code>Query::toIterable</code>",id:"caveat-avoid-querytoiterable",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"Because everyone knows about file uploads, we are going to use it as an\nexample, even if you probably won't use this framework as a means for handling\nfile uploads."}),"\n",(0,o.jsx)(t.admonition,{type:"info",children:(0,o.jsxs)(t.p,{children:["We also provide ",(0,o.jsx)(t.a,{href:"../file",children:(0,o.jsx)(t.code,{children:"rekalogika/file"})})," framework that handles file uploads\nand so much more. It also utilizes this library behind the scenes."]})}),"\n",(0,o.jsx)(t.h2,{id:"reconstitution-of-a-class",children:"Reconstitution of a Class"}),"\n",(0,o.jsx)(t.p,{children:"This will apply to objects that are instances of a specific class, subclasses\nof a specific class, or implement a specific interface."}),"\n",(0,o.jsxs)(t.p,{children:["Suppose you have an ",(0,o.jsx)(t.code,{children:"Order"})," object that stores a payment receipt in the\n",(0,o.jsx)(t.code,{children:"paymentReceipt"})," property:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-php",children:"use Symfony\\Component\\HttpFoundation\\File\\File;\nuse Symfony\\Component\\Uid\\UuidV7;\n\nclass Order\n{\n    private string $id;\n    private ?File $paymentReceipt = null;\n\n    public function __construct()\n    {\n        $this->id = new UuidV7;\n    }\n\n    public function getId(): string\n    {\n        return $this->id;\n    }\n\n    public function getPaymentReceipt(): ?File\n    {\n        return $this->paymentReceipt;\n    }\n\n    public function setPaymentReceipt(File $paymentReceipt): void\n    {\n        $this->paymentReceipt = $paymentReceipt;\n    }\n}\n"})}),"\n",(0,o.jsx)(t.admonition,{type:"note",children:(0,o.jsx)(t.p,{children:"In the above class, Doctrine related attributes are omitted for brevity."})}),"\n",(0,o.jsxs)(t.p,{children:["During the fetching of the object from the database, Doctrine will instantiate\nthe object and hydrate ",(0,o.jsx)(t.code,{children:"$id"})," and other properties that it manages. Afterward, it\nwill be our reconstitutor's turn to handle the ",(0,o.jsx)(t.code,{children:"$paymentReceipt"})," property.\nSimilar things also happen when the object is persisted to the database, or\nremoved."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Reconstitutor\\AbstractClassReconstitutor;\nuse Symfony\\Component\\HttpFoundation\\File\\File;\n\n/**\n * @extends AbstractClassReconstitutor<Order>\n */\nfinal class OrderReconstitutor extends AbstractClassReconstitutor\n{\n    /**\n     * The class that this reconstitutor manages. It can also be a super class\n     * or an interface.\n     */\n    public static function getClass(): string\n    {\n        return Order::class;\n    }\n\n    /**\n     * When the object is being saved, we check if the paymentReceipt has been\n     * just uploaded. If it is, we save it to a file.\n     */\n    public function onSave(object $order): void\n    {\n        $path = sprintf('/tmp/payment_receipt/%s', $order->getId());\n\n        $file = $this->get($order, 'paymentReceipt');\n\n        if ($file instanceof UploadedFile) {\n            file_put_contents($path, $file->getContent());\n            $this->set($order, 'paymentReceipt', new File($path));\n        }\n    }\n\n    /**\n     * When the object is being loaded from the database, we check if the\n     * supposed payment receipt is already saved. If it is, then we load the\n     * file to the property.\n     */\n    public function onLoad(object $order): void\n    {\n        $path = sprintf('/tmp/payment_receipt/%s', $order->getId());\n\n        if (file_exists($path)) {\n            $file = new File($path);\n        } else {\n            $file = null;\n        }\n\n        $this->set($order, 'paymentReceipt', $file);\n    }\n\n    /**\n     * If the order is being removed, we remove the associated payment receipt\n     * here.\n     */\n    public function onRemove(object $order): void\n    {\n        $path = sprintf('/tmp/payment_receipt/%s', $order->getId());\n\n        if (file_exists($path)) {\n            unlink($path);\n        }\n    }\n}\n"})}),"\n",(0,o.jsx)(t.h2,{id:"reconstitution-of-classes-with-a-specific-php-attribute",children:"Reconstitution of Classes With a Specific PHP Attribute"}),"\n",(0,o.jsx)(t.p,{children:"Alternatively, you can also target classes with a specific PHP attribute. The\nfollowing modifies above example to use an attribute for targeting."}),"\n",(0,o.jsx)(t.p,{children:"The entity class:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-php",children:"use Symfony\\Component\\HttpFoundation\\File\\File;\nuse Symfony\\Component\\Uid\\UuidV7;\n\n// highlight-next-line\n#[MyAttribute]\nclass Order\n{\n    // ...\n}\n"})}),"\n",(0,o.jsx)(t.p,{children:"And the reconstitutor class:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-php",children:"use Rekalogika\\Reconstitutor\\AbstractAttributeReconstitutor;\nuse Symfony\\Component\\HttpFoundation\\File\\File;\n\nfinal class OrderReconstitutor extends AbstractAttributeReconstitutor\n{\n    /**\n     * If the object has this attribute, then we are going to handle it.\n     */\n    // highlight-start\n    public static function getAttributeClass(): string\n    {\n        return MyAttribute::class;\n    }\n    // highlight-end\n\n    public function onSave(object $order): void\n    {\n        // ...\n    }\n\n    public function onLoad(object $order): void\n    {\n        // ...\n    }\n\n    public function onRemove(object $order): void\n    {\n        // ...\n    }\n}\n"})}),"\n",(0,o.jsxs)(t.h2,{id:"get-and-set-helpers",children:[(0,o.jsx)(t.code,{children:"get()"})," and ",(0,o.jsx)(t.code,{children:"set()"})," Helpers"]}),"\n",(0,o.jsxs)(t.p,{children:["In reconstitution, you should get and set the object's properties directly,\nbypassing the getters and setters, just like what Doctrine does. To help you\nwith that, the abstract classes provide the ",(0,o.jsx)(t.code,{children:"get()"})," and ",(0,o.jsx)(t.code,{children:"set()"})," helpers."]}),"\n",(0,o.jsxs)(t.p,{children:["These are just forwarders to our custom implementation of the familiar Symfony\nPropertyAccess (see ",(0,o.jsx)(t.a,{href:"../direct-property-access",children:"rekalogika/direct-property-access"}),"\nfor more information). Therefore, you can catch the same exceptions as you would\nwhen using the original Symfony PropertyAccess."]}),"\n",(0,o.jsxs)(t.h2,{id:"caveat-avoid-querytoiterable",children:["Caveat: Avoid ",(0,o.jsx)(t.code,{children:"Query::toIterable"})]}),"\n",(0,o.jsxs)(t.p,{children:["Doctrine's documentation ",(0,o.jsxs)(t.a,{href:"https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/batch-processing.html#iterating-results",children:["recommends using\n",(0,o.jsx)(t.code,{children:"Query::toIterable()"})]}),"\nto iterate over large result sets. However, using ",(0,o.jsx)(t.code,{children:"Query::toIterable()"})," may\n",(0,o.jsxs)(t.a,{href:"https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/events.html#postload",children:["prevent the triggering of the ",(0,o.jsx)(t.code,{children:"postLoad"})," event\nhandlers"]}),",\nand may prevent our reconstitutors from working correctly."]}),"\n",(0,o.jsxs)(t.p,{children:["We recommend using our ",(0,o.jsx)(t.code,{children:"rekalogika/rekapager"})," package instead. Read more in our\n",(0,o.jsx)(t.a,{href:"/rekapager/batch-processing",children:"batch processing"})," documentation."]})]})}function p(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>a});var i=n(6540);const o={},s=i.createContext(o);function r(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);