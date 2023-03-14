<script>
	export let headline = 'Headline goes here';
	export let credits = [];
	export let publishDate = new Date();
	export let updatedDate = new Date();
	export let image;
	export let backgroundPositionX = "center"; //center/left/right
	export let backgroundPositionY = "center"; // bottom/center/top
	export let backgroundSize = "cover";
	export let photoCredit;

	let authors = credits.filter(c=>c.role=="author");
	let designers = credits.filter(c=>c.role=="design");

</script>

<div class="fullbleed" style={`background-image:url("${image}"); background-position-y:${backgroundPositionY}; background-position-x:${backgroundPositionX} background-size:${backgroundSize}`}>
	<div class="center splash box">
		<h1 class="ragged">{headline}</h1>
		<div class="credit">
			<p>
			{#if authors.length > 0}
				By
			{#each authors as credit, i}
				<a class="author" href="{credit.url}">{credit.name}</a>{#if i != authors.length -1}&nbsp;and&nbsp;{:else if i == authors.length -1}.{:else}, &nbsp;{/if}
			{/each}
			{/if}
			</p>
			<p>
			{#if designers.length > 0}
				Design by
			{#each designers as credit, i}
				<a class="author" href="{credit.url}">{credit.name}</a>{#if i != designers.length -1}&nbsp;and&nbsp;{:else if i == designers.length -1}.{:else}, &nbsp;{/if}
			{/each}
			{/if}
			</p>
			<p>
				<time datetime={publishDate}>{publishDate.toLocaleDateString('en-GB', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}</time>
					<span class="last-updated">Last updated:</span>
					<time datetime={updatedDate}>{updatedDate.toLocaleDateString('en-GB', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}</time>
			</p>
		</div>
	</div>
	<span class="photo-credit">{ photoCredit }</span>
</div>

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

	@media (max-width:1029px){
		.fullbleed{
			background-size: cover;
			background-position-x: center;
		}
	}
	.splash {
		height: 75vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.splash h1{
		display: block;
		padding-left:var(--s1);
		width: 50%;
		color: var(--color-light-text);
		text-shadow: 2px 2px 8px #333333;
	}
	.splash .credit p{
		padding-left:var(--s1);
		width: 50%;
		color: var(--color-light-text);
		text-shadow: 2px 2px 8px #333333;
		line-height: var(--s1);
		font-size: var(--s0);
	}

	.credit a {
		color: var(--color-light-text);
	}

	.author{
		color: var(--color-light-text);
		text-decoration: underline;
	}

	.photo-credit{
		position:relative;
		bottom: 5px;
		right: 0px;
		text-align: end;
		color: #333333;
		padding-right:var(--s-1);
		float: right;
		font-weight: bold;
	}

	.last-updated{
		margin-left: 2em;
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
		.splash .credit p{
			width: 90%;
		}
	}
</style>
