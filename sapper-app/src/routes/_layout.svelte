<script lang="ts">
  import Nav from "../components/Nav.svelte";
  import routes from "../routes";
  import { guard } from "@beyonk/sapper-rbac";
  import { tick } from "svelte";
  import { stores, goto } from "@sapper/app";

  export let segment;
  const { page, session } = stores();

  const options = {
    routes,
    deny: () => goto("/login")
  };

  page.subscribe(async v => {
    await tick(); // let the previous routing finish first.
    guard(v.path, { scope: ["screen"] }, options);
  });
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
