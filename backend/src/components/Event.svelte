<script lang="ts">
	import Options from './Options.svelte';
	import { createEventDispatcher } from 'svelte';
	import Image from './Image.svelte';
	import Guest from './Guest.svelte';
	import axios from 'axios';
	import { server } from '../helpers/env';
	import { goto } from '$app/navigation';

	export let data;
	export let showDesc = true;
	export let showOptions = true;

	const dispatch = createEventDispatcher();

	const isBirthday = data.isBirthday && data.participants.length === 1;
	const linkTo = isBirthday ? 'guests/' + data.participants[0].id : 'events/' + data.id;

	if (isBirthday) {
		data.images = [data.participants[0].image];
	}

	async function deleteEvent() {
		await axios.delete(server + 'events/' + data.id);
		dispatch('delete', { id: data.id });
	}
</script>

<div class="element">
	<a rel="prefetch" href={linkTo}>
		<h3>{data.title}</h3>
		<div>
			<Image imageObj={data.images[0]} />
		</div>
		{#if showDesc}
			<div class="desc">
				{@html data.description}
			</div>
		{/if}
	</a>
	{#if data.participants.length > 0 && !isBirthday}
		<div id="guestList">
			{#each data.participants as guest}
				<div class="guest">
					<a rel="prefetch" href="guests/{guest.id}">
						<Guest data={guest} />
					</a>
				</div>
			{/each}
		</div>
	{/if}
	<div id="date">{data.date}</div>
	{#if showOptions && !isBirthday}
		<div id="options">
			<Options>
				<button on:click={async () => await goto('/events/' + data.id + '/edit')}>
					Bearbeiten
				</button>
				<button on:click={() => deleteEvent()}>Löschen</button>
			</Options>
		</div>
	{/if}
</div>

<style>
	.element {
		position: relative;
		margin: 0px auto;
		border: 1px solid gray;
		padding: 20px;
		box-shadow: 2px 3px #ff5e2a;
	}

	#options {
		position: absolute;
		top: 5px;
		right: 15px;
		width: 30px;
	}

	a {
		text-decoration: none;
	}

	#guestList {
		width: 100%;
		display: flex;
		flex-direction: row;
		overflow: auto;
	}

	.guest {
		flex: 1 1 150px;
		max-width: min-content;
		margin: 5px 5px 0;
		background: #f8efec;
		padding: 3px 14px;
		border-radius: 15px;
		cursor: pointer;
	}

	#date {
		margin-top: 15px;
		font-weight: bold;
		text-align: right;
		color: #424242;
	}
</style>
