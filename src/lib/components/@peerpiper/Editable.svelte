<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// pass in the item you want to monitor changes on
	export let item;
	export let options = { singleLine: true };
	let inputEl;

	// by default, if Enter is pressed, the input is blurred
	const handleEnter = (e) => {
		if (e.keyCode === 13 && options.singleLine) {
			e.preventDefault();
			inputEl.blur();
		}
	};
</script>

<span
	bind:this={inputEl}
	contenteditable
	bind:textContent={item}
	on:keydown={handleEnter}
	class="align-middle"
/>
