const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compiled/Lottery.json');

const web3 = new Web3(ganache.provider());

let accounts;
let contract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
  it('should deploy contract', () => {
    assert.ok(contract.options.address);
  });

  it('should have owner', async () => {
    const owner = await contract.methods.owner().call();
    assert.equal(owner, accounts[0]);
  });

  it('should allow account to participate', async () => {
    await contract.methods.participate().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether'),
    });

    const players = await contract.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(players.length, 1);
    assert.equal(players[0], accounts[0]);
  });

  it('should allow multiple accounts to participate', async () => {
    await contract.methods.participate().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether'),
    });
    await contract.methods.participate().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether'),
    });

    await contract.methods.participate().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether'),
    });

    const players = await contract.methods.getPlayers().call({
      from: accounts[0],
    });

    assert.equal(players.length, 3);
    assert.equal(players[0], accounts[0]);
    assert.equal(players[1], accounts[1]);
    assert.equal(players[2], accounts[2]);
  });

  it('should require minimum amount of ether when participate', async () => {
    try {
      await contract.methods.participate().send({
        from: accounts[0],
        value: web3.utils.toWei('0.001', 'ether'),
      });
      assert(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it('should require owner to call pickWinner', async () => {
    try {
      await contract.methods.pickerWinner().send({
        from: accounts[1],
      });
      assert(false);
    } catch (err) {
      assert.ok(!!err);
    }
  });

  it('should send money to winner and reset players array', async () => {
    await contract.methods.participate().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether'),
    });

    const players = await contract.methods.getPlayers().call({
      from: accounts[0],
    });
    assert.equal(players.length, 1);

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await contract.methods.pickWinner().send({ from: accounts[0] });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;

    console.log({ initialBalance, finalBalance });
    assert(difference > web3.utils.toWei('1.8', 'ether'));

    const newPlayers = await contract.methods.getPlayers().call({
      from: accounts[0],
    });
    assert.equal(newPlayers.length, 0);
  });
});
