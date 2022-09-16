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
			transition:fly={{ delay: 0, duration: 400, x: 0, y: -100, opacity: 0.1, easing: quintOut }}
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

<style>.sr-only {

    position: absolute;

    width: 1px;

    height: 1px;

    padding: 0;

    margin: -1px;

    overflow: hidden;

    clip: rect(0, 0, 0, 0);

    white-space: nowrap;

    border-width: 0
}

.pointer-events-none {

    pointer-events: none
}

.visible {

    visibility: visible
}

.\!visible {

    visibility: visible !important
}

.invisible {

    visibility: hidden
}

.static {

    position: static
}

.fixed {

    position: fixed
}

.absolute {

    position: absolute
}

.relative {

    position: relative
}

.inset-0 {

    top: 0px;

    right: 0px;

    bottom: 0px;

    left: 0px
}

.inset-y-0 {

    top: 0px;

    bottom: 0px
}

.-left-8 {

    left: -2rem
}

.-top-8 {

    top: -2rem
}

.-left-1 {

    left: -0.25rem
}

.top-16 {

    top: 4rem
}

.-right-16 {

    right: -4rem
}

.bottom-5 {

    bottom: 1.25rem
}

.left-1\/2 {

    left: 50%
}

.top-0 {

    top: 0px
}

.left-0 {

    left: 0px
}

.right-0 {

    right: 0px
}

.top-8 {

    top: 2rem
}

.top-1 {

    top: 0.25rem
}

.-left-16 {

    left: -4rem
}

.top-14 {

    top: 3.5rem
}

.top-3 {

    top: 0.75rem
}

.right-2\.5 {

    right: 0.625rem
}

.bottom-2\.5 {

    bottom: 0.625rem
}

.right-2 {

    right: 0.5rem
}

.bottom-2 {

    bottom: 0.5rem
}

.-left-3 {

    left: -0.75rem
}

.-left-1\.5 {

    left: -0.375rem
}

.z-10 {

    z-index: 10
}

.z-50 {

    z-index: 50
}

.z-30 {

    z-index: 30
}

.z-0 {

    z-index: 0
}

.-z-10 {

    z-index: -10
}

.z-40 {

    z-index: 40
}

.z-20 {

    z-index: 20
}

.m-4 {

    margin: 1rem
}

.m-auto {

    margin: auto
}

.m-2 {

    margin: 0.5rem
}

.my-2 {

    margin-top: 0.5rem;

    margin-bottom: 0.5rem
}

.mx-auto {

    margin-left: auto;

    margin-right: auto
}

.mx-2 {

    margin-left: 0.5rem;

    margin-right: 0.5rem
}

.mx-4 {

    margin-left: 1rem;

    margin-right: 1rem
}

.mx-1 {

    margin-left: 0.25rem;

    margin-right: 0.25rem
}

.-mx-1\.5 {

    margin-left: -0.375rem;

    margin-right: -0.375rem
}

.-my-1\.5 {

    margin-top: -0.375rem;

    margin-bottom: -0.375rem
}

.-mx-1 {

    margin-left: -0.25rem;

    margin-right: -0.25rem
}

.-my-1 {

    margin-top: -0.25rem;

    margin-bottom: -0.25rem
}

.my-6 {

    margin-top: 1.5rem;

    margin-bottom: 1.5rem
}

.my-20 {

    margin-top: 5rem;

    margin-bottom: 5rem
}

.mt-4 {

    margin-top: 1rem
}

.mb-3 {

    margin-bottom: 0.75rem
}

.-mt-20 {

    margin-top: -5rem
}

.mt-5 {

    margin-top: 1.25rem
}

.mb-7 {

    margin-bottom: 1.75rem
}

.ml-4 {

    margin-left: 1rem
}

.mr-4 {

    margin-right: 1rem
}

.mr-2 {

    margin-right: 0.5rem
}

.mb-4 {

    margin-bottom: 1rem
}

.ml-auto {

    margin-left: auto
}

.mr-3 {

    margin-right: 0.75rem
}

.ml-1 {

    margin-left: 0.25rem
}

.mb-2 {

    margin-bottom: 0.5rem
}

.ml-2 {

    margin-left: 0.5rem
}

.-mr-1 {

    margin-right: -0.25rem
}

.mb-5 {

    margin-bottom: 1.25rem
}

.ml-3 {

    margin-left: 0.75rem
}

.mt-2\.5 {

    margin-top: 0.625rem
}

.mt-2 {

    margin-top: 0.5rem
}

.mb-1 {

    margin-bottom: 0.25rem
}

.mt-6 {

    margin-top: 1.5rem
}

.mb-6 {

    margin-bottom: 1.5rem
}

.mt-3 {

    margin-top: 0.75rem
}

.mt-1 {

    margin-top: 0.25rem
}

.ml-0 {

    margin-left: 0px
}

.-mb-px {

    margin-bottom: -1px
}

.mb-10 {

    margin-bottom: 2.5rem
}

.ml-6 {

    margin-left: 1.5rem
}

.mr-1 {

    margin-right: 0.25rem
}

.mt-1\.5 {

    margin-top: 0.375rem
}

.block {

    display: block
}

.\!block {

    display: block !important
}

.inline-block {

    display: inline-block
}

.inline {

    display: inline
}

.flex {

    display: flex
}

.inline-flex {

    display: inline-flex
}

.table {

    display: table
}

.flow-root {

    display: flow-root
}

.grid {

    display: grid
}

.contents {

    display: contents
}

.hidden {

    display: none
}

.\!hidden {

    display: none !important
}

.h-14 {

    height: 3.5rem
}

.h-24 {

    height: 6rem
}

.h-32 {

    height: 8rem
}

.h-8 {

    height: 2rem
}

.h-10 {

    height: 2.5rem
}

.h-5 {

    height: 1.25rem
}

.h-12 {

    height: 3rem
}

.h-4 {

    height: 1rem
}

.h-6 {

    height: 1.5rem
}

.h-96 {

    height: 24rem
}

.h-56 {

    height: 14rem
}

.h-3 {

    height: 0.75rem
}

.h-full {

    height: 100%
}

.h-1 {

    height: 0.25rem
}

.h-2 {

    height: 0.5rem
}

.h-7 {

    height: 1.75rem
}

.h-2\.5 {

    height: 0.625rem
}

.h-0\.5 {

    height: 0.125rem
}

.h-0 {

    height: 0px
}

.min-h-\[196px\] {

    min-height: 196px
}

.w-5\/6 {

    width: 83.333333%
}

.w-24 {

    width: 6rem
}

.w-96 {

    width: 24rem
}

.w-32 {

    width: 8rem
}

.w-auto {

    width: auto
}

.w-full {

    width: 100%
}

.w-8 {

    width: 2rem
}

.w-10 {

    width: 2.5rem
}

.w-5 {

    width: 1.25rem
}

.w-12 {

    width: 3rem
}

.w-4 {

    width: 1rem
}

.w-6 {

    width: 1.5rem
}

.w-44 {

    width: 11rem
}

.w-3 {

    width: 0.75rem
}

.w-11 {

    width: 2.75rem
}

.w-9 {

    width: 2.25rem
}

.w-14 {

    width: 3.5rem
}

.w-48 {

    width: 12rem
}

.w-2\/4 {

    width: 50%
}

.w-1 {

    width: 0.25rem
}

.w-64 {

    width: 16rem
}

.w-80 {

    width: 20rem
}

.w-fit {

    width: -webkit-fit-content;

    width: -moz-fit-content;

    width: fit-content
}

.w-2 {

    width: 0.5rem
}

.min-w-0 {

    min-width: 0px
}

.max-w-lg {

    max-width: 32rem
}

.max-w-none {

    max-width: none
}

.max-w-sm {

    max-width: 24rem
}

.max-w-md {

    max-width: 28rem
}

.max-w-7xl {

    max-width: 80rem
}

.max-w-4xl {

    max-width: 56rem
}

.max-w-2xl {

    max-width: 42rem
}

.max-w-xs {

    max-width: 20rem
}

.flex-none {

    flex: none
}

.flex-1 {

    flex: 1 1 0%
}

.flex-shrink-0 {

    flex-shrink: 0
}

.shrink-0 {

    flex-shrink: 0
}

.origin-\[0\] {

    transform-origin: 0
}

.-translate-x-1\/2 {

    --tw-translate-x: -50%;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.-translate-y-6 {

    --tw-translate-y: -1.5rem;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.rotate-45 {

    --tw-rotate: 45deg;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.scale-75 {

    --tw-scale-x: .75;

    --tw-scale-y: .75;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.transform {

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

@-webkit-keyframes spin {

    to {

        transform: rotate(360deg)
    }
}

@keyframes spin {

    to {

        transform: rotate(360deg)
    }
}

.animate-spin {

    -webkit-animation: spin 1s linear infinite;

            animation: spin 1s linear infinite
}

.cursor-pointer {

    cursor: pointer
}

.cursor-not-allowed {

    cursor: not-allowed
}

.list-none {

    list-style-type: none
}

.appearance-none {

    -webkit-appearance: none;

       -moz-appearance: none;

            appearance: none
}

.grid-cols-2 {

    grid-template-columns: repeat(2, minmax(0, 1fr))
}

.flex-row {

    flex-direction: row
}

.flex-col {

    flex-direction: column
}

.flex-wrap {

    flex-wrap: wrap
}

.items-start {

    align-items: flex-start
}

.items-center {

    align-items: center
}

.justify-end {

    justify-content: flex-end
}

.justify-center {

    justify-content: center
}

.justify-between {

    justify-content: space-between
}

.gap-2 {

    gap: 0.5rem
}

.gap-8 {

    gap: 2rem
}

.space-x-4 > :not([hidden]) ~ :not([hidden]) {

    --tw-space-x-reverse: 0;

    margin-right: calc(1rem * var(--tw-space-x-reverse));

    margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)))
}

.space-y-1 > :not([hidden]) ~ :not([hidden]) {

    --tw-space-y-reverse: 0;

    margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));

    margin-bottom: calc(0.25rem * var(--tw-space-y-reverse))
}

.space-x-1 > :not([hidden]) ~ :not([hidden]) {

    --tw-space-x-reverse: 0;

    margin-right: calc(0.25rem * var(--tw-space-x-reverse));

    margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)))
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {

    --tw-space-y-reverse: 0;

    margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));

    margin-bottom: calc(1rem * var(--tw-space-y-reverse))
}

.space-x-3 > :not([hidden]) ~ :not([hidden]) {

    --tw-space-x-reverse: 0;

    margin-right: calc(0.75rem * var(--tw-space-x-reverse));

    margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)))
}

.space-y-6 > :not([hidden]) ~ :not([hidden]) {

    --tw-space-y-reverse: 0;

    margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));

    margin-bottom: calc(1.5rem * var(--tw-space-y-reverse))
}

.space-x-6 > :not([hidden]) ~ :not([hidden]) {

    --tw-space-x-reverse: 0;

    margin-right: calc(1.5rem * var(--tw-space-x-reverse));

    margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)))
}

.space-x-2 > :not([hidden]) ~ :not([hidden]) {

    --tw-space-x-reverse: 0;

    margin-right: calc(0.5rem * var(--tw-space-x-reverse));

    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)))
}

.-space-x-px > :not([hidden]) ~ :not([hidden]) {

    --tw-space-x-reverse: 0;

    margin-right: calc(-1px * var(--tw-space-x-reverse));

    margin-left: calc(-1px * calc(1 - var(--tw-space-x-reverse)))
}

