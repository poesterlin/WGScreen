<script lang="ts">
	import Image from './Image.svelte';
	import { mod } from '../helpers/math';

	export let images = [];

	export let noControls = images.length <= 1;
	export let size = 'medium';

	let current = Math.floor(Math.random() * images.length);
	let interval;

	if (noControls) {
		makeInterval();
	}

	function point(op) {
		current = mod(current + op, images.length);
	}

	function makeInterval() {
		clearInterval(interval);
		interval = setInterval(() => point(1), 20 * 1000);
	}
</script>

<div id="container">
	<Image imageObj={images[current]} {size} />
	{#if !noControls}
		<div id="spacer">
			<button on:click={() => point(-1)}>&lt;</button>
			<button on:click={() => point(1)}>&gt;</button>
		</div>
	{/if}
</div>

<style>
	#container {
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		justify-content: center;
		align-items: center;
	}

	#spacer {
		position: absolute;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}
	button {
		background: #ffffffa1;
		cursor: pointer;
		border: 0;
		font-weight: bold;
		font-size: 30px;
		color: #323232;
		margin: 0 2px;
		height: 35px;
		border-radius: 5px;
	}
</style>
