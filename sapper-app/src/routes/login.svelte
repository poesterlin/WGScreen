<script>
  import axios from "axios";
  import { goto } from "@sapper/app";

  let pin = "1234";

  async function send() {
    await axios.get("testpin/" + pin, { withCredentials: true });
    await goto("/events");
    location.reload();
  }
</script>

Enter Code:
<input type="text" bind:value={pin} placeholder="input pin" />
<button on:click={send}>send</button>
