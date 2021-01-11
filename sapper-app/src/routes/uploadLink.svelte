<script>
  import QRCode from "../components/QrCode.svelte";
  import { base, port } from "../helpers/env";
</script>

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

<div>
  <QRCode
    codeValue={'http://' + base + ':' + port + '/upload'}
    squareSize="400" />
</div>
