<script>
  import Image from "./Image.svelte";
  export let data;
</script>

<style>
  a {
    display: block;
    text-decoration: none;
  }
</style>

<a rel="prefetch" href="guests/{data.id}">
  <span>{data.name}</span>
  <Image round image={data.picture} />
</a>
