/** @typedef {typeof __propDef.props}  ContactCardProps */
/** @typedef {typeof __propDef.events}  ContactCardEvents */
/** @typedef {typeof __propDef.slots}  ContactCardSlots */
export default class ContactCard extends SvelteComponentTyped<{
    profile?: {
        firstName: string;
        lastName: string;
        address: string;
        email: string;
        phone: string;
        notes: string;
        avatar: any;
    };
}, {
    change: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    name: {};
    address: {};
    email: {};
    phone: {};
    default: {};
}> {
    /**accessor*/
    set profile(arg: {
        firstName: string;
        lastName: string;
        address: string;
        email: string;
        phone: string;
        notes: string;
        avatar: any;
    });
    get profile(): {
        firstName: string;
        lastName: string;
        address: string;
        email: string;
        phone: string;
        notes: string;
        avatar: any;
    };
}
export type ContactCardProps = typeof __propDef.props;
export type ContactCardEvents = typeof __propDef.events;
export type ContactCardSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        profile?: {
            firstName: string;
            lastName: string;
            address: string;
            email: string;
            phone: string;
            notes: string;
            avatar: any;
        };
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        name: {};
        address: {};
        email: {};
        phone: {};
        default: {};
    };
};
export {};
