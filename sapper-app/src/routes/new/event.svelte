<script>
  import axios from "axios";
  import { goto } from "@sapper/app";

  let title = "";
  let description = "";

  async function submit() {
    const res = await axios.post("http://localhost:1337/events", {
      title,
      description,
      participants: [1],
      date: new Date().toISOString()
    });
    console.log("done");
    console.log(res);
    goto("/events")
  }
</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->

<input value={title} placeholder="Titel" type="text" />
<input value={description} placeholder="Beschreibung" type="text" />

<button on:click={() => submit()}>Erstellen</button>
