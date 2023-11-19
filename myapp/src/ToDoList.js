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

  useEffect(() => {
    fetch(`/api/todos?userId=${userId}`) // ユーザーIDをクエリパラメータに含める
        .then(response => response.json())
        .then(data => setToDoItems(data));
    }, [userId]); // ユーザーIDが変更された場合に再度フェッチ

  useEffect(() => {
    fetchToDoItems(); // コンポーネントマウント時にToDoリストを取得
  }, []);

  const handleAddToDo = () => {
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
    <div>
      <h2>ToDo List</h2>
      <input type="text" value={newToDo} onChange={(e) => setNewToDo(e.target.value)} />
      <button onClick={handleAddToDo}>Add</button>
      <ul>
        {toDoItems.map(item => (
          <li key={item.id}>
            {item.content}
            <button onClick={() => handleDeleteToDo(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
