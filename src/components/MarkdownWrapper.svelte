<script>
  import { onMount, afterUpdate } from 'svelte';
  import { browser } from '$app/environment';
  import { addSection, addObserver } from '$carbon/lib/pageStructure';

  let sectionElement;
  let sectionID = undefined;
  onMount(() => {
    if(browser){
      if(sectionElement.querySelector('h2') && sectionElement.querySelector('h2').id){
        let h2ID = sectionElement.querySelector('h2').id;
        sectionID = `section-${sectionElement.querySelector('h2').id}`;
        addSection(sectionID, h2ID);
      }else{
        sectionID = undefined;
      }
    }
  });

  afterUpdate(() => {
    if(browser){
      addObserver(sectionElement)
    }
  });
</script>
<section bind:this={sectionElement} id={sectionID} class="stack">
  <slot></slot>
</section>
