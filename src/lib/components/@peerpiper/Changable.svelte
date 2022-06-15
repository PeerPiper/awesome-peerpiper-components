<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// pass in the item you want to monitor changes on
	export let item;
	export let options = { singleLine: true };
	let inputEl;

	const makeChangable = (varObj) => ({
		key: Object.keys(varObj)[0],
		value: varObj[Object.keys(varObj)[0]]
	});

	let { key, value } = makeChangable(item);
	console.log({ key, value });

	// dispatch the change event when the content is edited
	$: if (value) dispatch('change', { [key]: value });

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
	bind:textContent={value}
	on:keydown={handleEnter}
	class="align-middle"
/>
