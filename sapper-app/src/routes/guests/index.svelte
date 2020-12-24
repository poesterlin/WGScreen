<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { server } from "../../helpers/env";

  export async function preload() {
    const res = await axios.get(server + "guests");
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
  <Guest data={guest} />
{/each}
