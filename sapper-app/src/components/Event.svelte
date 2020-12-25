<script lang="ts">
  import Options from "./Options.svelte";
  import { createEventDispatcher } from "svelte";
  import Image from "./Image.svelte";
  import Guest from "./Guest.svelte";
  import axios from "axios";
  import { server } from "../helpers/env";
  export let data;
  export let showDesc = true;
  export let showOptions = true;

  let options;

  const dispatch = createEventDispatcher();

  async function deleteEvent() {
    await axios.delete(server + "events/" + data.id);
    dispatch("delete", { id: data.id });
  }
</script>

<style>
  .element {
    position: relative;
    margin: 0px auto;
    border: 1px solid gray;
    padding: 20px;
    box-shadow: 2px 3px #ff5e2a;
  }

  #options {
    position: absolute;
    top: 5px;
    right: 15px;
    width: 30px;
  }

  a {
    text-decoration: none;
  }
</style>

<div class="element">
  <a rel="prefetch" href="events/{data.id}">
    <h3>{data.title}</h3>
    <div>
      <Image image={data.image} />
    </div>
    {#if showDesc}
      <div class="desc">
        {@html data.description}
      </div>
    {/if}
    <div>{data.date}</div>
  </a>
  {#each data.participants as guest}
    <Guest data={guest} />
  {/each}
  {#if showOptions}
    <div id="options">
      <Options>
        <button on:click={() => console.log('edit')}>Edit</button>
        <button on:click={() => deleteEvent()}>Delete</button>
      </Options>
    </div>
  {/if}
</div>
