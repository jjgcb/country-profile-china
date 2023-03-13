<script>
import { browser } from '$app/environment';
import { setContext } from 'svelte';

import Header from "../../components/Carbon/Header.svelte";
import Footer from "../../components/Carbon/Footer.svelte";
import article from "../../article.json";

const contributors = article.contributors.map(d=>d.name).join(', ');
	
if(browser){
  const preferReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
  setContext("preferReducedMotion", preferReducedMotion);
}

</script>
<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=PT+Sans+Narrow:wght@400;700&family=PT+Serif:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<title>{article.title}</title>
	
	<meta name="author" content="{contributors}" />
	<meta property="article:publisher" content="https://www.facebook.com/carbonbrief/" />
	<meta property="article:published_time" content="{article.pubDate}" />
	<meta property="article:modified_time" content="{article.modifiedDate}" />
	
	<meta property="og:locale" content="en_GB" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{article.title}" />
	<meta property="og:description" content="{article.descrition}" />
	<meta property="og:url" content="{article.url}" />
	<meta property="og:site_name" content="Carbon Brief" />
	<meta property="og:image" content="{article.og.image.url}" />
	<meta property="og:image:width" content="{article.og.image.width}" />
	<meta property="og:image:height" content="{article.og.image.height}" />
	<meta property="og:image:type" content="{article.og.image.type}" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@carbonbrief" />
	<meta name="twitter:site" content="@carbonbrief" />
	<meta name="twitter:label1" content="By" />
	<meta name="twitter:data1" content="{contributors}" />

	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-5VXGM92');</script>
	<!-- End Google Tag Manager -->
	<script src="https://www.google-analytics.com/analytics.js"></script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-19777583-2"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	
	  gtag('config', 'UA-19777583-2');
	</script>
</svelte:head>
<Header></Header>
<slot></slot>
<Footer></Footer>