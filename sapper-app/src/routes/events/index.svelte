<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { humanReadableDate } from "../../helpers/date";

  export async function preload() {
    const res = await axios.get("http://localhost:1337/events/upcoming");
    const events = res.data.map(event => {
      event.description = marked(event.description || "");
      event.date = humanReadableDate(event.date)
      return event;
    });

    return { events };
  }
</script>

<script>
  import Event from "../../components/Event.svelte";
  export let events = [];
</script>

{#each events as event}
  <Event data={event} />
{/each}
