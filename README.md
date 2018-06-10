# 以太坊智能合约 + DApp 从入门到上线

> 如何在熟悉的前端开发环境中实现智能合约工作流，并且构建能够和智能合约交互的 DApp，更详细的介绍请参见我的掘金小册：[区块链开发入门：从 0 到 1 构建基于以太坊智能合约的 ICO DApp](https://juejin.im/book/5addb2eb6fb9a07abd0d4557)。

## 如何开发？

```shell
git clone https://github.com/wangshijun/ethereum-lottery-dapp.git
cd ethereum-lottery-dapp
yarn
cd dapp
yarn
cd ../
npm run dev
```

然后打开 [http://localhost:3000](http://localhost:3000)，即可预览。

## 如何部署？

```shell
git pull origin master
yarn
npm start
```

服务启动在 9000 端口上。线上试用地址：[http://47.104.23.85:9000/](http://47.104.23.85:9000/)，注意，因为 DApp 部署在 Rinkeby 测试网络上，测试时 Metamask 也应该切换到 Rinkeby 测试网。

## 线下分享 PPT

猛击这里：[https://pan.baidu.com/s/14DmVnJwv9kvUTFzmsmE5NQ](https://pan.baidu.com/s/14DmVnJwv9kvUTFzmsmE5NQ)，GitHub 传大文件实在太慢了，就放到百度盘了。

## 学习更多？

直接扫描下图的二维码，或猛击掘金小册链接：[区块链开发入门：从 0 到 1 构建基于以太坊智能合约的 ICO DApp](https://juejin.im/book/5addb2eb6fb9a07abd0d4557)。

![](./juejin.png)
