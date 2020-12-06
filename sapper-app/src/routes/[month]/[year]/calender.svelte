<script context="module">
  import axios from "axios";
  import { isOnDate } from "../../../helpers/date";

  export async function preload({ params }) {
    let { month, year } = params;
    month = parseInt(month);
    year = parseInt(year);
    const nrDays = new Date(year, month, 0).getDate();

    if (month > 12 || month < 1 || year < 2020) {
      this.error(400, "wrong calender date");
    }

    const res = await axios.get("http://localhost:1337/events");
    const events = res.data;

    const days = new Array(nrDays)
      .fill(undefined)
      .map((_, day) => new Date(year, month, day + 1))
      .map(d => {
        return {
          date: d.getDate(),
          events: events.filter(e => isOnDate(e.date, d))
        };
      });

    if (res.status === 200) {
      return { days, month, year };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let days;
  export let month;
  export let year;

  $: next = `${(month % 12) + 1}/${month === 12 ? year + 1 : year}/calender`;
  $: prev = `${month === 1 ? 12 : month - 1}/${
    month === 1 ? year - 1 : year
  }/calender`;
</script>

<style>
  /* your styles go here */
</style>

<a rel="prefetch" href={prev}>zurück</a>
<a rel="prefetch" href={next}>vor</a>
<h1>Kalender</h1>
{month} {year}
{#each days as day}
  <div>
    {day.date}
    {#each day.events as e}
    <a href="events/{e.id}">{e.title}</a>{/each}
  </div>
{/each}
