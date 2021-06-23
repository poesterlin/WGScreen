<script>
	import QRCode from '../components/QrCode.svelte';
	import { base, port } from '../helpers/env';
</script>

<div>
	<QRCode codeValue={'http://' + base + ':' + port + '/upload'} squareSize="400" />
	<br />
	<br />
	<span>oder:</span>
	<br />
	<br />
	<a href={'http://' + base + ':' + port + '/upload'}>Direkter Upload</a>
</div>

<style>
	div {
		position: fixed;
		display: inline-block;
		width: 400px;
		height: 400px;
		top: calc(50vh - 200px);
		left: calc(50vw - 200px);
	}
</style>
