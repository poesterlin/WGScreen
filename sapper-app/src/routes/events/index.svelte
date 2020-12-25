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

  a:hover {
    box-shadow: 2px 4px #000000;
    color: white;
    text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.226);
  }

  a {
    position: fixed;
    bottom: 30px;
    right: 30px;
    text-decoration: none;
    border-radius: 30px;
    border: 1px solid #26ab8c;
    color: white;
    box-shadow: 2px 2px #383838;
    background: hsl(180, 50%, 80%);
    z-index: 10;
    width: 192px;
    height: 50px;
    font-size: 25px;
    padding: 13px 0px 2px 8px;
    text-transform: uppercase;
  }
</style>

<a href="new/event">+ Hinzufügen</a>

{#each events as event}
  <div class="event" transition:slide>
    <Event data={event} on:delete={e => remove(e)} />
  </div>
{/each}
