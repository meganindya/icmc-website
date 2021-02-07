import fs from 'fs';
import accepted_list from './_accepted_json.json';

fs.writeFileSync('./_accepted.csv', '', () => {});

fs.appendFile('./_accepted.csv', 'Sl no,ID,Paper Title,Author,Affiliation\n', () => {});

let listStr = '';
accepted_list.forEach(
    (item) =>
        (listStr += `${item['Sl no']},${item['ID']},"${item['Paper Title']}","${item['Author']}","${item['Affiliation']}"\n`)
);
fs.appendFile('./_accepted.csv', listStr, () => {});

// add "type": "module" in package.json, then run with `node --experimental-json-modules util_accepted_json_csv.js`
