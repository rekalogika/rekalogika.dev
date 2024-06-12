"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[7805],{1194:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var i=n(5893),s=n(1151);const a={title:"Tips"},r=void 0,o={id:"domain-event/tips",title:"Tips",description:"This chapter explains the tips and our best practices that others might find",source:"@site/docs/domain-event/21-tips.md",sourceDirName:"domain-event",slug:"/domain-event/tips",permalink:"/domain-event/tips",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/domain-event/21-tips.md",tags:[],version:"current",sidebarPosition:21,frontMatter:{title:"Tips"},sidebar:"docs",previous:{title:"Batch Processing",permalink:"/domain-event/batch-processing"},next:{title:"rekalogika/file",permalink:"/file/"}},c={},l=[{value:"Use UUIDs as Identifiers",id:"use-uuids-as-identifiers",level:2},{value:"Persist Early after Entity Creation",id:"persist-early-after-entity-creation",level:2},{value:"Choosing Dispatching Strategy",id:"choosing-dispatching-strategy",level:2},{value:"No Event Inheritance, Yet",id:"no-event-inheritance-yet",level:2},{value:"Idempotent Event Bus Listeners",id:"idempotent-event-bus-listeners",level:2}];function d(e){const t={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"This chapter explains the tips and our best practices that others might find\nuseful, but not strictly required."}),"\n",(0,i.jsx)(t.h2,{id:"use-uuids-as-identifiers",children:"Use UUIDs as Identifiers"}),"\n",(0,i.jsxs)(t.p,{children:["Use UUIDs as entity identifiers & have the entities generate one for themselves\non instantiation. That means new entities already have an ID before ",(0,i.jsx)(t.code,{children:"flush()"}),"."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-php",children:"use Symfony\\Component\\Uid\\UuidV7;\n\nclass Post\n{\n    private string $id;\n\n    public function __construct(string $title)\n    {\n        $this->id = new UuidV7();\n    }\n\n    // ...\n}\n"})}),"\n",(0,i.jsx)(t.p,{children:"This way, you can reliably store the ID in your event objects, instead of the\nobject itself. Using the ID in the events means your events can be reliably\nserialized. It improves logistics because you can pass them anywhere without\nmodification, and without creating additional event objects."}),"\n",(0,i.jsx)(t.h2,{id:"persist-early-after-entity-creation",children:"Persist Early after Entity Creation"}),"\n",(0,i.jsxs)(t.p,{children:["On entity creation, ",(0,i.jsx)(t.code,{children:"persist()"})," your entities early, and ",(0,i.jsx)(t.code,{children:"flush()"})," late. This is\nespecially important if you are using the immediate listening strategy. It will\nlet your listener obtain the entity instance by calling ",(0,i.jsx)(t.code,{children:"find()"})," on the\nrepository using the entity's identifier."]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-php",children:"$post = new Post();\n$entityManager->persist($post);\n\n$post->setContent('Hello, World!');\n\n$entityManager->flush();\n"})}),"\n",(0,i.jsx)(t.h2,{id:"choosing-dispatching-strategy",children:"Choosing Dispatching Strategy"}),"\n",(0,i.jsx)(t.p,{children:"If you want to do something similar to what you are used to doing with\napplication events, you probably want the post-flush strategy. If you are\nalready using Symfony Messenger, consider using the event bus strategy instead\nfor more reliability."}),"\n",(0,i.jsxs)(t.p,{children:["Use pre-flush events to make alterations to your domain that will be\n",(0,i.jsx)(t.code,{children:"flush()"}),"-ed together along with the other changes."]}),"\n",(0,i.jsx)(t.h2,{id:"no-event-inheritance-yet",children:"No Event Inheritance, Yet"}),"\n",(0,i.jsx)(t.p,{children:"Symfony Event Dispatcher does not currently support event inheritance. This\nneeds to be mentioned because many programmers expect an event dispatcher to\nsupport event inheritance, especially when working with a large amount of event\nobjects."}),"\n",(0,i.jsx)(t.p,{children:"This is not ideal, and we want this feature in the future. But for now, this is\na limitation that you need to be aware of."}),"\n",(0,i.jsx)(t.h2,{id:"idempotent-event-bus-listeners",children:"Idempotent Event Bus Listeners"}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Idempotence",children:"Idempotence"})," is a desirable trait in\nevent bus messaging. This means if a listener receives the same event multiple\ntimes, it should have the same effect as if it received the event only once."]}),"\n",(0,i.jsx)(t.p,{children:"With an event bus, a system failure might cause the same event to be dispatched\nmore than once. An idempotent listener won't cause any harm when that happens."}),"\n",(0,i.jsxs)(t.p,{children:["In simpler cases, you can leverage ",(0,i.jsx)(t.code,{children:"EquatableDomainEventInterface"}),". If your\nevent implements ",(0,i.jsx)(t.code,{children:"EquatableDomainEventInterface"}),", your listener can get the\nevent's signature and store it somewhere. If the event is dispatched again, the\nlistener can check if it has already processed the event."]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>o,a:()=>r});var i=n(7294);const s={},a=i.createContext(s);function r(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);