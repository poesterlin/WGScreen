<script context="module" lang="ts">
	import { humanReadableDate } from '../../helpers/date';
	import { iH, server } from '../../helpers/env';

	export async function load({ page, fetch }) {
		const guest = await fetch(server + 'guests/' + page.params.slug, iH()).then((r) => r.json());
		guest.birthday = humanReadableDate(guest.birthday);
    return { props: {guest} };
	}
</script>

<script>
	import Image from '../../components/Image.svelte';
	export let guest;
</script>

<svelte:head>
	<title>{guest.name}</title>
</svelte:head>

<h1>{guest.name}</h1>

<Image imageObj={guest.image} size="large" round cover />
Geburtstag: {guest.birthday}

<style>
</style>
