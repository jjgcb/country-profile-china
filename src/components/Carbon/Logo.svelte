<script>
	export let monochrome = false;
	export let light = false;
</script>

<div class="logo" class:monochrome class:light>
	<a href="https://www.carbonbrief.org" class="logo-link">
		<span class="screenreader-only">Carbon Brief</span>
	</a>
</div>

<style>
	.logo {
		background-image: url('/images/cb-logo-full.svg');
		background-size: contain;
		width: 100%;
		height: 2rem;
		background-repeat: no-repeat;
		opacity: 0.95;
	}
	.logo.light{
		background-image: url('/images/cb-logo-full-light.svg');
	}
	.logo.monochrome {
		background-image: url('/images/cb-logo-full-mono.svg');
	}
	.logo.monochrome.light {
		background-image: url('/images/cb-logo-full-mono-light.svg');
	}
	.logo-link {
		display: inline-block;
		width: 100%;
		height: 100%;
	}
</style>
