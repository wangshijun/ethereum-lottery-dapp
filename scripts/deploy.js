const fs = require('fs-extra');
const path = require('path');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const contractPath = path.resolve(__dirname, '../compiled/Lottery.json');
const { interface, bytecode } = require(contractPath);

const provider = new HDWalletProvider(
  'witness improve busy opinion addict sun gossip hedgehog common glass dignity primary',
  'https://rinkeby.infura.io/CqCd0QgCozHBEk19ub2M'
);

const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('合约部署账户:', accounts[0]);

  console.time('合约部署耗时');
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
  console.timeEnd('合约部署耗时');

  const contractAddress = result.options.address;

  console.log('合约部署成功:', contractAddress);
  console.log('合约查看地址:', `https://rinkeby.etherscan.io/address/${contractAddress}`);

  const addressFile = path.resolve(__dirname, '../address.json');
  fs.writeFileSync(addressFile, JSON.stringify(contractAddress));
  console.log('地址写入成功:', addressFile);

  process.exit();
})();
