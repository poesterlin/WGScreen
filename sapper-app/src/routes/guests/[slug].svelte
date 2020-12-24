<script context="module" lang="ts">
  import axios from "axios";
  import marked from "marked";
  import { humanReadableDate } from "../../helpers/date";
  import { server } from "../../helpers/env";

  export async function preload({ params }) {
    const res = await axios.get(server + "guests/" + params.slug);
    const guest = res.data;
    guest.birthday = humanReadableDate(guest.birthday);

    if (res.status === 200) {
      return { guest };
    } else {
      this.error(res.status, data.message);
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

<Image image={guest.picture} size="large" round />
Birthday: {guest.birthday}
