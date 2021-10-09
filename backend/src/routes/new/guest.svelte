<script context="module">
	import axios from 'axios';
	import { iH, server } from '../../helpers/env';

	export async function load({ page, fetch, session, context }) {
		const all = await fetch(server + 'images?_limit=1000', iH()).then((r) => r.json());
		return { props: { images: all }};
	}
</script>

<script>
	import Image from '../../components/Image.svelte';
	import { goto } from '$app/navigation';

	export let images = [];
	let name = '';
	let day = '';
	let month = '';
	let year = '';
	let imageId;

	$: date = day && month && year ? new Date(parseInt(year), parseInt(month) - 1, parseInt(day)) : new Date();

	async function send() {
		await axios.post(server + 'guests', { name, image: imageId, birthday: date });

		await goto('/guests');
	}
</script>

<h2>Neuer Gast:</h2>
<h3>Name:</h3>
<input bind:value={name} placeholder="Name" type="text" />
<h3>Geburtstag:</h3>
<div>
	<input bind:value={day} placeholder="Tag" type="text" />
	<input bind:value={month} placeholder="Monat" type="text" />
	<input bind:value={year} placeholder="Jahr" type="text" />
</div>
<h3>Bild auswählen</h3>
<div class="list">
	{#each images as image}
		<div class:selected={image.id === imageId}>
			<Image imageObj={image} onSelect={() => (imageId = image.id)} cover />
		</div>
	{/each}
</div>
<button id="send" disabled={!name || !date || !imageId} on:click={() => send()}> Speichern </button>

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
	h3 {
		margin-top: 15px;
	}
	#send:not([disabled]) {
		box-shadow: 2px 3px #ff5e2a;
		color: #616161 !important;
	}
	#send {
		display: block;
		margin-top: 15px;
		float: right;
		background: white;
		border: 1px solid gray;
		font-size: 24px;
		color: #323232;
		cursor: pointer;
	}
</style>
