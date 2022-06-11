<!-- accessors necessary to pass default prop values up to parent by gateway  -->
<svelte:options accessors />

<script>
	// you can use either props or slots with this component
	export let name;
	export let address;
	export let email;
	export let notes;
</script>

<article
	class="m-4 w-96 border-solid border border-indigo-600/30 rounded-md shadow-lg shadow-indigo-300/30 p-[1em]"
>
	<h2 class="border-b border-indigo-600 pb-[.2em] mb-[1em] shadow-sm">
		<slot name="name">
			<span class:text-zinc-400={!name}>{name || 'Unknown name'}</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class:text-zinc-400={!address}>{address || 'Unknown address'}</span>
		</slot>
	</div>

	<div class="leading-tight pl-[1.5em] mb-[.5em]">
		<slot name="email">
			<span class:text-zinc-400={!email}>{email || 'Unknown emails'}</span>
		</slot>
	</div>

	<div class="leading-tight pl-[1.5em] mb-[.5em]">
		<slot>
			<span class:text-zinc-400={!notes}>{notes || 'No notes'}</span>
		</slot>
	</div>

	Powered by PeerPiper
</article>

<style>
	@tailwind base;
	@tailwind utilities;
	/* @tailwind components; */
</style>
