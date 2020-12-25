<script lang="ts">
  import { server } from "../helpers/env";
  import { createEventDispatcher } from "svelte";
  export let image;
  export let size = "thumbnail";
  export let round = false;
  export let cover = false;

  const dispatch = createEventDispatcher();

  $: sized = image ? image.formats[size] : undefined;
  $: host = server.slice(0, -1);
</script>

<style>
  img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    background-size: contain;
  }
  .round {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }

  .cover {
    background-size: cover;
  }
</style>

{#if image}
  <img
    on:click={() => dispatch('select')}
    width={sized.width}
    height={sized.height}
    class:round
    class:cover
    src={host + sized.url}
    loading="lazy"
    alt={image.alternativeText} />
{/if}
