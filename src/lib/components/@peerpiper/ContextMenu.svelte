<script>
	// import { Spinner } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Content from './Content.svelte';

	const dispatch = createEventDispatcher();

	let open = false;
	let submitting;
	let targetPublicKey;

	function clickOutside(node, { enabled: initialEnabled, cb }) {
		const handleOutsideClick = ({ target }) => {
			if (!node.contains(target)) {
				cb();
			}
		};

		function update({ enabled }) {
			if (enabled) {
				window.addEventListener('click', handleOutsideClick);
			} else {
				window.removeEventListener('click', handleOutsideClick);
			}
		}

		update({ enabled: initialEnabled });
		return {
			update,
			destroy() {
				window.removeEventListener('click', handleOutsideClick);
			}
		};
	}
	function openMenu(e) {
		open = !open;
	}

	function handleInput(e) {
		if (e.code !== 'Enter') return;
		submitting = true;
		dispatch('change', { targetPublicKey });
	}
</script>

<div
	class="flex flex-col"
	use:clickOutside={{
		enabled: open,
		cb: () => {
			open = false;
			submitting = false;
		}
	}}
>
	<div class="flex flex-row justify-end">
		<div class="w-10 h-10" on:click={openMenu}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 752 752">
				<path
					d="M346.9 153.4c-6.2 0-12.1 5.2-13.7 10.2l-12.4 43.5a176 176 0 0 0-25.2 10.4l-39.5-21.9c-5.3-3-12.7-2-17 2.4l-41 41.1a14.6 14.6 0 0 0-2.4 16.9l22 39.6a171 171 0 0 0-10.4 25l-43.5 12.5c-6 1.7-10.4 7.6-10.4 13.8v58.3c0 6 4.5 12 10.4 13.6L207 431c2.9 8.7 6.5 17 10.5 25.1L195.7 496a14.7 14.7 0 0 0 2.4 16.9l41 41.1a14.6 14.6 0 0 0 17 2.4l39.5-22c8.1 4.2 16.5 7.7 25.2 10.6l12.4 43.3a14.6 14.6 0 0 0 13.7 10.4h58.3c6 0 12-4.5 13.6-10.4l12.4-43.3c8.7-2.9 17.1-6.4 25.2-10.5l39.5 21.9c5.3 3 12.7 2 17-2.4l41-41.1a14.6 14.6 0 0 0 2.4-17l-22-39.6c4.2-8 7.7-16.4 10.6-25.1l43.3-12.3a14.6 14.6 0 0 0 10.4-13.6V347c0-6.2-4.4-12.1-10.4-13.8l-43.5-12.4c-2.8-8.7-6.3-17-10.3-25l21.9-39.7a14.7 14.7 0 0 0-2.4-16.9l-41-41.1a14.6 14.6 0 0 0-17-2.4l-39.5 21.9c-8-4.1-16.5-7.5-25.2-10.4l-12.4-43.5a14.6 14.6 0 0 0-13.6-10.2zm10.6 28.4h37L406 222c1.3 4.7 5.2 8.7 10 10 11.9 3.2 23.2 8 33.8 14 4.2 2.4 9.7 2.5 14 .2l36.6-20.5 26 26-20.4 36.6a14.5 14.5 0 0 0 0 14c6.1 10.6 11 22 14.3 34a14 14 0 0 0 9.7 9.9l40.3 11.4v36.9L530 406a14.5 14.5 0 0 0-9.7 9.8 149 149 0 0 1-14.3 34 14.5 14.5 0 0 0 0 14l20.5 36.6-26 26-36.8-20.5a14.5 14.5 0 0 0-13.9.1c-10.6 6-22 11-33.9 14.2a14.5 14.5 0 0 0-9.9 9.8l-11.4 40.3h-37L346.2 530a14.5 14.5 0 0 0-9.9-9.8c-12-3.3-23.3-8.1-33.9-14.2a14.5 14.5 0 0 0-13.9-.1l-36.7 20.4-26-25.9 20.4-36.7c2.3-4.2 2.3-9.7 0-13.9-6-10.6-11-22-14.2-34a14.5 14.5 0 0 0-9.8-9.8l-40.3-11.5v-36.9l40.3-11.4c4.6-1.3 8.5-5.2 9.8-10a149 149 0 0 1 14.2-34c2.3-4.2 2.3-9.6 0-13.9l-20.5-36.5 26-26 36.8 20.4c4.2 2.3 9.7 2.2 14-.2a146 146 0 0 1 33.8-14 15 15 0 0 0 10-10zm18.5 90c-57.4 0-104.2 46.8-104.2 104.2S318.6 480.2 376 480.2c57.4 0 104.2-46.8 104.2-104.2S433.4 271.8 376 271.8zm0 28.4c42 0 75.8 33.8 75.8 75.8S418 451.8 376 451.8 300.2 418 300.2 376s33.8-75.8 75.8-75.8z"
				/>
			</svg>
		</div>
	</div>
	{#if open}
		<div
			transition:fly={{ delay: 250, duration: 300, x: 0, y: -100, opacity: 0.1, easing: quintOut }}
			class="flex flex-row justify-end z-50 bg-slate-50 border drop-shadow-lg p-4 mx-4 rounded-sm"
		>
			<div class="text-left border-slate-300">
				{#if !submitting}
					<span class="text-sm">Paste the <b>Public Key</b> you want to grant access</span>
					<Content>
						<svelte:fragment slot="first">
							<span class="text-sm mx-1 text-lg">Grant Acess:</span>
						</svelte:fragment>
						<input
							type="text"
							placeholder="Their Public Key"
							bind:value={targetPublicKey}
							on:keydown={handleInput}
						/>
					</Content>
					<Content>
						<svelte:fragment slot="first">
							<input type="checkbox" checked={true} />
							<span class="text-sm mx-1">Add <b>Contact</b></span>
						</svelte:fragment>
						<input type="text" placeholder="douganderson444" on:keydown={handleInput} />
					</Content>
				{:else}
					<!-- {Spinner} -->Requesting access...
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	/* svelte.config prepends app.css here */
</style>
