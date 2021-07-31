<script>
	function open(id){
		if (fully){
			fully.startApplication(id);
		}
	}
</script>

<section>
	<button>
		<img on:click={()=>open("com.google.android.apps.youtube.music")} src="/Youtube_Music.svg" alt="">
		<p>Youtube Music</p>
	</button>
	<button>
		<img on:click={()=>open("com.google.android.youtube")} src="/Youtube.svg" alt="">
		<p>Youtube</p>
	</button>
</section>

<style>
	section {
		display: flex;
		width: 100%;
		height: 60vh;
		place-content: center;
		gap: 30%;
	}

	button {
		all: unset;
	}
	img{
		width: 100px;
		height: 100px;
	}

	p{
		text-align: center;
		color: rgb(180, 180, 180);
	}

	button{
		background: #475053;
		height: max-content;
		padding: 30px;
		margin-top: 20vh;
		box-shadow: 2px 3px 5px #80808061;
		border-radius: 16px;
	}
</style>
