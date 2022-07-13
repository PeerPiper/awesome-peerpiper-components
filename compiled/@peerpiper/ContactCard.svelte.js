function noop() { }
const identity = x => x;
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
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
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
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
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
function append_empty_stylesheet(node) {
    const style_element = element('style');
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
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
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
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
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style(node, key, value, important) {
    if (value === null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}

// we need to store the information for multiple documents because a Svelte application could also contain iframes
// https://github.com/sveltejs/svelte/issues/3624
const managed_styles = new Map();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
        rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        managed_styles.forEach(info => {
            const { stylesheet } = info;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            info.rules = {};
        });
        managed_styles.clear();
    });
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
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        // @ts-ignore
        callbacks.slice().forEach(fn => fn.call(this, event));
    }
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
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
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

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
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
const null_transition = { duration: 0 };
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = (program.b - t);
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
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

/* src\lib\components\@peerpiper\Editable.svelte generated by Svelte v3.48.0 */

function create_fragment$5(ctx) {
	let span;
	let mounted;
	let dispose;

	return {
		c() {
			span = element("span");
			attr(span, "contenteditable", "");
			attr(span, "class", "align-middle");
			if (/*item*/ ctx[0] === void 0) add_render_callback(() => /*span_input_handler*/ ctx[5].call(span));
		},
		m(target, anchor) {
			insert(target, span, anchor);
			/*span_binding*/ ctx[4](span);

			if (/*item*/ ctx[0] !== void 0) {
				span.textContent = /*item*/ ctx[0];
			}

			if (!mounted) {
				dispose = [
					listen(span, "input", /*span_input_handler*/ ctx[5]),
					listen(span, "keydown", /*handleEnter*/ ctx[2])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*item*/ 1 && /*item*/ ctx[0] !== span.textContent) {
				span.textContent = /*item*/ ctx[0];
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(span);
			/*span_binding*/ ctx[4](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	createEventDispatcher();
	let { item } = $$props;
	let { options = { singleLine: true } } = $$props;
	let inputEl;

	// by default, if Enter is pressed, the input is blurred
	const handleEnter = e => {
		if (e.keyCode === 13 && options.singleLine) {
			e.preventDefault();
			inputEl.blur();
		}
	};

	function span_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			inputEl = $$value;
			$$invalidate(1, inputEl);
		});
	}

	function span_input_handler() {
		item = this.textContent;
		$$invalidate(0, item);
	}

	$$self.$$set = $$props => {
		if ('item' in $$props) $$invalidate(0, item = $$props.item);
		if ('options' in $$props) $$invalidate(3, options = $$props.options);
	};

	return [item, inputEl, handleEnter, options, span_binding, span_input_handler];
}

class Editable extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$4, create_fragment$5, safe_not_equal, { item: 0, options: 3 });
	}

	get item() {
		return this.$$.ctx[0];
	}

	set item(item) {
		this.$$set({ item });
		flush();
	}

	get options() {
		return this.$$.ctx[3];
	}

	set options(options) {
		this.$$set({ options });
		flush();
	}
}

/* src\lib\components\@peerpiper\Icons.svelte generated by Svelte v3.48.0 */

function create_fragment$4(ctx) {
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
		init(this, options, null, create_fragment$4, safe_not_equal, {});
	}
}

/* src\lib\components\@peerpiper\Icon.svelte generated by Svelte v3.48.0 */

function add_css$3(target) {
	append_styles(target, "svelte-12pt8gd-ContactCard", ".icon.svelte-12pt8gd-ContactCard{position:relative;overflow:hidden;vertical-align:middle;-o-object-fit:contain;object-fit:contain;transform-origin:center center;stroke:currentColor;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;fill:currentColor}");
}

function create_fragment$3(ctx) {
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
			attr(svg, "class", "icon  svelte-12pt8gd-ContactCard");
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

function instance$3($$self, $$props, $$invalidate) {
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
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { name: 0, size: 1 }, add_css$3);
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

/* src\lib\components\@peerpiper\Content.svelte generated by Svelte v3.48.0 */

function add_css$2(target) {
	append_styles(target, "svelte-1ld26u0-ContactCard", ".svelte-1ld26u0-ContactCard,.svelte-1ld26u0-ContactCard::before,.svelte-1ld26u0-ContactCard::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#E5E7EB}.svelte-1ld26u0-ContactCard::before,.svelte-1ld26u0-ContactCard::after{--tw-content:''}.svelte-1ld26u0-ContactCard:-moz-focusring{outline:auto}.svelte-1ld26u0-ContactCard:-moz-ui-invalid{box-shadow:none}.svelte-1ld26u0-ContactCard::-webkit-inner-spin-button,.svelte-1ld26u0-ContactCard::-webkit-outer-spin-button{height:auto}.svelte-1ld26u0-ContactCard::-webkit-search-decoration{-webkit-appearance:none}.svelte-1ld26u0-ContactCard::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}.svelte-1ld26u0-ContactCard:disabled{cursor:default}.svelte-1ld26u0-ContactCard::-webkit-datetime-edit-fields-wrapper{padding:0}.svelte-1ld26u0-ContactCard::-webkit-date-and-time-value{min-height:1.5em}.svelte-1ld26u0-ContactCard{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"}.svelte-1ld26u0-ContactCard,.svelte-1ld26u0-ContactCard::before,.svelte-1ld26u0-ContactCard::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1ld26u0-ContactCard::-webkit-backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1ld26u0-ContactCard::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}.m-2.svelte-1ld26u0-ContactCard{margin:0.5rem}.flex.svelte-1ld26u0-ContactCard{display:flex}.h-8.svelte-1ld26u0-ContactCard{height:2rem}.w-8.svelte-1ld26u0-ContactCard{width:2rem}@-webkit-keyframes svelte-1ld26u0-ContactCard-spin{to{transform:rotate(360deg)}}@keyframes svelte-1ld26u0-ContactCard-spin{to{transform:rotate(360deg)}}.items-center.svelte-1ld26u0-ContactCard{align-items:center}.justify-center.svelte-1ld26u0-ContactCard{justify-content:center}.bg-contain.svelte-1ld26u0-ContactCard{background-size:contain}.bg-no-repeat.svelte-1ld26u0-ContactCard{background-repeat:no-repeat}.text-center.svelte-1ld26u0-ContactCard{text-align:center}.align-middle.svelte-1ld26u0-ContactCard{vertical-align:middle}.text-slate-500.svelte-1ld26u0-ContactCard{--tw-text-opacity:1;color:rgb(100 116 139 / var(--tw-text-opacity))}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}");
}

const get_first_slot_changes = dirty => ({});
const get_first_slot_context = ctx => ({});

