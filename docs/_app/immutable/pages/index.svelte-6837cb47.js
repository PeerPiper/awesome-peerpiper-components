import{S as B,i as F,s as G,K,F as V,e as y,t as I,c as C,a as P,h as S,d as r,b as A,L as R,g as E,J as b,j,k as N,m as M,G as W,H as J,I as q,r as z,p as H,M as me,N as pe,O as de,n as se,P as _e,D as Z,x as O,y as Q,z as X,A as he,B as oe,C as Y,Q as le}from"../chunks/index-40bf373d.js";/* empty css                    */const ke=s=>({}),re=s=>({}),ge=s=>({}),ie=s=>({}),be=s=>({}),ce=s=>({});function ve(s){let e,a=(s[0]||"Unknown name")+"",o;return{c(){e=y("span"),o=I(a),this.h()},l(t){e=C(t,"SPAN",{class:!0});var n=P(e);o=S(n,a),n.forEach(r),this.h()},h(){A(e,"class","svelte-2e98wf"),R(e,"missing",!s[0])},m(t,n){E(t,e,n),b(e,o)},p(t,n){n&1&&a!==(a=(t[0]||"Unknown name")+"")&&j(o,a),n&1&&R(e,"missing",!t[0])},d(t){t&&r(e)}}}function we(s){let e,a=(s[1]||"Unknown address")+"",o;return{c(){e=y("span"),o=I(a),this.h()},l(t){e=C(t,"SPAN",{class:!0});var n=P(e);o=S(n,a),n.forEach(r),this.h()},h(){A(e,"class","svelte-2e98wf"),R(e,"missing",!s[1])},m(t,n){E(t,e,n),b(e,o)},p(t,n){n&2&&a!==(a=(t[1]||"Unknown address")+"")&&j(o,a),n&2&&R(e,"missing",!t[1])},d(t){t&&r(e)}}}function Ee(s){let e,a=(s[2]||"Unknown emails")+"",o;return{c(){e=y("span"),o=I(a),this.h()},l(t){e=C(t,"SPAN",{class:!0});var n=P(e);o=S(n,a),n.forEach(r),this.h()},h(){A(e,"class","svelte-2e98wf"),R(e,"missing",!s[2])},m(t,n){E(t,e,n),b(e,o)},p(t,n){n&4&&a!==(a=(t[2]||"Unknown emails")+"")&&j(o,a),n&4&&R(e,"missing",!t[2])},d(t){t&&r(e)}}}function ye(s){let e,a=(s[3]||"No notes")+"",o;return{c(){e=y("span"),o=I(a),this.h()},l(t){e=C(t,"SPAN",{class:!0});var n=P(e);o=S(n,a),n.forEach(r),this.h()},h(){A(e,"class","svelte-2e98wf"),R(e,"missing",!s[3])},m(t,n){E(t,e,n),b(e,o)},p(t,n){n&8&&a!==(a=(t[3]||"No notes")+"")&&j(o,a),n&8&&R(e,"missing",!t[3])},d(t){t&&r(e)}}}function Ce(s){let e,a,o,t,n,f,m,p,d,l;const _=s[5].name,D=V(_,s,s[4],ce),u=D||ve(s),h=s[5].address,v=V(h,s,s[4],ie),w=v||we(s),$=s[5].email,i=V($,s,s[4],re),k=i||Ee(s),T=s[5].default,L=V(T,s,s[4],null),U=L||ye(s);return{c(){e=y("article"),a=y("h2"),u&&u.c(),o=N(),t=y("div"),w&&w.c(),n=N(),f=y("div"),k&&k.c(),m=N(),p=y("div"),U&&U.c(),d=I(`\r
\r
	Powered by PeerPiper`),this.h()},l(c){e=C(c,"ARTICLE",{class:!0});var g=P(e);a=C(g,"H2",{class:!0});var ee=P(a);u&&u.l(ee),ee.forEach(r),o=M(g),t=C(g,"DIV",{class:!0});var te=P(t);w&&w.l(te),te.forEach(r),n=M(g),f=C(g,"DIV",{class:!0});var ne=P(f);k&&k.l(ne),ne.forEach(r),m=M(g),p=C(g,"DIV",{class:!0});var ae=P(p);U&&U.l(ae),ae.forEach(r),d=S(g,`\r
\r
	Powered by PeerPiper`),g.forEach(r),this.h()},h(){A(a,"class","border-b border-indigo-600/40 pb-[.2em] mb-[1em] shadow-sm"),A(t,"class","address"),A(f,"class","leading-tight pl-[1.5em] mb-[.5em]"),A(p,"class","leading-tight pl-[1.5em] mb-[.5em]"),A(e,"class","m-4 w-96 border-solid border border-indigo-600/30 rounded-md shadow-lg shadow-indigo-300/30 p-[1em]")},m(c,g){E(c,e,g),b(e,a),u&&u.m(a,null),b(e,o),b(e,t),w&&w.m(t,null),b(e,n),b(e,f),k&&k.m(f,null),b(e,m),b(e,p),U&&U.m(p,null),b(e,d),l=!0},p(c,[g]){D?D.p&&(!l||g&16)&&W(D,_,c,c[4],l?q(_,c[4],g,be):J(c[4]),ce):u&&u.p&&(!l||g&1)&&u.p(c,l?g:-1),v?v.p&&(!l||g&16)&&W(v,h,c,c[4],l?q(h,c[4],g,ge):J(c[4]),ie):w&&w.p&&(!l||g&2)&&w.p(c,l?g:-1),i?i.p&&(!l||g&16)&&W(i,$,c,c[4],l?q($,c[4],g,ke):J(c[4]),re):k&&k.p&&(!l||g&4)&&k.p(c,l?g:-1),L?L.p&&(!l||g&16)&&W(L,T,c,c[4],l?q(T,c[4],g,null):J(c[4]),null):U&&U.p&&(!l||g&8)&&U.p(c,l?g:-1)},i(c){l||(z(u,c),z(w,c),z(k,c),z(U,c),l=!0)},o(c){H(u,c),H(w,c),H(k,c),H(U,c),l=!1},d(c){c&&r(e),u&&u.d(c),w&&w.d(c),k&&k.d(c),U&&U.d(c)}}}function Pe(s,e,a){let{$$slots:o={},$$scope:t}=e,{name:n}=e,{address:f}=e,{email:m}=e,{notes:p}=e;return s.$$set=d=>{"name"in d&&a(0,n=d.name),"address"in d&&a(1,f=d.address),"email"in d&&a(2,m=d.email),"notes"in d&&a(3,p=d.notes),"$$scope"in d&&a(4,t=d.$$scope)},[n,f,m,p,t,o]}class Ae extends B{constructor(e){super(),F(this,e,Pe,Ce,G,{name:0,address:1,email:2,notes:3})}get name(){return this.$$.ctx[0]}set name(e){this.$$set({name:e}),K()}get address(){return this.$$.ctx[1]}set address(e){this.$$set({address:e}),K()}get email(){return this.$$.ctx[2]}set email(e){this.$$set({email:e}),K()}get notes(){return this.$$.ctx[3]}set notes(e){this.$$set({notes:e}),K()}}function De(s){let e,a,o,t,n,f,m,p,d,l,_;document.title=e=s[0];const D=s[4].default,u=V(D,s,s[3],null);return{c(){a=y("meta"),o=y("meta"),t=N(),n=y("article"),f=y("h1"),m=I(s[0]),p=N(),u&&u.c(),d=I(`\r
	Written by: `),l=I(s[1]),this.h()},l(h){const v=me('[data-svelte="svelte-1t7mdn8"]',document.head);a=C(v,"META",{property:!0,content:!0}),o=C(v,"META",{property:!0,content:!0}),v.forEach(r),t=M(h),n=C(h,"ARTICLE",{class:!0});var w=P(n);f=C(w,"H1",{});var $=P(f);m=S($,s[0]),$.forEach(r),p=M(w),u&&u.l(w),d=S(w,`\r
	Written by: `),l=S(w,s[1]),w.forEach(r),this.h()},h(){A(a,"property","og:title"),A(a,"content",s[0]),A(o,"property","og:image"),A(o,"content",s[2]),A(n,"class","m-4 w-3/4")},m(h,v){b(document.head,a),b(document.head,o),E(h,t,v),E(h,n,v),b(n,f),b(f,m),b(n,p),u&&u.m(n,null),b(n,d),b(n,l),_=!0},p(h,[v]){(!_||v&1)&&e!==(e=h[0])&&(document.title=e),(!_||v&1)&&A(a,"content",h[0]),(!_||v&4)&&A(o,"content",h[2]),(!_||v&1)&&j(m,h[0]),u&&u.p&&(!_||v&8)&&W(u,D,h,h[3],_?q(D,h[3],v,null):J(h[3]),null),(!_||v&2)&&j(l,h[1])},i(h){_||(z(u,h),_=!0)},o(h){H(u,h),_=!1},d(h){r(a),r(o),h&&r(t),h&&r(n),u&&u.d(h)}}}function Ue(s,e,a){let{$$slots:o={},$$scope:t}=e,{title:n}=e,{author:f}=e,{coverImageUrl:m}=e;return s.$$set=p=>{"title"in p&&a(0,n=p.title),"author"in p&&a(1,f=p.author),"coverImageUrl"in p&&a(2,m=p.coverImageUrl),"$$scope"in p&&a(3,t=p.$$scope)},[n,f,m,t,o]}class Ie extends B{constructor(e){super(),F(this,e,Ue,De,G,{title:0,author:1,coverImageUrl:2})}}function Se(s){let e,a,o;return{c(){e=y("span"),this.h()},l(t){e=C(t,"SPAN",{contenteditable:!0}),P(e).forEach(r),this.h()},h(){A(e,"contenteditable",""),s[0]===void 0&&pe(()=>s[2].call(e))},m(t,n){E(t,e,n),s[0]!==void 0&&(e.textContent=s[0]),a||(o=de(e,"input",s[2]),a=!0)},p(t,[n]){n&1&&t[0]!==e.textContent&&(e.textContent=t[0])},i:se,o:se,d(t){t&&r(e),a=!1,o()}}}function Ne(s,e,a){const o=_e();let{item:t}=e;const n=d=>({key:Object.keys(d)[0],value:d[Object.keys(d)[0]]});let{key:f,value:m}=n(t);function p(){m=this.textContent,a(0,m)}return s.$$set=d=>{"item"in d&&a(1,t=d.item)},s.$$.update=()=>{s.$$.dirty&1&&m&&o("change",{[f]:m})},[m,t,p]}class Me extends B{constructor(e){super(),F(this,e,Ne,Se,G,{item:1})}}function $e(s){let e,a,o,t,n,f,m,p=`<code class="language-svx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> Changable <span class="token keyword">from</span> <span class="token string">'./Changable.svelte'</span><span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">'Douglas'</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Changable</span> <span class="token attr-name">item=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token punctuation">&#123;</span> name <span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span></span> <span class="token attr-name"><span class="token namespace">on:</span>change</span> <span class="token punctuation">/></span></span>;</code>`,d,l,_,D,u,h,v,w,$;return u=new Me({props:{item:{name:s[0]}}}),u.$on("change",s[2]),{c(){e=y("p"),a=I(fe),o=N(),t=y("h1"),n=I("Want to edit edit your data? Just make it Changable!"),f=N(),m=y("pre"),d=N(),l=y("p"),_=I(`This component makes the prop item contentEditable, and emits a \u2018change\u2019 event every time it changes,
so that consuming parents can update their copy of the data.`),D=N(),O(u.$$.fragment),h=N(),v=y("p"),w=I(ue),this.h()},l(i){e=C(i,"P",{});var k=P(e);a=S(k,fe),k.forEach(r),o=M(i),t=C(i,"H1",{});var T=P(t);n=S(T,"Want to edit edit your data? Just make it Changable!"),T.forEach(r),f=M(i),m=C(i,"PRE",{class:!0});var L=P(m);L.forEach(r),d=M(i),l=C(i,"P",{});var U=P(l);_=S(U,`This component makes the prop item contentEditable, and emits a \u2018change\u2019 event every time it changes,
so that consuming parents can update their copy of the data.`),U.forEach(r),D=M(i),Q(u.$$.fragment,i),h=M(i),v=C(i,"P",{});var c=P(v);w=S(c,ue),c.forEach(r),this.h()},h(){A(m,"class","language-svx")},m(i,k){E(i,e,k),b(e,a),E(i,o,k),E(i,t,k),b(t,n),E(i,f,k),E(i,m,k),m.innerHTML=p,E(i,d,k),E(i,l,k),b(l,_),E(i,D,k),X(u,i,k),E(i,h,k),E(i,v,k),b(v,w),$=!0},p(i,k){const T={};k&1&&(T.item={name:i[0]}),u.$set(T)},i(i){$||(z(u.$$.fragment,i),$=!0)},o(i){H(u.$$.fragment,i),$=!1},d(i){i&&r(e),i&&r(o),i&&r(t),i&&r(f),i&&r(m),i&&r(d),i&&r(l),i&&r(D),Y(u,i),i&&r(h),i&&r(v)}}}function Te(s){let e,a;const o=[s[1],x];let t={$$slots:{default:[$e]},$$scope:{ctx:s}};for(let n=0;n<o.length;n+=1)t=Z(t,o[n]);return e=new Ie({props:t}),{c(){O(e.$$.fragment)},l(n){Q(e.$$.fragment,n)},m(n,f){X(e,n,f),a=!0},p(n,[f]){const m=f&2?he(o,[f&2&&oe(n[1]),f&0&&oe(x)]):{};f&17&&(m.$$scope={dirty:f,ctx:n}),e.$set(m)},i(n){a||(z(e.$$.fragment,n),a=!0)},o(n){H(e.$$.fragment,n),a=!1},d(n){Y(e,n)}}}const x={layout:"demo",title:"Make your Data Changable",author:"@douganderson444"},{layout:qe,title:fe,author:ue}=x;function ze(s,e,a){let{name:o="Douglas"}=e;const t=n=>console.log(n.detail);return s.$$set=n=>{a(1,e=Z(Z({},e),le(n))),"name"in n&&a(0,o=n.name)},e=le(e),[o,e,t]}class He extends B{constructor(e){super(),F(this,e,ze,Te,G,{name:0})}}function Re(s){let e,a;return{c(){e=y("span"),a=I(s[0]),this.h()},l(o){e=C(o,"SPAN",{slot:!0});var t=P(e);a=S(t,s[0]),t.forEach(r),this.h()},h(){A(e,"slot","name")},m(o,t){E(o,e,t),b(e,a)},p(o,t){t&1&&j(a,o[0])},d(o){o&&r(e)}}}function je(s){let e,a;return{c(){e=y("span"),a=I(s[1]),this.h()},l(o){e=C(o,"SPAN",{slot:!0});var t=P(e);a=S(t,s[1]),t.forEach(r),this.h()},h(){A(e,"slot","address")},m(o,t){E(o,e,t),b(e,a)},p(o,t){t&2&&j(a,o[1])},d(o){o&&r(e)}}}function Le(s){let e,a,o,t,n,f,m,p,d;return f=new He({}),p=new Ae({props:{$$slots:{address:[je],name:[Re]},$$scope:{ctx:s}}}),{c(){e=y("div"),a=I("Demo "),o=y("pre"),t=I("awesome-peerpiper-components"),n=N(),O(f.$$.fragment),m=N(),O(p.$$.fragment)},l(l){e=C(l,"DIV",{});var _=P(e);a=S(_,"Demo "),o=C(_,"PRE",{});var D=P(o);t=S(D,"awesome-peerpiper-components"),D.forEach(r),_.forEach(r),n=M(l),Q(f.$$.fragment,l),m=M(l),Q(p.$$.fragment,l)},m(l,_){E(l,e,_),b(e,a),b(e,o),b(o,t),E(l,n,_),X(f,l,_),E(l,m,_),X(p,l,_),d=!0},p(l,[_]){const D={};_&7&&(D.$$scope={dirty:_,ctx:l}),p.$set(D)},i(l){d||(z(f.$$.fragment,l),z(p.$$.fragment,l),d=!0)},o(l){H(f.$$.fragment,l),H(p.$$.fragment,l),d=!1},d(l){l&&r(e),l&&r(n),Y(f,l),l&&r(m),Y(p,l)}}}function Ve(s,e,a){let{name:o="Douglas Anderson"}=e,{address:t="247 Main Street, USA"}=e;return s.$$set=n=>{"name"in n&&a(0,o=n.name),"address"in n&&a(1,t=n.address)},[o,t]}class Be extends B{constructor(e){super(),F(this,e,Ve,Le,G,{name:0,address:1})}}export{Be as default};