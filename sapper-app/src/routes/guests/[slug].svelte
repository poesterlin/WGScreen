<script context="module" lang="ts">
  import axios from "axios";
  import { humanReadableDate } from "../../helpers/date";
  import { server , makeAuth} from "../../helpers/env";

  export async function preload({ params }, session) {
    const res = await axios.get(server + "guests/" + params.slug, makeAuth(session));
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
  import Image from "../../components/Image.svelte";
  export let guest;
</script>

<style>
</style>

<svelte:head>
  <title>{guest.name}</title>
</svelte:head>

<h1>{guest.name}</h1>

<Image imageObj={guest.image} size="large" round cover />
Geburtstag: {guest.birthday}
