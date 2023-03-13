import * as fs from 'fs';
import * as path from 'path';
import { csvParse, tsvParse } from 'd3-dsv';

export const prerender = true;

const dataDir = 'static/data/';

let files = [`emissionsAndFinance.tsv`]

export async function load() {
  const dataSets = {};
  files.forEach(f=>{
    const dataString = fs.readFileSync(path.join(dataDir, f), 'utf-8');
    let data=[];
    if(path.extname(f) === '.tsv'){
      data = tsvParse(dataString);
      dataSets[path.basename(f, '.tsv')] = data;
    }else if(path.extname(f) === '.csv'){
      data = csvParse(dataString);
      dataSets[path.basename(f, '.csv')] = data;
    }
  });
  return dataSets;
}