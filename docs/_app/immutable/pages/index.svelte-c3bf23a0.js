import{S as F,i as J,s as B,K as G,F as L,e as x,t as A,c as z,a as E,h as U,d as l,b as C,L as R,g as y,J as k,j as T,k as I,m as M,G as V,H as W,I as q,r as j,p as $,M as pt,N as ft,O as ht,n as st,P as ut,D as Y,x as K,y as O,z as Q,A as mt,B as nt,C as X,Q as rt}from"../chunks/index-40bf373d.js";const bt=s=>({}),lt=s=>({}),gt=s=>({}),it=s=>({}),kt=s=>({}),ct=s=>({});function vt(s){let t,o=(s[0]||"Unknown name")+"",n;return{c(){t=x("span"),n=A(o),this.h()},l(e){t=z(e,"SPAN",{class:!0});var a=E(t);n=U(a,o),a.forEach(l),this.h()},h(){C(t,"class","svelte-1lhrfaf"),R(t,"text-zinc-400",!s[0])},m(e,a){y(e,t,a),k(t,n)},p(e,a){a&1&&o!==(o=(e[0]||"Unknown name")+"")&&T(n,o),a&1&&R(t,"text-zinc-400",!e[0])},d(e){e&&l(t)}}}function _t(s){let t,o=(s[1]||"Unknown address")+"",n;return{c(){t=x("span"),n=A(o),this.h()},l(e){t=z(e,"SPAN",{class:!0});var a=E(t);n=U(a,o),a.forEach(l),this.h()},h(){C(t,"class","svelte-1lhrfaf"),R(t,"text-zinc-400",!s[1])},m(e,a){y(e,t,a),k(t,n)},p(e,a){a&2&&o!==(o=(e[1]||"Unknown address")+"")&&T(n,o),a&2&&R(t,"text-zinc-400",!e[1])},d(e){e&&l(t)}}}function yt(s){let t,o=(s[2]||"Unknown emails")+"",n;return{c(){t=x("span"),n=A(o),this.h()},l(e){t=z(e,"SPAN",{class:!0});var a=E(t);n=U(a,o),a.forEach(l),this.h()},h(){C(t,"class","svelte-1lhrfaf"),R(t,"text-zinc-400",!s[2])},m(e,a){y(e,t,a),k(t,n)},p(e,a){a&4&&o!==(o=(e[2]||"Unknown emails")+"")&&T(n,o),a&4&&R(t,"text-zinc-400",!e[2])},d(e){e&&l(t)}}}function xt(s){let t,o=(s[3]||"No notes")+"",n;return{c(){t=x("span"),n=A(o),this.h()},l(e){t=z(e,"SPAN",{class:!0});var a=E(t);n=U(a,o),a.forEach(l),this.h()},h(){C(t,"class","svelte-1lhrfaf"),R(t,"text-zinc-400",!s[3])},m(e,a){y(e,t,a),k(t,n)},p(e,a){a&8&&o!==(o=(e[3]||"No notes")+"")&&T(n,o),a&8&&R(t,"text-zinc-400",!e[3])},d(e){e&&l(t)}}}function zt(s){let t,o,n,e,a,d,p,f,h,r;const u=s[5].name,P=L(u,s,s[4],ct),w=P||vt(s),m=s[5].address,v=L(m,s,s[4],it),_=v||_t(s),N=s[5].email,i=L(N,s,s[4],lt),b=i||yt(s),D=s[5].default,H=L(D,s,s[4],null),S=H||xt(s);return{c(){t=x("article"),o=x("h2"),w&&w.c(),n=I(),e=x("div"),_&&_.c(),a=I(),d=x("div"),b&&b.c(),p=I(),f=x("div"),S&&S.c(),h=A(`\r
\r
	Powered by PeerPiper`),this.h()},l(c){t=z(c,"ARTICLE",{class:!0});var g=E(t);o=z(g,"H2",{class:!0});var tt=E(o);w&&w.l(tt),tt.forEach(l),n=M(g),e=z(g,"DIV",{class:!0});var et=E(e);_&&_.l(et),et.forEach(l),a=M(g),d=z(g,"DIV",{class:!0});var at=E(d);b&&b.l(at),at.forEach(l),p=M(g),f=z(g,"DIV",{class:!0});var ot=E(f);S&&S.l(ot),ot.forEach(l),h=U(g,`\r
\r
	Powered by PeerPiper`),g.forEach(l),this.h()},h(){C(o,"class","border-b border-indigo-600 pb-[.2em] mb-[1em] shadow-sm svelte-1lhrfaf"),C(e,"class","address svelte-1lhrfaf"),C(d,"class","leading-tight pl-[1.5em] mb-[.5em] svelte-1lhrfaf"),C(f,"class","leading-tight pl-[1.5em] mb-[.5em] svelte-1lhrfaf"),C(t,"class","m-4 w-96 border-solid border border-indigo-600/30 rounded-md shadow-lg shadow-indigo-300/30 p-[1em] svelte-1lhrfaf")},m(c,g){y(c,t,g),k(t,o),w&&w.m(o,null),k(t,n),k(t,e),_&&_.m(e,null),k(t,a),k(t,d),b&&b.m(d,null),k(t,p),k(t,f),S&&S.m(f,null),k(t,h),r=!0},p(c,[g]){P?P.p&&(!r||g&16)&&V(P,u,c,c[4],r?q(u,c[4],g,kt):W(c[4]),ct):w&&w.p&&(!r||g&1)&&w.p(c,r?g:-1),v?v.p&&(!r||g&16)&&V(v,m,c,c[4],r?q(m,c[4],g,gt):W(c[4]),it):_&&_.p&&(!r||g&2)&&_.p(c,r?g:-1),i?i.p&&(!r||g&16)&&V(i,N,c,c[4],r?q(N,c[4],g,bt):W(c[4]),lt):b&&b.p&&(!r||g&4)&&b.p(c,r?g:-1),H?H.p&&(!r||g&16)&&V(H,D,c,c[4],r?q(D,c[4],g,null):W(c[4]),null):S&&S.p&&(!r||g&8)&&S.p(c,r?g:-1)},i(c){r||(j(w,c),j(_,c),j(b,c),j(S,c),r=!0)},o(c){$(w,c),$(_,c),$(b,c),$(S,c),r=!1},d(c){c&&l(t),w&&w.d(c),_&&_.d(c),b&&b.d(c),S&&S.d(c)}}}function Et(s,t,o){let{$$slots:n={},$$scope:e}=t,{name:a}=t,{address:d}=t,{email:p}=t,{notes:f}=t;return s.$$set=h=>{"name"in h&&o(0,a=h.name),"address"in h&&o(1,d=h.address),"email"in h&&o(2,p=h.email),"notes"in h&&o(3,f=h.notes),"$$scope"in h&&o(4,e=h.$$scope)},[a,d,p,f,e,n]}class Ct extends F{constructor(t){super(),J(this,t,Et,zt,B,{name:0,address:1,email:2,notes:3})}get name(){return this.$$.ctx[0]}set name(t){this.$$set({name:t}),G()}get address(){return this.$$.ctx[1]}set address(t){this.$$set({address:t}),G()}get email(){return this.$$.ctx[2]}set email(t){this.$$set({email:t}),G()}get notes(){return this.$$.ctx[3]}set notes(t){this.$$set({notes:t}),G()}}function Pt(s){let t,o,n,e,a,d,p,f,h,r,u;document.title=t=s[0];const P=s[4].default,w=L(P,s,s[3],null);return{c(){o=x("meta"),n=x("meta"),e=I(),a=x("article"),d=x("h1"),p=A(s[0]),f=I(),w&&w.c(),h=A(`\r
	Written by: `),r=A(s[1]),this.h()},l(m){const v=pt('[data-svelte="svelte-1t7mdn8"]',document.head);o=z(v,"META",{property:!0,content:!0}),n=z(v,"META",{property:!0,content:!0}),v.forEach(l),e=M(m),a=z(m,"ARTICLE",{class:!0});var _=E(a);d=z(_,"H1",{});var N=E(d);p=U(N,s[0]),N.forEach(l),f=M(_),w&&w.l(_),h=U(_,`\r
	Written by: `),r=U(_,s[1]),_.forEach(l),this.h()},h(){C(o,"property","og:title"),C(o,"content",s[0]),C(n,"property","og:image"),C(n,"content",s[2]),C(a,"class","m-4 w-3/4")},m(m,v){k(document.head,o),k(document.head,n),y(m,e,v),y(m,a,v),k(a,d),k(d,p),k(a,f),w&&w.m(a,null),k(a,h),k(a,r),u=!0},p(m,[v]){(!u||v&1)&&t!==(t=m[0])&&(document.title=t),(!u||v&1)&&C(o,"content",m[0]),(!u||v&4)&&C(n,"content",m[2]),(!u||v&1)&&T(p,m[0]),w&&w.p&&(!u||v&8)&&V(w,P,m,m[3],u?q(P,m[3],v,null):W(m[3]),null),(!u||v&2)&&T(r,m[1])},i(m){u||(j(w,m),u=!0)},o(m){$(w,m),u=!1},d(m){l(o),l(n),m&&l(e),m&&l(a),w&&w.d(m)}}}function St(s,t,o){let{$$slots:n={},$$scope:e}=t,{title:a}=t,{author:d}=t,{coverImageUrl:p}=t;return s.$$set=f=>{"title"in f&&o(0,a=f.title),"author"in f&&o(1,d=f.author),"coverImageUrl"in f&&o(2,p=f.coverImageUrl),"$$scope"in f&&o(3,e=f.$$scope)},[a,d,p,e,n]}class At extends F{constructor(t){super(),J(this,t,St,Pt,B,{title:0,author:1,coverImageUrl:2})}}function Ut(s){let t,o,n;return{c(){t=x("span"),this.h()},l(e){t=z(e,"SPAN",{contenteditable:!0}),E(t).forEach(l),this.h()},h(){C(t,"contenteditable",""),s[0]===void 0&&ft(()=>s[2].call(t))},m(e,a){y(e,t,a),s[0]!==void 0&&(t.textContent=s[0]),o||(n=ht(t,"input",s[2]),o=!0)},p(e,[a]){a&1&&e[0]!==t.textContent&&(t.textContent=e[0])},i:st,o:st,d(e){e&&l(t),o=!1,n()}}}function It(s,t,o){const n=ut();let{item:e}=t;const a=h=>({key:Object.keys(h)[0],value:h[Object.keys(h)[0]]});let{key:d,value:p}=a(e);function f(){p=this.textContent,o(0,p)}return s.$$set=h=>{"item"in h&&o(1,e=h.item)},s.$$.update=()=>{s.$$.dirty&1&&p&&n("change",{[d]:p})},[p,e,f]}class Mt extends F{constructor(t){super(),J(this,t,It,Ut,B,{item:1})}}function Nt(s){let t,o,n,e,a,d,p,f=`<code class="language-svx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> Changable <span class="token keyword">from</span> <span class="token string">'./Changable.svelte'</span><span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">'Douglas'</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Changable</span> <span class="token attr-name">item=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token punctuation">&#123;</span> name <span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span></span> <span class="token attr-name"><span class="token namespace">on:</span>change</span> <span class="token punctuation">/></span></span>;</code>`,h,r,u,P,w,m,v,_,N;return w=new Mt({props:{item:{name:s[0]}}}),w.$on("change",s[2]),{c(){t=x("p"),o=A(dt),n=I(),e=x("h1"),a=A("Want to edit edit your data? Just make it Changable!"),d=I(),p=x("pre"),h=I(),r=x("p"),u=A(`This component makes the prop item contentEditable, and emits a \u2018change\u2019 event every time it changes,
so that consuming parents can update their copy of the data.`),P=I(),K(w.$$.fragment),m=I(),v=x("p"),_=A(wt),this.h()},l(i){t=z(i,"P",{});var b=E(t);o=U(b,dt),b.forEach(l),n=M(i),e=z(i,"H1",{});var D=E(e);a=U(D,"Want to edit edit your data? Just make it Changable!"),D.forEach(l),d=M(i),p=z(i,"PRE",{class:!0});var H=E(p);H.forEach(l),h=M(i),r=z(i,"P",{});var S=E(r);u=U(S,`This component makes the prop item contentEditable, and emits a \u2018change\u2019 event every time it changes,
so that consuming parents can update their copy of the data.`),S.forEach(l),P=M(i),O(w.$$.fragment,i),m=M(i),v=z(i,"P",{});var c=E(v);_=U(c,wt),c.forEach(l),this.h()},h(){C(p,"class","language-svx")},m(i,b){y(i,t,b),k(t,o),y(i,n,b),y(i,e,b),k(e,a),y(i,d,b),y(i,p,b),p.innerHTML=f,y(i,h,b),y(i,r,b),k(r,u),y(i,P,b),Q(w,i,b),y(i,m,b),y(i,v,b),k(v,_),N=!0},p(i,b){const D={};b&1&&(D.item={name:i[0]}),w.$set(D)},i(i){N||(j(w.$$.fragment,i),N=!0)},o(i){$(w.$$.fragment,i),N=!1},d(i){i&&l(t),i&&l(n),i&&l(e),i&&l(d),i&&l(p),i&&l(h),i&&l(r),i&&l(P),X(w,i),i&&l(m),i&&l(v)}}}function Dt(s){let t,o;const n=[s[1],Z];let e={$$slots:{default:[Nt]},$$scope:{ctx:s}};for(let a=0;a<n.length;a+=1)e=Y(e,n[a]);return t=new At({props:e}),{c(){K(t.$$.fragment)},l(a){O(t.$$.fragment,a)},m(a,d){Q(t,a,d),o=!0},p(a,[d]){const p=d&2?mt(n,[d&2&&nt(a[1]),d&0&&nt(Z)]):{};d&17&&(p.$$scope={dirty:d,ctx:a}),t.$set(p)},i(a){o||(j(t.$$.fragment,a),o=!0)},o(a){$(t.$$.fragment,a),o=!1},d(a){X(t,a)}}}const Z={layout:"demo",title:"Make your Data Changable",author:"@douganderson444"},{layout:Wt,title:dt,author:wt}=Z;function jt(s,t,o){let{name:n="Douglas"}=t;const e=a=>console.log(a.detail);return s.$$set=a=>{o(1,t=Y(Y({},t),rt(a))),"name"in a&&o(0,n=a.name)},t=rt(t),[n,t,e]}class $t extends F{constructor(t){super(),J(this,t,jt,Dt,B,{name:0})}}function Rt(s){let t,o;return{c(){t=x("span"),o=A(s[0]),this.h()},l(n){t=z(n,"SPAN",{slot:!0});var e=E(t);o=U(e,s[0]),e.forEach(l),this.h()},h(){C(t,"slot","name")},m(n,e){y(n,t,e),k(t,o)},p(n,e){e&1&&T(o,n[0])},d(n){n&&l(t)}}}function Tt(s){let t,o;return{c(){t=x("span"),o=A(s[1]),this.h()},l(n){t=z(n,"SPAN",{slot:!0});var e=E(t);o=U(e,s[1]),e.forEach(l),this.h()},h(){C(t,"slot","address")},m(n,e){y(n,t,e),k(t,o)},p(n,e){e&2&&T(o,n[1])},d(n){n&&l(t)}}}function Ht(s){let t,o,n,e,a,d,p,f,h;return d=new $t({}),f=new Ct({props:{$$slots:{address:[Tt],name:[Rt]},$$scope:{ctx:s}}}),{c(){t=x("div"),o=A("Demo "),n=x("pre"),e=A("awesome-peerpiper-components"),a=I(),K(d.$$.fragment),p=I(),K(f.$$.fragment)},l(r){t=z(r,"DIV",{});var u=E(t);o=U(u,"Demo "),n=z(u,"PRE",{});var P=E(n);e=U(P,"awesome-peerpiper-components"),P.forEach(l),u.forEach(l),a=M(r),O(d.$$.fragment,r),p=M(r),O(f.$$.fragment,r)},m(r,u){y(r,t,u),k(t,o),k(t,n),k(n,e),y(r,a,u),Q(d,r,u),y(r,p,u),Q(f,r,u),h=!0},p(r,[u]){const P={};u&7&&(P.$$scope={dirty:u,ctx:r}),f.$set(P)},i(r){h||(j(d.$$.fragment,r),j(f.$$.fragment,r),h=!0)},o(r){$(d.$$.fragment,r),$(f.$$.fragment,r),h=!1},d(r){r&&l(t),r&&l(a),X(d,r),r&&l(p),X(f,r)}}}function Lt(s,t,o){let{name:n="Douglas Anderson"}=t,{address:e="247 Main Street, USA"}=t;return s.$$set=a=>{"name"in a&&o(0,n=a.name),"address"in a&&o(1,e=a.address)},[n,e]}class qt extends F{constructor(t){super(),J(this,t,Lt,Ht,B,{name:0,address:1})}}export{qt as default};
