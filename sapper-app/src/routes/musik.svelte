<script context="module">
  import axios from "axios";
  import { server, makeAuth } from "../helpers/env";
  import { shuffle } from "../helpers/math";

  export async function preload(_, session) {
    let history = [];
    try {
      history = (await axios.get(server + "history_records", makeAuth(session))).data;
      console.log(history);
    } catch (error) {}

    return {
      history: shuffle(history),
    };
  }
</script>

<script>
  import { stores } from "@sapper/app";
  const { session } = stores();
  export let history;

  let res;
  let query = "";

  async function loadResults() {
    const req = await axios.get(`/search/${query}`);
    res = req.data[0];
    await makeHistoryRecord(res);
  }

  async function makeHistoryRecord(youtubeRes) {
    const record = {
      youtubeId: youtubeRes.id.videoId,
      title: youtubeRes.snippet.title,
      artist: youtubeRes.snippet.channelTitle,
      thumbnail: youtubeRes.snippet.thumbnails.default.url,
    };

    const res = await axios.post(server + "history_records", record, makeAuth($session));
    console.log(res);
  }

  async function deleteRecord(id) {
    await axios.delete(server + "history_records/" + id, makeAuth($session));
  }
</script>

<input type="text" bind:value={query} /> <button on:click={() => loadResults()}>search</button>

<div>
  {#each history as hist}
    {hist.title}
    {hist.artist}
    {hist.youtubeId}
    <button on:click={({ id }) => deleteRecord(id)}>delete</button>
  {/each}
</div>

{#if res}
  <iframe
    frameborder="0"
    scrolling="no"
    marginheight="0"
    marginwidth="0"
    width="600"
    height="400"
    type="text/html"
    src="https://www.youtube.com/embed/{res.id.videoId}?autoplay=1&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&vq=small&origin=https://youtubeembedcode.com"
    title={res.snippet.title}
  >
    <div><small><a href="https://youtubeembedcode.com/de/">https://youtubeembedcode.com/de/</a></small></div>
    <div><small><a href="https://enablecookies.info">How to enable cookies on chrome</a></small></div>
    <div><small><a href="https://youtubeembedcode.com/es/">youtubeembedcode es</a></small></div>
    <div><small><a href="https://www.unorules.org/uno-attack-rules/">Uno rules</a></small></div></iframe
  >
{/if}
