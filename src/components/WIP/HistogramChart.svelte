<script>
  import Watermark from '$carbon/Watermark.svelte';
  import { scaleLinear, scaleBand, max } from 'd3';
  import {lightBlue, traceGrey} from '$carbon/lib/cbColors';

  export let width = 720;
  export let height = 500;
  export let data = [];
  export let margin = { top:20, left:20, bottom:20, right:20 };
  export let paddingInner = 0.1;
  export let paddingOuter = 0;
  export let valueAccessor = (d)=>d;
  export let shareAccessor = (d)=>d;
  export let labelAccessor = (d,i)=>`${i}`;
  export let fillAccessor = (d)=>lightBlue;
  export let valueFormatter = (d)=>d;
  export let showValues = true;
  export let barShade = false;
  export let valueMax;
  let textSpacing = 5;

  let plotWidth = width - (margin.left + margin.right);
  let plotHeight = height - (margin.top + margin.bottom);

  let bars = [];
  let shareTotal = 0;
  data.forEach((d)=>{
    shareTotal = shareTotal + shareAccessor(d);
  })
  console.log(shareTotal);
  let x100 = 0;
  //layout method
  $: {

    plotWidth = width - (margin.left + margin.right);
    plotHeight = height - (margin.top + margin.bottom);

    let valueScale = scaleLinear()
      .domain([0, valueMax ? valueMax : max(data, valueAccessor)])
      .range([0, plotWidth]);

    let shareScale = scaleLinear()
      .domain([0,shareTotal])
      .range([0, plotHeight])

    let categoryScale = scaleBand()
      .domain(data.map(labelAccessor))
      .range([0, plotHeight])
      .paddingInner(paddingInner)
      .paddingOuter(paddingOuter);

    x100 = valueScale(100);
    let acc = 0;
    data.forEach((d,i)=>{
      bars[i] = {
        x: 0,
        y: acc,
        width: valueScale( valueAccessor(d) ),
        height: shareScale( shareAccessor(d) ),
        fill: fillAccessor(d),
        label: labelAccessor(d),
        value: valueFormatter(valueAccessor(d))
      };
      acc = acc + bars[i].height;
    })
  }
  
</script>
<svg viewBox={`0 0 ${width} ${height}`}>
  <g class="plot" transform={`translate(${margin.left},${margin.top})`}>
    {#each bars as bar}
      {#if barShade}
      <rect x={bar.x} y={bar.y} width={plotWidth} height={bar.height} fill={traceGrey}></rect>
      {/if}
      <rect x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={bar.fill}></rect>
      {#if showValues}
        <text 
          x={bar.width + textSpacing}
          y={bar.y+bar.height/2}
          dominant-baseline="central"
          text-anchor={"start"}
          class="value-label">
          {bar.value}
        </text>
      {/if}

    {/each}
  </g>
  <g class="labels" transform={`translate(${margin.left},${margin.top})`}>
    {#each bars as bar}
    <text dx={bar.x - textSpacing} dy={bar.y+bar.height/2} text-anchor="end" dominant-baseline="central">{bar.label}</text>
    {/each}
  </g>
  <g class="v-axis" transform={`translate(${margin.left},${margin.top})`}>
    <line x1={0} y1={0} x2={0} y2={plotHeight} stroke="#333333" stroke-width="2"></line>
  </g>
  <g class="h-axis" transform={`translate(${margin.left},${margin.top})`}>
    <line x1={x100} y1={0} x2={x100} y2={plotHeight} stroke="#333333" stroke-width="2"></line>
  </g>
  <Watermark x={width-40} y={height-40} markWidth={40} markHeight={40}></Watermark>
</svg>
<style>
  .value-label{
    font-weight: bold;
    font-size: 14px;
  }
  .labels{
    font-size: 16px;
  }
</style>