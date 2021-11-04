<script>
	import axios from 'axios';
	import { iH, server } from '../helpers/env';

	let text;
	let feeling;
	let feelings = '💩 👿 🤬 😤 🙁 😐 🙂'.split(' ');

	function post() {
		axios.post(server + '/kummer', { text, feeling }, iH());
		text = undefined;
	}
</script>

<style>
	button:not(#send) {
		background: white;
		border: 0;
		margin: 5px;
		font-size: 40px;
		text-shadow: 5px 3px 3px rgb(10 10 10 / 39%);
		border-radius: 50%;
        padding: 0 5px 11px;
	}
	button.selected {
		/* border: 4px solid orange !important; */
		background: orange !important;
        box-sizing: content-box;
	}
</style>

<div>
	<input bind:value={text} type="text" />
	{#each feelings as f}
		<button on:click={() => (feeling = f)} class:selected={f === feeling}>{f}</button>
	{/each}
	<button id="send" on:click={() => post()}>kummer abschicken</button>
</div>
