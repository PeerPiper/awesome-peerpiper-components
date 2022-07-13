<script>
	import { createEventDispatcher } from 'svelte';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import Scan from './Scan.svelte';

	const dispatch = createEventDispatcher();

	let handle, pubkey;

	let defaultContact = {
		pubkey: 'GnHDprayyzahnWjDqvQ9AGWsmjojWymVNztGHNr4S7an',
		handle: 'douganderson444'
	};
	export let contacts = [defaultContact];

	// this fires when todos change; let's emit an event to update any listeners consuming this component
	$: if (contacts) {
		dispatch('change', { contacts });
		dispatch('loadContacts', contacts);
	}
</script>

<div class="m-4 w-auto">
	<div class="flex flex-row mx-4 bg-gray-50 rounded p-4 items-center text-center">
		<div class="flex-1">Scan their PeerPiper Key to add</div>
		<div class="flex-1"><Scan bind:pubkey /></div>
	</div>
	<div class="flex flex-row mx-4 bg-gray-50 rounded p-4 items-center">
		<div class="flex-1 font-sans bg-gray-100 ml-4 p-1 rounded-xl border-r-gray-400">
			<input type="text" class="w-full" bind:value={handle} placeholder="@handle / nickname" />
		</div>
		<div class="flex-1 font-mono  bg-gray-100 mr-4 p-1 rounded-xl">
			<input type="text" class="w-full" bind:value={pubkey} placeholder="their public key" />
		</div>
		<div>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-xl"
				on:click={() => {
					if (!handle || !pubkey) return;
					contacts = [{ handle, pubkey }, ...contacts];
				}}
			>
				Add
			</button>
		</div>
	</div>
	{#each contacts as contact (contact)}
		<div
			animate:flip={{ delay: 250, duration: 750, easing: quintOut }}
			class="flex flex-row mx-4 bg-gray-50 rounded p-4 "
		>
			<div class="flex-1 font-sans bg-gray-100 ml-4 p-4  border-r-gray-400">
				{contact.handle}
			</div>
			<div class="flex-1 font-mono  bg-gray-100 mr-4 p-4 break-all">{contact.pubkey}</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	/* svelte.config prepends app.css here */
</style>
