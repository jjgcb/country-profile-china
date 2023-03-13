<script>
	import Watermark from './Watermark.svelte';
	import { scaleLinear, scaleTime, line, extent, ticks } from 'd3';
	import { darkGrey, lightBlue, red } from "$carbon/lib/cbColors";

	export let width = 720;
	export let height = 600;
	export let data = [];
	export let margin = { top: 20, left: 70, bottom: 100, right: 20 };
	export let lineProperties = [];
	export let timeAccessor = (d, i) => new Date();
	export let dateFormat = d=>d;
	export let valueFormat = d=>d;
	export let dateExtent;
	export let lineColors = [ red, lightBlue ];
	export let lineThickness = 3;

	let plotWidth = width - (margin.left + margin.right);
	let plotHeight = height - (margin.top + margin.bottom);
	let sortedData;
	let sorter = (a,b)=>{
		return (timeAccessor(a).getTime() - timeAccessor(b).getTime())
	}

	if(!dateExtent){
		dateExtent = [timeAccessor(data[0]), timeAccessor(data[data.length-1])];
	}
	let valueExtent = [];
	for(let i=0; i<lineProperties.length; i++){
		let localExtent = extent(data, d=>Number(d[lineProperties[i]]));
		if(!valueExtent[0]){
			valueExtent = [...localExtent]; 
		}
		valueExtent = [
			Math.min(Number(localExtent[0]),Number(valueExtent[0])), 
			Math.max(Number(localExtent[1]),Number(valueExtent[1]))
		];
	}

	let valueScale = scaleLinear()
		.domain(valueExtent)
		.range([plotHeight, 0]).nice();

	let timeScale = scaleTime()
		.domain(dateExtent)
		.range([0, plotWidth]);

	let chartLines = [];

	//layout method
	$: {
		sortedData = data
			.sort(sorter) // order the points
			.filter(row=>{ // don't plot anythign outside an explicitly set date range
				if(dateExtent){
					return timeAccessor(row).getTime() >= dateExtent[0].getTime() 
						&& timeAccessor(row).getTime() <= dateExtent[1].getTime();
				}else{
					return true;
				} 
			});
			
		chartLines = lineProperties.map((property, i) => {
			let lineGenerator = line()
				.x(row=>timeScale(timeAccessor(row)))
				.y(row=>valueScale(Number(row[property])));
			return {
				path:lineGenerator(sortedData),
				stroke:lineColors[i]
			};
		});
	}
</script>
<svg viewBox={`0 0 ${width} ${height}`}>
	<g class="axes" transform={`translate(${margin.left},${margin.top})`}>
		<line x1={0} y1={0} x2={0} y2={plotHeight} stroke-width={2} stroke={darkGrey} ></line>
		<line x1={0} y1={plotHeight} x2={plotWidth} y2={plotHeight} stroke-width={2} stroke={darkGrey} ></line>
		{#each valueScale.ticks(5) as tick}
		<line x1={0} y1={valueScale(tick)} x2={-5} y2={valueScale(tick)} stroke-width={2} stroke={darkGrey}></line>
		<text class="y-tick" text-anchor="end" x={-10} y={valueScale(tick) + 7}>{valueFormat(tick)}</text>
		{/each}
		{#each timeScale.ticks(5) as tick}
		<line x1={timeScale(tick)} y1={plotHeight} x2={timeScale(tick)} y2={plotHeight+5} stroke-width={2} stroke={darkGrey}></line>
		<text class="x-tick" text-anchor="middle" x={timeScale(tick)} y={plotHeight+25}>{dateFormat(tick)}</text>
		{/each}
	</g>
	<g class="plot" transform={`translate(${margin.left},${margin.top})`}>
		{#each chartLines as line}
			<path d={line.path} stroke={line.stroke} fill="none" stroke-width={lineThickness} stroke-linejoin="round"></path>
		{/each}		
	</g>
	<Watermark x={width} y={height} markWidth={40} markHeight={40} />
</svg>
<style>
	.x-tick{
		alignment-baseline:central;
	}
	.y-tick{
		/* alignment-baseline:hanging; */
	}
</style>