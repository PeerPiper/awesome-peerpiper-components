<!-- accessors necessary to pass default prop values up to parent by gateway  -->
<svelte:options accessors />

<script>
	import Changable from './Changable.svelte';
	import Editable from './Editable.svelte';
	import Content from './_ContactCard/Content.svelte';
	// import '../../app.css';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// you can use either props or slots with this component
	export let profile = {
		firstName: 'FirstName',
		lastName: 'Lastname',
		address: 'Unknown address',
		email: 'Unknown email',
		phone: 'No phone',
		notes: 'No notes',
		avatar: null
	};

	// this fires when todos change; let's emit an event to update any listeners consuming this component
	$: if (profile) dispatch('change', { profile });

	let fileinput;

	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			profile.avatar = e.target.result;
		};
	};
</script>

<div
	class="m-auto fill-slate-500 my-28 w-96 max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-xl"
>
	<div class="h-24 bg-white" />
	<input
		style="display:none"
		type="file"
		accept=".jpg, .jpeg, .png"
		on:change={(e) => onFileSelected(e)}
		bind:this={fileinput}
	/>
	<div
		class="-mt-20 h-32 flex justify-center"
		on:click={() => {
			fileinput.click();
		}}
	>
		{#if !profile.avatar}
			<svg
				class=" rounded-full bg-white shadow-xl drop-shadow-xl"
				xmlns="http://www.w3.org/2000/svg"
				version="1.0"
				viewBox="0 0 256 256"
			>
				<path
					d="M105 2a129 129 0 0 0 1 253c11 1 33 2 44 0 26-5 48-16 67-35a126 126 0 0 0 38-114A129 129 0 0 0 150 2c-10-2-35-2-45 0zm31 30c23 4 41 24 45 51l3 9 2 6c0 4-1 6-5 14l-7 15c-3 8-11 19-16 24s-5 7-2 13c5 10 13 16 35 23l16 5-3 4a117 117 0 0 1-151 0l-4-4 4-1 17-6c19-6 27-13 31-25l2-5-4-4c-5-6-12-16-15-23l-7-11c-4-6-7-14-7-18 0-3 3-9 5-9l1-3 2-11c6-26 26-43 50-45l8 1z"
				/>
			</svg>
		{:else}
			<div class="relative z-10 overflow-hidden flex-none mx-auto w-32 h-32 drop-shadow-xl">
				<img
					class="rounded-full bg-white absolute max-w-none object-cover"
					src={profile.avatar}
					alt="d"
					style="width: 100%; height: 100%; transform-origin: 50% 50% 0px;"
				/>
			</div>
		{/if}
	</div>
	<div class="mt-5 mb-7 px-3 text-center text-xl">
		<slot name="name">
			<Editable bind:item={profile.firstName} />
			<Editable bind:item={profile.lastName} />
		</slot>
	</div>

	<!-- if there is no slot content, make the content changable  -->
	<!-- if there IS slot content, it overwrites the changable ability  -->

	<Content name={'address'}>
		<slot name="address">
			<Editable bind:item={profile.address} />
		</slot>
	</Content>

	<Content name={'email'}>
		<slot name="email">
			<Editable bind:item={profile.email} />
		</slot>
	</Content>

	<Content name={'phone'}>
		<slot name="phone">
			<Editable bind:item={profile.phone} />
		</slot>
	</Content>

	<blockquote>
		<p class="mx-2 mb-7 text-center text-base">
			<!-- unnamed slot for remainder of slots, if any  -->
			<slot>
				<span class="text-sky-500">
					<Editable bind:item={profile.notes} options={{ singleLine: false }} />
				</span>
			</slot>
		</p>
	</blockquote>

	<footer class="text-center bg-green-400 text-white">Powered by PeerPiper</footer>
</div>

<style lang="postcss">
	/* @import '../../app.css'; */
	/* Not need for npm run package ? */
	@tailwind base;
	@tailwind utilities;
	@tailwind components;
</style>
