<script lang="ts">
	import { onMount } from 'svelte';

	export let segment;

	const month = new Date().getMonth() + 1;
	const year = new Date().getFullYear();
	let batteryLevel = '';

	onMount(async () => {
		if ('getBattery' in window.navigator) {
			// @ts-ignore
			const battery = await window.navigator.getBattery();
			battery.addEventListener('levelchange', (b) => (batteryLevel = b.level * 100 + '%'));
			batteryLevel = battery.level * 100 + '%';
		}
	});
</script>

<nav>
	<ul>
		<li>
			<a aria-current={segment === undefined ? 'page' : undefined} href="/"> Home </a>
		</li>
		<li>
			<a rel="prefetch" aria-current={segment === 'events' ? 'page' : undefined} href="/events">
				Events
			</a>
		</li>
		<li>
			<a
				rel="prefetch"
				aria-current={parseInt(segment) + 1 ? 'page' : undefined}
				href="{month}/{year}/calender"
			>
				Kalender
			</a>
		</li>
		<li>
			<a rel="prefetch" aria-current={segment === 'guests' ? 'page' : undefined} href="/guests">
				Gäste
			</a>
		</li>
		<li>
			<a
				rel="prefetch"
				aria-current={segment === 'uploadLink' ? 'page' : undefined}
				href="/uploadLink"
			>
				Upload
			</a>
		</li>
		<li>
			<a rel="prefetch" aria-current={segment === 'musik' ? 'page' : undefined} href="/musik">
				Musik
			</a>
		</li>
	</ul>
	<span>{batteryLevel}</span>
</nav>

<style>
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
		position: relative;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
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
		content: '';
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

	span {
		position: absolute;
		right: 10px;
		top: calc(50% - 0.9em);
		opacity: 0.2;
	}
</style>
