<script>
	import Icon from './Icon.svelte';
	export let name;
</script>

<div class="flex align-middle text-center justify-center bg-contain bg-no-repeat m-2">
	<div class="align-middle">
		<div class="text-slate-500">
			<Icon {name} />
		</div>
	</div>
	<div class="align-middle">
		<slot />
	</div>
</div>
