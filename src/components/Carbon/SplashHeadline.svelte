<script>
	export let headline = 'Headline goes here';
	export let image;
	export let backgroundPositionX = "center"; //center/left/right
	export let backgroundSize = "cover";
	export let photoCredit;
	export let currentSection = "";

	let chapter = [
		{ link: 'politics', name: 'Politics', selected:false },
		{ link: 'paris-pledge', name: 'Paris pledge', selected:false },
		{ link: 'oil-gas-and-coal', name: 'Oil, gas & coal', selected:false },
		{ link: 'nuclear', name: 'Nuclear', selected:false },
		{ link: 'renewables-including-hydropower', name: 'Renewables including hydropower', selected:false },
		{ link: 'deforestation-wood-burning-and-agriculture', name: 'Deforestation, wood burning and agriculture', selected:false },
		{ link: 'nature-based-solutions', name: "'Nature-based solutions'", selected:false },
		{ link: 'climate-finance', name: 'Climate finance', selected:false },
		{ link: 'impacts-and-adaptation', name: 'Impacts and adaptation', selected:false }
	];

$: chapter = chapter.map(ch=>{
		ch.selected = (ch.link == currentSection);
		return ch;
	});

</script>

<div class="fullbleed" style={`background-image:url("${image}"); background-position-y:top; background-position-x:${backgroundPositionX}; background-size:${backgroundSize}`}>
	<div class="center splash box">
		<h1 class="ragged">{headline}</h1>
	</div>
	<span class="photo-credit">{ photoCredit }</span>
</div>
<nav class="horizontal-nav">
	<ul class="chapters">
		<div class="sections">Sections: </div>
		
		{#each chapter as { link, name, selected }, i}
			<li><a href="#{link}" class={selected?"highlight":""} rel="noreferrer">
				<!-- {i + 1}:  -->
				{name}
			</a></li>
		{/each}
		<div class="right-chev">&rsaquo;</div>
	</ul>
</nav>



<style>
	.fullbleed {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
		background-color: #0C2635;
		background-repeat: no-repeat;
	}

	@media (max-width:1800px){
		.fullbleed{
			background-size: cover;
			/* background-position-x: center; */
			background-position: bottom;
		}
	}
	.splash {
		height: 80vh;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.splash h1{
		font-size: var(--s3);
		width: 60%;
		text-align: center;
		color: var(--color-light-text);
		text-shadow: 2px 2px 8px #333333;
	}

	.photo-credit{
		position:absolute;
		bottom: 5px;
		right: 0px;
		text-align: end;
		color: #f4f4f4;
		padding-right:var(--s-1);
		float: right;
		font-weight: bold;
	}

	@media (max-width:810px){
		.splash h1{
			font-size: 3em;
			width: 66%;
			line-height: 1.5em;
		}
	}

	@media (max-width:550px){
		.splash h1{
			font-size: 2.6em;
			width: 100%;
			line-height: 1.5em;
		}
	}

	/* NAV */

	.horizontal-nav{
		height: 35px;
		background-color: #f4f4f4;
		border-bottom: 0.6px solid #333333;
		width: 100%;
		display: flex;
		position: sticky;
		top: 54px;
		z-index: 1000;
		overflow-x: scroll;
		overflow-y: hidden;
		margin-block-start: 0;
		padding-left: 0;
		padding-right: 0;
		margin-left: 0;
		margin-right: 0;
		-ms-overflow-style: none;  /* IE and Edge */
  		scrollbar-width: none;  /* Firefox */
	}
	.horizontal-nav::-webkit-scrollbar {
  		display: none;
	}
	@media (min-width:1660px){
		.horizontal-nav{
			justify-content: center;
		}
		.right-chev{
			display: none;
		}
	}
	ul.chapters{
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		padding-top: 0;
		margin: 0;
	}
	.sections{
		position: sticky;
		background: #4a6154;
		height: calc(100vh - 40px);
		left: 0px;
		margin-left: -5em;
		margin-right: 3em;
		padding-right: 2.5em;
		padding-top: 0.4em;
		padding-left: 1.8em;
		color: white;
		list-style-type: none;
		font-size: 1.3em;
		text-align: center;
		border-right: solid 1px #333333;
	}

	.right-chev{
		position: sticky;
		right: 0px;
		padding: 0.1em 0.3em 0.1em 1.2em;
		color: white;
		font-size: large;
		font-weight: bold;
		background: rgb(74,97,84);
		background: linear-gradient(90deg, rgba(74,97,84,0) 0%, rgba(74,97,84,0.3477984943977591) 50%, rgba(74,97,84,1) 100%);
	}
	.chapters li{
		list-style-type: none;
		font-size: 1.2em;
		padding: 0 1.3em;
		text-align: center;
		min-width: fit-content;
		width: auto;
		border-right: 0.7px solid #333333;
	}
	.chapters li:last-child{
		padding-right: 5em;
	}
	.chapters li a{
		text-decoration: none;
	}

	.chapters li a.highlight{
		background-color: red;
	}

	:global(h2){
		scroll-margin-top: 100px;
	}

</style>
