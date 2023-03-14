<script>
	import CarbonLogo from './Logo.svelte';
	import CarbonShareIcons from './ShareIcons.svelte';

	let chapter = [
		{ link: '1', name: 'Politics' },
		{ link: '2', name: 'Paris pledge' },
		{ link: '3', name: 'Coal' },
		{ link: '4', name: 'Low-carbon energy' },
		{ link: '5', name: 'Energy efficiency' },
		{ link: '6', name: 'Transport' },
		{ link: '7', name: 'Oil and gas' },
		{ link: '8', name: 'Agriculture and forests' },
		{ link: '9', name: 'Impacts and adaptation' },
		{ link: '10', name: 'Climate finance' }
	];
</script>

<header class="box">
	<CarbonLogo monochrome={false} light={true} />
	<CarbonShareIcons />
</header>
<nav class="horizontal-nav">
	<ul class="chapters">
		{#each chapter as { link, name }, i}
			<li><a target="_blank" href="#{link}" rel="noreferrer">
				{i + 1}: {name}
			</a></li>
		{/each}
	</ul>
</nav>
<div class="spacer"></div>

<style>
	.horizontal-nav{
	height: 35px;
    background-color: yellow;
    width: 100%;
    display: flex;
    position: sticky;
    top: 55px;
    z-index: 1000;
	overflow-x: scroll;
	}
	ul.chapters{
		display: inline-flex;
    flex-direction: row;
    flex-wrap: nowrap;
	margin-top: 0;
	}
	.chapters li{
		list-style-type: none;
		font-size: 1.2em;
		/* min-width: 100px; */
		margin: 0 1.3em;
		text-align: center;
		min-width: fit-content;
		width: auto;
	}
	.chapters li:last-child{
		padding-right: 5em;
	}
	.chapters li a{
		text-decoration: none;
	}

	.spacer{
		height:var(--s3);
	}
	header {
		height:var(--s3);
		display: grid;
		grid-template-columns: 1fr 1fr;
		background-color: #0C2635;
		color: var(--color-light-text);
		padding: 0.8em 1.6em;
		position: fixed;
		width: 100%;
		z-index: 1000;
	}
</style>
