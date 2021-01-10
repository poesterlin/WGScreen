<script context="module">
  import axios from "axios";
  import marked from "marked";
  import { humanReadableDate } from "../../helpers/date";
  import { server, makeAuth } from "../../helpers/env";

  export async function preload({ params }, session) {
    const res = await axios.get(
      server + "events/" + params.slug,
      makeAuth(session)
    );
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
  import ImageGalerie from "../../components/ImageGalerie.svelte";
  import Guest from "../../components/Guest.svelte";

  export let event;
</script>

<style>
  .content > div {
    flex: 1 1 100%;
  }

  #guestList {
    display: flex;
    flex: 1 1 140px;
    width: 140px;
    max-width: 140px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .content {
    display: flex;
    flex-direction: row;
  }

  .guest {
    flex: 1 1 60px;
    max-width: min-content;
    margin: 5px 5px 0;
    background: #f8efec;
    padding: 3px 14px;
    border-radius: 15px;
    cursor: pointer;
    height: 60px;
  }
</style>

<svelte:head>
  <title>{event.title}</title>
</svelte:head>

<h1>{event.title}</h1>

<div class="content">
  <div>
    <div>
      {@html event.description}
    </div>
    {event.date}
    <div>
      <ImageGalerie images={event.images} size="large" />
    </div>
  </div>

  <div id="guestList">
    {#each event.participants as guest}
      <div class="guest">
        <a rel="prefetch" href="guests/{guest.id}">
          <Guest data={guest} />
        </a>
      </div>
    {/each}
  </div>

</div>
