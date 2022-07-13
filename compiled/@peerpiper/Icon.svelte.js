function noop() { }
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
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function xlink_attr(node, attribute, value) {
    node.setAttributeNS('http://www.w3.org/1999/xlink', attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}

let current_component;
function set_current_component(component) {
    current_component = component;
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
    // `false` as a special case of no DOM component
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

/* src\lib\components\@peerpiper\Icons.svelte generated by Svelte v3.48.0 */

function create_fragment$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<svg><symbol id="avatar" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z"></path></symbol><symbol id="address" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="M412 414a111 111 0 0 1 90-77v-40h31c7 0 13-6 13-13v-15c0-5-2-9-7-11L355 153c-4-2-8-2-12 0l-65 37v-13c0-5-4-9-9-9h-29c-5 0-8 4-8 9v39l-74 42c-4 2-7 7-7 11v15c0 7 6 13 13 13h31v180c0 12 9 21 20 21h203c-13-25-15-56-6-84z"></path><path d="M592 412a81 81 0 0 0-109-36 82 82 0 0 0-36 109l61 108c5 9 18 9 23 0l61-108c12-22 12-49 0-73zm-73 72a35 35 0 1 1 0-70 35 35 0 1 1 0 70z"></path></symbol><symbol id="email" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path d="m582.1 312.4-197.5-128c-4.3-2.8-10-2.8-14.4 0l-199 128c-3.8 2.4-7.8 6.6-7.8 11v230.3c0 7.3 9.3 15.6 16.6 15.6h394.5c7.3 0 14.1-8.3 14.1-15.6V323.4c0-4.4-2.7-8.6-6.4-11zm-385 35.2 113 73.3-113 103zm131.8 88 41.2 26.8a13.2 13.2 0 0 0 14.3 0l41.1-26.8 115 104.7H214zM451.5 421l113-73.3V524zm-74.3-209.8 173.1 112.3-173 112.3-173.1-112.3zm0 200.6c20.7 0 40.9-7.3 56.7-20.6A13.2 13.2 0 0 0 417 371a62 62 0 1 1 22.2-47.5c0 6-4.9 10.9-10.8 10.9a11 11 0 0 1-10.9-10v-.9a40.3 40.3 0 1 0-12.3 29 37 37 0 0 0 60.3-29 88.4 88.4 0 1 0-88.3 88.4zm0-74.3a14 14 0 1 1 0-28 14 14 0 0 1 0 28z"></path></symbol><symbol id="phone" class="icon" width="32px" height="32px" viewBox="0 0 752 752"><path fill-rule="evenodd" d="m587 561-3 3c-96 96-241-7-315-81S92 264 188 168l3-3 107 106-13 14a39 39 0 0 0-5 49 503 503 0 0 0 138 138c16 11 36 9 49-5l14-13zm-92-118 104 103c7-14 4-33-8-45l-51-51a39 39 0 0 0-45-7zM206 153l103 104c7-15 5-33-7-45l-51-51a39 39 0 0 0-45-8z"></path></symbol><symbol id="arrow-left" class="icon" viewBox="0 0 24 24"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></symbol><symbol id="arrow-right" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></symbol><symbol id="arrow-up" class="icon" viewBox="0 0 24 24"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></symbol><symbol id="arrow-down" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></symbol><symbol id="check" class="icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></symbol><symbol id="close" class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></symbol><symbol id="download" class="icon" viewBox="0 0 24 24"><path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></symbol><symbol id="edit" class="icon" viewBox="0 0 24 24"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></symbol><symbol id="github" class="icon" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2ZM0 12C0 5.3726 5.3726 0 12 0C18.6274 0 24 5.3726 24 12C24 18.6274 18.6274 24 12 24C5.3726 24 0 18.6274 0 12Z" fill="currentColor" stroke="none"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.59162 22.7357C9.49492 22.6109 9.49492 21.4986 9.59162 19.399C8.55572 19.4347 7.90122 19.3628 7.62812 19.1833C7.21852 18.9139 6.80842 18.0833 6.44457 17.4979C6.08072 16.9125 5.27312 16.8199 4.94702 16.6891C4.62091 16.5582 4.53905 16.0247 5.84562 16.4282C7.15222 16.8316 7.21592 17.9303 7.62812 18.1872C8.04032 18.4441 9.02572 18.3317 9.47242 18.1259C9.91907 17.9201 9.88622 17.1538 9.96587 16.8503C10.0666 16.5669 9.71162 16.5041 9.70382 16.5018C9.26777 16.5018 6.97697 16.0036 6.34772 13.7852C5.71852 11.5669 6.52907 10.117 6.96147 9.49369C7.24972 9.07814 7.22422 8.19254 6.88497 6.83679C8.11677 6.67939 9.06732 7.06709 9.73672 7.99999C9.73737 8.00534 10.6143 7.47854 12.0001 7.47854C13.386 7.47854 13.8777 7.90764 14.2571 7.99999C14.6365 8.09234 14.94 6.36699 17.2834 6.83679C16.7942 7.79839 16.3844 8.99999 16.6972 9.49369C17.0099 9.98739 18.2372 11.5573 17.4833 13.7852C16.9807 15.2706 15.9927 16.1761 14.5192 16.5018C14.3502 16.5557 14.2658 16.6427 14.2658 16.7627C14.2658 16.9427 14.4942 16.9624 14.8233 17.8058C15.0426 18.368 15.0585 19.9739 14.8708 22.6234C14.3953 22.7445 14.0254 22.8257 13.7611 22.8673C13.2924 22.9409 12.7835 22.9822 12.2834 22.9982C11.7834 23.0141 11.6098 23.0123 10.9185 22.948C10.4577 22.9051 10.0154 22.8343 9.59162 22.7357Z" fill="currentColor" stroke="none"></path></symbol><symbol id="git-branch" class="icon" viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></symbol><symbol id="log-in" class="icon" viewBox="0 0 24 24"><path d="M15 3H19A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H15"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></symbol><symbol id="maximize" class="icon" viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></symbol><symbol id="maximize-2" class="icon" viewBox="0 0 24 24"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></symbol><symbol id="menu" class="icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></symbol><symbol id="message-square" class="icon" viewBox="0 0 24 24"><g transform="translate(0, 1)"><path d="M16.5 19H11V15H18V11H22V19H19.5L18 20.5L16.5 19Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 3H18V15H8.5L6.5 17L4.5 15H2V3Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 11H9" stroke="white" stroke-width="1.5" stroke-linecap="round"></path><path d="M6 7H12" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></g></symbol><symbol id="minus" class="icon" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="plus" class="icon" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></symbol><symbol id="save" class="icon" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></symbol><symbol id="link" class="icon" viewBox="0 0 24 24"><path d="M9,7L6,7A2 2 0 0 0 6,17L9,17"></path><path d="M15,7L18,7A2 2 0 0 1 18,17L15,17"></path><path d="M7,12L17,12"></path></symbol><symbol id="chevron" class="icon" viewBox="0 0 24 24"><path d="M2,7 L12,17 L20,7"></path></symbol><symbol id="delete" class="icon" viewBox="0 0 24 24"><path fill="currentColor" stroke="none" d="M22 4.2h-5.6L15 1.6c-.1-.2-.4-.4-.7-.4H9.6c-.2 0-.5.2-.6.4L7.6 4.2H2c-.4 0-.8.4-.8.8s.4.8.8.8h1.8V22c0 .4.3.8.8.8h15c.4 0 .8-.3.8-.8V5.8H22c.4 0 .8-.3.8-.8s-.4-.8-.8-.8zM10.8 16.5c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5zm4 0c0 .4-.3.8-.8.8s-.8-.3-.8-.8V10c0-.4.3-.8.8-.8s.8.3.8.8v6.5z"></path></symbol><symbol id="scanQR" class="icon" width="100%" height="100%" viewBox="0 0 760 760"><path d="M684 630c-31-34-9-38-2-84 7-34 13-75-2-123l-34-64c-22-39-51-89-58-117v-2c-6-24-9-43-9-60-2-22-4-35-20-41h-2c-11-3-22-5-33 2V59c0-22-20-41-43-41H205c-25 0-42 19-42 41v49s-29-26-49-30c-5 0-21 2-32 13a44 44 0 0 0-11 43c2 11 31 50 65 69 7 7 15 11 27 15v3h-5c-49 4-69 64-31 94-34 20-34 65-2 87a54 52 0 0 0 38 92v72c0 23 17 62 42 62h89c13 30 25 41 69 50h7c11 4 31 8 47 6l2 2 7 13c6 11 11 22 13 35 2 6 9 11 16 9 6-3 11-9 9-16-3-15-9-28-16-38l-9-13c-2-7-4-9-11-13l-2-2h-9c-11 2-31-3-43-5l-6-2c-32-6-34-4-47-26h160c23 0 43-17 43-41 0 0-20-60-18-86s24-65 24-65l18-30c9-24-4-47-18-78l-9-15c-11-23-20-47-20-75-2-11 5-41 20-63 7-8 16-19 29-17l5 24c0 17 2 39 11 64 7 33 34 82 58 123l33 63c12 41 7 78 0 112-6 45-31 58 9 101 12 5 20-4 18-15zM205 41h276c9 0 18 9 18 18v19H187V59c0-9 7-18 18-18zm-58 143c-18-11-51-48-51-54-3-7-3-17 4-22 5-4 14-4 16-6 4 0 47 30 47 30v58zm11 60a30 29 0 1 1 0 58 30 29 0 0 1 0-58zm0 145a30 29 0 1 1 0-58 30 29 0 0 1 0 58zm-29 54a30 29 0 1 1 60 0 30 29 0 0 1-60 0zm85 0c0-18-9-33-22-41 31-22 31-67-3-87 34-21 34-69-2-88V102h312v62c-15 26-24 59-22 76 0 30 11 58 22 82 31 267-67 211-312 211v-45c16-9 27-26 27-45zm267 161H205c-11 0-18-28-18-38v-9h312v9c0 10-9 38-18 38z"></path><path d="m306 191-2 18v18h5c4 0 4 2 4 3 1 4 0 5-4 5-5 0-5 0-5 10 0 8 0 8 5 8 4 0 5-1 5-5l3-3c5 0 5 0 5 13 2 13 2 13 5 13 4 2 5 0 5-3s2-5 5-5 3 0 3-5 0-5 5-5 5 0 5-3c0-5 0-5-5-5-3 0-5 0-5 5 0 3 0 3-3 3-5 0-5 0-5-18l-1-16-4-2c-3 0-5-1-5-5l-3-3c-3 0-5-2-5-10s-1-8-3-10z"></path><path d="m352 191-2 5c0 3 0 3-8 3-10 0-10 0-10 5 0 3 0 5 5 5 3 0 3 0 3 13v13h18v9c0 9 0 9 5 9h5v-26h10c8 0 8 0 8-5s0-5-8-5c-10 0-10 0-10-5 0-3 0-3-5-3s-5 0-5 3c0 4 2 5 5 5 5 0 5 2 5 5 0 5 0 5-5 5-3 0-5-2-5-5s-1-5-4-5c-4 0-4 0-4-10 0-8 0-8 5-8 3 0 3 0 3-5-1-3-4-6-6-3zm26 2c-1 5 0 6 5 6 3 0 3 0 3-5-1-5-8-6-9-1zm-146 29v31h62v-62h-62Zm54 0v23h-46v-46h46z"></path><path d="M250 222v13h26v-26h-26Zm146 0v31h63v-62h-63zm54 0v23h-46v-46h46z"></path><path d="M414 222v13h27v-26h-27zm-37 15v10l4 6c5 0 5 0 5-8 0-10 0-10-3-10zm-25 18-2 5c0 2 2 3 5 3s3 0 3-5c-1-3-4-6-6-3zm-122 10v10l5 6c5 0 5 2 5 5 0 5 0 5-5 5h-5v26h20v5c0 5 0 5 5 5 3 0 3 0 3-5 0-3-1-5-5-5l-3-3c0-3-1-5-5-5-5 0-5 0-5-10 0-8 0-8 5-8s5 0 5 5c0 12 0 13 5 13 3 0 3 2 3 5s2 3 5 3c5 0 5 0 5-3s-1-5-5-5c-5 0-5 0-5-10v-8h10c8 0 8 0 8 5 0 3 2 3 5 3 5 0 5 0 5 5s0 5-5 5-5 0-5 10c0 8 0 8-3 8s-5 2-5 4c0 4 5 6 13 4 4 0 5-1 5-4 0-2 2-4 5-4s3 2 3 5 2 3 15 3c5 0 5 0 5 5s0 5 5 5c3 0 3 0 3 10 0 8 0 8 5 8h5v-13c2-13 2-13 5-15 2 0 3-1 3-4 0-4 2-4 5-4 5 0 5 0 5 5s8 5 8 0c2-3 2-3 10-5 9 0 9 0 9-5s0-5-10-5c-9 0-9 0-9-3s2-5 5-5c4 0 5-1 5-5 0-3 0-5-5-5-3 0-5-1-5-5 0-1 0-3 5-3 4-1 5-1 5-10 0-8 0-8-5-8h-8c-5 0-5 0-5 8-1 9-1 9-5 10-3 0-5 2-5 5 0 2 0 3-3 3-5 0-5 0-5 5s0 5-5 5c-3 0-5 0-5 3 0 4 0 5-3 5-5 0-5 0-5 5 0 4 0 5 5 5 3 0 3 0 3 4 0 6-8 6-8 1-1-3-1-5-10-5-10 0-10 0-10-5s0-5-3-5-5-1-5-5c0-3 0-3 10-3 8 0 8 0 8 5 0 3 0 3 5 3 7-1 7-6 0-8-5 0-5 0-5-10 0-8 0-8 5-8 4 0 5 2 5 5 0 5 8 5 8 0 0-3 2-5 5-5 4 0 4-1 4-5 1-3 0-3-14-5-13 0-13 0-13-3 0-5 0-5-5-5s-5 0-5 3c0 4 2 5 5 5 5 0 5 2 5 5 0 5 0 5-5 5s-5 0-5-5v-5h-36v-3c0-7-8-7-8-2 0 4-1 5-5 5-5 0-5 0-5-3s2-5 5-5c4 0 5-2 5-5s-1-3-10-5zm64 29c0 5 0 5-3 5s-5 0-5-3 2-5 5-5 3 2 3 5zm56 10c0 4-1 5-5 5-3 0-5 2-5 5 0 2 0 3-3 3s-5 0-5-3 2-5 5-5 3 0 3-5 0-5 5-5c4 0 4 2 4 5z"></path><path d="M268 268c2 3 2 3 13 3 12 0 13 0 13-3v-5h-26Zm74-3c-2 2-2 6 2 6 3 2 6 0 6-3-1-5-6-6-8-3zm35 2c0 3 3 6 6 6l3-6c0-4 0-4-3-4zm29-2c-2 2-2 6 2 6 3 2 6 0 6-3-1-5-6-6-8-3zm16 8c0 8 0 8-4 8s-4 0-4 5c0 4 2 5 5 5 2 0 3-1 3-5 0-5 2-5 5-5 4 0 5 0 5-3 0-5 0-5 10-5 8 0 8 0 8 3 0 4-1 5-5 5-3 0-4 2-4 5 0 4-2 5-5 5-2 0-4 2-4 5s2 3 4 3c3 0 5 2 5 5 0 4 1 5 4 5 4 0 5 2 5 5s2 3 5 3h5v-52l-19-2h-19zm-36 5c0 3 0 3-3 3-5 0-6 2-6 7 3 5 8 3 9-2 0-3 2-5 5-5 4 0 5-1 5-5 0-3 0-3-5-3s-5 0-5 3zm10 26c0 13 0 13 5 13 3 0 3 0 3-13s0-13-3-13c-5 0-5 0-5 13zm28 7-2 3c0 2 2 3 5 3 5 0 5 0 5-5 0-3 0-3-3-3zm-8 8-2 5c0 2 2 3 5 3s3 0 3-5c-1-3-4-6-6-3zm-30 12c0 3-1 4-5 4s-4 2-4 15 0 13-4 13c-5 0-5 0-5 5s0 5-8 5c-10 0-10 0-10 4 0 3 2 4 5 4s3 0 3 5 0 5-3 5-5-1-5-5c0-3-1-5-5-5-3 0-5 2-5 5 0 4-1 5-3 5-3 0-5-1-5-5 0-3-1-5-5-5-3 0-5 2-5 5 0 4-1 5-5 5s-4 8 0 8 5 2 5 5c0 5 0 5-3 5s-5-1-5-5c0-3-1-5-5-5-3 2-3 2-3 10v10h8c7 0 8-1 8-5 0-5 0-5 10-5 8 0 8 0 8 5 2 4 2 4 10 5h8v-10c2-8 2-10 5-10 4 0 5-1 5-4 0-4 2-4 4-4 5 0 5 0 5 8 1 9 1 9 4 10 5 0 5 0 5-8v-10h15c13 0 13 0 13 4 0 3-1 4-5 4-3 0-3 2-3 10v10h54v-10c0-8-1-8-5-8-3 0-5 0-5 3 0 5-1 5-5 5-3 0-4-1-4-5 0-5 0-5 4-5s5 0 5-3 2-5 5-5c4 0 4-1 4-5 0-3 0-3-9-3h-9v16h-10c-9 0-9 0-9-3s-1-5-4-5c-4 0-4 0-4-5 0-3 0-5 4-5 3 0 4 0 4-3 0-5 0-5 19-5l18-1v-7l-18-2c-19 0-19 0-19-3s2-5 5-5c4 0 5-1 5-5 0-5 0-5-5-5-3 0-5-1-5-5-1-3-1-3-9-5-9 0-9 0-9-4s0-4-9-4-9 0-9 4zm28 27v15h-26l-2-15v-13h14l14 2v13zm-37 20c0 3 0 3-4 3-3 0-5 0-5-3s2-5 5-5c4 0 4 2 4 5zm-27 26c0 5 0 5-5 5s-5 0-5-3c0-5 2-7 7-7 2 0 3 2 3 5z"></path><path d="M396 360c0 3 2 3 5 3s3 0 3-3 0-5-3-5-5 2-5 5zm36-28c0 3 2 3 5 3 4 0 4 0 4-3s0-5-4-5c-3 0-5 2-5 5zm-202 5c-1 7 2 8 10 8 9 0 10-1 10-5 0-3-1-3-10-5zm30 0-2 5c0 3 0 3 5 3 4 0 5-1 5-3 0-5-5-8-8-5zm28 0-2 5c0 2 2 3 5 3s3 0 3-5c0-3-4-6-6-3zm54 0c-3 2-2 8 3 8 4 0 5-1 5-3 0-3-1-7-5-7zm108 0v10c2 7 2 7 5 7 4 1 5 0 5-9 0-8-1-8-5-10zm-146 13c2 5 9 7 10 2 0-5-1-7-6-7-4 0-4 0-4 5zm46 0c0 4 2 4 5 4 2 0 3 0 3-4 0-5 0-5-4-5s-4 0-4 5zm-118 36v32h62v-63h-62Zm54 0v23h-46v-46h46z"></path><path d="M250 386v13h26v-26h-26Zm54-13c0 8 0 8 5 8 4-1 4-1 4-9 1-7 0-7-4-9-5 0-5 0-5 10zm36-8c-1 5 2 8 5 8 4 0 5-1 5-5 0-3-1-5-5-5zm-8 13c0 3 2 3 5 3s3 0 3-3 0-5-3-5-5 2-5 5zm90 5c-1 5 2 8 5 8 4 0 5-1 5-5 0-3-1-5-5-5zm-54 31c0 4 2 5 5 5 4 0 4 0 4-5s0-5-5-5c-4 0-4 0-4 5z"></path></symbol></svg>`;
			set_style(div, "display", "none");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

class Icons extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$1, safe_not_equal, {});
	}
}

