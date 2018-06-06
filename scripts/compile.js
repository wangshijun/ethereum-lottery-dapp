const fs = require('fs-extra');
const path = require('path');
const solc = require('solc');

const compiledDir = path.resolve(__dirname, '../compiled');
fs.removeSync(compiledDir);
fs.ensureDirSync(compiledDir);

const contractFile = 'Lottery.sol';
const contractPath = path.resolve(__dirname, '../contracts', contractFile);
const contractSource = fs.readFileSync(contractPath, 'utf8');
const result = solc.compile(contractSource, 1);
console.log(`file compiled: ${contractFile}`);

if (Array.isArray(result.errors) && result.errors.length) {
  throw new Error(result.errors[0]);
}

Object.keys(result.contracts).forEach(name => {
  const contractName = name.replace(/^:/, '');
  const filePath = path.resolve(compiledDir, `${contractName}.json`);
  fs.outputJsonSync(filePath, result.contracts[name]);
  console.log(` > contract ${contractName} saved to ${filePath}`);
});
