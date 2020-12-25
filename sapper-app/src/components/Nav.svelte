<script lang="ts">
  import { goto } from "@sapper/app";
  export let segment;

  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  let routeTimeout;
  $: {
    routeTimeout ? undefined : makeTimeout();
  }
  makeTimeout();

  function makeTimeout() {
    routeTimeout = setTimeout(() => {
	  goToScreenSaver();
	  routeTimeout = undefined;
    }, 1000 * 180);
  }

  function interaction() {
    clearTimeout(routeTimeout);
    makeTimeout();
  }

  async function goToScreenSaver() {
    await goto("/screensaver");
  }
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<svelte:window
  on:touchstart={() => interaction()}
  on:touchmove={() => interaction()}
  on:touchend={() => interaction()}
  on:touchcancel={() => interaction()} />
<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        Home
      </a>
    </li>
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'events' ? 'page' : undefined}
        href="events">
        Events
      </a>
    </li>
    <li>
      <a
        rel="prefetch"
        aria-current={parseInt(segment) + 1 ? 'page' : undefined}
        href="{month}/{year}/calender">
        Kalender
      </a>
    </li>
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'guests' ? 'page' : undefined}
        href="guests">
        Gäste
      </a>
    </li>
  </ul>
</nav>
