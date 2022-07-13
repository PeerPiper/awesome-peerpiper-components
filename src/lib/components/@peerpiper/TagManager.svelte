<script>
	// takes components as props and adds them to the component canvas
	import { onMount, createEventDispatcher } from 'svelte';
	import OutterWraper from './OutterWraper.svelte';
	import ComponentWrapper from './Wrapper.svelte';
	import { canonicalize } from 'json-canonicalize';

	export let params;

	const dispatch = createEventDispatcher();

	let ComponentMounter;

	onMount(async () => {
		// not SSR compatible
		ComponentMounter = (await import('./ComponentMounter.svelte')).default;
	});

	// sends update for each individual tag as they change
	function update({ tag, value }) {
		params[tag] = Object.assign({}, params[tag], { ...value });
		// dispatch update for this tag
		dispatch('change', { tag, props: { ...params[tag] } });
	}
</script>

{#if ComponentMounter && params && Object.entries(params).length > 0}
	<OutterWraper>
		{#each [...Object.entries(params)] as [tag, { esModule, props = { } }]}
			<!-- on:change bubbles the prop changes up to the parent component  -->
			<ComponentWrapper>
				<svelte:component
					this={ComponentMounter}
					{esModule}
					{props}
					on:change={(e) => {
						// loading contacts?
						if (e.detail.contacts) dispatch('change', { contacts: e.detail.contacts });
						// cleanse and compare
						canonicalize(e.detail) != canonicalize(props) &&
							update({
								tag,
								value: {
									esModule,
									props: JSON.parse(canonicalize(e.detail))
								}
							});
					}}
				/>
			</ComponentWrapper>
		{/each}
	</OutterWraper>
{/if}

<style lang="postcss">
	/* svelte.config prepends app.css here */
</style>
