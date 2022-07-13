<script>
	import Icon from './Icon.svelte';
	export let name = null;
</script>

<div
	class="flex align-middle items-center text-center justify-center bg-contain bg-no-repeat m-2 biggie"
>
	<div class="align-middle w-8 h-8">
		<slot name="first">
			<div class="text-slate-500">
				<Icon {name} />
			</div>
		</slot>
	</div>
	<div class="align-middle">
		<slot />
	</div>
</div>

<style lang="postcss">
	/* svelte.config prepends app.css here */
</style>
