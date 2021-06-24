<script context="module">
	import { server } from '../helpers/env';

	export async function load({ page, fetch, session, context }) {
		const imgs = await fetch(server + 'images').then((r) => r.json());
		return { images: imgs.filter((i) => !!i.image) };
	}
</script>

<script>
	import ImageGalerie from '../components/ImageGalerie.svelte';

	export let images;
</script>

<div>
	<ImageGalerie {images} noControls />
</div>

<style>
	div {
		position: fixed;
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background: black;
	}
</style>
