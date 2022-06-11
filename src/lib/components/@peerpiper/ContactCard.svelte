<!-- accessors necessary to pass default prop values up to parent by gateway  -->
<svelte:options accessors />

<script>
	import '$lib/app.css'; // tailwindcss comes from here

	// you can use either props or slots with this component
	export let name;
	export let address;
	export let email;
	export let notes;
</script>

<article
	class="m-4 w-96 border-solid border border-indigo-600/30 rounded-md shadow-lg shadow-indigo-300/30 p-[1em]"
>
	<h2 class="border-b border-indigo-600/40 pb-[.2em] mb-[1em] shadow-sm">
		<slot name="name">
			<span class:missing={!name}>{name || 'Unknown name'}</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class:missing={!address}>{address || 'Unknown address'}</span>
		</slot>
	</div>

	<div class="leading-tight pl-[1.5em] mb-[.5em]">
		<slot name="email">
			<span class:missing={!email}>{email || 'Unknown emails'}</span>
		</slot>
	</div>

	<div class="leading-tight pl-[1.5em] mb-[.5em]">
		<slot>
			<span class:missing={!notes}>{notes || 'No notes'}</span>
		</slot>
	</div>

	Powered by PeerPiper
</article>

<style>
	.missing {
		color: #999;
	}
</style>
