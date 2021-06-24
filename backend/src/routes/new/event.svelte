<script context="module">
	import axios from 'axios';
	import { iH, server } from '../../helpers/env';

	export async function load() {
		const res = await fetch(server + 'guests/', iH()).then((r) => r.json());
    if(res && Array.isArray(res)){
      const guests = res.sort((a, b) => a.name.localeCompare(b.name));
      return { props: {guests} };
    }
	}
</script>

<script lang="ts">
	import Guest from '../../components/Guest.svelte';
	import Datepicker from 'svelte-calendar';
	import { onMount } from 'svelte';
	import { addDays, humanReadableDate } from '../../helpers/date';
	import { getStores } from '$app/stores';
	import { goto } from '$app/navigation';
	const { session } = getStores();

	export let guests = [];
	let searchGuest;
	$: filtered = searchGuest
		? guests.filter((g) => g.name.toLowerCase().includes(searchGuest.toLowerCase()))
		: guests;

	let selectedIds = [];
	$: shown = filtered.filter((g) => !selectedIds.some((i) => g.id === i.id));
	let title = '';
	let desc;
	let date = addDays(new Date(), 1);
	let quill;

	function content() {
		return quill.getHtml();
	}

	onMount(async () => {
		const { default: Quill } = await import('quill');
		let toolbarOptions = [
			[{ header: 1 }, { header: 2 }, 'blockquote', 'link'],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }],
			['clean']
		];
		const options = {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
			placeholder: 'Beschreibung'
		};

		quill = new Quill(desc, options);
		Quill.prototype.getHtml = function () {
			return this.container.querySelector('.ql-editor').innerHTML;
		};
	});

	async function submit() {
		const res = await axios.post(server + 'events', {
			title,
			description: content(),
			participants: selectedIds.map((g) => g.id),
			date
		});
		await goto('/events');
	}

	function toggle(guest) {
		if (selectedIds.some((g) => guest.id === g.id)) {
			selectedIds = selectedIds.filter((g) => g !== guest);
		} else {
			selectedIds = [...selectedIds, guest];
		}
	}

	const daysOfWeek = [
		['Sonntag', 'So'],
		['Montag', 'Mo'],
		['Dienstag', 'Di'],
		['Mittwoch', 'Mi'],
		['Donnerstag', 'Do'],
		['Freitag', 'Fr'],
		['Samstag', 'Sa']
	];

	const monthsOfYear = [
		['Januar', 'Jan'],
		['Februar', 'Feb'],
		['März', 'Mar'],
		['April', 'Apr'],
		['Mai', 'Mai'],
		['Juni', 'Jun'],
		['Juli', 'Jul'],
		['August', 'Aug'],
		['September', 'Sep'],
		['Oktober', 'Okt'],
		['November', 'Nov'],
		['Dezember', 'Dez']
	];
</script>

<div id="container">
	<input id="title" bind:value={title} placeholder="Neues Event" type="text" />
	<div bind:this={desc} />
</div>
<div class="column">
	<div>
		<span>Datum</span>
		<Datepicker {daysOfWeek} {monthsOfYear} bind:selected={date} format={humanReadableDate} />

		<div>
			{#if selectedIds.length > 0}
				<span>Gäste</span>
				{#each selectedIds as guest}
					<div on:click={() => toggle(guest)} class="hover">
						<Guest data={guest} />
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<div>
		<span>
			Gäste hinzufügen
			<input placeholder="Suchen" type="text" bind:value={searchGuest} />
		</span>

		<div id="list">
			{#each shown as item}
				<div on:click={() => toggle(item)} class="hover">
					<Guest data={item} />
				</div>
			{:else}
				{#if searchGuest}
					<span>Kein Gast gefunden...</span>
				{:else if selectedIds.length === 0}<span>Noch keine Gäste</span>{/if}
			{/each}
		</div>
	</div>
</div>
<button id="send" on:click={() => submit()} disabled={!title || !date}> Speichern </button>

<style global>
	@import 'quill/dist/quill.snow.css';
	input#title {
		display: inline-block;
		width: calc(100% - 18px);
		height: 40px;
		font-size: 30px;
		font-weight: bold;
		margin-bottom: 15px;
		border: 1px solid #aeaeae;
		padding-left: 15px;
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

	#container {
		min-height: 150px;
	}

	input {
		width: calc(100% - 10px);
	}
	.column > div {
		flex: 1 1 50%;
		max-width: 300px;
	}
	.column {
		display: flex;
		flex-direction: row;
		gap: 10px;
		width: 100%;
		justify-content: space-between;
	}

	span {
		display: block;
	}

	#list {
		max-height: 240px;
		height: 240px;
		overflow: auto;
		border: 1px solid #c7c7c7;
		box-shadow: 1px 1px 2px #e1e1e1;
		width: calc(100% - 4px);
	}

	.hover:hover {
		background: rgb(218, 217, 217);
	}
</style>
