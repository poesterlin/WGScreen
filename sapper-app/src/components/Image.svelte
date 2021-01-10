<script lang="ts">
  import { server } from "../helpers/env";
  export let imageObj;
  export let size = "thumbnail";
  export let round = false;
  export let cover = false;
  export let overwriteDimensions = false;
  export let onSelect = () => {};
  let choosenSize;

  $: {
    if (imageObj && imageObj.image && !imageObj.image.formats[size]) {
      choosenSize = Object.keys(imageObj.image.formats)[0];
    } else {
      choosenSize = size;
    }
  }

  $: sized =
    imageObj && imageObj.image
      ? imageObj.image.formats[choosenSize]
      : undefined;
  $: host = server.slice(0, -1);
</script>

<style>
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    overflow: hidden;
  }
  .round {
    width: 60px;
    /* min-width: 60px; */
    height: 60px;
    max-width: min(60px, 100%);
    max-height: min(60px, 100%);
    border-radius: 50%;
  }

  .cover {
    object-fit: cover !important;
  }
</style>

{#if sized}
  <img
    on:click={() => onSelect()}
    width={overwriteDimensions || sized.width}
    height={overwriteDimensions || sized.height}
    class:round
    class:cover
    src={host + sized.url}
    loading="lazy"
    alt={imageObj.image.alternativeText} />
{/if}
