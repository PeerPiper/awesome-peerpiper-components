function P(){}function Zt(e){return e()}function Ht(){return Object.create(null)}function Q(e){e.forEach(Zt)}function Ut(e){return typeof e=="function"}function nt(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let ut,et;function Et(e,t){return ut||(ut=document.createElement("a")),ut.href=t,e===ut.href}function D(e,t,n,s){if(e){const o=Dt(e,t,n,s);return e[0](o)}}function Dt(e,t,n,s){return e[1]&&s?function(o,r){for(const i in r)o[i]=r[i];return o}(n.ctx.slice(),e[1](s(t))):n.ctx}function R(e,t,n,s){if(e[2]&&s){const o=e[2](s(n));if(t.dirty===void 0)return o;if(typeof o=="object"){const r=[],i=Math.max(t.dirty.length,o.length);for(let a=0;a<i;a+=1)r[a]=t.dirty[a]|o[a];return r}return t.dirty|o}return t.dirty}function O(e,t,n,s,o,r){if(o){const i=Dt(t,n,s,r);e.p(i,o)}}function U(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let s=0;s<n;s++)t[s]=-1;return t}return-1}function f(e,t){e.appendChild(t)}function Rt(e,t,n){const s=function(o){if(!o)return document;const r=o.getRootNode?o.getRootNode():o.ownerDocument;return r&&r.host?r:o.ownerDocument}(e);if(!s.getElementById(t)){const o=g("style");o.id=t,o.textContent=n,function(r,i){f(r.head||r,i)}(s,o)}}function H(e,t,n){e.insertBefore(t,n||null)}function L(e){e.parentNode.removeChild(e)}function g(e){return document.createElement(e)}function ft(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function B(){return e=" ",document.createTextNode(e);var e}function ht(e,t,n,s){return e.addEventListener(t,n,s),()=>e.removeEventListener(t,n,s)}function w(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Vt(e,t,n){e.setAttributeNS("http://www.w3.org/1999/xlink",t,n)}function W(e,t,n,s){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,s?"important":"")}function tt(e){et=e}function Ot(){const e=function(){if(!et)throw new Error("Function called outside component initialization");return et}();return(t,n,{cancelable:s=!1}={})=>{const o=e.$$.callbacks[t];if(o){const r=function(i,a,{bubbles:u=!1,cancelable:l=!1}={}){const d=document.createEvent("CustomEvent");return d.initCustomEvent(i,u,l,a),d}(t,n,{cancelable:s});return o.slice().forEach(i=>{i.call(e,r)}),!r.defaultPrevented}return!0}}const Y=[],F=[],wt=[],Ct=[],It=Promise.resolve();let zt=!1;function yt(e){wt.push(e)}function G(e){Ct.push(e)}const $t=new Set;let mt=0;function S(){const e=et;do{for(;mt<Y.length;){const t=Y[mt];mt++,tt(t),Tt(t.$$)}for(tt(null),Y.length=0,mt=0;F.length;)F.pop()();for(let t=0;t<wt.length;t+=1){const n=wt[t];$t.has(n)||($t.add(n),n())}wt.length=0}while(Y.length);for(;Ct.length;)Ct.pop()();zt=!1,$t.clear(),tt(e)}function Tt(e){if(e.fragment!==null){e.update(),Q(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(yt)}}const bt=new Set;function y(e,t){e&&e.i&&(bt.delete(e),e.i(t))}function v(e,t,n,s){if(e&&e.o){if(bt.has(e))return;bt.add(e),(void 0).c.push(()=>{bt.delete(e),s&&(n&&e.d(1),s())}),e.o(t)}}function J(e,t,n){const s=e.$$.props[t];s!==void 0&&(e.$$.bound[s]=n,n(e.$$.ctx[s]))}function j(e){e&&e.c()}function M(e,t,n,s){const{fragment:o,on_mount:r,on_destroy:i,after_update:a}=e.$$;o&&o.m(t,n),s||yt(()=>{const u=r.map(Zt).filter(Ut);i?i.push(...u):Q(u),e.$$.on_mount=[]}),a.forEach(yt)}function _(e,t){const n=e.$$;n.fragment!==null&&(Q(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Gt(e,t){e.$$.dirty[0]===-1&&(Y.push(e),zt||(zt=!0,It.then(S)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function ot(e,t,n,s,o,r,i,a=[-1]){const u=et;tt(e);const l=e.$$={fragment:null,ctx:null,props:r,update:P,not_equal:o,bound:Ht(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(u?u.$$.context:[])),callbacks:Ht(),dirty:a,skip_bound:!1,root:t.target||u.$$.root};i&&i(l.root);let d=!1;if(l.ctx=n?n(e,t.props||{},(c,b,...k)=>{const E=k.length?k[0]:b;return l.ctx&&o(l.ctx[c],l.ctx[c]=E)&&(!l.skip_bound&&l.bound[c]&&l.bound[c](E),d&&Gt(e,c)),b}):[],l.update(),d=!0,Q(l.before_update),l.fragment=!!s&&s(l.ctx),t.target){if(t.hydrate){const c=function(b){return Array.from(b.childNodes)}(t.target);l.fragment&&l.fragment.l(c),c.forEach(L)}else l.fragment&&l.fragment.c();t.intro&&y(e.$$.fragment),M(e,t.target,t.anchor,t.customElement),S()}tt(u)}class it{$destroy(){_(this,1),this.$destroy=P}$on(t,n){const s=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return s.push(n),()=>{const o=s.indexOf(n);o!==-1&&s.splice(o,1)}}$set(t){var n;this.$$set&&(n=t,Object.keys(n).length!==0)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function Jt(e){let t,n,s;return{c(){t=g("span"),w(t,"contenteditable",""),w(t,"class","align-middle"),e[0]===void 0&&yt(()=>e[5].call(t))},m(o,r){H(o,t,r),e[4](t),e[0]!==void 0&&(t.textContent=e[0]),n||(s=[ht(t,"input",e[5]),ht(t,"keydown",e[2])],n=!0)},p(o,[r]){1&r&&o[0]!==t.textContent&&(t.textContent=o[0])},i:P,o:P,d(o){o&&L(t),e[4](null),n=!1,Q(s)}}}function Kt(e,t,n){Ot();let s,{item:o}=t,{options:r={singleLine:!0}}=t;return e.$$set=i=>{"item"in i&&n(0,o=i.item),"options"in i&&n(3,r=i.options)},[o,s,i=>{i.keyCode===13&&r.singleLine&&(i.preventDefault(),s.blur())},r,function(i){F[i?"unshift":"push"](()=>{s=i,n(1,s)})},function(){o=this.textContent,n(0,o)}]}class K extends it{constructor(t){super(),ot(this,t,Kt,Jt,nt,{item:0,options:3})}get item(){return this.$$.ctx[0]}set item(t){this.$$set({item:t}),S()}get options(){return this.$$.ctx[3]}set options(t){this.$$set({options:t}),S()}}function Qt(e){let t;return{c(){t=g("div"),t.innerHTML='<svg><symbol id="avatar" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z"></path></symbol><symbol id="address" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M412 414a111 111 0 0 1 90-77v-40h31c7 0 13-6 13-13v-15c0-5-2-9-7-11L355 153c-4-2-8-2-12 0l-65 37v-13c0-5-4-9-9-9h-29c-5 0-8 4-8 9v39l-74 42c-4 2-7 7-7 11v15c0 7 6 13 13 13h31v180c0 12 9 21 20 21h203c-13-25-15-56-6-84z"></path><path d="M592 412a81 81 0 0 0-109-36 82 82 0 0 0-36 109l61 108c5 9 18 9 23 0l61-108c12-22 12-49 0-73zm-73 72a35 35 0 1 1 0-70 35 35 0 1 1 0 70z"></path></symbol><symbol id="email" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="m582.1 312.4-197.5-128c-4.3-2.8-10-2.8-14.4 0l-199 128c-3.8 2.4-7.8 6.6-7.8 11v230.3c0 7.3 9.3 15.6 16.6 15.6h394.5c7.3 0 14.1-8.3 14.1-15.6V323.4c0-4.4-2.7-8.6-6.4-11zm-385 35.2 113 73.3-113 103zm131.8 88 41.2 26.8a13.2 13.2 0 0 0 14.3 0l41.1-26.8 115 104.7H214zM451.5 421l113-73.3V524zm-74.3-209.8 173.1 112.3-173 112.3-173.1-112.3zm0 200.6c20.7 0 40.9-7.3 56.7-20.6A13.2 13.2 0 0 0 417 371a62 62 0 1 1 22.2-47.5c0 6-4.9 10.9-10.8 10.9a11 11 0 0 1-10.9-10v-.9a40.3 40.3 0 1 0-12.3 29 37 37 0 0 0 60.3-29 88.4 88.4 0 1 0-88.3 88.4zm0-74.3a14 14 0 1 1 0-28 14 14 0 0 1 0 28z"></path></symbol><symbol id="phone" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path fill-rule="evenodd" d="m587 561-3 3c-96 96-241-7-315-81S92 264 188 168l3-3 107 106-13 14a39 39 0 0 0-5 49 503 503 0 0 0 138 138c16 11 36 9 49-5l14-13zm-92-118 104 103c7-14 4-33-8-45l-51-51a39 39 0 0 0-45-7zM206 153l103 104c7-15 5-33-7-45l-51-51a39 39 0 0 0-45-8z"></path></symbol><symbol id="arrow-left" class="icon" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></symbol><symbol id="arrow-right" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></symbol><symbol id="arrow-up" class="icon" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></symbol><symbol id="arrow-down" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></symbol><symbol id="check" class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></symbol><symbol id="close" class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></symbol><symbol id="download" class="icon" viewBox="0 0 24 24"><path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></symbol><symbol id="edit" class="icon" viewBox="0 0 24 24"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></symbol><symbol id="github" class="icon" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12Z" fill="currentColor" stroke="none"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.59162 22.7357C9.49492 22.6109 9.49492 21.4986 9.59162 19.399C8.55572 19.4347 7.90122 19.3628 7.62812 19.1833C7.21852 18.9139 6.80842 18.0833 6.44457 17.4979C6.08072 16.9125 5.27312 16.8199 4.94702 16.6891C4.62091 16.5582 4.53905 16.0247 5.84562 16.4282C7.15222 16.8316 7.21592 17.9303 7.62812 18.1872C8.04032 18.4441 9.02572 18.3317 9.47242 18.1259C9.91907 17.9201 9.88622 17.1538 9.96587 16.8503C10.0666 16.5669 9.71162 16.5041 9.70382 16.5018C9.26777 16.5018 6.97697 16.0036 6.34772 13.7852C5.71852 11.5669 6.52907 10.117 6.96147 9.49369C7.24972 9.07814 7.22422 8.19254 6.88497 6.83679C8.11677 6.67939 9.06732 7.06709 9.73672 7.99999C9.73737 8.00534 10.6143 7.47854 12.0001 7.47854C13.386 7.47854 13.8777 7.90764 14.2571 7.99999C14.6365 8.09234 14.94 6.36699 17.2834 6.83679C16.7942 7.79839 16.3844 8.99999 16.6972 9.49369C17.0099 9.98739 18.2372 11.5573 17.4833 13.7852C16.9807 15.2706 15.9927 16.1761 14.5192 16.5018C14.3502 16.5557 14.2658 16.6427 14.2658 16.7627C14.2658 16.9427 14.4942 16.9624 14.8233 17.8058C15.0426 18.368 15.0585 19.9739 14.8708 22.6234C14.3953 22.7445 14.0254 22.8257 13.7611 22.8673C13.2924 22.9409 12.7835 22.9822 12.2834 22.9982C11.7834 23.0141 11.6098 23.0123 10.9185 22.948C10.4577 22.9051 10.0154 22.8343 9.59162 22.7357Z" fill="currentColor" stroke="none"></path></symbol><symbol id="git-branch" class="icon" viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></symbol><symbol id="log-in" class="icon" viewBox="0 0 24 24"><path d="M15 3H19A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H15"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></symbol><symbol id="maximize" class="icon" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></symbol><symbol id="maximize-2" class="icon" viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></symbol><symbol id="menu" class="icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></symbol><symbol id="message-square" class="icon" viewBox="0 0 24 24"><g transform="translate(0, 1)"><path d="M16.5 19H11V15H18V11H22V19H19.5L18 20.5L16.5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 3H18V15H8.5L6.5 17L4.5 15H2V3Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 11H9" stroke="white" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 7H12" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></g></symbol><symbol id="minus" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="plus" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="save" class="icon" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></symbol><symbol id="link" class="icon" viewBox="0 0 24 24"><path d="M9,7L6,7A2 2 0 0 0 6,17L9,17"></path><path d="M15,7L18,7A2 2 0 0 1 18,17L15,17"></path><path d="M7,12L17,12"></path></symbol><symbol id="chevron" class="icon" viewBox="0 0 24 24"><path d="M2,7 L12,17 L20,7"></path></symbol><symbol id="delete" class="icon" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M22 4.2h-5.6L15 1.6c-.1-.2-.4-.4-.7-.4H9.6c-.2 0-.5.2-.6.4L7.6 4.2H2c-.4 0-.8.4-.8.8s.4.8.8.8h1.8V22c0 .4.3.8.8.8h15c.4 0 .8-.3.8-.8V5.8H22c.4 0 .8-.3.8-.8s-.4-.8-.8-.8zM10.8 16.5c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5zm4 0c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5z"></path></symbol></svg>',W(t,"display","none")},m(n,s){H(n,t,s)},p:P,i:P,o:P,d(n){n&&L(t)}}}class Xt extends it{constructor(t){super(),ot(this,t,null,Qt,nt,{})}}function Yt(e){Rt(e,"svelte-b6ce0n",".icon.svelte-b6ce0n{position:relative;overflow:hidden;vertical-align:middle;-o-object-fit:contain;object-fit:contain;transform-origin:center center;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:currentColor}")}function Wt(e){let t,n,s,o,r,i,a;const u=e[3].default,l=D(u,e,e[2],null);return i=new Xt({}),{c(){t=ft("svg"),n=ft("use"),o=B(),l&&l.c(),r=B(),j(i.$$.fragment),Vt(n,"xlink:href",s="#"+e[0]),w(t,"width",e[1]),w(t,"height",e[1]),w(t,"class","icon  svelte-b6ce0n")},m(d,c){H(d,t,c),f(t,n),H(d,o,c),l&&l.m(d,c),H(d,r,c),M(i,d,c),a=!0},p(d,[c]){(!a||1&c&&s!==(s="#"+d[0]))&&Vt(n,"xlink:href",s),(!a||2&c)&&w(t,"width",d[1]),(!a||2&c)&&w(t,"height",d[1]),l&&l.p&&(!a||4&c)&&O(l,u,d,d[2],a?R(u,d[2],c,null):U(d[2]),null)},i(d){a||(y(l,d),y(i.$$.fragment,d),a=!0)},o(d){v(l,d),v(i.$$.fragment,d),a=!1},d(d){d&&L(t),d&&L(o),l&&l.d(d),d&&L(r),_(i,d)}}}function te(e,t,n){let{$$slots:s={},$$scope:o}=t,{name:r}=t,{size:i=32}=t;return e.$$set=a=>{"name"in a&&n(0,r=a.name),"size"in a&&n(1,i=a.size),"$$scope"in a&&n(2,o=a.$$scope)},[r,i,o,s]}class ee extends it{constructor(t){super(),ot(this,t,te,Wt,nt,{name:0,size:1},Yt)}get name(){return this.$$.ctx[0]}set name(t){this.$$set({name:t}),S()}get size(){return this.$$.ctx[1]}set size(t){this.$$set({size:t}),S()}}function ne(e){let t,n,s,o,r,i,a;o=new ee({props:{name:e[0]}});const u=e[2].default,l=D(u,e,e[1],null);return{c(){t=g("div"),n=g("div"),s=g("div"),j(o.$$.fragment),r=B(),i=g("div"),l&&l.c(),w(s,"class","text-slate-500"),w(n,"class","align-middle"),w(i,"class","align-middle"),w(t,"class","flex align-middle text-center justify-center bg-contain bg-no-repeat m-2")},m(d,c){H(d,t,c),f(t,n),f(n,s),M(o,s,null),f(t,r),f(t,i),l&&l.m(i,null),a=!0},p(d,[c]){const b={};1&c&&(b.name=d[0]),o.$set(b),l&&l.p&&(!a||2&c)&&O(l,u,d,d[1],a?R(u,d[1],c,null):U(d[1]),null)},i(d){a||(y(o.$$.fragment,d),y(l,d),a=!0)},o(d){v(o.$$.fragment,d),v(l,d),a=!1},d(d){d&&L(t),_(o),l&&l.d(d)}}}function oe(e,t,n){let{$$slots:s={},$$scope:o}=t,{name:r}=t;return e.$$set=i=>{"name"in i&&n(0,r=i.name),"$$scope"in i&&n(1,o=i.$$scope)},[r,o,s]}class kt extends it{constructor(t){super(),ot(this,t,oe,ne,nt,{name:0})}get name(){return this.$$.ctx[0]}set name(t){this.$$set({name:t}),S()}}function ie(e){Rt(e,"svelte-1ke8y8b",".svelte-1ke8y8b,.svelte-1ke8y8b::before,.svelte-1ke8y8b::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#E5E7EB}.svelte-1ke8y8b::before,.svelte-1ke8y8b::after{--tw-content:''}input.svelte-1ke8y8b{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}.svelte-1ke8y8b:-moz-focusring{outline:auto}.svelte-1ke8y8b:-moz-ui-invalid{box-shadow:none}.svelte-1ke8y8b::-webkit-inner-spin-button,.svelte-1ke8y8b::-webkit-outer-spin-button{height:auto}.svelte-1ke8y8b::-webkit-search-decoration{-webkit-appearance:none}.svelte-1ke8y8b::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}blockquote.svelte-1ke8y8b,p.svelte-1ke8y8b{margin:0}input.svelte-1ke8y8b::-moz-placeholder{opacity:1;color:#9CA3AF}input.svelte-1ke8y8b:-ms-input-placeholder{opacity:1;color:#9CA3AF}input.svelte-1ke8y8b::placeholder{opacity:1;color:#9CA3AF}.svelte-1ke8y8b:disabled{cursor:default}img.svelte-1ke8y8b,svg.svelte-1ke8y8b{display:block;vertical-align:middle}img.svelte-1ke8y8b{max-width:100%;height:auto}input.svelte-1ke8y8b::-moz-placeholder{color:#6B7280;opacity:1}input.svelte-1ke8y8b:-ms-input-placeholder{color:#6B7280;opacity:1}input.svelte-1ke8y8b::placeholder{color:#6B7280;opacity:1}.svelte-1ke8y8b::-webkit-datetime-edit-fields-wrapper{padding:0}.svelte-1ke8y8b::-webkit-date-and-time-value{min-height:1.5em}[type='file'].svelte-1ke8y8b{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type='file'].svelte-1ke8y8b:focus{outline:1px auto inherit}input[type=file].svelte-1ke8y8b::-webkit-file-upload-button{color:white;background:#1F2937;border:0;font-weight:500;font-size:0.875rem;cursor:pointer;padding-top:0.625rem;padding-bottom:0.625rem;padding-left:2rem;padding-right:1rem;-webkit-margin-start:-1rem;margin-inline-start:-1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}input[type=file].svelte-1ke8y8b::file-selector-button{color:white;background:#1F2937;border:0;font-weight:500;font-size:0.875rem;cursor:pointer;padding-top:0.625rem;padding-bottom:0.625rem;padding-left:2rem;padding-right:1rem;-webkit-margin-start:-1rem;margin-inline-start:-1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}input[type=file].svelte-1ke8y8b::-webkit-file-upload-button:hover{background:#374151}input[type=file].svelte-1ke8y8b::file-selector-button:hover{background:#374151}.svelte-1ke8y8b,.svelte-1ke8y8b::before,.svelte-1ke8y8b::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1ke8y8b::-webkit-backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1ke8y8b::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.absolute.svelte-1ke8y8b{position:absolute}.relative.svelte-1ke8y8b{position:relative}.z-10.svelte-1ke8y8b{z-index:10}.m-auto.svelte-1ke8y8b{margin:auto}.my-28.svelte-1ke8y8b{margin-top:7rem;margin-bottom:7rem}.mx-auto.svelte-1ke8y8b{margin-left:auto;margin-right:auto}.mx-2.svelte-1ke8y8b{margin-left:0.5rem;margin-right:0.5rem}.-mt-20.svelte-1ke8y8b{margin-top:-5rem}.mt-5.svelte-1ke8y8b{margin-top:1.25rem}.mb-7.svelte-1ke8y8b{margin-bottom:1.75rem}.flex.svelte-1ke8y8b{display:flex}.h-24.svelte-1ke8y8b{height:6rem}.h-32.svelte-1ke8y8b{height:8rem}.w-96.svelte-1ke8y8b{width:24rem}.w-32.svelte-1ke8y8b{width:8rem}.max-w-lg.svelte-1ke8y8b{max-width:32rem}.max-w-none.svelte-1ke8y8b{max-width:none}.flex-none.svelte-1ke8y8b{flex:none}@-webkit-keyframes svelte-1ke8y8b-spin{to{transform:rotate(360deg)}}@keyframes svelte-1ke8y8b-spin{to{transform:rotate(360deg)}}.items-center.svelte-1ke8y8b{align-items:center}.justify-center.svelte-1ke8y8b{justify-content:center}.overflow-hidden.svelte-1ke8y8b{overflow:hidden}.rounded-2xl.svelte-1ke8y8b{border-radius:1rem}.rounded-full.svelte-1ke8y8b{border-radius:9999px}.bg-slate-100.svelte-1ke8y8b{--tw-bg-opacity:1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.bg-white.svelte-1ke8y8b{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-green-400.svelte-1ke8y8b{--tw-bg-opacity:1;background-color:rgb(49 196 141 / var(--tw-bg-opacity))}.fill-slate-500.svelte-1ke8y8b{fill:#64748b}.object-cover.svelte-1ke8y8b{-o-object-fit:cover;object-fit:cover}.px-3.svelte-1ke8y8b{padding-left:0.75rem;padding-right:0.75rem}.text-center.svelte-1ke8y8b{text-align:center}.text-xl.svelte-1ke8y8b{font-size:1.25rem;line-height:1.75rem}.text-base.svelte-1ke8y8b{font-size:1rem;line-height:1.5rem}.text-sky-500.svelte-1ke8y8b{--tw-text-opacity:1;color:rgb(14 165 233 / var(--tw-text-opacity))}.text-white.svelte-1ke8y8b{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.shadow-xl.svelte-1ke8y8b{--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.drop-shadow-xl.svelte-1ke8y8b{--tw-drop-shadow:drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}")}const re=e=>({}),qt=e=>({}),se=e=>({}),Ft=e=>({}),le=e=>({}),Pt=e=>({}),ae=e=>({}),St=e=>({});function ce(e){let t,n,s;return{c(){t=g("div"),n=g("img"),w(n,"class","rounded-full bg-white absolute max-w-none object-cover svelte-1ke8y8b"),Et(n.src,s=e[0].avatar)||w(n,"src",s),w(n,"alt","d"),W(n,"width","100%"),W(n,"height","100%"),W(n,"transform-origin","50% 50% 0px"),w(t,"class","relative z-10 overflow-hidden flex-none mx-auto w-32 h-32 drop-shadow-xl svelte-1ke8y8b")},m(o,r){H(o,t,r),f(t,n)},p(o,r){1&r&&!Et(n.src,s=o[0].avatar)&&w(n,"src",s)},d(o){o&&L(t)}}}function de(e){let t,n;return{c(){t=ft("svg"),n=ft("path"),w(n,"d","M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z"),w(n,"class","svelte-1ke8y8b"),w(t,"class","rounded-full bg-white shadow-xl drop-shadow-xl svelte-1ke8y8b"),w(t,"xmlns","http://www.w3.org/2000/svg"),w(t,"version","1.0"),w(t,"viewBox","0 0 256 256")},m(s,o){H(s,t,o),f(t,n)},p:P,d(s){s&&L(t)}}}function pe(e){let t;const n=e[3].address,s=D(n,e,e[13],Pt),o=s||function(r){let i,a,u;function l(c){r[9](c)}let d={};return r[0].address!==void 0&&(d.item=r[0].address),i=new K({props:d}),F.push(()=>J(i,"item",l)),{c(){j(i.$$.fragment)},m(c,b){M(i,c,b),u=!0},p(c,b){const k={};!a&&1&b&&(a=!0,k.item=c[0].address,G(()=>a=!1)),i.$set(k)},i(c){u||(y(i.$$.fragment,c),u=!0)},o(c){v(i.$$.fragment,c),u=!1},d(c){_(i,c)}}}(e);return{c(){o&&o.c()},m(r,i){o&&o.m(r,i),t=!0},p(r,i){s?s.p&&(!t||8192&i)&&O(s,n,r,r[13],t?R(n,r[13],i,le):U(r[13]),Pt):o&&o.p&&(!t||1&i)&&o.p(r,t?i:-1)},i(r){t||(y(o,r),t=!0)},o(r){v(o,r),t=!1},d(r){o&&o.d(r)}}}function ue(e){let t;const n=e[3].email,s=D(n,e,e[13],Ft),o=s||function(r){let i,a,u;function l(c){r[10](c)}let d={};return r[0].email!==void 0&&(d.item=r[0].email),i=new K({props:d}),F.push(()=>J(i,"item",l)),{c(){j(i.$$.fragment)},m(c,b){M(i,c,b),u=!0},p(c,b){const k={};!a&&1&b&&(a=!0,k.item=c[0].email,G(()=>a=!1)),i.$set(k)},i(c){u||(y(i.$$.fragment,c),u=!0)},o(c){v(i.$$.fragment,c),u=!1},d(c){_(i,c)}}}(e);return{c(){o&&o.c()},m(r,i){o&&o.m(r,i),t=!0},p(r,i){s?s.p&&(!t||8192&i)&&O(s,n,r,r[13],t?R(n,r[13],i,se):U(r[13]),Ft):o&&o.p&&(!t||1&i)&&o.p(r,t?i:-1)},i(r){t||(y(o,r),t=!0)},o(r){v(o,r),t=!1},d(r){o&&o.d(r)}}}function me(e){let t;const n=e[3].phone,s=D(n,e,e[13],qt),o=s||function(r){let i,a,u;function l(c){r[11](c)}let d={};return r[0].phone!==void 0&&(d.item=r[0].phone),i=new K({props:d}),F.push(()=>J(i,"item",l)),{c(){j(i.$$.fragment)},m(c,b){M(i,c,b),u=!0},p(c,b){const k={};!a&&1&b&&(a=!0,k.item=c[0].phone,G(()=>a=!1)),i.$set(k)},i(c){u||(y(i.$$.fragment,c),u=!0)},o(c){v(i.$$.fragment,c),u=!1},d(c){_(i,c)}}}(e);return{c(){o&&o.c()},m(r,i){o&&o.m(r,i),t=!0},p(r,i){s?s.p&&(!t||8192&i)&&O(s,n,r,r[13],t?R(n,r[13],i,re):U(r[13]),qt):o&&o.p&&(!t||1&i)&&o.p(r,t?i:-1)},i(r){t||(y(o,r),t=!0)},o(r){v(o,r),t=!1},d(r){o&&o.d(r)}}}function we(e){let t,n,s,o,r,i,a,u,l,d,c,b,k,E,Bt,rt,st,Mt,lt,z,gt,_t;function Lt(p,m){return p[0].avatar?ce:de}let at=Lt(e),V=at(e);const vt=e[3].name,ct=D(vt,e,e[13],St),N=ct||function(p){let m,$,q,x,X,Z;function C(h){p[7](h)}let I={};function pt(h){p[8](h)}p[0].firstName!==void 0&&(I.item=p[0].firstName),m=new K({props:I}),F.push(()=>J(m,"item",C));let Nt={};return p[0].lastName!==void 0&&(Nt.item=p[0].lastName),x=new K({props:Nt}),F.push(()=>J(x,"item",pt)),{c(){j(m.$$.fragment),q=B(),j(x.$$.fragment)},m(h,T){M(m,h,T),H(h,q,T),M(x,h,T),Z=!0},p(h,T){const At={};!$&&1&T&&($=!0,At.item=h[0].firstName,G(()=>$=!1)),m.$set(At);const jt={};!X&&1&T&&(X=!0,jt.item=h[0].lastName,G(()=>X=!1)),x.$set(jt)},i(h){Z||(y(m.$$.fragment,h),y(x.$$.fragment,h),Z=!0)},o(h){v(m.$$.fragment,h),v(x.$$.fragment,h),Z=!1},d(h){_(m,h),h&&L(q),_(x,h)}}}(e);d=new kt({props:{name:"address",$$slots:{default:[pe]},$$scope:{ctx:e}}}),b=new kt({props:{name:"email",$$slots:{default:[ue]},$$scope:{ctx:e}}}),E=new kt({props:{name:"phone",$$slots:{default:[me]},$$scope:{ctx:e}}});const xt=e[3].default,dt=D(xt,e,e[13],null),A=dt||function(p){let m,$,q,x;function X(C){p[12](C)}let Z={options:{singleLine:!1}};return p[0].notes!==void 0&&(Z.item=p[0].notes),$=new K({props:Z}),F.push(()=>J($,"item",X)),{c(){m=g("span"),j($.$$.fragment),w(m,"class","text-sky-500 svelte-1ke8y8b")},m(C,I){H(C,m,I),M($,m,null),x=!0},p(C,I){const pt={};!q&&1&I&&(q=!0,pt.item=C[0].notes,G(()=>q=!1)),$.$set(pt)},i(C){x||(y($.$$.fragment,C),x=!0)},o(C){v($.$$.fragment,C),x=!1},d(C){C&&L(m),_($)}}}(e);return{c(){t=g("div"),n=g("div"),s=B(),o=g("input"),r=B(),i=g("div"),V.c(),a=B(),u=g("div"),N&&N.c(),l=B(),j(d.$$.fragment),c=B(),j(b.$$.fragment),k=B(),j(E.$$.fragment),Bt=B(),rt=g("blockquote"),st=g("p"),A&&A.c(),Mt=B(),lt=g("footer"),lt.textContent="Powered by PeerPiper",w(n,"class","h-24 bg-white svelte-1ke8y8b"),W(o,"display","none"),w(o,"type","file"),w(o,"accept",".jpg, .jpeg, .png"),w(o,"class","svelte-1ke8y8b"),w(i,"class","-mt-20 h-32 flex justify-center svelte-1ke8y8b"),w(u,"class","mt-5 mb-7 px-3 text-center text-xl svelte-1ke8y8b"),w(st,"class","mx-2 mb-7 text-center text-base svelte-1ke8y8b"),w(rt,"class","svelte-1ke8y8b"),w(lt,"class","text-center bg-green-400 text-white svelte-1ke8y8b"),w(t,"class","m-auto fill-slate-500 my-28 w-96 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-xl svelte-1ke8y8b")},m(p,m){H(p,t,m),f(t,n),f(t,s),f(t,o),e[5](o),f(t,r),f(t,i),V.m(i,null),f(t,a),f(t,u),N&&N.m(u,null),f(t,l),M(d,t,null),f(t,c),M(b,t,null),f(t,k),M(E,t,null),f(t,Bt),f(t,rt),f(rt,st),A&&A.m(st,null),f(t,Mt),f(t,lt),z=!0,gt||(_t=[ht(o,"change",e[4]),ht(i,"click",e[6])],gt=!0)},p(p,[m]){at===(at=Lt(p))&&V?V.p(p,m):(V.d(1),V=at(p),V&&(V.c(),V.m(i,null))),ct?ct.p&&(!z||8192&m)&&O(ct,vt,p,p[13],z?R(vt,p[13],m,ae):U(p[13]),St):N&&N.p&&(!z||1&m)&&N.p(p,z?m:-1);const $={};8193&m&&($.$$scope={dirty:m,ctx:p}),d.$set($);const q={};8193&m&&(q.$$scope={dirty:m,ctx:p}),b.$set(q);const x={};8193&m&&(x.$$scope={dirty:m,ctx:p}),E.$set(x),dt?dt.p&&(!z||8192&m)&&O(dt,xt,p,p[13],z?R(xt,p[13],m,null):U(p[13]),null):A&&A.p&&(!z||1&m)&&A.p(p,z?m:-1)},i(p){z||(y(N,p),y(d.$$.fragment,p),y(b.$$.fragment,p),y(E.$$.fragment,p),y(A,p),z=!0)},o(p){v(N,p),v(d.$$.fragment,p),v(b.$$.fragment,p),v(E.$$.fragment,p),v(A,p),z=!1},d(p){p&&L(t),e[5](null),V.d(),N&&N.d(p),_(d),_(b),_(E),A&&A.d(p),gt=!1,Q(_t)}}}function be(e,t,n){let{$$slots:s={},$$scope:o}=t;const r=Ot();let i,{profile:a={firstName:"FirstName",lastName:"Lastname",address:"Unknown address",email:"Unknown email",phone:"No phone",notes:"No notes",avatar:null}}=t;const u=l=>{let d=l.target.files[0],c=new FileReader;c.readAsDataURL(d),c.onload=b=>{n(0,a.avatar=b.target.result,a)}};return e.$$set=l=>{"profile"in l&&n(0,a=l.profile),"$$scope"in l&&n(13,o=l.$$scope)},e.$$.update=()=>{1&e.$$.dirty&&a&&r("change",{profile:a})},[a,i,u,s,l=>u(l),function(l){F[l?"unshift":"push"](()=>{i=l,n(1,i)})},()=>{i.click()},function(l){e.$$.not_equal(a.firstName,l)&&(a.firstName=l,n(0,a))},function(l){e.$$.not_equal(a.lastName,l)&&(a.lastName=l,n(0,a))},function(l){e.$$.not_equal(a.address,l)&&(a.address=l,n(0,a))},function(l){e.$$.not_equal(a.email,l)&&(a.email=l,n(0,a))},function(l){e.$$.not_equal(a.phone,l)&&(a.phone=l,n(0,a))},function(l){e.$$.not_equal(a.notes,l)&&(a.notes=l,n(0,a))},o]}class fe extends it{constructor(t){super(),ot(this,t,be,we,nt,{profile:0},ie)}get profile(){return this.$$.ctx[0]}set profile(t){this.$$set({profile:t}),S()}}export{fe as default};