<script context="module">
	export const metadata = {"layout":"demo","title":"Manage Multiple Compiled Components","library":"Peerpiper","author":"@douganderson444","description":null};
	const { layout, title, library, author, description } = metadata;
</script>
<script>
	import Layout_MDSVEX_DEFAULT, * as Components from 'C:/Users/douga/Documents2/code/awesome-peerpiper-components/src/layouts/demo.svelte';
    import TagMaker from './TagManager.svelte';
    // import { Peerpiper } from '@peerpiper/awesome-peerpiper-components';
	// let esModule =
	// 	'https://raw.githubusercontent.com/PeerPiper/awesome-peerpiper-components/master/compiled/%40peerpiper/ContactCard.svelte.js';

	import esModule from '../../../../compiled/@peerpiper/ContactCard.svelte.js?raw';


	export let params = [
		{esModule, props:{profile:{"firstName":"Doug","lastName":"Anders"}}},
		{esModule, props:{profile:{"firstName":"Joe","lastName":"Smith"}}},
	] 

</script>
<Layout_MDSVEX_DEFAULT {...$$props} {...metadata}>

<h1>Want to edit edit your data? Just make it TagManager!</h1>
<pre class="language-svx">{@html `<code class="language-svx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// import TagManager from './TagManager.svelte';</span>
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Peerpiper <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@peerpiper/awesome-peerpiper-components'</span><span class="token punctuation">;</span>
	<span class="token keyword">let</span> esModule <span class="token operator">=</span>
		<span class="token string">'https://raw.githubusercontent.com/PeerPiper/awesome-peerpiper-components/master/compiled/%40peerpiper/ContactCard.svelte.js'</span><span class="token punctuation">;</span>

	<span class="token keyword">export</span> <span class="token keyword">let</span> params <span class="token operator">=</span> <span class="token punctuation">[</span>
		<span class="token punctuation">&#123;</span>esModule<span class="token punctuation">,</span> <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">&#123;</span><span class="token literal-property property">profile</span><span class="token operator">:</span><span class="token punctuation">&#123;</span><span class="token string-property property">"firstName"</span><span class="token operator">:</span><span class="token string">"Doug"</span><span class="token punctuation">,</span><span class="token string-property property">"lastName"</span><span class="token operator">:</span><span class="token string">"Anders"</span><span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
		<span class="token punctuation">&#123;</span>esModule<span class="token punctuation">,</span> <span class="token literal-property property">props</span><span class="token operator">:</span><span class="token punctuation">&#123;</span><span class="token literal-property property">profile</span><span class="token operator">:</span><span class="token punctuation">&#123;</span><span class="token string-property property">"firstName"</span><span class="token operator">:</span><span class="token string">"Joe"</span><span class="token punctuation">,</span><span class="token string-property property">"lastName"</span><span class="token operator">:</span><span class="token string">"Smith"</span><span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span><span class="token punctuation">,</span>
	<span class="token punctuation">]</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Peerpiper.TagManager</span> <span class="token attr-name">slot</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>example<span class="token punctuation">"</span></span> <span class="token language-javascript"><span class="token punctuation">&#123;</span>params<span class="token punctuation">&#125;</span></span> <span class="token attr-name"><span class="token namespace">on:</span>change=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token parameter">e</span><span class="token operator">=></span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>detail<span class="token punctuation">)</span><span class="token punctuation">&#125;</span></span> <span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Peerpiper.TagManager</span><span class="token punctuation">></span></span></code>`}</pre>
<h2>Notes</h2>
<p>If you want to be able to edit the property then pass the variable in as a prop.</p>
<p>If you want to use this component to display data only, then use read-only modeby using slotted Content instead of props.</p>
<p>When used with the Gateway, do not assign any action to <code>on:change</code></p>
<Peerpiper.TagMaker slot="example" {params} on:change={e=>console.log(e.detail)} >
</Peerpiper.TagMaker>
</Layout_MDSVEX_DEFAULT>