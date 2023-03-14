<script>
import SplashHeadline from "$carbon/SplashHeadline.svelte";
import CopyReadme from "$copy/readme.md";
import article from "$article";
import ColorPalette from "$components/ReferenceComponents/ColorPalette.svelte";
import SizeReference from "$components/ReferenceComponents/SizeReference.svelte";
import ChartFrame from "$carbon/ChartFrame.svelte";
import BarChart from "$carbon/BarChart.svelte";
import DataDownload from "$carbon/DataDownload.svelte";
import CategoryKey from "$carbon/CategoryKey.svelte";
import { lightBlue, red } from "$carbon/lib/cbColors"; 
import LineChart from "$carbon/LineChart.svelte";
import { timeFormat } from 'd3';
import LoremIpsum from "$copy/LoremIpsum.md";
	import ContinuousColorKey from "../../components/Carbon/ContinuousColorKey.svelte";
// import Select from "$carbon/Select.svelte";
import Select from 'svelte-select';

// "data" is an object containing parsed data objects from static/data.
// we won't always want to load the data statically, [particularly if it's very large]
export let data;
let items = [
        { value: 'Aus', label: 'Aus', class: 'aus'},
        { value: 'Bra', label: 'Bra', class: 'bra'},
        { value: 'Chi', label: 'Chi', class: 'chi'},
    ];
console.log(`PRE LOADED DATA`, Object.keys(data))

</script>
<div class="stack" id="top">
    <SplashHeadline 
        headline={article.title} 
        credits={article.contributors}
        publishDate={new Date(article.pubDate)}
        updatedDate={new Date(article.updatedDate)}
		image={"images/llyn-y-cau.webp"}
		backgroundPositionY={"bottom"}
		photoCredit="Richard Wilson Llyn-y-Cau, Cader Idris (1774), Photo &#169; Tate CC-BY-NC-ND 3.0 (Unported)"
        photoCreditLink="https://www.tate.org.uk/art/artworks/wilson-llyn-y-cau-cader-idris-n05596">
    </SplashHeadline>
    <article class="stack box">

        <div class="profile-selector-container {items.class}">
            <p>Carbon Brief Country Profiles</p>
            <p>Select a country from the series</p>
        <Select {items}></Select>
        <p>{items.label}</p>
        </div>

        
    
        <LoremIpsum/>


        <ChartFrame title="Pakistan GDP vs other top emitting countries" subtitle="">
            <LineChart 
            data={data.gdpPakistan}
            dateFormat={timeFormat('%Y')}
            dateExtent={[new Date(1960,0,0), new Date(2022,0,0)]}
            lineProperties={['Australia','Brazil','Canada','France','India','Indonesia','Iran','Japan','Mexico','Nigeria','Russia','Pakistan','South Africa','South Korea','Turkey','United States']}
            timeAccessor={row=>new Date(row.Year)}></LineChart>
        </ChartFrame>

        <ChartFrame title="Pakistan inflation % vs other top emitting countries" subtitle="">
            <LineChart 
            data={data.inflationPakistan}
            dateFormat={timeFormat('%Y')}
            dateExtent={[new Date(1960,0,0), new Date(2022,0,0)]}
            lineProperties={['Australia','Brazil','Canada','France','India','Indonesia','Iran','Japan','Mexico','Nigeria','Russia','Pakistan','South Africa','South Korea','Turkey','United States']}
            timeAccessor={row=>new Date(row.Year)}></LineChart>
        </ChartFrame>
        
       
    </article>
</div>
<style>

    .profile-selector-container{
        border: solid 1px grey;
        max-height: 300px;
        padding: 3em;
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