<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { humanReadableDate } from "../helpers/date";
  import { server } from "../helpers/env";

  export async function preload() {
    const events = await axios.get(server + "events");
    const images = events.data
      .filter(e => e.image)
      .map(e => ({ img: e.image, id: e.id }));

    return { images };
  }
</script>

<script>
  import ImageGalerie from "../components/ImageGalerie.svelte";

  export let images;
  function action() {
    return {
      update: () => {
        navigator.wakeLock.request("display").then(() => {
          console.log("success");
        });
        navigator.wakeLock.request("system").then(() => {
          console.log("success system");
        });
      },
      destroy: () => {
        try {
          navigator.wakeLock.release("display");
        } catch (e) {}
      }
    };
  }
</script>

<style>
  div {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: black;
  }
</style>

<div use:action>
  <ImageGalerie {images} noControls onSelect={() => window.history.back()} />
</div>
