<script context="module">
	import axios from 'axios';
	import { iH, server } from '../../../helpers/env';

	export async function load({ page, fetch, session, context }) {
		const res = await fetch(server + 'events/' + page.params.id, iH());

		const all = await fetch(server + 'images', iH()).then((r) => r.json());

		if (res.status === 200) {
			return { event: res, images: all };
		} else {
			this.error(res.status);
		}
	}
</script>

<script>
	import Image from '../../../components/Image.svelte';
	import { goto } from '$app/navigation';

	export let event;
	export let images;

	async function setImages() {
		await axios.put(server + 'events/' + event.id, {
			...event,
			images: event.images.map((i) => i.id),
			participants: event.participants.map((i) => i.id)
		});
		await goto('/events');
	}

	function toggleImage(image) {
		const evtImg = event.images.findIndex((img) => img.id === image.id);
		if (evtImg > -1) {
			event.images.splice(evtImg, 1);
			event.images = event.images.slice();
		} else {
			event.images = [...event.images, images.find((img) => img.id === image.id)];
		}
	}
</script>

<div class="list space">
	<h1>{event.title}</h1>
	<button on:click={setImages}>Speichern</button>
</div>
<h3>Alle Bilder:</h3>
<div class="list">
	{#each images as image}
		<div class:selected={event.images.some((img) => img.id === image.id)}>
			<Image imageObj={image} onSelect={() => toggleImage(image)} cover />
		</div>
	{/each}
</div>
<h3>Ausgewählte Bilder:</h3>
<div class="list">
	{#each event.images as image}
		<Image imageObj={image} onSelect={() => toggleImage(image)} cover />
	{:else}Noch keine Bilder{/each}
</div>

<style>
	.selected {
		opacity: 0.5;
		filter: grayscale(1);
	}

	.list > div {
		display: inline-block;
		height: 140px;
	}
	.list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 80vw;
		max-height: 40vh;
		overflow: auto;
		margin: auto;
		min-height: 60px;
	}
	button {
		display: block;
		color: #616161;
		font-size: 24px;
		box-shadow: 2px 3px #ff5e2a;
		background: white;
		border: 1px solid gray;
		cursor: pointer;
		height: 50px;
	}

	.space {
		justify-content: space-between;
	}
</style>
