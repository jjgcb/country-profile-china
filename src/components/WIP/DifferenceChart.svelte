<script>
  import Watermark from '$carbon/Watermark.svelte';
  import {red, lightBlue} from '$carbon/lib/cbColors';
  import { scaleLinear, scaleBand, max, path } from 'd3';
	
  export let width = 720;
  export let height = 500;
  export let data = [];
  export let margin = { top:20, left:20, bottom:20, right:20 };
  export let paddingInner = 0.1;
  export let paddingOuter = 0;
  export let endValueAccessor = (d)=>d;
  export let startValueAccessor = (d)=>d;
  export let labelAccessor = (d,i)=>`${i}`;
  export let fillAccessor = (d)=>'#629DD0';
  export let valueFormatter = (d)=>d;
  export let showValues = true;
  let textSpacing = 5;

  let plotWidth = width - (margin.left + margin.right);
  let plotHeight = height - (margin.top + margin.bottom);

  let valueScale = scaleLinear()
    .domain([0, max(data, endValueAccessor)])
    .range([0, plotWidth]);

  let categoryScale = scaleBand()
    .domain(data.map(labelAccessor))
    .range([0, plotHeight])
    .paddingInner(paddingInner)
    .paddingOuter(paddingOuter);

  let bars = [];

  //layout method
  $: {
    bars = data.map((d)=>{
      return {
        x: valueScale( startValueAccessor(d) ),
        y: categoryScale( labelAccessor(d) ),
        width: valueScale( endValueAccessor(d) ),
        height: categoryScale.bandwidth(),
        fill: (endValueAccessor(d) - startValueAccessor(d))>0 ? lightBlue : red,
        label: labelAccessor(d),
        value: valueFormatter(endValueAccessor(d))
      }
    })
  }
  
  function triangle(bar){
    let trianglePath = path();
    if(bar.x <= bar.width){
      trianglePath.moveTo(bar.width, bar.y+bar.height/3)
      trianglePath.lineTo(bar.width, bar.y+bar.height*2/3)
      trianglePath.lineTo(bar.width+bar.height/2, bar.y+bar.height/2)
      trianglePath.closePath();
    }else{
      trianglePath.moveTo(bar.width, bar.y+bar.height/3)
      trianglePath.lineTo(bar.width, bar.y+bar.height*2/3)
      trianglePath.lineTo(bar.width-bar.height/2, bar.y+bar.height/2)
      trianglePath.closePath();
    }

    return trianglePath.toString();
  }
 
</script>
<svg viewBox={`0 0 ${width} ${height}`}>
  <g class="plot" transform={`translate(${margin.left},${margin.top})`}>
    {#each bars as bar}
      <line x1={bar.x} y1={bar.y + bar.height/2} x2={bar.width}  y2={bar.y + bar.height/2} stroke={bar.fill} stroke-width={3}></line>
      <circle cx={bar.x} cy={bar.y + bar.height/2} r={5} fill={bar.fill}></circle>
      <path d={triangle(bar)} fill={bar.fill}></path>
      {#if showValues}
        <text 
          x={bar.width + textSpacing}
          y={bar.y+bar.height/2}
          dominant-baseline="central"
          text-anchor={"start"}
          class="value-label">
          <!-- {bar.value} -->
        </text>
      {/if}
    {/each}
  </g>
  <g class="labels" transform={`translate(${margin.left},${margin.top})`}>
    {#each bars as bar}
    <text dx={0 - textSpacing} dy={bar.y+bar.height/2} text-anchor="end" dominant-baseline="central">{bar.label}</text>
    {/each}
  </g>
  <g class="v-axis" transform={`translate(${margin.left},${margin.top})`}>
    <line x1={0} y1={0} x2={0} y2={plotHeight} stroke="#333333" stroke-width="2"></line>
  </g>
  <Watermark x={plotWidth-40} y={plotHeight-40} markWidth={40} markHeight={40}></Watermark>
</svg>