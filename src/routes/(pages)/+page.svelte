<script>
import SplashHeadline from "$carbon/SplashHeadline.svelte";
import CopyReadme from "$copy/readme.md";
import article from "$article";
import ColorPalette from "$components/ReferenceComponents/ColorPalette.svelte";
import SizeReference from "$components/ReferenceComponents/SizeReference.svelte";
import ChartFrame from "$carbon/ChartFrame.svelte"; 
import LineChart from "$carbon/LineChart.svelte";
import { timeFormat } from 'd3';
import LoremIpsum from "$copy/LoremIpsum.md";
	import ContinuousColorKey from "../../components/Carbon/ContinuousColorKey.svelte";
// import Select from "$carbon/Select.svelte";

import Infographic from '$carbon/Infographic.svelte';

import CountryProfileSelector from "$carbon/CountryProfileSelector.svelte"

import StandFirst from '$carbon/StandfirstCredits.svelte';
import CopyIntro from "$copy/01-Intro.md";
import CopyChapter1 from "$copy/1-Politics.md";
import CopyChapter2 from "$copy/2-Paris.md";
import CopyChapter3 from "$copy/3-OilGasCoal.md";
import CopyChapter4 from "$copy/4-Nuclear.md";
import CopyChapter5 from "$copy/5-Renewables.md";
import CopyChapter6 from "$copy/6-Deforestation.md";
import CopyChapter7 from "$copy/7-ClimateFinance.md";
import CopyChapter8 from "$copy/8-NatureBased.md";
import CopyChapter9 from "$copy/9-Impacts.md";

import { onMount } from 'svelte';
import { browser } from '$app/environment';
import * as topojson from 'topojson-client';
import GlobeLocator from "$components/GlobeLocator.svelte";

// "data" is an object containing parsed data objects from static/data.
// we won't always want to load the data statically, [particularly if it's very large]
export let data;
let countries = [
        { iso: 'XXX', val: 'Select a country', text: '', class: ''},
        { iso: 'AUS', val: 'Australia', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'aus'},
        { iso: 'BRA', val: 'Brazil', text: 'Brazil, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'bra'},
        { iso: 'CAN', val: 'Canada', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'FRA', val: 'France', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'aus'},
        { iso: 'IND', val: 'India', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'bra'},
        { iso: 'IDN', val: 'Indonesia', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'IRN', val: 'Iran', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'aus'},
        { iso: 'JPN', val: 'Japan', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'bra'},
        { iso: 'MEX', val: 'Mexico', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'NGA', val: 'Nigeria', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'aus'},
        { iso: 'RUS', val: 'Russia', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'bra'},
        { iso: 'PAK', val: 'Pakistan', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'ZAF', val: 'South Africa', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'KOR', val: 'South Korea', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'TUR', val: 'Turkey', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'USA', val: 'United States', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
    ];
// let value = {value: ''};

let selected = '';
let current = 'foo';
let response = '';
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

let emptyPlaceholder = '<div class="emptyPlaceholder"></div>';
let locatorCountry = '';
// let countrySlug;
let profileLink = "https://www.carbonbrief.org/the-carbon-brief-profile-";
let readMore = '<a href="'+profileLink;
let readMore2 = '">Read more</a>';
</script>
    <SplashHeadline 
        headline={article.title} 
        credits={article.contributors}
        publishDate={new Date(article.pubDate)}
        updatedDate={new Date(article.updatedDate)}
		image={"images/export-01.jpg"}
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

        <!-- <img class="wide" src="images/pakistan-infographic.webp"/> -->

        <Infographic></Infographic>

        <CopyChapter1></CopyChapter1>
        <div class="profile-selector-container" id={selected}>
            <div class="profile-heading">
                <p>Carbon Brief Country Profiles</p>
                <p>Select a country from the series</p>
                <select name="countryProfiles" bind:value={selected} on:change="{() => response = ''}" on:change={()=>locatorCountry=selected.iso }>
                {#each countries as country}
                    <option value={country}>
                        {country.val}
                    </option>
                {/each}
                </select>
            </div>
            <div class="globe">
                <GlobeLocator country={locatorCountry} mapData={mapdata}></GlobeLocator>
            </div>
            <div class="country-intro">
                    {#if countries[0].iso != 'XXX'}             
                    {console.log(countries[0].iso)}
                    <p>{@html selected ? emptyPlaceholder : emptyPlaceholder }</p>
                    {:else}
                    <p>{@html selected ? selected.text+' '+readMore+selected.val+readMore2 : ""}</p>
                    {/if}
        
                <!-- <p>{@html selected ? emptyPlaceholder : emptyPlaceholder }</p> -->
            </div>
        </div>
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
.country-intro{
        /* border: solid red 2px; */
        height: 108px;
        width: 100%;
    }
    .profile-selector-container{
        border: solid 1px grey;
        max-height: 300px;
        padding: 3em;
        padding-bottom: 0;
        width: 100%;
        max-width: var(--readable-max-width);
        margin: auto;
        margin-top: var(--s2);
        display: flex;
        flex-wrap: wrap;
        align-content: flex-end;
        align-items: flex-start;
    }
    .profile-heading{
        margin-top:5em
    }
    select{
        width: 66%;
        height: 30px;
        border-radius: 5px;
        font-size: 1.4em;
        padding-left:0.3em;
    }
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