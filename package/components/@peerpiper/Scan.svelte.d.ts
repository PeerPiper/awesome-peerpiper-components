/** @typedef {typeof __propDef.props}  ScanProps */
/** @typedef {typeof __propDef.events}  ScanEvents */
/** @typedef {typeof __propDef.slots}  ScanSlots */
export default class Scan extends SvelteComponentTyped<{
    pubkey: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ScanProps = typeof __propDef.props;
export type ScanEvents = typeof __propDef.events;
export type ScanSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        pubkey: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
