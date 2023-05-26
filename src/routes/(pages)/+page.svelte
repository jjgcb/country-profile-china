<script>
import SplashHeadline from "$carbon/SplashHeadline.svelte";
import article from "$article";

import ProfileSelector from "$carbon/ProfileSelector.svelte"

import StandFirst from '$carbon/StandfirstCredits.svelte';
import CopyIntro from "$copy/01-Intro.md";
import CopyIntro2 from "$copy/01-Intro-2.md";
import CopyChapter1 from "$copy/1-Politics.md";
import CopyChapter2 from "$copy/2-Paris.md";
import CopyChapter3 from "$copy/3-OilGasCoal.md";
import CopyChapter4 from "$copy/4-Nuclear.md";
import CopyChapter5 from "$copy/5-Renewables.md";
import CopyChapter6 from "$copy/6-Deforestation.md";
import CopyChapter7 from "$copy/7-NatureBased.md";
import CopyChapter8 from "$copy/8-ClimateFinance.md";
import CopyChapter9 from "$copy/9-Impacts.md";

import { onMount } from 'svelte';
import { browser } from '$app/environment';
import * as topojson from 'topojson-client';
import GlobeLocator from "$components/GlobeLocator.svelte";

// "data" is an object containing parsed data objects from static/data.
export let data;
let innerWidth = 700;

console.log(`PRE LOADED DATA`, Object.keys(data))

let mapdata={
    land: {},
    borders: {},
    outline: {type: "Sphere"},
    countryLookup: {}
}

onMount(()=>{
    if(browser){
        fetch('data/iso-110m.topo.json')
            .then(res=>res.json())
            .then(topo=>{
                mapdata.land = topojson.feature(topo, topo.objects.land).features[0];
                let countryEntries = topojson.feature(topo, topo.objects.countries)
                    .features.map(feature=>{
                        return [feature.properties.iso, feature]
                    });
                mapdata.countryLookup = Object.fromEntries(countryEntries);
                mapdata.borders = topojson.mesh(topo, topo.objects.countries);
                mapdata = mapdata;
            })
    }
});
let locatorCountry = '';
</script>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5VXGM92"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
<svelte:window bind:innerWidth />
    <SplashHeadline 
        headline={article.title} 
        credits={article.contributors}
        publishDate={new Date(article.pubDate)}
        updatedDate={new Date(article.updatedDate)}
		image={"images/hero.webp"}
		backgroundPositionY={"bottom"}
		photoCredit="Graphic: Carbon Brief. Credit: Alamy Stock Photo."
        photoCreditLink="">
    </SplashHeadline>
    <StandFirst
        credits={article.contributors}
        publishDate={new Date(article.pubDate)}> 
    </StandFirst>
        <article class="stack" id="top">
        <CopyIntro></CopyIntro>
        <ProfileSelector
        options={data.countryProfiles}
        on:select={ev => locatorCountry = ev.detail.value ? ev.detail.value : undefined }>
        <div class="globe" slot="illustration">
            <GlobeLocator country={locatorCountry} mapData={mapdata}></GlobeLocator>
        </div>
        <p slot="placeholder"></p>
        </ProfileSelector>
        <CopyIntro2></CopyIntro2>
        {#if innerWidth > 1200}
            <img class="wide" src="images/pakistan-infographic-wide-01.png" alt="Pakistan graphic showing national emissions and energy consumption."/>
        {:else if innerWidth > 600}
            <img class="inline" src="images/pakistan-infographic-square-01.png" alt="Pakistan graphic showing national emissions and energy consumption.">
        {:else}
            <img class="inline mobile" src="images/pakistan-infographic-mobile-01.png" alt="Pakistan graphic showing national emissions and energy consumption.">
        {/if}

        <CopyChapter1></CopyChapter1>
        <CopyChapter2></CopyChapter2>
        <CopyChapter3></CopyChapter3>
        <CopyChapter4></CopyChapter4>
        <CopyChapter5></CopyChapter5>
        <CopyChapter6></CopyChapter6>
        <CopyChapter7></CopyChapter7>
        <CopyChapter8></CopyChapter8>
        <CopyChapter9></CopyChapter9>
</article>
<style>

    .globe{
        display: flex;
        justify-content: flex-end;
        margin: auto;
        margin-right: 0;
        position: relative;
        top: 0.5em;
    }

    article{
        max-width:var(--page-max-width,1270px);
        margin: 0 auto;
        margin-top:var(--s1);
    }
</style>