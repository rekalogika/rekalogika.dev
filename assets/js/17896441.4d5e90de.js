"use strict";(self.webpackChunkrekalogika_docs=self.webpackChunkrekalogika_docs||[]).push([[7918],{3155:(e,o,n)=>{n.d(o,{Z:()=>T});var c=n(7294),t=n(2389),s=n(512),a=n(6412),l=n(5281),i=n(7016);const r={codeBlockContainer:"codeBlockContainer_APcc"};var d=n(5893);function u(e){let{as:o,...n}=e;const c=(0,a.p)(),t=(0,i.QC)(c);return(0,d.jsx)(o,{...n,style:t,className:(0,s.Z)(n.className,r.codeBlockContainer,l.k.common.codeBlock)})}const p={codeBlockContent:"codeBlockContent_m3Ux",codeBlockTitle:"codeBlockTitle_P25_",codeBlock:"codeBlock_qGQc",codeBlockStandalone:"codeBlockStandalone_zC50",codeBlockLines:"codeBlockLines_p187",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_OFgW",buttonGroup:"buttonGroup_6DOT"};function m(e){let{children:o,className:n}=e;return(0,d.jsx)(u,{as:"pre",tabIndex:0,className:(0,s.Z)(p.codeBlockStandalone,"thin-scrollbar",n),children:(0,d.jsx)("code",{className:p.codeBlockLines,children:o})})}var k=n(6668),b=n(5448),B=n(2573);const g={codeLine:"codeLine_iPqp",codeLineNumber:"codeLineNumber_F4P7",codeLineContent:"codeLineContent_pOih"};function h(e){let{line:o,classNames:n,showLineNumbers:c,getLineProps:t,getTokenProps:a}=e;1===o.length&&"\n"===o[0].content&&(o[0].content="");const l=t({line:o,className:(0,s.Z)(n,c&&g.codeLine)}),i=o.map(((e,o)=>(0,d.jsx)("span",{...a({token:e,key:o})},o)));return(0,d.jsxs)("span",{...l,children:[c?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("span",{className:g.codeLineNumber}),(0,d.jsx)("span",{className:g.codeLineContent,children:i})]}):i,(0,d.jsx)("br",{})]})}var N=n(195),C=n(5999),x=n(345),y=n(7666);const j={copyButtonCopied:"copyButtonCopied__QnY",copyButtonIcons:"copyButtonIcons_FhaS",copyButtonIcon:"copyButtonIcon_phi_",copyButtonSuccessIcon:"copyButtonSuccessIcon_FfTR"};function L(e){let{code:o,className:n}=e;const[t,a]=(0,c.useState)(!1),l=(0,c.useRef)(void 0),i=(0,c.useCallback)((()=>{(0,N.Z)(o),a(!0),l.current=window.setTimeout((()=>{a(!1)}),1e3)}),[o]);return(0,c.useEffect)((()=>()=>window.clearTimeout(l.current)),[]),(0,d.jsx)("button",{type:"button","aria-label":t?(0,C.I)({id:"theme.CodeBlock.copied",message:"Copied",description:"The copied button label on code blocks"}):(0,C.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),title:(0,C.I)({id:"theme.CodeBlock.copy",message:"Copy",description:"The copy button label on code blocks"}),className:(0,s.Z)("clean-btn",n,j.copyButton,t&&j.copyButtonCopied),onClick:i,children:(0,d.jsxs)("span",{className:j.copyButtonIcons,"aria-hidden":"true",children:[(0,d.jsx)(x.Z,{className:j.copyButtonIcon}),(0,d.jsx)(y.Z,{className:j.copyButtonSuccessIcon})]})})}var f=n(670);const w={wordWrapButtonIcon:"wordWrapButtonIcon_iowe",wordWrapButtonEnabled:"wordWrapButtonEnabled_gY8A"};function _(e){let{className:o,onClick:n,isEnabled:c}=e;const t=(0,C.I)({id:"theme.CodeBlock.wordWrapToggle",message:"Toggle word wrap",description:"The title attribute for toggle word wrapping button of code block lines"});return(0,d.jsx)("button",{type:"button",onClick:n,className:(0,s.Z)("clean-btn",o,c&&w.wordWrapButtonEnabled),"aria-label":t,title:t,children:(0,d.jsx)(f.Z,{className:w.wordWrapButtonIcon,"aria-hidden":"true"})})}function I(e){let{children:o,className:n="",metastring:c,title:t,showLineNumbers:l,language:r}=e;const{prism:{defaultLanguage:m,magicComments:g}}=(0,k.L)(),N=function(e){return e?.toLowerCase()}(r??(0,i.Vo)(n)??m),C=(0,a.p)(),x=(0,b.F)(),y=(0,i.bc)(c)||t,{lineClassNames:j,code:f}=(0,i.nZ)(o,{metastring:c,language:N,magicComments:g}),w=l??(0,i.nt)(c);return(0,d.jsxs)(u,{as:"div",className:(0,s.Z)(n,N&&!n.includes(`language-${N}`)&&`language-${N}`),children:[y&&(0,d.jsx)("div",{className:p.codeBlockTitle,children:y}),(0,d.jsxs)("div",{className:p.codeBlockContent,children:[(0,d.jsx)(B.y$,{theme:C,code:f,language:N??"text",children:e=>{let{className:o,style:n,tokens:c,getLineProps:t,getTokenProps:a}=e;return(0,d.jsx)("pre",{tabIndex:0,ref:x.codeBlockRef,className:(0,s.Z)(o,p.codeBlock,"thin-scrollbar"),style:n,children:(0,d.jsx)("code",{className:(0,s.Z)(p.codeBlockLines,w&&p.codeBlockLinesWithNumbering),children:c.map(((e,o)=>(0,d.jsx)(h,{line:e,getLineProps:t,getTokenProps:a,classNames:j[o],showLineNumbers:w},o)))})})}}),(0,d.jsxs)("div",{className:p.buttonGroup,children:[(x.isEnabled||x.isCodeScrollable)&&(0,d.jsx)(_,{className:p.codeButton,onClick:()=>x.toggle(),isEnabled:x.isEnabled}),(0,d.jsx)(L,{className:p.codeButton,code:f})]})]})]})}function T(e){let{children:o,...n}=e;const s=(0,t.Z)(),a=function(e){return c.Children.toArray(e).some((e=>(0,c.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(o),l="string"==typeof a?I:m;return(0,d.jsx)(l,{...n,children:a},String(s))}}}]);