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
	// import '$lib/app.css';
	import '../code.css'; // ayu-dark

	// These props get filled in from the page's front matter
	export let title;
	export let author;
	export let type = 'article';
	export let coverImageUrl;

	let contents; // contents passed by repl slot
</script>

<svelte:head>
	<!-- <title>{title}</title> -->
	<!-- open graph (og) SEO  -->
	<meta property="og:title" content={title} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={coverImageUrl} />
	<meta property="article:author" content={author} />
</svelte:head>

<article class="m-4 w-5/6 rounded p-4 bg-slate-50 drop-shadow-md shadow-xl">
	<h1 class="font-extrabold from-neutral-700 text-xl">{title}</h1>
	<slot />

	<div class="mt-4 mb-3 p-2">
		<div class="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
			<div
				class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
				style="background-position: 10px 10px;"
			/>
			<div class="relative rounded-xl overflow-auto p-8 ">
				<div class="leading-6">
					<div
						class="flex flex-col items-center justify-center relative rounded-lg bg-stripes-green min-h-[196px]"
					>
						<div
							class="p-4 w-24 h-14 absolute -left-8 -top-8 flex items-center justify-center bg-green-300 shadow-lg rounded-lg"
						>
							Example
						</div>
						<slot name="example" />
					</div>
				</div>
			</div>
			<div
				class="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"
			/>
		</div>
	</div>

	Written by: {author}
</article>

<div style="display: none;">
	<span bind:this={contents}><slot name="repl" /></span>
</div>

<style>
	.bg-stripes-green {
		background-color: #dbbff81a;
		background-image: linear-gradient(
			135deg,
			#b2f1b280 10%,
			transparent 0,
			transparent 50%,
			#aaf5a380 0,
			#a0ec9e80 60%,
			transparent 0,
			transparent
		);
		background-size: 7.07px 7.07px;
	}
</style>
