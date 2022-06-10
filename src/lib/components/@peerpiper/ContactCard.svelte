<script>
	// you can use either props or slots with this component
	export let name;
	export let address;
	export let email;
	export let notes;
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
	<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
</svelte:head>

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

	<div class="email">
		<slot name="email">
			<span class:missing={!email}>{email || 'Unknown emails'}</span>
		</slot>
	</div>

	<div class="email">
		<slot>
			<span class:missing={!notes}>{notes || 'No notes'}</span>
		</slot>
	</div>
</article>

<style>
	.address,
	.email {
		padding: 0 0 0 1.5em;
		background: 0 0 no-repeat;
		background-size: 20px 20px;
		margin: 0 0 0.5em 0;
		line-height: 1.2;
	}

	.address {
		background-image: url(/tutorial/icons/map-marker.svg);
	}
	.email {
		background-image: url(/tutorial/icons/email.svg);
	}
	.missing {
		color: #999;
	}
</style>
