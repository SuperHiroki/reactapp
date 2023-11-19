const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Userモデルの正しいパスを指定

//サインアップ
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // パスワードをハッシュ化
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.json({ message: 'サインアップ成功！', user: { id: newUser.id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error('サインアップ中にエラーが発生しました:', error);
    res.status(500).json({ message: 'サインアップ中にエラーが発生しました' });
  }
});

//ログイン
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (user && bcrypt.compareSync(password, user.password)) {
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

app.get('/api', (req, res) => {
  res.send('Welcome to the Node.js Server BBBBBBBBBBBBBBBB!');
});

app.get('/api/hiroki', (req, res) => {
  res.send('Welcome to the Node.js Server VVVVVVVVVVVV!');
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js TTTTTTTTTTTTTTT!' });
  res.sendFile(path.join(__dirname, 'myapp/build', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'myapp/build')));

app.get('*', (req, res) => {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAA');
  res.sendFile(path.join(__dirname, 'myapp/build', 'index.html'));
});

//起動する
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
