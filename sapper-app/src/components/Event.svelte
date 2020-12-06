<script lang="ts">
  import Image from "./Image.svelte";
  import Guest from "./Guest.svelte";
  export let data;
</script>

<style>
  div {
    border: 1px solid black;
  }
</style>

<div class="title">
  <a rel="prefetch" href="events/{data.id}">{data.title}</a>
</div>
<div class="desc">
  {@html data.description}
</div>

{#each data.participants as guest}
  <Guest data={guest} />
{/each}

{data.date}
<Image image={data.image} />
