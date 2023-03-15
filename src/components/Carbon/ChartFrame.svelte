<script>
	export let title = 'CHART TITLE';
	export let subtitle = 'chart subtitle';
	export let source = 'Carbon Brief';
	export let footnotes = '';
</script>

<section class="chart-frame box stack">
	<div>
		<h2 class="title">{@html title}</h2>
		{#if subtitle != ''}<p class="subtitle">{subtitle}</p>{/if}
	</div>
	<div class="graphic stack">
		<slot />
	</div>
	<div>
		{#if source != ''}<p class="source">Source: {source}</p>{/if}
		{#if footnotes != ''}
			<p class="footnotes">{footnotes}</p>
		{/if}
	</div>
</section>

<style>
	.chart-frame {
		font-family: var(--sans-serif);
		background-color: white;
		width: 100%;
		max-width: var(--readable-max-width);
		margin: 0 auto;
	}

	.source,
	.footnotes {
		font-family: var(--sans-serif);
		font-size: var(--s0);
		color: var(--color-supplementary-text);
		margin-right: var(--s4);
		line-height: var(--s1);
	}
	.source {
		font-style: italic;
	}
	.subtitle,
	h2,
	.footnotes,
	.source {
		font-family: var(--sans-serif);
		margin-inline: 0;
		font-weight: normal;
	}

	.source {
		margin-top:-2.6rem;
	}

	.subtitle, .title{
		line-height: 1.78rem;
	}
	.subtitle{
		margin-top: var(--s-3);
	}
	h2{
		font-size: 1.875rem;
		font-family: var(--sans-serif-narrow);
    font-weight: 700;
	}

	.chart-frame.stack {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.chart-frame.stack > * {
		margin-block: 0;
	}

	.chart-frame.stack > * + * {
		margin-block-start: var(--s0, 1.5rem);
	}

	@media only screen and (max-width: 620px) {
		.title{
			font-size: var(--s1);
			line-height: var(--s1);
		}
    .subtitle, .source{
			font-size: var(--s0);
			line-height: var(--s0);
		}
	}

	@media only screen and (max-width: 500px) {
    .subtitle{
			font-size: var(--s0);
			line-height: var(--s0);
			margin-top: var(--s-1);
		}
	}


</style>
