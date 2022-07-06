<script>
	/**
	 * Allows a user to do 2 things:
	 * 1. Load a new es module and associate it with a tag
	 * 2. Decrypt existing Tag Node data for initial display, by passing the data to the slot
	 */

	// TEMPORARY: until we load from ID, IPFS, Arweave, or URL
	// @ts-ignore
	import ContactCard from '../../../../compiled/@peerpiper/ContactCard.svelte.js?raw';
	// @ts-ignore
	import ContactList from '../../../../compiled/@peerpiper/ContactList.svelte.js?raw';

	export let tagNodes;
	export let decryptTagNode;

	let params;

	if (tagNodes) {
		// iterate through tagNodes for each tag, await decryptTagNode (tag) then set the params object key of tag to the result
		const promises = Object.keys(tagNodes).map(async (tag) => {
			if (tag === 'prev') return null;
			const decrypted = await decryptTagNode(tag);
			if (!decrypted.hasOwnProperty('esModule') || !decrypted.hasOwnProperty('props')) return null;

			return [
				[tag],
				{
					esModule: decrypted.esModule,
					props: decrypted.props
				}
			];
		});

		Promise.all(promises).then((result) => {
			console.log({ result }, Object.fromEntries(result.filter((r) => r)));

			// @ts-ignore
			params = Object.fromEntries(result.filter((r) => r));
		});
	} else {
		// default vals
		params = {
			Contacts: {
				esModule: ContactList
			},
			Profile: {
				esModule: ContactCard
			}
		};
	}

	let tagValue, esModuleValue;

	function handleNewTag(e) {
		params[tagValue] = {
			esModule: esModuleValue,
			props: {}
		};
	}
</script>

<!-- <div>
	<div class="p-4">
		<div class="flex justify-between">
			<div class="flex-1">
				<h1 class="text-2xl font-bold">Set Tag Value</h1>
			</div>
			<div class="flex-1">
				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					on:click={handleNewTag}
				>
					Save
				</button>
			</div>
		</div>
	</div>
	<div class="p-4">
		<div class="flex justify-between">
			<div class="flex-1">
				<h2 class="text-xl font-bold">Tag</h2>
			</div>
			<div class="flex-1">
				<input
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
					type="text"
					placeholder="Tag"
					bind:value={tagValue}
				/>
			</div>
		</div>
		<div class="flex justify-between">
			<div class="flex-1">
				<h2 class="text-xl font-bold">Module</h2>
			</div>
			<div class="flex-1">
				<input
					class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
					type="text"
					placeholder="Module"
					bind:value={esModuleValue}
				/>
			</div>
		</div>
	</div>
</div> -->

{#if params}
	<slot {params} />
{/if}
