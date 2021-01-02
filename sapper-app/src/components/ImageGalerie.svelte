<script lang="ts">
  import { goto } from "@sapper/app";
  import Image from "./Image.svelte";
  import { mod } from "../helpers/math";

  export let images = [];
  export let onSelect = id => goto("/events/" + id);
  export let noControls = false;
  let current = 0;
  let interval;

  if (noControls) {
    makeInterval();
  }

  function point(op) {
    current = mod(current + op, images.length);
  }

  function makeInterval() {
    clearInterval(interval);
    interval = setInterval(() => point(1), 20 * 1000);
  }
</script>

<style>
  #container {
    display: flex;
    position: relative;
    width: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
  }

  #spacer {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  button {
    background: #ffffffa1;
    cursor: pointer;
    border: 0;
    font-weight: bold;
    font-size: 30px;
    color: #323232;
    margin: 0 2px;
    height: 35px;
    border-radius: 5px;
  }
</style>

<div id="container">
  <Image
    on:select={() => onSelect(images[current].id)}
    image={images[current].img}
    size="medium"
    cover />
  {#if !noControls}
    <div id="spacer">
      <button on:click={() => point(-1)}>&lt;</button>
      <button on:click={() => point(1)}>&gt;</button>
    </div>
  {/if}
</div>
