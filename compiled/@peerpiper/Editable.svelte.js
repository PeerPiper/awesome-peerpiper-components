function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function i(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function c(t){t.parentNode.removeChild(t)}function s(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function u(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}let l;function a(t){l=t}function f(){const t=function(){if(!l)throw new Error("Function called outside component initialization");return l}();return(n,e,{cancelable:o=!1}={})=>{const r=t.$$.callbacks[n];if(r){const i=function(t,n,{bubbles:e=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,e,o,n),r}(n,e,{cancelable:o});return r.slice().forEach((n=>{n.call(t,i)})),!i.defaultPrevented}return!0}}const d=[],$=[],p=[],h=[],m=Promise.resolve();let g=!1;function b(t){p.push(t)}const x=new Set;let y=0;function _(){const t=l;do{for(;y<d.length;){const t=d[y];y++,a(t),v(t.$$)}for(a(null),d.length=0,y=0;$.length;)$.pop()();for(let t=0;t<p.length;t+=1){const n=p[t];x.has(n)||(x.add(n),n())}p.length=0}while(d.length);for(;h.length;)h.pop()();g=!1,x.clear(),a(t)}function v(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(b)}}const E=new Set;function k(t,n){-1===t.$$.dirty[0]&&(d.push(t),g||(g=!0,m.then(_)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function C(i,s,u,f,d,$,p,h=[-1]){const m=l;a(i);const g=i.$$={fragment:null,ctx:null,props:$,update:t,not_equal:d,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(m?m.$$.context:[])),callbacks:e(),dirty:h,skip_bound:!1,root:s.target||m.$$.root};p&&p(g.root);let x=!1;if(g.ctx=u?u(i,s.props||{},((t,n,...e)=>{const o=e.length?e[0]:n;return g.ctx&&d(g.ctx[t],g.ctx[t]=o)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](o),x&&k(i,t)),n})):[],g.update(),x=!0,o(g.before_update),g.fragment=!!f&&f(g.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);g.fragment&&g.fragment.l(t),t.forEach(c)}else g.fragment&&g.fragment.c();s.intro&&((y=i.$$.fragment)&&y.i&&(E.delete(y),y.i(v))),function(t,e,i,c){const{fragment:s,on_mount:u,on_destroy:l,after_update:a}=t.$$;s&&s.m(e,i),c||b((()=>{const e=u.map(n).filter(r);l?l.push(...e):o(e),t.$$.on_mount=[]})),a.forEach(b)}(i,s.target,s.anchor,s.customElement),_()}var y,v;a(m)}function w(n){let e,r,i;return{c(){var t;t="span",e=document.createElement(t),u(e,"contenteditable",""),u(e,"class","align-middle"),void 0===n[0]&&b((()=>n[5].call(e)))},m(t,o){!function(t,n,e){t.insertBefore(n,e||null)}(t,e,o),n[4](e),void 0!==n[0]&&(e.textContent=n[0]),r||(i=[s(e,"input",n[5]),s(e,"keydown",n[2])],r=!0)},p(t,[n]){1&n&&t[0]!==e.textContent&&(e.textContent=t[0])},i:t,o:t,d(t){t&&c(e),n[4](null),r=!1,o(i)}}}function A(t,n,e){f();let o,{item:r}=n,{options:i={singleLine:!0}}=n;return t.$$set=t=>{"item"in t&&e(0,r=t.item),"options"in t&&e(3,i=t.options)},[r,o,t=>{13===t.keyCode&&i.singleLine&&(t.preventDefault(),o.blur())},i,function(t){$[t?"unshift":"push"]((()=>{o=t,e(1,o)}))},function(){r=this.textContent,e(0,r)}]}class L extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),C(this,t,A,w,i,{item:0,options:3})}get item(){return this.$$.ctx[0]}set item(t){this.$$set({item:t}),_()}get options(){return this.$$.ctx[3]}set options(t){this.$$set({options:t}),_()}}export{L as default};