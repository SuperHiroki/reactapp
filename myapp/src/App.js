//import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // 'Routes' をインポート
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import HomePage from './HomePage';
import React, { useState, useEffect } from 'react'; // この行を追加

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setCurrentUser(username);
  }, []);

  const handleLoginSuccess = (username) => {
    setCurrentUser(username);
  };


  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>

        {/* ユーザー名を表示 */}
        {currentUser && <p>Welcome, {currentUser}</p>}

        {/* v6の新しいルーティングの方法に合わせて修正 */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} /> {/* この行を変更 */}
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
