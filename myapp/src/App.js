import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // 状態を追加して、メッセージを保持します。
  const [message, setMessage] = useState('');

  // useEffectを使用して、コンポーネントがマウントされた後にAPIリクエストを実行します。
  useEffect(() => {
    // APIエンドポイント '/api/hello' からデータを取得します。
    fetch('/api/hello')
      .then(response => response.json()) // レスポンスをJSONとして解析します。
      .then(data => setMessage(data.message)) // 状態を更新して、メッセージをセットします。
      .catch(error => console.error('Error:', error)); // エラーがあればコンソールに表示します。
  }, []); // 空の依存配列を渡して、コンポーネントのマウント時にのみ実行されるようにします。

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* サーバーからのメッセージを表示します。 */}
        <p>{message}</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
