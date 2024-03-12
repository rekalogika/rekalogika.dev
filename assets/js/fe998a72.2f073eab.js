"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[1043],{2945:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var a=t(5893),i=t(1151),o=t(4866),r=t(5162);const s={title:"Introduction & Installation"},l=void 0,c={id:"domain-event/intro",title:"Introduction & Installation",description:"An implementation of domain event pattern for Symfony & Doctrine.",source:"@site/docs/domain-event/00-intro.md",sourceDirName:"domain-event",slug:"/domain-event/intro",permalink:"/domain-event/intro",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/domain-event/00-intro.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{title:"Introduction & Installation"},sidebar:"docs",previous:{title:"rekalogika/domain-event",permalink:"/domain-event/"},next:{title:"Outbox Installation & Configuration",permalink:"/domain-event/outbox-setup"}},u={},d=[{value:"What is a Domain Event?",id:"what-is-a-domain-event",level:2},{value:"Why Use Domain Events?",id:"why-use-domain-events",level:2},{value:"Features",id:"features",level:2},{value:"To Do",id:"to-do",level:2},{value:"Synopsis",id:"synopsis",level:2},{value:"Installation",id:"installation",level:2},{value:"License",id:"license",level:2},{value:"Contributing",id:"contributing",level:2}];function h(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"An implementation of domain event pattern for Symfony & Doctrine."}),"\n",(0,a.jsx)(n.h2,{id:"what-is-a-domain-event",children:"What is a Domain Event?"}),"\n",(0,a.jsx)(n.p,{children:"A domain event is simply a regular event like you would normally use with\nSymfony's EventDispatcher. The difference is that a domain event represents\nsomething that has happened in your domain. It has a name that is meaningful to\nthe underlying business that the domain represents. A domain event is usually\ndispatched by your entities, as opposed to being dispatched from your\ncontrollers or other services."}),"\n",(0,a.jsx)(n.h2,{id:"why-use-domain-events",children:"Why Use Domain Events?"}),"\n",(0,a.jsx)(n.p,{children:'A domain event represents a business event that has happened. It is a good way\nto model the business requirements that say "when something happens, do this".'}),"\n",(0,a.jsx)(n.p,{children:"A domain event is raised by the part of your code where the event is actually\nhappening. Different part of your application might call the same method on an\nentity. In some cases, the method is called indirectly, and the caller has no\nidea that it is being called. By using domain events, the event will be\ndispatched in all the cases. No need to make sure to dispatch the event from all\nthe different places where the method is called."}),"\n",(0,a.jsxs)(n.p,{children:["The application layer (controllers, services) can tell an entity to do\nsomething, but it cannot reliably know if the action is actually performed, or\nif an additional action is performed. A controller or a service can ask\n",(0,a.jsx)(n.code,{children:"$bookshelf->removeBook($book)"}),", but only the ",(0,a.jsx)(n.code,{children:"$bookshelf"})," knows if the book was\nactually removed. And if the event actually happened, the entity can tell the\nworld about it by recording a ",(0,a.jsx)(n.code,{children:"BookRemoved"})," event."]}),"\n",(0,a.jsx)(n.p,{children:"Some problems might tempt you to inject a service into your entity. With domain\nevents, you can avoid that. Your entity can dispatch an event, and you can set\nup a listener to react to that event. The relevant services can then correctly\nact on your entity, instead of the other way around."}),"\n",(0,a.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Works out of the box. No configuration is required for basic features."}),"\n",(0,a.jsx)(n.li,{children:"Simple, unopinionated architecture. Uses plain event objects, and doesn't\nrequire much from your domain entities."}),"\n",(0,a.jsx)(n.li,{children:"Uses standard Symfony's EventDispatcher, with the same dispatching semantics\n& listener registrations."}),"\n",(0,a.jsx)(n.li,{children:"Transaction support."}),"\n",(0,a.jsx)(n.li,{children:"Works with multiple entity managers."}),"\n",(0,a.jsx)(n.li,{children:"Multiple events considered identical are dispatched only once."}),"\n",(0,a.jsx)(n.li,{children:"Four listening strategies: immediate, pre-flush, post-flush, and event bus."}),"\n",(0,a.jsx)(n.li,{children:"Uses Symfony Messenger as the event bus implementation."}),"\n",(0,a.jsx)(n.li,{children:"Utilizes the transactional outbox pattern when publishing events to the event\nbus to guarantee consistency and delivery."}),"\n",(0,a.jsx)(n.li,{children:"Utilizes Symfony Scheduler to relay undelivered events to the event bus."}),"\n",(0,a.jsx)(n.li,{children:"Does not require you to change how you work with entities."}),"\n",(0,a.jsx)(n.li,{children:"Should work everywhere without any change: in controllers, message handlers,\ncommand line, etc."}),"\n",(0,a.jsx)(n.li,{children:"Separated contracts & framework. Useful for enforcing architectural\nboundaries. Your domain doesn't have to depend on the framework."}),"\n",(0,a.jsx)(n.li,{children:"Symfony Profiler integration. Debug your events in the profiler's events\npanel."}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"to-do",children:"To Do"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Support for Doctrine MongoDB ODM."}),"\n",(0,a.jsx)(n.li,{children:"Support event inheritance."}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"synopsis",children:"Synopsis"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"//\n// The event\n//\n\nfinal readonly class PostChanged\n{\n    public function __construct(public string $postId) {}\n}\n\n//\n// The entity\n//\n\nuse Rekalogika\\Contracts\\DomainEvent\\DomainEventEmitterInterface;\nuse Rekalogika\\Contracts\\DomainEvent\\DomainEventEmitterTrait;\n\nclass Post implements DomainEventEmitterInterface\n{\n    use DomainEventAwareEntityTrait;\n    \n    // ...\n\n    public function setTitle(string $title): void\n    {\n        $this->title = $title;\n        // highlight-next-line\n        $this->recordEvent(new PostChanged($this->id));\n    }\n\n    // ...\n}\n\n//\n// The listener\n//\n\nuse Psr\\Log\\LoggerInterface;\nuse Rekalogika\\Contracts\\DomainEvent\\Attribute\\AsPostFlushDomainEventListener;\n\nclass PostEventListener\n{\n    public function __construct(private LoggerInterface $logger) {}\n    \n    // highlight-next-line\n    #[AsPostFlushDomainEventListener]\n    public function onPostChanged(PostChanged $event) {\n        $postId = $event->postId;\n\n        $this->logger->info(\"Post $postId has been changed.\");\n    }\n}\n\n//\n// The caller\n//\n\nuse Doctrine\\ORM\\EntityManagerInterface;\n\n/** @var Post $post */\n/** @var EntityManagerInterface $entityManager */\n\n$post->setTitle('New title');\n$entityManager->flush();\n// the event is dispatched after the flush above, and a message will\n// appear in the log file\n"})}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsxs)(n.p,{children:["Make sure Composer is installed globally, as explained in the\n",(0,a.jsx)(n.a,{href:"https://getcomposer.org/doc/00-intro.md",children:"installation chapter"}),"\nof the Composer documentation."]}),"\n",(0,a.jsxs)(o.Z,{children:[(0,a.jsxs)(r.Z,{value:"flex",label:"With Symfony Flex",children:[(0,a.jsx)(n.p,{children:"Open a command console, enter your project directory and execute:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/domain-event\n"})})]}),(0,a.jsxs)(r.Z,{value:"noflex",label:"Without Symfony Flex",children:[(0,a.jsx)(n.p,{children:"Step 1: Download the Bundle"}),(0,a.jsx)(n.p,{children:"Open a command console, enter your project directory, and execute the\nfollowing command to download the latest stable version of this bundle:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"composer require rekalogika/domain-event\n"})}),(0,a.jsx)(n.p,{children:"Step 2: Enable the Bundle"}),(0,a.jsxs)(n.p,{children:["Then, enable the bundle by adding it to the list of registered bundles\nin the ",(0,a.jsx)(n.code,{children:"config/bundles.php"})," file of your project:"]}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",metastring:'title="config/bundles.php"',children:"return [\n    // ...\n    Rekalogika\\DomainEvent\\RekalogikaDomainEventBundle::class => ['all' => true],\n];\n"})})]})]}),"\n",(0,a.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,a.jsx)(n.p,{children:"MIT"}),"\n",(0,a.jsx)(n.h2,{id:"contributing",children:"Contributing"}),"\n",(0,a.jsxs)(n.p,{children:["This framework consists of multiple repositories split from a monorepo. Be\nsure to submit issues and pull requests to the\n",(0,a.jsx)(n.a,{href:"https://github.com/rekalogika/domain-event-src",children:(0,a.jsx)(n.code,{children:"rekalogika/domain-event-src"})})," monorepo."]})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},5162:(e,n,t)=>{t.d(n,{Z:()=>r});t(7294);var a=t(6905);const i={tabItem:"tabItem_Ymn6"};var o=t(5893);function r(e){let{children:n,hidden:t,className:r}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,a.Z)(i.tabItem,r),hidden:t,children:n})}},4866:(e,n,t)=>{t.d(n,{Z:()=>k});var a=t(7294),i=t(6905),o=t(2466),r=t(6550),s=t(469),l=t(1980),c=t(7392),u=t(12);function d(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,a.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:t,attributes:a,default:i}}=e;return{value:n,label:t,attributes:a,default:i}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:t}=e;const i=(0,r.k6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l._X)(o),(0,a.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(i.location.search);n.set(o,e),i.replace({...i.location,search:n.toString()})}),[o,i])]}function v(e){const{defaultValue:n,queryString:t=!1,groupId:i}=e,o=h(e),[r,l]=(0,a.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const a=t.find((e=>e.default))??t[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:n,tabValues:o}))),[c,d]=m({queryString:t,groupId:i}),[v,f]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,o]=(0,u.Nk)(t);return[i,(0,a.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:i}),g=(()=>{const e=c??v;return p({value:e,tabValues:o})?e:null})();(0,s.Z)((()=>{g&&l(g)}),[g]);return{selectedValue:r,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),f(e)}),[d,f,o]),tabValues:o}}var f=t(2389);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=t(5893);function y(e){let{className:n,block:t,selectedValue:a,selectValue:r,tabValues:s}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),u=e=>{const n=e.currentTarget,t=l.indexOf(n),i=s[t].value;i!==a&&(c(n),r(i))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":t},n),children:s.map((e=>{let{value:n,label:t,attributes:o}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:a===n?0:-1,"aria-selected":a===n,ref:e=>l.push(e),onKeyDown:d,onClick:u,...o,className:(0,i.Z)("tabs__item",g.tabItem,o?.className,{"tabs__item--active":a===n}),children:t??n},n)}))})}function x(e){let{lazy:n,children:t,selectedValue:i}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===i));return e?(0,a.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,a.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function j(e){const n=v(e);return(0,b.jsxs)("div",{className:(0,i.Z)("tabs-container",g.tabList),children:[(0,b.jsx)(y,{...e,...n}),(0,b.jsx)(x,{...e,...n})]})}function k(e){const n=(0,f.Z)();return(0,b.jsx)(j,{...e,children:d(e.children)},String(n))}},1151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>r});var a=t(7294);const i={},o=a.createContext(i);function r(e){const n=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),a.createElement(o.Provider,{value:n},e.children)}}}]);