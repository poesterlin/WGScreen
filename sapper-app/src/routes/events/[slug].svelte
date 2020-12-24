<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { humanReadableDate } from "../../helpers/date";
  import { server } from "../../helpers/env";

  export async function preload({ params }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await axios.get(server + "events/" + params.slug);
    const event = res.data;
    event.description = marked(event.description || "");
    event.date = humanReadableDate(event.date);

    if (res.status === 200) {
      return { event };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Image from "../../components/Image.svelte";
  export let event;
</script>

<style>

</style>

<svelte:head>
  <title>{event.title}</title>
</svelte:head>

<h1>{event.title}</h1>

<div class="content">
  {@html event.description}
</div>
{event.date}
<Image image={event.image} size="large" />
