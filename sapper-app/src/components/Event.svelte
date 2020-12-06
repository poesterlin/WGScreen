<script lang="ts">
  import Image from "./Image.svelte";
  import Guest from "./Guest.svelte";
  export let data;
</script>

<style>
  .element {
    margin: 140px auto;
    border: 1px solid gray;
    padding: 20px;
    box-shadow: 2px 3px #ff5e2a;
  }

  a {
    text-decoration: none;
  }
</style>

<a rel="prefetch" href="events/{data.id}">
  <div class="element">
    <h3>{data.title}</h3>
    <div>
      <Image image={data.image} />
    </div>
    <div class="desc">
      {@html data.description}
    </div>
    <div>{data.date}</div>

    {#each data.participants as guest}
      <Guest data={guest} />
    {/each}
  </div>

</a>
