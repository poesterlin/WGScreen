<script context="module">
  export async function preload(_page, session) {
    return { SERVER: session.SERVER };
  }
</script>

<script lang="ts">
  export let SERVER;

  export let image;
  export let size = "thumbnail";
  export let round;

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
    width={sized.width}
    height={sized.height}
    class:round
    src={SERVER + sized.url}
    loading="lazy"
    alt={image.alternativeText} />
{/if}
