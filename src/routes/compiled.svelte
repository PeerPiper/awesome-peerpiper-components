<script>
	/**
	 * How to mount a Svelte built es module from the compiled folder
	 */
	import { onMount } from 'svelte';
	// import '../../compiled/@peerpiper/ContactCard.svelte.css';

	onMount(async () => {
		const ContactCard = (await import('../../compiled/@peerpiper/ContactCard.svelte.js')).default;

		if (ContactCard) {
			document.getElementById('comp').innerHTML = '';
			let component = new ContactCard({
				target: document.getElementById('comp') || document.body,
				props: {
					name: 'DougAnderson444',
					address: 'Some Fake Street Address',
					email: 'me@email.com'
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
		}
	});
</script>

<div id="comp" />
