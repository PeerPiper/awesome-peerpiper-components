function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t){t.parentNode.removeChild(t)}let u;function s(t){u=t}function a(){const t=function(){if(!u)throw new Error("Function called outside component initialization");return u}();return(e,n,{cancelable:o=!1}={})=>{const r=t.$$.callbacks[e];if(r){const c=function(t,e,{bubbles:n=!1,cancelable:o=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,o,e),r}(e,n,{cancelable:o});return r.slice().forEach((e=>{e.call(t,c)})),!c.defaultPrevented}return!0}}const l=[],f=[],d=[],$=[],m=Promise.resolve();let p=!1;function h(t){d.push(t)}const g=new Set;let b=0;function y(){const t=u;do{for(;b<l.length;){const t=l[b];b++,s(t),v(t.$$)}for(s(null),l.length=0,b=0;f.length;)f.pop()();for(let t=0;t<d.length;t+=1){const e=d[t];g.has(e)||(g.add(e),e())}d.length=0}while(l.length);for(;$.length;)$.pop()();p=!1,g.clear(),s(t)}function v(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(h)}}const x=new Set;function _(t,e){-1===t.$$.dirty[0]&&(l.push(t),p||(p=!0,m.then(y)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function k(c,a,l,f,d,$,m,p=[-1]){const g=u;s(c);const b=c.$$={fragment:null,ctx:null,props:$,update:t,not_equal:d,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a.context||(g?g.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:a.target||g.$$.root};m&&m(b.root);let v=!1;if(b.ctx=l?l(c,a.props||{},((t,e,...n)=>{const o=n.length?n[0]:e;return b.ctx&&d(b.ctx[t],b.ctx[t]=o)&&(!b.skip_bound&&b.bound[t]&&b.bound[t](o),v&&_(c,t)),e})):[],b.update(),v=!0,o(b.before_update),b.fragment=!!f&&f(b.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);b.fragment&&b.fragment.l(t),t.forEach(i)}else b.fragment&&b.fragment.c();a.intro&&((k=c.$$.fragment)&&k.i&&(x.delete(k),k.i(E))),function(t,n,c,i){const{fragment:u,on_mount:s,on_destroy:a,after_update:l}=t.$$;u&&u.m(n,c),i||h((()=>{const n=s.map(e).filter(r);a?a.push(...n):o(n),t.$$.on_mount=[]})),l.forEach(h)}(c,a.target,a.anchor,a.customElement),y()}var k,E;s(g)}function E(e){let n,o,r;return{c(){var t,o,r,c;t="span",n=document.createElement(t),o=n,r="contenteditable",null==(c="")?o.removeAttribute(r):o.getAttribute(r)!==c&&o.setAttribute(r,c),void 0===e[0]&&h((()=>e[2].call(n)))},m(t,c){var i,u,s,a;!function(t,e,n){t.insertBefore(e,n||null)}(t,n,c),void 0!==e[0]&&(n.textContent=e[0]),o||(i=n,u="input",s=e[2],i.addEventListener(u,s,a),r=()=>i.removeEventListener(u,s,a),o=!0)},p(t,[e]){1&e&&t[0]!==n.textContent&&(n.textContent=t[0])},i:t,o:t,d(t){t&&i(n),o=!1,r()}}}function C(t,e,n){const o=a();let{item:r}=e;let{key:c,value:i}=(u=r,{key:Object.keys(u)[0],value:u[Object.keys(u)[0]]});var u;return t.$$set=t=>{"item"in t&&n(1,r=t.item)},t.$$.update=()=>{1&t.$$.dirty&&i&&o("change",{[c]:i})},[i,r,function(){i=this.textContent,n(0,i)}]}class w extends class{$destroy(){!function(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),k(this,t,C,E,c,{item:1})}get item(){return this.$$.ctx[1]}set item(t){this.$$set({item:t}),y()}}export{w as default};
