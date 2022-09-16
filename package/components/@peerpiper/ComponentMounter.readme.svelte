<script context="module">
	export const metadata = {"layout":"demo","title":"Manage Multiple Compiled Components","library":"Peerpiper","author":"@douganderson444","description":null};
	const { layout, title, library, author, description } = metadata;
</script>
<script>
	import Layout_MDSVEX_DEFAULT, * as Components from 'C:/Users/douga/Documents2/code/awesome-peerpiper-components/src/layouts/demo.svelte';
    // import TagManager from './TagManager.svelte';
    import { Peerpiper } from '@peerpiper/awesome-peerpiper-components';
	// let esModule =
	// 	'https://raw.githubusercontent.com/PeerPiper/awesome-peerpiper-components/master/compiled/%40peerpiper/ContactCard.svelte.js';

	import TagManager from '../../../../compiled/@peerpiper/TagManager.svelte.js?raw';
	import ContactCard from '../../../../compiled/@peerpiper/ContactCard.svelte.js?raw';
	import ContactList from '../../../../compiled/@peerpiper/ContactList.svelte.js?raw';


	export let params = [
		{esModule: ContactCard, props:{profile:{"firstName":"Doug","lastName":"Anders =)"}}},
		{esModule: ContactList, props:{contacts: [
			{ pubkey: 'GnHDprayyzahnWjDqvQ9AGWsmjojWymVNztGHNr4S7an', handle: 'douganderson444' },
			{ pubkey: 'Adr1aN', handle: 'aamath' },
			{ pubkey: 'DArkHHH', handle: 'darikj' },
			]}},
	] 

</script>
<Layout_MDSVEX_DEFAULT {...$$props} {...metadata}>

<h1>Want to mount multiple Tag components in the component gateway? Just use TagManager!</h1>
<h2>Notes</h2>
<p>If you want to be able to edit the property then pass the variable in as a prop.</p>
<p>If you want to use this component to display data only, then use read-only modeby using slotted Content instead of props.</p>
<p>When used with the Gateway, do not assign any action to <code>on:change</code></p>
<Peerpiper.ComponentMounter slot="example" esModule={TagManager} props={{params}} on:change={e=>console.log(e.detail)} >
</Peerpiper.ComponentMounter>
</Layout_MDSVEX_DEFAULT>