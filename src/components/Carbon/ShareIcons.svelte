<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script>
	import article from "../../article.json";
	export let pageURL = 'https://interactive.carbonbrief.org/the-carbon-brief-profile-pakistan/';
	export let utmMedium = 'shareicon';
	export let utmCampaign = 'interactivePageDefault';
	export let utmSource = 'subdomain';
	export let shareTitle = `${article.title} | @CarbonBrief`;
	export let longTitle = `${article.title} ${article.description}`;
</script>

<div class="cluster">
	<a
		class="social-icon twitter"
		href="https://twitter.com/intent/tweet?url={pageURL}?utm_source={utmSource}&utm_medium={utmMedium}&utm_campaign={utmCampaign}&text={encodeURIComponent(shareTitle)}"
		target="_blank"
	>	
		<i class="fa-brands fa-twitter"></i>
		<span class="screenreader-only">Share to Twitter</span>
	</a>
	<a
		class="social-icon facebook"
		href="https://www.facebook.com/sharer/sharer.php?u={pageURL}?utm_source={utmSource}&utm_medium={utmMedium}&utm_campaign={utmCampaign}"
		target="_blank"
	>
		<i class="fa-brands fa-facebook"></i>
		<span class="screenreader-only">Share to Facebook</span>
	</a>
	<a
		class="social-icon linkedin"
		href="https://www.linkedin.com/shareArticle?mini=true&url={pageURL}?utm_source={utmSource}&utm_medium={utmMedium}&utm_campaign={utmCampaign}&title={longTitle}&source=Carbon%20Brief"
		target="_blank"
	>
		<i class="fa-brands fa-linkedin"></i>
		<span class="screenreader-only">Share to Linkedin</span>
	</a>
</div>

<style>
		.cluster{
			gap: var(--space, 0.7rem);
		}
	/* .social-icon {
		display: inline-block;
		width: 1.6rem;
		height: 1.6rem;
		background-size: contain;
		background-repeat: no-repeat;
		border-radius: 20px;
	} */
	.fa-brands{
		font-weight: 400;
		font-size: 1.4em;
		color: #0C2635;
		background-color: #f4f4f4;
		padding: 0.3em;
		border-radius: 15px;
	}
	.fa-brands:hover{
		opacity: 0.8;
	}
	.cluster {
		justify-content: flex-end;
	}
</style>
    