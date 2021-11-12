<script>
	import axios from 'axios';
	import { iH, server } from '../helpers/env';
	import { onMount } from 'svelte';

	let text;
	let desc;
	let quill;
	let feeling;
	let feelings = '💩 👿 🤬 😤 🙁 😐 🙂'.split(' ');

	function post() {
		axios.post(server + 'kummers', { text, feeling, description: quill.getHtml() }, iH());
		text = undefined;
		quill.reset();
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
		Quill.prototype.getHtml = function() {
			return this.container.querySelector('.ql-editor').innerHTML;
		};
		Quill.prototype.reset = function() {
			this.container.querySelector('.ql-editor').innerHTML = "";
		};
	});
</script>

<style global>
	@import 'quill/dist/quill.snow.css';

	button:not(#send) {
		background: white;
		border: 0;
		margin: 5px;
		font-size: 40px;
		text-shadow: 5px 3px 3px rgb(10 10 10 / 39%);
		border-radius: 50%;
		padding: 0 5px 11px;
		padding: 0 1px 4px;
	}
	button.selected {
		box-sizing: content-box;
		filter: invert();
		box-shadow: 0px 0px 0px 5px #0072ff;
		background: black !important;
	}

	input {
		display: block;
		margin: 10px auto;
		width: 99%;
		font-size: 40px;
		font-weight: bold;
		text-transform: capitalize;
	}

	#container {
		width: 90%;
		margin: auto;
		padding-top: 10vh;
		background: rgba(255, 255, 255, 0.671);
	}

	#buttons {
		margin: 0 auto 10vh;
		width: max-content;
		background: gray;
		border-radius: 10px;
		padding: 3px;
	}

	#send {
		all: unset;
		background: orange;
		padding: 30px;
		margin: 10vh auto 0;
		display: block;
		float: right;
		color: white;
		text-transform: capitalize;
		font-weight: bold;
		border-radius: 10px;
	}

	span#background {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		font-size: 100vmin;
		line-height: 100vh;
		text-align: center;
		opacity: 0.2;
		pointer-events: none;
		z-index: -1;
		filter: saturate(0);
	}

	#desc{
		background: white;
	}

	::global(.ql-toolbar) {
		background: white !important;
	}
</style>

<div id="container">
	<div id="buttons">
		{#each feelings as f}
			<button on:click={() => (feeling = f)} class:selected={f === feeling}>{f}</button>
		{/each}
	</div>
	{#if feeling}
		<span id="background">{feeling}</span>
	{/if}
	<input placeholder="Titel" bind:value={text} type="text" />
	<div id="desc" bind:this={desc} />
	<button id="send" on:click={() => post()}>Senden</button>
</div>
