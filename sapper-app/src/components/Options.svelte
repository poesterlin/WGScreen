<script>
  let opened = false;

  export function close() {
    opened = false;
  }
</script>

<style>
  #options:hover {
    box-shadow: 2px -1px #cdcdcd;
  }

  #options {
    border: 1px solid gray;
    padding: 0px 4px 18px 5px;
    cursor: pointer;
    background: white;
    display: block;
    height: 40px;
    width: 40px;
    line-height: 1px;
    outline: 0;
    font-size: 30px;
    transform: rotate(90deg);
  }

  #buttons {
    position: absolute;
    display: flex;
    top: 104%;
    left: 0px;
    flex-direction: row;
    flex-wrap: wrap;
    width: 60px;
    gap: 2px;
    box-shadow: 1px 1px 5px #d8d6d6;
    background: #ffffff8a;
  }

  :global(div#buttons > button) {
    flex: 1 1 100%;
    background: white;
    border: 1px solid #d2d2d2;
    height: 30px;
    text-align: start;
  }
</style>

<button id="options" class:opened on:click={() => (opened = !opened)}>
  ...
</button>
{#if opened}
  <div id="buttons">
    <slot>
      <button>no options</button>
    </slot>
  </div>
{/if}
