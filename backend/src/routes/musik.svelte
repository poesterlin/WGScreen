<script context="module">
	import axios from 'axios';
	import { iH, server } from '../helpers/env';
	
	export async function load({ page, fetch, session, context }) {
		const history = await fetch(server + 'records', iH()).then((r) => r.json());
		if(history && Array.isArray(history)){
			return {history};
		}
	}
</script>

<script>
	import { onMount } from 'svelte';
	export let history = [];
	
	onMount(()=>{
		// if (fully){
		// 	fully.startApplication("com.google.android.apps.youtube.music");
		// }
	})

	let res;
	let query = '';

	async function loadResults() {
		if (!query) {
			return;
		}
		const req = await axios.get(`/api/search?query=${query}`);
		res = makeHistoryRecord(req.data[0]);
		await saveRecord(res);
	}

	async function saveRecord(rec) {
		const res = await axios.post(server + 'records', rec);
		console.log(res);
	}

	function makeHistoryRecord(youtubeRes) {
		const record = {
			youtubeId: youtubeRes.id.videoId,
			title: youtubeRes.snippet.title,
			artist: youtubeRes.snippet.channelTitle,
			thumbnail: youtubeRes.snippet.thumbnails.default.url
		};
		return record;
	}

	async function deleteRecord({ id }) {
		await axios.delete(server + 'records/' + id);
		history.splice(
			history.findIndex((i) => i.id === id),
			1
		);
		history = [...history];
	}

	function load(hist) {
		if(fully){
			fully.startIntent(`https://www.youtube.com/watch?v=${res.youtubeId}`);
		} else {
			res = hist;
		}
	}
</script>

<section>
	<div class="search">
		<input type="text" bind:value={query} placeholder="Suche" />
		<button id="search" on:click={() => loadResults()}>
			<svg
				xmlns:svg="http://www.w3.org/2000/svg"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 500.00001 500.00001"
			>
				<defs id="defs4164" />
				<g transform="translate(0,-552.36216)">
					<g id="g1400" transform="translate(-4.3609793,-7.6704785)">
						<path
							id="path4714"
							d="M 232.83952,614.96702 A 154.04816,154.04794 0 0 0 78.79153,769.01382 154.04816,154.04794 0 0 0 232.83952,923.06184 154.04816,154.04794 0 0 0 386.88751,769.01382 154.04816,154.04794 0 0 0 232.83952,614.96702 Z m 0,26.77613 A 129.95832,127.2707 0 0 1 362.79832,769.01382 129.95832,127.2707 0 0 1 232.83952,896.28449 129.95832,127.2707 0 0 1 102.88194,769.01382 129.95832,127.2707 0 0 1 232.83952,641.74315 Z"
							style="opacity:1;fill:#2b0000;fill-opacity:1;stroke:none;stroke-opacity:1"
						/>
						<rect
							ry="18.08342"
							rx="33.249443"
							transform="matrix(0.65316768,0.7572133,-0.60689051,0.79478545,0,0)"
							y="319.55432"
							x="794.8775"
							height="36.16684"
							width="173.02675"
							style="opacity:1;fill:#2b0000;fill-opacity:1;stroke:none;stroke-opacity:1"
						/>
					</g>
				</g>
			</svg>
		</button>
	</div>
	<div class="history">
		{#each history as hist}
			<div
				class="record"
				on:click={() => load(hist)}
				class:current={res && hist.youtubeId === res.youtubeId}
			>
				<img src={hist.thumbnail} alt={hist.title} />
				<span id="title" class="ellipse">{hist.title}</span>
				<span id="artist" class="ellipse">{hist.artist}</span>
				<button id="del" on:click={() => deleteRecord(hist)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -256 1792 1792"
					>
						<g transform="matrix(1,0,0,-1,197.42373,1255.0508)" id="g3743">
							<path
								d="M 512,800 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z m 256,0 V 224 q 0,-14 -9,-23 -9,-9 -23,-9 h -64 q -14,0 -23,9 -9,9 -9,23 v 576 q 0,14 9,23 9,9 23,9 h 64 q 14,0 23,-9 9,-9 9,-23 z M 1152,76 v 948 H 256 V 76 Q 256,54 263,35.5 270,17 277.5,8.5 285,0 288,0 h 832 q 3,0 10.5,8.5 7.5,8.5 14.5,27 7,18.5 7,40.5 z M 480,1152 h 448 l -48,117 q -7,9 -17,11 H 546 q -10,-2 -17,-11 z m 928,-32 v -64 q 0,-14 -9,-23 -9,-9 -23,-9 h -96 V 76 q 0,-83 -47,-143.5 -47,-60.5 -113,-60.5 H 288 q -66,0 -113,58.5 Q 128,-11 128,72 v 952 H 32 q -14,0 -23,9 -9,9 -9,23 v 64 q 0,14 9,23 9,9 23,9 h 309 l 70,167 q 15,37 54,63 39,26 79,26 h 320 q 40,0 79,-26 39,-26 54,-63 l 70,-167 h 309 q 14,0 23,-9 9,-9 9,-23 z"
								id="path3745"
								inkscape:connector-curvature="0"
								style="fill:currentColor"
							/>
						</g>
					</svg></button
				>
			</div>
		{/each}
	</div>

	<div class="frame">
		{#if res}
			<iframe
				frameborder="0"
				scrolling="no"
				marginheight="0"
				marginwidth="0"
				type="text/html"
				src="https://www.youtube.com/embed/{res.youtubeId}?autoplay=1&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&vq=small"
				title={res.title}
			/>
		{:else}
			<h3>select a video</h3>
		{/if}
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-areas:
			'search video'
			'history video';
		width: 100%;
		grid-template-rows: 40px 70vh;
		grid-template-columns: 275px auto;
		background: #3f3f3f;
		grid-gap: 5px;
		border: 3px solid #3f3f3f;
	}

	.frame {
		grid-area: video;
		background: gray;
		display: flex;
		place-content: center;
	}

	iframe {
		width: 100%;
		height: 100%;
	}

	h3 {
		height: min-content;
		color: #afafaf;
	}
	.search {
		grid-area: search;
		display: flex;
		height: 40px;
	}

	svg {
		width: 100%;
		height: 100%;
	}
	#search {
		flex: 1 1 25%;
	}

	input {
		height: 100%;
		flex: 4 1 100%;
		border: 0;
		padding-left: 15px;
		width: 200px;
		box-sizing: border-box;
	}

	.history {
		grid-area: history;
		background: rgb(206, 206, 206);
		overflow: auto;
	}

	.record {
		display: grid;
		grid-template-areas:
			'image title title'
			'image artist delete';
		grid-template-columns: 50px auto 40px;
		grid-template-rows: 30px 20px auto;
		margin: 6px;
		background: white;
		border-radius: 5px;
		padding: 5px;
		grid-gap: 0px 8px;
		border: 1px solid gray;
	}
	img {
		grid-area: image;
		max-width: 100%;
		max-height: 100%;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 75%;
	}
	.record.current {
		border: 1px solid rgb(255, 62, 0);
	}

	.ellipse {
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.record #title {
		grid-area: title;
	}
	.record #artist {
		grid-area: artist;
		color: gray;
		font-size: 70%;
	}

	.record:hover button#del {
		opacity: 1;
	}
	.record button#del {
		grid-area: delete;
		opacity: 0;
	}
</style>
