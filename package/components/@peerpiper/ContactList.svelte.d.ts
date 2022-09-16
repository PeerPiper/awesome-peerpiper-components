/** @typedef {typeof __propDef.props}  ContactListProps */
/** @typedef {typeof __propDef.events}  ContactListEvents */
/** @typedef {typeof __propDef.slots}  ContactListSlots */
export default class ContactList extends SvelteComponentTyped<{
    contacts?: {
        pubkey: string;
        handle: string;
    }[];
}, {
    change: CustomEvent<any>;
    loadContacts: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type ContactListProps = typeof __propDef.props;
export type ContactListEvents = typeof __propDef.events;
export type ContactListSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        contacts?: {
            pubkey: string;
            handle: string;
        }[];
    };
    events: {
        change: CustomEvent<any>;
        loadContacts: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
