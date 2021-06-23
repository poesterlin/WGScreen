<script lang="ts">
  import axios from "axios";
  import { server } from "../helpers/env";
  import Image from "../components/Image.svelte";

  let fileinput;
  let files = [];

  async function handleAddFile(event) {
    for (const file of event.target.files) {
      const data = new FormData();
      data.append("files.image", file, file.name);
      data.append("data", JSON.stringify({}));

      const res = await axios.post(server + "images", data, {
        headers: {
          "Content-Type": "form-data",
        },
      });
      files = [...files, { image: res.data, size: humanFileSize(file.size) }];
    }
  }

  function humanFileSize(bytes, dp = 1) {
    const thresh = 1000;

    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }

    const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );

    return bytes.toFixed(dp) + " " + units[u];
  }
</script>

<style>
  #list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 80vw;
    margin: auto;
  }
  input {
    display: none;
  }
  .item {
    display: flex;
    flex-direction: column;
  }
</style>

<h1>Upload</h1>

<img
  src="https://static.thenounproject.com/png/625182-200.png"
  alt="Upload"
  on:click={() => {
    fileinput.click();
  }} />
<input
  type="file"
  accept=".jpg, .jpeg, .png"
  multiple
  on:change={(e) => handleAddFile(e)}
  bind:this={fileinput} />

<div id="list">
  {#each files as item}
    <div class="item">
      <Image imageObj={item.image} />
      <span>Größe: {item.size}</span>
    </div>
  {:else}Lade Bilder hoch{/each}
</div>
