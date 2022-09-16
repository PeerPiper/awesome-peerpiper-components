/** @typedef {typeof __propDef.props}  ComponentMounterProps */
/** @typedef {typeof __propDef.events}  ComponentMounterEvents */
/** @typedef {typeof __propDef.slots}  ComponentMounterSlots */
export default class ComponentMounter extends SvelteComponentTyped<{
    esModule: any;
    props: any;
    css: any;
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ComponentMounterProps = typeof __propDef.props;
export type ComponentMounterEvents = typeof __propDef.events;
export type ComponentMounterSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        esModule: any;
        props: any;
        css: any;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
