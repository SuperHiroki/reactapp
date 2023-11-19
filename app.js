const express = require('express');
const app = express();
//const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 80;
const path = require('path');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Userモデルの正しいパスを指定
const ToDoItem = require('./models/toDoItem');

///////////////////////////////////////////////////////
//サインアップ
app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10); // パスワードをハッシュ化
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.json({ message: 'サインアップ成功！', user: { userId: newUser.id, username: newUser.username, email: newUser.email } });
  } catch (error) {
    console.error('サインアップ中にエラーが発生しました:', error);
    res.status(500).json({ message: 'サインアップ中にエラーが発生しました。すでに登録されている名前かもしれません。' });
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
      const token = jwt.sign({ id: user.id, username }, secretKey);
      res.json({ token, username, userId: user.id });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

///////////////////////////////////////////////////////
// ToDo項目の取得
app.get('/api/todos', async (req, res) => {
  try {
    const userId = req.query.userId; // ユーザーIDをクエリパラメータから取得
    const items = await ToDoItem.findAll({
      where: { userId } // ユーザーIDでフィルタリング
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ToDo項目の追加
app.post('/api/todos', async (req, res) => {
  try {
    console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
    const { content, userId } = req.body;
    console.log(userId);
    const newItem = await ToDoItem.create({ content, userId });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ToDo項目の削除
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await ToDoItem.destroy({ where: { id } });
    res.status(200).json({ message: 'ToDo item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

///////////////////////////////////////////////////////

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
