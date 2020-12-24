<script lang="ts">
  import { goto } from "@sapper/app";
  import Image from "./Image.svelte";

  export let images = [];
  let current = 0;

  function point(op) {
    current = (current + op) % images.length;
  }
</script>

<style>
  #container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
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
  }
</style>

<div id="container">
  <Image
    on:select={() => goto('/events/' + images[current].id)}
    image={images[current].img}
    size="medium"
    cover />
  <div id="spacer">
    <button on:click={() => point(-1)}>&lt;</button>
    <button on:click={() => point(1)}>&gt;</button>
  </div>
</div>
