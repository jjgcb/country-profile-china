<script>
import SplashHeadline from "$carbon/SplashHeadline.svelte";
import article from "$article";

import Infographic from '$carbon/Infographic.svelte';

import ProfileSelector from "$carbon/ProfileSelector.svelte"

import StandFirst from '$carbon/StandfirstCredits.svelte';
import CopyIntro from "$copy/01-Intro.md";
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
    <SplashHeadline 
        headline={article.title} 
        credits={article.contributors}
        publishDate={new Date(article.pubDate)}
        updatedDate={new Date(article.updatedDate)}
		image={"images/export-02.jpg"}
		backgroundPositionY={"bottom"}
		photoCredit="Graphic: Carbon Brief. Credit: Alamy Stock Photo."
        photoCreditLink="https://www.tate.org.uk/art/artworks/wilson-llyn-y-cau-cader-idris-n05596">
    </SplashHeadline>
    <StandFirst
        credits={article.contributors}
        publishDate={new Date(article.pubDate)}> 
    </StandFirst>
        <article class="stack" id="top">
        <CopyIntro></CopyIntro>

        <Infographic></Infographic>

        <CopyChapter1></CopyChapter1>
        <ProfileSelector
            options={data.countryProfiles}
            on:select={ev => locatorCountry = ev.detail.value ? ev.detail.value : undefined }>
            <div class="globe" slot="illustration">
                <GlobeLocator country={locatorCountry} mapData={mapdata}></GlobeLocator>
            </div>
            <p slot="placeholder">PPPPP</p>
        </ProfileSelector>
        
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
    .fullbleed{
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
        background-color: var(--color-dark-background);
    }
    .fullbleed img{
        /* width:100%; */
        box-sizing: content-box;
        margin-inline: auto;
    }
    
    figcaption{
        color: var(--color-light-text);
        width: var(--readable-max-width);
    }
</style>

<!-- <ChartFrame title="A bar chart" subtitle="">
            <BarChart
                margin={{top:0,left:200,bottom:60,right:10}}
                data={data.costliestWeatherDisasters}
                valueAccessor={d=>Number(d["Economic cost (bn US$)"])}
                labelAccessor={d=>d["Event"]}
            >
            </BarChart>
        </ChartFrame> -->

 <!-- <ChartFrame title="A categorical key" source="" subtitle="">
            <CategoryKey
                label="Countries with a climate finance"
                data={[{key:'surplus',value:lightBlue},{key:'shortfall',value:red}]}
                vertical={true}>
            </CategoryKey>
        </ChartFrame> -->
        <!-- <ChartFrame title="A data download link" source="" subtitle="">
            <DataDownload dataSet={data.costliestWeatherDisasters}></DataDownload>
        </ChartFrame> -->
        <!-- <ChartFrame title="A continuous colour key" source="" subtitle="">
            <ContinuousColorKey
                unit={"%"}
            >
            </ContinuousColorKey>
        </ChartFrame> -->
        <!-- <h2 id="html-css-ref">HTML/ CSS quick reference</h2>
        <hr>
        <h1>Level 1 heading</h1>
        <h2>Level 2 heading</h2>
        <h3>Level 3 heading</h3>
        <h4>Level 4 heading</h4>
        <hr>
        <ColorPalette></ColorPalette>
        <SizeReference></SizeReference>
        <figure class="fullbleed stack box">
            <img src="images/place-holder.png" alt="placeholder">
            <figcaption class="center">A place holder image with a full bleed background.</figcaption>
        </figure> -->