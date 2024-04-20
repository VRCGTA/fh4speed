(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const f of r)if(f.type==="childList")for(const o of f.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const f={};return r.integrity&&(f.integrity=r.integrity),r.referrerPolicy&&(f.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?f.credentials="include":r.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function i(r){if(r.ep)return;r.ep=!0;const f=t(r);fetch(r.href,f)}})();const dt=(e,l)=>e===l,B={equals:dt};let Pl=Dl;const C=1,R=2,Ul={owned:null,cleanups:null,context:null,owner:null};var h=null;let se=null,ut=null,u=null,m=null,_=null,P=0;function ht(e,l){const t=u,i=h,r=e.length===0,f=l===void 0?i:l,o=r?Ul:{owned:null,cleanups:null,context:f?f.context:null,owner:f},a=r?e:()=>e(()=>L(()=>U(o)));h=o,u=null;try{return N(a,!0)}finally{u=t,h=i}}function w(e,l){l=l?Object.assign({},B,l):B;const t={value:e,observers:null,observerSlots:null,comparator:l.equals||void 0},i=r=>(typeof r=="function"&&(r=r(t.value)),Gl(t,r));return[pl.bind(t),i]}function k(e,l,t){const i=fe(e,l,!1,C);M(i)}function Wl(e,l,t){Pl=yt;const i=fe(e,l,!1,C);(!t||!t.render)&&(i.user=!0),_?_.push(i):M(i)}function ie(e,l,t){t=t?Object.assign({},B,t):B;const i=fe(e,l,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=t.equals||void 0,M(i),pl.bind(i)}function L(e){if(u===null)return e();const l=u;u=null;try{return e()}finally{u=l}}function gt(e){Wl(()=>L(e))}function vt(e){return h===null||(h.cleanups===null?h.cleanups=[e]:h.cleanups.push(e)),e}function pl(){if(this.sources&&this.state)if(this.state===C)M(this);else{const e=m;m=null,N(()=>I(this),!1),m=e}if(u){const e=this.observers?this.observers.length:0;u.sources?(u.sources.push(this),u.sourceSlots.push(e)):(u.sources=[this],u.sourceSlots=[e]),this.observers?(this.observers.push(u),this.observerSlots.push(u.sources.length-1)):(this.observers=[u],this.observerSlots=[u.sources.length-1])}return this.value}function Gl(e,l,t){let i=e.value;return(!e.comparator||!e.comparator(i,l))&&(e.value=l,e.observers&&e.observers.length&&N(()=>{for(let r=0;r<e.observers.length;r+=1){const f=e.observers[r],o=se&&se.running;o&&se.disposed.has(f),(o?!f.tState:!f.state)&&(f.pure?m.push(f):_.push(f),f.observers&&Fl(f)),o||(f.state=C)}if(m.length>1e6)throw m=[],new Error},!1)),l}function M(e){if(!e.fn)return;U(e);const l=P;xt(e,e.value,l)}function xt(e,l,t){let i;const r=h,f=u;u=h=e;try{i=e.fn(l)}catch(o){return e.pure&&(e.state=C,e.owned&&e.owned.forEach(U),e.owned=null),e.updatedAt=t+1,jl(o)}finally{u=f,h=r}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?Gl(e,i):e.value=i,e.updatedAt=t)}function fe(e,l,t,i=C,r){const f={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:l,owner:h,context:h?h.context:null,pure:t};return h===null||h!==Ul&&(h.owned?h.owned.push(f):h.owned=[f]),f}function q(e){if(e.state===0)return;if(e.state===R)return I(e);if(e.suspense&&L(e.suspense.inFallback))return e.suspense.effects.push(e);const l=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<P);)e.state&&l.push(e);for(let t=l.length-1;t>=0;t--)if(e=l[t],e.state===C)M(e);else if(e.state===R){const i=m;m=null,N(()=>I(e,l[0]),!1),m=i}}function N(e,l){if(m)return e();let t=!1;l||(m=[]),_?t=!0:_=[],P++;try{const i=e();return mt(t),i}catch(i){t||(_=null),m=null,jl(i)}}function mt(e){if(m&&(Dl(m),m=null),e)return;const l=_;_=null,l.length&&N(()=>Pl(l),!1)}function Dl(e){for(let l=0;l<e.length;l++)q(e[l])}function yt(e){let l,t=0;for(l=0;l<e.length;l++){const i=e[l];i.user?e[t++]=i:q(i)}for(l=0;l<t;l++)q(e[l])}function I(e,l){e.state=0;for(let t=0;t<e.sources.length;t+=1){const i=e.sources[t];if(i.sources){const r=i.state;r===C?i!==l&&(!i.updatedAt||i.updatedAt<P)&&q(i):r===R&&I(i,l)}}}function Fl(e){for(let l=0;l<e.observers.length;l+=1){const t=e.observers[l];t.state||(t.state=R,t.pure?m.push(t):_.push(t),t.observers&&Fl(t))}}function U(e){let l;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),i=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const f=r.pop(),o=t.observerSlots.pop();i<r.length&&(f.sourceSlots[o]=i,r[i]=f,t.observerSlots[i]=o)}}if(e.owned){for(l=e.owned.length-1;l>=0;l--)U(e.owned[l]);e.owned=null}if(e.cleanups){for(l=e.cleanups.length-1;l>=0;l--)e.cleanups[l]();e.cleanups=null}e.state=0}function bt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function jl(e,l=h){throw bt(e)}function St(e,l){return L(()=>e(l||{}))}function wt(e,l,t){let i=t.length,r=l.length,f=i,o=0,a=0,g=l[r-1].nextSibling,y=null;for(;o<r||a<f;){if(l[o]===t[a]){o++,a++;continue}for(;l[r-1]===t[f-1];)r--,f--;if(r===o){const x=f<i?a?t[a-1].nextSibling:t[f-a]:g;for(;a<f;)e.insertBefore(t[a++],x)}else if(f===a)for(;o<r;)(!y||!y.has(l[o]))&&l[o].remove(),o++;else if(l[o]===t[f-1]&&t[a]===l[r-1]){const x=l[--r].nextSibling;e.insertBefore(t[a++],l[o++].nextSibling),e.insertBefore(t[--f],x),l[r]=t[f]}else{if(!y){y=new Map;let b=a;for(;b<f;)y.set(t[b],b++)}const x=y.get(l[o]);if(x!=null)if(a<x&&x<f){let b=o,S=1,O;for(;++b<r&&b<f&&!((O=y.get(l[b]))==null||O!==x+S);)S++;if(S>x-a){const $=l[o];for(;a<x;)e.insertBefore(t[a++],$)}else e.replaceChild(t[a++],l[o++])}else o++;else l[o++].remove()}}}function _t(e,l,t,i={}){let r;return ht(f=>{r=f,l===document?e():ce(l,e(),l.firstChild?null:void 0,t)},i.owner),()=>{r(),l.textContent=""}}function Ct(e,l,t){let i;const r=()=>{const o=document.createElement("template");return o.innerHTML=e,t?o.content.firstChild.firstChild:o.content.firstChild},f=l?()=>L(()=>document.importNode(i||(i=r()),!0)):()=>(i||(i=r())).cloneNode(!0);return f.cloneNode=f,f}function c(e,l,t){t==null?e.removeAttribute(l):e.setAttribute(l,t)}function Il(e,l){l==null?e.removeAttribute("class"):e.className=l}function ce(e,l,t,i){if(t!==void 0&&!i&&(i=[]),typeof l!="function")return H(e,l,i,t);k(r=>H(e,l(),r,t),i)}function H(e,l,t,i,r){for(;typeof t=="function";)t=t();if(l===t)return t;const f=typeof l,o=i!==void 0;if(e=o&&t[0]&&t[0].parentNode||e,f==="string"||f==="number")if(f==="number"&&(l=l.toString()),o){let a=t[0];a&&a.nodeType===3?a.data!==l&&(a.data=l):a=document.createTextNode(l),t=E(e,t,i,a)}else t!==""&&typeof t=="string"?t=e.firstChild.data=l:t=e.textContent=l;else if(l==null||f==="boolean")t=E(e,t,i);else{if(f==="function")return k(()=>{let a=l();for(;typeof a=="function";)a=a();t=H(e,a,t,i)}),()=>t;if(Array.isArray(l)){const a=[],g=t&&Array.isArray(t);if(re(a,l,t,r))return k(()=>t=H(e,a,t,i,!0)),()=>t;if(a.length===0){if(t=E(e,t,i),o)return t}else g?t.length===0?Hl(e,a,i):wt(e,t,a):(t&&E(e),Hl(e,a));t=a}else if(l.nodeType){if(Array.isArray(t)){if(o)return t=E(e,t,i,l);E(e,t,null,l)}else t==null||t===""||!e.firstChild?e.appendChild(l):e.replaceChild(l,e.firstChild);t=l}}return t}function re(e,l,t,i){let r=!1;for(let f=0,o=l.length;f<o;f++){let a=l[f],g=t&&t[f],y;if(!(a==null||a===!0||a===!1))if((y=typeof a)=="object"&&a.nodeType)e.push(a);else if(Array.isArray(a))r=re(e,a,g)||r;else if(y==="function")if(i){for(;typeof a=="function";)a=a();r=re(e,Array.isArray(a)?a:[a],Array.isArray(g)?g:[g])||r}else e.push(a),r=!0;else{const x=String(a);g&&g.nodeType===3&&g.data===x?e.push(g):e.push(document.createTextNode(x))}}return r}function Hl(e,l,t=null){for(let i=0,r=l.length;i<r;i++)e.insertBefore(l[i],t)}function E(e,l,t,i){if(t===void 0)return e.textContent="";const r=i||document.createTextNode("");if(l.length){let f=!1;for(let o=l.length-1;o>=0;o--){const a=l[o];if(r!==a){const g=a.parentNode===e;!f&&!o?g?e.replaceChild(r,a):e.insertBefore(r,t):g&&a.remove()}else f=!0}}else e.insertBefore(r,t);return[r]}const At="_App_1mrah_6",Zt="_meterContainer_1mrah_18",Et="_showMeter_1mrah_25",Ot="_cls1_1mrah_29",Lt="_cls2_1mrah_29",Mt="_cls3_1mrah_29",Nt="_statOn_1mrah_33",$t="_cls4_1mrah_37",Tt="_cls5_1mrah_37",Bt="_cls6_1mrah_37",Rt="_cls7_1mrah_50",kt="_cls8_1mrah_50",qt="_cls9_1mrah_58",It="_cls10_1mrah_62",Ht="_green_1mrah_74",Pt="_red_1mrah_78",Ut="_cls11_1mrah_82",Wt="_fh4container_1mrah_1",pt="_gearContainer_1mrah_1",Gt="_needle_1mrah_1",Dt="_speed_1mrah_1",Ft="_kmh_1mrah_138",s={App:At,meterContainer:Zt,showMeter:Et,cls1:Ot,cls2:Lt,cls3:Mt,statOn:Nt,cls4:$t,cls5:Tt,cls6:Bt,cls7:Rt,cls8:kt,cls9:qt,cls10:It,green:Ht,red:Pt,cls11:Ut,fh4container:Wt,gearContainer:pt,needle:Gt,speed:Dt,kmh:Ft};function jt(e){const l=t=>{e(t)};gt(()=>window.addEventListener("message",l)),vt(()=>window.removeEventListener("message",l))}var Kt=Ct('<div><div><div><svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 501.39 500.96"><circle id=gear_circle cx=253.61 cy=241.48 r=44></circle><path d=m252.11,4c-42.26.26-81.9,11.55-116.18,31.15></path><path d=m444.59,100.29c-19.01-25.66-43.06-47.36-70.7-63.62></path><path d=m458.78,121.8c-4.35-7.44-9.09-14.62-14.19-21.51></path><path d=m491.1,240.48c-.17-42.2-11.36-81.8-30.82-116.09></path><path d=m371.3,35.15c-34.29-19.6-73.93-30.89-116.18-31.15></path><path d=m16.14,243.48c.35,42.14,11.66,81.66,31.23,115.84></path><path d=m48.89,361.91c20.6,34.94,49.88,64.14,84.88,84.64></path><path d=m46.95,124.39c-19.47,34.28-30.65,73.89-30.82,116.09></path><path d=m133.34,36.66c-35.06,20.63-64.36,50.01-84.89,85.13></path><g><line x1=230.09 y1=17.71 x2=229.57 y2=12.74></line><line x1=206.83 y1=21.4 x2=205.79 y2=16.51></line><line x1=184.08 y1=27.49 x2=182.54 y2=22.74></line><line x1=162.1 y1=35.93 x2=160.06 y2=31.37></line><line x1=121.36 y1=59.45 x2=118.42 y2=55.41></line><line x1=103.06 y1=74.27 x2=99.71 y2=70.56></line><line x1=86.41 y1=90.93 x2=82.69 y2=87.58></line><line x1=71.58 y1=109.23 x2=67.54 y2=106.29></line><line x1=48.07 y1=149.97 x2=43.5 y2=147.93></line><line x1=39.63 y1=171.95 x2=34.87 y2=170.41></line><line x1=33.53 y1=194.7 x2=28.64 y2=193.66></line><line x1=29.85 y1=217.96 x2=24.87 y2=217.44></line><line x1=29.85 y1=265 x2=24.87 y2=265.52></line><line x1=33.53 y1=288.26 x2=28.64 y2=289.3></line><line x1=39.63 y1=311.01 x2=34.87 y2=312.55></line><line x1=48.07 y1=333 x2=43.5 y2=335.03></line><line x1=71.58 y1=373.73 x2=67.54 y2=376.67></line><line x1=86.41 y1=392.04 x2=82.69 y2=395.38></line><line x1=103.06 y1=408.69 x2=99.71 y2=412.4></line><line x1=121.36 y1=423.51 x2=118.42 y2=427.55></line><line x1=477.38 y1=217.96 x2=482.35 y2=217.44></line><line x1=473.7 y1=194.7 x2=478.59 y2=193.66></line><line x1=467.6 y1=171.95 x2=472.36 y2=170.41></line><line x1=459.16 y1=149.97 x2=463.73 y2=147.93></line><line x1=435.64 y1=109.23 x2=439.69 y2=106.29></line><line x1=420.82 y1=90.93 x2=424.54 y2=87.58></line><line x1=404.17 y1=74.27 x2=407.51 y2=70.56></line><line x1=385.87 y1=59.45 x2=388.8 y2=55.41></line><line x1=345.13 y1=35.93 x2=347.16 y2=31.37></line><line x1=323.14 y1=27.49 x2=324.69 y2=22.74></line><line x1=300.39 y1=21.4 x2=301.43 y2=16.51></line><line x1=277.13 y1=17.71 x2=277.65 y2=12.74></line></g><path d=m314.1,241.98c0-.17.01-.33.01-.5,0-33.41-27.09-60.5-60.5-60.5s-60.5,27.09-60.5,60.5c0,22.22,11.99,41.62,29.84,52.14></path><g id=abs><path d=m103,233.37h-5.18l-.85,3.66h-4.16l4.53-18.36h6.15l4.53,18.36h-4.16l-.85-3.66Zm-.79-3.4l-.36-1.52c-.51-2.17-.88-3.9-1.41-6.51h-.08c-.53,2.61-.9,4.34-1.41,6.51l-.36,1.52h3.61Z></path><path d=m124.47,231.72c0,3.35-1.84,5.31-5.99,5.31h-7.47v-18.36h6.83c4.07,0,5.79,1.41,5.79,4.62,0,1.99-.96,3.46-2.61,3.99,2.31.3,3.45,1.96,3.45,4.44Zm-9.31-5.54h2.17c1.29,0,2.06-.65,2.06-2.2,0-1.32-.54-1.91-1.93-1.91h-2.29v4.12Zm5.05,5.07c0-1.62-.84-2.11-2.01-2.11h-3.04v4.5h2.99c1.44,0,2.06-.84,2.06-2.38Z></path><path d=m127.59,234.62l2.27-3.04c1.21,1.55,2.79,2.33,4.54,2.33s2.51-.69,2.51-1.79-.64-1.55-2.47-2.14l-1.3-.43c-3.26-1.06-4.8-2.7-4.8-5.69,0-3.25,2.32-5.56,6.75-5.56,2.69,0,4.62.79,6.23,2.56l-2.19,2.92c-1.06-1.38-2.53-2.04-4.16-2.04s-2.4.65-2.4,1.75.61,1.72,2.29,2.27l1.18.38c3.96,1.26,5,2.74,5,5.46,0,3.51-2.33,5.75-6.73,5.75-2.8,0-4.9-.85-6.73-2.75Z></path></g><g id=hbk><path d=m93.33,245.82h3.99v7.02h4.88v-7.02h3.99v18.36h-3.99v-7.82h-4.88v7.82h-3.99v-18.36Z></path><path d=m123.83,258.88c0,3.35-1.84,5.31-5.99,5.31h-7.47v-18.36h6.83c4.07,0,5.79,1.41,5.79,4.62,0,1.99-.96,3.46-2.61,3.99,2.31.3,3.45,1.96,3.45,4.44Zm-9.31-5.54h2.17c1.29,0,2.06-.65,2.06-2.2,0-1.32-.54-1.91-1.93-1.91h-2.29v4.12Zm5.05,5.07c0-1.62-.84-2.11-2.01-2.11h-3.04v4.5h2.99c1.44,0,2.06-.84,2.06-2.38Z></path><path d=m133.19,256.28l-1.79,2.62v5.29h-4.09v-18.36h4.09v7.65l4.69-7.65h4.89l-4.85,7.32,5.29,11.04h-4.86l-3.37-7.91Z></path></g><g><path d=m247.5,32.89l1.56-2.16c.97.94,2.16,1.72,3.75,1.72,1.77,0,3.01-1.03,3.01-2.9s-1.15-2.87-2.87-2.87c-1.01,0-1.56.25-2.55.9l-1.54-.99.46-8.28h9.11v2.83h-6.19l-.32,3.61c.69-.3,1.27-.46,2.05-.46,2.85,0,5.24,1.61,5.24,5.15s-2.8,5.77-5.96,5.77c-2.69,0-4.48-1.06-5.75-2.32Z></path></g><g><path d=m148.77,58.76h-7.27v-2.32l6.35-10.14h4.07v9.87h2v2.6h-2v4.12h-3.15v-4.12Zm0-2.6v-3.31c0-.99.07-2.55.11-3.54h-.09c-.41.9-.87,1.75-1.36,2.67l-2.64,4.19h3.98Z></path></g><g><path d=m64.27,138.83l1.59-2.14c1.01.99,2.25,1.75,3.79,1.75,1.72,0,2.9-.83,2.9-2.25,0-1.61-.99-2.6-4.69-2.6v-2.44c3.13,0,4.14-1.03,4.14-2.46,0-1.29-.83-2.05-2.28-2.05-1.22,0-2.21.57-3.22,1.52l-1.73-2.07c1.47-1.29,3.1-2.12,5.1-2.12,3.29,0,5.52,1.61,5.52,4.46,0,1.79-1.06,3.04-2.83,3.75v.11c1.91.51,3.38,1.91,3.38,4.09,0,3.04-2.74,4.81-5.98,4.81-2.69,0-4.51-1.01-5.7-2.37Z></path></g><g><path d=m35.92,243.66c4.44-4.23,7.36-7.13,7.36-9.59,0-1.68-.92-2.69-2.55-2.69-1.24,0-2.25.83-3.13,1.77l-1.84-1.84c1.56-1.68,3.08-2.6,5.4-2.6,3.22,0,5.36,2.05,5.36,5.17,0,2.9-2.67,5.89-5.7,9.06.85-.09,1.98-.18,2.78-.18h3.73v2.85h-11.41v-1.96Z></path></g><g><path d=m63.65,351.84h3.66v-10.32h-3.08v-2.09c1.7-.32,2.87-.76,3.96-1.43h2.51v13.84h3.2v2.74h-10.23v-2.74Z></path></g><g><path d=m140.82,423.38c0-5.61,2.28-8.53,5.77-8.53s5.75,2.94,5.75,8.53-2.25,8.69-5.75,8.69-5.77-3.06-5.77-8.69Zm8.32,0c0-4.6-1.08-5.89-2.55-5.89s-2.58,1.29-2.58,5.89,1.1,6.05,2.58,6.05,2.55-1.43,2.55-6.05Z></path></g><g><path d=m352.15,56.58c0-6.32,3.15-9.06,6.6-9.06,2.07,0,3.59.87,4.6,1.93l-1.79,2.02c-.6-.67-1.63-1.22-2.62-1.22-1.95,0-3.56,1.45-3.7,5.73.94-1.17,2.39-1.86,3.5-1.86,2.85,0,4.9,1.63,4.9,5.1s-2.44,5.52-5.36,5.52c-3.22,0-6.12-2.48-6.12-8.16Zm3.17,1.75c.32,2.81,1.47,3.86,2.87,3.86,1.29,0,2.32-.99,2.32-2.97,0-1.86-.97-2.71-2.44-2.71-.87,0-1.91.48-2.76,1.82Z></path></g><g><path d=m438.83,127.67h-7.66v-2.83h11.31v2.07c-3.86,4.71-4.48,8.05-4.76,14.51h-3.43c.3-5.73,1.36-9.34,4.53-13.75Z></path></g><g><path d=m459.97,243.88c0-2.05,1.36-3.36,2.92-4.18v-.09c-1.29-.94-2.25-2.16-2.25-3.91,0-2.74,2.18-4.48,5.13-4.48s4.94,1.79,4.94,4.51c0,1.63-1.1,2.97-2.18,3.73v.11c1.54.87,2.85,2.09,2.85,4.32,0,2.58-2.28,4.55-5.73,4.55-3.24,0-5.68-1.88-5.68-4.55Zm8.25-.12c0-1.66-1.59-2.25-3.77-3.15-.9.71-1.56,1.72-1.56,2.9,0,1.54,1.26,2.53,2.85,2.53,1.45,0,2.48-.81,2.48-2.28Zm-.28-7.82c0-1.38-.83-2.34-2.25-2.34-1.15,0-2.07.74-2.07,2.09,0,1.52,1.33,2.23,3.1,2.92.78-.83,1.22-1.72,1.22-2.67Z></path></g><g><path d=m432.29,278.34l-2.98,2.82-2.12,5.69h-4.4l7.38-19.77h4.4l-3.07,8.24,8.12-8.24h5.26l-8.16,7.88,1.25,11.89h-5.23l-.45-8.51Z></path><path d=m448.1,267.08h4.86l-.6,5.67c-.15,1.38-.32,2.77-.54,4.17h.04c.82-1.39,1.69-2.79,2.57-4.17l3.63-5.67h4.85l-7.38,19.77h-3.55l5.21-13.96h-.01c-.86,1.36-1.32,2.08-2.34,3.67l-4.08,6.3h-2.29l.61-6.3c.18-1.59.25-2.31.4-3.67h-.01l-5.21,13.96h-3.54l7.38-19.77Z></path></g><g><path d=m487.55,267.15h4.29l-2.82,7.56h5.25l2.82-7.56h4.29l-7.38,19.77h-4.29l3.14-8.42h-5.25l-3.14,8.42h-4.29l7.38-19.77Z></path></g><line x1=477.86 y1=265.29 x2=464.36 y2=288.67></line><polygon points="48.32 346.41 47.85 345.52 191.07 267.03 195.2 275.03 48.32 346.41"></polygon></svg><div></div><div>');const Qt=()=>{const e=(v,d)=>Math.floor(Math.random()*(d-v+1)+v),[l,t]=w(!1,{equals:!1}),[i,r]=w(0,{equals:!1}),[f,o]=w(0,{equals:!1}),[a,g]=w(!1,{equals:!1}),[y,x]=w(!1,{equals:!1}),b=ie(()=>{const v=f();return v>0?v:"R"}),[S,O]=w(0,{equals:!1}),[$,ae]=w(!1,{equals:!1}),[Kl,W]=w("LOW",{equals:!1}),[Ql,Vl]=w(0,{equals:!1}),oe=ie(()=>{const v=S(),d=6,Z=233,A=.21;if(v<=A)return v*(d/A);const T=(v-A)/(1-A);return d+Z*Math.pow(T,2)}),de=()=>{if(!$())return;const v=oe();let d=0;switch(Kl()){case"LOW":d=1;break;case"MID":d=3;break;case"HIGH":d=10;break}const Z=e(Math.max(v-d,0),Math.min(v+d,239));Vl(Z),window.requestAnimationFrame(de)};Wl(()=>{if(S()===1?W("HIGH"):S()>.93?W("MID"):S()>.83&&W("LOW"),S()>.83){ae(!0),de();return}ae(!1)});const Jl=ie(()=>327+($()?Ql():oe()));return jt(v=>{const d=v.data;t(d.ShowHud),d.ShowHud?(O(d.CurrentCarRPM),o(d.CurrentCarGear),r(d.CurrentCarKmh),g(d.CurrentCarABS),x(d.CurrentCarHandbrake)):(O(0),o(0),r(0),g(!1),x(!1))}),(()=>{var v=Kt(),d=v.firstChild,Z=d.firstChild,A=Z.firstChild,T=A.firstChild,ue=T.nextSibling,he=ue.nextSibling,ge=he.nextSibling,ve=ge.nextSibling,xe=ve.nextSibling,me=xe.nextSibling,ye=me.nextSibling,be=ye.nextSibling,Se=be.nextSibling,p=Se.nextSibling,we=p.firstChild,_e=we.nextSibling,Ce=_e.nextSibling,Ae=Ce.nextSibling,Ze=Ae.nextSibling,Ee=Ze.nextSibling,Oe=Ee.nextSibling,Le=Oe.nextSibling,Me=Le.nextSibling,Ne=Me.nextSibling,$e=Ne.nextSibling,Te=$e.nextSibling,Be=Te.nextSibling,Re=Be.nextSibling,ke=Re.nextSibling,qe=ke.nextSibling,Ie=qe.nextSibling,He=Ie.nextSibling,Pe=He.nextSibling,Ue=Pe.nextSibling,We=Ue.nextSibling,pe=We.nextSibling,Ge=pe.nextSibling,De=Ge.nextSibling,Fe=De.nextSibling,je=Fe.nextSibling,Ke=je.nextSibling,Qe=Ke.nextSibling,Ve=Qe.nextSibling,Je=Ve.nextSibling,Xe=Je.nextSibling,Xl=Xe.nextSibling,Ye=p.nextSibling,G=Ye.nextSibling,ze=G.firstChild,en=ze.nextSibling,Yl=en.nextSibling,D=G.nextSibling,nn=D.firstChild,ln=nn.nextSibling,zl=ln.nextSibling,F=D.nextSibling,et=F.firstChild,j=F.nextSibling,nt=j.firstChild,K=j.nextSibling,lt=K.firstChild,Q=K.nextSibling,tt=Q.firstChild,V=Q.nextSibling,st=V.firstChild,J=V.nextSibling,it=J.firstChild,X=J.nextSibling,ct=X.firstChild,Y=X.nextSibling,rt=Y.firstChild,z=Y.nextSibling,ft=z.firstChild,ee=z.nextSibling,tn=ee.firstChild,at=tn.nextSibling,ne=ee.nextSibling,ot=ne.firstChild,sn=ne.nextSibling,le=sn.nextSibling,te=A.nextSibling,cn=te.nextSibling;return ce(te,b),ce(cn,i),k(n=>{var rn=s.App,fn=`${s.meterContainer} ${l()?s.showMeter:""}`,an=s.fh4container,on=`${s.cls5} ${f()>0?s.green:s.red}`,dn=s.cls3,un=s.cls3,hn=s.cls4,gn=s.cls4,vn=s.cls3,xn=s.cls3,mn=s.cls3,yn=s.cls3,bn=s.cls3,Sn=s.cls8,wn=s.cls1,_n=s.cls1,Cn=s.cls1,An=s.cls1,Zn=s.cls1,En=s.cls1,On=s.cls1,Ln=s.cls1,Mn=s.cls1,Nn=s.cls1,$n=s.cls1,Tn=s.cls1,Bn=s.cls1,Rn=s.cls1,kn=s.cls1,qn=s.cls1,In=s.cls1,Hn=s.cls1,Pn=s.cls1,Un=s.cls1,Wn=s.cls1,pn=s.cls1,Gn=s.cls1,Dn=s.cls1,Fn=s.cls1,jn=s.cls1,Kn=s.cls1,Qn=s.cls1,Vn=s.cls1,Jn=s.cls1,Xn=s.cls1,Yn=s.cls1,zn=s.cls2,el=`${s.cls11} ${a()?s.statOn:""}`,nl=s.cls9,ll=s.cls9,tl=s.cls9,sl=`${s.cls11} ${y()?s.statOn:""}`,il=s.cls9,cl=s.cls9,rl=s.cls9,fl=s.cls8,al=s.cls9,ol=s.cls8,dl=s.cls9,ul=s.cls8,hl=s.cls9,gl=s.cls8,vl=s.cls9,xl=s.cls8,ml=s.cls9,yl=s.cls8,bl=s.cls9,Sl=s.cls8,wl=s.cls9,_l=s.cls8,Cl=s.cls10,Al=s.cls8,Zl=s.cls10,El=`${s.cls8} ${s.kmh}`,Ol=s.cls9,Ll=s.cls9,Ml=`${s.cls8} ${s.kmh}`,Nl=s.cls9,$l=`${s.cls6} ${s.kmh}`,Tl=s.needle,Bl=`rotate(${Jl()})`,Rl=s.cls7,kl=s.gearContainer,ql=s.speed;return rn!==n.e&&Il(v,n.e=rn),fn!==n.t&&Il(d,n.t=fn),an!==n.a&&c(Z,"id",n.a=an),on!==n.o&&c(T,"class",n.o=on),dn!==n.i&&c(ue,"class",n.i=dn),un!==n.n&&c(he,"class",n.n=un),hn!==n.s&&c(ge,"class",n.s=hn),gn!==n.h&&c(ve,"class",n.h=gn),vn!==n.r&&c(xe,"class",n.r=vn),xn!==n.d&&c(me,"class",n.d=xn),mn!==n.l&&c(ye,"class",n.l=mn),yn!==n.u&&c(be,"class",n.u=yn),bn!==n.c&&c(Se,"class",n.c=bn),Sn!==n.w&&c(p,"class",n.w=Sn),wn!==n.m&&c(we,"class",n.m=wn),_n!==n.f&&c(_e,"class",n.f=_n),Cn!==n.y&&c(Ce,"class",n.y=Cn),An!==n.g&&c(Ae,"class",n.g=An),Zn!==n.p&&c(Ze,"class",n.p=Zn),En!==n.b&&c(Ee,"class",n.b=En),On!==n.T&&c(Oe,"class",n.T=On),Ln!==n.A&&c(Le,"class",n.A=Ln),Mn!==n.O&&c(Me,"class",n.O=Mn),Nn!==n.I&&c(Ne,"class",n.I=Nn),$n!==n.S&&c($e,"class",n.S=$n),Tn!==n.W&&c(Te,"class",n.W=Tn),Bn!==n.C&&c(Be,"class",n.C=Bn),Rn!==n.B&&c(Re,"class",n.B=Rn),kn!==n.v&&c(ke,"class",n.v=kn),qn!==n.k&&c(qe,"class",n.k=qn),In!==n.x&&c(Ie,"class",n.x=In),Hn!==n.j&&c(He,"class",n.j=Hn),Pn!==n.q&&c(Pe,"class",n.q=Pn),Un!==n.z&&c(Ue,"class",n.z=Un),Wn!==n.P&&c(We,"class",n.P=Wn),pn!==n.H&&c(pe,"class",n.H=pn),Gn!==n.F&&c(Ge,"class",n.F=Gn),Dn!==n.M&&c(De,"class",n.M=Dn),Fn!==n.D&&c(Fe,"class",n.D=Fn),jn!==n.R&&c(je,"class",n.R=jn),Kn!==n.E&&c(Ke,"class",n.E=Kn),Qn!==n.L&&c(Qe,"class",n.L=Qn),Vn!==n.N&&c(Ve,"class",n.N=Vn),Jn!==n.G&&c(Je,"class",n.G=Jn),Xn!==n.U&&c(Xe,"class",n.U=Xn),Yn!==n.K&&c(Xl,"class",n.K=Yn),zn!==n.V&&c(Ye,"class",n.V=zn),el!==n.Y&&c(G,"class",n.Y=el),nl!==n.J&&c(ze,"class",n.J=nl),ll!==n.Q&&c(en,"class",n.Q=ll),tl!==n.Z&&c(Yl,"class",n.Z=tl),sl!==n.X&&c(D,"class",n.X=sl),il!==n._&&c(nn,"class",n._=il),cl!==n.$&&c(ln,"class",n.$=cl),rl!==n.te&&c(zl,"class",n.te=rl),fl!==n.tt&&c(F,"class",n.tt=fl),al!==n.ta&&c(et,"class",n.ta=al),ol!==n.to&&c(j,"class",n.to=ol),dl!==n.ti&&c(nt,"class",n.ti=dl),ul!==n.tn&&c(K,"class",n.tn=ul),hl!==n.ts&&c(lt,"class",n.ts=hl),gl!==n.th&&c(Q,"class",n.th=gl),vl!==n.tr&&c(tt,"class",n.tr=vl),xl!==n.td&&c(V,"class",n.td=xl),ml!==n.tl&&c(st,"class",n.tl=ml),yl!==n.tu&&c(J,"class",n.tu=yl),bl!==n.tc&&c(it,"class",n.tc=bl),Sl!==n.tw&&c(X,"class",n.tw=Sl),wl!==n.tm&&c(ct,"class",n.tm=wl),_l!==n.tf&&c(Y,"class",n.tf=_l),Cl!==n.ty&&c(rt,"class",n.ty=Cl),Al!==n.tg&&c(z,"class",n.tg=Al),Zl!==n.tp&&c(ft,"class",n.tp=Zl),El!==n.tb&&c(ee,"class",n.tb=El),Ol!==n.tT&&c(tn,"class",n.tT=Ol),Ll!==n.tA&&c(at,"class",n.tA=Ll),Ml!==n.tO&&c(ne,"class",n.tO=Ml),Nl!==n.tI&&c(ot,"class",n.tI=Nl),$l!==n.tS&&c(sn,"class",n.tS=$l),Tl!==n.tW&&c(le,"id",n.tW=Tl),Bl!==n.tC&&c(le,"transform",n.tC=Bl),Rl!==n.tB&&c(le,"class",n.tB=Rl),kl!==n.tv&&c(te,"id",n.tv=kl),ql!==n.tk&&c(cn,"id",n.tk=ql),n},{e:void 0,t:void 0,a:void 0,o:void 0,i:void 0,n:void 0,s:void 0,h:void 0,r:void 0,d:void 0,l:void 0,u:void 0,c:void 0,w:void 0,m:void 0,f:void 0,y:void 0,g:void 0,p:void 0,b:void 0,T:void 0,A:void 0,O:void 0,I:void 0,S:void 0,W:void 0,C:void 0,B:void 0,v:void 0,k:void 0,x:void 0,j:void 0,q:void 0,z:void 0,P:void 0,H:void 0,F:void 0,M:void 0,D:void 0,R:void 0,E:void 0,L:void 0,N:void 0,G:void 0,U:void 0,K:void 0,V:void 0,Y:void 0,J:void 0,Q:void 0,Z:void 0,X:void 0,_:void 0,$:void 0,te:void 0,tt:void 0,ta:void 0,to:void 0,ti:void 0,tn:void 0,ts:void 0,th:void 0,tr:void 0,td:void 0,tl:void 0,tu:void 0,tc:void 0,tw:void 0,tm:void 0,tf:void 0,ty:void 0,tg:void 0,tp:void 0,tb:void 0,tT:void 0,tA:void 0,tO:void 0,tI:void 0,tS:void 0,tW:void 0,tC:void 0,tB:void 0,tv:void 0,tk:void 0}),v})()},Vt=document.getElementById("root");_t(()=>St(Qt,{}),Vt);