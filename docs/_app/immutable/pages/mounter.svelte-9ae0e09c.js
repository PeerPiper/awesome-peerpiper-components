import{S as J,i as L,s as G,C,w as S,x as O,y as N,z as K,A as q,q as U,o as A,B as D,a6 as I,e as _,t as g,k,c as w,a as b,h as $,d as c,m as v,g as h,J as f,E as F,b as Q}from"../chunks/index-bb279551.js";import{D as V,C as X,a as Y}from"../chunks/demo-dea16e1a.js";import Z from"../chunks/ComponentMounter-6e7fbb52.js";import"../chunks/preload-helper-fb2eb1ef.js";var tt=`function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function append(target, node) {
    target.appendChild(node);
}
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}
class HtmlTag {
    constructor(is_svg = false) {
        this.is_svg = false;
        this.is_svg = is_svg;
        this.e = this.n = null;
    }
    c(html) {
        this.h(html);
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            if (this.is_svg)
                this.e = svg_element(target.nodeName);
            else
                this.e = element(target.nodeName);
            this.t = target;
            this.c(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // \`false\` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

/* src\\lib\\components\\@peerpiper\\OutterWraper.svelte generated by Svelte v3.48.0 */

function add_css$1(target) {
	append_styles(target, "svelte-1boszsj-TagManager", ".svelte-1boszsj-TagManager,.svelte-1boszsj-TagManager::before,.svelte-1boszsj-TagManager::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#E5E7EB}.svelte-1boszsj-TagManager::before,.svelte-1boszsj-TagManager::after{--tw-content:''}.svelte-1boszsj-TagManager:-moz-focusring{outline:auto}.svelte-1boszsj-TagManager:-moz-ui-invalid{box-shadow:none}.svelte-1boszsj-TagManager::-webkit-inner-spin-button,.svelte-1boszsj-TagManager::-webkit-outer-spin-button{height:auto}.svelte-1boszsj-TagManager::-webkit-search-decoration{-webkit-appearance:none}.svelte-1boszsj-TagManager::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}.svelte-1boszsj-TagManager:disabled{cursor:default}.svelte-1boszsj-TagManager::-webkit-datetime-edit-fields-wrapper{padding:0}.svelte-1boszsj-TagManager::-webkit-date-and-time-value{min-height:1.5em}.svelte-1boszsj-TagManager{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji\\"}.svelte-1boszsj-TagManager,.svelte-1boszsj-TagManager::before,.svelte-1boszsj-TagManager::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1boszsj-TagManager::-webkit-backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1boszsj-TagManager::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}.m-2.svelte-1boszsj-TagManager{margin:0.5rem}.flex.svelte-1boszsj-TagManager{display:flex}@-webkit-keyframes svelte-1boszsj-TagManager-spin{to{transform:rotate(360deg)}}@keyframes svelte-1boszsj-TagManager-spin{to{transform:rotate(360deg)}}.flex-col.svelte-1boszsj-TagManager{flex-direction:column}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}");
}

function create_fragment$3(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			attr(div, "class", "flex flex-col m-2 svelte-1boszsj-TagManager");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class OutterWraper extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {}, add_css$1);
	}
}

/* src\\lib\\components\\@peerpiper\\Wrapper.svelte generated by Svelte v3.48.0 */

function add_css(target) {
	append_styles(target, "svelte-xs45s4-TagManager", "@tailwind base;@tailwind components;@tailwind utilities;.svelte-xs45s4-TagManager,.svelte-xs45s4-TagManager::before,.svelte-xs45s4-TagManager::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#E5E7EB}.svelte-xs45s4-TagManager::before,.svelte-xs45s4-TagManager::after{--tw-content:''}.svelte-xs45s4-TagManager:-moz-focusring{outline:auto}.svelte-xs45s4-TagManager:-moz-ui-invalid{box-shadow:none}.svelte-xs45s4-TagManager::-webkit-inner-spin-button,.svelte-xs45s4-TagManager::-webkit-outer-spin-button{height:auto}.svelte-xs45s4-TagManager::-webkit-search-decoration{-webkit-appearance:none}.svelte-xs45s4-TagManager::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}.svelte-xs45s4-TagManager:disabled{cursor:default}.svelte-xs45s4-TagManager::-webkit-datetime-edit-fields-wrapper{padding:0}.svelte-xs45s4-TagManager::-webkit-date-and-time-value{min-height:1.5em}.svelte-xs45s4-TagManager{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, \\"Helvetica Neue\\", Arial, \\"Noto Sans\\", sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\", \\"Noto Color Emoji\\"}.svelte-xs45s4-TagManager,.svelte-xs45s4-TagManager::before,.svelte-xs45s4-TagManager::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-xs45s4-TagManager::-webkit-backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-xs45s4-TagManager::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.m-2.svelte-xs45s4-TagManager{margin:0.5rem}.flex-1.svelte-xs45s4-TagManager{flex:1 1 0%}@-webkit-keyframes svelte-xs45s4-TagManager-spin{to{transform:rotate(360deg)}}@keyframes svelte-xs45s4-TagManager-spin{to{transform:rotate(360deg)}}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}");
}

function create_fragment$2(ctx) {
	let div;
	let current;
	const default_slot_template = /*#slots*/ ctx[1].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

	return {
		c() {
			div = element("div");
			if (default_slot) default_slot.c();
			attr(div, "class", "flex-1 m-2 svelte-xs45s4-TagManager");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[0],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;

	$$self.$$set = $$props => {
		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
	};

	return [$$scope, slots];
}

class Wrapper extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {}, add_css);
	}
}

function canonicalize(obj) {
    var buffer = '';
    serialize(obj);
    return buffer;
    function serialize(object) {
        if (object === null ||
            typeof object !== 'object' ||
            object.toJSON != null) {
            /////////////////////////////////////////////////
            // Primitive data type - Use ES6/JSON          //
            /////////////////////////////////////////////////
            buffer += JSON.stringify(object);
            // } else if (object instanceof Date) {
            //   buffer += JSON.stringify(object);
        }
        else if (Array.isArray(object)) {
            /////////////////////////////////////////////////
            // Array - Maintain element order              //
            /////////////////////////////////////////////////
            buffer += '[';
            var next_1 = false;
            object.forEach(function (element) {
                if (next_1) {
                    buffer += ',';
                }
                next_1 = true;
                /////////////////////////////////////////
                // Array element - Recursive expansion //
                /////////////////////////////////////////
                serialize(element);
            });
            buffer += ']';
        }
        else {
            /////////////////////////////////////////////////
            // Object - Sort properties before serializing //
            /////////////////////////////////////////////////
            buffer += '{';
            var vKeys = Object.keys(object).sort();
            vKeys.forEach(function (property, index) { return addProp(object, property, index); });
            buffer += '}';
        }
    }
    function addProp(object, property, index) {
        if (index > 0) {
            buffer += ',';
        }
        ///////////////////////////////////////////////
        // Property names are strings - Use ES6/JSON //
        ///////////////////////////////////////////////
        buffer += JSON.stringify(property);
        buffer += ':';
        //////////////////////////////////////////
        // Property value - Recursive expansion //
        //////////////////////////////////////////
        serialize(object[property]);
    }
}

/* src\\lib\\components\\@peerpiper\\TagManager.svelte generated by Svelte v3.48.0 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[5] = list[i][0];
	child_ctx[6] = list[i][1].esModule;
	child_ctx[7] = list[i][1].props !== undefined ? list[i][1].props : {};
	return child_ctx;
}

// (27:0) {#if ComponentMounter && params && Object.entries(params).length > 0}
function create_if_block(ctx) {
	let outterwraper;
	let current;

	outterwraper = new OutterWraper({
			props: {
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(outterwraper.$$.fragment);
		},
		m(target, anchor) {
			mount_component(outterwraper, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const outterwraper_changes = {};

			if (dirty & /*$$scope, params, ComponentMounter*/ 1027) {
				outterwraper_changes.$$scope = { dirty, ctx };
			}

			outterwraper.$set(outterwraper_changes);
		},
		i(local) {
			if (current) return;
			transition_in(outterwraper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(outterwraper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(outterwraper, detaching);
		}
	};
}

// (31:3) <ComponentWrapper>
function create_default_slot_1(ctx) {
	let switch_instance;
	let t;
	let current;

	function change_handler(...args) {
		return /*change_handler*/ ctx[4](/*props*/ ctx[7], /*tag*/ ctx[5], /*esModule*/ ctx[6], ...args);
	}

	var switch_value = /*ComponentMounter*/ ctx[1];

	function switch_props(ctx) {
		return {
			props: {
				esModule: /*esModule*/ ctx[6],
				props: /*props*/ ctx[7]
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		switch_instance.$on("change", change_handler);
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			t = space();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, t, anchor);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const switch_instance_changes = {};
			if (dirty & /*params*/ 1) switch_instance_changes.esModule = /*esModule*/ ctx[6];
			if (dirty & /*params*/ 1) switch_instance_changes.props = /*props*/ ctx[7];

			if (switch_value !== (switch_value = /*ComponentMounter*/ ctx[1])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					switch_instance.$on("change", change_handler);
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, t.parentNode, t);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (switch_instance) destroy_component(switch_instance, detaching);
			if (detaching) detach(t);
		}
	};
}

// (29:2) {#each [...Object.entries(params)] as [tag, { esModule, props = { }
function create_each_block(ctx) {
	let componentwrapper;
	let current;

	componentwrapper = new Wrapper({
			props: {
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	return {
		c() {
			create_component(componentwrapper.$$.fragment);
		},
		m(target, anchor) {
			mount_component(componentwrapper, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const componentwrapper_changes = {};

			if (dirty & /*$$scope, ComponentMounter, params*/ 1027) {
				componentwrapper_changes.$$scope = { dirty, ctx };
			}

			componentwrapper.$set(componentwrapper_changes);
		},
		i(local) {
			if (current) return;
			transition_in(componentwrapper.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(componentwrapper.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(componentwrapper, detaching);
		}
	};
}

// (28:1) <OutterWraper>
function create_default_slot(ctx) {
	let each_1_anchor;
	let current;
	let each_value = [...Object.entries(/*params*/ ctx[0])];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*ComponentMounter, Object, params, dispatch, canonicalize, update, JSON*/ 15) {
				each_value = [...Object.entries(/*params*/ ctx[0])];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function create_fragment$1(ctx) {
	let show_if = /*ComponentMounter*/ ctx[1] && /*params*/ ctx[0] && Object.entries(/*params*/ ctx[0]).length > 0;
	let if_block_anchor;
	let current;
	let if_block = show_if && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*ComponentMounter, params*/ 3) show_if = /*ComponentMounter*/ ctx[1] && /*params*/ ctx[0] && Object.entries(/*params*/ ctx[0]).length > 0;

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*ComponentMounter, params*/ 3) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let { params } = $$props;
	const dispatch = createEventDispatcher();
	let ComponentMounter;

	onMount(async () => {
		// not SSR compatible
		$$invalidate(1, ComponentMounter = (await Promise.resolve().then(function () { return ComponentMounter$1; })).default);
	});

	// sends update for each individual tag as they change
	function update({ tag, value }) {
		$$invalidate(0, params[tag] = Object.assign({}, params[tag], { ...value }), params);

		// dispatch update for this tag
		dispatch('change', { tag, props: { ...params[tag] } });
	}

	const change_handler = (props, tag, esModule, e) => {
		// loading contacts?
		if (e.detail.contacts) dispatch('change', { contacts: e.detail.contacts });

		// cleanse and compare
		canonicalize(e.detail) != canonicalize(props) && update({
			tag,
			value: {
				esModule,
				props: JSON.parse(canonicalize(e.detail))
			}
		});
	};

	$$self.$$set = $$props => {
		if ('params' in $$props) $$invalidate(0, params = $$props.params);
	};

	return [params, ComponentMounter, dispatch, update, change_handler];
}

class TagManager extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { params: 0 });
	}

	get params() {
		return this.$$.ctx[0];
	}

	set params(params) {
		this.$$set({ params });
		flush();
	}
}

/* src\\lib\\components\\@peerpiper\\ComponentMounter.svelte generated by Svelte v3.48.0 */

function create_fragment(ctx) {
	let html_tag;
	let html_anchor;
	let t;
	let div;

	return {
		c() {
			html_tag = new HtmlTag(false);
			html_anchor = empty();
			t = space();
			div = element("div");
			html_tag.a = html_anchor;
		},
		m(target, anchor) {
			html_tag.m(/*css*/ ctx[0], document.head);
			append(document.head, html_anchor);
			insert(target, t, anchor);
			insert(target, div, anchor);
			/*div_binding*/ ctx[6](div);
		},
		p(ctx, [dirty]) {
			if (dirty & /*css*/ 1) html_tag.p(/*css*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			detach(html_anchor);
			if (detaching) html_tag.d();
			if (detaching) detach(t);
			if (detaching) detach(div);
			/*div_binding*/ ctx[6](null);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { esModule } = $$props;
	let { props } = $$props;
	let { css } = $$props;
	const dispatch = createEventDispatcher();
	let component; // the esModule component to be mounted in this gateway
	let url;
	let target; // where we mount this component
	let mounted;

	async function loadEsModuleComponent() {
		$$invalidate(0, css = css ? \`<style>\${css}<\\/style>\` : '');

		// cleanup from prior loads
		if (component) {
			component.$destroy();
			URL.revokeObjectURL(url); // memory management
		}

		const blob = new Blob([esModule], { type: 'text/javascript' });
		url = URL.createObjectURL(blob);

		const App = (await import(/* @vite-ignore */
		url)).default;

		if (!App || !target) return;
		$$invalidate(1, target.innerHTML = '', target);
		$$invalidate(4, component = new App({ target, props: {} }));

		// get the default values of component for each of the keys of component.$$.props
		// this way the parent component can deduce the schema of the data
		const initProps = component['$$'].props;

		let inits = {};

		Object.keys(initProps).map(k => {
			inits[k] = component[k]; // load default initial props
		});

		let allProps = Object.assign(inits, props);
		dispatch('change', allProps); // trigger "rendered" in Gateway, plus push any default values to the db to save

		// on change, Pass props message up to iframe parent so it can be saved/updated
		component.$on('change', event => {
			dispatch('change', event.detail);
		});

		setProps(allProps); // set them after we emit the defaults back to the user to save/display
	} // if (url) URL.revokeObjectURL(url); // memory management

	function setProps(props) {
		if (!component) return;
		component.$set({ ...props });
	}

	onMount(() => {
		$$invalidate(5, mounted = true);
	});

	onDestroy(() => {
		if (component) component.$destroy();
		if (url) URL.revokeObjectURL(url); // memory management
	});

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			target = $$value;
			$$invalidate(1, target);
		});
	}

	$$self.$$set = $$props => {
		if ('esModule' in $$props) $$invalidate(2, esModule = $$props.esModule);
		if ('props' in $$props) $$invalidate(3, props = $$props.props);
		if ('css' in $$props) $$invalidate(0, css = $$props.css);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*mounted, esModule*/ 36) {
			if (mounted && esModule) loadEsModuleComponent();
		}

		if ($$self.$$.dirty & /*component, props*/ 24) {
			if (component && props) setProps();
		}
	};

	return [css, target, esModule, props, component, mounted, div_binding];
}

class ComponentMounter extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { esModule: 2, props: 3, css: 0 });
	}

	get esModule() {
		return this.$$.ctx[2];
	}

	set esModule(esModule) {
		this.$$set({ esModule });
		flush();
	}

	get props() {
		return this.$$.ctx[3];
	}

	set props(props) {
		this.$$set({ props });
		flush();
	}

	get css() {
		return this.$$.ctx[0];
	}

	set css(css) {
		this.$$set({ css });
		flush();
	}
}

var ComponentMounter$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ComponentMounter
});

export { TagManager as default };
`;function nt(u){let t,a,e,r,n,s,i,l,p,m,j,M,y,T,x,z;return{c(){t=_("h1"),a=g("Want to mount multiple Tag components in the component gateway? Just use TagManager!"),e=k(),r=_("h2"),n=g("Notes"),s=k(),i=_("p"),l=g("If you want to be able to edit the property then pass the variable in as a prop."),p=k(),m=_("p"),j=g("If you want to use this component to display data only, then use read-only modeby using slotted Content instead of props."),M=k(),y=_("p"),T=g("When used with the Gateway, do not assign any action to "),x=_("code"),z=g("on:change")},l(o){t=w(o,"H1",{});var d=b(t);a=$(d,"Want to mount multiple Tag components in the component gateway? Just use TagManager!"),d.forEach(c),e=v(o),r=w(o,"H2",{});var P=b(r);n=$(P,"Notes"),P.forEach(c),s=v(o),i=w(o,"P",{});var R=b(i);l=$(R,"If you want to be able to edit the property then pass the variable in as a prop."),R.forEach(c),p=v(o),m=w(o,"P",{});var W=b(m);j=$(W,"If you want to use this component to display data only, then use read-only modeby using slotted Content instead of props."),W.forEach(c),M=v(o),y=w(o,"P",{});var E=b(y);T=$(E,"When used with the Gateway, do not assign any action to "),x=w(E,"CODE",{});var H=b(x);z=$(H,"on:change"),H.forEach(c),E.forEach(c)},m(o,d){h(o,t,d),f(t,a),h(o,e,d),h(o,r,d),f(r,n),h(o,s,d),h(o,i,d),f(i,l),h(o,p,d),h(o,m,d),f(m,j),h(o,M,d),h(o,y,d),f(y,T),f(y,x),f(x,z)},p:F,d(o){o&&c(t),o&&c(e),o&&c(r),o&&c(s),o&&c(i),o&&c(p),o&&c(m),o&&c(M),o&&c(y)}}}function et(u){let t,a;return t=new Z({props:{slot:"example",esModule:tt,props:{params:u[0]}}}),t.$on("change",u[2]),{c(){S(t.$$.fragment)},l(e){O(t.$$.fragment,e)},m(e,r){N(t,e,r),a=!0},p(e,r){const n={};r&1&&(n.props={params:e[0]}),t.$set(n)},i(e){a||(U(t.$$.fragment,e),a=!0)},o(e){A(t.$$.fragment,e),a=!1},d(e){D(t,e)}}}function ot(u){let t,a;const e=[u[1],B];let r={$$slots:{example:[et],default:[nt]},$$scope:{ctx:u}};for(let n=0;n<e.length;n+=1)r=C(r,e[n]);return t=new V({props:r}),{c(){S(t.$$.fragment)},l(n){O(t.$$.fragment,n)},m(n,s){N(t,n,s),a=!0},p(n,[s]){const i=s&2?K(e,[s&2&&q(n[1]),s&0&&q(B)]):{};s&9&&(i.$$scope={dirty:s,ctx:n}),t.$set(i)},i(n){a||(U(t.$$.fragment,n),a=!0)},o(n){A(t.$$.fragment,n),a=!1},d(n){D(t,n)}}}const B={layout:"demo",title:"Manage Multiple Compiled Components",library:"Peerpiper",author:"@douganderson444",description:null};function at(u,t,a){let{params:e=[{esModule:X,props:{profile:{firstName:"Doug",lastName:"Anders =)"}}},{esModule:Y,props:{contacts:[{pubkey:"GnHDprayyzahnWjDqvQ9AGWsmjojWymVNztGHNr4S7an",handle:"douganderson444"},{pubkey:"Adr1aN",handle:"aamath"},{pubkey:"DArkHHH",handle:"darikj"}]}}]}=t;const r=n=>console.log(n.detail);return u.$$set=n=>{a(1,t=C(C({},t),I(n))),"params"in n&&a(0,e=n.params)},t=I(t),[e,t,r]}class rt extends J{constructor(t){super(),L(this,t,at,ot,G,{params:0})}}function st(u){let t,a,e,r,n,s,i;return s=new rt({}),{c(){t=_("main"),a=g("Demo "),e=_("pre"),r=g("awesome-peerpiper-components"),n=k(),S(s.$$.fragment),this.h()},l(l){t=w(l,"MAIN",{class:!0});var p=b(t);a=$(p,"Demo "),e=w(p,"PRE",{});var m=b(e);r=$(m,"awesome-peerpiper-components"),m.forEach(c),n=v(p),O(s.$$.fragment,p),p.forEach(c),this.h()},h(){Q(t,"class","m-4")},m(l,p){h(l,t,p),f(t,a),f(t,e),f(e,r),f(t,n),N(s,t,null),i=!0},p:F,i(l){i||(U(s.$$.fragment,l),i=!0)},o(l){A(s.$$.fragment,l),i=!1},d(l){l&&c(t),D(s)}}}class dt extends J{constructor(t){super(),L(this,t,null,st,G,{})}}export{dt as default};
