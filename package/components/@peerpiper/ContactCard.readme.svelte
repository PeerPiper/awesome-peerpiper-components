<script context="module">
	export const metadata = {"layout":"demo","title":"Self updating Contact Card","library":"Peerpiper","author":"@douganderson444","description":null};
	const { layout, title, library, author, description } = metadata;
</script>
<script>
	import Layout_MDSVEX_DEFAULT, * as Components from 'C:/Users/douga/Documents2/code/awesome-peerpiper-components/src/layouts/demo.svelte';
    // import ContactCard from './ContactCard.svelte';
    import { Peerpiper } from '@peerpiper/awesome-peerpiper-components';

	export let profile = {
		firstName: 'FirstName',
		lastName: 'Lastname',
		address: 'Unknown address',
		email: 'Unknown email',
		phone: 'No phone',
		notes: 'No notes',
		avatar: null
	};
    let chg

</script>
<Layout_MDSVEX_DEFAULT {...$$props} {...metadata}>

<h1>Want to edit edit your data? Just make it ContactCard!</h1>
<pre class="language-svx">{@html `<code class="language-svx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Peerpiper <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@peerpiper/awesome-peerpiper-components'</span><span class="token punctuation">;</span>

    <span class="token keyword">export</span> <span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">'First Last Names'</span><span class="token punctuation">;</span>
   	<span class="token keyword">export</span> <span class="token keyword">let</span> address <span class="token operator">=</span> <span class="token string">'123 Main Street USA'</span><span class="token punctuation">;</span>
	<span class="token keyword">export</span> <span class="token keyword">let</span> email <span class="token operator">=</span> <span class="token string">'coolbeaner@hotmail.com'</span><span class="token punctuation">;</span>
	<span class="token keyword">export</span> <span class="token keyword">let</span> notes <span class="token operator">=</span> <span class="token string">'Some extra notes here'</span><span class="token punctuation">;</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>


<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Peerpiper.ContactCard</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>example<span class="token punctuation">"</span></span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>profile<span class="token punctuation">&#125;</span></span> <span class="token attr-name"><span class="token namespace">on:</span>change=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token parameter">e</span><span class="token operator">=></span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>detail<span class="token punctuation">)</span><span class="token punctuation">&#125;</span></span> <span class="token punctuation">></span></span>

<span class="token comment">&lt;!-- Set address to read only, cannot edit "Pro" version is used --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>address<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token language-javascript"><span class="token punctuation">&#123;</span>profile<span class="token punctuation">.</span>address<span class="token punctuation">&#125;</span></span> (Read Only)
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Peerpiper.ContactCard</span><span class="token punctuation">></span></span>
</code>`}</pre>
<h2>Notes</h2>
<p>If you want to be able to edit the property then pass the variable in as a prop.</p>
<p>If you want to use this component to display data only, then use read-only modeby using slotted Content instead of props.</p>
<p>When used with the Gateway, do not assign any action to <code>on:change</code></p>
<Peerpiper.ContactCard slot="example" {profile} on:change={e=>console.log(e.detail)} >
<!-- Set address to read only, cannot edit "Pro" version is used -->
<span slot="address">
{profile.address} (Read Only)
</span>
</Peerpiper.ContactCard>
</Layout_MDSVEX_DEFAULT>