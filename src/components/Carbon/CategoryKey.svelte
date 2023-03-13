<script>
  export let data= [];
  export let label = '';
  export let vertical=false;
  export let swatchDimensions=[12, 12]
</script>
<p class="key">
{#if label!=""}{label}{/if}
{#each data as item}
<span class="key-item">
  {item.key}
    <svg width={swatchDimensions[0]} height={swatchDimensions[1]}>
      <rect x={0} y={0} width={swatchDimensions[0]} height={swatchDimensions[1]} fill={item.value}></rect>
    </svg>
</span>
{/each}
</p>
<style>
  .key{
    font-family: var(--sans-serif-narrow);
    width:100%;
    display: flex;
    margin-block-start: 0;
  }
  .key-item{
    margin-left:var(--s0)
  }
  @media only screen and (max-width: 500px) {
		.key{
			font-size: var(--s0);
			line-height: var(--s0);
		}
	}
</style>