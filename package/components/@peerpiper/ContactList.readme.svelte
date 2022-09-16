<script context="module">
	export const metadata = {"layout":"demo","title":"Contact List","library":"Peerpiper","author":"@douganderson444","description":null};
	const { layout, title, library, author, description } = metadata;
</script>
<script>
	import Layout_MDSVEX_DEFAULT, * as Components from 'C:/Users/douga/Documents2/code/awesome-peerpiper-components/src/layouts/demo.svelte';
    // import ContactCard from './ContactCard.svelte';
    import { Peerpiper } from '@peerpiper/awesome-peerpiper-components';

	export let contacts

</script>
<Layout_MDSVEX_DEFAULT {...$$props} {...metadata}>

<h1>Want to add Contacts? Just add them to ContactList!</h1>
<h2>Notes</h2>
<p>If you want to be able to edit the property then pass the variable in as a prop.</p>
<p>If you want to use this component to display data only, then use read-only modeby using slotted Content instead of props.</p>
<p>When used with the Gateway, do not assign any action to <code>on:change</code></p>
<Peerpiper.ContactList slot="example" {contacts} on:change={e=>console.log(e.detail)} >
</Peerpiper.ContactList>
</Layout_MDSVEX_DEFAULT>