<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { humanReadableDate } from "../../helpers/date";
  import { server } from "../../helpers/env";
  import { slide } from "svelte/transition";

  export async function preload() {
    const res = await axios.get(server + "events/upcoming");
    const events = res.data.map(event => {
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
    events = events.filter(e => e.id !== detail.id);
  }
</script>

<style>
  .event + .event {
    margin-top: 40px;
  }
</style>

<a href="new/event">Neues Event</a>

{#each events as event}
  <div class="event" transition:slide>
    <Event data={event} on:delete={e => remove(e)} />
  </div>
{/each}
