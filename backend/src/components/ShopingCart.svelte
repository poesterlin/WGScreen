<script>
	import axios from 'axios';
	import { server } from '../helpers/env';
	import { onMount } from 'svelte';

	let data = [];
	let newEntry;
	let newNumber;
	let toUpdate = [];
	let shopingItemsReq;
	$: {
		toUpdate = data.filter((d) => d.update);
	}

	onMount(() => update());

	async function update(skip) {
		if (!skip) {
			for (const item of toUpdate) {
				item.update = undefined;
				await axios.put(server + 'shopings/' + item.id, {
					...item,
					done: true
				});
			}
		}
		shopingItemsReq = axios.get(server + 'shopings?done=false');
		data = (await shopingItemsReq).data;
	}

	async function create() {
		const item = { name: newEntry, number: newNumber + '', done: false };
		await axios.post(server + 'shopings', item);
		await update(true);
		newEntry = undefined;
		newNumber = undefined;
	}
</script>

<p>
	{#await shopingItemsReq}
		lädt...
	{:then value}
		{#each data as item}
			<div on:click={() => (item.update = !item.update)}>
				<span id="name">{item.name}</span>
				<span id="amount">{item.number}</span>
				<input type="checkbox" checked={item.update} />
			</div>
		{:else}
			<span id="noEntry">Keine Aufträge</span>
		{/each}
	{/await}
</p>
<div id="new">
	<input type="text" bind:value={newEntry} placeholder="Neuer Eintrag" />
	<input type="text" bind:value={newNumber} placeholder="Menge" />
	<button on:click={() => create()} disabled={!newEntry || !newNumber}> + </button>
</div>

{#if toUpdate.length}
	<button id="save" on:click={() => update()}>Speichern</button>
{/if}

<style>
	div {
		display: grid;
		grid-template-columns: auto 56px max-content;
		height: 40px;
		padding: 15px 10px 0 25px;
		grid-column-gap: 5px;
	}

	#amount {
		text-align: right;
	}

	div:nth-child(2n + 1) {
		background: #efefef;
	}

	div:hover:not(#new) {
		background: #c7c7c7;
	}

	input[type='checkbox'] {
		margin-top: 7px;
	}
	input[type='text']:first-child {
		margin-left: -24px;
		padding-left: 24px;
	}
	input[type='text'] {
		background: transparent;
		border: 1px solid lightgray;
		border-radius: 5px;
		font-size: 16px;
	}

	input[type='text'],
	button {
		height: 100%;
	}

	button:disabled {
		opacity: 0.3;
		filter: grayscale();
	}

	button {
		height: 44px;
		width: 40px;
		background: lightgray;
		border: 0;
		color: black;
		font-size: 32px;
		cursor: pointer;
	}

	#save {
		position: absolute;
		top: -33px;
		font-size: 16px;
		width: auto;
		right: 0px;
		height: 30px;
		color: #3a3a3a;
		background: lightgray;
	}

	#new {
		padding-right: 1px;
		padding-top: 0px;
		margin-top: 5px;
	}

	#new > button {
		height: 110%;
		border-radius: 5px;
	}

	p {
		position: relative;
		height: 229px;
		overflow: auto;
		border: 1px solid lightgray;
		margin: 0;
		border-radius: 5px;
	}

	span#noEntry {
		display: block;
		width: 100%;
		text-align: center;
		padding-top: 25%;
	}
</style>
