function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function i(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let s,l;function a(e,t){return s||(s=document.createElement("a")),s.href=t,e===s.href}function c(e,t,n,o){if(e){const i=d(e,t,n,o);return e[0](i)}}function d(e,t,n,o){return e[1]&&o?function(e,t){for(const n in t)e[n]=t[n];return e}(n.ctx.slice(),e[1](o(t))):n.ctx}function p(e,t,n,o){if(e[2]&&o){const i=e[2](o(n));if(void 0===t.dirty)return i;if("object"==typeof i){const e=[],n=Math.max(t.dirty.length,i.length);for(let o=0;o<n;o+=1)e[o]=t.dirty[o]|i[o];return e}return t.dirty|i}return t.dirty}function u(e,t,n,o,i,r){if(i){const s=d(t,n,o,r);e.p(s,i)}}function m(e){if(e.ctx.length>32){const t=[],n=e.ctx.length/32;for(let e=0;e<n;e++)t[e]=-1;return t}return-1}function w(e,t){e.appendChild(t)}function b(e,t,n){const o=function(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;if(t&&t.host)return t;return e.ownerDocument}(e);if(!o.getElementById(t)){const e=y("style");e.id=t,e.textContent=n,function(e,t){w(e.head||e,t)}(o,e)}}function f(e,t,n){e.insertBefore(t,n||null)}function h(e){e.parentNode.removeChild(e)}function y(e){return document.createElement(e)}function g(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function v(){return e=" ",document.createTextNode(e);var e}function x(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function $(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function k(e,t,n){e.setAttributeNS("http://www.w3.org/1999/xlink",t,n)}function C(e,t,n,o){null===n?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}function z(e){l=e}function B(){const e=function(){if(!l)throw new Error("Function called outside component initialization");return l}();return(t,n,{cancelable:o=!1}={})=>{const i=e.$$.callbacks[t];if(i){const r=function(e,t,{bubbles:n=!1,cancelable:o=!1}={}){const i=document.createEvent("CustomEvent");return i.initCustomEvent(e,n,o,t),i}(t,n,{cancelable:o});return i.slice().forEach((t=>{t.call(e,r)})),!r.defaultPrevented}return!0}}const M=[],_=[],L=[],N=[],A=Promise.resolve();let j=!1;function H(e){L.push(e)}function E(e){N.push(e)}const V=new Set;let q=0;function F(){const e=l;do{for(;q<M.length;){const e=M[q];q++,z(e),P(e.$$)}for(z(null),M.length=0,q=0;_.length;)_.pop()();for(let e=0;e<L.length;e+=1){const t=L[e];V.has(t)||(V.add(t),t())}L.length=0}while(M.length);for(;N.length;)N.pop()();j=!1,V.clear(),z(e)}function P(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(H)}}const S=new Set;function Z(e,t){e&&e.i&&(S.delete(e),e.i(t))}function D(e,t,n,o){if(e&&e.o){if(S.has(e))return;S.add(e),undefined.c.push((()=>{S.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}}function R(e,t,n){const o=e.$$.props[t];void 0!==o&&(e.$$.bound[o]=n,n(e.$$.ctx[o]))}function O(e){e&&e.c()}function U(e,n,r,s){const{fragment:l,on_mount:a,on_destroy:c,after_update:d}=e.$$;l&&l.m(n,r),s||H((()=>{const n=a.map(t).filter(i);c?c.push(...n):o(n),e.$$.on_mount=[]})),d.forEach(H)}function T(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function I(e,t){-1===e.$$.dirty[0]&&(M.push(e),j||(j=!0,A.then(F)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function G(t,i,r,s,a,c,d,p=[-1]){const u=l;z(t);const m=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(i.context||(u?u.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:i.target||u.$$.root};d&&d(m.root);let w=!1;if(m.ctx=r?r(t,i.props||{},((e,n,...o)=>{const i=o.length?o[0]:n;return m.ctx&&a(m.ctx[e],m.ctx[e]=i)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](i),w&&I(t,e)),n})):[],m.update(),w=!0,o(m.before_update),m.fragment=!!s&&s(m.ctx),i.target){if(i.hydrate){const e=function(e){return Array.from(e.childNodes)}(i.target);m.fragment&&m.fragment.l(e),e.forEach(h)}else m.fragment&&m.fragment.c();i.intro&&Z(t.$$.fragment),U(t,i.target,i.anchor,i.customElement),F()}z(u)}class J{$destroy(){T(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}function K(t){let n,i,r;return{c(){n=y("span"),$(n,"contenteditable",""),$(n,"class","align-middle"),void 0===t[0]&&H((()=>t[5].call(n)))},m(e,o){f(e,n,o),t[4](n),void 0!==t[0]&&(n.textContent=t[0]),i||(r=[x(n,"input",t[5]),x(n,"keydown",t[2])],i=!0)},p(e,[t]){1&t&&e[0]!==n.textContent&&(n.textContent=e[0])},i:e,o:e,d(e){e&&h(n),t[4](null),i=!1,o(r)}}}function Q(e,t,n){B();let o,{item:i}=t,{options:r={singleLine:!0}}=t;return e.$$set=e=>{"item"in e&&n(0,i=e.item),"options"in e&&n(3,r=e.options)},[i,o,e=>{13===e.keyCode&&r.singleLine&&(e.preventDefault(),o.blur())},r,function(e){_[e?"unshift":"push"]((()=>{o=e,n(1,o)}))},function(){i=this.textContent,n(0,i)}]}class W extends J{constructor(e){super(),G(this,e,Q,K,r,{item:0,options:3})}get item(){return this.$$.ctx[0]}set item(e){this.$$set({item:e}),F()}get options(){return this.$$.ctx[3]}set options(e){this.$$set({options:e}),F()}}function X(t){let n;return{c(){n=y("div"),n.innerHTML='<svg><symbol id="avatar" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z"></path></symbol><symbol id="address" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M412 414a111 111 0 0 1 90-77v-40h31c7 0 13-6 13-13v-15c0-5-2-9-7-11L355 153c-4-2-8-2-12 0l-65 37v-13c0-5-4-9-9-9h-29c-5 0-8 4-8 9v39l-74 42c-4 2-7 7-7 11v15c0 7 6 13 13 13h31v180c0 12 9 21 20 21h203c-13-25-15-56-6-84z"></path><path d="M592 412a81 81 0 0 0-109-36 82 82 0 0 0-36 109l61 108c5 9 18 9 23 0l61-108c12-22 12-49 0-73zm-73 72a35 35 0 1 1 0-70 35 35 0 1 1 0 70z"></path></symbol><symbol id="email" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="m582.1 312.4-197.5-128c-4.3-2.8-10-2.8-14.4 0l-199 128c-3.8 2.4-7.8 6.6-7.8 11v230.3c0 7.3 9.3 15.6 16.6 15.6h394.5c7.3 0 14.1-8.3 14.1-15.6V323.4c0-4.4-2.7-8.6-6.4-11zm-385 35.2 113 73.3-113 103zm131.8 88 41.2 26.8a13.2 13.2 0 0 0 14.3 0l41.1-26.8 115 104.7H214zM451.5 421l113-73.3V524zm-74.3-209.8 173.1 112.3-173 112.3-173.1-112.3zm0 200.6c20.7 0 40.9-7.3 56.7-20.6A13.2 13.2 0 0 0 417 371a62 62 0 1 1 22.2-47.5c0 6-4.9 10.9-10.8 10.9a11 11 0 0 1-10.9-10v-.9a40.3 40.3 0 1 0-12.3 29 37 37 0 0 0 60.3-29 88.4 88.4 0 1 0-88.3 88.4zm0-74.3a14 14 0 1 1 0-28 14 14 0 0 1 0 28z"></path></symbol><symbol id="phone" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path fill-rule="evenodd" d="m587 561-3 3c-96 96-241-7-315-81S92 264 188 168l3-3 107 106-13 14a39 39 0 0 0-5 49 503 503 0 0 0 138 138c16 11 36 9 49-5l14-13zm-92-118 104 103c7-14 4-33-8-45l-51-51a39 39 0 0 0-45-7zM206 153l103 104c7-15 5-33-7-45l-51-51a39 39 0 0 0-45-8z"></path></symbol><symbol id="arrow-left" class="icon" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></symbol><symbol id="arrow-right" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></symbol><symbol id="arrow-up" class="icon" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></symbol><symbol id="arrow-down" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></symbol><symbol id="check" class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></symbol><symbol id="close" class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></symbol><symbol id="download" class="icon" viewBox="0 0 24 24"><path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></symbol><symbol id="edit" class="icon" viewBox="0 0 24 24"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></symbol><symbol id="github" class="icon" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12Z" fill="currentColor" stroke="none"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.59162 22.7357C9.49492 22.6109 9.49492 21.4986 9.59162 19.399C8.55572 19.4347 7.90122 19.3628 7.62812 19.1833C7.21852 18.9139 6.80842 18.0833 6.44457 17.4979C6.08072 16.9125 5.27312 16.8199 4.94702 16.6891C4.62091 16.5582 4.53905 16.0247 5.84562 16.4282C7.15222 16.8316 7.21592 17.9303 7.62812 18.1872C8.04032 18.4441 9.02572 18.3317 9.47242 18.1259C9.91907 17.9201 9.88622 17.1538 9.96587 16.8503C10.0666 16.5669 9.71162 16.5041 9.70382 16.5018C9.26777 16.5018 6.97697 16.0036 6.34772 13.7852C5.71852 11.5669 6.52907 10.117 6.96147 9.49369C7.24972 9.07814 7.22422 8.19254 6.88497 6.83679C8.11677 6.67939 9.06732 7.06709 9.73672 7.99999C9.73737 8.00534 10.6143 7.47854 12.0001 7.47854C13.386 7.47854 13.8777 7.90764 14.2571 7.99999C14.6365 8.09234 14.94 6.36699 17.2834 6.83679C16.7942 7.79839 16.3844 8.99999 16.6972 9.49369C17.0099 9.98739 18.2372 11.5573 17.4833 13.7852C16.9807 15.2706 15.9927 16.1761 14.5192 16.5018C14.3502 16.5557 14.2658 16.6427 14.2658 16.7627C14.2658 16.9427 14.4942 16.9624 14.8233 17.8058C15.0426 18.368 15.0585 19.9739 14.8708 22.6234C14.3953 22.7445 14.0254 22.8257 13.7611 22.8673C13.2924 22.9409 12.7835 22.9822 12.2834 22.9982C11.7834 23.0141 11.6098 23.0123 10.9185 22.948C10.4577 22.9051 10.0154 22.8343 9.59162 22.7357Z" fill="currentColor" stroke="none"></path></symbol><symbol id="git-branch" class="icon" viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></symbol><symbol id="log-in" class="icon" viewBox="0 0 24 24"><path d="M15 3H19A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H15"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></symbol><symbol id="maximize" class="icon" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></symbol><symbol id="maximize-2" class="icon" viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></symbol><symbol id="menu" class="icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></symbol><symbol id="message-square" class="icon" viewBox="0 0 24 24"><g transform="translate(0, 1)"><path d="M16.5 19H11V15H18V11H22V19H19.5L18 20.5L16.5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 3H18V15H8.5L6.5 17L4.5 15H2V3Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 11H9" stroke="white" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 7H12" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></g></symbol><symbol id="minus" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="plus" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="save" class="icon" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></symbol><symbol id="link" class="icon" viewBox="0 0 24 24"><path d="M9,7L6,7A2 2 0 0 0 6,17L9,17"></path><path d="M15,7L18,7A2 2 0 0 1 18,17L15,17"></path><path d="M7,12L17,12"></path></symbol><symbol id="chevron" class="icon" viewBox="0 0 24 24"><path d="M2,7 L12,17 L20,7"></path></symbol><symbol id="delete" class="icon" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M22 4.2h-5.6L15 1.6c-.1-.2-.4-.4-.7-.4H9.6c-.2 0-.5.2-.6.4L7.6 4.2H2c-.4 0-.8.4-.8.8s.4.8.8.8h1.8V22c0 .4.3.8.8.8h15c.4 0 .8-.3.8-.8V5.8H22c.4 0 .8-.3.8-.8s-.4-.8-.8-.8zM10.8 16.5c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5zm4 0c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5z"></path></symbol></svg>',C(n,"display","none")},m(e,t){f(e,n,t)},p:e,i:e,o:e,d(e){e&&h(n)}}}class Y extends J{constructor(e){super(),G(this,e,null,X,r,{})}}function ee(e){b(e,"svelte-b6ce0n",".icon.svelte-b6ce0n{position:relative;overflow:hidden;vertical-align:middle;-o-object-fit:contain;object-fit:contain;transform-origin:center center;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:currentColor}")}function te(e){let t,n,o,i,r,s,l;const a=e[3].default,d=c(a,e,e[2],null);return s=new Y({}),{c(){t=g("svg"),n=g("use"),i=v(),d&&d.c(),r=v(),O(s.$$.fragment),k(n,"xlink:href",o="#"+e[0]),$(t,"width",e[1]),$(t,"height",e[1]),$(t,"class","icon  svelte-b6ce0n")},m(e,o){f(e,t,o),w(t,n),f(e,i,o),d&&d.m(e,o),f(e,r,o),U(s,e,o),l=!0},p(e,[i]){(!l||1&i&&o!==(o="#"+e[0]))&&k(n,"xlink:href",o),(!l||2&i)&&$(t,"width",e[1]),(!l||2&i)&&$(t,"height",e[1]),d&&d.p&&(!l||4&i)&&u(d,a,e,e[2],l?p(a,e[2],i,null):m(e[2]),null)},i(e){l||(Z(d,e),Z(s.$$.fragment,e),l=!0)},o(e){D(d,e),D(s.$$.fragment,e),l=!1},d(e){e&&h(t),e&&h(i),d&&d.d(e),e&&h(r),T(s,e)}}}function ne(e,t,n){let{$$slots:o={},$$scope:i}=t,{name:r}=t,{size:s=32}=t;return e.$$set=e=>{"name"in e&&n(0,r=e.name),"size"in e&&n(1,s=e.size),"$$scope"in e&&n(2,i=e.$$scope)},[r,s,i,o]}class oe extends J{constructor(e){super(),G(this,e,ne,te,r,{name:0,size:1},ee)}get name(){return this.$$.ctx[0]}set name(e){this.$$set({name:e}),F()}get size(){return this.$$.ctx[1]}set size(e){this.$$set({size:e}),F()}}function ie(e){let t,n,o,i,r,s,l;i=new oe({props:{name:e[0]}});const a=e[2].default,d=c(a,e,e[1],null);return{c(){t=y("div"),n=y("div"),o=y("div"),O(i.$$.fragment),r=v(),s=y("div"),d&&d.c(),$(o,"class","text-slate-500"),$(n,"class","align-middle"),$(s,"class","align-middle"),$(t,"class","flex align-middle text-center justify-center bg-contain bg-no-repeat m-2")},m(e,a){f(e,t,a),w(t,n),w(n,o),U(i,o,null),w(t,r),w(t,s),d&&d.m(s,null),l=!0},p(e,[t]){const n={};1&t&&(n.name=e[0]),i.$set(n),d&&d.p&&(!l||2&t)&&u(d,a,e,e[1],l?p(a,e[1],t,null):m(e[1]),null)},i(e){l||(Z(i.$$.fragment,e),Z(d,e),l=!0)},o(e){D(i.$$.fragment,e),D(d,e),l=!1},d(e){e&&h(t),T(i),d&&d.d(e)}}}function re(e,t,n){let{$$slots:o={},$$scope:i}=t,{name:r}=t;return e.$$set=e=>{"name"in e&&n(0,r=e.name),"$$scope"in e&&n(1,i=e.$$scope)},[r,i,o]}class se extends J{constructor(e){super(),G(this,e,re,ie,r,{name:0})}get name(){return this.$$.ctx[0]}set name(e){this.$$set({name:e}),F()}}function le(e){b(e,"svelte-1ke8y8b",".svelte-1ke8y8b,.svelte-1ke8y8b::before,.svelte-1ke8y8b::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#E5E7EB}.svelte-1ke8y8b::before,.svelte-1ke8y8b::after{--tw-content:''}input.svelte-1ke8y8b{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}.svelte-1ke8y8b:-moz-focusring{outline:auto}.svelte-1ke8y8b:-moz-ui-invalid{box-shadow:none}.svelte-1ke8y8b::-webkit-inner-spin-button,.svelte-1ke8y8b::-webkit-outer-spin-button{height:auto}.svelte-1ke8y8b::-webkit-search-decoration{-webkit-appearance:none}.svelte-1ke8y8b::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}blockquote.svelte-1ke8y8b,p.svelte-1ke8y8b{margin:0}input.svelte-1ke8y8b::-moz-placeholder{opacity:1;color:#9CA3AF}input.svelte-1ke8y8b:-ms-input-placeholder{opacity:1;color:#9CA3AF}input.svelte-1ke8y8b::placeholder{opacity:1;color:#9CA3AF}.svelte-1ke8y8b:disabled{cursor:default}img.svelte-1ke8y8b,svg.svelte-1ke8y8b{display:block;vertical-align:middle}img.svelte-1ke8y8b{max-width:100%;height:auto}input.svelte-1ke8y8b::-moz-placeholder{color:#6B7280;opacity:1}input.svelte-1ke8y8b:-ms-input-placeholder{color:#6B7280;opacity:1}input.svelte-1ke8y8b::placeholder{color:#6B7280;opacity:1}.svelte-1ke8y8b::-webkit-datetime-edit-fields-wrapper{padding:0}.svelte-1ke8y8b::-webkit-date-and-time-value{min-height:1.5em}[type='file'].svelte-1ke8y8b{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type='file'].svelte-1ke8y8b:focus{outline:1px auto inherit}input[type=file].svelte-1ke8y8b::-webkit-file-upload-button{color:white;background:#1F2937;border:0;font-weight:500;font-size:0.875rem;cursor:pointer;padding-top:0.625rem;padding-bottom:0.625rem;padding-left:2rem;padding-right:1rem;-webkit-margin-start:-1rem;margin-inline-start:-1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}input[type=file].svelte-1ke8y8b::file-selector-button{color:white;background:#1F2937;border:0;font-weight:500;font-size:0.875rem;cursor:pointer;padding-top:0.625rem;padding-bottom:0.625rem;padding-left:2rem;padding-right:1rem;-webkit-margin-start:-1rem;margin-inline-start:-1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}input[type=file].svelte-1ke8y8b::-webkit-file-upload-button:hover{background:#374151}input[type=file].svelte-1ke8y8b::file-selector-button:hover{background:#374151}.svelte-1ke8y8b,.svelte-1ke8y8b::before,.svelte-1ke8y8b::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1ke8y8b::-webkit-backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1ke8y8b::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.absolute.svelte-1ke8y8b{position:absolute}.relative.svelte-1ke8y8b{position:relative}.z-10.svelte-1ke8y8b{z-index:10}.m-auto.svelte-1ke8y8b{margin:auto}.my-28.svelte-1ke8y8b{margin-top:7rem;margin-bottom:7rem}.mx-auto.svelte-1ke8y8b{margin-left:auto;margin-right:auto}.mx-2.svelte-1ke8y8b{margin-left:0.5rem;margin-right:0.5rem}.-mt-20.svelte-1ke8y8b{margin-top:-5rem}.mt-5.svelte-1ke8y8b{margin-top:1.25rem}.mb-7.svelte-1ke8y8b{margin-bottom:1.75rem}.flex.svelte-1ke8y8b{display:flex}.h-24.svelte-1ke8y8b{height:6rem}.h-32.svelte-1ke8y8b{height:8rem}.w-96.svelte-1ke8y8b{width:24rem}.w-32.svelte-1ke8y8b{width:8rem}.max-w-lg.svelte-1ke8y8b{max-width:32rem}.max-w-none.svelte-1ke8y8b{max-width:none}.flex-none.svelte-1ke8y8b{flex:none}@-webkit-keyframes svelte-1ke8y8b-spin{to{transform:rotate(360deg)}}@keyframes svelte-1ke8y8b-spin{to{transform:rotate(360deg)}}.items-center.svelte-1ke8y8b{align-items:center}.justify-center.svelte-1ke8y8b{justify-content:center}.overflow-hidden.svelte-1ke8y8b{overflow:hidden}.rounded-2xl.svelte-1ke8y8b{border-radius:1rem}.rounded-full.svelte-1ke8y8b{border-radius:9999px}.bg-slate-100.svelte-1ke8y8b{--tw-bg-opacity:1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.bg-white.svelte-1ke8y8b{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-green-400.svelte-1ke8y8b{--tw-bg-opacity:1;background-color:rgb(49 196 141 / var(--tw-bg-opacity))}.fill-slate-500.svelte-1ke8y8b{fill:#64748b}.object-cover.svelte-1ke8y8b{-o-object-fit:cover;object-fit:cover}.px-3.svelte-1ke8y8b{padding-left:0.75rem;padding-right:0.75rem}.text-center.svelte-1ke8y8b{text-align:center}.text-xl.svelte-1ke8y8b{font-size:1.25rem;line-height:1.75rem}.text-base.svelte-1ke8y8b{font-size:1rem;line-height:1.5rem}.text-sky-500.svelte-1ke8y8b{--tw-text-opacity:1;color:rgb(14 165 233 / var(--tw-text-opacity))}.text-white.svelte-1ke8y8b{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.shadow-xl.svelte-1ke8y8b{--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.drop-shadow-xl.svelte-1ke8y8b{--tw-drop-shadow:drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}")}const ae=e=>({}),ce=e=>({}),de=e=>({}),pe=e=>({}),ue=e=>({}),me=e=>({}),we=e=>({}),be=e=>({});function fe(e){let t,n,o;return{c(){t=y("div"),n=y("img"),$(n,"class","rounded-full bg-white absolute max-w-none object-cover svelte-1ke8y8b"),a(n.src,o=e[0].avatar)||$(n,"src",o),$(n,"alt","d"),C(n,"width","100%"),C(n,"height","100%"),C(n,"transform-origin","50% 50% 0px"),$(t,"class","relative z-10 overflow-hidden flex-none mx-auto w-32 h-32 drop-shadow-xl svelte-1ke8y8b")},m(e,o){f(e,t,o),w(t,n)},p(e,t){1&t&&!a(n.src,o=e[0].avatar)&&$(n,"src",o)},d(e){e&&h(t)}}}function he(t){let n,o;return{c(){n=g("svg"),o=g("path"),$(o,"d","M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z"),$(o,"class","svelte-1ke8y8b"),$(n,"class","rounded-full bg-white shadow-xl drop-shadow-xl svelte-1ke8y8b"),$(n,"xmlns","http://www.w3.org/2000/svg"),$(n,"version","1.0"),$(n,"viewBox","0 0 256 256")},m(e,t){f(e,n,t),w(n,o)},p:e,d(e){e&&h(n)}}}function ye(e){let t;const n=e[3].address,o=c(n,e,e[13],me),i=o||function(e){let t,n,o;function i(t){e[9](t)}let r={};return void 0!==e[0].address&&(r.item=e[0].address),t=new W({props:r}),_.push((()=>R(t,"item",i))),{c(){O(t.$$.fragment)},m(e,n){U(t,e,n),o=!0},p(e,o){const i={};!n&&1&o&&(n=!0,i.item=e[0].address,E((()=>n=!1))),t.$set(i)},i(e){o||(Z(t.$$.fragment,e),o=!0)},o(e){D(t.$$.fragment,e),o=!1},d(e){T(t,e)}}}(e);return{c(){i&&i.c()},m(e,n){i&&i.m(e,n),t=!0},p(e,r){o?o.p&&(!t||8192&r)&&u(o,n,e,e[13],t?p(n,e[13],r,ue):m(e[13]),me):i&&i.p&&(!t||1&r)&&i.p(e,t?r:-1)},i(e){t||(Z(i,e),t=!0)},o(e){D(i,e),t=!1},d(e){i&&i.d(e)}}}function ge(e){let t;const n=e[3].email,o=c(n,e,e[13],pe),i=o||function(e){let t,n,o;function i(t){e[10](t)}let r={};return void 0!==e[0].email&&(r.item=e[0].email),t=new W({props:r}),_.push((()=>R(t,"item",i))),{c(){O(t.$$.fragment)},m(e,n){U(t,e,n),o=!0},p(e,o){const i={};!n&&1&o&&(n=!0,i.item=e[0].email,E((()=>n=!1))),t.$set(i)},i(e){o||(Z(t.$$.fragment,e),o=!0)},o(e){D(t.$$.fragment,e),o=!1},d(e){T(t,e)}}}(e);return{c(){i&&i.c()},m(e,n){i&&i.m(e,n),t=!0},p(e,r){o?o.p&&(!t||8192&r)&&u(o,n,e,e[13],t?p(n,e[13],r,de):m(e[13]),pe):i&&i.p&&(!t||1&r)&&i.p(e,t?r:-1)},i(e){t||(Z(i,e),t=!0)},o(e){D(i,e),t=!1},d(e){i&&i.d(e)}}}function ve(e){let t;const n=e[3].phone,o=c(n,e,e[13],ce),i=o||function(e){let t,n,o;function i(t){e[11](t)}let r={};return void 0!==e[0].phone&&(r.item=e[0].phone),t=new W({props:r}),_.push((()=>R(t,"item",i))),{c(){O(t.$$.fragment)},m(e,n){U(t,e,n),o=!0},p(e,o){const i={};!n&&1&o&&(n=!0,i.item=e[0].phone,E((()=>n=!1))),t.$set(i)},i(e){o||(Z(t.$$.fragment,e),o=!0)},o(e){D(t.$$.fragment,e),o=!1},d(e){T(t,e)}}}(e);return{c(){i&&i.c()},m(e,n){i&&i.m(e,n),t=!0},p(e,r){o?o.p&&(!t||8192&r)&&u(o,n,e,e[13],t?p(n,e[13],r,ae):m(e[13]),ce):i&&i.p&&(!t||1&r)&&i.p(e,t?r:-1)},i(e){t||(Z(i,e),t=!0)},o(e){D(i,e),t=!1},d(e){i&&i.d(e)}}}function xe(e){let t,n,i,r,s,l,a,d,b,g,k,z,B,M,L,N,A,j,H,V,q,F;function P(e,t){return e[0].avatar?fe:he}let S=P(e),I=S(e);const G=e[3].name,J=c(G,e,e[13],be),K=J||function(e){let t,n,o,i,r,s;function l(t){e[7](t)}let a={};function c(t){e[8](t)}void 0!==e[0].firstName&&(a.item=e[0].firstName),t=new W({props:a}),_.push((()=>R(t,"item",l)));let d={};return void 0!==e[0].lastName&&(d.item=e[0].lastName),i=new W({props:d}),_.push((()=>R(i,"item",c))),{c(){O(t.$$.fragment),o=v(),O(i.$$.fragment)},m(e,n){U(t,e,n),f(e,o,n),U(i,e,n),s=!0},p(e,o){const s={};!n&&1&o&&(n=!0,s.item=e[0].firstName,E((()=>n=!1))),t.$set(s);const l={};!r&&1&o&&(r=!0,l.item=e[0].lastName,E((()=>r=!1))),i.$set(l)},i(e){s||(Z(t.$$.fragment,e),Z(i.$$.fragment,e),s=!0)},o(e){D(t.$$.fragment,e),D(i.$$.fragment,e),s=!1},d(e){T(t,e),e&&h(o),T(i,e)}}}(e);g=new se({props:{name:"address",$$slots:{default:[ye]},$$scope:{ctx:e}}}),z=new se({props:{name:"email",$$slots:{default:[ge]},$$scope:{ctx:e}}}),M=new se({props:{name:"phone",$$slots:{default:[ve]},$$scope:{ctx:e}}});const Q=e[3].default,X=c(Q,e,e[13],null),Y=X||function(e){let t,n,o,i;function r(t){e[12](t)}let s={options:{singleLine:!1}};return void 0!==e[0].notes&&(s.item=e[0].notes),n=new W({props:s}),_.push((()=>R(n,"item",r))),{c(){t=y("span"),O(n.$$.fragment),$(t,"class","text-sky-500 svelte-1ke8y8b")},m(e,o){f(e,t,o),U(n,t,null),i=!0},p(e,t){const i={};!o&&1&t&&(o=!0,i.item=e[0].notes,E((()=>o=!1))),n.$set(i)},i(e){i||(Z(n.$$.fragment,e),i=!0)},o(e){D(n.$$.fragment,e),i=!1},d(e){e&&h(t),T(n)}}}(e);return{c(){t=y("div"),n=y("div"),i=v(),r=y("input"),s=v(),l=y("div"),I.c(),a=v(),d=y("div"),K&&K.c(),b=v(),O(g.$$.fragment),k=v(),O(z.$$.fragment),B=v(),O(M.$$.fragment),L=v(),N=y("blockquote"),A=y("p"),Y&&Y.c(),j=v(),H=y("footer"),H.textContent="Powered by PeerPiper",$(n,"class","h-24 bg-white svelte-1ke8y8b"),C(r,"display","none"),$(r,"type","file"),$(r,"accept",".jpg, .jpeg, .png"),$(r,"class","svelte-1ke8y8b"),$(l,"class","-mt-20 h-32 flex justify-center svelte-1ke8y8b"),$(d,"class","mt-5 mb-7 px-3 text-center text-xl svelte-1ke8y8b"),$(A,"class","mx-2 mb-7 text-center text-base svelte-1ke8y8b"),$(N,"class","svelte-1ke8y8b"),$(H,"class","text-center bg-green-400 text-white svelte-1ke8y8b"),$(t,"class","m-auto fill-slate-500 my-28 w-96 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-xl svelte-1ke8y8b")},m(o,c){f(o,t,c),w(t,n),w(t,i),w(t,r),e[5](r),w(t,s),w(t,l),I.m(l,null),w(t,a),w(t,d),K&&K.m(d,null),w(t,b),U(g,t,null),w(t,k),U(z,t,null),w(t,B),U(M,t,null),w(t,L),w(t,N),w(N,A),Y&&Y.m(A,null),w(t,j),w(t,H),V=!0,q||(F=[x(r,"change",e[4]),x(l,"click",e[6])],q=!0)},p(e,[t]){S===(S=P(e))&&I?I.p(e,t):(I.d(1),I=S(e),I&&(I.c(),I.m(l,null))),J?J.p&&(!V||8192&t)&&u(J,G,e,e[13],V?p(G,e[13],t,we):m(e[13]),be):K&&K.p&&(!V||1&t)&&K.p(e,V?t:-1);const n={};8193&t&&(n.$$scope={dirty:t,ctx:e}),g.$set(n);const o={};8193&t&&(o.$$scope={dirty:t,ctx:e}),z.$set(o);const i={};8193&t&&(i.$$scope={dirty:t,ctx:e}),M.$set(i),X?X.p&&(!V||8192&t)&&u(X,Q,e,e[13],V?p(Q,e[13],t,null):m(e[13]),null):Y&&Y.p&&(!V||1&t)&&Y.p(e,V?t:-1)},i(e){V||(Z(K,e),Z(g.$$.fragment,e),Z(z.$$.fragment,e),Z(M.$$.fragment,e),Z(Y,e),V=!0)},o(e){D(K,e),D(g.$$.fragment,e),D(z.$$.fragment,e),D(M.$$.fragment,e),D(Y,e),V=!1},d(n){n&&h(t),e[5](null),I.d(),K&&K.d(n),T(g),T(z),T(M),Y&&Y.d(n),q=!1,o(F)}}}function $e(e,t,n){let{$$slots:o={},$$scope:i}=t;const r=B();let s,{profile:l={firstName:"FirstName",lastName:"Lastname",address:"Unknown address",email:"Unknown email",phone:"No phone",notes:"No notes",avatar:null}}=t;const a=e=>{let t=e.target.files[0],o=new FileReader;o.readAsDataURL(t),o.onload=e=>{n(0,l.avatar=e.target.result,l)}};return e.$$set=e=>{"profile"in e&&n(0,l=e.profile),"$$scope"in e&&n(13,i=e.$$scope)},e.$$.update=()=>{1&e.$$.dirty&&l&&r("change",{profile:l})},[l,s,a,o,e=>a(e),function(e){_[e?"unshift":"push"]((()=>{s=e,n(1,s)}))},()=>{s.click()},function(t){e.$$.not_equal(l.firstName,t)&&(l.firstName=t,n(0,l))},function(t){e.$$.not_equal(l.lastName,t)&&(l.lastName=t,n(0,l))},function(t){e.$$.not_equal(l.address,t)&&(l.address=t,n(0,l))},function(t){e.$$.not_equal(l.email,t)&&(l.email=t,n(0,l))},function(t){e.$$.not_equal(l.phone,t)&&(l.phone=t,n(0,l))},function(t){e.$$.not_equal(l.notes,t)&&(l.notes=t,n(0,l))},i]}class ke extends J{constructor(e){super(),G(this,e,$e,xe,r,{profile:0},le)}get profile(){return this.$$.ctx[0]}set profile(e){this.$$set({profile:e}),F()}}export{ke as default};
