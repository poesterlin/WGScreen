<script lang="ts">
  export let image;
  export let size = "thumbnail";
  export let round;

  const host = "http://localhost:1337";
  $: sized = image?.formats[size];
</script>

<style>
  .round {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 50%;
  }
</style>

{#if image}
  <img
    :width={sized.width}
    :height={sized.height}
    class:round
    src={host + sized.url}
    loading="lazy"
    alt={image.alternativeText} />
{/if}
