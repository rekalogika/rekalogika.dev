"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[468],{22:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>d,toc:()=>r});var s=n(5893),i=n(1151);const o={title:"Dispatch Events"},a=void 0,d={id:"domain-event/events",title:"Dispatch Events",description:"When a domain event is dispatched, another event is dispatched. The event wraps",source:"@site/docs/domain-event/04-events.md",sourceDirName:"domain-event",slug:"/domain-event/events",permalink:"/domain-event/events",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/domain-event/04-events.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Dispatch Events"},sidebar:"docs",previous:{title:"Immediate Dispatcher Handling & Troubleshooting",permalink:"/domain-event/immediate-dispatcher"},next:{title:"Tips and Caveats",permalink:"/domain-event/tips"}},c={},r=[{value:"List of the Dispatch Events",id:"list-of-the-dispatch-events",level:2},{value:"Listening to the Dispatch Events",id:"listening-to-the-dispatch-events",level:2},{value:"Purpose",id:"purpose",level:2}];function l(e){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"When a domain event is dispatched, another event is dispatched. The event wraps\nthe original domain event, allowing you to listen to all domain events in a\nsingle listener."}),"\n",(0,s.jsx)(t.p,{children:"These events are dispatched using the default Symfony event dispatcher."}),"\n",(0,s.jsx)(t.h2,{id:"list-of-the-dispatch-events",children:"List of the Dispatch Events"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"DomainEventImmediateDispatchEvent"}),": dispatched immediately after the domain\nevent is recorded."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"DomainEventPreFlushDispatchEvent"}),": dispatched before the ",(0,s.jsx)(t.code,{children:"flush()"})," is called."]}),"\n",(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:"DomainEventPostFlushDispatchEvent"}),": dispatched after the ",(0,s.jsx)(t.code,{children:"flush()"})," is called."]}),"\n"]}),"\n",(0,s.jsx)(t.h2,{id:"listening-to-the-dispatch-events",children:"Listening to the Dispatch Events"}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-php",children:"use Symfony\\Component\\EventDispatcher\\Attribute\\AsEventListener;\n\n#[AsEventListener]\nclass PreFlushDispatchEventListener\n{\n    public function __invoke(DomainEventPreFlushDispatchEvent $event) {\n        // log the $event, publish the $event on an event bus, etc\n    }\n}\n"})}),"\n",(0,s.jsx)(t.h2,{id:"purpose",children:"Purpose"}),"\n",(0,s.jsx)(t.p,{children:"This mechanism is created to allow you to build on top of the domain events. For\nexample, you can record the events for audit trails, or publish the events on an\nevent bus."})]})}function h(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>d,a:()=>a});var s=n(7294);const i={},o=s.createContext(i);function a(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);