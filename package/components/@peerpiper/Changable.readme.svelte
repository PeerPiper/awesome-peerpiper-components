<script context="module">
	export const metadata = {"layout":"demo","title":"Make your Data Changable","author":"@douganderson444","description":null};
	const { layout, title, author, description } = metadata;
</script>
<script>
	import Layout_MDSVEX_DEFAULT, * as Components from 'C:/Users/douga/Documents2/code/awesome-peerpiper-components/src/layouts/demo.svelte';
    import Changable from './Changable.svelte';

    export let name = 'Click me to edit';

    let chg

</script>
<Layout_MDSVEX_DEFAULT {...$$props} {...metadata}>

<h1>Want to edit edit your data? Just make it Changable!</h1>
<pre class="language-svx">{@html `<code class="language-svx"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token keyword">import</span> <span class="token punctuation">&#123;</span> Changable <span class="token punctuation">&#125;</span> <span class="token keyword">from</span> <span class="token string">'@peerpiper/awesome-peerpiper-components/Peerpiper'</span><span class="token punctuation">;</span>
    <span class="token keyword">export</span> <span class="token keyword">let</span> name <span class="token operator">=</span> <span class="token string">'Click me to edit'</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Changable</span> <span class="token attr-name">item=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token punctuation">&#123;</span> name <span class="token punctuation">&#125;</span><span class="token punctuation">&#125;</span></span> <span class="token attr-name"><span class="token namespace">on:</span>change</span> <span class="token punctuation">/></span></span>;</code>`}</pre>
<p>This component makes the prop item contentEditable, and emits a ‘change’ event every time it changes,
so that consuming parents can update their copy of the data.</p>
<Changable slot="example" item={{name}} on:change={e=>console.log(e.detail)} ></Changable>
</Layout_MDSVEX_DEFAULT>