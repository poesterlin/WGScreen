<script lang="ts">
  import Nav from "../components/Nav.svelte";
  export let segment;

</script>

<style>
  main {
    position: relative;
    max-width: calc(100vw - 85px);
    padding: 2em;
    margin: 0 auto 100px;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
