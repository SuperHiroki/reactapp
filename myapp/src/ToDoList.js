import React, { useState, useEffect } from 'react';

function ToDoList({ userId }) {
  ///////////////////////////////////////////////////////////
  //ユーザ情報を常に最新に保持する。
  /*
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId !== userId) {
      setUserId(storedUserId);
    }
  }, [userId]);
  
  useEffect(() => {
    console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
    if (userId) {
      fetch(`/api/todos?userId=${userId}`)
        .then(response => response.json())
        .then(data => setToDoItems(data));
    }else{
      setToDoItems([]);
    }
  }, [userId]); 
*/

  /////////////////////////////////////////////////////////////
  const [toDoItems, setToDoItems] = useState([]);
  const [newToDo, setNewToDo] = useState('');
  const [message, setMessage] = useState(''); // メッセージ用の状態変数を追加

  useEffect(() => {
    fetch(`/api/todos?userId=${userId}`) // ユーザーIDをクエリパラメータに含める
        .then(response => response.json())
        .then(data => setToDoItems(data));
    }, [userId]); // ユーザーIDが変更された場合に再度フェッチ

  useEffect(() => {
    fetchToDoItems(); // コンポーネントマウント時にToDoリストを取得
  }, []);

  const handleAddToDo = () => {
    if (!userId) {
      setMessage('Please log in to add ToDo items.'); // ユーザーがログインしていない場合のメッセージ
      return;
    }
    console.log('YYYYYYYYYYYYYYYYYYYYYYY');
    console.log(userId);
    console.log(localStorage.getItem('userId'));
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newToDo, userId : userId}),
    })
    .then(response => response.json())
    .then(() => {
      fetchToDoItems(); // ToDoリストを再取得して更新
      setNewToDo(''); // 入力フィールドをクリア
      setMessage(''); // メッセージをクリア
    });
  };

  const handleDeleteToDo = (id) => {
    fetch(`/api/todos/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchToDoItems(); // ToDoリストを再取得して更新
      });
  };
  
    // ToDoリストを取得する関数
    const fetchToDoItems = () => {
        if (userId) {
            fetch(`/api/todos?userId=${userId}`)
            .then(response => response.json())
            .then(data => setToDoItems(data));
        }else{
          setToDoItems([]);
        }
    };

  ///////////////////////////////////////////////////////////

  return (
<div className="max-w-md mx-auto mt-10 border border-gray-300 shadow-lg rounded-lg p-6 bg-white">
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ToDo List</h2>
  <div className="flex justify-between mb-4">
    <input 
      type="text" 
      value={newToDo} 
      onChange={(e) => setNewToDo(e.target.value)} 
      className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
    <button 
      onClick={handleAddToDo} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Add
    </button>
  </div>
  <ul className="list-disc pl-5">
    {toDoItems.map(item => (
      <li key={item.id} className="mb-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">{item.content}</span>
          <button 
            onClick={() => handleDeleteToDo(item.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
  {message && <p className="text-center text-red-500 text-xs">{message}</p>}
</div>

  );
}

export default ToDoList;
