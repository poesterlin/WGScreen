<script>
	import axios from 'axios';
	import { goto } from '$app/navigation';

	let pin = '';

	async function send() {
		await axios.get('/api/testpin', { withCredentials: true, params: { pin } });
		await goto('/events');
		location.reload();
	}
</script>

Enter Code:
<input type="text" bind:value={pin} placeholder="input pin"/>
<button on:click={send}>send</button>
