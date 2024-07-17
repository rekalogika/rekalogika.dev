"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[8465],{6991:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var a=t(5893),o=t(1151);const i={title:"Simple Batch Command"},r=void 0,s={id:"rekapager/batch-processing/batch-command",title:"Simple Batch Command",description:"Create a console command for processing batch jobs.",source:"@site/docs/rekapager/04-batch-processing/02-batch-command.md",sourceDirName:"rekapager/04-batch-processing",slug:"/rekapager/batch-processing/batch-command",permalink:"/rekapager/batch-processing/batch-command",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/04-batch-processing/02-batch-command.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Simple Batch Command"},sidebar:"docs",previous:{title:"Using Pageable for Batch Processing",permalink:"/rekapager/batch-processing/pageable"},next:{title:"Known Issues and Limitations",permalink:"/rekapager/known-issues"}},c={},l=[{value:"Requirements",id:"requirements",level:2},{value:"Features",id:"features",level:2},{value:"Quick Start",id:"quick-start",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.p,{children:"Create a console command for processing batch jobs."}),"\n",(0,a.jsx)(n.p,{children:"In most cases, we will create a console command to run our batch jobs. So, it\nmakes sense to make this process as streamlined as possible, with as many common\nfeatures built-in as possible."}),"\n",(0,a.jsx)(n.h2,{id:"requirements",children:"Requirements"}),"\n",(0,a.jsxs)(n.p,{children:["This feature uses Symfony Console. Therefore, you need the ",(0,a.jsx)(n.a,{href:"../framework-integration/symfony",children:"Symfony integration"}),"\nor ",(0,a.jsx)(n.a,{href:"../framework-integration/api-platform",children:"API Platform integration"}),", or both."]}),"\n",(0,a.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Easy to create. You provide the ",(0,a.jsx)(n.code,{children:"PageableInterface"})," object, and the logic to\nprocess each item. The framework takes care of the rest."]}),"\n",(0,a.jsx)(n.li,{children:"Informative UI. You get time elapsed and memory usage on each page, as well as\nstatistics every 15 seconds."}),"\n",(0,a.jsxs)(n.li,{children:["Resumable. The UI provides the information about page identifiers on every\nopportunity, and you can use the ",(0,a.jsx)(n.code,{children:"--resume"})," or ",(0,a.jsx)(n.code,{children:"-r"})," option to resume the\nprocess from the specified page identifier."]}),"\n",(0,a.jsxs)(n.li,{children:["Override the page size (the number of items on each batch) using the\n",(0,a.jsx)(n.code,{children:"--page-size"})," or ",(0,a.jsx)(n.code,{children:"-p"})," command line option."]}),"\n",(0,a.jsxs)(n.li,{children:["Progress file. Specify the progress file using the ",(0,a.jsx)(n.code,{children:"--progress-file"})," or ",(0,a.jsx)(n.code,{children:"-f"}),"\ncommand line option. The command will store the last page identifier to this\nfile. The next invocation of the command will resume from this page."]}),"\n",(0,a.jsxs)(n.li,{children:["Time limit. Runs the batch up to the duration specified using the\n",(0,a.jsx)(n.code,{children:"--time-limit"})," or ",(0,a.jsx)(n.code,{children:"-t"})," command line option."]}),"\n",(0,a.jsxs)(n.li,{children:["Signal handling. The command listens to the ",(0,a.jsx)(n.code,{children:"SIGINT"})," signal (Ctrl+C) and\n",(0,a.jsx)(n.code,{children:"SIGTERM"}),". It will finish the current page before exiting, so your job will\nhave a consistent state."]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"quick-start",children:"Quick Start"}),"\n",(0,a.jsx)(n.p,{children:"Creating a console command for processing batch jobs is as easy as:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-php",children:"use Doctrine\\ORM\\EntityManagerInterface;\nuse Doctrine\\Common\\Collections\\Criteria;\nuse Doctrine\\Common\\Collections\\Order;\nuse Rekalogika\\Contracts\\Rekapager\\PageableInterface;\nuse Rekalogika\\Rekapager\\Batch\\Event\\AfterPageEvent;\nuse Rekalogika\\Rekapager\\Batch\\Event\\ItemEvent;\nuse Rekalogika\\Rekapager\\Doctrine\\Collections\\SelectableAdapter;\nuse Rekalogika\\Rekapager\\Keyset\\KeysetPageable;\nuse Rekalogika\\Rekapager\\Symfony\\Batch\\SimpleBatchCommand;\nuse Symfony\\Component\\Console\\Attribute\\AsCommand;\nuse Symfony\\Component\\Console\\Input\\InputInterface;\nuse Symfony\\Component\\Console\\Output\\OutputInterface;\n\n/**\n * @extends SimpleBatchCommand<int,Post>\n */\n#[AsCommand(\n    name: 'app:postbatch',\n    description: 'Simple batch command for processing the Post entities'\n)]\nclass AppSimpleBatchCommand extends SimpleBatchCommand\n{\n    public function __construct(\n        private readonly PostRepository $postRepository,\n        private readonly EntityManagerInterface $entityManager,\n    ) {\n        parent::__construct();\n    }\n\n    protected function configure(): void\n    {\n        // set up the command arguments and options here, just like any other\n        // Symfony console command\n    }\n\n    protected function getPageable(\n        InputInterface $input,\n        OutputInterface $output\n    ): PageableInterface {\n        // procure a pageable object here, you can use the $input and $output\n        // if necessary\n\n        $adapter = new SelectableAdapter(\n            selectable: $this->postRepository,\n            criteria: Criteria::create()->orderBy(['id' => Order::Ascending])\n        );\n\n        return new KeysetPageable($adapter);\n    }\n\n    public function processItem(ItemEvent $itemEvent): void\n    {\n        $item = $itemEvent->getItem();\n\n        // do something with $item here\n    }\n\n    public function afterPage(AfterPageEvent $event): void\n    {\n        // do something after each page here\n\n        $this->entityManager->flush(); // if required\n        $this->entityManager->clear();\n    }\n}\n"})})]})}function m(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>r});var a=t(7294);const o={},i=a.createContext(o);function r(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);