<script context="module">
	import { server } from '../helpers/env';

	export async function load({ fetch }) {
		const imgs = await fetch(server + 'images').then((r) => r.json());
		return {
			props: {
				images: imgs.filter((i) => !!i.image)
			}
		};
	}
</script>

<script>
	import Image from '../components/Image.svelte';
	import { onMount } from 'svelte';

    export let images = [];
    const size = "medium";

	let dimensions;
	onMount(()=> {
		dimensions = (window.innerWidth - 85 - 32 * 2) * 0.25
	});
</script>


<div>
	{#each images as img}
        <Image imageObj={img} {size} cover overwriteDimensions="{dimensions}"/>
	{/each}
</div>

<style>
	div{
		display: flex;
		flex-wrap: wrap;
	}
</style>