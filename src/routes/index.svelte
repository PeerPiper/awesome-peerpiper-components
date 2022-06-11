<script>
	import { Peerpiper } from '@peerpiper/awesome-peerpiper-components';
	// import { globbySync } from 'globby';

	import Changable from '$lib/components/@peerpiper/Changable.svx';

	export let name = 'Douglas Anderson';
	export let address = '247 Main Street, USA';

	// iterate through each subdirectory in src/lib/components
	// and import each component's svx file

	// use globby library to get all files in src/lib/components
	// const components = globbySync('src/lib/components/**/*.svx');
	// console.log({ components });
</script>

<div>
	Demo <pre>awesome-peerpiper-components</pre>
</div>

<Changable />

<Peerpiper.ContactCard>
	<span slot="name">{name}</span>

	<span slot="address">
		{address}
	</span>
</Peerpiper.ContactCard>
