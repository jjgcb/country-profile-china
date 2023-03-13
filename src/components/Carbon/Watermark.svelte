<script>
  export let markWidth;
  export let markHeight;
  export let x;
  export let y;
</script>

<g class="watermark">
  <!-- <rect x={markX} y={markY} width={markWidth} height={markHeight}></rect> -->
  <image x={x} y={y} width={markWidth} height={markHeight} href="images/cb-logo-initials.svg" />
</g>
