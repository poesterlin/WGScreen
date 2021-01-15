<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { server, makeAuth } from "../helpers/env";
  import { shuffle } from "../helpers/math";

  export async function preload(_, session) {
    const events = await axios.get(server + "images", makeAuth(session));

    return { images: shuffle(events.data).filter((i) => !!i.image) };
  }
</script>

<script>
  import ImageGalerie from "../components/ImageGalerie.svelte";

  export let images;
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

<div>
  <ImageGalerie {images} noControls onSelect={() => window.history.back()} />
</div>
