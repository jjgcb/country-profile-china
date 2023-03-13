<script>
  import CopyWIP from "$copy/work-in-progress.md";
  import DivergingBarChart from "$components/WIP/DivergingBarChart.svelte";
  import ScatterPlot from "$components/WIP/ScatterPlot.svelte";
  import ChartFrame from "$carbon/ChartFrame.svelte";
  import {red, lightBlue} from "$carbon/lib/cbColors";
  export let data;

  console.log(`PRE LOADED DATA`, Object.keys(data))
  const divergingData = data.emissionsAndFinance;
  const scatterData = data.emissionsAndFinance;
  console.log(Object.keys(scatterData[0]))
  let chartWidth

  let differenceSort = (a, b)=>{
    return (Number(a['Shortfall or surplus ($bn)']) - Number(b['Shortfall or surplus ($bn)']))
  }

  /* scatter plot stuff */

  /* end scatter plot stuff */

</script>
<article class="stack box">
  <ul>
    <li><a href="/">Back home</a></li>
  </ul>
<CopyWIP></CopyWIP>

<div class="readable chart-container center" bind:clientWidth={chartWidth}>
  <h2>Diverging bars</h2>
  <hr>
  <ChartFrame 
    title={"The US, Canada and Australia are contributing less climate finance than their share of historical emissions"}
    subtitle="Shortfall or surplus ($bn)">
    <DivergingBarChart 
      height={640}
      width={chartWidth}
      margin={{top:35,left:30,bottom:60,right:20}}
      data={divergingData.sort(differenceSort)}
      valueAccessor={d=>Number(d['Shortfall or surplus ($bn)'])}
      valueFormatter={d=>{
        if(d<0){
          return `-${Math.abs(d)}`;
        }
        return `${d}`
      }}
      labelAccessor={d=>`${d['Country']}`}
      labelFormatter={d=>(d['Abbreviated country'] && chartWidth<400) ? d['Abbreviated country'] : `${d['Country']}`}
      fillAccessor={d=>{
        if(d['Shortfall or surplus ($bn)']<0){
          return red;
        }
        return lightBlue;
      }}
      showValues={true}
      showValueAxis={true}
      valueAxisTicks={chartWidth > 370 
        ? [-35, -30, -25, -20, -15, -10, -5, 0, 5, 10]
        : [-40, -30,-20,-10,0,10]}
      directionLabels={
        chartWidth > 485 
          ? ["Giving less in 2020 than their share of historical emissions &larr;","&rarr;Giving more"]
          : ["Giving less than their share &larr;","&rarr; more"]
      }
      ></DivergingBarChart>
  </ChartFrame>
  <h2>Scatter plot</h2>
  <hr>
  <ChartFrame>
    <ScatterPlot 
      data={scatterData}
      xAccessor={ d=>Number(d['Cumulative emissions']) }
      yAccessor={ d=>Number(d['Shortfall or surplus ($bn)']) }
      fillAccessor={d=>d['Annex II'] ? red : lightBlue}
      strokeAccessor={d=>'rgb(0,0,0)'}
      yLabeler={d=>`$${d/1000}bn`}
      xLabeler={d=>`${d/1000}bn`}
      >
    </ScatterPlot>
  </ChartFrame>
</div>
</article> 

<style>
  .readable{
    max-width: var(--readable-max-width);
  }
</style>