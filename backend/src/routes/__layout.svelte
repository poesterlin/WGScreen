<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import { page } from '$app/stores';

	$: segment = $page.path.substr(1)
</script>

{#if segment !== 'upload'}
	<Nav {segment} />
{/if}

<main>
	<slot />
</main>

<style>
	main {
		position: relative;
		max-width: calc(100vw - 85px);
		padding: 2em;
		margin: 0 auto 100px;
		box-sizing: border-box;
	}
</style>
