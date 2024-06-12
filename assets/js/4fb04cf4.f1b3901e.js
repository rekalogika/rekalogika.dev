"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[2735],{2951:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>h});var s=n(5893),a=n(1151);const o={title:"Transactional Outbox Pattern"},r=void 0,i={id:"domain-event/transactional-outbox-pattern",title:"Transactional Outbox Pattern",description:"The package rekalogika/domain-event-outbox implements the transactional outbox",source:"@site/docs/domain-event/09-transactional-outbox-pattern.md",sourceDirName:"domain-event",slug:"/domain-event/transactional-outbox-pattern",permalink:"/domain-event/transactional-outbox-pattern",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/domain-event/09-transactional-outbox-pattern.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{title:"Transactional Outbox Pattern"},sidebar:"docs",previous:{title:"Testing",permalink:"/domain-event/testing"},next:{title:"Batch Processing",permalink:"/domain-event/batch-processing"}},l={},h=[{value:"How It Works",id:"how-it-works",level:2},{value:"Comparison with the Post-Flush Strategy",id:"comparison-with-the-post-flush-strategy",level:2},{value:"Message Relay",id:"message-relay",level:2},{value:"Message Preparer",id:"message-preparer",level:2}];function c(e){const t={code:"code",h2:"h2",li:"li",ol:"ol",p:"p",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["The package ",(0,s.jsx)(t.code,{children:"rekalogika/domain-event-outbox"})," implements the transactional outbox\npattern. It publishes the events as part of a database transaction by saving\nthem to the outbox table. This mechanism guarantees integrity and delivery."]}),"\n",(0,s.jsx)(t.h2,{id:"how-it-works",children:"How It Works"}),"\n",(0,s.jsxs)(t.p,{children:["During the same time as the pre-flush phase, for each of the domain events, the\nframework wraps the event in a Symfony Messenger ",(0,s.jsx)(t.code,{children:"Envelope"}),", and then in an\n",(0,s.jsx)(t.code,{children:"OutboxMessage"})," object. Then, it calls the entity manager to persist the\n",(0,s.jsx)(t.code,{children:"OutboxMessage"})," object."]}),"\n",(0,s.jsxs)(t.p,{children:["When ",(0,s.jsx)(t.code,{children:"flush()"})," or ",(0,s.jsx)(t.code,{children:"commit()"})," is finally called, Doctrine will save the\n",(0,s.jsx)(t.code,{children:"OutboxMessage"})," objects in the same transaction as the rest of the changes to\nthe domain entities. This guarantees that the events are published only if the\ntransaction is successful."]}),"\n",(0,s.jsx)(t.p,{children:"When the message relay is executed. It reads the outbox table, publishes the\nevents to the event bus, and removes the events from the outbox table."}),"\n",(0,s.jsx)(t.h2,{id:"comparison-with-the-post-flush-strategy",children:"Comparison with the Post-Flush Strategy"}),"\n",(0,s.jsx)(t.p,{children:"With the post-flush strategy, if an error happens during the dispatching, then\nthe event will be lost."}),"\n",(0,s.jsx)(t.p,{children:"In contrast, the transactional outbox pattern guarantees that the event will be\ndelivered. If an error happens, both the events and the entire changes to the\ndomain model will not be committed to the database. Because all the other\nchanges are rolled back, the discarded events would have been invalid anyway,\nand should not be delivered."}),"\n",(0,s.jsx)(t.h2,{id:"message-relay",children:"Message Relay"}),"\n",(0,s.jsx)(t.p,{children:"Message relay's job is to read the outbox table, publish the events to the event\nbus, and remove the events from the outbox table. The message relay is executed\nusing the following mechanisms:"}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:["Using the ",(0,s.jsx)(t.code,{children:"kernel.terminate"})," and ",(0,s.jsx)(t.code,{children:"console.terminate"})," events, a listener\nchecks if there are new messages sent to the outbox in the current session.\nIf there are, it tells the message relay to run using Symfony Messenger bus."]}),"\n",(0,s.jsx)(t.li,{children:"Using Symfony Scheduler, the message relay is executed every hour. This is\nmainly used for safety, in case the above mechanism failed to execute for\nwhatever reason."}),"\n",(0,s.jsxs)(t.li,{children:["Manually, using the console command ",(0,s.jsx)(t.code,{children:"bin/console rekalogika:domain-event:relay"}),"."]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"message-preparer",children:"Message Preparer"}),"\n",(0,s.jsxs)(t.p,{children:["When the domain events are being saved to the outbox table, the message preparer\nservices are executed to prepare the events. By default, it adds the\n",(0,s.jsx)(t.code,{children:"UserIdentifierStamp"})," to the envelope. You can add your own message preparer by\nimplementing the ",(0,s.jsx)(t.code,{children:"MessagePreparerInterface"})," (tag name:\n",(0,s.jsx)(t.code,{children:"rekalogika.domain_event.outbox.message_preparer"}),")"]})]})}function d(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>r});var s=n(7294);const a={},o=s.createContext(a);function r(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);