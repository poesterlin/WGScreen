<script context="module">
	import { server } from '../helpers/env';

	export async function load({ fetch }) {
		const imgs = await fetch(server + 'images?_limit=1000').then((r) => r.json());
		return {
			props: {
				images: imgs.filter((i) => !!i.image).reverse()
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
	let selected;

	onMount(()=> {
		dimensions = (window.innerWidth - 85 - 32 * 2) * 0.25
	});


</script>

{#if selected}
<div id="highlight" on:click={() => selected = undefined}>
	<div id="background"></div>
	<Image imageObj={selected} size="large" onSelect={() => selected = undefined}/>
</div>
{/if}

<div id="list">
	{#each images as img}
        <Image imageObj={img} {size} cover overwriteDimensions="{dimensions}" onSelect={() => selected = img}/>
	{/each}
</div>

<style>
	div#list{
		display: flex;
		flex-wrap: wrap;
	}

	div#highlight, div#background{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	div#background{
		background: rgba(0, 0, 0, 0.459);
		z-index: -1;
	}

	div#highlight{
		display: flex;
		place-items: center;
		justify-content: center;
	}
</style>