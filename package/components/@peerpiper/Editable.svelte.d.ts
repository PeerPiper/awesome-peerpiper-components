/** @typedef {typeof __propDef.props}  EditableProps */
/** @typedef {typeof __propDef.events}  EditableEvents */
/** @typedef {typeof __propDef.slots}  EditableSlots */
export default class Editable extends SvelteComponentTyped<{
    item: any;
    options?: {
        singleLine: boolean;
    };
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type EditableProps = typeof __propDef.props;
export type EditableEvents = typeof __propDef.events;
export type EditableSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        item: any;
        options?: {
            singleLine: boolean;
        };
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
