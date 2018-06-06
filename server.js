const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dapp/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'dapp/build', 'index.html'));
});

app.listen(9000);
