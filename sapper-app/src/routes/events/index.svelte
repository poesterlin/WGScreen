<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { humanReadableDate } from "../../helpers/date";
  import { slide } from "svelte/transition";

  export async function preload(_, session) {
    const res = await axios.get(session.SERVER + "/events/upcoming");
    const events = res.data.map((event) => {
      event.description = marked(event.description || "");
      event.date = humanReadableDate(event.date);
      return event;
    });

    return { events };
  }
</script>

<script>
  import Event from "../../components/Event.svelte";
  export let events = [];

  function remove({ detail }) {
    events = events.filter((e) => e.id !== detail.id);
  }
</script>

<a href="new/event">Neues Event</a>

{#each events as event}
  <div transition:slide>
    <Event data={event} on:delete={(e) => remove(e)} />
  </div>
{/each}
