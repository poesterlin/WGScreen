<script lang="ts">
  export let image;
  export let size = "thumbnail";
  export let round;

  const host = "http://localhost:1337";
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
    class:round
    src={host + image.formats[size].url}
    loading="lazy"
    alt={image.alternativeText} />
{/if}
