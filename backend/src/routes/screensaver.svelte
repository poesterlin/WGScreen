<script context="module">
	import { iH, server } from '../helpers/env';

	export async function load({ fetch }) {
		const imgs = await fetch(server + 'images?_limit=1000', iH()).then((r) => r.json());
		return { props: {images: imgs.filter((i) => !!i.image)} };
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
