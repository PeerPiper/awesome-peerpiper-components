# Awesome PeerPiper Components

Need a start on hacking on the [Deploy REPL](https://github.com/DougAnderson444/web3-repl-deploy)?

Use these free, open source, and unencrypted components built for being imported into the PeerPiper ecosystem. Build and compile [at home](https://code.visualstudio.com/) or in the [Deploy REPL](https://github.com/DougAnderson444/web3-repl-deploy) then use via the [Gateway](https://github.com/DougAnderson444/svelte-component-gateway) in your app.

## Reference Implementation

Contact Card.
ToDo List

## Use

✨ See `src/routes/index.svelte` for example usage.

In Svelte:

```svelte
<script>
	import { Peerpiper } from '@peerpiper/awesome-peerpiper-components';

	export let name = 'Douglas Anderson';
	export let address = '247 Main Street, USA';
</script>

<div>
	Demo <pre>awesome-peerpiper-components</pre>
</div>

<Peerpiper.ContactCard>
	<span slot="name">{name}</span>

	<span slot="address">
		{address}
	</span>
</Peerpiper.ContactCard>
```

In Vanilla JS, import from Github using jsdelivr then mount [as per Svelte docs](https://svelte.dev/docs#run-time-client-side-component-api):

```js
import ContactCard from 'https://cdn.jsdelivr.net/gh/PeerPiper/awesome-peerpiper-components@master/dist/@peerpiper/ContactCard.svelte.js';

const app = new ContactCard({
	target: document.getElementById('target-div') || document.body,
	props: {
		// assuming App.svelte contains something like
		// `export let answer`:
		name: 'Doug Anderson',
		address: '247 Main Street USA'
	}
});

<div id="target-div"></div>;
```

## Pull Requests - Add your Awesome PeerPiper Component

Yes please. More to come. Instructions to follow.
