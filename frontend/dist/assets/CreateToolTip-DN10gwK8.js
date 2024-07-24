import{g as fo,r as d,R as Se,j as re}from"./index-C4qijYKD.js";import{a as po}from"./axios-Cm0UX6qg.js";import{A as mo}from"./Annotation-D0fnPqB6.js";import{B as Et}from"./react-toastify.esm-BahYd6mB.js";import{u as ho}from"./productSlice-B_do_W5p.js";import"./index-CBIje6yv.js";const Pe=Math.min,_e=Math.max,pt=Math.round,dt=Math.floor,ve=e=>({x:e,y:e}),vo={left:"right",right:"left",bottom:"top",top:"bottom"},yo={start:"end",end:"start"};function At(e,t,n){return _e(e,Pe(t,n))}function ot(e,t){return typeof e=="function"?e(t):e}function Ae(e){return e.split("-")[0]}function nt(e){return e.split("-")[1]}function Zt(e){return e==="x"?"y":"x"}function Ct(e){return e==="y"?"height":"width"}function We(e){return["top","bottom"].includes(Ae(e))?"y":"x"}function kt(e){return Zt(We(e))}function go(e,t,n){n===void 0&&(n=!1);const o=nt(e),r=kt(e),l=Ct(r);let s=r==="x"?o===(n?"end":"start")?"right":"left":o==="start"?"bottom":"top";return t.reference[l]>t.floating[l]&&(s=mt(s)),[s,mt(s)]}function wo(e){const t=mt(e);return[Ot(e),t,Ot(t)]}function Ot(e){return e.replace(/start|end/g,t=>yo[t])}function xo(e,t,n){const o=["left","right"],r=["right","left"],l=["top","bottom"],s=["bottom","top"];switch(e){case"top":case"bottom":return n?t?r:o:t?o:r;case"left":case"right":return t?l:s;default:return[]}}function bo(e,t,n,o){const r=nt(e);let l=xo(Ae(e),n==="start",o);return r&&(l=l.map(s=>s+"-"+r),t&&(l=l.concat(l.map(Ot)))),l}function mt(e){return e.replace(/left|right|bottom|top/g,t=>vo[t])}function Eo(e){return{top:0,right:0,bottom:0,left:0,...e}}function Qt(e){return typeof e!="number"?Eo(e):{top:e,right:e,bottom:e,left:e}}function ht(e){const{x:t,y:n,width:o,height:r}=e;return{width:o,height:r,top:n,left:t,right:t+o,bottom:n+r,x:t,y:n}}function Pt(e,t,n){let{reference:o,floating:r}=e;const l=We(t),s=kt(t),i=Ct(s),c=Ae(t),a=l==="y",h=o.x+o.width/2-r.width/2,m=o.y+o.height/2-r.height/2,b=o[i]/2-r[i]/2;let p;switch(c){case"top":p={x:h,y:o.y-r.height};break;case"bottom":p={x:h,y:o.y+o.height};break;case"right":p={x:o.x+o.width,y:m};break;case"left":p={x:o.x-r.width,y:m};break;default:p={x:o.x,y:o.y}}switch(nt(t)){case"start":p[s]-=b*(n&&a?-1:1);break;case"end":p[s]+=b*(n&&a?-1:1);break}return p}const So=async(e,t,n)=>{const{placement:o="bottom",strategy:r="absolute",middleware:l=[],platform:s}=n,i=l.filter(Boolean),c=await(s.isRTL==null?void 0:s.isRTL(t));let a=await s.getElementRects({reference:e,floating:t,strategy:r}),{x:h,y:m}=Pt(a,o,c),b=o,p={},f=0;for(let v=0;v<i.length;v++){const{name:x,fn:g}=i[v],{x:S,y:_,data:R,reset:O}=await g({x:h,y:m,initialPlacement:o,placement:b,strategy:r,middlewareData:p,rects:a,platform:s,elements:{reference:e,floating:t}});h=S??h,m=_??m,p={...p,[x]:{...p[x],...R}},O&&f<=50&&(f++,typeof O=="object"&&(O.placement&&(b=O.placement),O.rects&&(a=O.rects===!0?await s.getElementRects({reference:e,floating:t,strategy:r}):O.rects),{x:h,y:m}=Pt(a,b,c)),v=-1)}return{x:h,y:m,placement:b,strategy:r,middlewareData:p}};async function Jt(e,t){var n;t===void 0&&(t={});const{x:o,y:r,platform:l,rects:s,elements:i,strategy:c}=e,{boundary:a="clippingAncestors",rootBoundary:h="viewport",elementContext:m="floating",altBoundary:b=!1,padding:p=0}=ot(t,e),f=Qt(p),x=i[b?m==="floating"?"reference":"floating":m],g=ht(await l.getClippingRect({element:(n=await(l.isElement==null?void 0:l.isElement(x)))==null||n?x:x.contextElement||await(l.getDocumentElement==null?void 0:l.getDocumentElement(i.floating)),boundary:a,rootBoundary:h,strategy:c})),S=m==="floating"?{x:o,y:r,width:s.floating.width,height:s.floating.height}:s.reference,_=await(l.getOffsetParent==null?void 0:l.getOffsetParent(i.floating)),R=await(l.isElement==null?void 0:l.isElement(_))?await(l.getScale==null?void 0:l.getScale(_))||{x:1,y:1}:{x:1,y:1},O=ht(l.convertOffsetParentRelativeRectToViewportRelativeRect?await l.convertOffsetParentRelativeRectToViewportRelativeRect({elements:i,rect:S,offsetParent:_,strategy:c}):S);return{top:(g.top-O.top+f.top)/R.y,bottom:(O.bottom-g.bottom+f.bottom)/R.y,left:(g.left-O.left+f.left)/R.x,right:(O.right-g.right+f.right)/R.x}}const _o=e=>({name:"arrow",options:e,async fn(t){const{x:n,y:o,placement:r,rects:l,platform:s,elements:i,middlewareData:c}=t,{element:a,padding:h=0}=ot(e,t)||{};if(a==null)return{};const m=Qt(h),b={x:n,y:o},p=kt(r),f=Ct(p),v=await s.getDimensions(a),x=p==="y",g=x?"top":"left",S=x?"bottom":"right",_=x?"clientHeight":"clientWidth",R=l.reference[f]+l.reference[p]-b[p]-l.floating[f],O=b[p]-l.reference[p],U=await(s.getOffsetParent==null?void 0:s.getOffsetParent(a));let D=U?U[_]:0;(!D||!await(s.isElement==null?void 0:s.isElement(U)))&&(D=i.floating[_]||l.floating[f]);const G=R/2-O/2,K=D/2-v[f]/2-1,Z=Pe(m[g],K),se=Pe(m[S],K),Q=Z,ie=D-v[f]-se,T=D/2-v[f]/2+G,J=At(Q,T,ie),P=!c.arrow&&nt(r)!=null&&T!==J&&l.reference[f]/2-(T<Q?Z:se)-v[f]/2<0,j=P?T<Q?T-Q:T-ie:0;return{[p]:b[p]+j,data:{[p]:J,centerOffset:T-J-j,...P&&{alignmentOffset:j}},reset:P}}}),Ao=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var n,o;const{placement:r,middlewareData:l,rects:s,initialPlacement:i,platform:c,elements:a}=t,{mainAxis:h=!0,crossAxis:m=!0,fallbackPlacements:b,fallbackStrategy:p="bestFit",fallbackAxisSideDirection:f="none",flipAlignment:v=!0,...x}=ot(e,t);if((n=l.arrow)!=null&&n.alignmentOffset)return{};const g=Ae(r),S=We(i),_=Ae(i)===i,R=await(c.isRTL==null?void 0:c.isRTL(a.floating)),O=b||(_||!v?[mt(i)]:wo(i)),U=f!=="none";!b&&U&&O.push(...bo(i,v,f,R));const D=[i,...O],G=await Jt(t,x),K=[];let Z=((o=l.flip)==null?void 0:o.overflows)||[];if(h&&K.push(G[g]),m){const T=go(r,s,R);K.push(G[T[0]],G[T[1]])}if(Z=[...Z,{placement:r,overflows:K}],!K.every(T=>T<=0)){var se,Q;const T=(((se=l.flip)==null?void 0:se.index)||0)+1,J=D[T];if(J)return{data:{index:T,overflows:Z},reset:{placement:J}};let P=(Q=Z.filter(j=>j.overflows[0]<=0).sort((j,W)=>j.overflows[1]-W.overflows[1])[0])==null?void 0:Q.placement;if(!P)switch(p){case"bestFit":{var ie;const j=(ie=Z.filter(W=>{if(U){const M=We(W.placement);return M===S||M==="y"}return!0}).map(W=>[W.placement,W.overflows.filter(M=>M>0).reduce((M,k)=>M+k,0)]).sort((W,M)=>W[1]-M[1])[0])==null?void 0:ie[0];j&&(P=j);break}case"initialPlacement":P=i;break}if(r!==P)return{reset:{placement:P}}}return{}}}};async function Oo(e,t){const{placement:n,platform:o,elements:r}=e,l=await(o.isRTL==null?void 0:o.isRTL(r.floating)),s=Ae(n),i=nt(n),c=We(n)==="y",a=["left","top"].includes(s)?-1:1,h=l&&c?-1:1,m=ot(t,e);let{mainAxis:b,crossAxis:p,alignmentAxis:f}=typeof m=="number"?{mainAxis:m,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...m};return i&&typeof f=="number"&&(p=i==="end"?f*-1:f),c?{x:p*h,y:b*a}:{x:b*a,y:p*h}}const Ro=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var n,o;const{x:r,y:l,placement:s,middlewareData:i}=t,c=await Oo(t,e);return s===((n=i.offset)==null?void 0:n.placement)&&(o=i.arrow)!=null&&o.alignmentOffset?{}:{x:r+c.x,y:l+c.y,data:{...c,placement:s}}}}},To=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){const{x:n,y:o,placement:r}=t,{mainAxis:l=!0,crossAxis:s=!1,limiter:i={fn:x=>{let{x:g,y:S}=x;return{x:g,y:S}}},...c}=ot(e,t),a={x:n,y:o},h=await Jt(t,c),m=We(Ae(r)),b=Zt(m);let p=a[b],f=a[m];if(l){const x=b==="y"?"top":"left",g=b==="y"?"bottom":"right",S=p+h[x],_=p-h[g];p=At(S,p,_)}if(s){const x=m==="y"?"top":"left",g=m==="y"?"bottom":"right",S=f+h[x],_=f-h[g];f=At(S,f,_)}const v=i.fn({...t,[b]:p,[m]:f});return{...v,data:{x:v.x-n,y:v.y-o}}}}};function Fe(e){return eo(e)?(e.nodeName||"").toLowerCase():"#document"}function Y(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function pe(e){var t;return(t=(eo(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function eo(e){return e instanceof Node||e instanceof Y(e).Node}function ue(e){return e instanceof Element||e instanceof Y(e).Element}function fe(e){return e instanceof HTMLElement||e instanceof Y(e).HTMLElement}function Wt(e){return typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Y(e).ShadowRoot}function rt(e){const{overflow:t,overflowX:n,overflowY:o,display:r}=le(e);return/auto|scroll|overlay|hidden|clip/.test(t+o+n)&&!["inline","contents"].includes(r)}function Co(e){return["table","td","th"].includes(Fe(e))}function vt(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch{return!1}})}function Lt(e){const t=Nt(),n=le(e);return n.transform!=="none"||n.perspective!=="none"||(n.containerType?n.containerType!=="normal":!1)||!t&&(n.backdropFilter?n.backdropFilter!=="none":!1)||!t&&(n.filter?n.filter!=="none":!1)||["transform","perspective","filter"].some(o=>(n.willChange||"").includes(o))||["paint","layout","strict","content"].some(o=>(n.contain||"").includes(o))}function ko(e){let t=ye(e);for(;fe(t)&&!Me(t);){if(vt(t))return null;if(Lt(t))return t;t=ye(t)}return null}function Nt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function Me(e){return["html","body","#document"].includes(Fe(e))}function le(e){return Y(e).getComputedStyle(e)}function yt(e){return ue(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ye(e){if(Fe(e)==="html")return e;const t=e.assignedSlot||e.parentNode||Wt(e)&&e.host||pe(e);return Wt(t)?t.host:t}function to(e){const t=ye(e);return Me(t)?e.ownerDocument?e.ownerDocument.body:e.body:fe(t)&&rt(t)?t:to(t)}function tt(e,t,n){var o;t===void 0&&(t=[]),n===void 0&&(n=!0);const r=to(e),l=r===((o=e.ownerDocument)==null?void 0:o.body),s=Y(r);return l?t.concat(s,s.visualViewport||[],rt(r)?r:[],s.frameElement&&n?tt(s.frameElement):[]):t.concat(r,tt(r,[],n))}function oo(e){const t=le(e);let n=parseFloat(t.width)||0,o=parseFloat(t.height)||0;const r=fe(e),l=r?e.offsetWidth:n,s=r?e.offsetHeight:o,i=pt(n)!==l||pt(o)!==s;return i&&(n=l,o=s),{width:n,height:o,$:i}}function Dt(e){return ue(e)?e:e.contextElement}function Ie(e){const t=Dt(e);if(!fe(t))return ve(1);const n=t.getBoundingClientRect(),{width:o,height:r,$:l}=oo(t);let s=(l?pt(n.width):n.width)/o,i=(l?pt(n.height):n.height)/r;return(!s||!Number.isFinite(s))&&(s=1),(!i||!Number.isFinite(i))&&(i=1),{x:s,y:i}}const Lo=ve(0);function no(e){const t=Y(e);return!Nt()||!t.visualViewport?Lo:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function No(e,t,n){return t===void 0&&(t=!1),!n||t&&n!==Y(e)?!1:t}function Oe(e,t,n,o){t===void 0&&(t=!1),n===void 0&&(n=!1);const r=e.getBoundingClientRect(),l=Dt(e);let s=ve(1);t&&(o?ue(o)&&(s=Ie(o)):s=Ie(e));const i=No(l,n,o)?no(l):ve(0);let c=(r.left+i.x)/s.x,a=(r.top+i.y)/s.y,h=r.width/s.x,m=r.height/s.y;if(l){const b=Y(l),p=o&&ue(o)?Y(o):o;let f=b,v=f.frameElement;for(;v&&o&&p!==f;){const x=Ie(v),g=v.getBoundingClientRect(),S=le(v),_=g.left+(v.clientLeft+parseFloat(S.paddingLeft))*x.x,R=g.top+(v.clientTop+parseFloat(S.paddingTop))*x.y;c*=x.x,a*=x.y,h*=x.x,m*=x.y,c+=_,a+=R,f=Y(v),v=f.frameElement}}return ht({width:h,height:m,x:c,y:a})}function Do(e){let{elements:t,rect:n,offsetParent:o,strategy:r}=e;const l=r==="fixed",s=pe(o),i=t?vt(t.floating):!1;if(o===s||i&&l)return n;let c={scrollLeft:0,scrollTop:0},a=ve(1);const h=ve(0),m=fe(o);if((m||!m&&!l)&&((Fe(o)!=="body"||rt(s))&&(c=yt(o)),fe(o))){const b=Oe(o);a=Ie(o),h.x=b.x+o.clientLeft,h.y=b.y+o.clientTop}return{width:n.width*a.x,height:n.height*a.y,x:n.x*a.x-c.scrollLeft*a.x+h.x,y:n.y*a.y-c.scrollTop*a.y+h.y}}function $o(e){return Array.from(e.getClientRects())}function ro(e){return Oe(pe(e)).left+yt(e).scrollLeft}function jo(e){const t=pe(e),n=yt(e),o=e.ownerDocument.body,r=_e(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth),l=_e(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight);let s=-n.scrollLeft+ro(e);const i=-n.scrollTop;return le(o).direction==="rtl"&&(s+=_e(t.clientWidth,o.clientWidth)-r),{width:r,height:l,x:s,y:i}}function Bo(e,t){const n=Y(e),o=pe(e),r=n.visualViewport;let l=o.clientWidth,s=o.clientHeight,i=0,c=0;if(r){l=r.width,s=r.height;const a=Nt();(!a||a&&t==="fixed")&&(i=r.offsetLeft,c=r.offsetTop)}return{width:l,height:s,x:i,y:c}}function Io(e,t){const n=Oe(e,!0,t==="fixed"),o=n.top+e.clientTop,r=n.left+e.clientLeft,l=fe(e)?Ie(e):ve(1),s=e.clientWidth*l.x,i=e.clientHeight*l.y,c=r*l.x,a=o*l.y;return{width:s,height:i,x:c,y:a}}function Mt(e,t,n){let o;if(t==="viewport")o=Bo(e,n);else if(t==="document")o=jo(pe(e));else if(ue(t))o=Io(t,n);else{const r=no(e);o={...t,x:t.x-r.x,y:t.y-r.y}}return ht(o)}function lo(e,t){const n=ye(e);return n===t||!ue(n)||Me(n)?!1:le(n).position==="fixed"||lo(n,t)}function Po(e,t){const n=t.get(e);if(n)return n;let o=tt(e,[],!1).filter(i=>ue(i)&&Fe(i)!=="body"),r=null;const l=le(e).position==="fixed";let s=l?ye(e):e;for(;ue(s)&&!Me(s);){const i=le(s),c=Lt(s);!c&&i.position==="fixed"&&(r=null),(l?!c&&!r:!c&&i.position==="static"&&!!r&&["absolute","fixed"].includes(r.position)||rt(s)&&!c&&lo(e,s))?o=o.filter(h=>h!==s):r=i,s=ye(s)}return t.set(e,o),o}function Wo(e){let{element:t,boundary:n,rootBoundary:o,strategy:r}=e;const s=[...n==="clippingAncestors"?vt(t)?[]:Po(t,this._c):[].concat(n),o],i=s[0],c=s.reduce((a,h)=>{const m=Mt(t,h,r);return a.top=_e(m.top,a.top),a.right=Pe(m.right,a.right),a.bottom=Pe(m.bottom,a.bottom),a.left=_e(m.left,a.left),a},Mt(t,i,r));return{width:c.right-c.left,height:c.bottom-c.top,x:c.left,y:c.top}}function Mo(e){const{width:t,height:n}=oo(e);return{width:t,height:n}}function Fo(e,t,n){const o=fe(t),r=pe(t),l=n==="fixed",s=Oe(e,!0,l,t);let i={scrollLeft:0,scrollTop:0};const c=ve(0);if(o||!o&&!l)if((Fe(t)!=="body"||rt(r))&&(i=yt(t)),o){const m=Oe(t,!0,l,t);c.x=m.x+t.clientLeft,c.y=m.y+t.clientTop}else r&&(c.x=ro(r));const a=s.left+i.scrollLeft-c.x,h=s.top+i.scrollTop-c.y;return{x:a,y:h,width:s.width,height:s.height}}function St(e){return le(e).position==="static"}function Ft(e,t){return!fe(e)||le(e).position==="fixed"?null:t?t(e):e.offsetParent}function so(e,t){const n=Y(e);if(vt(e))return n;if(!fe(e)){let r=ye(e);for(;r&&!Me(r);){if(ue(r)&&!St(r))return r;r=ye(r)}return n}let o=Ft(e,t);for(;o&&Co(o)&&St(o);)o=Ft(o,t);return o&&Me(o)&&St(o)&&!Lt(o)?n:o||ko(e)||n}const Ho=async function(e){const t=this.getOffsetParent||so,n=this.getDimensions,o=await n(e.floating);return{reference:Fo(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}};function zo(e){return le(e).direction==="rtl"}const Vo={convertOffsetParentRelativeRectToViewportRelativeRect:Do,getDocumentElement:pe,getClippingRect:Wo,getOffsetParent:so,getElementRects:Ho,getClientRects:$o,getDimensions:Mo,getScale:Ie,isElement:ue,isRTL:zo};function Uo(e,t){let n=null,o;const r=pe(e);function l(){var i;clearTimeout(o),(i=n)==null||i.disconnect(),n=null}function s(i,c){i===void 0&&(i=!1),c===void 0&&(c=1),l();const{left:a,top:h,width:m,height:b}=e.getBoundingClientRect();if(i||t(),!m||!b)return;const p=dt(h),f=dt(r.clientWidth-(a+m)),v=dt(r.clientHeight-(h+b)),x=dt(a),S={rootMargin:-p+"px "+-f+"px "+-v+"px "+-x+"px",threshold:_e(0,Pe(1,c))||1};let _=!0;function R(O){const U=O[0].intersectionRatio;if(U!==c){if(!_)return s();U?s(!1,U):o=setTimeout(()=>{s(!1,1e-7)},1e3)}_=!1}try{n=new IntersectionObserver(R,{...S,root:r.ownerDocument})}catch{n=new IntersectionObserver(R,S)}n.observe(e)}return s(!0),l}function Ko(e,t,n,o){o===void 0&&(o={});const{ancestorScroll:r=!0,ancestorResize:l=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:i=typeof IntersectionObserver=="function",animationFrame:c=!1}=o,a=Dt(e),h=r||l?[...a?tt(a):[],...tt(t)]:[];h.forEach(g=>{r&&g.addEventListener("scroll",n,{passive:!0}),l&&g.addEventListener("resize",n)});const m=a&&i?Uo(a,n):null;let b=-1,p=null;s&&(p=new ResizeObserver(g=>{let[S]=g;S&&S.target===a&&p&&(p.unobserve(t),cancelAnimationFrame(b),b=requestAnimationFrame(()=>{var _;(_=p)==null||_.observe(t)})),n()}),a&&!c&&p.observe(a),p.observe(t));let f,v=c?Oe(e):null;c&&x();function x(){const g=Oe(e);v&&(g.x!==v.x||g.y!==v.y||g.width!==v.width||g.height!==v.height)&&n(),v=g,f=requestAnimationFrame(x)}return n(),()=>{var g;h.forEach(S=>{r&&S.removeEventListener("scroll",n),l&&S.removeEventListener("resize",n)}),m==null||m(),(g=p)==null||g.disconnect(),p=null,c&&cancelAnimationFrame(f)}}const qo=Ro,Xo=To,Yo=Ao,Go=_o,Ht=(e,t,n)=>{const o=new Map,r={platform:Vo,...n},l={...r.platform,_c:o};return So(e,t,{...r,platform:l})};var io={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var t={}.hasOwnProperty;function n(){for(var l="",s=0;s<arguments.length;s++){var i=arguments[s];i&&(l=r(l,o(i)))}return l}function o(l){if(typeof l=="string"||typeof l=="number")return l;if(typeof l!="object")return"";if(Array.isArray(l))return n.apply(null,l);if(l.toString!==Object.prototype.toString&&!l.toString.toString().includes("[native code]"))return l.toString();var s="";for(var i in l)t.call(l,i)&&l[i]&&(s=r(s,i));return s}function r(l,s){return s?l?l+" "+s:l+s:l}e.exports?(n.default=n,e.exports=n):window.classNames=n})()})(io);var Zo=io.exports;const Rt=fo(Zo);var zt={};const Qo="react-tooltip-core-styles",Jo="react-tooltip-base-styles",Vt={core:!1,base:!1};function Ut({css:e,id:t=Jo,type:n="base",ref:o}){var r,l;if(!e||typeof document>"u"||Vt[n]||n==="core"&&typeof process<"u"&&(!((r=process==null?void 0:zt)===null||r===void 0)&&r.REACT_TOOLTIP_DISABLE_CORE_STYLES)||n!=="base"&&typeof process<"u"&&(!((l=process==null?void 0:zt)===null||l===void 0)&&l.REACT_TOOLTIP_DISABLE_BASE_STYLES))return;n==="core"&&(t=Qo),o||(o={});const{insertAt:s}=o;if(document.getElementById(t))return void console.warn(`[react-tooltip] Element with id '${t}' already exists. Call \`removeStyle()\` first`);const i=document.head||document.getElementsByTagName("head")[0],c=document.createElement("style");c.id=t,c.type="text/css",s==="top"&&i.firstChild?i.insertBefore(c,i.firstChild):i.appendChild(c),c.styleSheet?c.styleSheet.cssText=e:c.appendChild(document.createTextNode(e)),Vt[n]=!0}const Kt=async({elementReference:e=null,tooltipReference:t=null,tooltipArrowReference:n=null,place:o="top",offset:r=10,strategy:l="absolute",middlewares:s=[qo(Number(r)),Yo({fallbackAxisSideDirection:"start"}),Xo({padding:5})],border:i})=>{if(!e)return{tooltipStyles:{},tooltipArrowStyles:{},place:o};if(t===null)return{tooltipStyles:{},tooltipArrowStyles:{},place:o};const c=s;return n?(c.push(Go({element:n,padding:5})),Ht(e,t,{placement:o,strategy:l,middleware:c}).then(({x:a,y:h,placement:m,middlewareData:b})=>{var p,f;const v={left:`${a}px`,top:`${h}px`,border:i},{x,y:g}=(p=b.arrow)!==null&&p!==void 0?p:{x:0,y:0},S=(f={top:"bottom",right:"left",bottom:"top",left:"right"}[m.split("-")[0]])!==null&&f!==void 0?f:"bottom",_=i&&{borderBottom:i,borderRight:i};let R=0;if(i){const O=`${i}`.match(/(\d+)px/);R=O!=null&&O[1]?Number(O[1]):1}return{tooltipStyles:v,tooltipArrowStyles:{left:x!=null?`${x}px`:"",top:g!=null?`${g}px`:"",right:"",bottom:"",..._,[S]:`-${4+R}px`},place:m}})):Ht(e,t,{placement:"bottom",strategy:l,middleware:c}).then(({x:a,y:h,placement:m})=>({tooltipStyles:{left:`${a}px`,top:`${h}px`},tooltipArrowStyles:{},place:m}))},qt=(e,t)=>!("CSS"in window&&"supports"in window.CSS)||window.CSS.supports(e,t),Xt=(e,t,n)=>{let o=null;const r=function(...l){const s=()=>{o=null,n||e.apply(this,l)};n&&!o&&(e.apply(this,l),o=setTimeout(s,t)),n||(o&&clearTimeout(o),o=setTimeout(s,t))};return r.cancel=()=>{o&&(clearTimeout(o),o=null)},r},Yt=e=>e!==null&&!Array.isArray(e)&&typeof e=="object",Tt=(e,t)=>{if(e===t)return!0;if(Array.isArray(e)&&Array.isArray(t))return e.length===t.length&&e.every((r,l)=>Tt(r,t[l]));if(Array.isArray(e)!==Array.isArray(t))return!1;if(!Yt(e)||!Yt(t))return e===t;const n=Object.keys(e),o=Object.keys(t);return n.length===o.length&&n.every(r=>Tt(e[r],t[r]))},en=e=>{if(!(e instanceof HTMLElement||e instanceof SVGElement))return!1;const t=getComputedStyle(e);return["overflow","overflow-x","overflow-y"].some(n=>{const o=t.getPropertyValue(n);return o==="auto"||o==="scroll"})},Gt=e=>{if(!e)return null;let t=e.parentElement;for(;t;){if(en(t))return t;t=t.parentElement}return document.scrollingElement||document.documentElement},tn=typeof window<"u"?d.useLayoutEffect:d.useEffect,on="DEFAULT_TOOLTIP_ID",nn={anchorRefs:new Set,activeAnchor:{current:null},attach:()=>{},detach:()=>{},setActiveAnchor:()=>{}},rn=d.createContext({getTooltipData:()=>nn});function co(e=on){return d.useContext(rn).getTooltipData(e)}var Be={tooltip:"core-styles-module_tooltip__3vRRp",fixed:"core-styles-module_fixed__pcSol",arrow:"core-styles-module_arrow__cvMwQ",noArrow:"core-styles-module_noArrow__xock6",clickable:"core-styles-module_clickable__ZuTTB",show:"core-styles-module_show__Nt9eE",closing:"core-styles-module_closing__sGnxF"},_t={tooltip:"styles-module_tooltip__mnnfp",arrow:"styles-module_arrow__K0L3T",dark:"styles-module_dark__xNqje",light:"styles-module_light__Z6W-X",success:"styles-module_success__A2AKt",warning:"styles-module_warning__SCK0X",error:"styles-module_error__JvumD",info:"styles-module_info__BWdHW"};const ln=({forwardRef:e,id:t,className:n,classNameArrow:o,variant:r="dark",anchorId:l,anchorSelect:s,place:i="top",offset:c=10,events:a=["hover"],openOnClick:h=!1,positionStrategy:m="absolute",middlewares:b,wrapper:p,delayShow:f=0,delayHide:v=0,float:x=!1,hidden:g=!1,noArrow:S=!1,clickable:_=!1,closeOnEsc:R=!1,closeOnScroll:O=!1,closeOnResize:U=!1,openEvents:D,closeEvents:G,globalCloseEvents:K,imperativeModeOnly:Z,style:se,position:Q,afterShow:ie,afterHide:T,content:J,contentWrapperRef:P,isOpen:j,defaultIsOpen:W=!1,setIsOpen:M,activeAnchor:k,setActiveAnchor:Re,border:lt,opacity:st,arrowColor:it,role:gt="tooltip"})=>{var He;const z=d.useRef(null),Te=d.useRef(null),F=d.useRef(null),ee=d.useRef(null),ge=d.useRef(null),[me,wt]=d.useState({tooltipStyles:{},tooltipArrowStyles:{},place:i}),[q,ct]=d.useState(!1),[we,xe]=d.useState(!1),[N,ze]=d.useState(null),Ve=d.useRef(!1),Ue=d.useRef(null),{anchorRefs:Ke,setActiveAnchor:at}=co(t),Ce=d.useRef(!1),[he,qe]=d.useState([]),be=d.useRef(!1),ke=h||a.includes("click"),Xe=ke||(D==null?void 0:D.click)||(D==null?void 0:D.dblclick)||(D==null?void 0:D.mousedown),Le=D?{...D}:{mouseover:!0,focus:!0,mouseenter:!1,click:!1,dblclick:!1,mousedown:!1};!D&&ke&&Object.assign(Le,{mouseenter:!1,focus:!1,mouseover:!1,click:!0});const Ye=G?{...G}:{mouseout:!0,blur:!0,mouseleave:!1,click:!1,dblclick:!1,mouseup:!1};!G&&ke&&Object.assign(Ye,{mouseleave:!1,blur:!1,mouseout:!1});const ne=K?{...K}:{escape:R||!1,scroll:O||!1,resize:U||!1,clickOutsideAnchor:Xe||!1};Z&&(Object.assign(Le,{mouseenter:!1,focus:!1,click:!1,dblclick:!1,mousedown:!1}),Object.assign(Ye,{mouseleave:!1,blur:!1,click:!1,dblclick:!1,mouseup:!1}),Object.assign(ne,{escape:!1,scroll:!1,resize:!1,clickOutsideAnchor:!1})),tn(()=>(be.current=!0,()=>{be.current=!1}),[]);const $=u=>{be.current&&(u&&xe(!0),setTimeout(()=>{be.current&&(M==null||M(u),j===void 0&&ct(u))},10))};d.useEffect(()=>{if(j===void 0)return()=>null;j&&xe(!0);const u=setTimeout(()=>{ct(j)},10);return()=>{clearTimeout(u)}},[j]),d.useEffect(()=>{if(q!==Ve.current)if(ge.current&&clearTimeout(ge.current),Ve.current=q,q)ie==null||ie();else{const u=(w=>{const E=w.match(/^([\d.]+)(ms|s)$/);if(!E)return 0;const[,I,H]=E;return Number(I)*(H==="ms"?1:1e3)})(getComputedStyle(document.body).getPropertyValue("--rt-transition-show-delay"));ge.current=setTimeout(()=>{xe(!1),ze(null),T==null||T()},u+25)}},[q]);const ut=u=>{wt(w=>Tt(w,u)?w:u)},Ge=(u=f)=>{F.current&&clearTimeout(F.current),we?$(!0):F.current=setTimeout(()=>{$(!0)},u)},Ne=(u=v)=>{ee.current&&clearTimeout(ee.current),ee.current=setTimeout(()=>{Ce.current||$(!1)},u)},Ze=u=>{var w;if(!u)return;const E=(w=u.currentTarget)!==null&&w!==void 0?w:u.target;if(!(E!=null&&E.isConnected))return Re(null),void at({current:null});f?Ge():$(!0),Re(E),at({current:E}),ee.current&&clearTimeout(ee.current)},De=()=>{_?Ne(v||100):v?Ne():$(!1),F.current&&clearTimeout(F.current)},$e=({x:u,y:w})=>{var E;const I={getBoundingClientRect:()=>({x:u,y:w,width:0,height:0,top:w,left:u,right:u,bottom:w})};Kt({place:(E=N==null?void 0:N.place)!==null&&E!==void 0?E:i,offset:c,elementReference:I,tooltipReference:z.current,tooltipArrowReference:Te.current,strategy:m,middlewares:b,border:lt}).then(H=>{ut(H)})},je=u=>{if(!u)return;const w=u,E={x:w.clientX,y:w.clientY};$e(E),Ue.current=E},Qe=u=>{var w;if(!q)return;const E=u.target;E.isConnected&&(!((w=z.current)===null||w===void 0)&&w.contains(E)||[document.querySelector(`[id='${l}']`),...he].some(I=>I==null?void 0:I.contains(E))||($(!1),F.current&&clearTimeout(F.current)))},ft=Xt(Ze,50,!0),B=Xt(De,50,!0),te=u=>{B.cancel(),ft(u)},y=()=>{ft.cancel(),B()},A=d.useCallback(()=>{var u,w;const E=(u=N==null?void 0:N.position)!==null&&u!==void 0?u:Q;E?$e(E):x?Ue.current&&$e(Ue.current):k!=null&&k.isConnected&&Kt({place:(w=N==null?void 0:N.place)!==null&&w!==void 0?w:i,offset:c,elementReference:k,tooltipReference:z.current,tooltipArrowReference:Te.current,strategy:m,middlewares:b,border:lt}).then(I=>{be.current&&ut(I)})},[q,k,J,se,i,N==null?void 0:N.place,c,m,Q,N==null?void 0:N.position,x]);d.useEffect(()=>{var u,w;const E=new Set(Ke);he.forEach(C=>{E.add({current:C})});const I=document.querySelector(`[id='${l}']`);I&&E.add({current:I});const H=()=>{$(!1)},ce=Gt(k),ae=Gt(z.current);ne.scroll&&(window.addEventListener("scroll",H),ce==null||ce.addEventListener("scroll",H),ae==null||ae.addEventListener("scroll",H));let V=null;ne.resize?window.addEventListener("resize",H):k&&z.current&&(V=Ko(k,z.current,A,{ancestorResize:!0,elementResize:!0,layoutShift:!0}));const oe=C=>{C.key==="Escape"&&$(!1)};ne.escape&&window.addEventListener("keydown",oe),ne.clickOutsideAnchor&&window.addEventListener("click",Qe);const L=[],Je=C=>{q&&(C==null?void 0:C.target)===k||Ze(C)},ao=C=>{q&&(C==null?void 0:C.target)===k&&De()},$t=["mouseover","mouseout","mouseenter","mouseleave","focus","blur"],jt=["click","dblclick","mousedown","mouseup"];Object.entries(Le).forEach(([C,de])=>{de&&($t.includes(C)?L.push({event:C,listener:te}):jt.includes(C)&&L.push({event:C,listener:Je}))}),Object.entries(Ye).forEach(([C,de])=>{de&&($t.includes(C)?L.push({event:C,listener:y}):jt.includes(C)&&L.push({event:C,listener:ao}))}),x&&L.push({event:"pointermove",listener:je});const Bt=()=>{Ce.current=!0},It=()=>{Ce.current=!1,De()};return _&&!Xe&&((u=z.current)===null||u===void 0||u.addEventListener("mouseenter",Bt),(w=z.current)===null||w===void 0||w.addEventListener("mouseleave",It)),L.forEach(({event:C,listener:de})=>{E.forEach(xt=>{var et;(et=xt.current)===null||et===void 0||et.addEventListener(C,de)})}),()=>{var C,de;ne.scroll&&(window.removeEventListener("scroll",H),ce==null||ce.removeEventListener("scroll",H),ae==null||ae.removeEventListener("scroll",H)),ne.resize?window.removeEventListener("resize",H):V==null||V(),ne.clickOutsideAnchor&&window.removeEventListener("click",Qe),ne.escape&&window.removeEventListener("keydown",oe),_&&!Xe&&((C=z.current)===null||C===void 0||C.removeEventListener("mouseenter",Bt),(de=z.current)===null||de===void 0||de.removeEventListener("mouseleave",It)),L.forEach(({event:xt,listener:et})=>{E.forEach(uo=>{var bt;(bt=uo.current)===null||bt===void 0||bt.removeEventListener(xt,et)})})}},[k,A,we,Ke,he,D,G,K,ke,f,v]),d.useEffect(()=>{var u,w;let E=(w=(u=N==null?void 0:N.anchorSelect)!==null&&u!==void 0?u:s)!==null&&w!==void 0?w:"";!E&&t&&(E=`[data-tooltip-id='${t.replace(/'/g,"\\'")}']`);const I=new MutationObserver(H=>{const ce=[],ae=[];H.forEach(V=>{if(V.type==="attributes"&&V.attributeName==="data-tooltip-id"&&(V.target.getAttribute("data-tooltip-id")===t?ce.push(V.target):V.oldValue===t&&ae.push(V.target)),V.type==="childList"){if(k){const oe=[...V.removedNodes].filter(L=>L.nodeType===1);if(E)try{ae.push(...oe.filter(L=>L.matches(E))),ae.push(...oe.flatMap(L=>[...L.querySelectorAll(E)]))}catch{}oe.some(L=>{var Je;return!!(!((Je=L==null?void 0:L.contains)===null||Je===void 0)&&Je.call(L,k))&&(xe(!1),$(!1),Re(null),F.current&&clearTimeout(F.current),ee.current&&clearTimeout(ee.current),!0)})}if(E)try{const oe=[...V.addedNodes].filter(L=>L.nodeType===1);ce.push(...oe.filter(L=>L.matches(E))),ce.push(...oe.flatMap(L=>[...L.querySelectorAll(E)]))}catch{}}}),(ce.length||ae.length)&&qe(V=>[...V.filter(oe=>!ae.includes(oe)),...ce])});return I.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-tooltip-id"],attributeOldValue:!0}),()=>{I.disconnect()}},[t,s,N==null?void 0:N.anchorSelect,k]),d.useEffect(()=>{A()},[A]),d.useEffect(()=>{if(!(P!=null&&P.current))return()=>null;const u=new ResizeObserver(()=>{setTimeout(()=>A())});return u.observe(P.current),()=>{u.disconnect()}},[J,P==null?void 0:P.current]),d.useEffect(()=>{var u;const w=document.querySelector(`[id='${l}']`),E=[...he,w];k&&E.includes(k)||Re((u=he[0])!==null&&u!==void 0?u:w)},[l,he,k]),d.useEffect(()=>(W&&$(!0),()=>{F.current&&clearTimeout(F.current),ee.current&&clearTimeout(ee.current)}),[]),d.useEffect(()=>{var u;let w=(u=N==null?void 0:N.anchorSelect)!==null&&u!==void 0?u:s;if(!w&&t&&(w=`[data-tooltip-id='${t.replace(/'/g,"\\'")}']`),w)try{const E=Array.from(document.querySelectorAll(w));qe(E)}catch{qe([])}},[t,s,N==null?void 0:N.anchorSelect]),d.useEffect(()=>{F.current&&(clearTimeout(F.current),Ge(f))},[f]);const X=(He=N==null?void 0:N.content)!==null&&He!==void 0?He:J,Ee=q&&Object.keys(me.tooltipStyles).length>0;return d.useImperativeHandle(e,()=>({open:u=>{if(u!=null&&u.anchorSelect)try{document.querySelector(u.anchorSelect)}catch{return void console.warn(`[react-tooltip] "${u.anchorSelect}" is not a valid CSS selector`)}ze(u??null),u!=null&&u.delay?Ge(u.delay):$(!0)},close:u=>{u!=null&&u.delay?Ne(u.delay):$(!1)},activeAnchor:k,place:me.place,isOpen:!!(we&&!g&&X&&Ee)})),we&&!g&&X?Se.createElement(p,{id:t,role:gt,className:Rt("react-tooltip",Be.tooltip,_t.tooltip,_t[r],n,`react-tooltip__place-${me.place}`,Be[Ee?"show":"closing"],Ee?"react-tooltip__show":"react-tooltip__closing",m==="fixed"&&Be.fixed,_&&Be.clickable),onTransitionEnd:u=>{ge.current&&clearTimeout(ge.current),q||u.propertyName!=="opacity"||(xe(!1),ze(null),T==null||T())},style:{...se,...me.tooltipStyles,opacity:st!==void 0&&Ee?st:void 0},ref:z},X,Se.createElement(p,{className:Rt("react-tooltip-arrow",Be.arrow,_t.arrow,o,S&&Be.noArrow),style:{...me.tooltipArrowStyles,background:it?`linear-gradient(to right bottom, transparent 50%, ${it} 50%)`:void 0},ref:Te})):null},sn=({content:e})=>Se.createElement("span",{dangerouslySetInnerHTML:{__html:e}}),cn=Se.forwardRef(({id:e,anchorId:t,anchorSelect:n,content:o,html:r,render:l,className:s,classNameArrow:i,variant:c="dark",place:a="top",offset:h=10,wrapper:m="div",children:b=null,events:p=["hover"],openOnClick:f=!1,positionStrategy:v="absolute",middlewares:x,delayShow:g=0,delayHide:S=0,float:_=!1,hidden:R=!1,noArrow:O=!1,clickable:U=!1,closeOnEsc:D=!1,closeOnScroll:G=!1,closeOnResize:K=!1,openEvents:Z,closeEvents:se,globalCloseEvents:Q,imperativeModeOnly:ie=!1,style:T,position:J,isOpen:P,defaultIsOpen:j=!1,disableStyleInjection:W=!1,border:M,opacity:k,arrowColor:Re,setIsOpen:lt,afterShow:st,afterHide:it,role:gt="tooltip"},He)=>{const[z,Te]=d.useState(o),[F,ee]=d.useState(r),[ge,me]=d.useState(a),[wt,q]=d.useState(c),[ct,we]=d.useState(h),[xe,N]=d.useState(g),[ze,Ve]=d.useState(S),[Ue,Ke]=d.useState(_),[at,Ce]=d.useState(R),[he,qe]=d.useState(m),[be,ke]=d.useState(p),[Xe,Le]=d.useState(v),[Ye,ne]=d.useState(null),[$,ut]=d.useState(null),Ge=d.useRef(W),{anchorRefs:Ne,activeAnchor:Ze}=co(e),De=B=>B==null?void 0:B.getAttributeNames().reduce((te,y)=>{var A;return y.startsWith("data-tooltip-")&&(te[y.replace(/^data-tooltip-/,"")]=(A=B==null?void 0:B.getAttribute(y))!==null&&A!==void 0?A:null),te},{}),$e=B=>{const te={place:y=>{var A;me((A=y)!==null&&A!==void 0?A:a)},content:y=>{Te(y??o)},html:y=>{ee(y??r)},variant:y=>{var A;q((A=y)!==null&&A!==void 0?A:c)},offset:y=>{we(y===null?h:Number(y))},wrapper:y=>{var A;qe((A=y)!==null&&A!==void 0?A:m)},events:y=>{const A=y==null?void 0:y.split(" ");ke(A??p)},"position-strategy":y=>{var A;Le((A=y)!==null&&A!==void 0?A:v)},"delay-show":y=>{N(y===null?g:Number(y))},"delay-hide":y=>{Ve(y===null?S:Number(y))},float:y=>{Ke(y===null?_:y==="true")},hidden:y=>{Ce(y===null?R:y==="true")},"class-name":y=>{ne(y)}};Object.values(te).forEach(y=>y(null)),Object.entries(B).forEach(([y,A])=>{var X;(X=te[y])===null||X===void 0||X.call(te,A)})};d.useEffect(()=>{Te(o)},[o]),d.useEffect(()=>{ee(r)},[r]),d.useEffect(()=>{me(a)},[a]),d.useEffect(()=>{q(c)},[c]),d.useEffect(()=>{we(h)},[h]),d.useEffect(()=>{N(g)},[g]),d.useEffect(()=>{Ve(S)},[S]),d.useEffect(()=>{Ke(_)},[_]),d.useEffect(()=>{Ce(R)},[R]),d.useEffect(()=>{Le(v)},[v]),d.useEffect(()=>{Ge.current!==W&&console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.")},[W]),d.useEffect(()=>{typeof window<"u"&&window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles",{detail:{disableCore:W==="core",disableBase:W}}))},[]),d.useEffect(()=>{var B;const te=new Set(Ne);let y=n;if(!y&&e&&(y=`[data-tooltip-id='${e.replace(/'/g,"\\'")}']`),y)try{document.querySelectorAll(y).forEach(w=>{te.add({current:w})})}catch{console.warn(`[react-tooltip] "${y}" is not a valid CSS selector`)}const A=document.querySelector(`[id='${t}']`);if(A&&te.add({current:A}),!te.size)return()=>null;const X=(B=$??A)!==null&&B!==void 0?B:Ze.current,Ee=new MutationObserver(w=>{w.forEach(E=>{var I;if(!X||E.type!=="attributes"||!(!((I=E.attributeName)===null||I===void 0)&&I.startsWith("data-tooltip-")))return;const H=De(X);$e(H)})}),u={attributes:!0,childList:!1,subtree:!1};if(X){const w=De(X);$e(w),Ee.observe(X,u)}return()=>{Ee.disconnect()}},[Ne,Ze,$,t,n]),d.useEffect(()=>{T!=null&&T.border&&console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."),M&&!qt("border",`${M}`)&&console.warn(`[react-tooltip] "${M}" is not a valid \`border\`.`),T!=null&&T.opacity&&console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."),k&&!qt("opacity",`${k}`)&&console.warn(`[react-tooltip] "${k}" is not a valid \`opacity\`.`)},[]);let je=b;const Qe=d.useRef(null);if(l){const B=l({content:($==null?void 0:$.getAttribute("data-tooltip-content"))||z||null,activeAnchor:$});je=B?Se.createElement("div",{ref:Qe,className:"react-tooltip-content-wrapper"},B):null}else z&&(je=z);F&&(je=Se.createElement(sn,{content:F}));const ft={forwardRef:He,id:e,anchorId:t,anchorSelect:n,className:Rt(s,Ye),classNameArrow:i,content:je,contentWrapperRef:Qe,place:ge,variant:wt,offset:ct,wrapper:he,events:be,openOnClick:f,positionStrategy:Xe,middlewares:x,delayShow:xe,delayHide:ze,float:Ue,hidden:at,noArrow:O,clickable:U,closeOnEsc:D,closeOnScroll:G,closeOnResize:K,openEvents:Z,closeEvents:se,globalCloseEvents:Q,imperativeModeOnly:ie,style:T,position:J,isOpen:P,defaultIsOpen:j,border:M,opacity:k,arrowColor:Re,setIsOpen:lt,afterShow:st,afterHide:it,activeAnchor:$,setActiveAnchor:B=>ut(B),role:gt};return Se.createElement(ln,{...ft})});typeof window<"u"&&window.addEventListener("react-tooltip-inject-styles",e=>{e.detail.disableCore||Ut({css:":root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}",type:"core"}),e.detail.disableBase||Ut({css:`
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`,type:"base"})});const hn=()=>{const[e,t]=d.useState([]),[n,o]=d.useState({}),[r,l]=d.useState(""),[s,i]=d.useState(""),[c]=ho(),a=d.useCallback(f=>{o(f)},[]),h=d.useCallback(f=>{const{geometry:v,data:x}=f;t(g=>[...g,{geometry:v,data:{...x,redirectUrl:s}}]),o({})},[s]),m=async f=>{const v=new FormData;v.append("image",f.target.files[0]);try{const x=await c(v).unwrap();l(x.image)}catch(x){console.log(x)}},b=async()=>{if(!r||!s)return Et.error("Please Fill All Fields!");try{const f=await po.post("http://localhost:5000/api/tooltip/create",{image:r,annotations:e,redirectUrl:s},{headers:{"Content-Type":"application/json"},withCredentials:!0});return Et.success(f.data.message)}catch(f){return Et.error(f.message)}},p=d.useMemo(()=>({position:"relative",maxWidth:"100%",margin:"0 auto",border:"1px solid black",padding:"30px"}),[]);return re.jsxs("div",{className:"p-[20px] flex justify-start items-center flex-col w-full h-max gap-[5rem] relative overflow-auto overflow-x-hidden",children:[re.jsx("div",{className:"text-gray-500 font2 text-2xl mt-5 tracking-wider w-full text-center",children:"Select an Image to Add Hotspots"}),r?re.jsxs("div",{style:p,className:"wrapper rounded-xl",children:[re.jsx(mo,{src:r,alt:"Annotatable",annotations:e,type:"POINT",value:n,onChange:a,onSubmit:h}),e.map((f,v)=>re.jsx("div",{"data-tip":f.data.text,style:{position:"absolute",top:`${f.geometry.y*100}%`,left:`${f.geometry.x*100}%`,width:"10px",height:"10px",borderRadius:"50%",backgroundColor:"red",transform:"translate(-50%, -50%)"}},v+100)),re.jsx(cn,{})]}):re.jsx("div",{className:"w-[320px] h-[320px] left-0 top-0",children:re.jsxs("label",{className:`w-full overflow-hidden h-full shadow-md shadow-slate-400 bg-[#EDEBE9] smd:bg-transparent flex-wrap text-black ${r?"hidden":"flex"} rounded-[20px] group-hover:flex justify-center items-center gap-2 flex-col px-10 py-8`,style:{cursor:"pointer"},children:[r?r.name:"Upload Image",re.jsx("input",{type:"file",accept:"image/*",name:"image",onChange:m,className:`${r?"text-black":"hidden"} `})]})}),re.jsx("input",{type:"text",placeholder:"Enter redirect URL",value:s,onChange:f=>i(f.target.value),className:"mt-4 p-2 border rounded w-[30rem]"}),re.jsx("button",{className:"w-[160px] bg-[#525CEB] h-[60px] py-3 capitalize text-[18px] tracking-wider font-[350] rounded-lg text-white",onClick:b,children:"Upload Image"})]})};export{hn as default};
