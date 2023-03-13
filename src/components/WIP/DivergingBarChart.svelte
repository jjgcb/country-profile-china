<script>
  import Watermark from '$carbon/Watermark.svelte'

  import { scaleLinear, scaleBand, max, min, ticks, range } from 'd3';
	import { lightBlue } from '$carbon/lib/cbColors';

  export let width = 720;
  export let height = 500;
  export let data = [];
  export let margin = { top:20, left:20, bottom:20, right:20 };
  export let paddingInner = 0.1;
  export let paddingOuter = 0;
  export let valueAccessor = (d)=>d;
  export let labelAccessor = (d,i)=>`${i}`;
  export let labelFormatter = labelAccessor;
  export let fillAccessor = (d)=>lightBlue;
  export let valueFormatter = (d)=>d;
  export let showValues = true;
  export let showValueAxis = true;
  export let directionLabels = ['less than zero','more'];
  export let valueAxisTicks = [];

  let originalShowValues = showValues;
  let textSpacing = 5;
  let centralAxisOffset = 0;
  let plotWidth = width - (margin.left + margin.right);
  let plotHeight = height - (margin.top + margin.bottom);

  const space = Math.max(max(data, valueAccessor), valueAxisTicks[1]) - Math.min(min(data, valueAccessor), valueAxisTicks[0])
  
  let bars = [];
  let valueAxis = {};
  //layout method
  $: {
    plotWidth = width - (margin.left + margin.right);
    plotHeight = height - (margin.top + margin.bottom);
    if(width<500){
      showValues = false;
    }else{
      showValues = originalShowValues;
    }
    let valueScale = scaleLinear()
      .domain([0, space])
      .range([0, plotWidth])
      .nice();

    let categoryScale = scaleBand()
      .domain(data.map(labelAccessor))
      .range([0, plotHeight])
      .paddingInner(paddingInner)
      .paddingOuter(paddingOuter);

    bars = data.map((d)=>{
      const negativeBar = valueScale( valueAccessor(d) ) < 0;
      const x = negativeBar 
        ? valueScale( valueAccessor(d) )
        : 0;
       
      return {
        negativeBar,
        x,
        y: categoryScale( labelAccessor(d) ),
        width: Math.abs(valueScale( valueAccessor(d) )),
        height: categoryScale.bandwidth(),
        fill: fillAccessor(d),
        label: labelFormatter(d),
        valueLabelX: x < 0 ? x - textSpacing : Math.abs(valueScale( valueAccessor(d) )) + textSpacing,
        valueLabelAnchor: x < 0 ? 'end' : 'start',
        value: valueFormatter(valueAccessor(d)),
        negativeBar
      }
    })

    valueAxis = {
      domain: [valueScale(min(valueAxisTicks)), valueScale(max(valueAxisTicks))],
      ticks: valueAxisTicks.map(d=>({
        x:valueScale(d),
        label: valueFormatter(d),
        y:0
      }))
    }

    centralAxisOffset = Math.abs(min(bars, d=>d.x))+margin.left;
  }

</script>
<svg viewBox={`0 0 ${width} ${height}`}>
  <g class="direction-labels" transform={`translate(${centralAxisOffset + margin.left},${0})`}>
    <line x1={0} y1={textSpacing} x2={0} y2={margin.top-textSpacing} stroke="#333333" stroke-width="1"></line>
    <text dominant-baseline='middle' text-anchor="end" x={-textSpacing} y={margin.top/2}>{@html directionLabels[0]}</text>
    <text dominant-baseline='middle' x={textSpacing} y={margin.top/2}>{@html directionLabels[1]}</text>
  </g> 
  <g class="plot" transform={`translate(${centralAxisOffset + margin.left},${margin.top})`}>
    {#each bars as bar}
      <rect x={bar.x} y={bar.y} width={bar.width} height={bar.height} fill={bar.fill}></rect>
    {/each}
  </g>
  
  {#if showValueAxis}
  <g class="x axis" transform={`translate(${centralAxisOffset + margin.left},${margin.top + plotHeight})`}>
    <line x1={valueAxis.domain[0]} x2={valueAxis.domain[1]} y1={0} y2={0} stroke="black" stroke-width="1"></line>
    {#each valueAxis.ticks as tick}
      {#if tick!=0}
      <line x1={tick.x} x2={tick.x} y1={-plotHeight} y2={5} stroke="white" stroke-width="1"></line>
      {/if}
      <line x1={tick.x} x2={tick.x} y1={0} y2={5} stroke="black" stroke-width="1"></line>
      <text x={tick.x} y={10} dominant-baseline="hanging" text-anchor="middle">{tick.label}</text>
    {/each}
  </g>

  <g class="annotation" transform={`translate(${centralAxisOffset + margin.left},${margin.top})`}>
    {#each bars as bar}
      {#if showValues}
        <text 
          x={bar.valueLabelX}
          y={bar.y+bar.height/2}
          dominant-baseline="central"
          text-anchor={bar.valueLabelAnchor}
          class="value-label">
          {bar.value}
        </text>
      {/if}
    {/each}
  </g>
  {/if}

  <g class="labels" transform={`translate(${centralAxisOffset + margin.left},${margin.top})`}>
    {#each bars as bar}
    <text 
      dx={bar.negativeBar ? (textSpacing) : (-textSpacing)}
      dy={bar.y+bar.height/2}
      data-negative={bar.negativeBar}
      text-anchor={bar.negativeBar ? "start" : "end"}
      dominant-baseline="central">
      {bar.label}
    </text>
    {/each}
  </g>

  <Watermark x={width-40} y={height-40} markWidth={40} markHeight={40}></Watermark>
</svg>
<style>
  .labels text,
  .value-label{
    font-family: var(--sans-serif-narrow);
    font-size: 16px;
  }
  .axis text{
    font-family: var(--sans-serif-narrow);
    font-size: 16px;
  }
  .direction-labels text{
    font-family: var(--sans-serif-narrow);
    font-size: 16px;
  }
</style>