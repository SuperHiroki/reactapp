import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import HomePage from './HomePage';
import React, { useState, useEffect } from 'react';

function App() {
  //ログイン時に発火する
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setCurrentUser(username);
  }, []);

  const handleLoginSuccess = (username) => {
    setCurrentUser(username);
  };

  //サインアップ時に発火する
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="flex justify-center space-x-4 mb-4">
          <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Home</Link>
          {!currentUser && <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Link>}
          {!currentUser && <Link to="/signup" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Sign Up</Link>}
          {currentUser && <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>}
        </nav>

        {currentUser && <p>Welcome, {currentUser}</p>}

        {/* ルーティング */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<SignUpForm onSignupSuccess={handleLoginSuccess}  />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
