import React, { useState } from 'react';

function SignUpForm({onSignupSuccess}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      console.log('サーバーからのレスポンス:', data);
      localStorage.setItem('token', data.user.token);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('userId', data.user.userId);
      setMessage('Signup successful');
      onSignupSuccess(data.user.username, data.user.userId);
    } catch (error) {
      console.error('サーバー通信中にエラーが発生しました:', error);
      setMessage('Error occured. The username may be already used.');
    }
  };

  return (
<div className="max-w-sm mx-auto mt-10">
<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username:
      </label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
        Email:
      </label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password:
      </label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="flex items-center justify-between">
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Sign Up
      </button>
    </div>
  </form>
  {message && <p className="text-center text-red-500 text-xs">{message}</p>}
</div>
</div>
  );
}

export default SignUpForm;
