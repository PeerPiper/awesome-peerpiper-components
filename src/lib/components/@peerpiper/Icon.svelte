<!--
-----------------------------------------------
	svg icon
	- https://github.com/jacobmischka/svelte-feather-icon
	- https://feathericons.com/
-----------------------------------------------
-->
<script>
	import Icons from './Icons.svelte';
	export let name;
	export let size = '100%';
</script>

<svg width={size} height={size} class="icon ">
	<use xlink:href="#{name}" />
</svg>

<slot />

<Icons />

<style lang="postcss">
	/* svelte.config prepends app.css here */

	.icon {
		position: relative;
		overflow: hidden;
		vertical-align: middle;
		-o-object-fit: contain;
		object-fit: contain;
		-webkit-transform-origin: center center;
		transform-origin: center center;
		stroke: currentColor;
		stroke-width: 1;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: currentColor;
	}
</style>
