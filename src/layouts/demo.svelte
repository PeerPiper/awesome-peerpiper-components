<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<script>
	import '$lib/app.css';
	import '$lib/code.css'; // ayu-dark

	// These props get filled in from the page's front matter
	export let title;
	export let author;
	export let coverImageUrl;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:image" content={coverImageUrl} />
</svelte:head>

<article class="m-4 w-3/4">
	<h1>{title}</h1>
	<slot />
	Written by: {author}
</article>
