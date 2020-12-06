<script context="module">
  import axios from "axios";
  import marked from "marked";

  export async function preload() {
    const res = await axios.get("http://localhost:1337/guests");
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
