import { csvParse, csvFormat } from 'd3';
import * as fs from 'fs';


const countryLookup = {};
csvParse(fs.readFileSync('country-list.csv','utf-8'))
  .forEach((row)=>{
    countryLookup[row.country.toLowerCase()] = row.iso;
    if(row.abbreviated){
      countryLookup[row.abbreviated.toLowerCase()] = row.iso;
    }
    if(row.alternative){
      countryLookup[row.alternative.toLowerCase()] = row.iso;
    }
  })

console.log(countryLookup);
// do it for topojson...
const topoData = JSON.parse(fs.readFileSync('countries-110m.topo.json','utf-8'));
topoData.objects.countries.geometries = topoData.objects.countries.geometries
  .map(country=>{
    let countryISO = countryLookup[country.properties.name.toLowerCase()];
    if(countryISO==undefined){
      console.log(country.properties.name, countryISO)      
    }else{
      delete country.properties.name;
      country.properties.iso = countryISO;
    }
    return country;
  });

fs.writeFileSync("iso-110m.topo.json",JSON.stringify(topoData));
