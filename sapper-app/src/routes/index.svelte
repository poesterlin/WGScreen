<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { humanReadableDate } from "../helpers/date";
  import { server } from "../helpers/env";

  export async function preload() {
    const event = (await axios.get(server + "events/upcoming?_limit=1"))
      .data[0];
    event.description = marked(event.description || "");
    event.date = humanReadableDate(event.date);

    const events = await axios.get(server + "events");
    const images = events.data
      .filter(e => e.image)
      .map(e => ({ img: e.image, id: e.id }));

    return { nextEvent: event, images };
  }
</script>

<script>
  import Event from "../components/Event.svelte";
  import ImageGalerie from "../components/ImageGalerie.svelte";
  export let nextEvent;
  export let images;
</script>

<style>
  h3 {
    text-align: center;
    margin: 0 auto;
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  #container > div {
    width: 40vw;
  }

  #container > div:nth-child(2n) > h4 {
    text-align: right;
  }

  #container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    flex-wrap: wrap;
  }

  button {
    display: flex;
    justify-content: center;
    font-size: 60px;
    padding-bottom: 0px;
    align-items: center;
    min-height: 145px;
    border: 1px solid #b7b7b7;
    color: gray;
    width: 100%;
    background: white;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
</style>

<svelte:head>
  <title>Infoscreen</title>
</svelte:head>

<h3>Hallo Besucher</h3>

<div id="container">
  <div>
    <h4>Nächstes Event:</h4>
    <Event data={nextEvent} />
  </div>

  <div>
    <h4>Event hinzufügen:</h4>
    <a href="/new/event">
      <button>+</button>
    </a>
  </div>

  <div>
    <ImageGalerie {images} />
  </div>

</div>
