<script>
	import Image from './Image.svelte';
	export let data;
</script>

<div>
	<span>{data.name}</span>
	<Image imageObj={data.image} cover round />
</div>

<style>
	div {
		display: flex;
		align-items: center;
		flex: 1 1 100%;
		height: 100%;
		max-width: min-content;
		min-width: 100%;
		justify-content: space-between;
	}
	span {
		margin-right: 5px;
	}
</style>
