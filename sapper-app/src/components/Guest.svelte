<script>
  import Image from "./Image.svelte";
  export let data;
</script>

<style>

</style>

<span>
  <a rel="prefetch" href="guests/{data.id}">{data.name}</a>
</span>
<Image round image={data.picture} />