/* src\lib\components\@peerpiper\Icon.svelte generated by Svelte v3.48.0 */

function add_css(target) {
	append_styles(target, "svelte-ud19pw-Icon", ".icon.svelte-ud19pw-Icon{position:relative;overflow:hidden;vertical-align:middle;-o-object-fit:contain;object-fit:contain;transform-origin:center center;stroke:currentColor;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;fill:currentColor}");
}

function create_fragment(ctx) {
	let svg;
	let use;
	let use_xlink_href_value;
	let t0;
	let t1;
	let icons;
	let current;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);
	icons = new Icons({});

	return {
		c() {
			svg = svg_element("svg");
			use = svg_element("use");
			t0 = space();
			if (default_slot) default_slot.c();
			t1 = space();
			create_component(icons.$$.fragment);
			xlink_attr(use, "xlink:href", use_xlink_href_value = "#" + /*name*/ ctx[0]);
			attr(svg, "width", /*size*/ ctx[1]);
			attr(svg, "height", /*size*/ ctx[1]);
			attr(svg, "class", "icon  svelte-ud19pw-Icon");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, use);
			insert(target, t0, anchor);

			if (default_slot) {
				default_slot.m(target, anchor);
			}

			insert(target, t1, anchor);
			mount_component(icons, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*name*/ 1 && use_xlink_href_value !== (use_xlink_href_value = "#" + /*name*/ ctx[0])) {
				xlink_attr(use, "xlink:href", use_xlink_href_value);
			}

			if (!current || dirty & /*size*/ 2) {
				attr(svg, "width", /*size*/ ctx[1]);
			}

			if (!current || dirty & /*size*/ 2) {
				attr(svg, "height", /*size*/ ctx[1]);
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			transition_in(icons.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			transition_out(icons.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(svg);
			if (detaching) detach(t0);
			if (default_slot) default_slot.d(detaching);
			if (detaching) detach(t1);
			destroy_component(icons, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { name } = $$props;
	let { size = '100%' } = $$props;

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(0, name = $$props.name);
		if ('size' in $$props) $$invalidate(1, size = $$props.size);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	return [name, size, $$scope, slots];
}

class Icon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { name: 0, size: 1 }, add_css);
	}

	get name() {
		return this.$$.ctx[0];
	}

	set name(name) {
		this.$$set({ name });
		flush();
	}

	get size() {
		return this.$$.ctx[1];
	}

	set size(size) {
		this.$$set({ size });
		flush();
	}
}

export { Icon as default };
