<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { humanReadableDate } from "../helpers/date";
  import { server, makeAuth } from "../helpers/env";

  export async function preload(_, session) {
    const event = (await axios.get(server + "events/upcoming?_limit=1", makeAuth(session)))
      .data[0];
    event.description = marked(event.description || "");
    event.date = humanReadableDate(event.date);

    const events = await axios.get(server + "events", makeAuth(session));
    const images = events.data
      .filter(e => e.image)
      .map(e => ({ img: e.image, id: e.id }));

    return { nextEvent: event, images };
  }
</script>

<script>
  import Event from "../components/Event.svelte";
  import ImageGalerie from "../components/ImageGalerie.svelte";
  import ShopingCart from "../components/ShopingCart.svelte";
  export let nextEvent;
  export let images;
  let wakeLock;

  async function requestWakeLock() {
    try {
      wakeLock = await window.navigator.wakeLock.request("screen");

      wakeLock.addEventListener("release", () => {
        console.log("can go sleep");
      });
    } catch (err) {
      console.log(err);
    }
  }
</script>

<style>
  #container > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  #container > div:nth-child(2n) > a {
    height: 100%;
  }
  #container > div:nth-child(2n) {
    justify-content: flex-end;
  }

  #container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }

  button {
    display: flex;
    justify-content: center;
    font-size: 60px;
    padding-bottom: 0px;
    align-items: center;
    height: calc(100% - 40px);
    border: 1px solid #b7b7b7;
    color: gray;
    width: 100%;
    background: white;
    cursor: pointer;
  }

  .content {
    text-decoration: none;
    flex: 1 1 100%;
    height: 100%;
    min-height: 100%;
    position: relative;
  }

  h4 {
    color: gray;
    margin-top: 15px;
  }
</style>

<svelte:head>
  <title>Infoscreen</title>
</svelte:head>

<!-- <span on:click={() => requestWakeLock()}>lock screen on</span> -->

<div id="container">
  <div>
    <h4>Nächstes Event</h4>
    <div class="content">
      <Event
        on:delete={() => document.location.reload()}
        data={nextEvent}
        showDesc={false}
        showOptions={false} />
    </div>
  </div>

  <div>
    <h4>Event erstellen</h4>
    <a href="/new/event" class="content">
      <button>+</button>
    </a>
  </div>

  <div>
    <h4>Einkaufszettel</h4>
    <div class="content">
      <ShopingCart />
    </div>
  </div>

  <div>
    <h4>Galerie</h4>
    <ImageGalerie {images} />
  </div>

</div>
