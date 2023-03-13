<script>
	import CarbonLogo from './Logo.svelte';
	import CarbonShareIcons from './ShareIcons.svelte';
</script>

<header class="box">
	<CarbonLogo monochrome={false} light={true} />
	<CarbonShareIcons />
</header>
<div class="spacer"></div>

<style>
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
