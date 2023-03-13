<script>
const colorVars = [
    "--color-primary-text","--color-primary-background","--color-dark-background","--color-light-text","--color-link","--color-dark-blue","--color-yellow","--color-light-blue","--color-red","--color-light-grey","--color-lilac","--color-orange","--color-indigo","--color-pale-pink","--color-pale-blue","--color-brown"
]
</script>
<table>
    <thead>
        <tr><th>Colo(u)r</th><th>Variable name</th></tr>
    </thead>
    <tbody>
        {#each colorVars as varName}
        <tr>
            <td><div class="swatch" style={`background-color:var(${varName})`}></div></td>
            <td>{varName}</td></tr>
        {/each}
    </tbody>
</table>

<style>
    .swatch{
        width:3rem;
        height:2rem;
        outline: 1px solid black;
    }
</style>