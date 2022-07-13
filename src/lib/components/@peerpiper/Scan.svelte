<script>
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import Modal from './Modal.svelte';

	export let pubkey;

	let Scanner;
	let scan;

	onMount(async () => {
		({ Scanner } = await import('@peerpiper/qrcode-scanner-svelte'));
	});

	function handleClick(e) {
		scan = Scanner;
	}

	function handleModalClose() {
		console.log('Got close modal');
		scan = false;
		// selected?.stopMediaStream();
	}
</script>

<div
	on:click={handleClick}
	class="text-slate-800 h-14 w-auto cursor-pointer font-bold rounded hover:scale-125 transition duration-150 ease-in-out"
>
	<Icon name={'scanQR'} />
</div>

{#if Scanner && scan}
	<Modal modal={scan} on:closeModal={handleModalClose}>
		<svelte:component
			this={scan}
			bind:result={pubkey}
			on:successfulScan={(data) => {
				console.log(`Scanned `, { data: data.detail });
				const parsed = JSON.parse(data.detail);
				pubkey = parsed.pubKeyHex;
				scan = false;
			}}
		/>
	</Modal>
{/if}

<style lang="postcss">
	/* svelte.config prepends app.css here */
</style>
