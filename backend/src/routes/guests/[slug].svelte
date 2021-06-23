<script context="module" lang="ts">
	import axios from 'axios';
	import { humanReadableDate } from '../../helpers/date';
	import { server } from '../../helpers/env';

	export async function load({ page, fetch }) {
		const res = await fetch(server + 'guests/' + page.params.slug).then((r) => r.json());
		const guest = res.data;
		guest.birthday = humanReadableDate(guest.birthday);

		if (res.status === 200) {
			return { guest };
		} else {
			this.error(res.status, res.data.message);
		}
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
