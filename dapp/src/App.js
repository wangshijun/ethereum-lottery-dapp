import React, { Component } from 'react';

import web3 from './web3';
import lottery from './lottery';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      players: [],
      balance: '0',
      amount: '0',
      message: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onParticipate = this.participate.bind(this);
    this.onPickWinner = this.pickWinner.bind(this);
  }

  async componentDidMount() {
    const [owner, players, balance] = await Promise.all([
      lottery.methods.owner().call(),
      lottery.methods.getPlayers().call(),
      web3.eth.getBalance(lottery.options.address),
    ]);

    console.log({ owner, players, balance });

    this.setState({ owner, players, balance });
  }

  onInputChange(e) {
    this.setState({ amount: e.target.value });
  };

  async participate() {
    this.setState({ message: '参与抽奖中，请稍后...' });

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.participate().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.amount, 'ether'),
    });

    this.setState({ message: '参与成功！' });
  }

  async pickWinner() {
    this.setState({ message: '开奖中，请稍后...' });

    const accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });

    this.setState({ message: '开奖完毕！' });
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <h2 className="app-title">基于智能合约的抽奖</h2>
        </div>
        <div class="app-body">
          <p>
            奖池金额 {web3.utils.fromWei(this.state.balance, 'ether')} ETH，共 {this.state.players.length} 人参与抽奖
          </p>

          <hr />

          <h3>想试试手气?</h3>
          <div>
            <label>
              输入随机金额参与抽奖
              <input type="number" value={this.state.amount} onChange={this.onInputChange} />
            </label>
            <button onClick={this.onParticipate}>参与抽奖</button>
          </div>

          <hr />

          <h3>开奖时间到?</h3>
          <button onClick={this.onPickWinner}>立即开奖</button>

          <hr />
          <p>合约管理员：{this.state.owner}</p>

          <h3>{this.state.message}</h3>
        </div>
      </div>
    );
  }
}

export default App;