// (10:21)      
function fallback_block$1(ctx) {
	let div;
	let icon;
	let current;
	icon = new Icon({ props: { name: /*name*/ ctx[0] } });

	return {
		c() {
			div = element("div");
			create_component(icon.$$.fragment);
			attr(div, "class", "text-slate-500 svelte-1ld26u0-ContactCard");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(icon, div, null);
			current = true;
		},
		p(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*name*/ 1) icon_changes.name = /*name*/ ctx[0];
			icon.$set(icon_changes);
		},
		i(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(icon);
		}
	};
}

function create_fragment$2(ctx) {
	let div2;
	let div0;
	let t;
	let div1;
	let current;
	const first_slot_template = /*#slots*/ ctx[2].first;
	const first_slot = create_slot(first_slot_template, ctx, /*$$scope*/ ctx[1], get_first_slot_context);
	const first_slot_or_fallback = first_slot || fallback_block$1(ctx);
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			if (first_slot_or_fallback) first_slot_or_fallback.c();
			t = space();
			div1 = element("div");
			if (default_slot) default_slot.c();
			attr(div0, "class", "align-middle w-8 h-8 svelte-1ld26u0-ContactCard");
			attr(div1, "class", "align-middle svelte-1ld26u0-ContactCard");
			attr(div2, "class", "flex align-middle items-center text-center justify-center bg-contain bg-no-repeat m-2 biggie svelte-1ld26u0-ContactCard");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);

			if (first_slot_or_fallback) {
				first_slot_or_fallback.m(div0, null);
			}

			append(div2, t);
			append(div2, div1);

			if (default_slot) {
				default_slot.m(div1, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (first_slot) {
				if (first_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					update_slot_base(
						first_slot,
						first_slot_template,
						ctx,
						/*$$scope*/ ctx[1],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
						: get_slot_changes(first_slot_template, /*$$scope*/ ctx[1], dirty, get_first_slot_changes),
						get_first_slot_context
					);
				}
			} else {
				if (first_slot_or_fallback && first_slot_or_fallback.p && (!current || dirty & /*name*/ 1)) {
					first_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[1],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
						null
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(first_slot_or_fallback, local);
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(first_slot_or_fallback, local);
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div2);
			if (first_slot_or_fallback) first_slot_or_fallback.d(detaching);
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	let { name = null } = $$props;

	$$self.$$set = $$props => {
		if ('name' in $$props) $$invalidate(0, name = $$props.name);
		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	return [name, $$scope, slots];
}

class Content extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { name: 0 }, add_css$2);
	}

	get name() {
		return this.$$.ctx[0];
	}

	set name(name) {
		this.$$set({ name });
		flush();
	}
}

function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}
function quintOut(t) {
    return --t * t * t * t * t + 1;
}

function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 } = {}) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
    };
}

/* src\lib\components\@peerpiper\ContextMenu.svelte generated by Svelte v3.48.0 */

function add_css$1(target) {
	append_styles(target, "svelte-87u4if-ContactCard", ".svelte-87u4if-ContactCard,.svelte-87u4if-ContactCard::before,.svelte-87u4if-ContactCard::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#E5E7EB}.svelte-87u4if-ContactCard::before,.svelte-87u4if-ContactCard::after{--tw-content:''}b.svelte-87u4if-ContactCard{font-weight:bolder}input.svelte-87u4if-ContactCard{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}.svelte-87u4if-ContactCard:-moz-focusring{outline:auto}.svelte-87u4if-ContactCard:-moz-ui-invalid{box-shadow:none}.svelte-87u4if-ContactCard::-webkit-inner-spin-button,.svelte-87u4if-ContactCard::-webkit-outer-spin-button{height:auto}.svelte-87u4if-ContactCard::-webkit-search-decoration{-webkit-appearance:none}.svelte-87u4if-ContactCard::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}input.svelte-87u4if-ContactCard::-moz-placeholder{opacity:1;color:#9CA3AF}input.svelte-87u4if-ContactCard::placeholder{opacity:1;color:#9CA3AF}.svelte-87u4if-ContactCard:disabled{cursor:default}svg.svelte-87u4if-ContactCard{display:block;vertical-align:middle}[type='text'].svelte-87u4if-ContactCard{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border-color:#6B7280;border-width:1px;border-radius:0px;padding-top:0.5rem;padding-right:0.75rem;padding-bottom:0.5rem;padding-left:0.75rem;font-size:1rem;line-height:1.5rem;--tw-shadow:0 0 #0000}[type='text'].svelte-87u4if-ContactCard:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#1C64F2;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);border-color:#1C64F2}input.svelte-87u4if-ContactCard::-moz-placeholder{color:#6B7280;opacity:1}input.svelte-87u4if-ContactCard::placeholder{color:#6B7280;opacity:1}.svelte-87u4if-ContactCard::-webkit-datetime-edit-fields-wrapper{padding:0}.svelte-87u4if-ContactCard::-webkit-date-and-time-value{min-height:1.5em}[type='checkbox'].svelte-87u4if-ContactCard{-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0;-webkit-print-color-adjust:exact;color-adjust:exact;print-color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;-moz-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#1C64F2;background-color:#fff;border-color:#6B7280;border-width:1px;--tw-shadow:0 0 #0000}[type='checkbox'].svelte-87u4if-ContactCard{border-radius:0px}[type='checkbox'].svelte-87u4if-ContactCard:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:2px;--tw-ring-offset-color:#fff;--tw-ring-color:#1C64F2;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}[type='checkbox'].svelte-87u4if-ContactCard:checked{border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type='checkbox'].svelte-87u4if-ContactCard:checked{background-image:url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")}[type='checkbox'].svelte-87u4if-ContactCard:indeterminate{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e\");border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type='checkbox'].svelte-87u4if-ContactCard:indeterminate:hover,[type='checkbox'].svelte-87u4if-ContactCard:indeterminate:focus{border-color:transparent;background-color:currentColor}.svelte-87u4if-ContactCard{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"}.svelte-87u4if-ContactCard,.svelte-87u4if-ContactCard::before,.svelte-87u4if-ContactCard::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-87u4if-ContactCard::-webkit-backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-87u4if-ContactCard::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}.z-50.svelte-87u4if-ContactCard{z-index:50}.mx-4.svelte-87u4if-ContactCard{margin-left:1rem;margin-right:1rem}.mx-1.svelte-87u4if-ContactCard{margin-left:0.25rem;margin-right:0.25rem}.flex.svelte-87u4if-ContactCard{display:flex}.h-10.svelte-87u4if-ContactCard{height:2.5rem}.w-10.svelte-87u4if-ContactCard{width:2.5rem}@-webkit-keyframes svelte-87u4if-ContactCard-spin{to{transform:rotate(360deg)}}@keyframes svelte-87u4if-ContactCard-spin{to{transform:rotate(360deg)}}.flex-row.svelte-87u4if-ContactCard{flex-direction:row}.flex-col.svelte-87u4if-ContactCard{flex-direction:column}.justify-end.svelte-87u4if-ContactCard{justify-content:flex-end}.rounded-sm.svelte-87u4if-ContactCard{border-radius:0.125rem}.border.svelte-87u4if-ContactCard{border-width:1px}.border-slate-300.svelte-87u4if-ContactCard{--tw-border-opacity:1;border-color:rgb(203 213 225 / var(--tw-border-opacity))}.bg-slate-50.svelte-87u4if-ContactCard{--tw-bg-opacity:1;background-color:rgb(248 250 252 / var(--tw-bg-opacity))}.p-4.svelte-87u4if-ContactCard{padding:1rem}.text-left.svelte-87u4if-ContactCard{text-align:left}.text-sm.svelte-87u4if-ContactCard{font-size:0.875rem;line-height:1.25rem}.text-lg.svelte-87u4if-ContactCard{font-size:1.125rem;line-height:1.75rem}.drop-shadow-lg.svelte-87u4if-ContactCard{--tw-drop-shadow:drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}");
}

