/** @typedef {typeof __propDef.props}  ContentProps */
/** @typedef {typeof __propDef.events}  ContentEvents */
/** @typedef {typeof __propDef.slots}  ContentSlots */
export default class Content extends SvelteComponentTyped<{
    name?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    first: {};
    default: {};
}> {
}
export type ContentProps = typeof __propDef.props;
export type ContentEvents = typeof __propDef.events;
export type ContentSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        name?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        first: {};
        default: {};
    };
};
export {};
