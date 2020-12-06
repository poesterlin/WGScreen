<script context="module">
  export async function preload(_page, session) {
    return { SERVER: session.SERVER };
  }
</script>

<script lang="ts">
  export let SERVER;
  import { createEventDispatcher } from "svelte";
  import Image from "./Image.svelte";
  import Guest from "./Guest.svelte";
  import axios from "axios";
  export let data;

  const dispatch = createEventDispatcher();

  async function deleteEvent() {
    await axios.delete(SERVER + "/events/" + data.id);
    dispatch("delete", { id: data.id });
  }
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

  .element:hover button {
    opacity: 1;
  }

  button {
    opacity: 0;
  }
</style>

<div class="element">
  <a rel="prefetch" href="events/{data.id}">
    <h3>{data.title}</h3>
    <div>
      <Image image={data.image} />
    </div>
    <div class="desc">
      {@html data.description}
    </div>
    <div>{data.date}</div>
  </a>
  {#each data.participants as guest}
    <Guest data={guest} />
  {/each}
  <button on:click|stopPropagation={() => deleteEvent()}>Löschen</button>
</div>
