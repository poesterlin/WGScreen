<script>
  import Image from "./Image.svelte";
  export let data;
</script>

<style>
  a {
    display: flex;
    text-decoration: none;
    align-items: center;
    flex: 1 1 120px;
    max-width: min-content;
    justify-content: space-around;
  }
  span {
    margin-right: 5px;
  }
</style>

<a rel="prefetch" href="guests/{data.id}">
  <span>{data.name}</span>
  <Image round image={data.picture} />
</a>
