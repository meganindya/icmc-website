import fs from 'fs';
import accepted from './accepted.json';

fs.writeFileSync('./accepted.csv', '', () => {});

fs.appendFile('./accepted.csv', 'Sl no,ID,Paper Title,Author,Affiliation\n', () => {});

let csv = '';
accepted.forEach(
    (item) =>
        (csv += `${item['Sl no']},${item['ID']},"${item['Paper Title']}","${item['Author']}","${item['Affiliation']}"\n`)
);
fs.appendFile('./accepted.csv', csv, () => {});

// add "type": "module" in package.json, then run with `node --experimental-json-modules util_accepted_json_csv.js`
