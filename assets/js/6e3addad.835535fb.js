"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[4292],{6428:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>c,frontMatter:()=>a,metadata:()=>r,toc:()=>l});var o=t(5893),s=t(1151);const a={title:"Troubleshooting"},i=void 0,r={id:"rekapager/troubleshooting",title:"Troubleshooting",description:"Common issues and how to solve them.",source:"@site/docs/rekapager/10-troubleshooting.md",sourceDirName:"rekapager",slug:"/rekapager/troubleshooting",permalink:"/rekapager/troubleshooting",draft:!1,unlisted:!1,editUrl:"https://github.com/rekalogika/rekalogika-docs/edit/main/docs/rekapager/10-troubleshooting.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"Troubleshooting"},sidebar:"docs",previous:{title:"Known Issues",permalink:"/rekapager/known-issues"},next:{title:"rekalogika/temporary-url-bundle",permalink:"/temporary-url-bundle/"}},d={},l=[{value:"Wonky Pager",id:"wonky-pager",level:2},{value:"Slow First (and Last) Page",id:"slow-first-and-last-page",level:2},{value:"Solution 1: Create an Index",id:"solution-1-create-an-index",level:3},{value:"Solution 2: Add the Boundaries to the Query",id:"solution-2-add-the-boundaries-to-the-query",level:3}];function h(e){const n={admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"Common issues and how to solve them."}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsx)(n.p,{children:"For clarity, the examples below uses plain SQL queries. The same principles\napply to any database-backed adapters."})}),"\n",(0,o.jsx)(n.h2,{id:"wonky-pager",children:"Wonky Pager"}),"\n",(0,o.jsx)(n.p,{children:"If you are using keyset pagination and the pager is not working as expected, as\nlike going to page 5 lands you on page 3 or 8, or it skips some entries when\ngoing to the next page, etc; the most common cause is that the query lacks a\ndeterministic sort order."}),"\n",(0,o.jsx)(n.p,{children:"For example:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"SELECT *\nFROM posts\nORDER BY createdDate DESC\n"})}),"\n",(0,o.jsxs)(n.p,{children:["The above query does not have a deterministic sort order. If two posts have the\nsame ",(0,o.jsx)(n.code,{children:"createdDate"}),", then the sort result is non-deterministic, the database\nengine is free to return them in any order. Because the pager uses the fields\nmentioned in the ",(0,o.jsx)(n.code,{children:"ORDER BY"})," clause to determine the page boundaries, the pager\nwill not work correctly."]}),"\n",(0,o.jsxs)(n.p,{children:["To fix this, the easiest way is to ensure the last field in the ",(0,o.jsx)(n.code,{children:"ORDER BY"}),"\nclause is the primary key. For example, to fix the query above, we can change\nit to:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"SELECT *\nFROM posts\nORDER BY createdDate DESC, id DESC\n"})}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsx)(n.p,{children:"There is no way for the pager to ensure your query has a deterministic\nsort order."})}),"\n",(0,o.jsx)(n.h2,{id:"slow-first-and-last-page",children:"Slow First (and Last) Page"}),"\n",(0,o.jsx)(n.p,{children:"If you are using keyset pagination, but the first (and last) page feels slower\nthan the rest, usually it is because the query requires further optimization."}),"\n",(0,o.jsx)(n.p,{children:"A common example:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"SELECT *\nFROM comments\nWHERE post_id = 123\nORDER BY id ASC\n"})}),"\n",(0,o.jsx)(n.p,{children:"If the amount of comments for a post is large, the database might prefer to scan\nthe entire index to find the comments for post 123. Other pages are not affected\nmuch because the pager adds an anchor that the database uses to start looking\nfor the entries."}),"\n",(0,o.jsx)(n.p,{children:"To show a non-first page, the pager will modify the query above to something\nlike:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"SELECT *\nFROM comments\nWHERE post_id = 123\n    AND id > 1234\nORDER BY id ASC\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Where ",(0,o.jsx)(n.code,{children:"1234"})," is the ID of the last comment on the previous page. This query will\nbe much faster because the database can easily locate the starting point and\nskip all the comments before the anchor."]}),"\n",(0,o.jsx)(n.h3,{id:"solution-1-create-an-index",children:"Solution 1: Create an Index"}),"\n",(0,o.jsxs)(n.p,{children:["You can optimize the query by adding a composite index on the ",(0,o.jsx)(n.code,{children:"post_id"})," and ",(0,o.jsx)(n.code,{children:"id"}),"\nfield:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"CREATE INDEX idx_comments_post_id_id ON comments (post_id, id)\n"})}),"\n",(0,o.jsx)(n.h3,{id:"solution-2-add-the-boundaries-to-the-query",children:"Solution 2: Add the Boundaries to the Query"}),"\n",(0,o.jsx)(n.p,{children:"Alternatively, you can also try adding the boundary to the first and last page\nyourself:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sql",children:"SELECT *\nFROM comments\nWHERE post_id = 123\n    AND id >= 1000\n    AND id <= 2000\nORDER BY id ASC\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Where ",(0,o.jsx)(n.code,{children:"1000"})," is the ID of the first comment on the page, and ",(0,o.jsx)(n.code,{children:"2000"})," is that of\nthe last comment. Obviously, with this solution you need to have the IDs\nbeforehand, maybe by storing the IDs in the ",(0,o.jsx)(n.code,{children:"posts"})," table."]})]})}function c(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>r,a:()=>i});var o=t(7294);const s={},a=o.createContext(s);function i(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);