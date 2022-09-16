/** @typedef {typeof __propDef.props}  TagMakerProps */
/** @typedef {typeof __propDef.events}  TagMakerEvents */
/** @typedef {typeof __propDef.slots}  TagMakerSlots */
export default class TagMaker extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type TagMakerProps = typeof __propDef.props;
export type TagMakerEvents = typeof __propDef.events;
export type TagMakerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
