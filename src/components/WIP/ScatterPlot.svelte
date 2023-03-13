<script>
  import ScatterAxes from './ScatterAxes.svelte';

  import { scaleLinear, extent, scalePow, ticks } from 'd3';

  export let width = 500;
  export let height = 500;
  export let margin = { top:10, left:50, bottom:50, right:20};
  export let data = [];
  export let radiusMax = 10;
  export let xDomain;
  export let yDomain;
  export let xAccessor = d=>d.x;
  export let yAccessor = d=>d.y;
  export let fillAccessor = d=>'black';
  export let strokeAccessor = d=>'black';
  export let radiusAccessor = d=>radiusMax;
  export let yLabeler = d=>d;
  export let xLabeler = d=>d;

  let plotWidth = width - (margin.left + margin.right);
  let plotHeight = height - (margin.top+margin.bottom); 

  let xScale = scaleLinear()
    .domain((extent(data,xAccessor)))
    .range([0, plotWidth]) ;

  let yScale = scaleLinear()
    .domain((extent(data,yAccessor)))
    .range([plotHeight, 0]);

  let rScale = scalePow()
    .domain(extent(data,radiusAccessor))
    .range([0,radiusMax]);

</script>
<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
  <ScatterAxes 
    {margin}
    {xScale}
    {yScale}
    height={plotHeight}
    width={plotWidth}
    xOffset={5}
    yOffset={5}
    {xLabeler}
    {yLabeler}>
  </ScatterAxes>
  <g class="plot" transform={`translate( ${margin.left}, ${margin.top})`}>
  {#each data as row}
  <circle 
    cx={xScale(xAccessor(row))}
    cy={yScale(yAccessor(row))}
    r={rScale(radiusAccessor(row))}
    fill={fillAccessor(row)}
    stroke={strokeAccessor(row)}>
  </circle>
  {/each}
  </g>
</svg>