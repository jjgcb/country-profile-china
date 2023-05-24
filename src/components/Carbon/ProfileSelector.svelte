<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let selected = undefined;
    export let options = [];

    function selectionChange(ev) {
		dispatch('select', { value: ev.target.value});
        selected = options.find(d=>d.value == ev.target.value);
	}
</script>

<div class="profile-selector-container" id={selected}>
    <div class="profile-heading">
        <p>Carbon Brief Country Profiles</p>
        <p>Select a country from the series</p>
        <select name="countryProfiles" on:change={selectionChange}>
        {#each options as option}
            <option value={option.value}>
                {option.label}
            </option>
        {/each}
        </select>
    </div>
    <slot name="illustration"></slot>
    <div class="country-intro">
    {#if selected && selected.text}             
        <p>{@html `${selected.text} <a href="${selected.link}">Read more</a>`}</p>
    {:else}
    <slot name="placeholder">place holder text</slot>
    {/if}
    </div>
</div>
<style>
    .country-intro{
        /* border: solid red 2px; */
        height: 108px;
        width: 100%;
    }
    .profile-selector-container{
        border: solid 1px grey;
        max-height: 300px;
        padding: 3em;
        padding-bottom: 0;
        width: 100%;
        max-width: var(--readable-max-width);
        margin: auto;
        margin-top: var(--s2);
        display: flex;
        flex-wrap: wrap;
        align-content: flex-end;
        align-items: flex-start;
    }
    .profile-heading{
        margin-top:5em
    }
    select{
        width: 66%;
        height: 30px;
        border-radius: 5px;
        font-size: 1.4em;
        padding-left:0.3em;
    }
</style>