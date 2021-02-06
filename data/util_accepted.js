import fs from 'fs';
import accepted_list from './accepted_list.json';

fs.writeFileSync('./accepted.txt', '', () => {});

let listStr = '';
accepted_list.forEach(
    (item) =>
        (listStr +=
`            <tr>
              <td>${item["Sl no"]}</td>
              <td>${item["ID"]}</td>
              <td>${item["Paper Title"]}</td>
              <td>${item["Author"]}</td>
              <td>${item["Affiliation"]}</td>
            </tr>
`)
);
fs.appendFile('./accepted.txt', listStr, () => {});

// add "type": "module" in package.json, then run with `node --experimental-json-modules util_accepted.js`
