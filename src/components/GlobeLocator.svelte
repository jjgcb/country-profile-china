<script>
  //TODO: add a circle if the country is below a cerain area
  //      add a label
  //      add facility to change color scheme
  import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { geoPath, geoOrthographic , geoCentroid} from 'd3';
  import {lightGrey, traceGrey, white, darkBlue, veryDarkBlue} from '$carbon/lib/cbColors.js'
  export let margin = 20;
  export let location = [0,0];
  export let width = 200;
  export let height = 200;
  export let country = "";
  export let mapData;

  let highlightCountry = "";

  const latitude = tweened(0, {
		duration: 400,
    ease: cubicOut,
	});

  const longitude = tweened(0, {
		duration: 400,
    ease: cubicOut,
	});
  
  let projection = geoOrthographic()
    .rotate([$longitude, $latitude]);
    
  let path = geoPath()
    .projection(projection);

  function getCenterPoint(countryName){
    if(mapData.countryLookup[countryName]){
      return geoCentroid(mapData.countryLookup[countryName]).reverse();
    }else{
      return [0,0];
    }
  }

  $: {
    if(country){
      location = getCenterPoint(country);
      highlightCountry = mapData.countryLookup[country];
    }else{
      highlightCountry = "";
    }
  }

  $: {
    longitude.set(-location[1]);
    latitude.set(-location[0]);
    projection = projection.rotate([$longitude, $latitude]);
    path = geoPath()
      .projection(projection);
  }
  

  onMount(()=>{
    if(browser){
      fitProjection();
    }
  });

  function fitProjection(){    
    let [[x0, y0], [x1, y1]] = geoPath(projection.fitWidth(width-(margin*2), mapData.outline))
      .bounds(mapData.outline);
    let dy = Math.ceil(y1 - y0) 
    let l = Math.min(Math.ceil(x1 - x0), dy);
    projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  }
</script>
<svg width={width} height={height}>
  <defs>
    <radialGradient id="sea-gradient">
      <stop offset="50%" stop-color={white} />
      <stop offset="80%" stop-color={traceGrey} />
      <stop offset="100%" stop-color={lightGrey} />
    </radialGradient>
    <radialGradient id="land-gradient">
      <stop offset="95%" stop-color={darkBlue} />
      <stop offset="100%" stop-color={veryDarkBlue} />
    </radialGradient>
    <filter id="f2" x="-50%" y="-50%" width="200%" height="200%">
      <feOffset result="offOut" in="SourceAlpha" dx="0" dy="0" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation={width/50} />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  <g class="map" transform="translate({margin}, {margin})" filter="url(#f2)">
    <path class="outline" fill="black" d={path(mapData.outline)} />
    <path class="sea" d={path(mapData.outline)} fill="url(#sea-gradient)" />
    <path class="land" d={path(mapData.land)} fill="url(#land-gradient)" />
    <path class="highlight-country" 
      d={highlightCountry != "" ? path(highlightCountry) : ""} 
    />
    <path class="borders" d={path(mapData.borders)} stroke="rgba(255,255,255,0.2)"/>
  </g>
</svg>
<style>
  .outline{
    stroke:black;
    stroke-opacity:0.5;
  }
  .sea{
    stroke:none;
  }
  .land{
    stroke:none;
  }
  .borders{
    fill:none;
  }
  .highlight-country{
    fill:var(--color-yellow);
  }
</style>