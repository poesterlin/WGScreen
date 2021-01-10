<script>
  import Image from "./Image.svelte";
  export let data;
</script>

<style>
  div {
    display: flex;
    align-items: center;
    flex: 1 1 100%;
    height: 100%;
    max-width: min-content;
    min-width: 100%;
    justify-content: space-between;
  }
  span {
    margin-right: 5px;
  }
</style>

<div>
  <span>{data.name}</span>
  <Image imageObj={{image: data.picture}} cover round />
</div>
