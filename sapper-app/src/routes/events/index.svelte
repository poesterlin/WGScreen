<script context="module">
  import axios from "axios";
  import marked from "marked";
  import {
    humanReadableDate,
    getAge,
    daysDifference,
    getDayThisYear,
    sort
  } from "../../helpers/date";
  import { server, makeAuth } from "../../helpers/env";
  import { slide } from "svelte/transition";

  export async function preload(_, session) {
    const res = await axios.get(server + "events/upcoming", makeAuth(session));
    let events = res.data.map(event => {
      event.description = marked(event.description || "");
      return event;
    });

    const guests = (await axios.get(server + "guests", makeAuth(session))).data;
    const today = new Date();
    const selected = guests.filter(g => {
      const dif = daysDifference(getDayThisYear(new Date(g.birthday)), today);
      return dif < 30 && dif > -1;
    });
    events.push(
      ...selected.map(g => ({
        participants: [g],
        date: getDayThisYear(new Date(g.birthday)),
        id: g.id + 100000,
        description: "",
        title: `${g.name} hat Geburtstag (${getAge(new Date(g.birthday))})`,
        isBirthday: true
      }))
    );

    events = events.sort(sort);
    events.forEach(e => (e.date = humanReadableDate(e.date)));

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

{#each events as event (event.id)}
  <div class="event" transition:slide>
    <Event data={event} on:delete={e => remove(e)} />
  </div>
{/each}
