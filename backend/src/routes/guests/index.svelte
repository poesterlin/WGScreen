<script context="module">
	import { server } from '../../helpers/env';

	export async function load({ fetch }) {
		const res = await fetch(server + 'guests?_sort=name:asc').then((r) => r.json());
		const guests = res.data.sort((a, b) => a.name.localeCompare(b.name));
		return { guests };
	}
</script>

<script>
	import Guest from '../../components/Guest.svelte';
	export let guests = [];
</script>

<a href="new/guest" class="button">+ Hinzufügen</a>

<div>
	{#each guests as guest}
		<a rel="prefetch" class="guest" href="guests/{guest.id}">
			<Guest data={guest} />
		</a>
	{/each}
</div>

<style>
	a.button:hover {
		box-shadow: 2px 4px #000000;
		color: white;
	}

	a.button {
		position: fixed;
		bottom: 30px;
		right: 30px;
		text-decoration: none;
		border-radius: 30px;
		border: 1px solid #26ab8c;
		color: white;
		box-shadow: 2px 2px #383838;
		background: hsl(180, 50%, 80%);
		z-index: 10;
		width: 192px;
		height: 50px;
		font-size: 25px;
		padding: 13px 0px 2px 8px;
		text-transform: uppercase;
	}
	div {
		width: 50vw;
		margin: auto;
	}

	.guest:hover {
		background: rgb(206, 206, 206);
	}

	.guest {
		margin: 12px 0px;
		display: block;
		padding: 5px;
		border-radius: 5px;
	}
</style>
