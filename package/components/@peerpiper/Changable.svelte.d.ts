/** @typedef {typeof __propDef.props}  ChangableProps */
/** @typedef {typeof __propDef.events}  ChangableEvents */
/** @typedef {typeof __propDef.slots}  ChangableSlots */
export default class Changable extends SvelteComponentTyped<{
    item: any;
    options?: {
        singleLine: boolean;
    };
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ChangableProps = typeof __propDef.props;
export type ChangableEvents = typeof __propDef.events;
export type ChangableSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        item: any;
        options?: {
            singleLine: boolean;
        };
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
