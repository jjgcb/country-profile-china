<script>
    const sizeVars = ["--s-5","--s-4","--s-3","--s-2","--s-1","--s0","--s1","--s2","--s3","--s4","--s5"]
</script>
<table>
    <thead>
        <tr><th>Measure</th><th>Variable name</th></tr>
    </thead>
    <tbody>
        {#each sizeVars as varName}
        <tr>
            <td><div class="swatch" style={`width:var(${varName}); height:var(${varName});`}></div></td>
            <td>{varName}</td></tr>
        {/each}
    </tbody>
</table>

<style>
    .swatch{
        outline: 1px solid black;
    }
</style>