<script>
	/**
	 * How to mount a Svelte built es module from the interwebs
	 */
	import { onMount } from 'svelte';

	onMount(async () => {
		// fetch ContactCard
		const fetched = await fetch(
			'https://cdn.jsdelivr.net/gh/PeerPiper/awesome-peerpiper-components@master/compiled/@peerpiper/ContactCard.svelte.js'
		);

		if (fetched.ok) {
			let esModule = await fetched.text();

			const blob = new Blob([esModule], { type: 'text/javascript' });
			let url = URL.createObjectURL(blob);

			import(/* @vite-ignore */ url).then(function ({ default: ContactCard }) {
				if (!ContactCard) return;

				document.getElementById('comp').innerHTML = '';
				let component = new ContactCard({
					target: document.getElementById('comp') || document.body,
					props: {
						name: 'DougAnderson444',
						address: 'Some Fake Street Address'
					}
				});

				// get the default values of component for each of the keys of component.$$.props
				// this way the parent component can deduce the schema of the data
				const initProps = component['$$'].props;
				let inits = {};

				Object.keys(initProps).map((k) => {
					inits[k] = component[k]; // load default initial props
				});

				// on change, Pass props message up to iframe parent so it can be saved/updated
				component.$on('change', (event) => {
					reply(event.detail);
				});

				URL.revokeObjectURL(url); // memory management
			});
		}
	});
</script>

<div id="comp" />
