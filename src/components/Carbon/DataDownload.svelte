<script>
  import {csvFormat} from "d3";
  export let dataSet = [];
  export let title = "data download";
  export let format = "csv";

  const slugify = ( text ) => {
    return text
      .toString()
      .normalize( 'NFD' )                   // split an accented letter in the base letter and the acent
      .replace( /[\u0300-\u036f]/g, '' )   // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-'); 
  };

  let dataURL = `data:text/plain;charset=utf-8,${encodeURIComponent(csvFormat(dataSet))}`;
</script>
<a href={dataURL} download={`${slugify(title)}.${format}`}>{`${title} (.${format})`}</a>