<script>
    import StandFirstCopy from "$copy/0-StandFirst.md";
	export let credits = [];
	export let publishDate = new Date();

	let authors = credits.filter(c=>c.role=="author");
	let designers = credits.filter(c=>c.role=="design");

</script>

<section class="full-bleed container stack box">
    <StandFirstCopy></StandFirstCopy>

<div class="credit">
    <p>
    {#if authors.length > 0}
        By
    {#each authors as credit, i}
        <a class="author" href="{credit.url}">{credit.name}</a>{#if (i == authors.length - 2)}&nbsp;and&nbsp;{:else if i == authors.length -1}{:else}, &nbsp;{/if}
    {/each}
    {/if}
    </p>
    <p>
    {#if designers.length > 0}
        Design by
    {#each designers as credit, i}
        <a class="author" href="{credit.url}">{credit.name}</a>{#if i != designers.length -1}&nbsp;and&nbsp;{:else if i == designers.length -1}{:else}, &nbsp;{/if}
    {/each}
    {/if}
    </p>
    <p>
        <time datetime={publishDate}>{publishDate.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}</time>
    </p>
</div>

<!-- <img class="inline-break" src="images/coffeeicon-2.png" alt=""/> -->

</section>
<style>
.full-bleed{
    width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;
        margin-bottom: 3em;
        margin-top: 0;
  }
  /* .container{
    background-color: #5d4947;
    color: var(--coffeeFlatWhite);
  } */

.credit{
    box-sizing: content-box;
	width: 100%;
	max-width: var(--readable-max-width);
	margin: auto;
    margin-top: 1em;
	margin-bottom: 0.4em;

}

.credit p{
		color: #333333;
		line-height: 1.4em;
		font-size:1.1rem;
        text-align: center;
	}

	.credit a {
		color: #333333;
	}

    .credit a:hover {
		color: var(--coffeeTangerineDark);
        cursor: pointer;
	}

	.author{
		color: var(--color-light-text);
		text-decoration: underline;
	}

    /* img.inline-break{
        width: 100%;
        height: auto;
        max-width: 90px;
        margin: auto;
        padding-bottom: 0;
    } */

    @media (max-width:550px){
		.splash .credit p{
			width: 90%;
		}
	}
</style>