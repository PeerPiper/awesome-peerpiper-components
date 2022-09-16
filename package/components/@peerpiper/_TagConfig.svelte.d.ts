/** @typedef {typeof __propDef.props}  TagConfigProps */
/** @typedef {typeof __propDef.events}  TagConfigEvents */
/** @typedef {typeof __propDef.slots}  TagConfigSlots */
export default class TagConfig extends SvelteComponentTyped<{
    myTagNodes: any;
    peerTagNodes: any;
    selfDecryptTagNode: any;
    decryptFromTagNode: any;
    myPublicKey: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        params: {
            Contacts: {
                esModule: any;
            };
            Profile: {
                esModule: any;
            };
        };
        peers: any;
    };
}> {
}
export type TagConfigProps = typeof __propDef.props;
export type TagConfigEvents = typeof __propDef.events;
export type TagConfigSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        myTagNodes: any;
        peerTagNodes: any;
        selfDecryptTagNode: any;
        decryptFromTagNode: any;
        myPublicKey: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            params: {
                Contacts: {
                    esModule: any;
                };
                Profile: {
                    esModule: any;
                };
            };
            peers: any;
        };
    };
};
export {};
