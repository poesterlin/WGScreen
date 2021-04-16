<script>
  import axios from "axios";

  let res = [];
  let query = "";

  async function auth() {
    const req = await axios.get(`/search/${query}`);
    res = req.data;
  }

  auth();
</script>

<input type="text" bind:value={query} /> <button on:click={() => auth()}>search</button>

{#if res && res.length > 0}
  <iframe
    frameborder="0"
    scrolling="no"
    marginheight="0"
    marginwidth="0"
    width="600"
    height="400"
    type="text/html"
    src="https://www.youtube.com/embed/{res[0].id.videoId}?autoplay=1&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&vq=small&origin=https://youtubeembedcode.com"
    title={res[0].snippet.title}
  >
    <div><small><a href="https://youtubeembedcode.com/de/">https://youtubeembedcode.com/de/</a></small></div>
    <div><small><a href="https://enablecookies.info">How to enable cookies on chrome</a></small></div>
    <div><small><a href="https://youtubeembedcode.com/es/">youtubeembedcode es</a></small></div>
    <div><small><a href="https://www.unorules.org/uno-attack-rules/">Uno rules</a></small></div></iframe
  >
{/if}
