"use strict";(self.webpackChunkserver=self.webpackChunkserver||[]).push([[3658],{13658:(U,n,_)=>{_.r(n),_.d(n,{LoginEE:()=>I});var E=_(92132),D=_(48653),a=_(94061),O=_(83997),o=_(30893),l=_(54894),i=_(63891),P=_(23549),M=_(77452),A=_(55506),L=_(15126),d=_(63299),h=_(67014),s=_(59080),r=_(79275),C=_(14718),t=_(21272),K=_(82437),m=_(61535),g=_(5790),x=_(12083),j=_(35223),f=_(5409),y=_(74930),c=_(2600),S=_(48940),$=_(41286),N=_(56336),F=_(13426),Z=_(84624),z=_(77965),G=_(54257),V=_(71210),H=_(51187),J=_(39404),Q=_(58692),X=_(501),Y=_(57646),u=_(23120),p=_(44414),e=_(25962),w=_(14664),k=_(42588),b=_(90325),q=_(62785),__=_(87443),E_=_(41032),s_=_(22957),t_=_(93179),a_=_(73055),O_=_(15747),P_=_(85306),n_=_(26509),D_=_(32058),M_=_(81185),d_=_(82261);const v=(0,i.Ay)(D.c)`
  flex: 1;
`,I=B=>{const{formatMessage:T}=(0,l.A)(),{isLoading:W,data:R=[]}=(0,P.g)(void 0,{skip:!window.strapi.features.isEnabled(window.strapi.features.SSO)});return!window.strapi.features.isEnabled(window.strapi.features.SSO)||!W&&R.length===0?(0,E.jsx)(P.L,{...B}):(0,E.jsx)(P.L,{...B,children:(0,E.jsx)(a.a,{paddingTop:7,children:(0,E.jsxs)(O.s,{direction:"column",alignItems:"stretch",gap:7,children:[(0,E.jsxs)(O.s,{children:[(0,E.jsx)(v,{}),(0,E.jsx)(a.a,{paddingLeft:3,paddingRight:3,children:(0,E.jsx)(o.o,{variant:"sigma",textColor:"neutral600",children:T({id:"Auth.login.sso.divider"})})}),(0,E.jsx)(v,{})]}),(0,E.jsx)(M.S,{providers:R,displayAllProviders:!1})]})})})}},77452:(U,n,_)=>{_.d(n,{S:()=>A});var E=_(92132),D=_(90151),a=_(68074),O=_(79739),o=_(83997),l=_(30893),i=_(54894),P=_(71389),M=_(63891);const A=({providers:s,displayAllProviders:r})=>{const{formatMessage:C}=(0,i.A)();return r?(0,E.jsx)(D.x,{gap:4,children:s.map(t=>(0,E.jsx)(a.E,{col:4,children:(0,E.jsx)(d,{provider:t})},t.uid))}):s.length>2&&!r?(0,E.jsxs)(D.x,{gap:4,children:[s.slice(0,2).map(t=>(0,E.jsx)(a.E,{col:4,children:(0,E.jsx)(d,{provider:t})},t.uid)),(0,E.jsx)(a.E,{col:4,children:(0,E.jsx)(O.m,{label:C({id:"global.see-more"}),children:(0,E.jsx)(h,{as:P.N_,to:"/auth/providers",children:(0,E.jsx)("span",{"aria-hidden":!0,children:"\u2022\u2022\u2022"})})})})]}):(0,E.jsx)(L,{justifyContent:"center",children:s.map(t=>(0,E.jsx)(d,{provider:t},t.uid))})},L=(0,M.Ay)(o.s)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:s})=>s.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:s})=>s.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:s})=>s.spaces[2]};
  }
`,d=({provider:s})=>(0,E.jsx)(O.m,{label:s.displayName,children:(0,E.jsx)(h,{href:`${window.strapi.backendURL}/admin/connect/${s.uid}`,children:s.icon?(0,E.jsx)("img",{src:s.icon,"aria-hidden":!0,alt:"",height:"32px"}):(0,E.jsx)(l.o,{children:s.displayName})})}),h=M.Ay.a`
  width: ${136/16}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${48/16}rem;
  border: 1px solid ${({theme:s})=>s.colors.neutral150};
  border-radius: ${({theme:s})=>s.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:s})=>s.colors.neutral600};
`}}]);
