function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function u(t){t.parentNode.removeChild(t)}let i;function a(t){i=t}function s(){const t=function(){if(!i)throw new Error("Function called outside component initialization");return i}();return(e,n,{cancelable:o=!1}={})=>{const r=t.$$.callbacks[e];if(r){const c=function(t,e,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,o,e),r}(e,n,{cancelable:o});return r.slice().forEach((e=>{e.call(t,c)})),!c.defaultPrevented}return!0}}const l=[],f=[],d=[],$=[],p=Promise.resolve();let m=!1;function h(t){d.push(t)}const g=new Set;let b=0;function y(){const t=i;do{for(;b<l.length;){const t=l[b];b++,a(t),v(t.$$)}for(a(null),l.length=0,b=0;f.length;)f.pop()();for(let t=0;t<d.length;t+=1){const e=d[t];g.has(e)||(g.add(e),e())}d.length=0}while(l.length);for(;$.length;)$.pop()();m=!1,g.clear(),a(t)}function v(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(h)}}const _=new Set;function x(t,e){-1===t.$$.dirty[0]&&(l.push(t),m||(m=!0,p.then(y)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function k(c,s,l,f,d,$,p,m=[-1]){const g=i;a(c);const b=c.$$={fragment:null,ctx:null,props:$,update:t,not_equal:d,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(g?g.$$.context:[])),callbacks:n(),dirty:m,skip_bound:!1,root:s.target||g.$$.root};p&&p(b.root);let v=!1;if(b.ctx=l?l(c,s.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return b.ctx&&d(b.ctx[t],b.ctx[t]=o)&&(!b.skip_bound&&b.bound[t]&&b.bound[t](o),v&&x(c,t)),e})):[],b.update(),v=!0,o(b.before_update),b.fragment=!!f&&f(b.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);b.fragment&&b.fragment.l(t),t.forEach(u)}else b.fragment&&b.fragment.c();s.intro&&((k=c.$$.fragment)&&k.i&&(_.delete(k),k.i(E))),function(t,n,c,u){const{fragment:i,on_mount:a,on_destroy:s,after_update:l}=t.$$;i&&i.m(n,c),u||h((()=>{const n=a.map(e).filter(r);s?s.push(...n):o(n),t.$$.on_mount=[]})),l.forEach(h)}(c,s.target,s.anchor,s.customElement),y()}var k,E;a(g)}function E(e){let n,o,r;return{c(){var t,o,r,c;t="span",n=document.createElement(t),o=n,r="contenteditable",null==(c="")?o.removeAttribute(r):o.getAttribute(r)!==c&&o.setAttribute(r,c),void 0===e[0]&&h((()=>e[2].call(n)))},m(t,c){var u,i,a,s;!function(t,e,n){t.insertBefore(e,n||null)}(t,n,c),void 0!==e[0]&&(n.textContent=e[0]),o||(u=n,i="input",a=e[2],u.addEventListener(i,a,s),r=()=>u.removeEventListener(i,a,s),o=!0)},p(t,[e]){1&e&&t[0]!==n.textContent&&(n.textContent=t[0])},i:t,o:t,d(t){t&&u(n),o=!1,r()}}}function C(t,e,n){const o=s();let{item:r}=e;let{key:c,value:u}=(i=r,{key:Object.keys(i)[0],value:i[Object.keys(i)[0]]});var i;return t.$$set=t=>{"item"in t&&n(1,r=t.item)},t.$$.update=()=>{1&t.$$.dirty&&u&&o("change",{[c]:u})},[u,r,function(){u=this.textContent,n(0,u)}]}class w extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),k(this,t,C,E,c,{item:1})}}export{w as default};