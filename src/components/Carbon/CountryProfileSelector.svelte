<script>

let countries = [
        { iso: 'XXX', val: 'Select a country', text: '', class: ''},
        { iso: 'AUS', val: 'Australia', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'aus'},
        { iso: 'BRA', val: 'Brazil', text: 'Brazil, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'bra'},
        { iso: 'CAN', val: 'Canada', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'FRA', val: 'France', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'aus'},
        { iso: 'IND', val: 'India', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'bra'},
        { iso: 'IDN', val: 'Indonesia', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'IRN', val: 'Iran', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'aus'},
        { iso: 'JPN', val: 'Japan', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'bra'},
        { iso: 'MEX', val: 'Mexico', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'NGA', val: 'Nigeria', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'aus'},
        { iso: 'RUS', val: 'Russia', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'bra'},
        { iso: 'PAK', val: 'Pakistan', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'ZAF', val: 'South Africa', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'KOR', val: 'South Korea', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'TUR', val: 'Turkey', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
        { iso: 'USA', val: 'United States', text: 'Australia, a country in the top 20 for greenhouse gas emissions, is the world’s second largest coal exporter. First published: April 2019.', class: 'chi'},
    ];
// let value = {value: ''};

let selected = '';
let current = 'foo';
let response = '';
</script>

<div class="profile-selector-container" id={selected}>
    <div class="profile-heading">
        <p>Carbon Brief Country Profiles</p>
        <p>Select a country from the series</p>
        <select name="countryProfiles" bind:value={selected} on:change="{() => response = ''}" on:change={()=>locatorCountry=selected.iso }>
        {#each countries as country}
            <option value={country}>
                {country.val}
            </option>
        {/each}
        </select>
    </div>
    <div class="globe">
        <GlobeLocator country={locatorCountry} mapData={mapdata}></GlobeLocator>
    </div>
    <div class="country-intro">
            {#if countries[0].iso != 'XXX'}             
            {console.log(countries[0].iso)}
            <p>{@html selected ? emptyPlaceholder : emptyPlaceholder }</p>
            {:else}
            <p>{@html selected ? selected.text+' '+readMore+selected.val+readMore2 : ""}</p>
            {/if}

        <!-- <p>{@html selected ? emptyPlaceholder : emptyPlaceholder }</p> -->
    </div>
</div>