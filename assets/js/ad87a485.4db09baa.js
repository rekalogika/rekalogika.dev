"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[6788],{815:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>d});var i=t(5893),s=t(1151);const a={title:"Testing"},o=void 0,r={id:"domain-event/testing",title:"Testing",description:"Undispatched Event Problem",source:"@site/docs/domain-event/08-testing.md",sourceDirName:"domain-event",slug:"/domain-event/testing",permalink:"/domain-event/testing",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/domain-event/08-testing.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{title:"Testing"},sidebar:"docs",previous:{title:"Dispatch Events",permalink:"/domain-event/dispatch-events"},next:{title:"Transactional Outbox Pattern",permalink:"/domain-event/transactional-outbox-pattern"}},c={},d=[{value:"Undispatched Event Problem",id:"undispatched-event-problem",level:2},{value:"Immediate Dispatcher in Unit Tests",id:"immediate-dispatcher-in-unit-tests",level:2}];function l(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"undispatched-event-problem",children:"Undispatched Event Problem"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Rekalogika\\DomainEvent\\Exception\\UndispatchedEventsException"}),": There are\nstill 1 undispatched domain events. If you disable autodispatch, you have to\ndispatch them manually or clear them."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Our entity manager checks if there are any undispatched domain events in\n",(0,i.jsx)(n.code,{children:"__destroy()"}),". If there are, it throws an exception. This poses a problem in\nunit tests, especially with negative tests."]}),"\n",(0,i.jsxs)(n.p,{children:["To prevent the problem, you need to prevent entity manager from going out of\nscope. In ",(0,i.jsx)(n.code,{children:"setUp()"}),", save the entity manager to a property, then in\n",(0,i.jsx)(n.code,{children:"tearDown()"}),", call ",(0,i.jsx)(n.code,{children:"clearUndispatchedEvents()"})," on the entity manager."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use Symfony\\Bundle\\FrameworkBundle\\Test\\KernelTestCase;\nuse Rekalogika\\DomainEvent\\DomainEventAwareEntityManagerInterface;\n\nclass SomeTest extends KernelTestCase\n{\n    protected DomainEventAwareEntityManagerInterface $entityManager;\n\n    public function setUp(): void\n    {\n        parent::setUp();\n\n        $this->entityManager = self::getContainer()->get(DomainEventAwareEntityManagerInterface::class);\n    }\n\n    public function tearDown(): void\n    {\n        $this->entityManager->clearUndispatchedEvents();\n\n        parent::tearDown();\n    }\n\n    // ...\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"immediate-dispatcher-in-unit-tests",children:"Immediate Dispatcher in Unit Tests"}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"RuntimeException"}),": ImmediateDomainEventDispatcher has not been initialized."]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Immediate event dispatcher works by installing the event dispatcher to a static\nvariable. This installation happens during the kernel boot."}),"\n",(0,i.jsx)(n.p,{children:"If the kernel is not booted, there is no opportunity to install the event\ndispatcher. This usually happens only in isolated unit tests. To address the\nproblem, you can install a stub event dispatcher manually like this."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-php",children:"use PHPUnit\\Framework\\TestCase;\nuse Rekalogika\\DomainEvent\\ImmediateDomainEventDispatcherInstaller;\nuse Symfony\\Component\\EventDispatcher\\EventDispatcher;\n\nclass SomeTest extends TestCase\n{\n    public function setUp(): void\n    {\n        $installer = new ImmediateDomainEventDispatcherInstaller(new EventDispatcher);\n        $installer->install();\n    }\n\n    // ...\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"The stub dispatcher doesn't do anything. If you want to test the dispatching,\nyou need to get the real dispatcher from the container."})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["This is not necessary if your test extends ",(0,i.jsx)(n.code,{children:"KernelTestCase"})," because it will boot\nthe kernel for you automatically."]})})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>o});var i=t(7294);const s={},a=i.createContext(s);function o(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);