<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { server,  } from "../helpers/env";
  import { shuffle } from "../helpers/math";

  export async function load({ page, fetch, session, context }){
    const imgs = await axios.get(server + "images");
    return { images: imgs.data.filter((i) => !!i.image), };
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
