/** @typedef {typeof __propDef.props}  WrapperProps */
/** @typedef {typeof __propDef.events}  WrapperEvents */
/** @typedef {typeof __propDef.slots}  WrapperSlots */
export default class Wrapper extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type WrapperProps = typeof __propDef.props;
export type WrapperEvents = typeof __propDef.events;
export type WrapperSlots = typeof __propDef.slots;
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
