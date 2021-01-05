import fs from 'fs';
import _comp from './_comp.json';
import _math from './_math.json';

fs.writeFile('./comp.txt', '', () => {});
fs.writeFile('./math.txt', '', () => {});

const comp = _comp.sort((a, b) => a.name.localeCompare(b.name));
let compStr = '';
comp.forEach(item => compStr += `                  <p>\n                    <strong>${item.name}</strong>, ${item.institute}\n                  </p>\n`);
fs.appendFile('./comp.txt', compStr, () => {});

const math = _math.sort((a, b) => a.name.localeCompare(b.name));
let mathStr = '';
math.forEach(item => mathStr += `                  <p>\n                    <strong>${item.name}</strong>, ${item.institute}\n                  </p>\n`);
fs.appendFile('./math.txt', mathStr, () => {});

// add "type": "module" in package.json, then run with `node --experimental-json-modules util.js`