// (68:1) {#if open}
function create_if_block$1(ctx) {
	let div1;
	let div0;
	let current_block_type_index;
	let if_block;
	let div1_transition;
	let current;
	const if_block_creators = [create_if_block_1, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*submitting*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if_block.c();
			attr(div0, "class", "text-left border-slate-300 svelte-87u4if-ContactCard");
			attr(div1, "class", "flex flex-row justify-end z-50 bg-slate-50 border drop-shadow-lg p-4 mx-4 rounded-sm svelte-87u4if-ContactCard");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			if_blocks[current_block_type_index].m(div0, null);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div0, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);

			add_render_callback(() => {
				if (!div1_transition) div1_transition = create_bidirectional_transition(
					div1,
					fly,
					{
						delay: 250,
						duration: 300,
						x: 0,
						y: -100,
						opacity: 0.1,
						easing: quintOut
					},
					true
				);

				div1_transition.run(1);
			});

			current = true;
		},
		o(local) {
			transition_out(if_block);

			if (!div1_transition) div1_transition = create_bidirectional_transition(
				div1,
				fly,
				{
					delay: 250,
					duration: 300,
					x: 0,
					y: -100,
					opacity: 0.1,
					easing: quintOut
				},
				false
			);

			div1_transition.run(0);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if_blocks[current_block_type_index].d();
			if (detaching && div1_transition) div1_transition.end();
		}
	};
}

