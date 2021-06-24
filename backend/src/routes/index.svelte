<script context="module">
	import marked from 'marked';
	import { humanReadableDate } from '../helpers/date';
	import { iH, server } from '../helpers/env';

	export async function load({ fetch }) {
		const res = await fetch(server + 'events/upcoming?_limit=1', iH()).then((r) => r.json());
    let event;
    if(res && res[0]){
      event = res[0];
      event.description = marked(event.description || '');
      event.date = humanReadableDate(event.date);
    }

		const imgs = await fetch(server + 'images').then((r) => r.json());
		return {
			nextEvent: event,
			images: imgs.filter((i) => !!i.image)
		};
	}
</script>

<script>
	import Event from '../components/Event.svelte';
	import ImageGalerie from '../components/ImageGalerie.svelte';
	import ShopingCart from '../components/ShopingCart.svelte';
import internal from 'stream';
	export let nextEvent;
	export let images;
</script>

<svelte:head>
	<title>Infoscreen</title>
</svelte:head>

<div id="container">
	<div>
		<h4>Nächstes Event</h4>
		<div class="content">
			{#if nextEvent}
				<Event
					on:delete={() => document.location.reload()}
					data={nextEvent}
					showDesc={false}
					showOptions={false}
				/>
			{:else}<span>keine Events</span>{/if}
		</div>
	</div>

	<div>
		<h4>Event erstellen</h4>
		<a href="/new/event" class="content"> <button>+</button> </a>
	</div>

	<div>
		<h4>Einkaufszettel</h4>
		<div class="content">
			<ShopingCart />
		</div>
	</div>

	<div>
		<h4>Galerie</h4>
		<ImageGalerie {images} />
	</div>
</div>

<style>
	#container > div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	#container > div:nth-child(2n) > a {
		height: 100%;
	}
	#container > div:nth-child(2n) {
		justify-content: flex-end;
	}
	#container > div:last-child {
		height: 40vh;
	}

	#container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 10px;
		height: 40vh;
	}

	button {
		display: flex;
		justify-content: center;
		font-size: 60px;
		padding-bottom: 0px;
		align-items: center;
		height: calc(100% - 40px);
		border: 1px solid #b7b7b7;
		color: gray;
		width: 100%;
		background: white;
		cursor: pointer;
	}

	.content {
		text-decoration: none;
		flex: 1 1 100%;
		height: 100%;
		min-height: 100%;
		position: relative;
		max-width: calc(50vw - 80px);
	}

	h4 {
		color: gray;
		margin-top: 15px;
	}
</style>
