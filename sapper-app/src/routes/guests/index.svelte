<script context="module">
  import axios from "axios";

  export async function preload(_, session) {
    const res = await axios.get(session.SERVER + "/guests");
    const guests = res.data.map((guest) => {
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
