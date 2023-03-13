<script>
  import { onMount } from 'svelte';
  import { sequential } from "$carbon/lib/cbColors";
  import { scaleSequential } from 'd3';
  export let scale = scaleSequential()
    .domain([0,100])
    .interpolator(sequential);
    
  export let unit = ""
  export let canvasHeight = 50;

  let rampCanvas;
  function ramp(color, n = 512) {
    if(rampCanvas){
      const context = rampCanvas.getContext("2d");
      for (let i = 0; i < n; ++i) {
        context.fillStyle = color(i / (n - 1));
        context.fillRect(i, 0, 1, canvasHeight);
      }
      return rampCanvas;
    }
  }

  onMount(()=>{
    if(scale && scale.interpolator){
      ramp(scale.interpolator());
    }
  })

  $:{
    if(scale && scale.interpolator){
      ramp(scale.interpolator());
    }
  }

</script>
<div class="key cluster continuous">
  <div class="range-labels"><span>{scale.domain()[0]} {unit}</span><span>{scale.domain()[1]}</span></div>
  <canvas bind:this={rampCanvas} width={512} height={canvasHeight}></canvas>
</div>
<style>
  canvas{
    border: 1px solid #333333;
    image-rendering: pixelated;
    width: calc(100%);
    opacity: 0.6;
    margin-top:-15px;
  }
  
  .hidden{
    display: none;
  }

	.key{
		font-size: initial;
	}

  .key.continuous{
    width: 200px;
  }

	.range-labels{
		display: inline-flex;
    justify-content: space-between;
    width: 200px;
	}
</style>