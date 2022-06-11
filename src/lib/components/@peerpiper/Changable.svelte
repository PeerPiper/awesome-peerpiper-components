<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// pass in the item you want to monitor changes on
	export let item;

	const makeChangable = (varObj) => ({
		key: Object.keys(varObj)[0],
		value: varObj[Object.keys(varObj)[0]]
	});

	let { key, value } = makeChangable(item);

	// dispatch the change event when the content is edited
	$: if (value) dispatch('change', { [key]: value });
</script>

<span contenteditable bind:textContent={value} />
