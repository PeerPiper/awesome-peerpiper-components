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
