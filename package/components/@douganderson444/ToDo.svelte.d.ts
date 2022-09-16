/** @typedef {typeof __propDef.props}  ToDoProps */
/** @typedef {typeof __propDef.events}  ToDoEvents */
/** @typedef {typeof __propDef.slots}  ToDoSlots */
export default class ToDo extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ToDoProps = typeof __propDef.props;
export type ToDoEvents = typeof __propDef.events;
export type ToDoSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
