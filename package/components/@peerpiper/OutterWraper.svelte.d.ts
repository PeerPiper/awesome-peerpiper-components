/** @typedef {typeof __propDef.props}  OutterWraperProps */
/** @typedef {typeof __propDef.events}  OutterWraperEvents */
/** @typedef {typeof __propDef.slots}  OutterWraperSlots */
export default class OutterWraper extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type OutterWraperProps = typeof __propDef.props;
export type OutterWraperEvents = typeof __propDef.events;
export type OutterWraperSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
