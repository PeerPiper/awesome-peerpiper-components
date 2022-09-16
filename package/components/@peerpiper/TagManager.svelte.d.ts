/** @typedef {typeof __propDef.props}  TagManagerProps */
/** @typedef {typeof __propDef.events}  TagManagerEvents */
/** @typedef {typeof __propDef.slots}  TagManagerSlots */
export default class TagManager extends SvelteComponentTyped<{
    params: any;
    peers: any;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type TagManagerProps = typeof __propDef.props;
export type TagManagerEvents = typeof __propDef.events;
export type TagManagerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        params: any;
        peers: any;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
