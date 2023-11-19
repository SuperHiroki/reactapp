const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

const cors = require('cors');
app.use(cors());

app.use(express.json());
const User = require('./models/user'); // Userモデルの正しいパスを指定

app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('受け取ったユーザーデータ:', { username, email, password });

    // データベースにユーザーを保存
    const newUser = await User.create({ username, email, password });

    res.json({ message: 'サインアップ成功！', user: newUser });
  } catch (error) {
    console.error('データベースへの保存中にエラーが発生しました:', error);
    res.status(500).json({ message: 'サインアップ中にエラーが発生しました' });
  }
});





const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // 実際には安全な場所にキーを保管

app.post('/api/login', async (req, res) => {
  console.log('PPPPPPPPPPPPPPPPPPPPPPPPPP');
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
      const token = jwt.sign({ username }, secretKey);
      res.json({ token, username });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// ルートパスのハンドラは、`/api/hello` の上に移動する必要があります
// また、すべてをキャッチするハンドラ `app.get('*')` によって上書きされないように、それより前に定義する必要があります
app.get('/api', (req, res) => {
  res.send('Welcome to the Node.js Server BBBBBBBBBBBBBBBB!');
});

app.get('/api/hiroki', (req, res) => {
  res.send('Welcome to the Node.js Server VVVVVVVVVVVV!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js TTTTTTTTTTTTTTT!' });
  //res.sendFile(path.join(__dirname, 'myapp/build', 'index.html'));
});

// すべてのリクエストに対して `myapp/build/index.html` を提供
// `myapp/build` への正しいパスを設定
app.use(express.static(path.join(__dirname, 'myapp/build')));

app.get('*', (req, res) => {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAA');
  res.sendFile(path.join(__dirname, 'myapp/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
