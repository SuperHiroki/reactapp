const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// `myapp/build` への正しいパスを設定
app.use(express.static(path.join(__dirname, 'myapp/build')));

// すべてのリクエストに対して `myapp/build/index.html` を提供
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'myapp/build', 'index.html'));
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js AAAAAA!' });
});

// ルートパスのハンドラは、`/api/hello` の上に移動する必要があります
// また、すべてをキャッチするハンドラ `app.get('*')` によって上書きされないように、それより前に定義する必要があります
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Server BBBBBBBBBBBBBBBB!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
