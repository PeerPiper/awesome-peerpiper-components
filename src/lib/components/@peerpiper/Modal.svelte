<script>
	import { createEventDispatcher } from 'svelte';
	export let modal;
	$: modal && console.log({ modal });

	const dispatch = createEventDispatcher();
	const handleClose = () => {
		modal = false;
		console.log('Closing', { modal });
		dispatch('closeModal', null);
	};
</script>

<!-- The Modal -->
<div class:modal class:hide={!modal}>
	<!-- Modal content -->
	<div class="modal-content">
		<span class="close" on:click={handleClose}>&times;</span>
		<div>
			<slot />
		</div>
	</div>
</div>

<!-- <svelte:window on:click={handleClose} /> -->
<style lang="postcss">
	/* svelte.config prepends app.css here */
	.hide {
		display: none;
	}
	/* The Modal (background) */
	.modal {
		display: block; /* Hidden by default */
		position: fixed; /* Stay in place */
		z-index: 99999; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
	}

	/* Modal Content/Box */
	.modal-content {
		background-color: #fefefe;
		margin: 15% auto; /* 15% from the top and centered */
		padding: 20px;
		border: 1px solid #888;
		width: 80%; /* Could be more or less, depending on screen size */
	}

	/* The Close Button */
	.close {
		color: #aaa;
		float: right;
		font-size: 3.5em;
		font-weight: bold;
		line-height: 0.5;
		padding: 0.25em;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
</style>