// (94:4) {:else}
function create_else_block$1(ctx) {
	let t;

	return {
		c() {
			t = text("Requesting access...");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (74:4) {#if !submitting}
function create_if_block_1(ctx) {
	let span;
	let t3;
	let content0;
	let t4;
	let content1;
	let current;

	content0 = new Content({
			props: {
				$$slots: {
					first: [create_first_slot_1],
					default: [create_default_slot_1$1]
				},
				$$scope: { ctx }
			}
		});

	content1 = new Content({
			props: {
				$$slots: {
					first: [create_first_slot],
					default: [create_default_slot$1]
				},
				$$scope: { ctx }
			}
		});

	return {
		c() {
			span = element("span");
			span.innerHTML = `Paste the <b class="svelte-87u4if-ContactCard">Public Key</b> you want to grant access`;
			t3 = space();
			create_component(content0.$$.fragment);
			t4 = space();
			create_component(content1.$$.fragment);
			attr(span, "class", "text-sm svelte-87u4if-ContactCard");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			insert(target, t3, anchor);
			mount_component(content0, target, anchor);
			insert(target, t4, anchor);
			mount_component(content1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const content0_changes = {};

			if (dirty & /*$$scope, targetPublicKey*/ 260) {
				content0_changes.$$scope = { dirty, ctx };
			}

			content0.$set(content0_changes);
			const content1_changes = {};

			if (dirty & /*$$scope*/ 256) {
				content1_changes.$$scope = { dirty, ctx };
			}

			content1.$set(content1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(content0.$$.fragment, local);
			transition_in(content1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(content0.$$.fragment, local);
			transition_out(content1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			if (detaching) detach(t3);
			destroy_component(content0, detaching);
			if (detaching) detach(t4);
			destroy_component(content1, detaching);
		}
	};
}

// (76:5) <Content>
function create_default_slot_1$1(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "type", "text");
			attr(input, "placeholder", "Their Public Key");
			attr(input, "class", "svelte-87u4if-ContactCard");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			set_input_value(input, /*targetPublicKey*/ ctx[2]);

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler*/ ctx[5]),
					listen(input, "keydown", /*handleInput*/ ctx[4])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*targetPublicKey*/ 4 && input.value !== /*targetPublicKey*/ ctx[2]) {
				set_input_value(input, /*targetPublicKey*/ ctx[2]);
			}
		},
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (77:6) <svelte:fragment slot="first">
function create_first_slot_1(ctx) {
	let span;

	return {
		c() {
			span = element("span");
			span.textContent = "Grant Acess:";
			attr(span, "class", "text-sm mx-1 text-lg svelte-87u4if-ContactCard");
		},
		m(target, anchor) {
			insert(target, span, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (87:5) <Content>
function create_default_slot$1(ctx) {
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			input = element("input");
			attr(input, "type", "text");
			attr(input, "placeholder", "douganderson444");
			attr(input, "class", "svelte-87u4if-ContactCard");
		},
		m(target, anchor) {
			insert(target, input, anchor);

			if (!mounted) {
				dispose = listen(input, "keydown", /*handleInput*/ ctx[4]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(input);
			mounted = false;
			dispose();
		}
	};
}

// (88:6) <svelte:fragment slot="first">
function create_first_slot(ctx) {
	let input;
	let t0;
	let span;

	return {
		c() {
			input = element("input");
			t0 = space();
			span = element("span");
			span.innerHTML = `Add <b class="svelte-87u4if-ContactCard">Contact</b>`;
			attr(input, "type", "checkbox");
			input.checked = true;
			attr(input, "class", "svelte-87u4if-ContactCard");
			attr(span, "class", "text-sm mx-1 svelte-87u4if-ContactCard");
		},
		m(target, anchor) {
			insert(target, input, anchor);
			insert(target, t0, anchor);
			insert(target, span, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(input);
			if (detaching) detach(t0);
			if (detaching) detach(span);
		}
	};
}

function create_fragment$1(ctx) {
	let div2;
	let div1;
	let div0;
	let t;
	let clickOutside_action;
	let current;
	let mounted;
	let dispose;
	let if_block = /*open*/ ctx[0] && create_if_block$1(ctx);

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			div0.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 752 752" class="svelte-87u4if-ContactCard"><path d="M346.9 153.4c-6.2 0-12.1 5.2-13.7 10.2l-12.4 43.5a176 176 0 0 0-25.2 10.4l-39.5-21.9c-5.3-3-12.7-2-17 2.4l-41 41.1a14.6 14.6 0 0 0-2.4 16.9l22 39.6a171 171 0 0 0-10.4 25l-43.5 12.5c-6 1.7-10.4 7.6-10.4 13.8v58.3c0 6 4.5 12 10.4 13.6L207 431c2.9 8.7 6.5 17 10.5 25.1L195.7 496a14.7 14.7 0 0 0 2.4 16.9l41 41.1a14.6 14.6 0 0 0 17 2.4l39.5-22c8.1 4.2 16.5 7.7 25.2 10.6l12.4 43.3a14.6 14.6 0 0 0 13.7 10.4h58.3c6 0 12-4.5 13.6-10.4l12.4-43.3c8.7-2.9 17.1-6.4 25.2-10.5l39.5 21.9c5.3 3 12.7 2 17-2.4l41-41.1a14.6 14.6 0 0 0 2.4-17l-22-39.6c4.2-8 7.7-16.4 10.6-25.1l43.3-12.3a14.6 14.6 0 0 0 10.4-13.6V347c0-6.2-4.4-12.1-10.4-13.8l-43.5-12.4c-2.8-8.7-6.3-17-10.3-25l21.9-39.7a14.7 14.7 0 0 0-2.4-16.9l-41-41.1a14.6 14.6 0 0 0-17-2.4l-39.5 21.9c-8-4.1-16.5-7.5-25.2-10.4l-12.4-43.5a14.6 14.6 0 0 0-13.6-10.2zm10.6 28.4h37L406 222c1.3 4.7 5.2 8.7 10 10 11.9 3.2 23.2 8 33.8 14 4.2 2.4 9.7 2.5 14 .2l36.6-20.5 26 26-20.4 36.6a14.5 14.5 0 0 0 0 14c6.1 10.6 11 22 14.3 34a14 14 0 0 0 9.7 9.9l40.3 11.4v36.9L530 406a14.5 14.5 0 0 0-9.7 9.8 149 149 0 0 1-14.3 34 14.5 14.5 0 0 0 0 14l20.5 36.6-26 26-36.8-20.5a14.5 14.5 0 0 0-13.9.1c-10.6 6-22 11-33.9 14.2a14.5 14.5 0 0 0-9.9 9.8l-11.4 40.3h-37L346.2 530a14.5 14.5 0 0 0-9.9-9.8c-12-3.3-23.3-8.1-33.9-14.2a14.5 14.5 0 0 0-13.9-.1l-36.7 20.4-26-25.9 20.4-36.7c2.3-4.2 2.3-9.7 0-13.9-6-10.6-11-22-14.2-34a14.5 14.5 0 0 0-9.8-9.8l-40.3-11.5v-36.9l40.3-11.4c4.6-1.3 8.5-5.2 9.8-10a149 149 0 0 1 14.2-34c2.3-4.2 2.3-9.6 0-13.9l-20.5-36.5 26-26 36.8 20.4c4.2 2.3 9.7 2.2 14-.2a146 146 0 0 1 33.8-14 15 15 0 0 0 10-10zm18.5 90c-57.4 0-104.2 46.8-104.2 104.2S318.6 480.2 376 480.2c57.4 0 104.2-46.8 104.2-104.2S433.4 271.8 376 271.8zm0 28.4c42 0 75.8 33.8 75.8 75.8S418 451.8 376 451.8 300.2 418 300.2 376s33.8-75.8 75.8-75.8z" class="svelte-87u4if-ContactCard"></path></svg>`;
			t = space();
			if (if_block) if_block.c();
			attr(div0, "class", "w-10 h-10 svelte-87u4if-ContactCard");
			attr(div1, "class", "flex flex-row justify-end svelte-87u4if-ContactCard");
			attr(div2, "class", "flex flex-col svelte-87u4if-ContactCard");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			append(div1, div0);
			append(div2, t);
			if (if_block) if_block.m(div2, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(div0, "click", /*openMenu*/ ctx[3]),
					action_destroyer(clickOutside_action = clickOutside.call(null, div2, {
						enabled: /*open*/ ctx[0],
						cb: /*clickOutside_function*/ ctx[6]
					}))
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*open*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*open*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div2, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (clickOutside_action && is_function(clickOutside_action.update) && dirty & /*open, submitting*/ 3) clickOutside_action.update.call(null, {
				enabled: /*open*/ ctx[0],
				cb: /*clickOutside_function*/ ctx[6]
			});
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
			if (detaching) detach(div2);
			if (if_block) if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

function clickOutside(node, { enabled: initialEnabled, cb }) {
	const handleOutsideClick = ({ target }) => {
		if (!node.contains(target)) {
			cb();
		}
	};

	function update({ enabled }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });

	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	const dispatch = createEventDispatcher();
	let open = false;
	let submitting;
	let targetPublicKey;

	function openMenu(e) {
		$$invalidate(0, open = !open);
	}

	function handleInput(e) {
		if (e.code !== 'Enter') return;
		$$invalidate(1, submitting = true);
		dispatch('change', { targetPublicKey });
	}

	function input_input_handler() {
		targetPublicKey = this.value;
		$$invalidate(2, targetPublicKey);
	}

	const clickOutside_function = () => {
		$$invalidate(0, open = false);
		$$invalidate(1, submitting = false);
	};

	return [
		open,
		submitting,
		targetPublicKey,
		openMenu,
		handleInput,
		input_input_handler,
		clickOutside_function
	];
}

class ContextMenu extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {}, add_css$1);
	}
}

/* src\lib\components\@peerpiper\ContactCard.svelte generated by Svelte v3.48.0 */

function add_css(target) {
	append_styles(target, "svelte-1gq7yus-ContactCard", ".svelte-1gq7yus-ContactCard,.svelte-1gq7yus-ContactCard::before,.svelte-1gq7yus-ContactCard::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#E5E7EB}.svelte-1gq7yus-ContactCard::before,.svelte-1gq7yus-ContactCard::after{--tw-content:''}input.svelte-1gq7yus-ContactCard{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}.svelte-1gq7yus-ContactCard:-moz-focusring{outline:auto}.svelte-1gq7yus-ContactCard:-moz-ui-invalid{box-shadow:none}.svelte-1gq7yus-ContactCard::-webkit-inner-spin-button,.svelte-1gq7yus-ContactCard::-webkit-outer-spin-button{height:auto}.svelte-1gq7yus-ContactCard::-webkit-search-decoration{-webkit-appearance:none}.svelte-1gq7yus-ContactCard::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}blockquote.svelte-1gq7yus-ContactCard,p.svelte-1gq7yus-ContactCard{margin:0}input.svelte-1gq7yus-ContactCard::-moz-placeholder{opacity:1;color:#9CA3AF}input.svelte-1gq7yus-ContactCard::placeholder{opacity:1;color:#9CA3AF}.svelte-1gq7yus-ContactCard:disabled{cursor:default}img.svelte-1gq7yus-ContactCard,svg.svelte-1gq7yus-ContactCard{display:block;vertical-align:middle}img.svelte-1gq7yus-ContactCard{max-width:100%;height:auto}input.svelte-1gq7yus-ContactCard::-moz-placeholder{color:#6B7280;opacity:1}input.svelte-1gq7yus-ContactCard::placeholder{color:#6B7280;opacity:1}.svelte-1gq7yus-ContactCard::-webkit-datetime-edit-fields-wrapper{padding:0}.svelte-1gq7yus-ContactCard::-webkit-date-and-time-value{min-height:1.5em}[type='file'].svelte-1gq7yus-ContactCard{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type='file'].svelte-1gq7yus-ContactCard:focus{outline:1px auto inherit}input[type=file].svelte-1gq7yus-ContactCard::-webkit-file-upload-button{color:white;background:#1F2937;border:0;font-weight:500;font-size:0.875rem;cursor:pointer;padding-top:0.625rem;padding-bottom:0.625rem;padding-left:2rem;padding-right:1rem;-webkit-margin-start:-1rem;margin-inline-start:-1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}input[type=file].svelte-1gq7yus-ContactCard::file-selector-button{color:white;background:#1F2937;border:0;font-weight:500;font-size:0.875rem;cursor:pointer;padding-top:0.625rem;padding-bottom:0.625rem;padding-left:2rem;padding-right:1rem;-webkit-margin-start:-1rem;margin-inline-start:-1rem;-webkit-margin-end:1rem;margin-inline-end:1rem}input[type=file].svelte-1gq7yus-ContactCard::-webkit-file-upload-button:hover{background:#374151}input[type=file].svelte-1gq7yus-ContactCard::file-selector-button:hover{background:#374151}.svelte-1gq7yus-ContactCard{font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"}.svelte-1gq7yus-ContactCard,.svelte-1gq7yus-ContactCard::before,.svelte-1gq7yus-ContactCard::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1gq7yus-ContactCard::-webkit-backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1gq7yus-ContactCard::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(63 131 248 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}.absolute.svelte-1gq7yus-ContactCard{position:absolute}.relative.svelte-1gq7yus-ContactCard{position:relative}.z-10.svelte-1gq7yus-ContactCard{z-index:10}.m-auto.svelte-1gq7yus-ContactCard{margin:auto}.my-2.svelte-1gq7yus-ContactCard{margin-top:0.5rem;margin-bottom:0.5rem}.mx-auto.svelte-1gq7yus-ContactCard{margin-left:auto;margin-right:auto}.mx-2.svelte-1gq7yus-ContactCard{margin-left:0.5rem;margin-right:0.5rem}.-mt-20.svelte-1gq7yus-ContactCard{margin-top:-5rem}.mt-5.svelte-1gq7yus-ContactCard{margin-top:1.25rem}.mb-7.svelte-1gq7yus-ContactCard{margin-bottom:1.75rem}.flex.svelte-1gq7yus-ContactCard{display:flex}.h-24.svelte-1gq7yus-ContactCard{height:6rem}.h-32.svelte-1gq7yus-ContactCard{height:8rem}.w-96.svelte-1gq7yus-ContactCard{width:24rem}.w-32.svelte-1gq7yus-ContactCard{width:8rem}.max-w-lg.svelte-1gq7yus-ContactCard{max-width:32rem}.max-w-none.svelte-1gq7yus-ContactCard{max-width:none}.flex-none.svelte-1gq7yus-ContactCard{flex:none}@-webkit-keyframes svelte-1gq7yus-ContactCard-spin{to{transform:rotate(360deg)}}@keyframes svelte-1gq7yus-ContactCard-spin{to{transform:rotate(360deg)}}.items-center.svelte-1gq7yus-ContactCard{align-items:center}.justify-center.svelte-1gq7yus-ContactCard{justify-content:center}.overflow-hidden.svelte-1gq7yus-ContactCard{overflow:hidden}.rounded-2xl.svelte-1gq7yus-ContactCard{border-radius:1rem}.rounded-full.svelte-1gq7yus-ContactCard{border-radius:9999px}.bg-slate-100.svelte-1gq7yus-ContactCard{--tw-bg-opacity:1;background-color:rgb(241 245 249 / var(--tw-bg-opacity))}.bg-white.svelte-1gq7yus-ContactCard{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}.bg-green-400.svelte-1gq7yus-ContactCard{--tw-bg-opacity:1;background-color:rgb(49 196 141 / var(--tw-bg-opacity))}.fill-slate-500.svelte-1gq7yus-ContactCard{fill:#64748b}.object-cover.svelte-1gq7yus-ContactCard{-o-object-fit:cover;object-fit:cover}.px-3.svelte-1gq7yus-ContactCard{padding-left:0.75rem;padding-right:0.75rem}.text-center.svelte-1gq7yus-ContactCard{text-align:center}.text-xl.svelte-1gq7yus-ContactCard{font-size:1.25rem;line-height:1.75rem}.text-base.svelte-1gq7yus-ContactCard{font-size:1rem;line-height:1.5rem}.text-sky-500.svelte-1gq7yus-ContactCard{--tw-text-opacity:1;color:rgb(14 165 233 / var(--tw-text-opacity))}.text-white.svelte-1gq7yus-ContactCard{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.shadow-xl.svelte-1gq7yus-ContactCard{--tw-shadow:0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.drop-shadow-xl.svelte-1gq7yus-ContactCard{--tw-drop-shadow:drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media(min-width: 640px){}@media(min-width: 768px){}@media(min-width: 1024px){}@media(min-width: 1280px){}@media(min-width: 1536px){}");
}

const get_phone_slot_changes = dirty => ({});
const get_phone_slot_context = ctx => ({});
const get_email_slot_changes = dirty => ({});
const get_email_slot_context = ctx => ({});
const get_address_slot_changes = dirty => ({});
const get_address_slot_context = ctx => ({});
const get_name_slot_changes = dirty => ({});
const get_name_slot_context = ctx => ({});

// (75:2) {:else}
function create_else_block(ctx) {
	let div;
	let img;
	let img_src_value;

	return {
		c() {
			div = element("div");
			img = element("img");
			attr(img, "class", "rounded-full bg-white absolute max-w-none object-cover svelte-1gq7yus-ContactCard");
			if (!src_url_equal(img.src, img_src_value = /*profile*/ ctx[0].avatar)) attr(img, "src", img_src_value);
			attr(img, "alt", "d");
			set_style(img, "width", "100%");
			set_style(img, "height", "100%");
			set_style(img, "transform-origin", "50% 50% 0px");
			attr(div, "class", "relative z-10 overflow-hidden flex-none mx-auto w-32 h-32 drop-shadow-xl svelte-1gq7yus-ContactCard");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, img);
		},
		p(ctx, dirty) {
			if (dirty & /*profile*/ 1 && !src_url_equal(img.src, img_src_value = /*profile*/ ctx[0].avatar)) {
				attr(img, "src", img_src_value);
			}
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (64:2) {#if !profile.avatar}
function create_if_block(ctx) {
	let svg;
	let path;

	return {
		c() {
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "d", "M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z");
			attr(path, "class", "svelte-1gq7yus-ContactCard");
			attr(svg, "class", "rounded-full bg-white shadow-xl drop-shadow-xl svelte-1gq7yus-ContactCard");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "version", "1.0");
			attr(svg, "viewBox", "0 0 256 256");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

// (87:20)      
function fallback_block_4(ctx) {
	let editable0;
	let updating_item;
	let t;
	let editable1;
	let updating_item_1;
	let current;

	function editable0_item_binding(value) {
		/*editable0_item_binding*/ ctx[8](value);
	}

	let editable0_props = {};

	if (/*profile*/ ctx[0].firstName !== void 0) {
		editable0_props.item = /*profile*/ ctx[0].firstName;
	}

	editable0 = new Editable({ props: editable0_props });
	binding_callbacks.push(() => bind(editable0, 'item', editable0_item_binding));

	function editable1_item_binding(value) {
		/*editable1_item_binding*/ ctx[9](value);
	}

	let editable1_props = {};

	if (/*profile*/ ctx[0].lastName !== void 0) {
		editable1_props.item = /*profile*/ ctx[0].lastName;
	}

	editable1 = new Editable({ props: editable1_props });
	binding_callbacks.push(() => bind(editable1, 'item', editable1_item_binding));

	return {
		c() {
			create_component(editable0.$$.fragment);
			t = space();
			create_component(editable1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(editable0, target, anchor);
			insert(target, t, anchor);
			mount_component(editable1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const editable0_changes = {};

			if (!updating_item && dirty & /*profile*/ 1) {
				updating_item = true;
				editable0_changes.item = /*profile*/ ctx[0].firstName;
				add_flush_callback(() => updating_item = false);
			}

			editable0.$set(editable0_changes);
			const editable1_changes = {};

			if (!updating_item_1 && dirty & /*profile*/ 1) {
				updating_item_1 = true;
				editable1_changes.item = /*profile*/ ctx[0].lastName;
				add_flush_callback(() => updating_item_1 = false);
			}

			editable1.$set(editable1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editable0.$$.fragment, local);
			transition_in(editable1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editable0.$$.fragment, local);
			transition_out(editable1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(editable0, detaching);
			if (detaching) detach(t);
			destroy_component(editable1, detaching);
		}
	};
}

// (97:23)      
function fallback_block_3(ctx) {
	let editable;
	let updating_item;
	let current;

	function editable_item_binding(value) {
		/*editable_item_binding*/ ctx[10](value);
	}

	let editable_props = {};

	if (/*profile*/ ctx[0].address !== void 0) {
		editable_props.item = /*profile*/ ctx[0].address;
	}

	editable = new Editable({ props: editable_props });
	binding_callbacks.push(() => bind(editable, 'item', editable_item_binding));

	return {
		c() {
			create_component(editable.$$.fragment);
		},
		m(target, anchor) {
			mount_component(editable, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const editable_changes = {};

			if (!updating_item && dirty & /*profile*/ 1) {
				updating_item = true;
				editable_changes.item = /*profile*/ ctx[0].address;
				add_flush_callback(() => updating_item = false);
			}

			editable.$set(editable_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editable.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editable.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(editable, detaching);
		}
	};
}

// (96:1) <Content name={'address'}>
function create_default_slot_2(ctx) {
	let current;
	const address_slot_template = /*#slots*/ ctx[3].address;
	const address_slot = create_slot(address_slot_template, ctx, /*$$scope*/ ctx[14], get_address_slot_context);
	const address_slot_or_fallback = address_slot || fallback_block_3(ctx);

	return {
		c() {
			if (address_slot_or_fallback) address_slot_or_fallback.c();
		},
		m(target, anchor) {
			if (address_slot_or_fallback) {
				address_slot_or_fallback.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (address_slot) {
				if (address_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
					update_slot_base(
						address_slot,
						address_slot_template,
						ctx,
						/*$$scope*/ ctx[14],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
						: get_slot_changes(address_slot_template, /*$$scope*/ ctx[14], dirty, get_address_slot_changes),
						get_address_slot_context
					);
				}
			} else {
				if (address_slot_or_fallback && address_slot_or_fallback.p && (!current || dirty & /*profile*/ 1)) {
					address_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(address_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(address_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (address_slot_or_fallback) address_slot_or_fallback.d(detaching);
		}
	};
}

// (103:21)      
function fallback_block_2(ctx) {
	let editable;
	let updating_item;
	let current;

	function editable_item_binding_1(value) {
		/*editable_item_binding_1*/ ctx[11](value);
	}

	let editable_props = {};

	if (/*profile*/ ctx[0].email !== void 0) {
		editable_props.item = /*profile*/ ctx[0].email;
	}

	editable = new Editable({ props: editable_props });
	binding_callbacks.push(() => bind(editable, 'item', editable_item_binding_1));

	return {
		c() {
			create_component(editable.$$.fragment);
		},
		m(target, anchor) {
			mount_component(editable, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const editable_changes = {};

			if (!updating_item && dirty & /*profile*/ 1) {
				updating_item = true;
				editable_changes.item = /*profile*/ ctx[0].email;
				add_flush_callback(() => updating_item = false);
			}

			editable.$set(editable_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editable.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editable.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(editable, detaching);
		}
	};
}

// (102:1) <Content name={'email'}>
function create_default_slot_1(ctx) {
	let current;
	const email_slot_template = /*#slots*/ ctx[3].email;
	const email_slot = create_slot(email_slot_template, ctx, /*$$scope*/ ctx[14], get_email_slot_context);
	const email_slot_or_fallback = email_slot || fallback_block_2(ctx);

	return {
		c() {
			if (email_slot_or_fallback) email_slot_or_fallback.c();
		},
		m(target, anchor) {
			if (email_slot_or_fallback) {
				email_slot_or_fallback.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (email_slot) {
				if (email_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
					update_slot_base(
						email_slot,
						email_slot_template,
						ctx,
						/*$$scope*/ ctx[14],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
						: get_slot_changes(email_slot_template, /*$$scope*/ ctx[14], dirty, get_email_slot_changes),
						get_email_slot_context
					);
				}
			} else {
				if (email_slot_or_fallback && email_slot_or_fallback.p && (!current || dirty & /*profile*/ 1)) {
					email_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(email_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(email_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (email_slot_or_fallback) email_slot_or_fallback.d(detaching);
		}
	};
}

// (109:21)      
function fallback_block_1(ctx) {
	let editable;
	let updating_item;
	let current;

	function editable_item_binding_2(value) {
		/*editable_item_binding_2*/ ctx[12](value);
	}

	let editable_props = {};

	if (/*profile*/ ctx[0].phone !== void 0) {
		editable_props.item = /*profile*/ ctx[0].phone;
	}

	editable = new Editable({ props: editable_props });
	binding_callbacks.push(() => bind(editable, 'item', editable_item_binding_2));

	return {
		c() {
			create_component(editable.$$.fragment);
		},
		m(target, anchor) {
			mount_component(editable, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const editable_changes = {};

			if (!updating_item && dirty & /*profile*/ 1) {
				updating_item = true;
				editable_changes.item = /*profile*/ ctx[0].phone;
				add_flush_callback(() => updating_item = false);
			}

			editable.$set(editable_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editable.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editable.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(editable, detaching);
		}
	};
}

// (108:1) <Content name={'phone'}>
function create_default_slot(ctx) {
	let current;
	const phone_slot_template = /*#slots*/ ctx[3].phone;
	const phone_slot = create_slot(phone_slot_template, ctx, /*$$scope*/ ctx[14], get_phone_slot_context);
	const phone_slot_or_fallback = phone_slot || fallback_block_1(ctx);

	return {
		c() {
			if (phone_slot_or_fallback) phone_slot_or_fallback.c();
		},
		m(target, anchor) {
			if (phone_slot_or_fallback) {
				phone_slot_or_fallback.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (phone_slot) {
				if (phone_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
					update_slot_base(
						phone_slot,
						phone_slot_template,
						ctx,
						/*$$scope*/ ctx[14],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
						: get_slot_changes(phone_slot_template, /*$$scope*/ ctx[14], dirty, get_phone_slot_changes),
						get_phone_slot_context
					);
				}
			} else {
				if (phone_slot_or_fallback && phone_slot_or_fallback.p && (!current || dirty & /*profile*/ 1)) {
					phone_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(phone_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(phone_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (phone_slot_or_fallback) phone_slot_or_fallback.d(detaching);
		}
	};
}

// (117:9)       
function fallback_block(ctx) {
	let span;
	let editable;
	let updating_item;
	let current;

	function editable_item_binding_3(value) {
		/*editable_item_binding_3*/ ctx[13](value);
	}

	let editable_props = { options: { singleLine: false } };

	if (/*profile*/ ctx[0].notes !== void 0) {
		editable_props.item = /*profile*/ ctx[0].notes;
	}

	editable = new Editable({ props: editable_props });
	binding_callbacks.push(() => bind(editable, 'item', editable_item_binding_3));

	return {
		c() {
			span = element("span");
			create_component(editable.$$.fragment);
			attr(span, "class", "text-sky-500 svelte-1gq7yus-ContactCard");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			mount_component(editable, span, null);
			current = true;
		},
		p(ctx, dirty) {
			const editable_changes = {};

			if (!updating_item && dirty & /*profile*/ 1) {
				updating_item = true;
				editable_changes.item = /*profile*/ ctx[0].notes;
				add_flush_callback(() => updating_item = false);
			}

			editable.$set(editable_changes);
		},
		i(local) {
			if (current) return;
			transition_in(editable.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(editable.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_component(editable);
		}
	};
}

function create_fragment(ctx) {
	let div3;
	let div0;
	let contextmenu;
	let t0;
	let input;
	let t1;
	let div1;
	let t2;
	let div2;
	let t3;
	let content0;
	let t4;
	let content1;
	let t5;
	let content2;
	let t6;
	let blockquote;
	let p;
	let t7;
	let footer;
	let current;
	let mounted;
	let dispose;
	contextmenu = new ContextMenu({});
	contextmenu.$on("change", /*change_handler*/ ctx[4]);

	function select_block_type(ctx, dirty) {
		if (!/*profile*/ ctx[0].avatar) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);
	const name_slot_template = /*#slots*/ ctx[3].name;
	const name_slot = create_slot(name_slot_template, ctx, /*$$scope*/ ctx[14], get_name_slot_context);
	const name_slot_or_fallback = name_slot || fallback_block_4(ctx);

	content0 = new Content({
			props: {
				name: 'address',
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			}
		});

	content1 = new Content({
			props: {
				name: 'email',
				$$slots: { default: [create_default_slot_1] },
				$$scope: { ctx }
			}
		});

	content2 = new Content({
			props: {
				name: 'phone',
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			}
		});

	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);
	const default_slot_or_fallback = default_slot || fallback_block(ctx);

	return {
		c() {
			div3 = element("div");
			div0 = element("div");
			create_component(contextmenu.$$.fragment);
			t0 = space();
			input = element("input");
			t1 = space();
			div1 = element("div");
			if_block.c();
			t2 = space();
			div2 = element("div");
			if (name_slot_or_fallback) name_slot_or_fallback.c();
			t3 = space();
			create_component(content0.$$.fragment);
			t4 = space();
			create_component(content1.$$.fragment);
			t5 = space();
			create_component(content2.$$.fragment);
			t6 = space();
			blockquote = element("blockquote");
			p = element("p");
			if (default_slot_or_fallback) default_slot_or_fallback.c();
			t7 = space();
			footer = element("footer");
			footer.textContent = "Powered by PeerPiper";
			attr(div0, "class", "h-24 bg-white svelte-1gq7yus-ContactCard");
			set_style(input, "display", "none");
			attr(input, "type", "file");
			attr(input, "accept", ".jpg, .jpeg, .png");
			attr(input, "class", "svelte-1gq7yus-ContactCard");
			attr(div1, "class", "-mt-20 h-32 flex justify-center svelte-1gq7yus-ContactCard");
			attr(div2, "class", "mt-5 mb-7 px-3 text-center text-xl svelte-1gq7yus-ContactCard");
			attr(p, "class", "mx-2 mb-7 text-center text-base svelte-1gq7yus-ContactCard");
			attr(blockquote, "class", "svelte-1gq7yus-ContactCard");
			attr(footer, "class", "text-center bg-green-400 text-white svelte-1gq7yus-ContactCard");
			attr(div3, "class", "m-auto fill-slate-500 my-2 w-96 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-xl svelte-1gq7yus-ContactCard");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			mount_component(contextmenu, div0, null);
			append(div3, t0);
			append(div3, input);
			/*input_binding*/ ctx[6](input);
			append(div3, t1);
			append(div3, div1);
			if_block.m(div1, null);
			append(div3, t2);
			append(div3, div2);

			if (name_slot_or_fallback) {
				name_slot_or_fallback.m(div2, null);
			}

			append(div3, t3);
			mount_component(content0, div3, null);
			append(div3, t4);
			mount_component(content1, div3, null);
			append(div3, t5);
			mount_component(content2, div3, null);
			append(div3, t6);
			append(div3, blockquote);
			append(blockquote, p);

			if (default_slot_or_fallback) {
				default_slot_or_fallback.m(p, null);
			}

			append(div3, t7);
			append(div3, footer);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "change", /*change_handler_1*/ ctx[5]),
					listen(div1, "click", /*click_handler*/ ctx[7])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div1, null);
				}
			}

			if (name_slot) {
				if (name_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
					update_slot_base(
						name_slot,
						name_slot_template,
						ctx,
						/*$$scope*/ ctx[14],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
						: get_slot_changes(name_slot_template, /*$$scope*/ ctx[14], dirty, get_name_slot_changes),
						get_name_slot_context
					);
				}
			} else {
				if (name_slot_or_fallback && name_slot_or_fallback.p && (!current || dirty & /*profile*/ 1)) {
					name_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}

			const content0_changes = {};

			if (dirty & /*$$scope, profile*/ 16385) {
				content0_changes.$$scope = { dirty, ctx };
			}

			content0.$set(content0_changes);
			const content1_changes = {};

			if (dirty & /*$$scope, profile*/ 16385) {
				content1_changes.$$scope = { dirty, ctx };
			}

			content1.$set(content1_changes);
			const content2_changes = {};

			if (dirty & /*$$scope, profile*/ 16385) {
				content2_changes.$$scope = { dirty, ctx };
			}

			content2.$set(content2_changes);

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 16384)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[14],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[14])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[14], dirty, null),
						null
					);
				}
			} else {
				if (default_slot_or_fallback && default_slot_or_fallback.p && (!current || dirty & /*profile*/ 1)) {
					default_slot_or_fallback.p(ctx, !current ? -1 : dirty);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(contextmenu.$$.fragment, local);
			transition_in(name_slot_or_fallback, local);
			transition_in(content0.$$.fragment, local);
			transition_in(content1.$$.fragment, local);
			transition_in(content2.$$.fragment, local);
			transition_in(default_slot_or_fallback, local);
			current = true;
		},
		o(local) {
			transition_out(contextmenu.$$.fragment, local);
			transition_out(name_slot_or_fallback, local);
			transition_out(content0.$$.fragment, local);
			transition_out(content1.$$.fragment, local);
			transition_out(content2.$$.fragment, local);
			transition_out(default_slot_or_fallback, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div3);
			destroy_component(contextmenu);
			/*input_binding*/ ctx[6](null);
			if_block.d();
			if (name_slot_or_fallback) name_slot_or_fallback.d(detaching);
			destroy_component(content0);
			destroy_component(content1);
			destroy_component(content2);
			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	const dispatch = createEventDispatcher();

	let defaultProfile = {
		firstName: 'FirstName',
		lastName: 'Lastname',
		address: 'Unknown address',
		email: 'Unknown email',
		phone: 'No phone',
		notes: 'No notes',
		avatar: null
	};

	let { profile = defaultProfile } = $$props;
	let fileinput;

	const onFileSelected = e => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);

		reader.onload = e => {
			$$invalidate(0, profile.avatar = e.target.result, profile);
		};
	};

	function change_handler(event) {
		bubble.call(this, $$self, event);
	}

	const change_handler_1 = e => onFileSelected(e);

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			fileinput = $$value;
			$$invalidate(1, fileinput);
		});
	}

	const click_handler = () => {
		fileinput.click();
	};

	function editable0_item_binding(value) {
		if ($$self.$$.not_equal(profile.firstName, value)) {
			profile.firstName = value;
			($$invalidate(0, profile), $$invalidate(16, defaultProfile));
		}
	}

	function editable1_item_binding(value) {
		if ($$self.$$.not_equal(profile.lastName, value)) {
			profile.lastName = value;
			($$invalidate(0, profile), $$invalidate(16, defaultProfile));
		}
	}

	function editable_item_binding(value) {
		if ($$self.$$.not_equal(profile.address, value)) {
			profile.address = value;
			($$invalidate(0, profile), $$invalidate(16, defaultProfile));
		}
	}

	function editable_item_binding_1(value) {
		if ($$self.$$.not_equal(profile.email, value)) {
			profile.email = value;
			($$invalidate(0, profile), $$invalidate(16, defaultProfile));
		}
	}

	function editable_item_binding_2(value) {
		if ($$self.$$.not_equal(profile.phone, value)) {
			profile.phone = value;
			($$invalidate(0, profile), $$invalidate(16, defaultProfile));
		}
	}

	function editable_item_binding_3(value) {
		if ($$self.$$.not_equal(profile.notes, value)) {
			profile.notes = value;
			($$invalidate(0, profile), $$invalidate(16, defaultProfile));
		}
	}

	$$self.$$set = $$props => {
		if ('profile' in $$props) $$invalidate(0, profile = $$props.profile);
		if ('$$scope' in $$props) $$invalidate(14, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*profile*/ 1) {
			// this fires when todos change; let's emit an event to update any listeners consuming this component
			if (profile) {
				$$invalidate(0, profile = Object.assign({}, defaultProfile, profile));
				dispatch('change', { profile });
			}
		}
	};

	return [
		profile,
		fileinput,
		onFileSelected,
		slots,
		change_handler,
		change_handler_1,
		input_binding,
		click_handler,
		editable0_item_binding,
		editable1_item_binding,
		editable_item_binding,
		editable_item_binding_1,
		editable_item_binding_2,
		editable_item_binding_3,
		$$scope
	];
}

class ContactCard extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { profile: 0 }, add_css);
	}

	get profile() {
		return this.$$.ctx[0];
	}

	set profile(profile) {
		this.$$set({ profile });
		flush();
	}
}

export { ContactCard as default };
