<script>
	import { onMount } from 'svelte';
	let ContactCard;
	onMount(async () => {
		ContactCard = (
			await import(
				'https://cdn.jsdelivr.net/gh/PeerPiper/awesome-peerpiper-components@master/dist/@peerpiper/ContactCard.svelte.js'
			)
		).default;
		console.log({ ContactCard });
	});
</script>

{#if ContactCard}
	<svelte:component this={ContactCard} name="Mr. CDN Himself" address="678 Delivr St, USA" />
{:else}
	<p>Loading...</p>
{/if}
