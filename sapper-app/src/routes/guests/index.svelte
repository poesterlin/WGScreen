<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { server, makeAuth } from "../../helpers/env";

  export async function preload(_, session) {
    const res = await axios.get(server + "guests", makeAuth(session));
    const guests = res.data.map(guest => {
      return guest;
    });
    return { guests };
  }
</script>

<script>
  import Guest from "../../components/Guest.svelte";
  export let guests = [];
</script>

{#each guests as guest}
  <a rel="prefetch" href="guests/{guest.id}">
    <Guest data={guest} />
  </a>
{/each}