.space-y-2 > :not([hidden]) ~ :not([hidden]) {

    --tw-space-y-reverse: 0;

    margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));

    margin-bottom: calc(0.5rem * var(--tw-space-y-reverse))
}

.divide-y > :not([hidden]) ~ :not([hidden]) {

    --tw-divide-y-reverse: 0;

    border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));

    border-bottom-width: calc(1px * var(--tw-divide-y-reverse))
}

.divide-x > :not([hidden]) ~ :not([hidden]) {

    --tw-divide-x-reverse: 0;

    border-right-width: calc(1px * var(--tw-divide-x-reverse));

    border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)))
}

.divide-gray-100 > :not([hidden]) ~ :not([hidden]) {

    --tw-divide-opacity: 1;

    border-color: rgb(243 244 246 / var(--tw-divide-opacity))
}

.divide-gray-200 > :not([hidden]) ~ :not([hidden]) {

    --tw-divide-opacity: 1;

    border-color: rgb(229 231 235 / var(--tw-divide-opacity))
}

.self-center {

    align-self: center
}

.overflow-auto {

    overflow: auto
}

.overflow-hidden {

    overflow: hidden
}

.overflow-x-auto {

    overflow-x: auto
}

.overflow-y-auto {

    overflow-y: auto
}

.truncate {

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap
}

.whitespace-nowrap {

    white-space: nowrap
}

.break-all {

    word-break: break-all
}

.rounded {

    border-radius: 0.25rem
}

.rounded-xl {

    border-radius: 0.75rem
}

.rounded-lg {

    border-radius: 0.5rem
}

.rounded-2xl {

    border-radius: 1rem
}

.rounded-full {

    border-radius: 9999px
}

.rounded-sm {

    border-radius: 0.125rem
}

.rounded-md {

    border-radius: 0.375rem
}

.rounded-none {

    border-radius: 0px
}

.rounded-t-xl {

    border-top-left-radius: 0.75rem;

    border-top-right-radius: 0.75rem
}

.rounded-t-lg {

    border-top-left-radius: 0.5rem;

    border-top-right-radius: 0.5rem
}

.rounded-r-lg {

    border-top-right-radius: 0.5rem;

    border-bottom-right-radius: 0.5rem
}

.rounded-l-md {

    border-top-left-radius: 0.375rem;

    border-bottom-left-radius: 0.375rem
}

.rounded-b-lg {

    border-bottom-right-radius: 0.5rem;

    border-bottom-left-radius: 0.5rem
}

.rounded-t {

    border-top-left-radius: 0.25rem;

    border-top-right-radius: 0.25rem
}

.rounded-b {

    border-bottom-right-radius: 0.25rem;

    border-bottom-left-radius: 0.25rem
}

.rounded-l-lg {

    border-top-left-radius: 0.5rem;

    border-bottom-left-radius: 0.5rem
}

.rounded-l {

    border-top-left-radius: 0.25rem;

    border-bottom-left-radius: 0.25rem
}

.rounded-r {

    border-top-right-radius: 0.25rem;

    border-bottom-right-radius: 0.25rem
}

.border {

    border-width: 1px
}

.border-2 {

    border-width: 2px
}

.border-0 {

    border-width: 0px
}

.border-b {

    border-bottom-width: 1px
}

.border-t-0 {

    border-top-width: 0px
}

.border-t-4 {

    border-top-width: 4px
}

.border-t {

    border-top-width: 1px
}

.border-l {

    border-left-width: 1px
}

.border-b-2 {

    border-bottom-width: 2px
}

.border-r-0 {

    border-right-width: 0px
}

.border-black\/5 {

    border-color: rgb(0 0 0 / 0.05)
}

.border-slate-300 {

    --tw-border-opacity: 1;

    border-color: rgb(203 213 225 / var(--tw-border-opacity))
}

.border-gray-200 {

    --tw-border-opacity: 1;

    border-color: rgb(229 231 235 / var(--tw-border-opacity))
}

.border-gray-500 {

    --tw-border-opacity: 1;

    border-color: rgb(107 114 128 / var(--tw-border-opacity))
}

.border-red-500 {

    --tw-border-opacity: 1;

    border-color: rgb(240 82 82 / var(--tw-border-opacity))
}

.border-yellow-500 {

    --tw-border-opacity: 1;

    border-color: rgb(194 120 3 / var(--tw-border-opacity))
}

.border-green-500 {

    --tw-border-opacity: 1;

    border-color: rgb(14 159 110 / var(--tw-border-opacity))
}

.border-indigo-500 {

    --tw-border-opacity: 1;

    border-color: rgb(104 117 245 / var(--tw-border-opacity))
}

.border-purple-500 {

    --tw-border-opacity: 1;

    border-color: rgb(144 97 249 / var(--tw-border-opacity))
}

.border-pink-500 {

    --tw-border-opacity: 1;

    border-color: rgb(231 70 148 / var(--tw-border-opacity))
}

.border-blue-500 {

    --tw-border-opacity: 1;

    border-color: rgb(63 131 248 / var(--tw-border-opacity))
}

.border-gray-900 {

    --tw-border-opacity: 1;

    border-color: rgb(17 24 39 / var(--tw-border-opacity))
}

.border-blue-700 {

    --tw-border-opacity: 1;

    border-color: rgb(26 86 219 / var(--tw-border-opacity))
}

.border-gray-800 {

    --tw-border-opacity: 1;

    border-color: rgb(31 41 55 / var(--tw-border-opacity))
}

.border-gray-300 {

    --tw-border-opacity: 1;

    border-color: rgb(209 213 219 / var(--tw-border-opacity))
}

.border-green-700 {

    --tw-border-opacity: 1;

    border-color: rgb(4 108 78 / var(--tw-border-opacity))
}

.border-red-700 {

    --tw-border-opacity: 1;

    border-color: rgb(200 30 30 / var(--tw-border-opacity))
}

.border-yellow-400 {

    --tw-border-opacity: 1;

    border-color: rgb(227 160 8 / var(--tw-border-opacity))
}

.border-purple-700 {

    --tw-border-opacity: 1;

    border-color: rgb(108 43 217 / var(--tw-border-opacity))
}

.border-gray-100 {

    --tw-border-opacity: 1;

    border-color: rgb(243 244 246 / var(--tw-border-opacity))
}

.border-blue-200 {

    --tw-border-opacity: 1;

    border-color: rgb(195 221 253 / var(--tw-border-opacity))
}

.border-red-200 {

    --tw-border-opacity: 1;

    border-color: rgb(251 213 213 / var(--tw-border-opacity))
}

.border-yellow-200 {

    --tw-border-opacity: 1;

    border-color: rgb(252 233 106 / var(--tw-border-opacity))
}

.border-green-200 {

    --tw-border-opacity: 1;

    border-color: rgb(188 240 218 / var(--tw-border-opacity))
}

.border-indigo-200 {

    --tw-border-opacity: 1;

    border-color: rgb(205 219 254 / var(--tw-border-opacity))
}

.border-purple-200 {

    --tw-border-opacity: 1;

    border-color: rgb(220 215 254 / var(--tw-border-opacity))
}

.border-pink-200 {

    --tw-border-opacity: 1;

    border-color: rgb(250 209 232 / var(--tw-border-opacity))
}

.border-gray-700 {

    --tw-border-opacity: 1;

    border-color: rgb(55 65 81 / var(--tw-border-opacity))
}

.border-blue-600 {

    --tw-border-opacity: 1;

    border-color: rgb(28 100 242 / var(--tw-border-opacity))
}

.border-transparent {

    border-color: transparent
}

.border-white {

    --tw-border-opacity: 1;

    border-color: rgb(255 255 255 / var(--tw-border-opacity))
}

.border-r-gray-400 {

    --tw-border-opacity: 1;

    border-right-color: rgb(156 163 175 / var(--tw-border-opacity))
}

.bg-slate-50 {

    --tw-bg-opacity: 1;

    background-color: rgb(248 250 252 / var(--tw-bg-opacity))
}

.bg-green-300 {

    --tw-bg-opacity: 1;

    background-color: rgb(132 225 188 / var(--tw-bg-opacity))
}

.bg-slate-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(241 245 249 / var(--tw-bg-opacity))
}

.bg-white {

    --tw-bg-opacity: 1;

    background-color: rgb(255 255 255 / var(--tw-bg-opacity))
}

.bg-green-400 {

    --tw-bg-opacity: 1;

    background-color: rgb(49 196 141 / var(--tw-bg-opacity))
}

.bg-gray-50 {

    --tw-bg-opacity: 1;

    background-color: rgb(249 250 251 / var(--tw-bg-opacity))
}

.bg-gray-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(243 244 246 / var(--tw-bg-opacity))
}

.bg-blue-500 {

    --tw-bg-opacity: 1;

    background-color: rgb(63 131 248 / var(--tw-bg-opacity))
}

.bg-gray-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(229 231 235 / var(--tw-bg-opacity))
}

.bg-blue-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(195 221 253 / var(--tw-bg-opacity))
}

.bg-red-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(253 232 232 / var(--tw-bg-opacity))
}

.bg-yellow-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(253 246 178 / var(--tw-bg-opacity))
}

.bg-green-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(222 247 236 / var(--tw-bg-opacity))
}

.bg-indigo-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(229 237 255 / var(--tw-bg-opacity))
}

.bg-purple-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(237 235 254 / var(--tw-bg-opacity))
}

.bg-pink-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(252 232 243 / var(--tw-bg-opacity))
}

.bg-blue-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(225 239 254 / var(--tw-bg-opacity))
}

.bg-transparent {

    background-color: transparent
}

.bg-blue-400 {

    --tw-bg-opacity: 1;

    background-color: rgb(118 169 250 / var(--tw-bg-opacity))
}

.bg-blue-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(26 86 219 / var(--tw-bg-opacity))
}

.bg-gray-400 {

    --tw-bg-opacity: 1;

    background-color: rgb(156 163 175 / var(--tw-bg-opacity))
}

.bg-gray-800 {

    --tw-bg-opacity: 1;

    background-color: rgb(31 41 55 / var(--tw-bg-opacity))
}

.bg-green-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(4 108 78 / var(--tw-bg-opacity))
}

.bg-red-400 {

    --tw-bg-opacity: 1;

    background-color: rgb(249 128 128 / var(--tw-bg-opacity))
}

.bg-red-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(200 30 30 / var(--tw-bg-opacity))
}

.bg-yellow-400 {

    --tw-bg-opacity: 1;

    background-color: rgb(227 160 8 / var(--tw-bg-opacity))
}

.bg-purple-400 {

    --tw-bg-opacity: 1;

    background-color: rgb(172 148 250 / var(--tw-bg-opacity))
}

.bg-purple-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(108 43 217 / var(--tw-bg-opacity))
}

.bg-gray-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(55 65 81 / var(--tw-bg-opacity))
}

.bg-yellow-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(142 75 16 / var(--tw-bg-opacity))
}

.bg-indigo-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(81 69 205 / var(--tw-bg-opacity))
}

.bg-pink-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(191 18 93 / var(--tw-bg-opacity))
}

.bg-gray-300 {

    --tw-bg-opacity: 1;

    background-color: rgb(209 213 219 / var(--tw-bg-opacity))
}

.bg-white\/30 {

    background-color: rgb(255 255 255 / 0.3)
}

