<script>
  export let margin;
  export let xScale;
  export let yScale;
  export let height;
  export let width;
  export let xOffset;
  export let yOffset;
  export let xLabeler = d=>d;
  export let yLabeler = d=>d;
</script>

<g class="axes" transform={`translate( ${margin.left}, ${margin.top})`}>
    <g class="x axis" transform={`translate(0, ${yOffset})`}>
      <line 
        x1={0}
        y1={height}
        x2={width}
        y2={height}
        stroke='black'>
      </line>
      {#each xScale.ticks(10) as tick}
        <line x1={xScale(tick)} x2={xScale(tick)} y1={height} y2={height+5} stroke='black'></line>
        <text x={xScale(tick)} text-anchor="middle" y={height+20}>
          {xLabeler(tick)}
        </text>
      {/each}
    </g>
    <g class="y axis" transform={`translate(${-xOffset}, 0)`}>
      <line 
        x1={0}
        y1={0}
        x2={0}
        y2={height}
        stroke='black'>
      </line>
      {#each yScale.ticks(10) as tick}
        <line y1={yScale(tick)} y2={yScale(tick)} x1={0} x2={-5} stroke='black'></line>
        <text text-anchor="end" alignment-baseline="middle" y={yScale(tick)} x={-10}>
          {yLabeler(tick)}
        </text>
      {/each}
    </g>
  </g>

