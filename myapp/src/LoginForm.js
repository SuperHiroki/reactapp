import React, { useState } from 'react';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHH');
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setMessage('Login successful');
        onLoginSuccess(data.username); // ログイン成功をAppコンポーネントに通知
      } else {
        console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('サーバーに接続できませんでした。');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} {/* メッセージの表示 */}
    </div>
  );
}

export default LoginForm;