.bg-gray-900 {

    --tw-bg-opacity: 1;

    background-color: rgb(17 24 39 / var(--tw-bg-opacity))
}

.bg-blue-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(28 100 242 / var(--tw-bg-opacity))
}

.bg-gray-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(75 85 99 / var(--tw-bg-opacity))
}

.bg-red-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(224 36 36 / var(--tw-bg-opacity))
}

.bg-green-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(5 122 85 / var(--tw-bg-opacity))
}

.bg-purple-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(126 58 242 / var(--tw-bg-opacity))
}

.bg-indigo-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(88 80 236 / var(--tw-bg-opacity))
}

.bg-blue-50 {

    --tw-bg-opacity: 1;

    background-color: rgb(235 245 255 / var(--tw-bg-opacity))
}

.bg-orange-100 {

    --tw-bg-opacity: 1;

    background-color: rgb(254 236 220 / var(--tw-bg-opacity))
}

.bg-opacity-50 {

    --tw-bg-opacity: 0.5
}

.bg-gradient-to-r {

    background-image: linear-gradient(to right, var(--tw-gradient-stops))
}

.bg-gradient-to-br {

    background-image: linear-gradient(to bottom right, var(--tw-gradient-stops))
}

.from-neutral-700 {

    --tw-gradient-from: #404040;

    --tw-gradient-to: rgb(64 64 64 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-green-400 {

    --tw-gradient-from: #31C48D;

    --tw-gradient-to: rgb(49 196 141 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-cyan-400 {

    --tw-gradient-from: #22d3ee;

    --tw-gradient-to: rgb(34 211 238 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-teal-400 {

    --tw-gradient-from: #16BDCA;

    --tw-gradient-to: rgb(22 189 202 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-lime-200 {

    --tw-gradient-from: #d9f99d;

    --tw-gradient-to: rgb(217 249 157 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-red-400 {

    --tw-gradient-from: #F98080;

    --tw-gradient-to: rgb(249 128 128 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-pink-400 {

    --tw-gradient-from: #F17EB8;

    --tw-gradient-to: rgb(241 126 184 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-purple-500 {

    --tw-gradient-from: #9061F9;

    --tw-gradient-to: rgb(144 97 249 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-blue-500 {

    --tw-gradient-from: #3F83F8;

    --tw-gradient-to: rgb(63 131 248 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-cyan-500 {

    --tw-gradient-from: #06b6d4;

    --tw-gradient-to: rgb(6 182 212 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-pink-500 {

    --tw-gradient-from: #E74694;

    --tw-gradient-to: rgb(231 70 148 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-teal-200 {

    --tw-gradient-from: #AFECEF;

    --tw-gradient-to: rgb(175 236 239 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-red-200 {

    --tw-gradient-from: #FBD5D5;

    --tw-gradient-to: rgb(251 213 213 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-purple-600 {

    --tw-gradient-from: #7E3AF2;

    --tw-gradient-to: rgb(126 58 242 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.from-teal-300 {

    --tw-gradient-from: #7EDCE2;

    --tw-gradient-to: rgb(126 220 226 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

.via-green-500 {

    --tw-gradient-to: rgb(14 159 110 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #0E9F6E, var(--tw-gradient-to)
}

.via-cyan-500 {

    --tw-gradient-to: rgb(6 182 212 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #06b6d4, var(--tw-gradient-to)
}

.via-teal-500 {

    --tw-gradient-to: rgb(6 148 162 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #0694A2, var(--tw-gradient-to)
}

.via-lime-400 {

    --tw-gradient-to: rgb(163 230 53 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #a3e635, var(--tw-gradient-to)
}

.via-red-500 {

    --tw-gradient-to: rgb(240 82 82 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #F05252, var(--tw-gradient-to)
}

.via-pink-500 {

    --tw-gradient-to: rgb(231 70 148 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #E74694, var(--tw-gradient-to)
}

.via-purple-600 {

    --tw-gradient-to: rgb(126 58 242 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #7E3AF2, var(--tw-gradient-to)
}

.via-blue-600 {

    --tw-gradient-to: rgb(28 100 242 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #1C64F2, var(--tw-gradient-to)
}

.via-red-300 {

    --tw-gradient-to: rgb(248 180 180 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #F8B4B4, var(--tw-gradient-to)
}

.to-green-600 {

    --tw-gradient-to: #057A55
}

.to-cyan-600 {

    --tw-gradient-to: #0891b2
}

.to-teal-600 {

    --tw-gradient-to: #047481
}

.to-lime-500 {

    --tw-gradient-to: #84cc16
}

.to-red-600 {

    --tw-gradient-to: #E02424
}

.to-pink-600 {

    --tw-gradient-to: #D61F69
}

.to-purple-700 {

    --tw-gradient-to: #6C2BD9
}

.to-blue-700 {

    --tw-gradient-to: #1A56DB
}

.to-blue-500 {

    --tw-gradient-to: #3F83F8
}

.to-blue-600 {

    --tw-gradient-to: #1C64F2
}

.to-pink-500 {

    --tw-gradient-to: #E74694
}

.to-orange-400 {

    --tw-gradient-to: #FF8A4C
}

.to-lime-200 {

    --tw-gradient-to: #d9f99d
}

.to-yellow-200 {

    --tw-gradient-to: #FCE96A
}

.to-lime-300 {

    --tw-gradient-to: #bef264
}

.bg-contain {

    background-size: contain
}

.bg-no-repeat {

    background-repeat: no-repeat
}

.fill-slate-500 {

    fill: #64748b
}

.fill-blue-600 {

    fill: #1C64F2
}

.fill-gray-600 {

    fill: #4B5563
}

.fill-green-500 {

    fill: #0E9F6E
}

.fill-red-600 {

    fill: #E02424
}

.fill-yellow-400 {

    fill: #E3A008
}

.fill-pink-600 {

    fill: #D61F69
}

.fill-purple-600 {

    fill: #7E3AF2
}

.object-cover {

    -o-object-fit: cover;

       object-fit: cover
}

.p-4 {

    padding: 1rem
}

.p-2 {

    padding: 0.5rem
}

.p-8 {

    padding: 2rem
}

.p-1 {

    padding: 0.25rem
}

.p-5 {

    padding: 1.25rem
}

.p-1\.5 {

    padding: 0.375rem
}

.p-0\.5 {

    padding: 0.125rem
}

.p-0 {

    padding: 0px
}

.p-2\.5 {

    padding: 0.625rem
}

.p-6 {

    padding: 1.5rem
}

.p-3 {

    padding: 0.75rem
}

.px-3 {

    padding-left: 0.75rem;

    padding-right: 0.75rem
}

.py-2 {

    padding-top: 0.5rem;

    padding-bottom: 0.5rem
}

.px-4 {

    padding-left: 1rem;

    padding-right: 1rem
}

.py-5 {

    padding-top: 1.25rem;

    padding-bottom: 1.25rem
}

.px-2\.5 {

    padding-left: 0.625rem;

    padding-right: 0.625rem
}

.py-0\.5 {

    padding-top: 0.125rem;

    padding-bottom: 0.125rem
}

.px-2 {

    padding-left: 0.5rem;

    padding-right: 0.5rem
}

.py-0 {

    padding-top: 0px;

    padding-bottom: 0px
}

.py-3 {

    padding-top: 0.75rem;

    padding-bottom: 0.75rem
}

.px-5 {

    padding-left: 1.25rem;

    padding-right: 1.25rem
}

.py-2\.5 {

    padding-top: 0.625rem;

    padding-bottom: 0.625rem
}

.px-6 {

    padding-left: 1.5rem;

    padding-right: 1.5rem
}

.py-1 {

    padding-top: 0.25rem;

    padding-bottom: 0.25rem
}

.py-8 {

    padding-top: 2rem;

    padding-bottom: 2rem
}

.py-6 {

    padding-top: 1.5rem;

    padding-bottom: 1.5rem
}

.px-0 {

    padding-left: 0px;

    padding-right: 0px
}

.py-1\.5 {

    padding-top: 0.375rem;

    padding-bottom: 0.375rem
}

.py-4 {

    padding-top: 1rem;

    padding-bottom: 1rem
}

.pb-5 {

    padding-bottom: 1.25rem
}

.pt-4 {

    padding-top: 1rem
}

.pb-10 {

    padding-bottom: 2.5rem
}

.pl-10 {

    padding-left: 2.5rem
}

.pl-3 {

    padding-left: 0.75rem
}

.pb-4 {

    padding-bottom: 1rem
}

.pr-4 {

    padding-right: 1rem
}

.pl-4 {

    padding-left: 1rem
}

.pl-2\.5 {

    padding-left: 0.625rem
}

.pl-2 {

    padding-left: 0.5rem
}

.pl-11 {

    padding-left: 2.75rem
}

.text-left {

    text-align: left
}

.text-center {

    text-align: center
}

.text-right {

    text-align: right
}

.align-middle {

    vertical-align: middle
}

.font-sans {

    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
}

.font-mono {

    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
}

.text-xl {

    font-size: 1.25rem;

    line-height: 1.75rem
}

.text-base {

    font-size: 1rem;

    line-height: 1.5rem
}

.text-sm {

    font-size: 0.875rem;

    line-height: 1.25rem
}

.text-lg {

    font-size: 1.125rem;

    line-height: 1.75rem
}

.text-2xl {

    font-size: 1.5rem;

    line-height: 2rem
}

.text-xs {

    font-size: 0.75rem;

    line-height: 1rem
}

.text-3xl {

    font-size: 1.875rem;

    line-height: 2.25rem
}

.text-4xl {

    font-size: 2.25rem;

    line-height: 2.5rem
}

.font-extrabold {

    font-weight: 800
}

.font-bold {

    font-weight: 700
}

.font-medium {

    font-weight: 500
}

.font-semibold {

    font-weight: 600
}

.font-normal {

    font-weight: 400
}

.font-light {

    font-weight: 300
}

.uppercase {

    text-transform: uppercase
}

.italic {

    font-style: italic
}

.leading-6 {

    line-height: 1.5rem
}

.leading-tight {

    line-height: 1.25
}

.leading-normal {

    line-height: 1.5
}

.leading-none {

    line-height: 1
}

.leading-relaxed {

    line-height: 1.625
}

.tracking-tight {

    letter-spacing: -0.025em
}

.text-sky-500 {

    --tw-text-opacity: 1;

    color: rgb(14 165 233 / var(--tw-text-opacity))
}

.text-white {

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

.text-slate-500 {

    --tw-text-opacity: 1;

    color: rgb(100 116 139 / var(--tw-text-opacity))
}

.text-slate-800 {

    --tw-text-opacity: 1;

    color: rgb(30 41 59 / var(--tw-text-opacity))
}

.text-gray-700 {

    --tw-text-opacity: 1;

    color: rgb(55 65 81 / var(--tw-text-opacity))
}

.text-gray-500 {

    --tw-text-opacity: 1;

    color: rgb(107 114 128 / var(--tw-text-opacity))
}

.text-blue-500 {

    --tw-text-opacity: 1;

    color: rgb(63 131 248 / var(--tw-text-opacity))
}

.text-blue-700 {

    --tw-text-opacity: 1;

    color: rgb(26 86 219 / var(--tw-text-opacity))
}

.text-red-700 {

    --tw-text-opacity: 1;

    color: rgb(200 30 30 / var(--tw-text-opacity))
}

.text-red-500 {

    --tw-text-opacity: 1;

    color: rgb(240 82 82 / var(--tw-text-opacity))
}

.text-yellow-700 {

    --tw-text-opacity: 1;

    color: rgb(142 75 16 / var(--tw-text-opacity))
}

.text-yellow-500 {

    --tw-text-opacity: 1;

    color: rgb(194 120 3 / var(--tw-text-opacity))
}

.text-green-700 {

    --tw-text-opacity: 1;

    color: rgb(4 108 78 / var(--tw-text-opacity))
}

.text-green-500 {

    --tw-text-opacity: 1;

    color: rgb(14 159 110 / var(--tw-text-opacity))
}

.text-indigo-700 {

    --tw-text-opacity: 1;

    color: rgb(81 69 205 / var(--tw-text-opacity))
}

.text-indigo-500 {

    --tw-text-opacity: 1;

    color: rgb(104 117 245 / var(--tw-text-opacity))
}

.text-purple-700 {

    --tw-text-opacity: 1;

    color: rgb(108 43 217 / var(--tw-text-opacity))
}

.text-purple-500 {

    --tw-text-opacity: 1;

    color: rgb(144 97 249 / var(--tw-text-opacity))
}

.text-pink-700 {

    --tw-text-opacity: 1;

    color: rgb(191 18 93 / var(--tw-text-opacity))
}

.text-pink-500 {

    --tw-text-opacity: 1;

    color: rgb(231 70 148 / var(--tw-text-opacity))
}

.text-gray-400 {

    --tw-text-opacity: 1;

    color: rgb(156 163 175 / var(--tw-text-opacity))
}

.text-gray-800 {

    --tw-text-opacity: 1;

    color: rgb(31 41 55 / var(--tw-text-opacity))
}

.text-red-800 {

    --tw-text-opacity: 1;

    color: rgb(155 28 28 / var(--tw-text-opacity))
}

.text-green-800 {

    --tw-text-opacity: 1;

    color: rgb(3 84 63 / var(--tw-text-opacity))
}

.text-yellow-800 {

    --tw-text-opacity: 1;

    color: rgb(114 59 19 / var(--tw-text-opacity))
}

.text-indigo-800 {

    --tw-text-opacity: 1;

    color: rgb(66 56 157 / var(--tw-text-opacity))
}

.text-purple-800 {

    --tw-text-opacity: 1;

    color: rgb(85 33 181 / var(--tw-text-opacity))
}

.text-pink-800 {

    --tw-text-opacity: 1;

    color: rgb(153 21 75 / var(--tw-text-opacity))
}

.text-blue-800 {

    --tw-text-opacity: 1;

    color: rgb(30 66 159 / var(--tw-text-opacity))
}

.text-gray-900 {

    --tw-text-opacity: 1;

    color: rgb(17 24 39 / var(--tw-text-opacity))
}

.text-yellow-400 {

    --tw-text-opacity: 1;

    color: rgb(227 160 8 / var(--tw-text-opacity))
}

.text-blue-900 {

    --tw-text-opacity: 1;

    color: rgb(35 56 118 / var(--tw-text-opacity))
}

.text-red-900 {

    --tw-text-opacity: 1;

    color: rgb(119 29 29 / var(--tw-text-opacity))
}

.text-yellow-900 {

    --tw-text-opacity: 1;

    color: rgb(99 49 18 / var(--tw-text-opacity))
}

.text-green-900 {

    --tw-text-opacity: 1;

    color: rgb(1 71 55 / var(--tw-text-opacity))
}

.text-indigo-900 {

    --tw-text-opacity: 1;

    color: rgb(54 47 120 / var(--tw-text-opacity))
}

.text-purple-900 {

    --tw-text-opacity: 1;

    color: rgb(74 29 150 / var(--tw-text-opacity))
}

.text-pink-900 {

    --tw-text-opacity: 1;

    color: rgb(117 26 61 / var(--tw-text-opacity))
}

.text-yellow-300 {

    --tw-text-opacity: 1;

    color: rgb(250 202 21 / var(--tw-text-opacity))
}

.text-blue-600 {

    --tw-text-opacity: 1;

    color: rgb(28 100 242 / var(--tw-text-opacity))
}

.text-gray-600 {

    --tw-text-opacity: 1;

    color: rgb(75 85 99 / var(--tw-text-opacity))
}

.text-red-600 {

    --tw-text-opacity: 1;

    color: rgb(224 36 36 / var(--tw-text-opacity))
}

.text-green-600 {

    --tw-text-opacity: 1;

    color: rgb(5 122 85 / var(--tw-text-opacity))
}

.text-purple-600 {

    --tw-text-opacity: 1;

    color: rgb(126 58 242 / var(--tw-text-opacity))
}

.text-teal-600 {

    --tw-text-opacity: 1;

    color: rgb(4 116 129 / var(--tw-text-opacity))
}

.text-orange-500 {

    --tw-text-opacity: 1;

    color: rgb(255 90 31 / var(--tw-text-opacity))
}

.text-blue-400 {

    --tw-text-opacity: 1;

    color: rgb(118 169 250 / var(--tw-text-opacity))
}

.text-red-400 {

    --tw-text-opacity: 1;

    color: rgb(249 128 128 / var(--tw-text-opacity))
}

.text-green-400 {

    --tw-text-opacity: 1;

    color: rgb(49 196 141 / var(--tw-text-opacity))
}

.text-indigo-400 {

    --tw-text-opacity: 1;

    color: rgb(141 162 251 / var(--tw-text-opacity))
}

.text-purple-400 {

    --tw-text-opacity: 1;

    color: rgb(172 148 250 / var(--tw-text-opacity))
}

.text-pink-400 {

    --tw-text-opacity: 1;

    color: rgb(241 126 184 / var(--tw-text-opacity))
}

.text-blue-100 {

    --tw-text-opacity: 1;

    color: rgb(225 239 254 / var(--tw-text-opacity))
}

.text-gray-300 {

    --tw-text-opacity: 1;

    color: rgb(209 213 219 / var(--tw-text-opacity))
}

.text-orange-800 {

    --tw-text-opacity: 1;

    color: rgb(138 44 13 / var(--tw-text-opacity))
}

.text-gray-200 {

    --tw-text-opacity: 1;

    color: rgb(229 231 235 / var(--tw-text-opacity))
}

.opacity-60 {

    opacity: 0.6
}

.opacity-40 {

    opacity: 0.4
}

.opacity-0 {

    opacity: 0
}

.shadow-xl {

    --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);

    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-lg {

    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-sm {

    --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-md {

    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow {

    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

.shadow-green-500\/50 {

    --tw-shadow-color: rgb(14 159 110 / 0.5);

    --tw-shadow: var(--tw-shadow-colored)
}

.shadow-cyan-500\/50 {

    --tw-shadow-color: rgb(6 182 212 / 0.5);

    --tw-shadow: var(--tw-shadow-colored)
}

.shadow-teal-500\/50 {

    --tw-shadow-color: rgb(6 148 162 / 0.5);

    --tw-shadow: var(--tw-shadow-colored)
}

.shadow-lime-500\/50 {

    --tw-shadow-color: rgb(132 204 22 / 0.5);

    --tw-shadow: var(--tw-shadow-colored)
}

.shadow-red-500\/50 {

    --tw-shadow-color: rgb(240 82 82 / 0.5);

    --tw-shadow: var(--tw-shadow-colored)
}

.shadow-pink-500\/50 {

    --tw-shadow-color: rgb(231 70 148 / 0.5);

    --tw-shadow: var(--tw-shadow-colored)
}

.shadow-purple-500\/50 {

    --tw-shadow-color: rgb(144 97 249 / 0.5);

    --tw-shadow: var(--tw-shadow-colored)
}

.shadow-blue-500\/50 {

    --tw-shadow-color: rgb(63 131 248 / 0.5);

    --tw-shadow: var(--tw-shadow-colored)
}

.outline {

    outline-style: solid
}

.ring-2 {

    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

.ring-8 {

    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(8px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

.ring-0 {

    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

.ring-gray-300 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity))
}

.ring-white {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity))
}

.blur {

    --tw-blur: blur(8px);

    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}

.drop-shadow-md {

    --tw-drop-shadow: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));

    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}

.drop-shadow-xl {

    --tw-drop-shadow: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));

    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}

.drop-shadow-lg {

    --tw-drop-shadow: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));

    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}

.filter {

    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}

.transition {

    transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-text-decoration-color, -webkit-backdrop-filter;

    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;

    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-text-decoration-color, -webkit-backdrop-filter;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

.transition-all {

    transition-property: all;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

.transition-opacity {

    transition-property: opacity;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

.duration-150 {

    transition-duration: 150ms
}

.duration-75 {

    transition-duration: 75ms
}

.duration-300 {

    transition-duration: 300ms
}

.ease-in-out {

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)
}

.ease-in {

    transition-timing-function: cubic-bezier(0.4, 0, 1, 1)
}

.\[mask-image\:linear-gradient\(0deg\2c \#fff\2c rgba\(255\2c 255\2c 255\2c 0\.6\)\)\] {

    -webkit-mask-image: linear-gradient(0deg,#fff,rgba(255,255,255,0.6));

            mask-image: linear-gradient(0deg,#fff,rgba(255,255,255,0.6))
}

	/* svelte.config prepends app.css here */

	.after\:absolute::after {

    content: var(--tw-content);

    position: absolute
}

	.after\:top-0\.5::after {

    content: var(--tw-content);

    top: 0.125rem
}

	.after\:left-\[2px\]::after {

    content: var(--tw-content);

    left: 2px
}

	.after\:top-0::after {

    content: var(--tw-content);

    top: 0px
}

	.after\:top-\[2px\]::after {

    content: var(--tw-content);

    top: 2px
}

	.after\:left-\[4px\]::after {

    content: var(--tw-content);

    left: 4px
}

	.after\:h-5::after {

    content: var(--tw-content);

    height: 1.25rem
}

	.after\:h-4::after {

    content: var(--tw-content);

    height: 1rem
}

	.after\:h-6::after {

    content: var(--tw-content);

    height: 1.5rem
}

	.after\:w-5::after {

    content: var(--tw-content);

    width: 1.25rem
}

	.after\:w-4::after {

    content: var(--tw-content);

    width: 1rem
}

	.after\:w-6::after {

    content: var(--tw-content);

    width: 1.5rem
}

	.after\:rounded-full::after {

    content: var(--tw-content);

    border-radius: 9999px
}

	.after\:border::after {

    content: var(--tw-content);

    border-width: 1px
}

	.after\:border-gray-300::after {

    content: var(--tw-content);

    --tw-border-opacity: 1;

    border-color: rgb(209 213 219 / var(--tw-border-opacity))
}

	.after\:bg-white::after {

    content: var(--tw-content);

    --tw-bg-opacity: 1;

    background-color: rgb(255 255 255 / var(--tw-bg-opacity))
}

	.after\:transition-all::after {

    content: var(--tw-content);

    transition-property: all;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

	.after\:content-\[\'\'\]::after {

    --tw-content: '';

    content: var(--tw-content)
}

	.first\:rounded-l-lg:first-child {

    border-top-left-radius: 0.5rem;

    border-bottom-left-radius: 0.5rem
}

	.last\:rounded-r-md:last-child {

    border-top-right-radius: 0.375rem;

    border-bottom-right-radius: 0.375rem
}

	.last\:border-r:last-child {

    border-right-width: 1px
}

	.odd\:bg-white:nth-child(odd) {

    --tw-bg-opacity: 1;

    background-color: rgb(255 255 255 / var(--tw-bg-opacity))
}

	.even\:bg-gray-50:nth-child(even) {

    --tw-bg-opacity: 1;

    background-color: rgb(249 250 251 / var(--tw-bg-opacity))
}

	.hover\:scale-125:hover {

    --tw-scale-x: 1.25;

    --tw-scale-y: 1.25;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

	.hover\:border-gray-300:hover {

    --tw-border-opacity: 1;

    border-color: rgb(209 213 219 / var(--tw-border-opacity))
}

	.hover\:bg-blue-700:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(26 86 219 / var(--tw-bg-opacity))
}

	.hover\:bg-gray-100:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(243 244 246 / var(--tw-bg-opacity))
}

	.hover\:bg-blue-100:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(225 239 254 / var(--tw-bg-opacity))
}

	.hover\:bg-gray-200:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(229 231 235 / var(--tw-bg-opacity))
}

	.hover\:bg-red-200:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(251 213 213 / var(--tw-bg-opacity))
}

	.hover\:bg-yellow-200:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(252 233 106 / var(--tw-bg-opacity))
}

	.hover\:bg-green-200:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(188 240 218 / var(--tw-bg-opacity))
}

	.hover\:bg-indigo-200:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(205 219 254 / var(--tw-bg-opacity))
}

	.hover\:bg-purple-200:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(220 215 254 / var(--tw-bg-opacity))
}

	.hover\:bg-pink-200:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(250 209 232 / var(--tw-bg-opacity))
}

	.hover\:bg-blue-200:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(195 221 253 / var(--tw-bg-opacity))
}

	.hover\:bg-gray-900:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(17 24 39 / var(--tw-bg-opacity))
}

	.hover\:bg-blue-800:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(30 66 159 / var(--tw-bg-opacity))
}

	.hover\:bg-green-800:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(3 84 63 / var(--tw-bg-opacity))
}

	.hover\:bg-red-800:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(155 28 28 / var(--tw-bg-opacity))
}

	.hover\:bg-yellow-500:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(194 120 3 / var(--tw-bg-opacity))
}

	.hover\:bg-purple-800:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(85 33 181 / var(--tw-bg-opacity))
}

	.hover\:bg-gray-800:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(31 41 55 / var(--tw-bg-opacity))
}

	.hover\:bg-yellow-800:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(114 59 19 / var(--tw-bg-opacity))
}

	.hover\:bg-indigo-800:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(66 56 157 / var(--tw-bg-opacity))
}

	.hover\:bg-pink-800:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(153 21 75 / var(--tw-bg-opacity))
}

	.hover\:bg-gray-300:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(209 213 219 / var(--tw-bg-opacity))
}

	.hover\:bg-red-100:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(253 232 232 / var(--tw-bg-opacity))
}

	.hover\:bg-yellow-100:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(253 246 178 / var(--tw-bg-opacity))
}

	.hover\:bg-green-100:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(222 247 236 / var(--tw-bg-opacity))
}

	.hover\:bg-indigo-100:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(229 237 255 / var(--tw-bg-opacity))
}

	.hover\:bg-purple-100:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(237 235 254 / var(--tw-bg-opacity))
}

	.hover\:bg-pink-100:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(252 232 243 / var(--tw-bg-opacity))
}

	.hover\:bg-gray-50:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(249 250 251 / var(--tw-bg-opacity))
}

	.hover\:bg-gradient-to-br:hover {

    background-image: linear-gradient(to bottom right, var(--tw-gradient-stops))
}

	.hover\:bg-gradient-to-l:hover {

    background-image: linear-gradient(to left, var(--tw-gradient-stops))
}

	.hover\:from-teal-200:hover {

    --tw-gradient-from: #AFECEF;

    --tw-gradient-to: rgb(175 236 239 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

	.hover\:text-gray-900:hover {

    --tw-text-opacity: 1;

    color: rgb(17 24 39 / var(--tw-text-opacity))
}

	.hover\:text-blue-700:hover {

    --tw-text-opacity: 1;

    color: rgb(26 86 219 / var(--tw-text-opacity))
}

	.hover\:text-white:hover {

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

	.hover\:text-gray-300:hover {

    --tw-text-opacity: 1;

    color: rgb(209 213 219 / var(--tw-text-opacity))
}

	.hover\:text-blue-900:hover {

    --tw-text-opacity: 1;

    color: rgb(35 56 118 / var(--tw-text-opacity))
}

	.hover\:text-red-900:hover {

    --tw-text-opacity: 1;

    color: rgb(119 29 29 / var(--tw-text-opacity))
}

	.hover\:text-yellow-900:hover {

    --tw-text-opacity: 1;

    color: rgb(99 49 18 / var(--tw-text-opacity))
}

	.hover\:text-green-900:hover {

    --tw-text-opacity: 1;

    color: rgb(1 71 55 / var(--tw-text-opacity))
}

	.hover\:text-indigo-900:hover {

    --tw-text-opacity: 1;

    color: rgb(54 47 120 / var(--tw-text-opacity))
}

	.hover\:text-purple-900:hover {

    --tw-text-opacity: 1;

    color: rgb(74 29 150 / var(--tw-text-opacity))
}

	.hover\:text-pink-900:hover {

    --tw-text-opacity: 1;

    color: rgb(117 26 61 / var(--tw-text-opacity))
}

	.hover\:text-gray-700:hover {

    --tw-text-opacity: 1;

    color: rgb(55 65 81 / var(--tw-text-opacity))
}

	.hover\:text-gray-600:hover {

    --tw-text-opacity: 1;

    color: rgb(75 85 99 / var(--tw-text-opacity))
}

	.hover\:underline:hover {

    -webkit-text-decoration-line: underline;

            text-decoration-line: underline
}

	.focus\:z-10:focus {

    z-index: 10
}

	.focus\:border-blue-500:focus {

    --tw-border-opacity: 1;

    border-color: rgb(63 131 248 / var(--tw-border-opacity))
}

	.focus\:border-transparent:focus {

    border-color: transparent
}

	.focus\:border-blue-600:focus {

    --tw-border-opacity: 1;

    border-color: rgb(28 100 242 / var(--tw-border-opacity))
}

	.focus\:bg-white:focus {

    --tw-bg-opacity: 1;

    background-color: rgb(255 255 255 / var(--tw-bg-opacity))
}

	.focus\:bg-gray-900:focus {

    --tw-bg-opacity: 1;

    background-color: rgb(17 24 39 / var(--tw-bg-opacity))
}

	.focus\:text-blue-700:focus {

    --tw-text-opacity: 1;

    color: rgb(26 86 219 / var(--tw-text-opacity))
}

	.focus\:text-white:focus {

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

	.focus\:outline-none:focus {

    outline: 2px solid transparent;

    outline-offset: 2px
}

	.focus\:ring-4:focus {

    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

	.focus\:ring-2:focus {

    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

	.focus\:ring-0:focus {

    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

	.focus\:ring-gray-200:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(229 231 235 / var(--tw-ring-opacity))
}

	.focus\:ring-blue-200:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(195 221 253 / var(--tw-ring-opacity))
}

	.focus\:ring-gray-400:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(156 163 175 / var(--tw-ring-opacity))
}

	.focus\:ring-red-400:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(249 128 128 / var(--tw-ring-opacity))
}

	.focus\:ring-yellow-400:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(227 160 8 / var(--tw-ring-opacity))
}

	.focus\:ring-green-400:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(49 196 141 / var(--tw-ring-opacity))
}

	.focus\:ring-indigo-400:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(141 162 251 / var(--tw-ring-opacity))
}

	.focus\:ring-purple-400:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(172 148 250 / var(--tw-ring-opacity))
}

	.focus\:ring-pink-400:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(241 126 184 / var(--tw-ring-opacity))
}

	.focus\:ring-blue-400:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(118 169 250 / var(--tw-ring-opacity))
}

	.focus\:ring-blue-700:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(26 86 219 / var(--tw-ring-opacity))
}

	.focus\:ring-gray-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(107 114 128 / var(--tw-ring-opacity))
}

	.focus\:ring-blue-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity))
}

	.focus\:ring-gray-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(209 213 219 / var(--tw-ring-opacity))
}

	.focus\:ring-green-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(132 225 188 / var(--tw-ring-opacity))
}

	.focus\:ring-red-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(248 180 180 / var(--tw-ring-opacity))
}

	.focus\:ring-yellow-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(250 202 21 / var(--tw-ring-opacity))
}

	.focus\:ring-purple-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(202 191 253 / var(--tw-ring-opacity))
}

	.focus\:ring-cyan-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(103 232 249 / var(--tw-ring-opacity))
}

	.focus\:ring-teal-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(126 220 226 / var(--tw-ring-opacity))
}

	.focus\:ring-lime-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(190 242 100 / var(--tw-ring-opacity))
}

	.focus\:ring-pink-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(248 180 217 / var(--tw-ring-opacity))
}

	.focus\:ring-cyan-200:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(165 243 252 / var(--tw-ring-opacity))
}

	.focus\:ring-green-200:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(188 240 218 / var(--tw-ring-opacity))
}

	.focus\:ring-purple-200:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(220 215 254 / var(--tw-ring-opacity))
}

	.focus\:ring-pink-200:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(250 209 232 / var(--tw-ring-opacity))
}

	.focus\:ring-lime-200:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(217 249 157 / var(--tw-ring-opacity))
}

	.focus\:ring-red-100:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(253 232 232 / var(--tw-ring-opacity))
}

	.focus\:ring-indigo-300:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(180 198 252 / var(--tw-ring-opacity))
}

	.focus\:ring-blue-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(63 131 248 / var(--tw-ring-opacity))
}

	.focus\:ring-red-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(240 82 82 / var(--tw-ring-opacity))
}

	.focus\:ring-green-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(14 159 110 / var(--tw-ring-opacity))
}

	.focus\:ring-purple-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(144 97 249 / var(--tw-ring-opacity))
}

	.focus\:ring-teal-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(6 148 162 / var(--tw-ring-opacity))
}

	.focus\:ring-yellow-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(194 120 3 / var(--tw-ring-opacity))
}

	.focus\:ring-orange-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(255 90 31 / var(--tw-ring-opacity))
}

	.group:hover .group-hover\:bg-white\/50 {

    background-color: rgb(255 255 255 / 0.5)
}

	.group:hover .group-hover\:bg-opacity-0 {

    --tw-bg-opacity: 0
}

	.group:hover .group-hover\:from-cyan-500 {

    --tw-gradient-from: #06b6d4;

    --tw-gradient-to: rgb(6 182 212 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

	.group:hover .group-hover\:from-green-400 {

    --tw-gradient-from: #31C48D;

    --tw-gradient-to: rgb(49 196 141 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

	.group:hover .group-hover\:from-purple-500 {

    --tw-gradient-from: #9061F9;

    --tw-gradient-to: rgb(144 97 249 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

	.group:hover .group-hover\:from-pink-500 {

    --tw-gradient-from: #E74694;

    --tw-gradient-to: rgb(231 70 148 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

	.group:hover .group-hover\:from-teal-300 {

    --tw-gradient-from: #7EDCE2;

    --tw-gradient-to: rgb(126 220 226 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

	.group:hover .group-hover\:from-red-200 {

    --tw-gradient-from: #FBD5D5;

    --tw-gradient-to: rgb(251 213 213 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

	.group:hover .group-hover\:from-purple-600 {

    --tw-gradient-from: #7E3AF2;

    --tw-gradient-to: rgb(126 58 242 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
}

	.group:hover .group-hover\:via-red-300 {

    --tw-gradient-to: rgb(248 180 180 / 0);

    --tw-gradient-stops: var(--tw-gradient-from), #F8B4B4, var(--tw-gradient-to)
}

	.group:hover .group-hover\:to-blue-500 {

    --tw-gradient-to: #3F83F8
}

	.group:hover .group-hover\:to-blue-600 {

    --tw-gradient-to: #1C64F2
}

	.group:hover .group-hover\:to-pink-500 {

    --tw-gradient-to: #E74694
}

	.group:hover .group-hover\:to-orange-400 {

    --tw-gradient-to: #FF8A4C
}

	.group:hover .group-hover\:to-lime-300 {

    --tw-gradient-to: #bef264
}

	.group:hover .group-hover\:to-yellow-200 {

    --tw-gradient-to: #FCE96A
}

	.group:hover .group-hover\:text-gray-500 {

    --tw-text-opacity: 1;

    color: rgb(107 114 128 / var(--tw-text-opacity))
}

	.group:focus .group-focus\:outline-none {

    outline: 2px solid transparent;

    outline-offset: 2px
}

	.group:focus .group-focus\:ring-4 {

    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

	.group:focus .group-focus\:ring-white {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(255 255 255 / var(--tw-ring-opacity))
}

	.peer:checked ~ .peer-checked\:bg-blue-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(28 100 242 / var(--tw-bg-opacity))
}

	.peer:checked ~ .peer-checked\:bg-red-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(224 36 36 / var(--tw-bg-opacity))
}

	.peer:checked ~ .peer-checked\:bg-green-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(5 122 85 / var(--tw-bg-opacity))
}

	.peer:checked ~ .peer-checked\:bg-purple-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(126 58 242 / var(--tw-bg-opacity))
}

	.peer:checked ~ .peer-checked\:bg-yellow-400 {

    --tw-bg-opacity: 1;

    background-color: rgb(227 160 8 / var(--tw-bg-opacity))
}

	.peer:checked ~ .peer-checked\:bg-teal-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(4 116 129 / var(--tw-bg-opacity))
}

	.peer:checked ~ .peer-checked\:bg-orange-500 {

    --tw-bg-opacity: 1;

    background-color: rgb(255 90 31 / var(--tw-bg-opacity))
}

	.peer:checked ~ .peer-checked\:after\:translate-x-full::after {

    content: var(--tw-content);

    --tw-translate-x: 100%;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

	.peer:checked ~ .peer-checked\:after\:border-white::after {

    content: var(--tw-content);

    --tw-border-opacity: 1;

    border-color: rgb(255 255 255 / var(--tw-border-opacity))
}

	.peer:-moz-placeholder-shown ~ .peer-placeholder-shown\:translate-y-0 {

    --tw-translate-y: 0px;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

	.peer:placeholder-shown ~ .peer-placeholder-shown\:translate-y-0 {

    --tw-translate-y: 0px;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

	.peer:-moz-placeholder-shown ~ .peer-placeholder-shown\:scale-100 {

    --tw-scale-x: 1;

    --tw-scale-y: 1;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

	.peer:placeholder-shown ~ .peer-placeholder-shown\:scale-100 {

    --tw-scale-x: 1;

    --tw-scale-y: 1;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

	.peer:focus ~ .peer-focus\:left-0 {

    left: 0px
}

	.peer:focus ~ .peer-focus\:-translate-y-6 {

    --tw-translate-y: -1.5rem;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

	.peer:focus ~ .peer-focus\:scale-75 {

    --tw-scale-x: .75;

    --tw-scale-y: .75;

    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

	.peer:focus ~ .peer-focus\:text-blue-600 {

    --tw-text-opacity: 1;

    color: rgb(28 100 242 / var(--tw-text-opacity))
}

	.peer:focus ~ .peer-focus\:outline-none {

    outline: 2px solid transparent;

    outline-offset: 2px
}

	.peer:focus ~ .peer-focus\:ring-4 {

    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);

    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
}

	.peer:focus ~ .peer-focus\:ring-blue-300 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(164 202 254 / var(--tw-ring-opacity))
}

	.peer:focus ~ .peer-focus\:ring-red-300 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(248 180 180 / var(--tw-ring-opacity))
}

	.peer:focus ~ .peer-focus\:ring-green-300 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(132 225 188 / var(--tw-ring-opacity))
}

	.peer:focus ~ .peer-focus\:ring-purple-300 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(202 191 253 / var(--tw-ring-opacity))
}

	.peer:focus ~ .peer-focus\:ring-yellow-300 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(250 202 21 / var(--tw-ring-opacity))
}

	.peer:focus ~ .peer-focus\:ring-teal-300 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(126 220 226 / var(--tw-ring-opacity))
}

	.peer:focus ~ .peer-focus\:ring-orange-300 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(253 186 140 / var(--tw-ring-opacity))
}

	.dark .dark\:divide-gray-700 > :not([hidden]) ~ :not([hidden]) {

    --tw-divide-opacity: 1;

    border-color: rgb(55 65 81 / var(--tw-divide-opacity))
}

	.dark .dark\:divide-gray-600 > :not([hidden]) ~ :not([hidden]) {

    --tw-divide-opacity: 1;

    border-color: rgb(75 85 99 / var(--tw-divide-opacity))
}

	.dark .dark\:border-none {

    border-style: none
}

	.dark .dark\:border-white\/5 {

    border-color: rgb(255 255 255 / 0.05)
}

	.dark .dark\:border-gray-700 {

    --tw-border-opacity: 1;

    border-color: rgb(55 65 81 / var(--tw-border-opacity))
}

	.dark .dark\:border-gray-600 {

    --tw-border-opacity: 1;

    border-color: rgb(75 85 99 / var(--tw-border-opacity))
}

	.dark .dark\:border-white {

    --tw-border-opacity: 1;

    border-color: rgb(255 255 255 / var(--tw-border-opacity))
}

	.dark .dark\:border-blue-500 {

    --tw-border-opacity: 1;

    border-color: rgb(63 131 248 / var(--tw-border-opacity))
}

	.dark .dark\:border-green-500 {

    --tw-border-opacity: 1;

    border-color: rgb(14 159 110 / var(--tw-border-opacity))
}

	.dark .dark\:border-red-500 {

    --tw-border-opacity: 1;

    border-color: rgb(240 82 82 / var(--tw-border-opacity))
}

	.dark .dark\:border-yellow-300 {

    --tw-border-opacity: 1;

    border-color: rgb(250 202 21 / var(--tw-border-opacity))
}

	.dark .dark\:border-purple-400 {

    --tw-border-opacity: 1;

    border-color: rgb(172 148 250 / var(--tw-border-opacity))
}

	.dark .dark\:border-gray-500 {

    --tw-border-opacity: 1;

    border-color: rgb(107 114 128 / var(--tw-border-opacity))
}

	.dark .dark\:border-blue-600 {

    --tw-border-opacity: 1;

    border-color: rgb(28 100 242 / var(--tw-border-opacity))
}

	.dark .dark\:border-red-600 {

    --tw-border-opacity: 1;

    border-color: rgb(224 36 36 / var(--tw-border-opacity))
}

	.dark .dark\:border-yellow-600 {

    --tw-border-opacity: 1;

    border-color: rgb(159 88 10 / var(--tw-border-opacity))
}

	.dark .dark\:border-yellow-500 {

    --tw-border-opacity: 1;

    border-color: rgb(194 120 3 / var(--tw-border-opacity))
}

	.dark .dark\:border-green-600 {

    --tw-border-opacity: 1;

    border-color: rgb(5 122 85 / var(--tw-border-opacity))
}

	.dark .dark\:border-indigo-600 {

    --tw-border-opacity: 1;

    border-color: rgb(88 80 236 / var(--tw-border-opacity))
}

	.dark .dark\:border-indigo-500 {

    --tw-border-opacity: 1;

    border-color: rgb(104 117 245 / var(--tw-border-opacity))
}

	.dark .dark\:border-purple-600 {

    --tw-border-opacity: 1;

    border-color: rgb(126 58 242 / var(--tw-border-opacity))
}

	.dark .dark\:border-purple-500 {

    --tw-border-opacity: 1;

    border-color: rgb(144 97 249 / var(--tw-border-opacity))
}

	.dark .dark\:border-pink-600 {

    --tw-border-opacity: 1;

    border-color: rgb(214 31 105 / var(--tw-border-opacity))
}

	.dark .dark\:border-pink-500 {

    --tw-border-opacity: 1;

    border-color: rgb(231 70 148 / var(--tw-border-opacity))
}

	.dark .dark\:border-gray-900 {

    --tw-border-opacity: 1;

    border-color: rgb(17 24 39 / var(--tw-border-opacity))
}

	.dark .dark\:bg-slate-800\/25 {

    background-color: rgb(30 41 59 / 0.25)
}

	.dark .dark\:bg-gray-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(229 231 235 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-red-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(251 213 213 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-yellow-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(252 233 106 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-green-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(188 240 218 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-indigo-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(205 219 254 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-purple-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(220 215 254 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-pink-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(250 209 232 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-blue-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(195 221 253 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-gray-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(75 85 99 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-gray-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(55 65 81 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-red-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(200 30 30 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-green-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(4 108 78 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-yellow-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(142 75 16 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-indigo-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(81 69 205 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-purple-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(108 43 217 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-pink-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(191 18 93 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-blue-700 {

    --tw-bg-opacity: 1;

    background-color: rgb(26 86 219 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-gray-800 {

    --tw-bg-opacity: 1;

    background-color: rgb(31 41 55 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-blue-500 {

    --tw-bg-opacity: 1;

    background-color: rgb(63 131 248 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-blue-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(28 100 242 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-gray-500 {

    --tw-bg-opacity: 1;

    background-color: rgb(107 114 128 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-green-500 {

    --tw-bg-opacity: 1;

    background-color: rgb(14 159 110 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-green-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(5 122 85 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-red-500 {

    --tw-bg-opacity: 1;

    background-color: rgb(240 82 82 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-red-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(224 36 36 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-yellow-500 {

    --tw-bg-opacity: 1;

    background-color: rgb(194 120 3 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-purple-500 {

    --tw-bg-opacity: 1;

    background-color: rgb(144 97 249 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-purple-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(126 58 242 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-gray-900 {

    --tw-bg-opacity: 1;

    background-color: rgb(17 24 39 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-yellow-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(159 88 10 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-indigo-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(88 80 236 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-pink-600 {

    --tw-bg-opacity: 1;

    background-color: rgb(214 31 105 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-gray-800\/30 {

    background-color: rgb(31 41 55 / 0.3)
}

	.dark .dark\:bg-gray-300 {

    --tw-bg-opacity: 1;

    background-color: rgb(209 213 219 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-indigo-500 {

    --tw-bg-opacity: 1;

    background-color: rgb(104 117 245 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-blue-900 {

    --tw-bg-opacity: 1;

    background-color: rgb(35 56 118 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-orange-200 {

    --tw-bg-opacity: 1;

    background-color: rgb(252 217 189 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-blue-800 {

    --tw-bg-opacity: 1;

    background-color: rgb(30 66 159 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-green-800 {

    --tw-bg-opacity: 1;

    background-color: rgb(3 84 63 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-red-800 {

    --tw-bg-opacity: 1;

    background-color: rgb(155 28 28 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-purple-800 {

    --tw-bg-opacity: 1;

    background-color: rgb(85 33 181 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-indigo-800 {

    --tw-bg-opacity: 1;

    background-color: rgb(66 56 157 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-yellow-800 {

    --tw-bg-opacity: 1;

    background-color: rgb(114 59 19 / var(--tw-bg-opacity))
}

	.dark .dark\:bg-opacity-80 {

    --tw-bg-opacity: 0.8
}

	.dark .dark\:text-gray-400 {

    --tw-text-opacity: 1;

    color: rgb(156 163 175 / var(--tw-text-opacity))
}

	.dark .dark\:text-gray-300 {

    --tw-text-opacity: 1;

    color: rgb(209 213 219 / var(--tw-text-opacity))
}

	.dark .dark\:text-gray-800 {

    --tw-text-opacity: 1;

    color: rgb(31 41 55 / var(--tw-text-opacity))
}

	.dark .dark\:text-gray-600 {

    --tw-text-opacity: 1;

    color: rgb(75 85 99 / var(--tw-text-opacity))
}

	.dark .dark\:text-red-800 {

    --tw-text-opacity: 1;

    color: rgb(155 28 28 / var(--tw-text-opacity))
}

	.dark .dark\:text-red-600 {

    --tw-text-opacity: 1;

    color: rgb(224 36 36 / var(--tw-text-opacity))
}

	.dark .dark\:text-yellow-800 {

    --tw-text-opacity: 1;

    color: rgb(114 59 19 / var(--tw-text-opacity))
}

	.dark .dark\:text-yellow-600 {

    --tw-text-opacity: 1;

    color: rgb(159 88 10 / var(--tw-text-opacity))
}

	.dark .dark\:text-green-800 {

    --tw-text-opacity: 1;

    color: rgb(3 84 63 / var(--tw-text-opacity))
}

	.dark .dark\:text-green-600 {

    --tw-text-opacity: 1;

    color: rgb(5 122 85 / var(--tw-text-opacity))
}

	.dark .dark\:text-indigo-800 {

    --tw-text-opacity: 1;

    color: rgb(66 56 157 / var(--tw-text-opacity))
}

	.dark .dark\:text-indigo-600 {

    --tw-text-opacity: 1;

    color: rgb(88 80 236 / var(--tw-text-opacity))
}

	.dark .dark\:text-purple-800 {

    --tw-text-opacity: 1;

    color: rgb(85 33 181 / var(--tw-text-opacity))
}

	.dark .dark\:text-purple-600 {

    --tw-text-opacity: 1;

    color: rgb(126 58 242 / var(--tw-text-opacity))
}

	.dark .dark\:text-pink-800 {

    --tw-text-opacity: 1;

    color: rgb(153 21 75 / var(--tw-text-opacity))
}

	.dark .dark\:text-pink-600 {

    --tw-text-opacity: 1;

    color: rgb(214 31 105 / var(--tw-text-opacity))
}

	.dark .dark\:text-blue-800 {

    --tw-text-opacity: 1;

    color: rgb(30 66 159 / var(--tw-text-opacity))
}

	.dark .dark\:text-blue-600 {

    --tw-text-opacity: 1;

    color: rgb(28 100 242 / var(--tw-text-opacity))
}

	.dark .dark\:text-white {

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

	.dark .dark\:text-red-900 {

    --tw-text-opacity: 1;

    color: rgb(119 29 29 / var(--tw-text-opacity))
}

	.dark .dark\:text-green-900 {

    --tw-text-opacity: 1;

    color: rgb(1 71 55 / var(--tw-text-opacity))
}

	.dark .dark\:text-yellow-900 {

    --tw-text-opacity: 1;

    color: rgb(99 49 18 / var(--tw-text-opacity))
}

	.dark .dark\:text-indigo-900 {

    --tw-text-opacity: 1;

    color: rgb(54 47 120 / var(--tw-text-opacity))
}

	.dark .dark\:text-purple-900 {

    --tw-text-opacity: 1;

    color: rgb(74 29 150 / var(--tw-text-opacity))
}

	.dark .dark\:text-pink-900 {

    --tw-text-opacity: 1;

    color: rgb(117 26 61 / var(--tw-text-opacity))
}

	.dark .dark\:text-red-300 {

    --tw-text-opacity: 1;

    color: rgb(248 180 180 / var(--tw-text-opacity))
}

	.dark .dark\:text-green-300 {

    --tw-text-opacity: 1;

    color: rgb(132 225 188 / var(--tw-text-opacity))
}

	.dark .dark\:text-yellow-300 {

    --tw-text-opacity: 1;

    color: rgb(250 202 21 / var(--tw-text-opacity))
}

	.dark .dark\:text-indigo-300 {

    --tw-text-opacity: 1;

    color: rgb(180 198 252 / var(--tw-text-opacity))
}

	.dark .dark\:text-purple-300 {

    --tw-text-opacity: 1;

    color: rgb(202 191 253 / var(--tw-text-opacity))
}

	.dark .dark\:text-pink-300 {

    --tw-text-opacity: 1;

    color: rgb(248 180 217 / var(--tw-text-opacity))
}

	.dark .dark\:text-blue-300 {

    --tw-text-opacity: 1;

    color: rgb(164 202 254 / var(--tw-text-opacity))
}

	.dark .dark\:text-blue-500 {

    --tw-text-opacity: 1;

    color: rgb(63 131 248 / var(--tw-text-opacity))
}

	.dark .dark\:text-green-500 {

    --tw-text-opacity: 1;

    color: rgb(14 159 110 / var(--tw-text-opacity))
}

	.dark .dark\:text-red-500 {

    --tw-text-opacity: 1;

    color: rgb(240 82 82 / var(--tw-text-opacity))
}

	.dark .dark\:text-purple-400 {

    --tw-text-opacity: 1;

    color: rgb(172 148 250 / var(--tw-text-opacity))
}

	.dark .dark\:text-gray-200 {

    --tw-text-opacity: 1;

    color: rgb(229 231 235 / var(--tw-text-opacity))
}

	.dark .dark\:text-gray-500 {

    --tw-text-opacity: 1;

    color: rgb(107 114 128 / var(--tw-text-opacity))
}

	.dark .dark\:text-blue-400 {

    --tw-text-opacity: 1;

    color: rgb(118 169 250 / var(--tw-text-opacity))
}

	.dark .dark\:text-red-400 {

    --tw-text-opacity: 1;

    color: rgb(249 128 128 / var(--tw-text-opacity))
}

	.dark .dark\:text-yellow-400 {

    --tw-text-opacity: 1;

    color: rgb(227 160 8 / var(--tw-text-opacity))
}

	.dark .dark\:text-green-400 {

    --tw-text-opacity: 1;

    color: rgb(49 196 141 / var(--tw-text-opacity))
}

	.dark .dark\:text-indigo-400 {

    --tw-text-opacity: 1;

    color: rgb(141 162 251 / var(--tw-text-opacity))
}

	.dark .dark\:text-pink-400 {

    --tw-text-opacity: 1;

    color: rgb(241 126 184 / var(--tw-text-opacity))
}

	.dark .dark\:text-yellow-200 {

    --tw-text-opacity: 1;

    color: rgb(252 233 106 / var(--tw-text-opacity))
}

	.dark .dark\:text-orange-900 {

    --tw-text-opacity: 1;

    color: rgb(119 29 29 / var(--tw-text-opacity))
}

	.dark .dark\:text-blue-200 {

    --tw-text-opacity: 1;

    color: rgb(195 221 253 / var(--tw-text-opacity))
}

	.dark .dark\:text-green-200 {

    --tw-text-opacity: 1;

    color: rgb(188 240 218 / var(--tw-text-opacity))
}

	.dark .dark\:text-red-200 {

    --tw-text-opacity: 1;

    color: rgb(251 213 213 / var(--tw-text-opacity))
}

	.dark .dark\:text-purple-200 {

    --tw-text-opacity: 1;

    color: rgb(220 215 254 / var(--tw-text-opacity))
}

	.dark .dark\:text-indigo-200 {

    --tw-text-opacity: 1;

    color: rgb(205 219 254 / var(--tw-text-opacity))
}

	.dark .dark\:placeholder-gray-400::-moz-placeholder {

    --tw-placeholder-opacity: 1;

    color: rgb(156 163 175 / var(--tw-placeholder-opacity))
}

	.dark .dark\:placeholder-gray-400::placeholder {

    --tw-placeholder-opacity: 1;

    color: rgb(156 163 175 / var(--tw-placeholder-opacity))
}

	.dark .dark\:shadow-lg {

    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);

    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
}

	.dark .dark\:shadow-green-800\/80 {

    --tw-shadow-color: rgb(3 84 63 / 0.8);

    --tw-shadow: var(--tw-shadow-colored)
}

	.dark .dark\:shadow-cyan-800\/80 {

    --tw-shadow-color: rgb(21 94 117 / 0.8);

    --tw-shadow: var(--tw-shadow-colored)
}

	.dark .dark\:shadow-teal-800\/80 {

    --tw-shadow-color: rgb(5 80 92 / 0.8);

    --tw-shadow: var(--tw-shadow-colored)
}

	.dark .dark\:shadow-lime-800\/80 {

    --tw-shadow-color: rgb(63 98 18 / 0.8);

    --tw-shadow: var(--tw-shadow-colored)
}

	.dark .dark\:shadow-red-800\/80 {

    --tw-shadow-color: rgb(155 28 28 / 0.8);

    --tw-shadow: var(--tw-shadow-colored)
}

	.dark .dark\:shadow-pink-800\/80 {

    --tw-shadow-color: rgb(153 21 75 / 0.8);

    --tw-shadow: var(--tw-shadow-colored)
}

	.dark .dark\:shadow-purple-800\/80 {

    --tw-shadow-color: rgb(85 33 181 / 0.8);

    --tw-shadow: var(--tw-shadow-colored)
}

	.dark .dark\:shadow-blue-800\/80 {

    --tw-shadow-color: rgb(30 66 159 / 0.8);

    --tw-shadow: var(--tw-shadow-colored)
}

	.dark .dark\:ring-gray-500 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(107 114 128 / var(--tw-ring-opacity))
}

	.dark .dark\:ring-gray-900 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(17 24 39 / var(--tw-ring-opacity))
}

	.dark .dark\:ring-offset-gray-800 {

    --tw-ring-offset-color: #1F2937
}

	.dark .dark\:\[mask-image\:linear-gradient\(0deg\2c rgba\(255\2c 255\2c 255\2c 0\.1\)\2c rgba\(255\2c 255\2c 255\2c 0\.5\)\)\] {

    -webkit-mask-image: linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5));

            mask-image: linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))
}

	.dark .odd\:dark\:bg-gray-800:nth-child(odd) {

    --tw-bg-opacity: 1;

    background-color: rgb(31 41 55 / var(--tw-bg-opacity))
}

	.dark .even\:dark\:bg-gray-700:nth-child(even) {

    --tw-bg-opacity: 1;

    background-color: rgb(55 65 81 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:border-gray-600:hover {

    --tw-border-opacity: 1;

    border-color: rgb(75 85 99 / var(--tw-border-opacity))
}

	.dark .dark\:hover\:border-gray-700:hover {

    --tw-border-opacity: 1;

    border-color: rgb(55 65 81 / var(--tw-border-opacity))
}

	.dark .dark\:hover\:bg-gray-800:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(31 41 55 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-gray-300:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(209 213 219 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-red-300:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(248 180 180 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-yellow-300:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(250 202 21 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-green-300:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(132 225 188 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-indigo-300:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(180 198 252 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-purple-300:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(202 191 253 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-pink-300:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(248 180 217 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-blue-300:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(164 202 254 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-gray-600:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(75 85 99 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-gray-700:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(55 65 81 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-blue-700:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(26 86 219 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-blue-600:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(28 100 242 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-green-700:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(4 108 78 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-green-600:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(5 122 85 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-red-700:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(200 30 30 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-red-600:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(224 36 36 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-yellow-400:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(227 160 8 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-purple-700:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(108 43 217 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-purple-500:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(144 97 249 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-yellow-700:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(142 75 16 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-indigo-700:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(81 69 205 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-pink-700:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(191 18 93 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-yellow-600:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(159 88 10 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-indigo-600:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(88 80 236 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-purple-600:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(126 58 242 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:bg-pink-600:hover {

    --tw-bg-opacity: 1;

    background-color: rgb(214 31 105 / var(--tw-bg-opacity))
}

	.dark .dark\:hover\:text-white:hover {

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

	.dark .dark\:hover\:text-gray-900:hover {

    --tw-text-opacity: 1;

    color: rgb(17 24 39 / var(--tw-text-opacity))
}

	.dark .dark\:hover\:text-gray-300:hover {

    --tw-text-opacity: 1;

    color: rgb(209 213 219 / var(--tw-text-opacity))
}

	.dark .dark\:focus\:border-blue-500:focus {

    --tw-border-opacity: 1;

    border-color: rgb(63 131 248 / var(--tw-border-opacity))
}

	.dark .dark\:focus\:bg-gray-700:focus {

    --tw-bg-opacity: 1;

    background-color: rgb(55 65 81 / var(--tw-bg-opacity))
}

	.dark .dark\:focus\:text-white:focus {

    --tw-text-opacity: 1;

    color: rgb(255 255 255 / var(--tw-text-opacity))
}

	.dark .dark\:focus\:ring-gray-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(31 41 55 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-blue-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(30 66 159 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-blue-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(63 131 248 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-gray-700:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(55 65 81 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-green-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(3 84 63 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-red-900:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(119 29 29 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-yellow-900:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(99 49 18 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-purple-900:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(74 29 150 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-cyan-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(21 94 117 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-teal-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(5 80 92 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-lime-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(63 98 18 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-red-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(155 28 28 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-pink-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(153 21 75 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-purple-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(85 33 181 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-teal-700:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(3 102 114 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-red-400:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(249 128 128 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-yellow-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(114 59 19 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-indigo-800:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(66 56 157 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-blue-600:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(28 100 242 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-red-600:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(224 36 36 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-green-600:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(5 122 85 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-purple-600:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(126 58 242 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-teal-600:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(4 116 129 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-yellow-600:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(159 88 10 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-orange-600:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(208 56 1 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-gray-500:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(107 114 128 / var(--tw-ring-opacity))
}

	.dark .dark\:focus\:ring-gray-600:focus {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(75 85 99 / var(--tw-ring-opacity))
}

	.dark .group:hover .dark\:group-hover\:bg-gray-800\/60 {

    background-color: rgb(31 41 55 / 0.6)
}

	.dark .group:hover .dark\:group-hover\:text-gray-300 {

    --tw-text-opacity: 1;

    color: rgb(209 213 219 / var(--tw-text-opacity))
}

	.dark .group:focus .dark\:group-focus\:ring-gray-800\/70 {

    --tw-ring-color: rgb(31 41 55 / 0.7)
}

	.peer:focus ~ .dark .peer-focus\:dark\:text-blue-500 {

    --tw-text-opacity: 1;

    color: rgb(63 131 248 / var(--tw-text-opacity))
}

	.dark .peer:focus ~ .dark\:peer-focus\:ring-blue-800 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(30 66 159 / var(--tw-ring-opacity))
}

	.dark .peer:focus ~ .dark\:peer-focus\:ring-red-800 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(155 28 28 / var(--tw-ring-opacity))
}

	.dark .peer:focus ~ .dark\:peer-focus\:ring-green-800 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(3 84 63 / var(--tw-ring-opacity))
}

	.dark .peer:focus ~ .dark\:peer-focus\:ring-purple-800 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(85 33 181 / var(--tw-ring-opacity))
}

	.dark .peer:focus ~ .dark\:peer-focus\:ring-yellow-800 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(114 59 19 / var(--tw-ring-opacity))
}

	.dark .peer:focus ~ .dark\:peer-focus\:ring-teal-800 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(5 80 92 / var(--tw-ring-opacity))
}

	.dark .peer:focus ~ .dark\:peer-focus\:ring-orange-800 {

    --tw-ring-opacity: 1;

    --tw-ring-color: rgb(138 44 13 / var(--tw-ring-opacity))
}

	@media (min-width: 640px) {

    .sm\:order-last {

        order: 9999
    }

    .sm\:mx-auto {

        margin-left: auto;

        margin-right: auto
    }

    .sm\:mb-0 {

        margin-bottom: 0px
    }

    .sm\:mt-0 {

        margin-top: 0px
    }

    .sm\:inline-block {

        display: inline-block
    }

    .sm\:flex {

        display: flex
    }

    .sm\:grid {

        display: grid
    }

    .sm\:hidden {

        display: none
    }

    .sm\:h-6 {

        height: 1.5rem
    }

    .sm\:h-64 {

        height: 16rem
    }

    .sm\:h-10 {

        height: 2.5rem
    }

    .sm\:h-7 {

        height: 1.75rem
    }

    .sm\:w-6 {

        width: 1.5rem
    }

    .sm\:w-10 {

        width: 2.5rem
    }

    .sm\:grid-cols-3 {

        grid-template-columns: repeat(3, minmax(0, 1fr))
    }

    .sm\:grid-cols-2 {

        grid-template-columns: repeat(2, minmax(0, 1fr))
    }

    .sm\:items-center {

        align-items: center
    }

    .sm\:justify-center {

        justify-content: center
    }

    .sm\:justify-between {

        justify-content: space-between
    }

    .sm\:gap-6 {

        gap: 1.5rem
    }

    .sm\:space-y-0 > :not([hidden]) ~ :not([hidden]) {

        --tw-space-y-reverse: 0;

        margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));

        margin-bottom: calc(0px * var(--tw-space-y-reverse))
    }

    .sm\:space-x-4 > :not([hidden]) ~ :not([hidden]) {

        --tw-space-x-reverse: 0;

        margin-right: calc(1rem * var(--tw-space-x-reverse));

        margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)))
    }

    .sm\:rounded-lg {

        border-radius: 0.5rem
    }

    .sm\:p-8 {

        padding: 2rem
    }

    .sm\:p-6 {

        padding: 1.5rem
    }

    .sm\:py-4 {

        padding-top: 1rem;

        padding-bottom: 1rem
    }

    .sm\:px-4 {

        padding-left: 1rem;

        padding-right: 1rem
    }

    .sm\:pb-6 {

        padding-bottom: 1.5rem
    }

    .sm\:pr-8 {

        padding-right: 2rem
    }

    .sm\:text-center {

        text-align: center
    }

    .sm\:text-lg {

        font-size: 1.125rem;

        line-height: 1.75rem
    }

    .sm\:text-xs {

        font-size: 0.75rem;

        line-height: 1rem
    }

    .sm\:text-sm {

        font-size: 0.875rem;

        line-height: 1.25rem
    }

    .sm\:ring-8 {

        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);

        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(8px + var(--tw-ring-offset-width)) var(--tw-ring-color);

        box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
    }
}

	@media (min-width: 768px) {

    .md\:order-1 {

        order: 1
    }

    .md\:ml-2 {

        margin-left: 0.5rem
    }

    .md\:mr-6 {

        margin-right: 1.5rem
    }

    .md\:mt-0 {

        margin-top: 0px
    }

    .md\:mb-0 {

        margin-bottom: 0px
    }

    .md\:block {

        display: block
    }

    .md\:flex {

        display: flex
    }

    .md\:hidden {

        display: none
    }

    .md\:h-auto {

        height: auto
    }

    .md\:w-48 {

        width: 12rem
    }

    .md\:w-auto {

        width: auto
    }

    .md\:max-w-xl {

        max-width: 36rem
    }

    .md\:grid-cols-4 {

        grid-template-columns: repeat(4, minmax(0, 1fr))
    }

    .md\:flex-row {

        flex-direction: row
    }

    .md\:items-center {

        align-items: center
    }

    .md\:justify-between {

        justify-content: space-between
    }

    .md\:space-x-3 > :not([hidden]) ~ :not([hidden]) {

        --tw-space-x-reverse: 0;

        margin-right: calc(0.75rem * var(--tw-space-x-reverse));

        margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)))
    }

    .md\:space-x-8 > :not([hidden]) ~ :not([hidden]) {

        --tw-space-x-reverse: 0;

        margin-right: calc(2rem * var(--tw-space-x-reverse));

        margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)))
    }

    .md\:rounded-none {

        border-radius: 0px
    }

    .md\:rounded-l-lg {

        border-top-left-radius: 0.5rem;

        border-bottom-left-radius: 0.5rem
    }

    .md\:border-0 {

        border-width: 0px
    }

    .md\:bg-transparent {

        background-color: transparent
    }

    .md\:p-6 {

        padding: 1.5rem
    }

    .md\:p-0 {

        padding: 0px
    }

    .md\:px-6 {

        padding-left: 1.5rem;

        padding-right: 1.5rem
    }

    .md\:py-8 {

        padding-top: 2rem;

        padding-bottom: 2rem
    }

    .md\:text-sm {

        font-size: 0.875rem;

        line-height: 1.25rem
    }

    .md\:font-medium {

        font-weight: 500
    }

    .md\:text-blue-700 {

        --tw-text-opacity: 1;

        color: rgb(26 86 219 / var(--tw-text-opacity))
    }

    .md\:hover\:bg-transparent:hover {

        background-color: transparent
    }

    .md\:hover\:text-blue-700:hover {

        --tw-text-opacity: 1;

        color: rgb(26 86 219 / var(--tw-text-opacity))
    }

    .dark .md\:dark\:hover\:bg-transparent:hover {

        background-color: transparent
    }

    .dark .md\:dark\:hover\:text-white:hover {

        --tw-text-opacity: 1;

        color: rgb(255 255 255 / var(--tw-text-opacity))
    }
}

	@media (min-width: 1024px) {

    .lg\:my-8 {

        margin-top: 2rem;

        margin-bottom: 2rem
    }

    .lg\:mt-6 {

        margin-top: 1.5rem
    }

    .lg\:p-8 {

        padding: 2rem
    }

    .lg\:px-8 {

        padding-left: 2rem;

        padding-right: 2rem
    }

    .lg\:text-2xl {

        font-size: 1.5rem;

        line-height: 2rem
    }
}

	@media (min-width: 1280px) {

    .xl\:h-80 {

        height: 20rem
    }

    .xl\:pb-8 {

        padding-bottom: 2rem
    }
}

	@media (min-width: 1536px) {

    .\32xl\:h-96 {

        height: 24rem
    }
}
</style>
